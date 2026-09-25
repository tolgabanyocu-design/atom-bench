// Atom Bench website worker
// - serves the app (public/)
// - /api/tts: the teacher's voice, made by Microsoft Azure Speech on the server, so every visitor
//   hears exactly the same voice. Each sentence is generated once and saved in KV (AUDIO).
// Secrets: AZURE_SPEECH_KEY (set by the GitHub deploy workflow). Vars: AZURE_SPEECH_REGION, VOICE_EN, VOICE_RO.

const MAX_CHARS = 2400;
// voices you can try on /voice-test.html (the app itself always uses VOICE_EN / VOICE_RO)
const TEST_VOICES = {
  en: ['en-GB-RyanNeural', 'en-GB-OllieMultilingualNeural', 'en-US-AndrewMultilingualNeural', 'en-US-BrianMultilingualNeural', 'en-GB-ThomasNeural', 'en-US-GuyNeural'],
  ro: ['ro-RO-EmilNeural', 'en-US-AndrewMultilingualNeural', 'en-GB-OllieMultilingualNeural', 'en-US-BrianMultilingualNeural', 'de-DE-FlorianMultilingualNeural', 'it-IT-GiuseppeMultilingualNeural']
};
// speaking pace per language (Romanian a little slower, so every accent and ending is clear)
const RATE = {en: '-2%', ro: '-6%'};

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    if (url.pathname === '/api/health') return json({tts: !!env.AZURE_SPEECH_KEY, cache: !!env.AUDIO, voices: {en: env.VOICE_EN, ro: env.VOICE_RO}});
    if (url.pathname === '/api/tts') return tts(req, env, ctx, url);
    if (url.pathname === '/api/test-voices') return json(TEST_VOICES);
    return env.ASSETS.fetch(req);
  }
};

function json(o, status = 200) {
  return new Response(JSON.stringify(o), {status, headers: {'content-type': 'application/json', 'cache-control': 'no-store'}});
}
async function sha(s) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(d)].map(b => b.toString(16).padStart(2, '0')).join('');
}
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

// make chemistry text speakable: subscripts/superscripts, arrows, symbols
function speakable(text, lang) {
  const sub = {'₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9'};
  const sup = {'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁺':'+','⁻':'-'};
  let t = text.replace(/[₀-₉]/g, c => sub[c]).replace(/[⁰-⁹⁺⁻]/g, c => sup[c]);
  const ro = lang === 'ro';
  t = t.replace(/\s*→\s*/g, ro ? ' formează ' : ' gives ')
       .replace(/\s*⇌\s*/g, ro ? ' în echilibru cu ' : ' in equilibrium with ')
       .replace(/°C/g, ro ? ' grade Celsius' : ' degrees Celsius')
       .replace(/\bpH\b/g, ro ? 'pe ha' : 'p H');
  return t;
}
function ssml(text, lang, voice) {
  const loc = lang === 'ro' ? 'ro-RO' : 'en-GB';
  const multi = /Multilingual/.test(voice) && !voice.startsWith(loc);
  let inner = esc(speakable(text, lang));
  if (multi) inner = `<lang xml:lang="${loc}">${inner}</lang>`;
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${loc}"><voice name="${voice}"><prosody rate="${RATE[lang]}">${inner}</prosody></voice></speak>`;
}

async function tts(req, env, ctx, url) {
  if (req.method !== 'GET') return json({error: 'method'}, 405);
  if (!env.AZURE_SPEECH_KEY) return json({error: 'not configured'}, 503);
  const ref = req.headers.get('referer') || req.headers.get('origin') || '';
  try { if (ref && new URL(ref).host !== url.host) return json({error: 'forbidden'}, 403); } catch (e) {}
  const lang = url.searchParams.get('lang') === 'ro' ? 'ro' : 'en';
  const text = (url.searchParams.get('t') || '').replace(/\s+/g, ' ').trim();
  if (!text || text.length > MAX_CHARS) return json({error: 'bad text'}, 400);
  let voice = lang === 'ro' ? (env.VOICE_RO || 'ro-RO-EmilNeural') : (env.VOICE_EN || 'en-GB-RyanNeural');
  const want = url.searchParams.get('v');
  if (want && TEST_VOICES[lang].includes(want)) voice = want;
  const body = ssml(text, lang, voice);
  const key = 'az1/' + (await sha(body)) + '.mp3';
  const headers = {'content-type': 'audio/mpeg', 'cache-control': 'public, max-age=31536000, immutable', 'x-tts-voice': voice};
  if (env.AUDIO) {
    const hit = await env.AUDIO.get(key, 'arrayBuffer');
    if (hit) return new Response(hit, {headers: {...headers, 'x-tts-cache': 'hit'}});
  }
  const region = env.AZURE_SPEECH_REGION || 'swedencentral';
  const r = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: 'POST',
    headers: {'Ocp-Apim-Subscription-Key': env.AZURE_SPEECH_KEY, 'Content-Type': 'application/ssml+xml', 'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3', 'User-Agent': 'atom-bench'},
    body
  });
  if (!r.ok) return json({error: 'tts failed', status: r.status, detail: (await r.text().catch(() => '')).slice(0, 300)}, 502);
  const audio = await r.arrayBuffer();
  if (env.AUDIO) ctx.waitUntil(env.AUDIO.put(key, audio).catch(() => {}));
  return new Response(audio, {headers: {...headers, 'x-tts-cache': 'miss'}});
}

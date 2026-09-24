// PARKED: ElevenLabs text-to-speech worker. To use it, copy this file over src/worker.js and add to wrangler.toml:
//   [[kv_namespaces]]
//   binding = "AUDIO"
//   id = "<id from: npx wrangler kv namespace create AUDIO>"
//   [vars]
//   VOICE_EN = "JBFqnCBsd6RMkjVDRZzb"   # George – Professor Ion
//   VOICE_RO = "XrExE9yKIg1WjnnlVkGX"   # Matilda – Profesoara Iona
//   TTS_MODEL = "eleven_multilingual_v2"
// Atom Bench website worker: serves the app and a text-to-speech endpoint backed by ElevenLabs.
// Secret needed:  npx wrangler secret put ELEVENLABS_API_KEY
const SETTINGS = {stability: 0.4, similarity_boost: 0.8, style: 0.4, use_speaker_boost: true};
const MAX_CHARS = 2400;

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    if (url.pathname === '/api/health') return json({tts: !!env.ELEVENLABS_API_KEY, cache: !!env.AUDIO});
    if (url.pathname === '/api/tts') return tts(req, env, ctx, url);
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

async function tts(req, env, ctx, url) {
  if (req.method !== 'GET') return json({error: 'method'}, 405);
  if (!env.ELEVENLABS_API_KEY) return json({error: 'not configured'}, 503);
  // only our own pages may use the voice (stops other sites spending the credits)
  const ref = req.headers.get('referer') || req.headers.get('origin') || '';
  if (ref && new URL(ref).host !== url.host) return json({error: 'forbidden'}, 403);
  const lang = url.searchParams.get('lang') === 'ro' ? 'ro' : 'en';
  const text = (url.searchParams.get('t') || '').replace(/\s+/g, ' ').trim();
  if (!text || text.length > MAX_CHARS) return json({error: 'bad text'}, 400);
  const voice = lang === 'ro' ? env.VOICE_RO : env.VOICE_EN;
  const model = env.TTS_MODEL || 'eleven_multilingual_v2';
  const key = 'v1/' + (await sha([voice, model, JSON.stringify(SETTINGS), lang, text].join('|'))) + '.mp3';
  const headers = {'content-type': 'audio/mpeg', 'cache-control': 'public, max-age=31536000, immutable', 'x-tts-cache': 'hit'};

  if (env.AUDIO) {
    const hit = await env.AUDIO.get(key, 'arrayBuffer');
    if (hit) return new Response(hit, {headers});
  }
  const r = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + voice + '/stream?output_format=mp3_44100_64', {
    method: 'POST',
    headers: {'xi-api-key': env.ELEVENLABS_API_KEY, 'content-type': 'application/json', accept: 'audio/mpeg'},
    body: JSON.stringify({text, model_id: model, language_code: lang, voice_settings: SETTINGS})
  });
  if (!r.ok || !r.body) {
    const detail = await r.text().catch(() => '');
    return json({error: 'tts failed', status: r.status, detail: detail.slice(0, 300)}, 502);
  }
  // stream to the listener right away, and save a copy in the background
  const [toClient, toStore] = r.body.tee();
  if (env.AUDIO) ctx.waitUntil(new Response(toStore).arrayBuffer().then(b => env.AUDIO.put(key, b)).catch(() => {}));
  else toStore.cancel();
  return new Response(toClient, {headers: {...headers, 'x-tts-cache': 'miss'}});
}

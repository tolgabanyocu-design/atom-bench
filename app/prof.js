// ===================== Ask Professor =====================
Object.assign(S, {
  askProf:L('Ask Professor','Întreabă-l pe Profesor'),
  cleanNote:L('This mission starts with a clean, empty beaker. The Start button washes it for you.','Misiunea începe cu un pahar curat și gol. Butonul Start îl spală pentru tine.'),
  startMission:L('Start mission','Începe misiunea'), cleanStart:L('Wash beaker & start','Spală paharul și începe'),
  restart:L('Restart (wash beaker)','Reia (spală paharul)'), playAgain:L('Play again','Joacă din nou'),
  pStart:L('Let’s go! The beaker is clean. <b>Step {n}:</b> {step}.','Să începem! Paharul e curat. <b>Pasul {n}:</b> {step}.'),
  pNext:L('<b>Step {n}:</b> {step}.','<b>Pasul {n}:</b> {step}.'),
  pOff:L('Oops, that wasn’t the next step, so the result may be different. Next step: <b>{step}</b>. You can also press Restart.','Hopa, acesta nu era pasul următor, așa că rezultatul poate fi diferit. Pasul următor: <b>{step}</b>. Poți apăsa și Reia.'),
  pShake:L('Shaking mixes oxygen from the air back in. Watch the colours start again!','Agitarea amestecă din nou oxigen din aer. Privește cum culorile o iau de la capăt!'),
  pNewMission:L('New mission! Read the steps, then press Start.','Misiune nouă! Citește pașii, apoi apasă Start.'),
  noMatch:L('Nothing on the shelf matches that.','Nimic de pe raft nu se potrivește.'),
  searchPh:L('Search the shelf…','Caută pe raft…'),
  profLook:L('Let’s look closely','Hai să privim atent'), profInside:L('What’s happening inside','Ce se întâmplă înăuntru'),
  profNotes:L('The chemist’s notebook','Caietul chimistului'), profReal:L('In real life','În viața reală'), profTry:L('What to try next','Ce să încerci mai departe'),
  profSaw:L('Here’s what I noticed: {list}.','Iată ce am observat: {list}.'),
  profNoSigns:L('I didn’t see any signs of a chemical reaction: no bubbles, no new colour, no new solid and no heat.','Nu am văzut niciun semn de reacție chimică: fără bule, fără culoare nouă, fără solid nou și fără căldură.'),
  profChem:L('New substances were made here, so this is a chemical reaction. The atoms swapped partners, and you can’t simply get the starting substances back.','Aici s-au format substanțe noi, deci este o reacție chimică. Atomii și-au schimbat partenerii și nu poți pur și simplu să recuperezi substanțele de la început.'),
  profPhys:L('No new substance was made, so this is a physical change. The particles only moved around or mixed, and it can usually be undone.','Nu s-a format nicio substanță nouă, deci este o transformare fizică. Particulele doar s-au mutat sau s-au amestecat, iar de obicei procesul poate fi inversat.'),
  profEq:L('In words: {eq}.','În cuvinte: {eq}.'),
  profEqS:L('As a balanced equation: {eq}','Ca ecuație egalată: {eq}'),
  profExo:L('It gives off heat, so chemists call it exothermic.','Degajă căldură, așa că chimiștii o numesc exotermă.'),
  profEndo:L('It takes in heat, so chemists call it endothermic.','Absoarbe căldură, așa că chimiștii o numesc endotermă.'),
  profZoom:L('Tap “See the atoms” and I’ll show you the atoms swapping partners!','Atinge „Vezi atomii” și îți arăt cum își schimbă atomii partenerii!'),
  profTryIntro:L('Here are some experiments you haven’t discovered yet:','Iată câteva experimente pe care încă nu le-ai descoperit:'),
  profTryNone:L('You’ve found everything I know with these substances! Wash the beaker and explore the shelf.','Ai descoperit tot ce știu cu aceste substanțe! Spală paharul și explorează raftul.'),
  profBurner:L('then light the burner','apoi aprinde arzătorul'),
  profWelcomeT:L('Welcome to my lab!','Bun venit în laboratorul meu!'),
  profWelcome:L('I’m Professor Ion. Everything around you, the air, the water and even you, is made of tiny atoms. In this lab you can mix substances and watch what happens. When something changes, tap me and I’ll explain it step by step.','Eu sunt Profesorul Ion. Tot ce e în jurul tău, aerul, apa și chiar tu, e făcut din atomi minusculi. În acest laborator poți amesteca substanțe și poți privi ce se întâmplă. Când se schimbă ceva, atinge-mă și îți explic pas cu pas.'),
  profMission:L('Your mission right now:','Misiunea ta acum:'),
  profAbout:L('About {name}','Despre {name}'),
  profInfoMore:L('Every substance has its own personality. Some are calm, some are very reactive. Add a second one and let’s see if they get along!','Fiecare substanță are personalitatea ei. Unele sunt liniștite, altele foarte reactive. Adaugă încă una și hai să vedem dacă se înțeleg!'),
  readAloud:L('Read aloud','Citește cu voce tare'),
  askPh:L('Ask me anything about chemistry…','Întreabă-mă orice despre chimie…'), askBtn:L('Ask','Întreabă'),
  thinking:L('Hmm, let me think…','Hmm, stai să mă gândesc…'),
  askErr:L('Sorry, I couldn’t answer just now. Try asking again in a moment.','Îmi pare rău, nu am putut răspunde acum. Încearcă din nou puțin mai târziu.'),
  askLimit:L('I need a little break. Try again in a few minutes.','Am nevoie de o mică pauză. Încearcă din nou peste câteva minute.'),
  askOff:L('Asking your own questions isn’t available here, but the lessons above still work.','Întrebările tale nu sunt disponibile aici, dar lecțiile de mai sus funcționează.'),
  profYourQ:L('Your question','Întrebarea ta'),
  gotIt:L('Got it!','Am înțeles!'),
  profCourseInvite:L('New to chemistry? Come to my classroom! In Chemistry 101 I explain atoms, molecules and bonds step by step, with little quizzes.','Ești nou în chimie? Vino în clasa mea! La Chimie 101 îți explic pas cu pas atomii, moleculele și legăturile, cu mici teste.'), nextPage:L('Next','Mai departe'), backPage:L('Back','Înapoi'),
});
const PROF_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="fem" d="M3.5 14c0-6 3.8-10 8.5-10s8.5 4 8.5 10v5.5l-2 .5V14c-1.5-3-4-4.5-6.5-4.5S7 11 5.5 14v6l-2-.5z" fill="#5a3219"/><circle class="fem" cx="12" cy="3.6" r="2.6" fill="#5a3219"/><circle cx="12" cy="13" r="8" fill="#F2A23A"/><rect x="6" y="8" width="12" height="4" rx="2" fill="#9fd3f2" stroke="#16252E" stroke-width="1.2"/><circle cx="9.5" cy="14.5" r="1.1" fill="#16252E"/><circle cx="14.5" cy="14.5" r="1.1" fill="#16252E"/><path d="M9.5 17.3c1.4 1.1 3.6 1.1 5 0" stroke="#16252E" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg>';
const PROF = {open:false, pages:[], i:0, typing:null, ctl:null};
let SPEAK = store.get('speak', true);
let SAMPLE = null;
(async () => { try{ if(window.claude && claude.use){ SAMPLE = await claude.use('sample'); } }catch(e){ SAMPLE = null; } document.querySelectorAll('.ask-form').forEach(f => { f.hidden = !SAMPLE; const c = f.closest('.ask-card'); if(c) c.hidden = !SAMPLE; }); })();

function suggestions(ids){
  const out = [], seen = new Set();
  const expand = x => { const s = SPECIES[x]; if(!s) return null; if(s.shelf) return [x]; if(s.res && SPECIES[s.res] && SPECIES[s.res].shelf) return [s.res, 'water']; return null; };
  for(const r of RULES){
    if(r.silent || r.special || r.quiet || DISC.has(r.id) || seen.has(r.id)) continue;
    if(!r.needs.some(tk => tk === '@water' ? ids.indexOf('water') >= 0 : tk.split('|').some(x => ids.indexOf(x) >= 0))) continue;
    let parts = []; let okk = true;
    for(const tk of r.needs){ const x = tk === '@water' ? 'water' : tk.split('|')[0]; const e = expand(x); if(!e){ okk = false; break; } e.forEach(y => { if(parts.indexOf(y) < 0) parts.push(y); }); }
    if(!okk) continue;
    seen.add(r.id);
    out.push(parts.map(nm).join(' + ') + (r.heatOnly ? ', ' + t('profBurner') : ''));
    if(out.length >= 3) break;
  }
  return out;
}
function tryPage(ids, lessonId){
  const sug = suggestions(ids);
  const pg = {eye:t('profTry'), h:'', p: sug.length ? [t('profTryIntro')] : [t('profTryNone')], list:sug};
  const l = lessonId && lessonById(lessonId); if(l) pg.action = {label:t('refresher', {title:tr(l.title)}), lesson:l.id};
  return pg;
}
function lessonPages(){
  const r = LAST[0]; const pages = [];
  const ids = [...new Set(B.items.map(i => i.id))];
  if(!r){
    pages.push({eye:t('askProf'), h:t('profWelcomeT'), p:[t('profWelcome')]});
    const m = MISSIONS[CUR_MISSION];
    pages.push({eye:t('mission', {n:CUR_MISSION + 1, total:MISSIONS.length}), h:tr(m.title), p:[t('profMission') + ' ' + tr(m.goal)], list:m.steps.map(s => tr(s.t)), ordered:1});
    const l0 = allLessons()[0]; pages.push({eye:t('tabCourse'), h:t('courseTitle'), p:[t('profCourseInvite')], action:{label:t('refresher', {title:tr(l0.title)}), lesson:l0.id}});
    return pages;
  }
  if(r.kind === 'rule'){
    const R = r.rule, v = r.varsFn ? r.varsFn() : {}; const title = fill(tr(R.title), v);
    const sg = (R.signs || []).map(k => { const f = SIGNS.find(s => s[0] === k); return f ? t(f[1]).toLowerCase() : ''; }).filter(Boolean);
    pages.push({eye:t('profLook'), h:title, p:[sg.length ? t('profSaw', {list:joinList(sg)}) : t('profNoSigns'), fill(tr(R.b), v)]});
    pages.push({eye:t('profInside'), h:title, p:[fill(tr(R.e || R.b), v)].concat(R.zoom ? [t('profZoom')] : [])});
    const notes = [t(R.kind === 'chem' ? 'profChem' : 'profPhys')];
    if(!R.noEq && R.needs && R.needs.length) notes.push(t('profEq', {eq:wordEq(r)}));
    if(LEVEL === 2){ notes.push(fill(tr(R.s || R.e), v)); if(R.eq) notes.push(t('profEqS', {eq:R.eq})); }
    if(R.energy) notes.push(t(R.energy === 'exo' ? 'profExo' : 'profEndo'));
    pages.push({eye:t('profNotes'), h:title, p:notes});
    pages.push({eye:t('profReal'), h:title, p:[R.fact ? tr(R.fact) : '', t(R.safety === 'lab' ? 'sLab' : R.safety === 'adult' ? 'sAdult' : 'sHome')].filter(Boolean)});
    pages.push(tryPage(ids, RULE_LESSON[R.id] || (R.kind === 'chem' ? 'reactions' : 'changes')));
  } else if(r.kind === 'info'){
    const s = SPECIES[r.id];
    pages.push({eye:t('newSub'), h:t('profAbout', {name:nm(r.id)}), p:[tr(s.desc) + (LEVEL >= 1 && s.f ? ' (' + s.f + ')' : ''), t('profInfoMore'), t(s.cat === 'lab' ? 'sLab' : s.cat === 'adult' ? 'sAdult' : 'sHome')]});
    pages.push(tryPage(ids, 'molecules'));
  } else {
    pages.push({eye:t('profLook'), h:t('noneTitle'), p:[fill(t('noneB'), {Name:nm(r.id), others:joinList(r.others.map(nmLow))}), t('noneE')].concat(LEVEL === 2 ? [t('noneS')] : [])});
    pages.push(tryPage(ids, 'changes'));
  }
  return pages;
}
function openProf(){
  PROF.pages = lessonPages(); PROF.i = 0; PROF.open = true;
  const o = $('#profOverlay'); o.hidden = false; o.classList.remove('leaving'); void o.offsetWidth; o.classList.add('show');
  $('#profSpeak').setAttribute('aria-pressed', String(SPEAK));
  $('#profAnswer').innerHTML = ''; $('#profQ').placeholder = t('askPh');
  profGo(0);
  setTimeout(() => $('#profNext').focus(), 50);
}
function closeProf(){ PROF.open = false; stopSpeak(); clearInterval(PROF.typing); if(PROF.ctl) PROF.ctl.abort(); const o = $('#profOverlay'); o.classList.remove('show'); o.hidden = true; setTalking(false); }
function setTalking(on){ $('#profOverlay').classList.toggle('talking', !!on); }
function profGo(i){
  PROF.i = Math.max(0, Math.min(PROF.pages.length - 1, i)); const pg = PROF.pages[PROF.i];
  $('#profEyebrow').textContent = pg.eye || ''; $('#profTitle').textContent = pg.h || '';
  const box = $('#profText'); box.innerHTML = '';
  const paras = (pg.p || []).map(txt => { const el = document.createElement('p'); box.appendChild(el); return {el, txt}; });
  if(pg.list && pg.list.length){ const ul = document.createElement(pg.ordered ? 'ol' : 'ul'); ul.className = 'prof-list'; pg.list.forEach(x => { const li = document.createElement('li'); li.textContent = x; ul.appendChild(li); }); box.appendChild(ul); }
  if(pg.action){ const b = document.createElement('button'); b.className = 'btn small primary lesson-link'; b.textContent = pg.action.label; b.addEventListener('click', () => openLessonFromLab(pg.action.lesson)); box.appendChild(b); }
  pg.say = (pg.h ? pg.h + '. ' : '') + (pg.p || []).join(' ') + (pg.list ? ' ' + pg.list.join('. ') : '');
  $('#profDots').innerHTML = PROF.pages.map((_, k) => '<i class="' + (k === PROF.i ? 'on' : '') + '"></i>').join('');
  $('#profPrev').disabled = PROF.i === 0;
  $('#profNext').textContent = PROF.i < PROF.pages.length - 1 ? t('nextPage') : t('gotIt');
  // typewriter
  clearInterval(PROF.typing);
  if(REDUCED){ paras.forEach(p => p.el.textContent = p.txt); }
  else {
    let pi = 0, ci = 0; setTalking(true);
    PROF.typing = setInterval(() => {
      if(pi >= paras.length){ clearInterval(PROF.typing); if(!SPEAK || !window.speechSynthesis) setTalking(false); return; }
      ci += 3; paras[pi].el.textContent = paras[pi].txt.slice(0, ci);
      if(ci >= paras[pi].txt.length){ pi++; ci = 0; }
    }, 22);
  }
  speak(pg.say);
}
let VOICES = [];
function loadVoices(){ try{ VOICES = window.speechSynthesis ? speechSynthesis.getVoices() : []; }catch(e){ VOICES = []; } }
if(window.speechSynthesis){ loadVoices(); try{ speechSynthesis.onvoiceschanged = loadVoices; }catch(e){} }
// ---------- voices: pick the most natural voice, speak sentence by sentence with lively intonation ----------
const VOICE_CFG = {natural:store.get('natural', true), lively:+store.get('lively', 1), rate:+store.get('vrate', 1), en:store.get('voice_en', ''), ro:store.get('voice_ro', '')};
function voiceScore(v, want){
  const n = v.name; let sc = 0;
  if(/natural|neural/i.test(n)) sc += 60; if(/online/i.test(n)) sc += 25; if(/premium|enhanced|siri/i.test(n)) sc += 35; if(/google/i.test(n)) sc += 20;
  const male = /\b(male|ryan|guy|andrew|brian|christopher|eric|roger|steffan|thomas|william|daniel|george|arthur|oliver|james|alex|emil|andrei)\b/i;
  const female = /\b(female|alina|ioana|carmen|andreea|irina|elena)\b/i;
  if(want === 'en'){ if(male.test(n)) sc += 30; if(female.test(n)) sc -= 20; if(/\b(ryan|guy|andrew|brian|christopher)\b/i.test(n)) sc += 15; }
  else { if(female.test(n)) sc += 30; if(male.test(n)) sc -= 10; }
  if(/desktop|compact|espeak/i.test(n)) sc -= 30;
  if(v.localService === false) sc += 5;
  return sc;
}
function voicesFor(lang){ const want = lang || (LANG === 'ro' ? 'ro' : 'en'); return VOICES.filter(x => x.lang && x.lang.toLowerCase().replace('_', '-').indexOf(want) === 0).sort((x, y) => voiceScore(y, want) - voiceScore(x, want)); }
function pickVoice(){
  const want = LANG === 'ro' ? 'ro' : 'en'; const list = voicesFor(want);
  const chosen = VOICE_CFG[want] && list.find(v => v.name === VOICE_CFG[want]);
  return chosen || list[0] || null;
}
// Break text into spoken phrases at every punctuation mark, remembering which mark ended each phrase,
// so we can pause like a real teacher: short breath at commas, longer stop at full stops.
function splitSpeech(text){
  const clean = text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  // Split ONLY at sentence ends. Commas, colons and dashes stay inside the phrase, so the voice keeps
  // its natural "more is coming" tone there instead of dropping as if the sentence had finished.
  const parts = clean.split(/(?<=[.!?…]["”»)]?)\s+(?=[A-ZĂÂÎȘȚŞŢ„"“(0-9])/);
  const out = [];
  for(let txt of parts){
    txt = txt.trim(); if(!txt) continue;
    const mark = txt.replace(/["”»)]+$/, '').slice(-1);
    const kind = mark === '?' ? 'q' : mark === '!' ? 'x' : 'end';
    // very long sentences: break once at a semicolon (never at a comma)
    if(txt.length > 260 && txt.indexOf('; ') > 0){ const k = txt.indexOf('; '); out.push({t:txt.slice(0, k + 1), kind:'colon'}); out.push({t:txt.slice(k + 2), kind}); }
    else out.push({t:txt, kind});
  }
  if(!out.length && clean) out.push({t:clean, kind:'end'});
  return out;
}
const PAUSE = {comma:260, dash:320, colon:420, end:620, q:680, x:600};
Object.assign(S, {nvTitle:L('No voice for this language on this device','Nu există o voce în limba română pe acest dispozitiv'),
  nvBody:L('The lesson continues with text only. To hear the teacher, open Atom Bench in Microsoft Edge (it has natural online voices), or add a voice for this language in your device’s speech settings.','Lecția continuă doar cu text, ca profesorul să nu citească româna cu o voce englezească. Ca să-l auzi, deschide Atom Bench în Microsoft Edge (are voci românești naturale, de exemplu Alina), sau adaugă limba română în setările de vorbire ale dispozitivului (Windows: Setări → Oră și limbă → Vorbire → Adaugă voci → Română).'),
  nvOk:L('OK','Am înțeles')});
let SPEAK_ID = 0;
// ---------- natural voice (ElevenLabs via the website's /api/tts endpoint) ----------
// Only available when the app runs on its own website (Cloudflare Worker holds the key). Falls back to the browser voice.
// ElevenLabs voice is parked for now (cost). Set NATURAL_VOICE = true and re-add /api/tts on the server to bring it back.
const NATURAL_VOICE = false;
const EL_TTS = {ok:false, cache:false, audio:null, fails:0};
function naturalOn(){ return EL_TTS.ok && VOICE_CFG.natural !== false && EL_TTS.fails < 3; }
function ttsClean(text){ return text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 2400); }
function ttsUrl(text, lang){ return '/api/tts?lang=' + (lang || (LANG === 'ro' ? 'ro' : 'en')) + '&t=' + encodeURIComponent(ttsClean(text)); }
function ttsPrefetch(text){ if(!naturalOn() || !EL_TTS.cache || !text || !USER_GESTURE) return; try{ fetch(ttsUrl(text)).catch(() => {}); }catch(e){} }
try{ if(NATURAL_VOICE && /^https?:$/.test(location.protocol) && !/claude\.ai|claudeusercontent|anthropic/.test(location.hostname)) fetch('/api/health').then(r => r.ok ? r.json() : null).then(j => { if(j && j.tts){ EL_TTS.ok = true; EL_TTS.cache = !!j.cache; } }).catch(() => {}); }catch(e){}
// true when this device has a voice for the current language (never read Romanian with an English voice)
// The Romanian voice is switched off until a server voice (same for everyone) is ready.
const RO_VOICE = false;
function langVoiceOK(){ if(naturalOn()) return true; if(LANG === 'ro' && !RO_VOICE) return false; if(!window.speechSynthesis) return false; loadVoices(); if(!VOICES.length) return true; return voicesFor(LANG === 'ro' ? 'ro' : 'en').length > 0; }
function noVoiceNotice(){
  if(LANG === 'ro' && !RO_VOICE) return;
  if(noVoiceNotice.shown === LANG) return; noVoiceNotice.shown = LANG;
  let el = document.getElementById('noVoice'); if(!el){ el = document.createElement('div'); el.id = 'noVoice'; el.className = 'no-voice'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
  el.innerHTML = '<b>' + t('nvTitle') + '</b><p>' + t('nvBody') + '</p><button class="btn small" type="button">' + t('nvOk') + '</button>';
  el.hidden = false; el.querySelector('button').onclick = () => { el.hidden = true; };
}
function speak(text, cb){
  if(!SPEAK || !text) return;
  if(naturalOn()) return speakNatural(text, cb);
  if(!window.speechSynthesis) return;
  if(!langVoiceOK()){ noVoiceNotice(); if(cb && cb.end) setTimeout(cb.end, 0); return; }
  const id = ++SPEAK_ID; let started = false, ended = false;
  const onStart = () => { if(started || id !== SPEAK_ID) return; started = true; if(cb){ cb.start && cb.start(); } else setTalking(true); };
  const onEnd = () => { if(ended) return; ended = true; if(cb){ cb.end && cb.end(); } else if(id === SPEAK_ID) setTalking(false); };
  try{ speechSynthesis.cancel(); }catch(e){}
  const v = pickVoice(), L2 = Math.max(0, Math.min(2, VOICE_CFG.lively)), ro = LANG === 'ro';
  const chunks = splitSpeech(text); if(!chunks.length) return onEnd();
  const basePitch = (ro ? 1.05 : 1.0) + (ro ? .05 : .03)*L2;
  const baseRate = ((ro ? .86 : .9) + .04*L2) * (VOICE_CFG.rate || 1);
  let sent = 0; // sentence counter for a gentle melody from one sentence to the next
  const say = i => {
    if(id !== SPEAK_ID) return;
    if(i >= chunks.length) return onEnd();
    const c = chunks[i], wave = ((sent*7) % 5 - 2)/2;
    const u = new SpeechSynthesisUtterance(c.t);
    if(v) try{ u.voice = v; }catch(e){} u.lang = v ? v.lang : (ro ? 'ro-RO' : 'en-GB');
    let pitch = basePitch + .03*L2*wave, rate = baseRate;
    if(c.kind === 'x'){ pitch += .06*L2; rate += .04*L2; }
    if(c.kind === 'q') pitch += .08*L2;
    u.pitch = Math.max(.6, Math.min(1.6, pitch)); u.rate = Math.max(.6, Math.min(1.3, rate)); u.volume = 1;
    let done = false;
    const next = () => { if(done) return; done = true; clearTimeout(wd); if(id !== SPEAK_ID) return; if(/end|q|x/.test(c.kind)) sent++; setTimeout(() => say(i + 1), PAUSE[c.kind] || 300); };
    // watchdog: some browsers occasionally never fire onend
    const wd = setTimeout(next, 2500 + c.t.length*130/Math.max(.5, u.rate));
    u.onstart = onStart; u.onend = next;
    u.onerror = e => { if(e && (e.error === 'interrupted' || e.error === 'canceled')){ done = true; clearTimeout(wd); if(id === SPEAK_ID) onEnd(); return; } next(); };
    try{ speechSynthesis.speak(u); }catch(e){ next(); }
  };
  // speak() after cancel() needs a tick in Chrome, otherwise the first phrase can be swallowed
  setTimeout(() => say(0), 60);
}
function speakNatural(text, cb){
  stopSpeak(); const id = SPEAK_ID; let started = false, ended = false;
  const onStart = () => { if(started || id !== SPEAK_ID) return; started = true; if(cb){ cb.start && cb.start(); } else setTalking(true); };
  const onEnd = () => { if(ended) return; ended = true; if(EL_TTS.audio === a) EL_TTS.audio = null; if(cb){ cb.end && cb.end(); } else if(id === SPEAK_ID) setTalking(false); };
  const fallback = () => { if(started || ended || id !== SPEAK_ID) return; EL_TTS.fails++; ended = true; EL_TTS.audio = null; const keep = EL_TTS.ok; EL_TTS.ok = false; speak(text, cb); EL_TTS.ok = keep; };
  const a = new Audio(ttsUrl(text)); EL_TTS.audio = a; a.preload = 'auto';
  a.playbackRate = Math.max(.7, Math.min(1.3, VOICE_CFG.rate || 1));
  a.addEventListener('playing', () => { EL_TTS.fails = 0; onStart(); });
  a.addEventListener('ended', onEnd);
  a.addEventListener('error', fallback);
  const slow = setTimeout(() => { if(!started) fallback(); }, 9000); a.addEventListener('playing', () => clearTimeout(slow));
  a.play().catch(err => { if(err && err.name === 'NotAllowedError'){ ended = true; if(cb && cb.end) cb.end(); } else fallback(); });
}
// spoken-only openers and varied praise, so the teacher sounds like a person, not a reader
const HOOKS = {en:['Now, look at this!','Here comes the fun part!','Ready? Watch closely.','Ooh, I love this bit!','Okay, next!','Now here’s something amazing.'],
  ro:['Acum, uite aici!','Urmează partea distractivă!','Ești gata? Fii atent!','Ah, asta îmi place mult!','Bun, mai departe!','Și acum, ceva uimitor.']};
function hookFor(i){ if(VOICE_CFG.lively < 1 || i < 1 || i % 2) return ''; const h = HOOKS[LANG === 'ro' ? 'ro' : 'en']; return h[(i/2 + (CR && CR.lesson ? CR.lesson.id.length : 0)) % h.length] + ' '; }
const PRAISE = {right:{en:['Yes! Brilliant!','Exactly right!','Spot on, well done!','Fantastic!','You got it!'], ro:['Da! Bravo!','Exact!','Perfect, foarte bine!','Excelent!','Ai reușit!']},
  wrong:{en:['Ooh, not quite!','Close, but not this time!','Hmm, not quite. Let’s see why.'], ro:['Hmm, nu chiar!','Aproape, dar nu de data asta!','Nu chiar. Hai să vedem de ce.']}};
function praise(ok){ const p = PRAISE[ok ? 'right' : 'wrong'][LANG === 'ro' ? 'ro' : 'en']; return p[Math.floor(Math.random()*p.length)]; }
function stopSpeak(){ SPEAK_ID++; if(EL_TTS.audio){ try{ EL_TTS.audio.pause(); }catch(e){} EL_TTS.audio = null; } try{ if(window.speechSynthesis) speechSynthesis.cancel(); }catch(e){} }

async function askProf(o){
  o = o || {q:'#profQ', out:'#profAnswer', btn:'#profAskBtn', form:'#profAsk', talk:'#profOverlay', ctx:''};
  const q = $(o.q).value.trim(); if(!q || !SAMPLE) return;
  const out = $(o.out); const btn = $(o.btn); const talkEl = $(o.talk);
  const setT2 = on => talkEl.classList.toggle('talking', !!on);
  if(PROF.ctl) PROF.ctl.abort(); PROF.ctl = new AbortController();
  out.innerHTML = '<p class="eyebrow">' + t('profYourQ') + '</p><p class="q"></p><p class="a thinking"></p>';
  out.querySelector('.q').textContent = q; const a = out.querySelector('.a'); a.textContent = t('thinking');
  btn.disabled = true; setT2(true);
  const lvl = ['Beginner (about age 8-11): very simple words, short sentences, no chemical formulas', 'Explorer (about age 11-14): simple science words like atoms, ions and word equations are fine', 'Scientist (age 14+): formulas and balanced equations are fine'][LEVEL];
  const contents = B.items.length ? [...new Set(B.items.map(i => SPECIES[i.id].n.en))].join(', ') : 'nothing (empty)';
  const last = LAST[0] && LAST[0].kind === 'rule' ? LAST[0].rule.title.en + ' - ' + (LAST[0].rule.e ? LAST[0].rule.e.en : '') : 'no reaction yet';
  const prompt = (LANG === 'ro' ? 'You are Profesorul Ion, the warm, enthusiastic chemistry teacher character in "Atom Bench", a virtual chemistry lab for children. When you refer to yourself in Romanian, use masculine forms.' : 'You are Professor Ion, the warm, enthusiastic chemistry teacher character in "Atom Bench", a virtual chemistry lab for children.') + ' Answer the child\'s question.\n' +
    'Rules:\n- Reply in ' + (LANG === 'ro' ? 'Romanian (with correct diacritics)' : 'English') + '.\n- Level: ' + lvl + '.\n- 2 to 5 short sentences. Be accurate and encouraging.\n' +
    '- Never give step-by-step instructions, amounts or sources for making fire, explosions, poisonous gases or dangerous substances at home. For lab-only chemicals, say only trained chemists do that in a real lab, and that this virtual lab is safe for trying.\n' +
    '- If the question is not about science, kindly steer back to chemistry.\n- Plain text only: no markdown, no lists, no emojis.\n\n' +
    (o.ctx ? o.ctx + '\n' : 'Lab situation: the beaker contains ' + contents + '; temperature ' + Math.round(B.temp) + ' °C; last event: ' + last + '.\n') + '\nChild\'s question: ' + q;
  try{
    const res = await SAMPLE(prompt, {modelTier:'quick', signal:PROF.ctl.signal, onText:({text}) => { a.classList.remove('thinking'); a.textContent = text; }});
    a.textContent = res.text; speak(res.text);
    if(!SPEAK || !window.speechSynthesis) setT2(false); else { const chk = setInterval(() => { try{ if(!speechSynthesis.speaking){ setT2(false); clearInterval(chk); } }catch(e){ clearInterval(chk); } }, 400); }
  }catch(e){
    a.classList.remove('thinking'); setT2(false);
    if(e && e.code === 'cancelled'){ a.textContent = e.text || ''; }
    else if(e && (e.code === 'not_granted' || e.code === 'sampling_disabled' || e.code === 'not_declared' || e.code === 'capability_disabled' || e.code === 'capability_removed')){ a.textContent = t('askOff'); document.querySelectorAll('.ask-form').forEach(f => f.hidden = true); }
    else if(e && e.code === 'rate_limited'){ a.textContent = (e.text ? e.text + ' ' : '') + t('askLimit'); }
    else a.textContent = (e && e.text ? e.text + ' ' : '') + t('askErr');
  }finally{ btn.disabled = false; }
}

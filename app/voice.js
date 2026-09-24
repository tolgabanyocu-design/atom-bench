// ===================== teacher voice settings =====================
Object.assign(S, {
  voiceBtn:L('Voice','Voce'), vTitle:L('The teacher’s voice','Vocea profesorului'), vVoice:L('Voice','Voce'), vLively:L('Speaking style','Stil de vorbire'),
  vCalm:L('Calm','Calm'), vLivelyOpt:L('Lively','Energic'), vVery:L('Very lively','Foarte energic'), vSpeed:L('Speed','Viteză'), vTest:L('Test the voice','Testează vocea'),
  vNatural:L('Natural voice (ElevenLabs)','Voce naturală (ElevenLabs)'), vNaturalB:L('Professor Ion speaks with George’s voice in English and Matilda’s in Romanian. It may take a second to start.','Profesorul Ion vorbește cu vocea lui George în engleză și a Matildei în română. Poate dura o secundă până începe.'), vOn:L('On','Pornit'), vOff:L('Off','Oprit'),
  vBest:L('best','cea mai bună'), vNone:L('No voice for this language is installed on this device.','Pe acest dispozitiv nu este instalată nicio voce pentru această limbă.'),
  vTip:L('Tip: the most natural voices are the “Natural” or “Online” voices in Microsoft Edge (for example Ryan or Alina) and the Google voices in Chrome. Voices come from your browser and device.','Sfat: cele mai naturale voci sunt vocile „Natural” sau „Online” din Microsoft Edge (de exemplu Alina sau Emil) și vocile Google din Chrome. Vocile vin din browserul și dispozitivul tău.'),
  vSample:L('Hello! I’m Professor Ion. Chemistry is everywhere around us, and today we’re going to discover something amazing! Are you ready?','Bună! Eu sunt Profesorul Ion. Chimia este peste tot în jurul nostru, iar azi vom descoperi ceva uimitor! Ești gata?'),
});
function renderVoicePanel(){
  const el = $('#voicePanel'); const want = LANG === 'ro' ? 'ro' : 'en'; loadVoices(); const list = voicesFor(want); const cur = pickVoice();
  const short = n => n.replace(/^Microsoft\s+/i, '').replace(/\s*-\s*(English|Romanian|Română).*$/i, '');
  const nat = EL_TTS.ok ? '<div class="vp-l">' + t('vNatural') + '<div class="seg vp-seg">' + [[true,'vOn'],[false,'vOff']].map(([v, k]) => '<button data-nat="' + v + '" aria-pressed="' + ((VOICE_CFG.natural !== false) === v) + '">' + t(k) + '</button>').join('') + '</div><span class="vp-note" style="text-transform:none;letter-spacing:0">' + t('vNaturalB') + '</span></div>' : '';
  el.innerHTML = '<div class="vp-h"><b>' + t('vTitle') + '</b><button class="icon-btn" data-v="close" aria-label="Close">×</button></div>' + nat +
    (list.length ? '<label class="vp-l">' + t('vVoice') + '<select id="vpVoice">' + list.map((v, i) => '<option value="' + esc(v.name) + '"' + (cur && v.name === cur.name ? ' selected' : '') + '>' + esc(short(v.name)) + (i === 0 ? ' · ' + t('vBest') : '') + '</option>').join('') + '</select></label>' : '<p class="vp-note">' + t('vNone') + '</p>') +
    '<div class="vp-l">' + t('vLively') + '<div class="seg vp-seg">' + ['vCalm','vLivelyOpt','vVery'].map((k, i) => '<button data-lv="' + i + '" class="' + (VOICE_CFG.lively === i ? 'on' : '') + '" aria-pressed="' + (VOICE_CFG.lively === i) + '">' + t(k) + '</button>').join('') + '</div></div>' +
    '<label class="vp-l">' + t('vSpeed') + ' <span id="vpRateV">' + VOICE_CFG.rate.toFixed(2) + '×</span><input type="range" id="vpRate" min="0.8" max="1.3" step="0.05" value="' + VOICE_CFG.rate + '"></label>' +
    '<button class="btn primary small" data-v="test">' + t('vTest') + '</button><p class="vp-note">' + t('vTip') + '</p>';
}
function openVoicePanel(){
  const el = $('#voicePanel'); renderVoicePanel(); el.hidden = false; $('#voiceBtn').setAttribute('aria-expanded', 'true');
  if(innerWidth > 760){ const r = $('#voiceBtn').getBoundingClientRect(); el.style.left = Math.max(10, Math.min(innerWidth - 330, r.right - 320)) + 'px'; el.style.top = Math.min(innerHeight - el.offsetHeight - 10, r.bottom + 8) + 'px'; }
  else { el.style.left = ''; el.style.top = ''; }
}
function closeVoicePanel(){ $('#voicePanel').hidden = true; $('#voiceBtn').setAttribute('aria-expanded', 'false'); }
function bindVoicePanel(){
  $('#voiceBtn').addEventListener('click', e => { e.stopPropagation(); $('#voicePanel').hidden ? openVoicePanel() : closeVoicePanel(); });
  const el = $('#voicePanel');
  el.addEventListener('click', e => { e.stopPropagation(); const b = e.target.closest('button'); if(!b) return;
    if(b.dataset.v === 'close') closeVoicePanel();
    if(b.dataset.v === 'test'){ USER_GESTURE = true; if(!SPEAK){ SPEAK = true; store.set('speak', true); $('#lessonSpeak').setAttribute('aria-pressed', 'true'); } if(typeof pauseLesson === 'function' && TAB === 'course') pauseLesson(); speak(t('vSample'), {start:() => $('#lessonTalk').classList.add('talking'), end:() => $('#lessonTalk').classList.remove('talking')}); }
    if(b.dataset.nat != null){ VOICE_CFG.natural = b.dataset.nat === 'true'; store.set('natural', VOICE_CFG.natural); renderVoicePanel(); }
    if(b.dataset.lv != null){ VOICE_CFG.lively = +b.dataset.lv; store.set('lively', VOICE_CFG.lively); renderVoicePanel(); }
  });
  el.addEventListener('change', e => { if(e.target.id === 'vpVoice'){ const want = LANG === 'ro' ? 'ro' : 'en'; VOICE_CFG[want] = e.target.value; store.set('voice_' + want, e.target.value); } });
  el.addEventListener('input', e => { if(e.target.id === 'vpRate'){ VOICE_CFG.rate = +e.target.value; store.set('vrate', VOICE_CFG.rate); $('#vpRateV').textContent = VOICE_CFG.rate.toFixed(2) + '×'; } });
  document.addEventListener('click', () => { if(!$('#voicePanel').hidden) closeVoicePanel(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && !$('#voicePanel').hidden) closeVoicePanel(); });
  document.querySelectorAll('#langSeg button').forEach(b => b.addEventListener('click', () => { if(!$('#voicePanel').hidden) setTimeout(renderVoicePanel, 0); }));
}
window.addEventListener('load', () => { try{ bindVoicePanel(); }catch(e){ console.warn(e); } });

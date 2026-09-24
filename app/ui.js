// ===================== UI =====================
Object.assign(S, {
  welcomeTitle:L('How the lab works','Cum funcționează laboratorul'),
  welcome1:L('Tap or drag a substance from the shelf to put it in the beaker.','Atinge sau trage o substanță de pe raft ca s-o pui în pahar.'),
  welcome2:L('Mix two or more and watch closely: bubbles, a new colour, heat or light mean a reaction.','Amestecă două sau mai multe și privește atent: bulele, o culoare nouă, căldura sau lumina înseamnă o reacție.'),
  welcome3:L('Light the burner to heat things. After a reaction, tap “See the atoms” to zoom in.','Aprinde arzătorul ca să încălzești. După o reacție, atinge „Vezi atomii” ca să privești de aproape.'),
  welcome4:L('Change the level at the top at any time: Beginner, Explorer or Scientist.','Schimbă oricând nivelul de sus: Începător, Explorator sau Om de știință.'),
  catalystNote:L('The yeast is a catalyst, so it is not used up.','Drojdia este un catalizator, deci nu se consumă.'),
});
const $ = s => document.querySelector(s);
let TAB = 'lab', FILTER = 'all', HINT_OPEN = false, MISSION_JUST_DONE = false;
const MSTATE = {active:null, step:0, off:false};
let CUR_MISSION = (() => { for(let i = 0; i < MISSIONS.length; i++) if(!DONE.has(i)) return i; return MISSIONS.length - 1; })();
const DISC_LAST = {};
const ANIM = {cur:null};

function startNextPour(){
  const id = QUEUE.shift(); if(!id){ ANIM.cur = null; return; }
  const s = SPECIES[id]; const kind = s.st === 'l' ? 'pour' : s.st === 'm' ? 'drop' : 'spoon';
  ANIM.cur = {id, kind, t0:nowS(), applied:false, dur: kind === 'pour' ? 1.75 : kind === 'spoon' ? 1.5 : 1.1, applyAt: kind === 'pour' ? .95 : kind === 'spoon' ? .85 : .62};
  $('#btnWash').disabled = true;
}
function animTick(){
  const a = ANIM.cur; if(!a) return; const e = nowS() - a.t0;
  if(!a.applied && e >= a.applyAt){ a.applied = true; commitAdd(a.id); }
  if(e >= a.dur){ ANIM.cur = null; if(QUEUE.length) startNextPour(); else $('#btnWash').disabled = false; }
}

// ---------- icons ----------
function iconSVG(s){
  const c = s.c || '#ddd';
  const liq = s.a && s.a > .3 ? c : '#cfe6ff';
  switch(s.icon){
    case 'bottle': case 'brown': {
      const br = s.icon === 'brown';
      return '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M19 6h10v6c7 2 10 6 10 12v16a4 4 0 0 1-4 4H13a4 4 0 0 1-4-4V24c0-6 3-10 10-12z" fill="' + (br ? '#8a5424' : '#eaf4f8') + '" stroke="' + (br ? '#5a3512' : '#9db6c2') + '" stroke-width="1.6"/>' +
        '<path d="M9.9 27h28.2v13a3.2 3.2 0 0 1-3.2 3.2H13.1A3.2 3.2 0 0 1 9.9 40z" fill="' + (br ? '#5d3310' : liq) + '" opacity="' + (br ? '.7' : '.9') + '"/>' +
        '<rect x="18" y="2.5" width="12" height="5" rx="1.5" fill="#2c3a40"/><rect x="13" y="29" width="22" height="8" rx="1.5" fill="#fff" opacity=".92"/>' +
        '<path d="M13 17v18" stroke="#fff" stroke-width="2" opacity=".6" stroke-linecap="round"/></svg>';
    }
    case 'jar':
      return '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="8" y="12" width="32" height="32" rx="5" fill="#eaf4f8" stroke="#9db6c2" stroke-width="1.6"/>' +
        '<path d="M10 42c0-9 6-15 14-15s14 6 14 15z" fill="' + c + '" stroke="rgba(0,0,0,.15)"/>' +
        '<circle cx="18" cy="37" r="1.1" fill="#fff" opacity=".9"/><circle cx="27" cy="34" r="1.1" fill="#fff" opacity=".9"/><circle cx="31" cy="39" r="1" fill="#000" opacity=".12"/>' +
        '<rect x="6" y="6" width="36" height="7" rx="2.5" fill="#2c3a40"/><path d="M12 17v14" stroke="#fff" stroke-width="2" opacity=".7" stroke-linecap="round"/></svg>';
    case 'chunk':
      return '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="8" y="12" width="32" height="32" rx="5" fill="#eaf4f8" stroke="#9db6c2" stroke-width="1.6"/>' +
        '<path d="M9.8 24h28.4v15a3.2 3.2 0 0 1-3.2 3.2H13a3.2 3.2 0 0 1-3.2-3.2z" fill="#f3d36b" opacity=".55"/>' +
        '<rect x="16" y="31" width="15" height="10" rx="2.5" fill="' + c + '" stroke="#7d848c"/><rect x="18" y="33" width="6" height="2" fill="#fff" opacity=".8"/>' +
        '<rect x="6" y="6" width="36" height="7" rx="2.5" fill="#2c3a40"/></svg>';
    case 'ribbon':
      return '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 32 13 18l7 16 7-18 7 16 8-14" fill="none" stroke="#8c9298" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/><path d="M6 32 13 18l7 16 7-18 7 16 8-14" fill="none" stroke="#dde1e5" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>';
    case 'nail':
      return '<svg viewBox="0 0 48 48" aria-hidden="true"><g transform="rotate(-40 24 24)"><path d="M6 24l5-3h30v6H11z" fill="#8a9097"/><rect x="39" y="16" width="4" height="16" rx="1.5" fill="#6f757c"/><rect x="12" y="22" width="26" height="1.6" fill="#fff" opacity=".55"/></g></svg>';
    case 'chalk':
      return '<svg viewBox="0 0 48 48" aria-hidden="true"><g transform="rotate(-25 24 24)"><rect x="6" y="18" width="36" height="12" rx="6" fill="#f2f0e8" stroke="#c8c3b3" stroke-width="1.5"/><rect x="10" y="26" width="28" height="2" fill="#000" opacity=".06"/></g></svg>';
    case 'ampoule':
      return '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M20 4h8v8c6 3 8 8 8 14v10a8 8 0 0 1-8 8h-8a8 8 0 0 1-8-8V26c0-6 2-11 8-14z" fill="#eaf4f8" stroke="#9db6c2" stroke-width="1.6"/><rect x="16" y="30" width="16" height="10" rx="4" fill="' + c + '"/><path d="M16 18v14" stroke="#fff" stroke-width="2" opacity=".7" stroke-linecap="round"/></svg>';
    case 'foil':
      return '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 30l6-14 12-6 12 4 4 12-6 10-14 4-10-4z" fill="#d7dbe0" stroke="#9aa1a8" stroke-width="1.4"/><path d="M14 22l10-5 9 3M18 32l9-4 8 2" stroke="#fff" stroke-width="1.6" fill="none" opacity=".9"/></svg>';
    case 'wire':
      return '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 40c4-4 8-4 10-8s-4-8 0-12 10 0 12-4-2-8 2-10" fill="none" stroke="#b8652e" stroke-width="4" stroke-linecap="round"/><path d="M10 40c4-4 8-4 10-8s-4-8 0-12 10 0 12-4-2-8 2-10" fill="none" stroke="#f2b98c" stroke-width="1.4" stroke-linecap="round"/></svg>';
    case 'candy':
      return '<svg viewBox="0 0 48 48" aria-hidden="true"><ellipse cx="16" cy="30" rx="10" ry="6" fill="#f5f3ec" stroke="#cfc9ba" stroke-width="1.4"/><ellipse cx="30" cy="22" rx="10" ry="6" fill="#f5f3ec" stroke="#cfc9ba" stroke-width="1.4"/><ellipse cx="33" cy="35" rx="10" ry="6" fill="#f5f3ec" stroke="#cfc9ba" stroke-width="1.4"/></svg>';
    case 'dropper':
      return '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="18" y="4" width="12" height="10" rx="5" fill="#2c3a40"/><path d="M17 14h14v22l-7 8-7-8z" fill="#eaf4f8" stroke="#9db6c2" stroke-width="1.6"/><path d="M18.5 24h11v11l-5.5 6-5.5-6z" fill="#e23a6e"/><circle cx="12" cy="36" r="3" fill="#2f6fe0"/><circle cx="38" cy="30" r="3" fill="#f2c23a"/><circle cx="36" cy="40" r="2.6" fill="#2fb35a"/></svg>';
  }
  return typeof iconSVG3 === 'function' ? iconSVG3(s) : '';
}

// ---------- professor & banner ----------
function say(key){
  const o = S[key]; let txt = Array.isArray(o) ? tr(o[Math.floor(Math.random()*o.length)]) : (o ? tr(o) : key);
  $('#bubble').innerHTML = txt;
}
let bannerTimer = 0;
function flashBanner(text){ const b = $('#banner'); b.textContent = text; b.classList.add('show'); clearTimeout(bannerTimer); bannerTimer = setTimeout(() => b.classList.remove('show'), 2800); }

// ---------- shelf ----------
let SEARCH = '';
function shelfItemHTML(id){ const s = SPECIES[id];
  const sub = LEVEL >= 1 && s.f ? '<span class="fm">' + s.f + '</span>' : '';
  const ph = LEVEL === 2 && s.ph ? '<span class="fm">pH ' + (7 + s.ph).toFixed(1).replace('.', LANG === 'ro' ? ',' : '.') + '</span>' : '';
  return '<button class="item" data-id="' + id + '" title="' + esc(tr(s.desc)) + '"><i class="dot ' + s.cat + '" aria-hidden="true"></i>' + iconSVG(s) + '<span class="nm">' + nm(id) + '</span>' + sub + ph + '</button>'; }
function renderShelf(){
  const g = $('#shelfGrid'); const q = SEARCH.trim().toLowerCase();
  const ok = id => { const s = SPECIES[id];
    if(FILTER === 'home' && s.cat !== 'home') return false; if(FILTER === 'lab' && s.cat === 'home') return false;
    if(q && !(s.n.en.toLowerCase().includes(q) || s.n.ro.toLowerCase().includes(q) || (s.f || '').toLowerCase().includes(q))) return false; return true; };
  let h = '';
  for(const [grp, name] of GROUPS){ const ids = SHELF.filter(id => SPECIES[id].grp === grp && ok(id)); if(!ids.length) continue;
    h += '<div class="grp-h">' + tr(name) + '</div>' + ids.map(shelfItemHTML).join(''); }
  g.innerHTML = h || '<p class="meta">' + t('noMatch') + '</p>';
  highlightStep();
}

// ---------- results ----------
const nmLow = id => { const s = nm(id); return SPECIES[id].shelf ? s.charAt(0).toLowerCase() + s.slice(1) : s; };
function wordEq(r){
  const R = r.rule;
  if(R.wordsOverride){ const f = x => typeof x === 'string' ? nmLow(x) : tr(x); return R.wordsOverride.r.map(f).join(' + ') + ' → ' + R.wordsOverride.p.map(f).join(' + '); }
  const toks = R.needs.map((tok, i) => tok === '@water' ? 'water' : (r.reactants && r.reactants[i]) || tok.split('|')[0]);
  let re = toks; if(R.id === 'h2o2_yeast') re = [toks[0]];
  re = [...new Set(re)].map(nmLow).concat((R.wr || []).map(nmLow));
  const pr = [...new Set(R.produce || [])].map(nmLow).concat((R.wp || []).map(nmLow));
  return re.join(' + ') + ' → ' + pr.join(' + ');
}
const SIGNS = [['gas','sigGas'],['color','sigColor'],['solid','sigSolid'],['heat','sigHeat'],['cold','sigCold'],['light','sigLight'],['smell','sigSmell']];
function signsHTML(on){
  if(LEVEL === 0){ if(!on.length) return ''; return '<div class="signs">' + SIGNS.filter(s => on.indexOf(s[0]) >= 0).map(s => '<span class="sign on">' + t(s[1]) + '</span>').join('') + '</div>'; }
  return '<p class="eyebrow" style="margin-top:8px">' + t('signsTitle') + '</p><div class="signs">' + SIGNS.map(s => '<span class="sign' + (on.indexOf(s[0]) >= 0 ? ' on' : '') + '">' + t(s[1]) + '</span>').join('') + '</div>';
}
const SAFE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 16H3z"/><path d="M12 10v4M12 17h.01"/></svg>';
function safetyHTML(level){ const k = level === 'lab' ? 'sLab' : level === 'adult' ? 'sAdult' : 'sHome'; return '<div class="safety s-' + level + '">' + SAFE_ICON + '<span>' + t(k) + '</span></div>'; }
function ruleCard(r, primary){
  const R = r.rule, vars = r.varsFn ? r.varsFn() : {};
  let h = '<div class="head"><span class="pill ' + (R.kind === 'chem' ? 'chem' : 'phys') + '">' + t(R.kind === 'chem' ? 'chemical' : 'physical') + '</span></div>';
  h += (primary ? '<h3>' : '<h4>') + fill(tr(R.title), vars) + (primary ? '</h3>' : '</h4>');
  h += '<p>' + fill(lv(R), vars) + (R.id === 'h2o2_yeast' && LEVEL >= 1 ? '' : '') + '</p>';
  if(!primary) return h;
  h += signsHTML(R.signs || []);
  if(LEVEL >= 1 && !R.noEq) h += '<div class="eq words"><span class="lbl">' + t('wordEq') + '</span>' + esc(wordEq(r)) + '</div>';
  if(LEVEL === 2 && R.eq) h += '<div class="eq"><span class="lbl">' + t('chemEq') + '</span>' + esc(R.eq) + '</div>' + (R.energy ? '<p class="meta">' + t(R.energy) + '</p>' : '');
  if(R.id === 'h2o2_yeast' && LEVEL >= 1) h += '<p class="meta">' + tr(S.catalystNote) + '</p>';
  if(R.fact) h += '<div class="fact"><b>' + t('realWorld') + '</b>' + tr(R.fact) + '</div>';
  h += safetyHTML(R.safety || 'home');
  if(typeof labCardExtras === 'function') h += labCardExtras(r);
  h += '<div class="row-btns"><button class="btn small prof-btn" data-prof="1">' + PROF_ICON + t('askProf') + '</button>' + (R.zoom ? '<button class="btn primary small" data-zoom="1">' + t('seeAtoms') + '</button>' : '') + '</div>';
  return h;
}
function resultCard(r, primary){
  if(r.kind === 'rule') return ruleCard(r, primary);
  const s = SPECIES[r.id];
  if(r.kind === 'info'){
    let h = '<p class="eyebrow">' + t('newSub') + '</p><h3>' + fill(t('addedTitle'), {Name:nm(r.id), name:nmLow(r.id)}) + (LEVEL >= 1 && s.f ? ' <span class="f">' + s.f + '</span>' : '') + '</h3>';
    h += '<p>' + tr(s.desc) + '</p><p>' + t('addedNext') + '</p>' + safetyHTML(s.cat || 'home') + '<div class="row-btns"><button class="btn small prof-btn" data-prof="1">' + PROF_ICON + t('askProf') + '</button></div>';
    return h;
  }
  if(r.kind === 'none'){
    const others = joinList(r.others.map(nmLow));
    let h = '<div class="head"><span class="pill none">' + t('noReaction') + '</span></div><h3>' + t('noneTitle') + '</h3>';
    h += '<p>' + fill(t('noneB'), {Name:nm(r.id), others}) + '</p>';
    if(LEVEL >= 1) h += '<p>' + t('noneE') + '</p>';
    if(LEVEL === 2) h += '<p>' + t('noneS') + '</p>';
    h += signsHTML([]);
    h += '<div class="row-btns"><button class="btn small prof-btn" data-prof="1">' + PROF_ICON + t('askProf') + '</button></div>';
    return h;
  }
  return '';
}
function renderResults(){
  const area = $('#resultArea');
  if(!LAST.length){
    area.innerHTML = '<div class="card"><p class="eyebrow">' + t('whatHappened') + '</p><h3>' + tr(S.welcomeTitle) + '</h3><p>' + tr(S.welcome1) + '</p><p>' + tr(S.welcome2) + '</p><p>' + tr(S.welcome3) + '</p><p class="meta">' + tr(S.welcome4) + '</p></div>';
    $('#btnZoom').disabled = true; return;
  }
  let h = '<div class="card result"><p class="eyebrow">' + t('whatHappened') + '</p>' + resultCard(LAST[0], true);
  if(LAST.length > 1){ for(const r of LAST.slice(1)) h += '<div class="chain"><p class="eyebrow">' + t('then') + '</p>' + resultCard(r, false) + '</div>'; }
  h += '</div>';
  area.innerHTML = h;
  const zr = LAST.find(r => r.kind === 'rule' && r.rule.zoom);
  $('#btnZoom').disabled = !zr;
}
function showResults(results){
  LAST = results;
  let chem = false, phys = false, lab = false, none = false;
  for(const r of results){
    if(r.kind === 'rule'){
      if(r.rule.kind === 'chem') chem = true; else phys = true;
      if(r.rule.safety === 'lab') lab = true;
      DISC.add(r.rule.id); DISC_LAST[r.rule.id] = r;
      emit(r.rule.id === 'indicator' ? r.key : 'rule:' + r.key);
    } else if(r.kind === 'none') none = true;
  }
  store.set('disc', [...DISC]);
  const first = results[0];
  if(first.kind === 'rule') flashBanner(fill(tr(first.rule.title), first.varsFn ? first.varsFn() : {}));
  if(!MISSION_JUST_DONE){
    if(MSTATE.off){ MSTATE.off = false; const s = currentStep(); $('#bubble').innerHTML = t('pOff', {step: s ? tr(s.t) : ''}); }
    else if(chem){ say('pReact'); if(lab) $('#bubble').innerHTML += ' ' + t('pLab'); }
    else if(phys) say('pPhys'); else if(none) say('pNone'); else say('pAdded');
  }
  MISSION_JUST_DONE = false;
  renderResults(); renderDisc(); renderContents();
}

// ---------- mission ----------
const STAR = '<svg viewBox="0 0 24 24" fill="#E9821C"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/></svg>';
const BROOM = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></svg>';
function renderMission(){
  const el = $('#missionCard'); const i = CUR_MISSION, m = MISSIONS[i], done = DONE.has(i), active = MSTATE.active === i;
  el.classList.toggle('done', done);
  let h = '<div class="top"><p class="eyebrow">' + t('mission', {n:i + 1, total:MISSIONS.length}) + '</p><span class="star">' + STAR + DONE.size + '/' + MISSIONS.length + '</span></div>';
  h += '<h3>' + tr(m.title) + '</h3><p class="goal">' + tr(m.goal) + '</p>';
  if(!done && !active) h += '<p class="clean-note">' + BROOM + '<span>' + t('cleanNote') + '</span></p>';
  h += '<ol class="steps' + (active || done ? '' : ' idle') + '">' + m.steps.map((stp, k) => {
    const stt = done || (active && k < MSTATE.step) ? 'ok' : active && k === MSTATE.step ? 'now' : '';
    return '<li class="' + stt + '"><span class="n">' + (stt === 'ok' ? '✓' : k + 1) + '</span><span>' + tr(stp.t) + '</span></li>'; }).join('') + '</ol>';
  if(done) h += '<p class="star" style="margin:8px 0 0">' + STAR + t('missionDone') + '</p>';
  if(DONE.size === MISSIONS.length) h += '<p class="meta">' + t('allDone') + '</p>';
  h += '<div class="row-btns">';
  if(!done && !active) h += '<button class="btn small primary" data-act="start">' + t(B.items.length ? 'cleanStart' : 'startMission') + '</button>';
  if(!done && active) h += '<button class="btn small" data-act="start">' + t('restart') + '</button>';
  if(done && i < MISSIONS.length - 1) h += '<button class="btn small primary" data-act="next">' + t('next') + '</button>';
  if(done) h += '<button class="btn small" data-act="start">' + t('playAgain') + '</button>';
  h += '</div>';
  h += '<div class="dots">' + MISSIONS.map((mm, k) => '<button data-m="' + k + '" class="' + (DONE.has(k) ? 'done ' : '') + (k === i ? 'cur' : '') + '" aria-label="' + esc(tr(mm.title)) + '" title="' + esc(tr(mm.title)) + '"></button>').join('') + '</div>';
  el.innerHTML = h;
  highlightStep();
}
function gotoMission(k){ CUR_MISSION = Math.max(0, Math.min(MISSIONS.length - 1, k)); if(MSTATE.active !== CUR_MISSION) MSTATE.active = null; renderMission(); }
function startMission(){
  if(ANIM.cur) return;
  const i = CUR_MISSION;
  if(DONE.has(i)){ DONE.delete(i); store.set('done', [...DONE]); }
  washBeaker(true);
  MSTATE.active = i; MSTATE.step = 0; MSTATE.off = false;
  renderMission(); sayStep(true);
}
function currentStep(){ const a = MSTATE.active; if(a == null || DONE.has(a)) return null; return MISSIONS[a].steps[MSTATE.step] || null; }
function sayStep(first){
  const s = currentStep(); if(!s) return;
  const n = MSTATE.step + 1;
  const line = t(first ? 'pStart' : 'pNext', {n, step:tr(s.t)});
  const b = $('#bubble');
  if(first) b.innerHTML = line; else b.innerHTML = b.innerHTML.split('<br><span class="nextline">')[0] + '<br><span class="nextline">' + line + '</span>';
  highlightStep();
}
function highlightStep(){
  document.querySelectorAll('.hl').forEach(e => e.classList.remove('hl'));
  const s = currentStep(); if(!s || TAB !== 'lab') return;
  s.ev.split('|').forEach(ev => {
    if(ev.indexOf('add:') === 0){ const el = document.querySelector('.item[data-id="' + ev.slice(4) + '"]'); if(el) el.classList.add('hl'); }
    if(ev === 'heat:on' && !B.heat) $('#btnHeat').classList.add('hl');
    if(ev === 'stir') $('#btnStir').classList.add('hl');
    if(typeof labHighlight === 'function') labHighlight(ev);
  });
  const first = document.querySelector('.item.hl');
  if(first){ const g = $('#shelfGrid'); if(g.scrollHeight > g.clientHeight + 4) g.scrollTop = first.offsetTop - g.offsetTop - 60; if(g.scrollWidth > g.clientWidth + 4) g.scrollLeft = first.offsetLeft - g.offsetLeft - 20; }
}

// ---------- discoveries ----------
function renderDisc(){
  const el = $('#discCard'); const n = DISC.size;
  let h = '<div class="top" style="display:flex;justify-content:space-between;align-items:baseline"><p class="eyebrow">' + t('disc') + '</p><b style="font-family:var(--display);font-weight:600;font-size:18px">' + n + ' / ' + TOTAL_DISC + '</b></div>';
  h += '<div class="bar"><i style="width:' + (n/TOTAL_DISC*100).toFixed(1) + '%"></i></div>';
  if(!n) h += '<p class="meta">' + t('discHelp') + '</p>';
  h += '<div class="list">' + [...DISC].filter(id => RULE_INFO[id]).map(id => { const R = RULE_INFO[id]; const last = DISC_LAST[id]; const vars = last && last.varsFn ? last.varsFn() : discDefaults(id);
    return '<button data-disc="' + id + '">' + esc(fill(tr(R.title), vars)) + '</button>'; }).join('');
  if(n < TOTAL_DISC) h += '<span class="locked">' + t('undiscovered', {n:TOTAL_DISC - n}) + '</span>';
  h += '</div>';
  el.innerHTML = h;
}
function discDefaults(id){
  if(id === 'indicator') return {color:tr(PH_BANDS[1].n), ph:'3', side:LANG === 'ro' ? 'acid' : 'acid'};
  if(id === 'evaporate') return {list:nm('salt') + '.'};
  const R = RULE_INFO[id]; return R.vars ? R.vars([], {cab:false}) : {};
}
function showDiscovery(id){
  const r = DISC_LAST[id] || {kind:'rule', rule:RULE_INFO[id], key:id, varsFn:() => discDefaults(id)};
  LAST = [r]; renderResults();
  $('#resultArea').scrollIntoView({behavior: REDUCED ? 'auto' : 'smooth', block:'nearest'});
}

// ---------- HUD & contents ----------
const HUD = {ph:null, temp:null, level:null};
function updateHUD(){
  const ph = computePH(); const key = (ph == null ? 'x' : ph.toFixed(1)) + '|' + LEVEL + '|' + LANG;
  if(key !== HUD.ph){
    HUD.ph = key;
    $('#phGauge').style.opacity = ph == null ? .55 : 1;
    if(LEVEL === 0){
      $('#phLabel').textContent = t('sourScale');
      $('#phVal').textContent = ph == null ? '—' : ph < 6 ? t('sour') : ph > 8 ? t('soapy') : t('neutral');
      $('#phLeft').textContent = t('sour'); $('#phRight').textContent = t('soapy');
    } else {
      $('#phLabel').textContent = 'pH';
      $('#phVal').textContent = ph == null ? '—' : ph.toFixed(1).replace('.', LANG === 'ro' ? ',' : '.') + ' · ' + (ph < 6.5 ? t('acidic') : ph > 7.5 ? t('basic') : t('neutral').toLowerCase());
      $('#phLeft').textContent = '0'; $('#phRight').textContent = '14';
    }
    $('#phMark').style.left = (ph == null ? 50 : ph/14*100) + '%';
  }
  const tv = Math.round(B.temp);
  if(tv !== HUD.temp){ HUD.temp = tv; $('#tVal').textContent = tv + ' °C'; $('#tMark').style.left = clamp01(tv/260)*100 + '%'; }
}
function renderContents(){
  const el = $('#contents');
  const ids = B.items.map(i => i.id).filter(id => SPECIES[id].st !== 'g');
  if(!ids.length){ el.innerHTML = '<span>' + t('emptyBeaker') + '</span>'; return; }
  const counts = {}; ids.forEach(id => counts[id] = (counts[id] || 0) + 1);
  el.innerHTML = '<span>' + t('inBeaker') + '</span>' + Object.keys(counts).map(id => { const s = SPECIES[id];
    const col = s.c || (s.st === 'd' ? '#e9f3fb' : '#eee');
    return '<span class="c"><i style="background:' + col + '"></i>' + nm(id) + (counts[id] > 1 ? ' ×' + counts[id] : '') + (LEVEL >= 1 && s.f ? ' <span class="f" style="color:var(--muted)">' + s.f + '</span>' : '') + '</span>'; }).join('');
  if(TAB === 'lab') renderMission();
}
function updateHeatBtn(){ const b = $('#btnHeat'); b.setAttribute('aria-pressed', String(B.heat)); $('#heatLbl').textContent = t(B.heat ? 'heatOff' : 'heatOn'); }

// ---------- zoom modal ----------
function openZoom(r){
  if(!r || !r.rule || !r.rule.zoom) return;
  Z.open = true; $('#zoomModal').hidden = false;
  $('#zoomTitle').textContent = t('zoomTitle') + ': ' + fill(tr(r.rule.title), r.varsFn ? r.varsFn() : {});
  $('#zoomCap').textContent = t(LEVEL === 2 ? 'conserveS' : 'conserve');
  sizeZoom(); zoomPrepare(r.rule.zoom); Z.cur = r;
  $('#zoomClose').focus();
}
function closeZoom(){ Z.open = false; $('#zoomModal').hidden = true; }
function sizeZoom(){
  const c = Z.canvas, rect = c.getBoundingClientRect(); const dpr = Math.min(2, window.devicePixelRatio || 1);
  c.width = Math.round(rect.width*dpr); c.height = Math.round(rect.height*dpr);
  Z.ctx.setTransform(dpr*rect.width/Z.W, 0, 0, dpr*rect.height/Z.H, 0, 0);
}

// ---------- canvases ----------
function sizeCanvas(canvas, ctx, W, H){
  const rect = canvas.getBoundingClientRect(); if(!rect.width) return;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = Math.round(rect.width*dpr); canvas.height = Math.round(rect.height*dpr);
  ctx.setTransform(dpr*rect.width/W, 0, 0, dpr*rect.height/H, 0, 0);
}
function resizeAll(){
  if(TAB === 'lab') sceneResize();
  if(TAB === 'atoms') sizeCanvas(AT.canvas, AT.ctx, AT.W, AT.W);
  if(TAB === 'molecules') sizeCanvas(MB.canvas, MB.ctx, MB.W, MB.H);
  if(TAB === 'course') sizeCanvas(CR.canvas, CR.ctx, CR.W, CR.H);
  if(Z.open) sizeZoom();
}

// ---------- static text & settings ----------
function applyStatic(){
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-i]').forEach(el => { el.textContent = t(el.dataset.i); });
  $('#shelfSearch').placeholder = t('searchPh');
  document.querySelectorAll('#levelSeg button').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.level === LEVEL)));
  document.querySelectorAll('#langSeg button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === LANG)));
  $('#catLegend').innerHTML = Object.keys(CAT_COLORS).map(k => '<span><i style="background:' + CAT_COLORS[k] + '"></i>' + t(CAT_KEYS[k]) + '</span>').join('');
  $('#tray').innerHTML = TRAY.map(el => { const E = EL[el]; return '<button data-el="' + el + '" style="background:radial-gradient(circle at 35% 30%, ' + shade(E.c, .55) + ', ' + E.c + ' 55%, ' + shade(E.c, -.3) + ');color:' + E.txt + '" aria-label="' + el + '">' + el + '</button>'; }).join('');
}
function rerenderAll(){
  applyStatic(); renderShelf(); renderResults(); renderMission(); renderDisc(); renderContents(); updateHeatBtn();
  HUD.ph = null; SC.bg = null; renderAtomUI(); renderMolUI();
  renderCourseMap(); if(CR.lesson){ renderLesson(); renderLessonSide(); }
  if(Z.open && Z.cur){ $('#zoomTitle').textContent = t('zoomTitle') + ': ' + fill(tr(Z.cur.rule.title), Z.cur.varsFn ? Z.cur.varsFn() : {}); $('#zoomCap').textContent = t(LEVEL === 2 ? 'conserveS' : 'conserve'); }
}
function showAtomStage(){
  const st = document.querySelector('#tab-atoms .atom-stage'); if(!st) return;
  const top = st.getBoundingClientRect().top + scrollY - 12;
  scrollTo({top, behavior:REDUCED ? 'auto' : 'smooth'});
  const box = st.querySelector('.atom-box'); box.classList.remove('flash'); void box.offsetWidth; box.classList.add('flash');
}
function buildPTable(){
  const pt = $('#ptable'); let h = '';
  for(const E of ELEMENTS_ALL){ const z = E[0]; let row = E[6], col = E[7];
    if(col == null){ if(z >= 57 && z <= 71){ row = 9; col = z - 57 + 3; } else { row = 10; col = z - 89 + 3; } }
    h += '<button data-z="' + z + '" title="' + esc(LANG === 'ro' ? E[3] : E[2]) + '" style="grid-row:' + row + ';grid-column:' + col + ';background:' + CAT_COLORS[E[5]] + '" aria-pressed="false"><small>' + z + '</small><b>' + E[1] + '</b></button>'; }
  h += '<span class="pt-f" style="grid-row:6;grid-column:3">57–71</span><span class="pt-f" style="grid-row:7;grid-column:3">89–103</span><span class="pt-gap" style="grid-row:8;grid-column:1"></span>';
  pt.innerHTML = h;
}
function switchTab(tab){
  TAB = tab;
  document.querySelectorAll('#tabs button').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === tab)));
  $('#tab-lab').hidden = tab !== 'lab'; $('#tab-atoms').hidden = tab !== 'atoms'; $('#tab-molecules').hidden = tab !== 'molecules'; $('#tab-course').hidden = tab !== 'course';
  if(tab !== 'course'){ courseLeave(); } else if(CR.canvas) courseEnter(); highlightStep();
  store.set('tab', tab);
  requestAnimationFrame(resizeAll);
}

// ---------- events ----------
function bindEvents(){
  $('#tabs').addEventListener('click', e => { const b = e.target.closest('button[data-tab]'); if(b) switchTab(b.dataset.tab); });
  $('#levelSeg').addEventListener('click', e => { const b = e.target.closest('button[data-level]'); if(!b) return; LEVEL = +b.dataset.level; store.set('level', LEVEL); rerenderAll(); });
  $('#langSeg').addEventListener('click', e => { const b = e.target.closest('button[data-lang]'); if(!b) return; LANG = b.dataset.lang; store.set('lang', LANG); rerenderAll(); if(!LAST.length) say('pGreet'); });
  $('#shelfFilters').addEventListener('click', e => { const b = e.target.closest('button[data-filter]'); if(!b) return; FILTER = b.dataset.filter; document.querySelectorAll('#shelfFilters button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); renderShelf(); });
  // shelf: click to add, mouse drag onto the beaker
  const grid = $('#shelfGrid'), ghost = $('#ghost'), scene = $('#scene');
  let drag = null, suppress = false;
  grid.addEventListener('click', e => { const b = e.target.closest('.item'); if(!b) return; if(suppress){ suppress = false; return; } requestAdd(b.dataset.id); });
  grid.addEventListener('pointerdown', e => { if(e.pointerType !== 'mouse' || e.button !== 0) return; const b = e.target.closest('.item'); if(!b) return; drag = {id:b.dataset.id, x:e.clientX, y:e.clientY, on:false}; });
  window.addEventListener('pointermove', e => {
    if(!drag) return;
    if(!drag.on && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 7){ drag.on = true; ghost.innerHTML = iconSVG(SPECIES[drag.id]); ghost.hidden = false; }
    if(drag.on){ ghost.style.left = e.clientX + 'px'; ghost.style.top = e.clientY + 'px'; const r = scene.getBoundingClientRect(); const over = e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom; scene.classList.toggle('drop-over', over); drag.over = over; }
  });
  window.addEventListener('pointerup', () => {
    if(!drag) return;
    if(drag.on){ suppress = true; setTimeout(() => suppress = false, 50); if(drag.over) requestAdd(drag.id); }
    ghost.hidden = true; scene.classList.remove('drop-over'); drag = null;
  });
  $('#btnHeat').addEventListener('click', () => { B.heat = !B.heat; if(B.heat){ say(B.items.length ? 'pHeat' : 'pHeatEmpty'); emit('heat:on'); } updateHeatBtn(); highlightStep(); });
  $('#btnStir').addEventListener('click', () => { FX.stir = nowS(); FX.swirls.push({t0:nowS(), dur:2.2}); B.wave = 1;
    if(B.seq && B.seq.stirReset && B.items.some(i => i.uid === B.seq.uid)){ B.seq.t0 = nowS(); say('pShake'); } else say('pStir'); emit('stir'); });
  $('#shelfSearch').addEventListener('input', e => { SEARCH = e.target.value; renderShelf(); });
  $('#btnProf').addEventListener('click', openProf);
  $('#profClose').addEventListener('click', closeProf);
  $('#profOverlay').addEventListener('click', e => { if(e.target.id === 'profOverlay') closeProf(); });
  $('#profPrev').addEventListener('click', () => profGo(PROF.i - 1));
  $('#profNext').addEventListener('click', () => { if(PROF.i < PROF.pages.length - 1) profGo(PROF.i + 1); else closeProf(); });
  $('#profSpeak').addEventListener('click', () => { SPEAK = !SPEAK; store.set('speak', SPEAK); $('#profSpeak').setAttribute('aria-pressed', String(SPEAK)); if(SPEAK) speak(PROF.pages[PROF.i] && PROF.pages[PROF.i].say); else stopSpeak(); });
  $('#profAsk').addEventListener('submit', e => { e.preventDefault(); askProf(); });
  $('#btnWash').addEventListener('click', () => { if(ANIM.cur) return; washBeaker(); if(MSTATE.active != null && !DONE.has(MSTATE.active)){ MSTATE.step = 0; renderMission(); sayStep(true); } });
  $('#btnZoom').addEventListener('click', () => openZoom(LAST.find(r => r.kind === 'rule' && r.rule.zoom)));
  $('#resultArea').addEventListener('click', e => { if(e.target.closest('[data-zoom]')) openZoom(LAST.find(r => r.kind === 'rule' && r.rule.zoom)); if(e.target.closest('[data-prof]')) openProf(); });
  $('#missionCard').addEventListener('click', e => {
    const d = e.target.closest('button[data-m]'); if(d){ gotoMission(+d.dataset.m); return; }
    const b = e.target.closest('button[data-act]'); if(!b) return;
    if(b.dataset.act === 'start') startMission();
    if(b.dataset.act === 'next'){ gotoMission(CUR_MISSION + 1); say('pNewMission'); }
  });
  $('#discCard').addEventListener('click', e => { const b = e.target.closest('button[data-disc]'); if(b) showDiscovery(b.dataset.disc); });
  $('#zoomClose').addEventListener('click', closeZoom);
  $('#zoomReplay').addEventListener('click', () => { if(Z.spec) zoomPrepare(Z.spec); });
  $('#zoomModal').addEventListener('click', e => { if(e.target.id === 'zoomModal') closeZoom(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape'){ if(Z.open) closeZoom(); else if(PROF.open) closeProf(); } });
  // atoms
  $('#ptable').addEventListener('click', e => { const b = e.target.closest('button[data-z]'); if(b){ loadElement(+b.dataset.z); showAtomStage(); } });
  $('#backToTable').addEventListener('click', () => { const pt = document.querySelector('#tab-atoms .pt-card'); const btn = document.querySelector('#ptable button[aria-pressed="true"]'); pt.scrollIntoView({behavior:REDUCED ? 'auto' : 'smooth', block:'start'}); if(btn) setTimeout(() => btn.focus({preventScroll:true}), 400); });
  $('#atomControls').addEventListener('click', e => { const b = e.target.closest('button[data-k]'); if(!b) return; const k = b.dataset.k, d = +b.dataset.d; const max = {p:118, n:180, e:118}[k]; AT[k] = Math.max(0, Math.min(max, AT[k] + d)); renderAtomUI(); });
  // molecules
  $('#tray').addEventListener('click', e => { const b = e.target.closest('button[data-el]'); if(b) molAdd(b.dataset.el); });
  $('#challenges').addEventListener('click', e => { const b = e.target.closest('button[data-mol]'); if(b) molPeek(b.dataset.mol); });
  $('#molInfo').addEventListener('click', e => { const b = e.target.closest('button[data-build]'); if(b) molBuild(b.dataset.build); });
  $('#molClear').addEventListener('click', () => { MB.atoms = []; MB.built = null; renderMolUI(); });
  MB.canvas.addEventListener('click', e => { const r = MB.canvas.getBoundingClientRect(); molRemoveAt((e.clientX - r.left)/r.width*MB.W, (e.clientY - r.top)/r.height*MB.H); });
  window.addEventListener('resize', resizeAll);
  document.addEventListener('click', e => { const b = e.target.closest('[data-learn]'); if(b) openLessonFromLab(b.dataset.learn); });
}

// ---------- main loop ----------
let lastT = nowS();
function loop(){
  const t = nowS(); const dt = Math.min(.05, t - lastT); lastT = t;
  heatTick(dt); animTick();
  B.dispVol += (B.vol - B.dispVol)*Math.min(1, dt*3.2);
  const tgt = targetLiquidColor(); if(!B.disp) B.disp = tgt.slice();
  const rate = t < B.colorRateUntil ? B.colorRate : 2.2; for(let i = 0; i < 4; i++) B.disp[i] += (tgt[i] - B.disp[i])*Math.min(1, dt*rate);
  if(TAB === 'lab'){ fxUpdate(dt, t); fxUpdate2(dt, t); drawScene(t); updateHUD(); }
  else if(TAB === 'atoms') drawAtomTab(t);
  else if(TAB === 'course') drawCourse(t);
  else drawMolTab(t, dt);
  if(Z.open) zoomDraw();
  requestAnimationFrame(loop);
}

function init(){
  SC.canvas = $('#sceneCanvas'); SC.ctx = SC.canvas.getContext('2d');
  AT.canvas = $('#atomCanvas'); AT.ctx = AT.canvas.getContext('2d');
  MB.canvas = $('#molCanvas'); MB.ctx = MB.canvas.getContext('2d');
  Z.canvas = $('#zoomCanvas'); Z.ctx = Z.canvas.getContext('2d');
  buildPTable(); bindEvents(); rerenderAll(); initCourse();
  say('pGreet');
  switchTab('course');
  if(typeof bindIntro === 'function'){ bindIntro(); openIntro(); }
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(() => { SC.bg = null; });
  requestAnimationFrame(loop);
}
init();

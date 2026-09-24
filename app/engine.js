// ===================== beaker engine =====================
const AMBIENT = 21, MAXVOL = 5;
const B = { items:[], vol:0, oilVol:0, dispVol:0, temp:AMBIENT, heat:false, fired:new Set(), lastBand:null, uid:1,
  colorRate:2, colorRateUntil:0, disp:null, wave:0, boiling:false, oilWarned:false, boilSaid:false, pendingVol:0 };
let DISC = new Set(store.get('disc', []));
let DONE = new Set(store.get('done', []));
let LAST = []; // last shown results (data)
const nowS = () => performance.now()/1000;

function hasId(id){ return B.items.some(i => i.id === id); }
function tokMatch(tok, id){
  if(tok === '@water') return !!SPECIES[id].aq;
  if(tok.indexOf('|') >= 0) return tok.split('|').indexOf(id) >= 0;
  return tok === id;
}
function matchRule(rule, newSet){
  const toks = rule.needs, used = new Set(), res = [];
  const bt = (k) => {
    if(k === toks.length) return !newSet || res.some(it => newSet.has(it.uid));
    for(const it of B.items){
      if(used.has(it.uid) || !tokMatch(toks[k], it.id)) continue;
      used.add(it.uid); res[k] = it;
      if(bt(k+1)) return true;
      used.delete(it.uid);
    }
    return false;
  };
  return bt(0) ? res.slice() : null;
}
function liquidPresent(){ return B.vol > 0.01; }
function waterPresent(){ return B.items.some(i => SPECIES[i.id].aq) && B.vol - B.oilVol > 0.01; }

function computePH(){
  if(typeof labPH === 'function'){ const lp = labPH(); if(lp != null) return lp; }
  if(!waterPresent()) return null;
  let sum = 0; for(const it of B.items){ const s = SPECIES[it.id]; if(s.ph && (s.st === 'l' || s.st === 'd')) sum += s.ph; }
  return Math.max(0, Math.min(14, 7 + sum));
}

function applyRule(rule, match){
  const t = nowS();
  const consumed = new Set((rule.consume || []).map(k => match[k].uid));
  // remember where consumed objects were, for effects
  B.items = B.items.filter(i => !consumed.has(i.uid));
  const produced = [];
  for(const pid of rule.produce || []){
    if(pid === 'water' && hasId('water')) continue;
    const it = {uid:B.uid++, id:pid, t:t + (rule.pDelay || 0)}; B.items.push(it); produced.push(it);
  }
  if(!(rule.consume && rule.consume.length)) B.fired.add(rule.key);
  if(rule.temp) B.temp += rule.temp;
  if(rule.colorRate){ B.colorRate = rule.colorRate; B.colorRateUntil = t + 12; }
  if(rule.volMul != null){ B.vol = B.oilVol + (B.vol - B.oilVol)*rule.volMul; if(rule.volMul === 0) B.items = B.items.filter(i => !(SPECIES[i.id].aq && SPECIES[i.id].st === 'l' && SPECIES[i.id].volatile)); }
  if(rule.crack) B.cracked = true;
  if(rule.seq){ B.seq = {t0:t, steps:rule.seq, stirReset:rule.stirReset, uid:produced.length ? produced[0].uid : null}; B.colorRate = 4; B.colorRateUntil = t + 30; }
  FX.start(rule, match, t);
  if(rule.after) rule.after(match, produced);
  const ctx = {cab: hasId('cabbage')};
  const varsFn = () => rule.vars ? rule.vars(match, ctx) : {};
  return {kind:'rule', rule, varsFn, key:rule.key, reactants:match.map(m => m.id), produced:produced.map(p => p.uid)};
}

function processReactions(newUids){
  let newSet = new Set(newUids); const results = []; const round = new Set();
  for(let guard = 0; guard < 6; guard++){
    let hit = null, m = null;
    for(const r of RULES){
      if(r.special || r.heatOnly || round.has(r.key)) continue;
      if(r.quiet && results.length) continue;
      if(r.unless && r.unless.some(hasId)) continue;
      if(r.cond && !r.cond()) continue;
      if(!(r.consume && r.consume.length) && B.fired.has(r.key)) continue;
      m = matchRule(r, newSet); if(m){ hit = r; break; }
    }
    if(!hit) break;
    round.add(hit.key);
    const res = applyRule(hit, m); if(!hit.silent) results.push(res);
    const next = new Set();
    for(const u of newSet) if(B.items.some(i => i.uid === u)) next.add(u);
    for(const u of res.produced) next.add(u);
    newSet = next;
  }
  return results;
}

function checkIndicator(){
  if(!hasId('cabbage') || !waterPresent()){ B.lastBand = null; return null; }
  const ph = computePH(); const band = phBand(ph);
  if(band.key === B.lastBand) return null;
  const prev = B.lastBand; B.lastBand = band.key;
  if(prev === null && band.key === 'purple') return null;
  const side = ph < 6 ? 'acid' : ph > 8 ? 'base' : 'neutral';
  const sideName = side === 'acid' ? L('acid','acid') : side === 'base' ? L('base','bază') : L('neutral','neutru');
  return {kind:'rule', rule:IND_RULE, key:'indicator:' + side,
    varsFn: () => ({color:tr(band.n), ph:ph.toFixed(1).replace('.', LANG === 'ro' ? ',' : '.'), side:tr(sideName)})};
}

// ---- adding things (queued behind the pour animation)
const QUEUE = [];
function requestAdd(id){
  const s = SPECIES[id];
  if(B.items.length + QUEUE.length >= 12 || (s.vol && B.vol + B.pendingVol + 1 > MAXVOL)){ say('pFull'); flashBanner(t('pFull')); return; }
  if(QUEUE.length >= 2){ say('pBusy'); return; }
  if(s.vol) B.pendingVol += 1;
  QUEUE.push(id);
  if(!ANIM.cur) startNextPour();
}
function commitAdd(id){
  const s = SPECIES[id]; const it = {uid:B.uid++, id, t:nowS()}; B.items.push(it);
  if(s.vol){ B.vol += 1; B.pendingVol = Math.max(0, B.pendingVol - 1); if(id === 'oil') B.oilVol += 1; }
  B.wave = Math.max(B.wave, s.vol ? 1 : .6);
  B.oilWarned = false; B.boilSaid = false;
  emit('add:' + id);
  const results = processReactions([it.uid]);
  const ind = checkIndicator(); if(ind) results.push(ind);
  if(typeof labAfterAdd === 'function') labAfterAdd(results);
  if(!results.length){
    const others = [...new Set(B.items.filter(i => i.uid !== it.uid).map(i => i.id))];
    results.push(others.length ? {kind:'none', id, others} : {kind:'info', id});
  }
  showResults(results, id);
}

// ---- heat
function heatTick(dt){
  if(B.heat){
    if(waterPresent()){
      if(B.temp < 100) B.temp = Math.min(100, B.temp + 11*dt);
      else {
        B.boiling = true;
        if(!B.boilSaid){ B.boilSaid = true; say('pBoil'); }
        B.vol = Math.max(B.oilVol, B.vol - .42*dt);
        if(B.vol - B.oilVol <= .01) finishEvaporation();
      }
    } else if(liquidPresent()){
      B.boiling = false;
      B.temp = Math.min(185, B.temp + 12*dt);
      if(B.temp > 170 && !B.oilWarned){ B.oilWarned = true; say('pOil'); }
    } else {
      B.boiling = false;
      B.temp = Math.min(B.items.length ? 260 : 150, B.temp + 24*dt);
      if(B.items.length) dryHeatRules();
    }
  } else {
    B.boiling = false;
    B.temp += (AMBIENT - B.temp) * Math.min(1, .12*dt);
  }
  if(typeof labTick === 'function') labTick(dt);
}
function dryHeatRules(){
  const t = nowS();
  for(const r of RULES){
    if(!r.heatOnly || r.wet || B.temp < r.minT) continue;
    if(!(r.consume && r.consume.length) && B.fired.has(r.key)) continue;
    const m = matchRule(r, null); if(!m) continue;
    if(r.minAge && m.some(it => t - it.t < r.minAge)) continue;
    const res = applyRule(r, m);
    showResults([res]);
    return;
  }
}
function finishEvaporation(){
  B.vol = B.oilVol; B.boiling = false;
  const left = []; const next = [];
  for(const it of B.items){
    const s = SPECIES[it.id];
    if(s.volatile) continue;
    if(s.res){ next.push({uid:it.uid, id:s.res, t:it.t}); if(s.res !== 'oil') left.push(s.res); if(s.res === 'oil' && B.oilVol < 1){ B.oilVol = 1; B.vol = 1; } }
    else { next.push(it); if((s.st === 'd' || s.st === 'l') && it.id !== 'oil') left.push(it.id); }
  }
  B.items = next; B.lastBand = null;
  const ids = [...new Set(left)];
  const key = 'evaporate:' + (left.indexOf('salt') >= 0 ? 'salt' : 'other');
  FX.emit({t:'steam', dur:2, rate:8}, nowS());
  showResults([{kind:'rule', rule:EVAP_RULE, key, varsFn:() => ({list: ids.length ? joinList(ids.map(nm)) + '.' : t('nothingLeft')})}]);
}

function washBeaker(quiet){
  B.items = []; B.vol = 0; B.oilVol = 0; B.pendingVol = 0; B.heat = false; B.fired.clear(); B.lastBand = null; B.boiling = false; B.cracked = false; B.seq = null;
  B.temp = Math.min(B.temp, 40); B.wave = .8; QUEUE.length = 0; B.disp = null;
  FX.clear();
  if(typeof labOnWash === 'function') labOnWash();
  LAST = []; renderResults(); if(!quiet) say('pWash'); updateHeatBtn(); renderContents();
}

// ---- missions & discoveries
function evMatch(ev, key){ return ev.split('|').some(e => key === e || key.indexOf(e + ':') === 0); }
function emit(key){
  let completedCurrent = false;
  const act = MSTATE.active;
  if(act != null && !DONE.has(act)){
    const steps = MISSIONS[act].steps, s = steps[MSTATE.step];
    if(s && evMatch(s.ev, key)){ MSTATE.step++; const nx = steps[MSTATE.step]; if(nx && !completedCurrent) setTimeout(() => sayStep(), 350); }
    else if(s && key.indexOf('add:') === 0 && s.ev.indexOf('add:') === 0) MSTATE.off = true;
  }
  MISSIONS.forEach((m, i) => {
    if(DONE.has(i)) return;
    if(key === m.key || key.indexOf(m.key + ':') === 0){
      DONE.add(i); if(i === CUR_MISSION) completedCurrent = true;
      if(i === MSTATE.active) MSTATE.step = m.steps.length;
    }
  });
  store.set('done', [...DONE]);
  if(completedCurrent){ MISSION_JUST_DONE = true; setTimeout(() => { say('pMission'); celebrate(); }, 900); }
  renderMission();
}

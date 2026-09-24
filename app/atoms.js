// ===================== Atoms tab =====================
Object.assign(S, {
  atomB:L('Atoms are the tiny building blocks of everything. In the middle is the nucleus, with protons (red) and neutrons (grey). Electrons (blue) zoom around outside. The number of protons decides which element it is: 1 proton is hydrogen, 8 protons is oxygen.','Atomii sunt cărămizile minuscule din care e făcut totul. În mijloc este nucleul, cu protoni (roșii) și neutroni (gri). Electronii (albaștri) zboară în jurul lui. Numărul de protoni decide ce element este: 1 proton înseamnă hidrogen, 8 protoni înseamnă oxigen.'),
  atomE:L('Protons are positive (+), electrons are negative (−) and neutrons have no charge. When there are as many electrons as protons, the atom is neutral. Electrons live in shells: 2 fit in the first shell, 8 in the second and 8 in the third. The outer electrons decide how an atom reacts.','Protonii sunt pozitivi (+), electronii sunt negativi (−), iar neutronii nu au sarcină. Când există tot atâția electroni câți protoni, atomul este neutru. Electronii stau pe straturi: pe primul încap 2, pe al doilea 8, pe al treilea 8. Electronii exteriori decid cum reacționează un atom.'),
  atomS:L('Atomic number Z = number of protons; mass number A = protons + neutrons. Atoms of one element with different numbers of neutrons are isotopes. Too many or too few neutrons make a nucleus unstable, so it decays (radioactivity). This simple shell picture is the Bohr model; real electrons occupy orbitals.','Numărul atomic Z = numărul de protoni; numărul de masă A = protoni + neutroni. Atomii aceluiași element cu număr diferit de neutroni sunt izotopi. Prea mulți sau prea puțini neutroni fac nucleul instabil, așa că se dezintegrează (radioactivitate). Acest desen cu straturi este modelul Bohr; în realitate electronii ocupă orbitali.'),
  atomNowB:L('This atom has {p} protons, so it is <b>{name}</b>!','Acest atom are {p} protoni, deci este <b>{name}</b>!'),
  atomNeutralB:L('It also has {e} electrons, the same as its protons, so it has no charge.','Are și {e} electroni, tot atâția câți protoni, deci nu are sarcină.'),
  atomIonB:L('It has {e} electrons, which is not the same as its {p} protons, so it has a charge. A charged atom is called an ion.','Are {e} electroni, adică nu tot atâția câți protoni ({p}), deci are sarcină. Un atom încărcat se numește ion.'),
  valLose:L('{name} has {v} electron(s) in its outer shell. It tends to lose them and become a positive ion.','{name} are {v} electron(i) pe stratul exterior. Tinde să-i piardă și să devină ion pozitiv.'),
  valGain:L('{name} has {v} electrons in its outer shell. It tends to gain {g} more and become a negative ion.','{name} are {v} electroni pe stratul exterior. Tinde să mai câștige {g} și să devină ion negativ.'),
  valMetal:L('{name} is a metal. Its atoms give away their outer electrons, so it forms positive ions, and many of its compounds are colourful.','{name} este un metal. Atomii lui își cedează electronii exteriori, așa că formează ioni pozitivi, iar mulți dintre compușii lui sunt colorați.'),
  radioT:L('Radioactive: even its longest-lived isotope ({name}-{A}) decays, with a half-life of {hl}.','Radioactiv: chiar și izotopul său cel mai stabil ({name}-{A}) se dezintegrează, cu un timp de înjumătățire de {hl}.'),
  shellsT:L('Electrons per shell','Electroni pe straturi'), massT:L('Atomic mass','Masa atomică'),
  valShare:L('{name} has {v} electrons in its outer shell. It usually shares electrons, making covalent bonds.','{name} are {v} electroni pe stratul exterior. De obicei își împarte electronii, formând legături covalente.'),
  valFull:L('{name} has a full outer shell, so it hardly reacts at all. It is a noble gas.','{name} are stratul exterior complet, așa că aproape nu reacționează. Este un gaz nobil.'),
  isotope:L('This isotope is {name}-{A}.','Acest izotop este {name}-{A}.'),
});
const AT = {p:8, n:8, e:8, canvas:null, ctx:null, W:520, pulse:0};
function elOf(p){ return ELEMENTS_ALL[p - 1]; }
// electrons per shell for an atom with p protons and e electrons (ions lose/gain from the outermost shells)
function shellsOf(e, p){
  p = p || e; if(!e) return [];
  const E = ELEMENTS_ALL[Math.min(118, Math.max(1, p)) - 1]; const sh = E[10].slice();
  let d = p - e;
  while(d > 0 && sh.length){ const k = sh.length - 1; sh[k]--; d--; if(sh[k] <= 0) sh.pop(); }
  if(d < 0){ const cap = [2, 8, 18, 32, 32, 18, 8]; let add = -d; while(add > 0){ let k = sh.length - 1; if(k < 0 || sh[k] >= (k === sh.length - 1 && sh.length > 1 ? 8 : cap[k])){ sh.push(0); k++; } sh[k]++; add--; } }
  return sh;
}
const ORB_ORDER = ['1s','2s','2p','3s','3p','4s','3d','4p','5s','4d','5p','6s','4f','5d','6p','7s','5f','6d','7p'];
const ORB_CAP = {s:2, p:6, d:10, f:14};
const CFG_EXC = {24:'[Ar] 3d⁵ 4s¹', 29:'[Ar] 3d¹⁰ 4s¹', 41:'[Kr] 4d⁴ 5s¹', 42:'[Kr] 4d⁵ 5s¹', 44:'[Kr] 4d⁷ 5s¹', 45:'[Kr] 4d⁸ 5s¹', 46:'[Kr] 4d¹⁰', 47:'[Kr] 4d¹⁰ 5s¹', 57:'[Xe] 5d¹ 6s²', 58:'[Xe] 4f¹ 5d¹ 6s²', 64:'[Xe] 4f⁷ 5d¹ 6s²', 78:'[Xe] 4f¹⁴ 5d⁹ 6s¹', 79:'[Xe] 4f¹⁴ 5d¹⁰ 6s¹', 89:'[Rn] 6d¹ 7s²', 90:'[Rn] 6d² 7s²', 91:'[Rn] 5f² 6d¹ 7s²', 92:'[Rn] 5f³ 6d¹ 7s²', 93:'[Rn] 5f⁴ 6d¹ 7s²', 96:'[Rn] 5f⁷ 6d¹ 7s²', 103:'[Rn] 5f¹⁴ 7s² 7p¹'};
const SUPD = d => String(d).split('').map(x => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+x]).join('');
function configOf(e, p){
  if(!e) return '—';
  if(e === p && CFG_EXC[e]) return CFG_EXC[e];
  const cores = [[86,'[Rn]'],[54,'[Xe]'],[36,'[Kr]'],[18,'[Ar]'],[10,'[Ne]'],[2,'[He]']];
  let left = e; const parts = [];
  for(const o of ORB_ORDER){ if(left <= 0) break; const k = Math.min(ORB_CAP[o.slice(-1)], left); parts.push([o, k]); left -= k; }
  let core = '', skip = 0;
  if(e > 18){ const c = cores.find(c => c[0] < e); if(c){ core = c[1]; let n = 0; for(const [o, k] of parts){ if(n >= c[0]) break; n += k; skip++; } } }
  return (core ? core + ' ' : '') + parts.slice(skip).map(([o, k]) => o + SUPD(k)).join(' ');
}
function loadElement(z){ const E = elOf(z); AT.p = z; AT.n = E[4]; AT.e = z; renderAtomUI(); }

function drawAtomTab(t){
  const ctx = AT.ctx, W = AT.W; if(!ctx) return;
  ctx.clearRect(0, 0, W, W);
  const bg = ctx.createRadialGradient(W/2, W/2, 10, W/2, W/2, W*.7); bg.addColorStop(0, '#ffffff'); bg.addColorStop(1, '#eaf2ef');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, W);
  const cx = W/2, cy = W/2;
  const sh = shellsOf(AT.e, AT.p); const nShells = Math.max(sh.length, AT.p ? shellsOf(AT.p).length : 1, 1);
  const N0 = AT.p + AT.n, nr = Math.min(8.5, 50/Math.sqrt(Math.max(1, N0))), nucR = nr*1.05*Math.sqrt(Math.max(1, N0)) + nr;
  const r0 = Math.max(nucR + 26, nShells > 4 ? 64 : 82), rMax = nShells > 4 ? 246 : 220;
  const radii = []; for(let k = 0; k < nShells; k++) radii.push(nShells === 1 ? r0 : r0 + k*(rMax - r0)/Math.max(nShells - 1, 3));
  ctx.setLineDash([4, 6]); ctx.lineWidth = 1.5; ctx.strokeStyle = '#b9cbc5';
  for(let k = 0; k < nShells; k++){ ctx.beginPath(); ctx.arc(cx, cy, radii[k], 0, 7); ctx.stroke(); }
  ctx.setLineDash([]);
  // nucleus
  const N = N0;
  const types = []; for(let i = 0; i < N; i++) types.push(Math.floor((i + 1)*AT.p/N) > Math.floor(i*AT.p/N) ? 'p' : 'n');
  const unstable = AT.p > 0 && STABLE_N_ALL[AT.p] && STABLE_N_ALL[AT.p].indexOf(AT.n) < 0;
  const jit = unstable && !REDUCED ? 1.4 : 0;
  if(N){
    const glow = ctx.createRadialGradient(cx, cy, 2, cx, cy, 40 + Math.sqrt(N)*8); glow.addColorStop(0, 'rgba(233,130,28,.25)'); glow.addColorStop(1, 'rgba(233,130,28,0)');
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, 40 + Math.sqrt(N)*8, 0, 7); ctx.fill();
  }
  for(let i = N - 1; i >= 0; i--){
    const r = nr*1.05*Math.sqrt(i), a = i*2.39996;
    const x = cx + Math.cos(a)*r + Math.sin(t*20 + i)*jit, y = cy + Math.sin(a)*r + Math.cos(t*23 + i)*jit;
    const col = types[i] === 'p' ? '#e2553f' : '#9aa6ac';
    const g = ctx.createRadialGradient(x - 3, y - 3, 1, x, y, nr); g.addColorStop(0, shade(col, .5)); g.addColorStop(1, shade(col, -.2));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, nr, 0, 7); ctx.fill();
    if(types[i] === 'p' && N < 30 && nr > 7){ ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.font = '800 9px Nunito, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('+', x, y + .5); }
  }
  // electrons
  sh.forEach((c, k) => {
    const speed = (REDUCED ? .15 : .7)/(k + 1);
    for(let j = 0; j < c; j++){
      const a = t*speed + j*Math.PI*2/c + k*.6;
      const x = cx + Math.cos(a)*radii[k], y = cy + Math.sin(a)*radii[k];
      const er = c > 18 ? 4.2 : c > 8 ? 5.5 : 6.5;
      if(c <= 18){ const g = ctx.createRadialGradient(x, y, 1, x, y, 16); g.addColorStop(0, 'rgba(26,116,179,.35)'); g.addColorStop(1, 'rgba(26,116,179,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 16, 0, 7); ctx.fill(); }
      ctx.fillStyle = '#1a74b3'; ctx.beginPath(); ctx.arc(x, y, er, 0, 7); ctx.fill();
      if(er > 5){ ctx.fillStyle = '#fff'; ctx.font = '800 10px Nunito, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('−', x, y); }
    }
  });
  if(sh.length > 3){ ctx.font = '800 11px Nunito, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; sh.forEach((c, k) => { const x = cx + radii[k]*Math.cos(-Math.PI/4), y = cy + radii[k]*Math.sin(-Math.PI/4); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x, y, 10, 0, 7); ctx.fill(); ctx.fillStyle = '#1a74b3'; ctx.fillText(c, x, y); }); }
  if(!AT.p){ ctx.fillStyle = '#56666D'; ctx.font = '700 16px Nunito, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(t_('noAtom'), cx, cy + (N ? 60 : 0)); }
  else {
    const E = elOf(AT.p); ctx.fillStyle = '#16252E'; ctx.font = '600 22px Fredoka, Nunito, sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillText(LANG === 'ro' ? E[3] : E[2], 18, 34);
    const ch = AT.p - AT.e; if(ch){ ctx.fillStyle = ch > 0 ? '#E9821C' : '#1a74b3'; ctx.font = '800 15px Nunito, sans-serif'; ctx.fillText((ch > 0 ? '+' : '−') + Math.abs(ch) + ' ' + t_(ch > 0 ? 'posIon' : 'negIon').toLowerCase(), 18, 56); }
  }
}

function renderAtomUI(){
  // periodic table buttons state
  document.querySelectorAll('#ptable button').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.z === AT.p)));
  // controls
  const ctr = document.getElementById('atomControls');
  const row = (key, val, color, id) => '<div class="pnc"><div class="lab-name"><i style="background:' + color + '"></i>' + t(key) + '</div><div class="ctr"><button data-d="-1" data-k="' + id + '" aria-label="−">−</button><span>' + val + '</span><button data-d="1" data-k="' + id + '" aria-label="+">+</button></div></div>';
  ctr.innerHTML = row('protons', AT.p, '#e2553f', 'p') + row('neutrons', AT.n, '#9aa6ac', 'n') + row('electrons', AT.e, '#1a74b3', 'e');
  // info
  const info = document.getElementById('atomInfo');
  if(!AT.p){ info.innerHTML = '<p class="eyebrow">' + t('tabAtoms') + '</p><h3>' + t('noAtom') + '</h3><p>' + tr(S.atomB) + '</p>'; return; }
  const E = elOf(AT.p), name = LANG === 'ro' ? E[3] : E[2], A = AT.p + AT.n, ch = AT.p - AT.e;
  const sh = shellsOf(AT.e, AT.p), v = sh.length ? sh[sh.length - 1] : 0;
  const stable = STABLE_N_ALL[AT.p] && STABLE_N_ALL[AT.p].indexOf(AT.n) >= 0;
  let html = '<div class="big-sym"><div class="tile" style="background:' + CAT_COLORS[E[5]] + '"><small>' + AT.p + '</small><b>' + E[1] + '</b></div><div><p class="eyebrow">' + t(CAT_KEYS[E[5]]) + '</p><h3 style="margin:2px 0 0">' + name + '</h3></div></div>';
  html += '<div class="stats"><div><span>' + t('atomicNo') + '</span><b>' + AT.p + '</b></div><div><span>' + t('massNo') + '</span><b>' + A + '</b></div><div><span>' + t('charge') + '</span><b>' + (ch > 0 ? '+' + ch : ch < 0 ? '−' + (-ch) : '0') + '</b></div><div><span>' + t('outerE') + '</span><b>' + v + '</b></div></div>';
  const mass = MASS[AT.p]; html += '<p class="meta" style="margin:6px 0">' + t('shellsT') + ': <b>' + sh.join(', ') + '</b> · ' + t('massT') + ': <b>' + (typeof mass === 'number' ? String(mass).replace('.', LANG === 'ro' ? ',' : '.') : mass) + '</b></p>';
  html += '<div class="chips"><span class="pill ' + (ch ? 'chem' : 'phys') + '">' + t(ch === 0 ? 'neutralAtom' : ch > 0 ? 'posIon' : 'negIon') + '</span>';
  if(LEVEL >= 1) html += '<span class="pill ' + (stable ? 'phys' : 'chem') + '">' + t(stable ? 'stable' : 'unstable') + '</span>';
  html += '</div>';
  if(RADIO_INFO[AT.p]) html += '<p class="meta" style="color:#8A4508">' + fill(tr(S.radioT), {name, A:AT.p + RADIO_INFO[AT.p].n, hl:tr(RADIO_INFO[AT.p].hl)}) + '</p>';
  html += '<p>' + fill(tr(S.atomNowB), {p:AT.p, name}) + ' ' + fill(tr(ch === 0 ? S.atomNeutralB : S.atomIonB), {e:AT.e, p:AT.p}) + '</p>';
  if(LEVEL >= 1){
    const neutralSh = shellsOf(AT.p, AT.p), nv = neutralSh[neutralSh.length - 1], cat = E[5];
    let tend;
    if(cat === 'noble') tend = fill(tr(S.valFull), {name});
    else if(AT.p > 20 && ['transition','lanthanide','actinide','metal'].indexOf(cat) >= 0) tend = fill(tr(S.valMetal), {name, v:nv});
    else if(cat === 'halogen') tend = fill(tr(S.valGain), {name, v:7, g:1});
    else if(nv <= 3 && AT.p !== 1 && AT.p !== 5) tend = fill(tr(S.valLose), {name, v:nv});
    else if(nv >= 5) tend = fill(tr(S.valGain), {name, v:nv, g:8 - nv});
    else tend = fill(tr(S.valShare), {name, v:nv});
    html += '<p>' + tend + '</p>';
  }
  html += '<p style="color:var(--muted);font-size:14px">' + tr(LEVEL === 0 ? S.atomB : LEVEL === 1 ? S.atomE : S.atomS) + '</p>';
  if(LEVEL === 2) html += '<div class="eq"><span class="lbl">' + t('config') + '</span>' + configOf(AT.e, AT.p) + '</div><p class="meta">' + fill(tr(S.isotope), {name, A}) + '</p>';
  html += '<div class="fact"><b>' + t('didYouKnow') + '</b>' + (LANG === 'ro' ? E[9] : E[8]) + '</div>';
  html += '<button class="btn small prof-btn learn-link" data-learn="atom">' + PROF_ICON + t('learnMore') + '</button>';
  info.innerHTML = html;
}

// ===================== Molecules tab =====================
const MB = {atoms:[], canvas:null, ctx:null, W:640, H:480, built:null, t0:0, uid:1, done:new Set(store.get('mols', []))};
function molCounts(){ const c = {}; for(const a of MB.atoms) c[a.el] = (c[a.el] || 0) + 1; return c; }
function molAdd(el){
  if(MB.atoms.length >= 14) return;
  MB.atoms.push({id:MB.uid++, el, x:rnd(120, MB.W - 120), y:rnd(100, MB.H - 100), vx:rnd(-60, 60), vy:rnd(-60, 60)});
  molCheck();
}
function molRemoveAt(x, y){
  for(let i = MB.atoms.length - 1; i >= 0; i--){ const a = MB.atoms[i]; const r = EL[a.el].r*70; if(Math.hypot(a.x - x, a.y - y) < r + 4){ MB.atoms.splice(i, 1); MB.built = null; molCheck(); return true; } }
  return false;
}
function molCheck(){
  const c = molCounts(); const keys = Object.keys(c);
  const hit = MOLS.find(m => { const mk = Object.keys(m.counts); return mk.length === keys.length && mk.every(k => c[k] === m.counts[k]); });
  if(hit){
    MB.built = hit; MB.peek = null; MB.t0 = nowS();
    const T = TPL[hit.id]; const used = new Set(); const s = 72;
    T.a.forEach((ta, i) => { const a = MB.atoms.find(q => q.el === ta[0] && !used.has(q.id)); if(a){ used.add(a.id); a.tx = MB.W/2 + ta[1]*s; a.ty = MB.H/2 + ta[2]*s; a.ti = i; a.ch = ta[3]; a.sx = a.x; a.sy = a.y; } });
    if(!MB.done.has(hit.id)){ MB.done.add(hit.id); store.set('mols', [...MB.done]); }
  } else { MB.built = null; MB.atoms.forEach(a => { a.ti = undefined; a.ch = undefined; }); }
  renderMolUI();
}
function drawMolTab(t, dt){
  const ctx = MB.ctx, W = MB.W, H = MB.H; if(!ctx) return;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#f8fbfa'; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(26,116,179,.07)'; ctx.lineWidth = 1;
  for(let x = 0; x < W; x += 24){ ctx.beginPath(); ctx.moveTo(x + .5, 0); ctx.lineTo(x + .5, H); ctx.stroke(); }
  for(let y = 0; y < H; y += 24){ ctx.beginPath(); ctx.moveTo(0, y + .5); ctx.lineTo(W, y + .5); ctx.stroke(); }
  const s = 72;
  if(MB.built){
    const k = easeOut((t - MB.t0)/.9);
    for(const a of MB.atoms){ if(a.tx == null) continue; a.x = lerp(a.sx, a.tx, k) + (k >= 1 && !REDUCED ? Math.sin(t*2 + a.id)*1.2 : 0); a.y = lerp(a.sy, a.ty, k) + (k >= 1 && !REDUCED ? Math.cos(t*2.3 + a.id)*1.2 : 0); }
    const T = TPL[MB.built.id]; const byI = {}; MB.atoms.forEach(a => { if(a.ti != null) byI[a.ti] = a; });
    const ba = clamp01((k - .6)/.4);
    for(const b of T.b){ const p = byI[b[0]], q = byI[b[1]]; if(!p || !q) continue; drawBond(ctx, p.x, p.y, q.x, q.y, b[2], s, '#6f8089', ba);
      if(LEVEL >= 1 && ba > .9){ // shared electron pairs / transferred electron
        const mx = (p.x + q.x)/2, my = (p.y + q.y)/2, dx = q.x - p.x, dy = q.y - p.y, len = Math.hypot(dx, dy), nx = -dy/len, ny = dx/len;
        if(b[2] === 'i'){ const ex = q.x - dx/len*EL[q.el].r*s*.2, ey = q.y - dy/len*EL[q.el].r*s*.2 - EL[q.el].r*s*.95; ctx.fillStyle = '#1a74b3'; ctx.beginPath(); ctx.arc(ex + Math.sin(t*3)*3, ey, 5, 0, 7); ctx.fill(); }
        else { for(let o = 0; o < b[2]; o++){ const off = (o - (b[2] - 1)/2)*12; for(const sgn of [-1, 1]){ const ex = mx + nx*(off + sgn*4) + dx/len*Math.sin(t*3 + o)*4, ey = my + ny*(off + sgn*4) + dy/len*Math.sin(t*3 + o)*4; ctx.fillStyle = '#1a74b3'; ctx.beginPath(); ctx.arc(ex, ey, 3.6, 0, 7); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.2; ctx.stroke(); } } }
      }
    }
    for(const a of MB.atoms) if(a.tx == null){ a.x += a.vx*dt; a.y += a.vy*dt; bounce(a); }
  } else {
    for(const a of MB.atoms){
      for(const o of MB.atoms){ if(o === a) continue; const dx = a.x - o.x, dy = a.y - o.y, d = Math.hypot(dx, dy) || 1; const min = (EL[a.el].r + EL[o.el].r)*s*1.3; if(d < min){ a.vx += dx/d*120*dt; a.vy += dy/d*120*dt; } }
      const sp = Math.hypot(a.vx, a.vy); if(sp > 60){ a.vx *= 60/sp; a.vy *= 60/sp; }
      if(!REDUCED){ a.x += a.vx*dt; a.y += a.vy*dt; } bounce(a);
    }
  }
  for(const a of MB.atoms) drawAtom(ctx, a.x, a.y, a.el, s, MB.built && a.ti != null && clamp01((t - MB.t0 - .6)/.4) > .5 ? a.ch : null, 1);
  if(!MB.atoms.length){ ctx.fillStyle = '#8a979c'; ctx.font = '700 17px Nunito, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(tr(S.trayHelp), W/2, H/2); }
  if(MB.built){ ctx.fillStyle = '#16252E'; ctx.font = '500 26px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.globalAlpha = clamp01((t - MB.t0 - .7)/.4); ctx.fillText(MB.built.f, W/2, H - 28); ctx.globalAlpha = 1; }
}
function bounce(a){ const r = EL[a.el].r*72; if(a.x < r){ a.x = r; a.vx = Math.abs(a.vx); } if(a.x > MB.W - r){ a.x = MB.W - r; a.vx = -Math.abs(a.vx); } if(a.y < r){ a.y = r; a.vy = Math.abs(a.vy); } if(a.y > MB.H - r){ a.y = MB.H - r; a.vy = -Math.abs(a.vy); } }
Object.assign(S, {molDone:L('{n} of {total} molecules built','{n} din {total} molecule construite'), molRecipe:L('Recipe','Rețetă'), molRecipeB:L('Drop these atoms into the workspace (from the tray) and watch them bond:','Pune acești atomi în spațiul de lucru (din tavă) și privește cum se leagă:'), molBuildIt:L('Build it for me','Construiește-o pentru mine')});
function molPeek(id){ MB.peek = MB.peek === id ? null : id; renderMolUI(); }
function molBuild(id){ const m = MOLS.find(x => x.id === id); if(!m) return; MB.atoms = []; MB.built = null; MB.peek = null; Object.keys(m.counts).forEach(k => { for(let i = 0; i < m.counts[k]; i++) MB.atoms.push({id:MB.uid++, el:k, x:rnd(120, MB.W - 120), y:rnd(100, MB.H - 100), vx:rnd(-60, 60), vy:rnd(-60, 60)}); }); molCheck(); }
function renderMolUI(){
  const c = molCounts();
  document.getElementById('molCounts').innerHTML = Object.keys(c).map(k => '<span>' + k + ' × ' + c[k] + '</span>').join('');
  const chip = m => '<button class="' + (MB.done.has(m.id) ? 'done' : '') + (MB.peek === m.id ? ' peek' : '') + '" data-mol="' + m.id + '" title="' + esc(tr(m.name)) + '">' + (MB.done.has(m.id) ? '✓ ' : '') + m.f + '</button>';
  const groups = typeof MOL_GROUPS !== 'undefined' ? MOL_GROUPS : [{name:null, ids:MOLS.map(m => m.id)}];
  document.getElementById('challenges').innerHTML = '<p class="meta" style="margin:0 0 6px">' + t('molDone', {n:MB.done.size, total:MOLS.length}) + '</p>' + groups.map(g => (g.name ? '<p class="chall-h">' + tr(g.name) + '</p>' : '') + '<div class="chall-row">' + g.ids.map(id => MOLS.find(m => m.id === id)).filter(Boolean).map(chip).join('') + '</div>').join('');
  const info = document.getElementById('molInfo');
  if(MB.peek){
    const m = MOLS.find(x => x.id === MB.peek); const rec = Object.keys(m.counts).map(k => m.counts[k] + ' × ' + k).join(' + ');
    info.innerHTML = '<p class="eyebrow">' + t('molRecipe') + '</p><h3>' + tr(m.name) + ' <span class="f">' + m.f + '</span></h3><p>' + t('molRecipeB') + '</p><div class="eq">' + rec + '</div><div class="row-btns"><button class="btn small primary" data-build="' + m.id + '">' + t('molBuildIt') + '</button></div>';
  } else if(MB.built){
    const m = MB.built;
    info.innerHTML = '<p class="eyebrow">' + t('molBuilt') + '</p><h3>' + tr(m.name) + ' <span class="f">' + m.f + '</span></h3>' +
      '<div class="chips"><span class="pill phys">' + t('bond') + ': ' + tr(m.bond) + '</span>' + (LEVEL >= 1 ? '<span class="pill none">' + t('shape') + ': ' + tr(m.shape) + '</span>' : '') + '</div>' +
      '<p>' + lv(m) + '</p><button class="btn small prof-btn learn-link" data-learn="' + (m.bond.en.indexOf('ionic') >= 0 ? 'ions' : 'bondtypes') + '">' + PROF_ICON + t('learnMore') + '</button>';
  } else if(MB.atoms.length){
    info.innerHTML = '<p class="eyebrow">' + t('molStart') + '</p><h3>' + t('molUnknown') + '</h3><p>' + t('molUnknownB') + '</p>';
  } else {
    info.innerHTML = '<p class="eyebrow">' + t('tabMols') + '</p><h3>' + t('molStart') + '</h3><p>' + t('molStartB') + '</p>';
  }
}

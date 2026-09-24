// ===================== molecular graphics =====================
const EL = {
  H:{c:'#f4f6f8', r:.34, txt:'#23323a'}, C:{c:'#3d434a', r:.47, txt:'#fff'}, N:{c:'#3f6fe0', r:.45, txt:'#fff'}, O:{c:'#e5463f', r:.46, txt:'#fff'},
  Na:{c:'#9a5ee0', r:.62, txt:'#fff'}, K:{c:'#7b45cf', r:.72, txt:'#fff'}, Cl:{c:'#3fbf5c', r:.56, txt:'#fff'}, Mg:{c:'#5fae3c', r:.58, txt:'#fff'},
  Ca:{c:'#6e9373', r:.64, txt:'#fff'}, Fe:{c:'#d8692e', r:.54, txt:'#fff'}, Cu:{c:'#c47a3c', r:.54, txt:'#fff'}, Ag:{c:'#b9bfc7', r:.57, txt:'#23323a'},
  S:{c:'#e9c73a', r:.52, txt:'#23323a'}, Si:{c:'#cdb088', r:.55, txt:'#23323a'}, Enz:{c:'#cf9f5f', r:1.25, txt:'#3b2a12'}
};
// atoms: [el, x, y, charge?]; bonds: [i, j, order|'i']
const TPL = {
  H2O:{a:[['O',0,-.12],['H',-.78,.45],['H',.78,.45]], b:[[0,1,1],[0,2,1]], l:'H₂O'},
  H2:{a:[['H',-.38,0],['H',.38,0]], b:[[0,1,1]], l:'H₂'},
  O2:{a:[['O',-.56,0],['O',.56,0]], b:[[0,1,2]], l:'O₂'},
  N2:{a:[['N',-.55,0],['N',.55,0]], b:[[0,1,3]], l:'N₂'},
  CO2:{a:[['O',-1.12,0],['C',0,0],['O',1.12,0]], b:[[0,1,2],[1,2,2]], l:'CO₂'},
  CH4:{a:[['C',0,0],['H',0,-.98],['H',-.98,.1],['H',.98,.1],['H',0,.98]], b:[[0,1,1],[0,2,1],[0,3,1],[0,4,1]], l:'CH₄'},
  NH3:{a:[['N',0,-.22],['H',-.92,.42],['H',.92,.42],['H',0,.82]], b:[[0,1,1],[0,2,1],[0,3,1]], l:'NH₃'},
  HCl:{a:[['H',-.62,0],['Cl',.42,0]], b:[[0,1,1]], l:'HCl'},
  NaCl:{a:[['Na',-.64,0,'+'],['Cl',.64,0,'−']], b:[[0,1,'i']], l:'NaCl'},
  H2O2:{a:[['H',-1.28,-.5],['O',-.5,0],['O',.5,0],['H',1.28,.5]], b:[[0,1,1],[1,2,1],[2,3,1]], l:'H₂O₂'},
  Na:{a:[['Na',0,0]], b:[], l:'Na'}, K:{a:[['K',0,0]], b:[], l:'K'}, Mg:{a:[['Mg',0,0]], b:[], l:'Mg'},
  Fe:{a:[['Fe',0,0]], b:[], l:'Fe'}, Cu:{a:[['Cu',0,0]], b:[], l:'Cu'},
  'Na+':{a:[['Na',0,0,'+']], b:[], l:'Na⁺'}, 'K+':{a:[['K',0,0,'+']], b:[], l:'K⁺'}, 'Cl-':{a:[['Cl',0,0,'−']], b:[], l:'Cl⁻'},
  'H+':{a:[['H',0,0,'+']], b:[], l:'H⁺'}, 'Ca2+':{a:[['Ca',0,0,'2+']], b:[], l:'Ca²⁺'}, 'Mg2+':{a:[['Mg',0,0,'2+']], b:[], l:'Mg²⁺'},
  'Fe2+':{a:[['Fe',0,0,'2+']], b:[], l:'Fe²⁺'}, 'Cu2+':{a:[['Cu',0,0,'2+']], b:[], l:'Cu²⁺'}, 'Ag+':{a:[['Ag',0,0,'+']], b:[], l:'Ag⁺'},
  'OH-':{a:[['O',0,0,'−'],['H',.74,-.3]], b:[[0,1,1]], l:'OH⁻'},
  NaOH:{a:[['Na',-.98,0,'+'],['O',.22,0,'−'],['H',.95,-.3]], b:[[0,1,'i'],[1,2,1]], l:'NaOH'},
  KOH:{a:[['K',-1.06,0,'+'],['O',.22,0,'−'],['H',.95,-.3]], b:[[0,1,'i'],[1,2,1]], l:'KOH'},
  NaHCO3:{a:[['Na',-1.95,0,'+'],['O',-.86,0,'−'],['C',0,0],['O',.55,-.85],['O',.78,.6],['H',1.52,.42]], b:[[0,1,'i'],[1,2,1],[2,3,2],[2,4,1],[4,5,1]], l:'NaHCO₃'},
  'HCO3-':{a:[['O',-.86,0,'−'],['C',0,0],['O',.55,-.85],['O',.78,.6],['H',1.52,.42]], b:[[0,1,1],[1,2,2],[1,3,1],[3,4,1]], l:'HCO₃⁻'},
  CH3COOH:{a:[['C',-.75,0],['C',.45,0],['O',1.05,-.82],['O',1.15,.66],['H',1.94,.52],['H',-1.22,-.86],['H',-1.62,.32],['H',-.72,1.0]], b:[[0,1,1],[1,2,2],[1,3,1],[3,4,1],[0,5,1],[0,6,1],[0,7,1]], l:'CH₃COOH'},
  CH3COONa:{a:[['C',-.75,0],['C',.45,0],['O',1.05,-.82],['O',1.15,.66,'−'],['Na',2.25,.84,'+'],['H',-1.22,-.86],['H',-1.62,.32],['H',-.72,1.0]], b:[[0,1,1],[1,2,2],[1,3,1],[3,4,'i'],[0,5,1],[0,6,1],[0,7,1]], l:'CH₃COONa'},
  CaCO3:{a:[['Ca',-1.5,0,'2+'],['O',-.42,0,'−'],['C',.4,0],['O',.95,-.8],['O',.95,.8,'−']], b:[[0,1,'i'],[1,2,1],[2,3,2],[2,4,1]], l:'CaCO₃'},
  SO4:{a:[['S',0,0],['O',0,-.92],['O',0,.92,'−'],['O',-.92,0,'−'],['O',.92,0]], b:[[0,1,2],[0,2,1],[0,3,1],[0,4,2]], l:'SO₄²⁻'},
  CuSO4:{a:[['Cu',-2.0,0,'2+'],['S',0,0],['O',0,-.92],['O',0,.92,'−'],['O',-.92,0,'−'],['O',.92,0]], b:[[0,4,'i'],[1,2,2],[1,3,1],[1,4,1],[1,5,2]], l:'CuSO₄'},
  CuOH2:{a:[['Cu',0,0],['O',-.98,0],['H',-1.62,-.42],['O',.98,0],['H',1.62,-.42]], b:[[0,1,1],[1,2,1],[0,3,1],[3,4,1]], l:'Cu(OH)₂'},
  'NO3-':{a:[['N',0,0],['O',0,-.9],['O',-.8,.5,'−'],['O',.8,.5]], b:[[0,1,2],[0,2,1],[0,3,1]], l:'NO₃⁻'},
  AgCl:{a:[['Ag',-.62,0],['Cl',.62,0]], b:[[0,1,'i']], l:'AgCl'},
  MgO:{a:[['Mg',-.6,0,'2+'],['O',.6,0,'2−']], b:[[0,1,'i']], l:'MgO'},
  Na2CO3:{a:[['Na',-1.95,-.35,'+'],['O',-.85,-.15,'−'],['C',0,.25],['O',.12,1.15],['O',.8,-.35,'−'],['Na',1.9,-.6,'+']], b:[[0,1,'i'],[1,2,1],[2,3,2],[2,4,1],[4,5,'i']], l:'Na₂CO₃'},
  catalase:{a:[['Enz',0,0]], b:[], l:{en:'catalase',ro:'catalază'}},
};

function shade(hex, amt){ // amt -1..1
  let c = hex.replace('#',''); if(c.length === 3) c = c.split('').map(x=>x+x).join('');
  let r = parseInt(c.substr(0,2),16), g = parseInt(c.substr(2,2),16), b = parseInt(c.substr(4,2),16);
  if(amt >= 0){ r += (255-r)*amt; g += (255-g)*amt; b += (255-b)*amt; } else { r *= 1+amt; g *= 1+amt; b *= 1+amt; }
  return 'rgb(' + (r|0) + ',' + (g|0) + ',' + (b|0) + ')';
}
function hexToRgb(hex){ let c = hex.replace('#',''); if(c.length===3) c=c.split('').map(x=>x+x).join(''); return [parseInt(c.substr(0,2),16), parseInt(c.substr(2,2),16), parseInt(c.substr(4,2),16)]; }

function drawAtom(ctx, x, y, el, s, charge, alpha, labelOn){
  const E = EL[el] || EL.C; const r = E.r * s;
  ctx.save(); ctx.globalAlpha = alpha == null ? 1 : alpha;
  if(el === 'Enz'){
    ctx.beginPath();
    for(let i=0;i<=24;i++){ const a = i/24*Math.PI*2; const rr = r*(1 + .08*Math.sin(a*5) + .05*Math.cos(a*3)); ctx.lineTo(x + Math.cos(a)*rr, y + Math.sin(a)*rr*.8); }
    const g = ctx.createRadialGradient(x - r*.3, y - r*.3, r*.1, x, y, r*1.1);
    g.addColorStop(0, shade(E.c,.45)); g.addColorStop(1, shade(E.c,-.25)); ctx.fillStyle = g; ctx.fill();
    ctx.fillStyle = E.txt; ctx.font = '600 ' + Math.round(s*.36) + 'px Fredoka, Nunito, sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(tr(TPL.catalase.l), x, y); ctx.restore(); return;
  }
  const g = ctx.createRadialGradient(x - r*.38, y - r*.42, r*.08, x, y, r*1.05);
  g.addColorStop(0, shade(E.c, .6)); g.addColorStop(.55, E.c); g.addColorStop(1, shade(E.c, -.35));
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fillStyle = g; ctx.fill();
  ctx.lineWidth = Math.max(1, s*.03); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.stroke();
  if(labelOn !== false){
    ctx.fillStyle = E.txt; ctx.font = '600 ' + Math.round(r*(el.length > 1 ? .78 : .95)) + 'px Fredoka, Nunito, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(el, x, y + r*.04);
  }
  if(charge){
    const bx = x + r*.72, by = y - r*.72, br = Math.max(7, s*.2) * (charge.length > 1 ? 1.25 : 1);
    ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI*2);
    ctx.fillStyle = charge.includes('−') ? '#1a74b3' : '#e9821c'; ctx.fill();
    ctx.lineWidth = 1.5; ctx.strokeStyle = '#fff'; ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = '800 ' + Math.round(br*1.25) + 'px Nunito, sans-serif'; ctx.fillText(charge, bx, by + .5);
  }
  ctx.restore();
}
function drawBond(ctx, x1, y1, x2, y2, order, s, color, alpha){
  ctx.save(); ctx.globalAlpha = alpha == null ? 1 : alpha; ctx.strokeStyle = color; ctx.lineCap = 'round';
  const dx = x2-x1, dy = y2-y1, len = Math.hypot(dx,dy) || 1, nx = -dy/len, ny = dx/len;
  if(order === 'i'){ ctx.setLineDash([s*.12, s*.12]); ctx.lineWidth = s*.08; ctx.globalAlpha *= .75; ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke(); ctx.restore(); return; }
  const w = s*.13; ctx.lineWidth = w;
  const offs = order === 1 ? [0] : order === 2 ? [-.14,.14] : [-.22,0,.22];
  for(const o of offs){ ctx.beginPath(); ctx.moveTo(x1+nx*o*s, y1+ny*o*s); ctx.lineTo(x2+nx*o*s, y2+ny*o*s); ctx.stroke(); }
  ctx.restore();
}
function tplBox(name){
  const T = TPL[name]; let minx=1e9, maxx=-1e9, miny=1e9, maxy=-1e9;
  for(const a of T.a){ const r = (EL[a[0]]||EL.C).r; minx=Math.min(minx,a[1]-r); maxx=Math.max(maxx,a[1]+r); miny=Math.min(miny,a[2]-r); maxy=Math.max(maxy,a[2]+r); }
  return {minx,maxx,miny,maxy,w:maxx-minx,h:maxy-miny};
}
// flow layout of molecules; returns [{name, ox, oy}] in units + scale
function layoutMols(names, W, H, top, maxS){
  let s = maxS || 34; const gap = .9;
  for(let tries=0; tries<12; tries++){
    const rows = []; let row = [], rw = 0; const maxW = (W - 40)/s;
    for(const n of names){ const b = tplBox(n); if(row.length && rw + gap + b.w > maxW){ rows.push({items:row, w:rw}); row=[]; rw=0; } rw += (row.length ? gap : 0) + b.w; row.push({n, b}); }
    if(row.length) rows.push({items:row, w:rw});
    const rowH = rows.map(r => Math.max(...r.items.map(i=>i.b.h)) + 1.1);
    const totalH = rowH.reduce((a,b)=>a+b,0);
    if(totalH*s <= H - top - 20 || s < 16){
      const out = []; let y = top + ((H - top) - totalH*s)/2;
      rows.forEach((r, ri) => { let x = (W - r.w*s)/2; const rh = rowH[ri];
        for(const it of r.items){ out.push({name:it.n, ox:x - it.b.minx*s, oy:y + (rh*s)/2 - (it.b.miny + it.b.h/2)*s - s*.3, w:it.b.w*s, labelY: y + rh*s - s*.25, cx: x + it.b.w*s/2}); x += (it.b.w + gap)*s; }
        y += rh*s; });
      return {s, mols:out};
    }
    s *= .88;
  }
}
function formulaLine(names){
  const counts = []; for(const n of names){ const e = counts.find(c=>c.n===n); if(e) e.k++; else counts.push({n, k:1}); }
  return counts.map(c => (c.k>1 ? c.k : '') + tr(TPL[c.n].l)).join(' + ');
}

// ---- zoom animation ----
const Z = {canvas:null, ctx:null, spec:null, t0:0, atoms:[], bondsA:[], bondsB:[], layA:null, layB:null, W:720, H:405, open:false};
function zoomPrepare(spec, ZZ){
  ZZ = ZZ || Z;
  ZZ.spec = spec; const W = ZZ.W, H = ZZ.H;
  const la = layoutMols(spec.from, W, H, 46, ZZ.maxS), lb = layoutMols(spec.to, W, H, 46, ZZ.maxS);
  ZZ.layA = la; ZZ.layB = lb;
  const A = []; la.mols.forEach((m, mi) => TPL[m.name].a.forEach((a, ai) => A.push({el:a[0], x:m.ox + a[1]*la.s, y:m.oy + a[2]*la.s, ch:a[3], mol:mi, idx:ai, s:la.s})));
  const Bp = []; lb.mols.forEach((m, mi) => TPL[m.name].a.forEach((a, ai) => Bp.push({el:a[0], x:m.ox + a[1]*lb.s, y:m.oy + a[2]*lb.s, ch:a[3], mol:mi, idx:ai, s:lb.s})));
  // greedy nearest matching by element
  const used = new Set(); const atoms = [];
  const bIdx = {}; // key mol:idx -> atom index in atoms
  Bp.forEach((b) => {
    let best=-1, bd=1e9; A.forEach((a, i) => { if(used.has(i) || a.el !== b.el) return; const d = Math.hypot(a.x-b.x, a.y-b.y); if(d < bd){ bd=d; best=i; } });
    if(best >= 0){ used.add(best); const a = A[best]; atoms.push({el:a.el, ax:a.x, ay:a.y, bx:b.x, by:b.y, cha:a.ch, chb:b.ch, sa:a.s, sb:b.s, amol:a.mol, aidx:a.idx, bmol:b.mol, bidx:b.idx, fade:0}); }
    else atoms.push({el:b.el, ax:b.x, ay:b.y - 60, bx:b.x, by:b.y, chb:b.ch, sa:lb.s, sb:lb.s, bmol:b.mol, bidx:b.idx, fade:1}); // appears
  });
  A.forEach((a, i) => { if(!used.has(i)) atoms.push({el:a.el, ax:a.x, ay:a.y, bx:a.x, by:a.y - 80, cha:a.ch, sa:a.s, sb:a.s, amol:a.mol, aidx:a.idx, fade:-1}); });
  ZZ.atoms = atoms;
  const find = (side, mol, idx) => atoms.findIndex(t => side === 'a' ? (t.amol === mol && t.aidx === idx) : (t.bmol === mol && t.bidx === idx));
  ZZ.bondsA = []; la.mols.forEach((m, mi) => TPL[m.name].b.forEach(b => ZZ.bondsA.push([find('a', mi, b[0]), find('a', mi, b[1]), b[2]])));
  ZZ.bondsB = []; lb.mols.forEach((m, mi) => TPL[m.name].b.forEach(b => ZZ.bondsB.push([find('b', mi, b[0]), find('b', mi, b[1]), b[2]])));
  // small random phase per atom
  atoms.forEach(a => { a.ph = Math.random()*6.28; });
  ZZ.t0 = performance.now()/1000;
}
function ease(x){ x = Math.max(0, Math.min(1, x)); return x < .5 ? 2*x*x : 1 - Math.pow(-2*x+2, 2)/2; }
function zoomDraw(ZZ){
  ZZ = ZZ || Z;
  if(!ZZ.open || !ZZ.spec) return;
  const ctx = ZZ.ctx, W = ZZ.W, H = ZZ.H; const t = performance.now()/1000 - ZZ.t0;
  ctx.clearRect(0,0,W,H);
  // backdrop: microscope field
  const bg = ctx.createRadialGradient(W/2, H/2, 40, W/2, H/2, W*.7); bg.addColorStop(0,'#173041'); bg.addColorStop(1,'#0c1820');
  ctx.fillStyle = bg; ctx.fillRect(0,0,W,H);
  ctx.fillStyle = 'rgba(255,255,255,.05)'; for(let x=20;x<W;x+=28) for(let y=20;y<H;y+=28){ ctx.fillRect(x,y,1.5,1.5); }
  const T1 = 1.4, T2 = 1.9, T3 = 3.4, T4 = 3.9;
  const mv = ease((t - T2)/(T3 - T2));
  const bondAAlpha = 1 - Math.max(0, Math.min(1, (t - T1)/(T2 - T1)));
  const bondBAlpha = Math.max(0, Math.min(1, (t - T3)/(T4 - T3)));
  const jig = REDUCED ? 0 : 1;
  const pos = ZZ.atoms.map(a => {
    const wob = t < T2 ? Math.sin(t*3 + a.ph)*1.6*jig + (t > T1 ? Math.sin(t*40 + a.ph)*1.5*jig : 0) : t > T3 ? Math.sin(t*2.5 + a.ph)*1.4*jig : 0;
    return {x: a.ax + (a.bx - a.ax)*mv + wob, y: a.ay + (a.by - a.ay)*mv + wob*.7, s: a.sa + (a.sb - a.sa)*mv};
  });
  const bcol = '#cfdde4';
  for(const b of ZZ.bondsA){ if(b[0]<0||b[1]<0||bondAAlpha<=0) continue; const p = pos[b[0]], q = pos[b[1]]; drawBond(ctx, p.x,p.y,q.x,q.y, b[2], p.s, bcol, bondAAlpha); }
  for(const b of ZZ.bondsB){ if(b[0]<0||b[1]<0||bondBAlpha<=0) continue; const p = pos[b[0]], q = pos[b[1]]; drawBond(ctx, p.x,p.y,q.x,q.y, b[2], p.s, bcol, bondBAlpha); }
  ZZ.atoms.forEach((a, i) => {
    let al = 1; if(a.fade === 1) al = mv; else if(a.fade === -1) al = 1 - mv;
    const ch = mv < .5 ? a.cha : a.chb;
    drawAtom(ctx, pos[i].x, pos[i].y, a.el, pos[i].s, ch, al);
  });
  // labels
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  const phaseA = t < T2 + .2, phaseB = t > T3 - .1;
  ctx.font = '600 20px Fredoka, Nunito, sans-serif';
  if(phaseA){ ctx.fillStyle = 'rgba(255,255,255,.92)'; ctx.fillText(t_('before') + ':  ' + formulaLine(ZZ.spec.from), W/2, 30); drawMolLabels(ctx, ZZ.layA, 1 - Math.max(0,(t-T1)/.4), ZZ.H); }
  else if(phaseB){ ctx.globalAlpha = Math.min(1, (t - T3 + .1)/.5); ctx.fillStyle = '#ffd08a'; ctx.fillText(t_('after') + ':  ' + formulaLine(ZZ.spec.to), W/2, 30); ctx.globalAlpha = 1; drawMolLabels(ctx, ZZ.layB, Math.min(1,(t-T4)/.5), ZZ.H); }
  else { ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillText('…', W/2, 30); }
}
function t_(k){ return t(k); }
function drawMolLabels(ctx, lay, alpha, H){
  if(alpha <= 0) return; ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = 'rgba(207,221,228,.85)'; ctx.font = '500 13px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
  for(const m of lay.mols){ ctx.fillText(tr(TPL[m.name].l), m.cx, Math.min((H || Z.H) - 8, m.labelY + 4)); }
  ctx.restore();
}

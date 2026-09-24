// ===================== Chemistry 101: classroom =====================
Object.assign(S, {
  tabCourse:L('Classes','Lecții'),
  lessonsDone:L('{n} of {total} lessons done','{n} din {total} lecții terminate'), continueFlow:L('Continue the course','Continuă cursul'), agesN:L('ages {a}','vârsta {a}'),
  stageN:L('Stage {n}','Etapa {n}'), prereq:L('Recommended first','Recomandat înainte'), prereqTxt:L('This lesson builds on “{title}”.','Această lecție se bazează pe „{title}”.'),
  courseTitle:L('Professor Ion’s chemistry course','Cursul de chimie al Profesorului Ion'),
  recommended:L('For your level','Pentru nivelul tău'),
  lessonN:L('Lesson {n}','Lecția {n}'),
  slideOf:L('{n} / {total}','{n} / {total}'),
  startQuiz:L('Quiz time!','E timpul pentru test!'),
  quizQ:L('Question {n} of {total}','Întrebarea {n} din {total}'),
  right:L('Correct!','Corect!'), wrong:L('Not quite.','Nu chiar.'),
  nextQ:L('Next question','Întrebarea următoare'), finish:L('Finish','Termină'),
  quizDone:L('Lesson complete! You got {n} of {total}.','Lecție terminată! Ai răspuns corect la {n} din {total}.'),
  retry:L('Try the quiz again','Reia testul'), nextLesson:L('Next lesson','Lecția următoare'), restartLesson:L('Watch again','Privește din nou'),
  keyWords:L('Key words','Cuvinte-cheie'), tryIt:L('Try it yourself','Încearcă singur'), go:L('Go','Mergi'),
  askLesson:L('Still curious? Ask Professor Ion','Încă ești curios? Întreabă-l pe Profesorul Ion'),
  refresher:L('Learn the basics: {title}','Învață noțiunile de bază: {title}'),
  skipLab:L('Skip to the lab','Sari la laborator'), pause:L('Pause','Pauză'), play:L('Play','Continuă'), repeat:L('Repeat','Repetă'),
  tapToHear:L('Tap anywhere to hear me speak','Atinge oriunde ca să mă auzi vorbind'),
  learnMore:L('Learn more in Chemistry 101','Află mai multe în Chimie 101'),
  lSolid:L('Solid','Solid'), lLiquid:L('Liquid','Lichid'), lGas:L('Gas','Gaz'), lHeat:L('heat','căldură'),
  lNucleus:L('nucleus','nucleu'), lElectron:L('electron (−)','electron (−)'), lProton:L('proton (+)','proton (+)'), lNeutron:L('neutron','neutron'),
  lEmpty:L('mostly empty space','în mare parte spațiu gol'),
  lElement:L('Element','Element'), lCompound:L('Compound','Compus'), lMixture:L('Mixture','Amestec'),
  lShared:L('shared pair','pereche comună'), lSea:L('sea of free electrons','mare de electroni liberi'),
  lPhysical:L('Physical change','Transformare fizică'), lChemical:L('Chemical change','Transformare chimică'),
  lAcidic:L('acidic','acid'), lNeutral:L('neutral','neutru'), lBasic:L('basic','bazic'),
  lReactants:L('reactants','reactanți'), lProducts:L('products','produși'), lEnergy:L('energy','energie'), lActivation:L('activation energy','energie de activare'), lCatalyst:L('with a catalyst','cu catalizator'),
  lReleased:L('heat released','căldură degajată'), lAbsorbed:L('heat absorbed','căldură absorbită'),
  lCold:L('Cold: slow, few collisions','Rece: lent, puține ciocniri'), lHot:L('Hot: fast, many collisions','Fierbinte: rapid, multe ciocniri'),
  lOx:L('oxidation: loses e⁻','oxidare: pierde e⁻'), lRed:L('reduction: gains e⁻','reducere: primește e⁻'),
  lPolar:L('polar','polar'), lNonpolar:L('non-polar','nepolar'),
  lMole:L('1 mole','1 mol'), lWater18:L('18 g of water = 1 mole of H₂O','18 g de apă = 1 mol de H₂O'),
});
const PH_ITEMS = [[1, L('stomach acid','acid gastric')], [2, L('lemon','lămâie')], [3, L('vinegar','oțet')], [7, L('pure water','apă pură')], [8.3, L('baking soda','bicarbonat')], [10, L('soap','săpun')], [11.5, L('ammonia','amoniac')], [13, L('drain cleaner','soluție desfundat')]];
const CR = {token:0, timer:0, fallback:0, paused:false, greeted:false, canvas:null, ctx:null, W:800, H:450, lesson:null, slide:0, t0:0, typing:null, mode:'slides', quiz:{i:0, score:0, answered:false}, lz:{W:800, H:450, open:true, spec:null, maxS:62}, progress:store.get('course', {})};

// ---------- drawing helpers ----------
function shellsFor(e){ const cap = [2, 8, 8, 2]; const out = []; let left = e; for(const c of cap){ if(left <= 0) break; out.push(Math.min(c, left)); left -= c; } return out; }
function drawBohr(ctx, cx, cy, R, p, n, sh, t, opt){
  opt = opt || {};
  const nS = Math.max(1, sh.length); const rs = []; for(let k = 0; k < nS; k++) rs.push(R*(.42 + .58*(k + 1)/nS));
  ctx.setLineDash([3, 5]); ctx.lineWidth = 1.3; ctx.strokeStyle = '#b9cbc5';
  rs.forEach(r => { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); }); ctx.setLineDash([]);
  const N = p + n, nr = Math.max(3, Math.min(7, R*.08));
  for(let i = N - 1; i >= 0; i--){ const r = nr*1.05*Math.sqrt(i), a = i*2.39996; const isP = Math.floor((i + 1)*p/N) > Math.floor(i*p/N);
    const x = cx + Math.cos(a)*r, y = cy + Math.sin(a)*r; const col = isP ? '#e2553f' : '#9aa6ac';
    const g = ctx.createRadialGradient(x - nr*.3, y - nr*.3, 1, x, y, nr); g.addColorStop(0, shade(col, .5)); g.addColorStop(1, shade(col, -.2));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, nr, 0, 7); ctx.fill(); }
  sh.forEach((c, k) => { for(let j = 0; j < c; j++){ const a = t*(REDUCED ? .1 : .6)/(k + 1) + j*Math.PI*2/c + k*.5; const x = cx + Math.cos(a)*rs[k], y = cy + Math.sin(a)*rs[k];
    const outer = k === sh.length - 1 && opt.glowOuter;
    if(outer){ ctx.fillStyle = 'rgba(233,130,28,.35)'; ctx.beginPath(); ctx.arc(x, y, 11, 0, 7); ctx.fill(); }
    ctx.fillStyle = '#1a74b3'; ctx.beginPath(); ctx.arc(x, y, Math.max(3.5, R*.045), 0, 7); ctx.fill(); } });
  if(opt.label){ ctx.fillStyle = '#16252E'; ctx.font = '600 20px Fredoka, Nunito, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.fillText(opt.label, cx, cy + R + 28); }
  if(opt.sub){ ctx.fillStyle = '#56666D'; ctx.font = '700 13px Nunito, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(opt.sub, cx, cy + R + 46); }
}
function lbl(ctx, text, x, y, opt){ opt = opt || {}; ctx.font = (opt.font || '700 15px Nunito, sans-serif'); ctx.fillStyle = opt.color || '#16252E'; ctx.textAlign = opt.align || 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, x, y); }
function arrowLine(ctx, x1, y1, x2, y2, col){ ctx.strokeStyle = col || '#56666D'; ctx.fillStyle = col || '#56666D'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const a = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - Math.cos(a - .4)*10, y2 - Math.sin(a - .4)*10); ctx.lineTo(x2 - Math.cos(a + .4)*10, y2 - Math.sin(a + .4)*10); ctx.closePath(); ctx.fill(); }
function box(ctx, x, y, w, h, title, hl){ ctx.fillStyle = hl ? '#fff7ee' : '#ffffff'; roundRect(ctx, x, y, w, h, 14); ctx.fill(); ctx.lineWidth = hl ? 3 : 1.5; ctx.strokeStyle = hl ? '#E9821C' : '#cfdcd7'; ctx.stroke(); if(title) lbl(ctx, title, x + w/2, y - 16, {font:'600 18px Fredoka, Nunito, sans-serif'}); }
function molAt(ctx, name, x, y, s, rot){ const T = TPL[name]; ctx.save(); ctx.translate(x, y); if(rot) ctx.rotate(rot); for(const b of T.b){ const p = T.a[b[0]], q = T.a[b[1]]; drawBond(ctx, p[1]*s, p[2]*s, q[1]*s, q[2]*s, b[2], s, '#7b8a91', 1); } for(const a of T.a) drawAtom(ctx, a[1]*s, a[2]*s, a[0], s, a[3], 1, s > 18); ctx.restore(); }
const tri = (x) => { x = ((x % 2) + 2) % 2; return x < 1 ? x : 2 - x; };

// ---------- visuals ----------
const VIS = {
  title(ctx, v, t, ts){
    const l = CR.lesson; const trk = courseTracks().find(x => x.lessons.indexOf(l) >= 0);
    drawBohr(ctx, 690, 110, 70, 6, 6, [2, 4], t);
    lbl(ctx, tr(trk ? trk.name : L('','')), 60, 70, {align:'left', font:'800 15px Nunito, sans-serif', color:'#8A4508'});
    lbl(ctx, t_('lessonN').replace('{n}', lessonIndex(l) + 1), 60, 108, {align:'left', font:'800 18px Nunito, sans-serif', color:'#56666D'});
    ctx.font = '600 38px Fredoka, Nunito, sans-serif'; ctx.fillStyle = '#16252E'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    const words = tr(l.title).split(' '); let line = '', y = 160; for(const w of words){ const tt = line ? line + ' ' + w : w; if(ctx.measureText(tt).width > 540 && line){ ctx.fillText(line, 60, y); line = w; y += 46; } else line = tt; } ctx.fillText(line, 60, y);
    l.slides.forEach((s, i) => { const a = clamp01((ts - .6 - i*.7)/.5); if(a <= 0) return; ctx.globalAlpha = a; const yy = y + 50 + i*44;
      ctx.fillStyle = '#E9821C'; ctx.beginPath(); ctx.arc(74, yy - 6, 13, 0, 7); ctx.fill(); lbl(ctx, String(i + 1), 74, yy - 6, {color:'#fff', font:'800 14px Nunito, sans-serif'});
      lbl(ctx, s.h ? tr(s.h).replace(/^\d+\.\s*/, '') : '', 100, yy - 6, {align:'left', font:'700 19px Nunito, sans-serif'}); ctx.globalAlpha = 1; });
  },
  states(ctx, v, t){
    const names = [t_('lSolid'), t_('lLiquid'), t_('lGas')];
    [0, 1, 2].forEach(k => {
      const x = 45 + k*255, y = 120, w = 200, h = 250; box(ctx, x, y, w, h, names[k]);
      ctx.save(); roundRect(ctx, x, y, w, h, 14); ctx.clip();
      if(k === 1){ ctx.fillStyle = 'rgba(26,116,179,.08)'; ctx.fillRect(x, y + 95, w, h - 95); }
      const col = ['#1a74b3', '#2f8fd6', '#6fb6ea'][k];
      for(let i = 0; i < (k === 2 ? 12 : k === 1 ? 26 : 36); i++){
        let px, py;
        if(k === 0){ const cxs = i % 6, cys = Math.floor(i/6); px = x + 40 + cxs*24 + Math.sin(t*9 + i)*1.8; py = y + 90 + cys*24 + Math.cos(t*8 + i)*1.8; }
        else if(k === 1){ px = x + 18 + tri(t*.05*(1 + i%3) + i*.37)*(w - 36); py = y + 110 + tri(t*.04 + i*.53)*(h - 128) + Math.sin(t*3 + i)*3; }
        else { px = x + 12 + tri(t*.35*(.7 + (i % 4)*.2) + i*.29)*(w - 24); py = y + 12 + tri(t*.3*(.8 + (i % 3)*.2) + i*.61)*(h - 24); }
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 10, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.arc(px - 3, py - 3, 3, 0, 7); ctx.fill();
      }
      ctx.restore();
      if(v.heat && k < 2){ arrowLine(ctx, x + w + 8, y + h/2, x + w + 50, y + h/2, '#E9821C'); lbl(ctx, '+ ' + t_('lHeat'), x + w + 29, y + h/2 - 18, {color:'#8A4508', font:'800 13px Nunito, sans-serif'}); }
    });
  },
  atom(ctx, v, t, ts){
    const cx = 400, cy = 222; let R = 150;
    if(v.zoomIn) R = 30 + 120*easeOut(ts/2.5);
    if(v.empty){
      drawBohr(ctx, cx, cy, 160, 8, 8, [2, 6], t);
      ctx.strokeStyle = '#E9821C'; ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.arc(cx, cy, 190, 0, 7); ctx.stroke(); ctx.setLineDash([]);
      lbl(ctx, t_('lEmpty'), cx + 250, 80, {color:'#8A4508', font:'800 16px Nunito, sans-serif'}); arrowLine(ctx, cx + 210, 92, cx + 120, 150, '#E9821C');
      return;
    }
    const z = v.z || 6, E = ELEMENTS[z - 1];
    drawBohr(ctx, cx, cy, R, z, E[4], shellsFor(z), t, {label:(LANG === 'ro' ? E[3] : E[2])});
    if(v.labels){
      lbl(ctx, t_('lNucleus'), 170, 110); arrowLine(ctx, 210, 122, cx - 22, cy - 10);
      lbl(ctx, t_('lProton'), 150, 330, {color:'#c0392b'}); arrowLine(ctx, 190, 320, cx - 10, cy + 6, '#c0392b');
      lbl(ctx, t_('lNeutron'), 650, 330, {color:'#56666D'}); arrowLine(ctx, 610, 320, cx + 12, cy + 8, '#56666D');
      lbl(ctx, t_('lElectron'), 650, 100, {color:'#1a74b3'}); arrowLine(ctx, 610, 110, cx + 110, cy - 90, '#1a74b3');
    }
    if(v.charge){ lbl(ctx, '8 × (+)', 150, 200, {color:'#c0392b', font:'800 22px Nunito, sans-serif'}); lbl(ctx, '8 × (−)', 650, 200, {color:'#1a74b3', font:'800 22px Nunito, sans-serif'}); lbl(ctx, '= 0', 400, 420, {font:'800 22px Nunito, sans-serif'}); }
  },
  compare(ctx, v, t){ v.els.forEach((z, i) => { const E = ELEMENTS[z - 1]; const x = 150 + i*250; drawBohr(ctx, x, 200, 95, z, E[4], shellsFor(z), t, {label:(LANG === 'ro' ? E[3] : E[2]) + ' (' + E[1] + ')', sub:z + ' × p⁺'}); }); },
  ptable(ctx, v, t){
    const cs = 38, ox = 58, oy = 60; const colFor = (r, c) => { if(r === 0 && c === 0) return '#bfe8c6'; if(c === 0) return CAT_COLORS.alkali; if(c === 1) return CAT_COLORS.earth; if(c >= 2 && c <= 11) return CAT_COLORS.metal; if(c === 17) return CAT_COLORS.noble; if(c === 16) return CAT_COLORS.halogen; return (c - 12 > 5 - r) ? CAT_COLORS.nonmetal : CAT_COLORS.metalloid; };
    const posOf = z => { const E = ELEMENTS[z - 1]; if(!E) return null; const c = E[7] <= 1 ? E[7] : E[7] + 10; return [E[6], c]; };
    const order = v.hl === 'order' ? Math.floor(t*2) % 20 + 1 : 0;
    for(let r = 0; r < 7; r++) for(let c = 0; c < 18; c++){
      if(r === 0 && c > 0 && c < 17) continue; if((r === 1 || r === 2) && c > 1 && c < 12) continue;
      let alpha = 1; if(v.hl === 'groups' && !(c === 0 || c === 17)) alpha = .3;
      ctx.globalAlpha = alpha; ctx.fillStyle = colFor(r, c); roundRect(ctx, ox + c*cs, oy + r*cs, cs - 3, cs - 3, 5); ctx.fill(); ctx.globalAlpha = 1;
    }
    for(let r = 0; r < 2; r++) for(let c = 0; c < 14; c++){ ctx.globalAlpha = v.hl === 'groups' ? .3 : 1; ctx.fillStyle = r ? '#f3d2e4' : '#f7dccf'; roundRect(ctx, ox + (c + 3)*cs, oy + 7.4*cs + r*cs, cs - 3, cs - 3, 5); ctx.fill(); ctx.globalAlpha = 1; }
    ELEMENTS.forEach(E => { const p = posOf(E[0]); const x = ox + p[1]*cs, y = oy + p[0]*cs;
      if(E[0] === order){ ctx.lineWidth = 3; ctx.strokeStyle = '#E9821C'; roundRect(ctx, x - 2, y - 2, cs + 1, cs + 1, 6); ctx.stroke(); }
      ctx.globalAlpha = v.hl === 'groups' && !(p[1] === 0 || p[1] === 17) ? .35 : 1;
      lbl(ctx, E[1], x + (cs - 3)/2, y + (cs - 3)/2 + 3, {font:'600 16px Fredoka, Nunito, sans-serif'}); ctx.font = '700 8.5px Nunito, sans-serif'; ctx.fillStyle = '#56666D'; ctx.fillText(E[0], x + 8, y + 7); ctx.globalAlpha = 1; });
    if(v.hl === 'groups'){ lbl(ctx, '1', ox + (cs - 3)/2, oy - 16, {font:'800 14px Nunito, sans-serif', color:'#8A4508'}); lbl(ctx, '18', ox + 17*cs + (cs - 3)/2, oy - 16, {font:'800 14px Nunito, sans-serif', color:'#8A4508'});
      ctx.strokeStyle = '#E9821C'; ctx.lineWidth = 3; roundRect(ctx, ox - 4, oy - 4, cs + 5, cs*7 + 5, 8); ctx.stroke(); roundRect(ctx, ox + 17*cs - 4, oy - 4, cs + 5, cs*7 + 5, 8); ctx.stroke(); }
    if(order){ const E = ELEMENTS[order - 1]; lbl(ctx, order + ' → ' + E[1] + ' · ' + (LANG === 'ro' ? E[3] : E[2]), 400, 420, {font:'600 22px Fredoka, Nunito, sans-serif'}); }
  },
  molecules(ctx, v, t){ const n = v.list.length; v.list.forEach((m, i) => { const x = 400 + (i - (n - 1)/2)*240; const y = 210 + Math.sin(t*1.5 + i)*5; molAt(ctx, m, x, y, 46); lbl(ctx, tr(TPL[m].l), x, 350, {font:'500 24px "IBM Plex Mono", monospace'}); }); },
  elemcomp(ctx, v, t){
    const titles = [t_('lElement'), t_('lCompound'), t_('lMixture')];
    const sets = [['O2','O2','O2','O2','O2'], ['H2O','H2O','H2O','H2O','H2O'], ['O2','H2O','N2','CO2','O2']];
    [0, 1, 2].forEach(k => { const x = 45 + k*255, y = 110, w = 200, h = 260; box(ctx, x, y, w, h, titles[k], v.focus === k);
      ctx.save(); roundRect(ctx, x, y, w, h, 14); ctx.clip();
      sets[k].forEach((m, i) => { const px = x + 30 + tri(t*.06*(1 + i*.2) + i*.31)*(w - 60), py = y + 30 + tri(t*.05*(1 + i*.15) + i*.57)*(h - 60); molAt(ctx, m, px, py, 17, t*.4 + i); });
      ctx.restore(); });
  },
  bondshare(ctx, v, t, ts){
    const k = easeOut(ts/2.2); const cx = 400, cy = 215; const d = lerp(280, 118, k);
    const a1 = cx - d/2, a2 = cx + d/2;
    [a1, a2].forEach(x => { ctx.setLineDash([3, 5]); ctx.strokeStyle = '#b9cbc5'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, cy, 80, 0, 7); ctx.stroke(); ctx.setLineDash([]); drawAtom(ctx, x, cy, 'H', 60, null, 1); });
    if(k > .95){ ctx.fillStyle = 'rgba(233,130,28,.15)'; ctx.beginPath(); ctx.ellipse(cx, cy, 70, 44, 0, 0, 7); ctx.fill(); lbl(ctx, t_('lShared'), cx, cy + 118, {color:'#8A4508', font:'800 16px Nunito, sans-serif'}); }
    for(let i = 0; i < 2; i++){
      let x, y;
      if(k < .95){ const home = i ? a2 : a1; const a = t*1.6 + i*Math.PI; x = home + Math.cos(a)*80; y = cy + Math.sin(a)*80; }
      else { const a = t*2.2 + i*Math.PI; x = cx + Math.sin(a)*48; y = cy + Math.sin(a*2)*24; }
      ctx.fillStyle = '#1a74b3'; ctx.beginPath(); ctx.arc(x, y, 8, 0, 7); ctx.fill(); lbl(ctx, '−', x, y, {color:'#fff', font:'800 12px Nunito, sans-serif'});
    }
    lbl(ctx, k > .95 ? 'H–H  (H₂)' : 'H  +  H', cx, 70, {font:'500 26px "IBM Plex Mono", monospace'});
  },
  bondionic(ctx, v, t, ts){
    const e = ts % 7; const move = clamp01((e - 1.2)/1.6), close = clamp01((e - 3.2)/1);
    const na = [240 + 60*close, 220], cl = [560 - 60*close, 220];
    drawBohr(ctx, na[0], na[1], 110, 11, 12, move < 1 ? [2, 8, 1] : [2, 8], t, {label: move < 1 ? 'Na' : 'Na⁺', sub: move < 1 ? '2, 8, 1' : '2, 8'});
    drawBohr(ctx, cl[0], cl[1], 110, 17, 18, move < 1 ? [2, 8, 7] : [2, 8, 8], t, {label: move < 1 ? 'Cl' : 'Cl⁻', sub: move < 1 ? '2, 8, 7' : '2, 8, 8'});
    if(move > 0 && move < 1){ const x = lerp(na[0] + 110, cl[0] - 110, move), y = na[1] - 60*Math.sin(move*Math.PI); ctx.fillStyle = 'rgba(233,130,28,.35)'; ctx.beginPath(); ctx.arc(x, y, 14, 0, 7); ctx.fill(); ctx.fillStyle = '#1a74b3'; ctx.beginPath(); ctx.arc(x, y, 7, 0, 7); ctx.fill(); }
    if(move >= 1){ lbl(ctx, '+', na[0] + 80, na[1] - 95, {color:'#E9821C', font:'800 34px Nunito, sans-serif'}); lbl(ctx, '−', cl[0] + 80, cl[1] - 95, {color:'#1a74b3', font:'800 40px Nunito, sans-serif'}); lbl(ctx, 'Na⁺ Cl⁻  →  NaCl', 400, 420, {font:'500 22px "IBM Plex Mono", monospace'}); }
  },
  bondmetal(ctx, v, t){
    for(let r = 0; r < 3; r++) for(let c = 0; c < 5; c++){ const x = 200 + c*100, y = 130 + r*95; ctx.fillStyle = '#c8cdd3'; ctx.beginPath(); ctx.arc(x, y, 30, 0, 7); ctx.fill(); ctx.strokeStyle = '#9aa1a8'; ctx.lineWidth = 2; ctx.stroke(); lbl(ctx, '+', x, y, {font:'800 24px Nunito, sans-serif', color:'#56666D'}); }
    for(let i = 0; i < 34; i++){ const x = 150 + tri(t*.12*(1 + (i % 5)*.15) + i*.37)*500, y = 90 + tri(t*.1*(1 + (i % 3)*.2) + i*.61)*280; ctx.fillStyle = '#1a74b3'; ctx.beginPath(); ctx.arc(x, y, 6, 0, 7); ctx.fill(); }
    lbl(ctx, t_('lSea'), 400, 425, {color:'#1a74b3', font:'800 16px Nunito, sans-serif'});
  },
  hbond(ctx, v, t){
    const mols = [[260, 170, .4], [430, 130, -.6], [560, 250, 2.6], [330, 320, 1.9], [480, 360, -1.2]];
    const s = 40; const Op = [], Hp = [];
    mols.forEach(m => { const T = TPL.H2O; const c = Math.cos(m[2] + Math.sin(t*.8 + m[0])*.1), sn = Math.sin(m[2] + Math.sin(t*.8 + m[0])*.1); T.a.forEach(a => { const x = m[0] + (a[1]*c - a[2]*sn)*s, y = m[1] + (a[1]*sn + a[2]*c)*s; (a[0] === 'O' ? Op : Hp).push([x, y, m]); }); });
    ctx.setLineDash([5, 6]); ctx.strokeStyle = '#E9821C'; ctx.lineWidth = 2;
    for(const h of Hp){ let best = null, bd = 1e9; for(const o of Op){ if(o[2] === h[2]) continue; const d = Math.hypot(o[0] - h[0], o[1] - h[1]); if(d < bd){ bd = d; best = o; } } if(best && bd < 150){ ctx.beginPath(); ctx.moveTo(h[0], h[1]); ctx.lineTo(best[0], best[1]); ctx.stroke(); } }
    ctx.setLineDash([]);
    mols.forEach(m => molAt(ctx, 'H2O', m[0], m[1], s, m[2] + Math.sin(t*.8 + m[0])*.1));
    lbl(ctx, '- - -  = ' + (LANG === 'ro' ? 'legătură de hidrogen' : 'hydrogen bond'), 400, 428, {color:'#8A4508', font:'800 15px Nunito, sans-serif'});
  },
  polar(ctx, v, t){
    const x = v.oil ? 250 : 400, y = 200;
    molAt(ctx, 'H2O', x, y + Math.sin(t*1.5)*3, 90);
    lbl(ctx, 'δ−', x, y - 90, {color:'#1a74b3', font:'800 26px Nunito, sans-serif'}); lbl(ctx, 'δ+', x - 100, y + 80, {color:'#c0392b', font:'800 24px Nunito, sans-serif'}); lbl(ctx, 'δ+', x + 100, y + 80, {color:'#c0392b', font:'800 24px Nunito, sans-serif'});
    lbl(ctx, 'H₂O · ' + t_('lPolar'), x, 390, {font:'600 20px Fredoka, Nunito, sans-serif'});
    if(v.oil){
      for(let i = 0; i < 6; i++){ const cx = 470 + i*42, cy = 200 + (i % 2 ? 16 : -16); if(i) drawBond(ctx, cx - 42, 200 + ((i - 1) % 2 ? 16 : -16), cx, cy, 1, 30, '#7b8a91', 1); }
      for(let i = 0; i < 6; i++){ const cx = 470 + i*42, cy = 200 + (i % 2 ? 16 : -16); drawAtom(ctx, cx, cy, 'C', 32, null, 1); drawAtom(ctx, cx, cy + (i % 2 ? 30 : -30), 'H', 32, null, 1); }
      lbl(ctx, (LANG === 'ro' ? 'ulei · ' : 'oil · ') + t_('lNonpolar'), 575, 390, {font:'600 20px Fredoka, Nunito, sans-serif'});
    }
  },
  dissolve(ctx, v, t, ts){
    const e = ts % 9; const lx = 170, ly = 150;
    ctx.fillStyle = 'rgba(26,116,179,.07)'; roundRect(ctx, 60, 70, 680, 330, 20); ctx.fill();
    for(let r = 0; r < 4; r++) for(let c = 0; c < 4; c++){
      const idx = r*4 + c; const leave = clamp01((e - 1 - idx*.35)/2.2);
      const na = (r + c) % 2 === 0; const hx = lx + c*34, hy = ly + r*34;
      const tx = 360 + (idx % 6)*62 + Math.sin(t + idx)*8, ty = 110 + Math.floor(idx/6)*95 + Math.cos(t*1.2 + idx)*8;
      const x = lerp(hx, tx, easeOut(leave)), y = lerp(hy, ty, easeOut(leave));
      if(leave > .5){ for(let w = 0; w < 3; w++){ const a = t*.5 + w*2.1 + idx; molAt(ctx, 'H2O', x + Math.cos(a)*34, y + Math.sin(a)*34, 11, a + (na ? Math.PI : 0)); } }
      drawAtom(ctx, x, y, na ? 'Na' : 'Cl', 26, na ? '+' : '−', 1);
    }
    lbl(ctx, 'NaCl(s)  →  Na⁺(aq) + Cl⁻(aq)', 400, 425, {font:'500 20px "IBM Plex Mono", monospace'});
  },
  evap(ctx, v, t, ts){
    const e = ts % 9, lvl = 1 - clamp01((e - .5)/6);
    const x = 300, y = 90, w = 200, h = 280;
    ctx.fillStyle = 'rgba(207,230,255,.6)'; ctx.fillRect(x + 4, y + h - (h - 30)*lvl*.8 - 4, w - 8, (h - 30)*lvl*.8);
    ctx.strokeStyle = '#8aa7b5'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w, y); ctx.stroke();
    if(e > 5){ for(let i = 0; i < 18; i++){ ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#c9d6dc'; ctx.lineWidth = 1; const cx2 = x + 20 + (i*37) % (w - 40), cy2 = y + h - 10 - (i % 3)*8; ctx.fillRect(cx2, cy2, 9, 9); ctx.strokeRect(cx2, cy2, 9, 9); } }
    for(let i = 0; i < 8; i++){ const k = ((t*.4 + i/8) % 1); ctx.fillStyle = 'rgba(160,180,195,' + (.5*(1 - k)*lvl) + ')'; ctx.beginPath(); ctx.arc(x + 40 + (i*23) % 130 + Math.sin(t + i)*10, y - k*80, 12 + k*14, 0, 7); ctx.fill(); }
    ctx.fillStyle = '#3a6fe0'; ctx.beginPath(); ctx.moveTo(x + 60, y + h + 38); ctx.quadraticCurveTo(x + 100, y + h + 5 + Math.sin(t*20)*3, x + 140, y + h + 38); ctx.fill();
    lbl(ctx, e > 5 ? (LANG === 'ro' ? 'sarea rămâne' : 'the salt stays behind') : (LANG === 'ro' ? 'apa se evaporă' : 'the water evaporates'), 620, 230, {font:'800 17px Nunito, sans-serif', color:'#8A4508'});
  },
  change(ctx, v, t, ts){
    const e = ts % 8;
    box(ctx, 60, 110, 300, 270, t_('lPhysical'), v.side === 0); box(ctx, 440, 110, 300, 270, t_('lChemical'), v.side === 1);
    const m = clamp01(e/6); const s = 90*(1 - m*.7);
    ctx.fillStyle = 'rgba(190,225,250,.9)'; roundRect(ctx, 210 - s/2, 330 - s, s, s, 8); ctx.fill(); ctx.strokeStyle = '#8fc0e0'; ctx.stroke();
    ctx.fillStyle = 'rgba(120,180,230,.55)'; ctx.beginPath(); ctx.ellipse(210, 335, 40 + 70*m, 8 + 6*m, 0, 0, 7); ctx.fill();
    lbl(ctx, 'H₂O (s) → H₂O (l)', 210, 145, {font:'500 16px "IBM Plex Mono", monospace'});
    ctx.fillStyle = '#8a5a2b'; roundRect(ctx, 520, 318, 140, 26, 10); ctx.fill(); ctx.fillStyle = '#6d451f'; roundRect(ctx, 540, 300, 100, 22, 10); ctx.fill();
    for(let i = 0; i < 5; i++){ const off = (i - 2)*16, h = 70 + 30*Math.abs(Math.sin(t*(5 + i) + i)); ctx.fillStyle = i % 2 ? 'rgba(255,190,60,.9)' : 'rgba(240,110,30,.85)'; ctx.beginPath(); ctx.moveTo(590 + off - 14, 304); ctx.quadraticCurveTo(590 + off - 16, 304 - h*.5, 590 + off + Math.sin(t*8 + i)*6, 304 - h); ctx.quadraticCurveTo(590 + off + 16, 304 - h*.5, 590 + off + 14, 304); ctx.fill(); }
    for(let i = 0; i < 6; i++){ const k = ((t*.3 + i/6) % 1); ctx.fillStyle = 'rgba(120,120,120,' + (.4*(1 - k)) + ')'; ctx.beginPath(); ctx.arc(570 + Math.sin(t + i)*20, 200 - k*70, 10 + k*12, 0, 7); ctx.fill(); }
    lbl(ctx, 'CO₂ + H₂O + ' + (LANG === 'ro' ? 'cenușă' : 'ash'), 590, 145, {font:'500 16px "IBM Plex Mono", monospace'});
  },
  signs(ctx, v, t){
    const items = [['sigGas', 0], ['sigColor', 1], ['sigSolid', 2], ['sigHeat', 3], ['sigLight', 4], ['sigSmell', 5]];
    items.forEach(([k, i]) => { const x = 70 + (i % 3)*230, y = 70 + Math.floor(i/3)*185; box(ctx, x, y, 200, 150, null, false); lbl(ctx, t_(k), x + 100, y + 130, {font:'800 16px Nunito, sans-serif'});
      const cx = x + 100, cy = y + 60;
      if(i === 0){ for(let b = 0; b < 7; b++){ const k2 = (t*.6 + b/7) % 1; ctx.strokeStyle = '#1a74b3'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx - 40 + b*13, cy + 40 - k2*80, 5 + b % 3, 0, 7); ctx.stroke(); } }
      if(i === 1){ const hue = (t*60) % 360; ctx.fillStyle = 'hsl(' + hue + ',70%,55%)'; roundRect(ctx, cx - 40, cy - 40, 80, 80, 12); ctx.fill(); }
      if(i === 2){ for(let b = 0; b < 16; b++){ const k2 = (t*.4 + b/16) % 1; ctx.fillStyle = '#f2c23a'; ctx.fillRect(cx - 45 + (b*23) % 90, cy - 40 + k2*80, 6, 6); } }
      if(i === 3){ ctx.fillStyle = '#e9ecef'; roundRect(ctx, cx - 8, cy - 45, 16, 80, 8); ctx.fill(); const lvl2 = 30 + 40*tri(t*.3); ctx.fillStyle = '#c93a33'; roundRect(ctx, cx - 5, cy + 35 - lvl2, 10, lvl2, 5); ctx.fill(); ctx.beginPath(); ctx.arc(cx, cy + 38, 12, 0, 7); ctx.fill(); }
      if(i === 4){ const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, 55); g.addColorStop(0, 'rgba(255,240,150,' + (.9 - .3*tri(t)) + ')'); g.addColorStop(1, 'rgba(255,240,150,0)'); ctx.fillStyle = g; ctx.fillRect(cx - 60, cy - 60, 120, 120); ctx.fillStyle = '#f2c23a'; ctx.beginPath(); ctx.arc(cx, cy, 16, 0, 7); ctx.fill(); }
      if(i === 5){ ctx.strokeStyle = '#2fb35a'; ctx.lineWidth = 3; for(let w = 0; w < 3; w++){ ctx.beginPath(); for(let yy = 0; yy < 70; yy += 4){ const xx = cx - 30 + w*30 + Math.sin(yy*.15 + t*4 + w)*6; yy ? ctx.lineTo(xx, cy + 35 - yy) : ctx.moveTo(xx, cy + 35); } ctx.stroke(); } }
    });
  },
  reaction(ctx, v, t, ts){
    const Zs = CR.lz; if(Zs.spec !== v.spec || ts < .05 && !Zs.started){ zoomPrepare(v.spec, Zs); Zs.started = true; }
    if(performance.now()/1000 - Zs.t0 > 7.5) zoomPrepare(v.spec, Zs);
    Zs.ctx = ctx; zoomDraw(Zs);
  },
  phscale(ctx, v, t){
    const x0 = 70, x1 = 730, y = 190;
    const g = ctx.createLinearGradient(x0, 0, x1, 0); ['#d42a44','#df4f8c','#a0479f','#6b3fa0','#3f5fc0','#2c8f9c','#3aa35a','#d6c63a'].forEach((c, i, a) => g.addColorStop(i/(a.length - 1), c));
    if(!v.cabbage){ const g2 = ctx.createLinearGradient(x0, 0, x1, 0); g2.addColorStop(0, '#e23b2e'); g2.addColorStop(.25, '#f2a23a'); g2.addColorStop(.5, '#3fb24f'); g2.addColorStop(.75, '#2f6fe0'); g2.addColorStop(1, '#5a2aa0'); ctx.fillStyle = g2; } else ctx.fillStyle = g;
    roundRect(ctx, x0, y, x1 - x0, 44, 22); ctx.fill();
    for(let p = 0; p <= 14; p++){ const x = x0 + p/14*(x1 - x0); lbl(ctx, String(p), x, y + 66, {font:'800 15px Nunito, sans-serif'}); }
    lbl(ctx, '← ' + t_('lAcidic'), x0 + 90, y - 26, {color:'#c0392b', font:'800 17px Nunito, sans-serif'}); lbl(ctx, t_('lNeutral'), (x0 + x1)/2, y - 26, {font:'800 17px Nunito, sans-serif'}); lbl(ctx, t_('lBasic') + ' →', x1 - 90, y - 26, {color:'#1a74b3', font:'800 17px Nunito, sans-serif'});
    if(v.marks || !v.cabbage){ PH_ITEMS.forEach(([ph, n], i) => { const x = x0 + ph/14*(x1 - x0); const yy = y + 100 + (i % 2)*38; ctx.strokeStyle = '#9aa6ab'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y + 48); ctx.lineTo(x, yy - 12); ctx.stroke(); lbl(ctx, tr(n), x, yy, {font:'700 14px Nunito, sans-serif'}); }); }
    if(v.cabbage){ lbl(ctx, LANG === 'ro' ? 'culorile sucului de varză roșie' : 'red cabbage juice colours', 400, 330, {font:'800 16px Nunito, sans-serif', color:'#6b3fa0'}); const k = tri(t*.2); ctx.fillStyle = '#16252E'; const mx = x0 + k*(x1 - x0); ctx.beginPath(); ctx.moveTo(mx, y - 6); ctx.lineTo(mx - 8, y - 18); ctx.lineTo(mx + 8, y - 18); ctx.fill(); }
  },
  energy(ctx, v, t, ts){
    const x0 = 110, x1 = 700, yb = 380, yt = 70; const exo = v.mode !== 'endo';
    const rY = exo ? 250 : 300, pY = exo ? 320 : 190, peak = 110;
    ctx.strokeStyle = '#16252E'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, yt); ctx.lineTo(x0, yb); ctx.lineTo(x1, yb); ctx.stroke();
    ctx.save(); ctx.translate(x0 - 30, (yt + yb)/2); ctx.rotate(-Math.PI/2); lbl(ctx, t_('lEnergy'), 0, 0, {font:'800 15px Nunito, sans-serif'}); ctx.restore();
    const curve = (px, pk) => { if(px < .2) return rY; if(px > .8) return pY; const u = (px - .2)/.6; const base = lerp(rY, pY, u); return base - (Math.min(rY, pY) - pk + Math.abs(rY - pY)*0)*Math.sin(u*Math.PI)*1 + 0; };
    const yAt = (px, pk) => { if(px < .2) return rY; if(px > .8) return pY; const u = (px - .2)/.6; const base = lerp(rY, pY, u); const top = pk; return base - (lerp(rY, pY, .5) - top)*Math.pow(Math.sin(u*Math.PI), 1.5); };
    const draw = (pk, col, dash) => { ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.setLineDash(dash || []); ctx.beginPath(); for(let i = 0; i <= 100; i++){ const px = i/100; const x = x0 + 20 + px*(x1 - x0 - 40); const y = yAt(px, pk); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.setLineDash([]); };
    draw(peak, '#1a74b3');
    if(v.cat){ draw(peak + 90, '#2fb35a', [10, 8]); lbl(ctx, t_('lCatalyst'), 400, peak + 110, {color:'#23945A', font:'800 15px Nunito, sans-serif'}); }
    lbl(ctx, t_('lReactants'), x0 + 90, rY - 22, {font:'800 15px Nunito, sans-serif'}); lbl(ctx, t_('lProducts'), x1 - 90, pY - 22, {font:'800 15px Nunito, sans-serif'});
    const dx = x1 - 60; arrowLine(ctx, dx, rY, dx, pY, exo ? '#c93a33' : '#1a74b3'); lbl(ctx, t_(exo ? 'lReleased' : 'lAbsorbed'), dx - 70, (rY + pY)/2, {color:exo ? '#c93a33' : '#1a74b3', font:'800 14px Nunito, sans-serif'});
    if(v.act){ const px = 400; arrowLine(ctx, x0 + 150, rY, x0 + 150, peak + 8, '#E9821C'); lbl(ctx, t_('lActivation'), x0 + 150, peak - 14, {color:'#8A4508', font:'800 15px Nunito, sans-serif'}); }
    const u = (ts % 5)/4.2; const px = clamp01(u); const bx = x0 + 20 + px*(x1 - x0 - 40); const by = yAt(px, v.cat ? peak + 90 : peak) - 14;
    ctx.fillStyle = '#E9821C'; ctx.beginPath(); ctx.arc(bx, by, 12, 0, 7); ctx.fill();
  },
  collisions(ctx, v, t){
    const boxes = v.two ? [[60, 90, 320, 290, .35, t_('lCold')], [420, 90, 320, 290, 1.2, t_('lHot')]] : [[180, 90, 440, 290, .7, null]];
    boxes.forEach(([x, y, w, h, sp, title], bi) => { box(ctx, x, y, w, h, title, false); ctx.save(); roundRect(ctx, x, y, w, h, 14); ctx.clip(); const pts = [];
      for(let i = 0; i < 16; i++){ const px = x + 14 + tri(t*sp*.25*(1 + (i % 4)*.2) + i*.31)*(w - 28), py = y + 14 + tri(t*sp*.22*(1 + (i % 3)*.25) + i*.57)*(h - 28); pts.push([px, py]); ctx.fillStyle = i % 2 ? '#e2553f' : '#1a74b3'; ctx.beginPath(); ctx.arc(px, py, 9, 0, 7); ctx.fill(); }
      for(let i = 0; i < pts.length; i++) for(let j = i + 1; j < pts.length; j++){ if((i + j) % 2 === 0) continue; const d = Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]); if(d < 20){ const mx = (pts[i][0] + pts[j][0])/2, my = (pts[i][1] + pts[j][1])/2; ctx.strokeStyle = '#f2c23a'; ctx.lineWidth = 3; for(let r2 = 0; r2 < 6; r2++){ const a = r2*Math.PI/3; ctx.beginPath(); ctx.moveTo(mx + Math.cos(a)*8, my + Math.sin(a)*8); ctx.lineTo(mx + Math.cos(a)*18, my + Math.sin(a)*18); ctx.stroke(); } } }
      ctx.restore(); });
  },
  shells(ctx, v, t){
    const n = v.els.length; v.els.forEach((z, i) => { const E = ELEMENTS[z - 1]; const R = n > 3 ? 70 : 100; const x = 400 + (i - (n - 1)/2)*(n > 3 ? 180 : 250); drawBohr(ctx, x, 200, R, z, E[4], shellsFor(z), t, {label:(LANG === 'ro' ? E[3] : E[2]) + ' (' + E[1] + ')', sub:shellsFor(z).join(', '), glowOuter:v.glow || n <= 3}); });
    if(v.glow){ arrowLine(ctx, 140, 110, 660, 110, '#E9821C'); lbl(ctx, LANG === 'ro' ? 'mai mare → mai reactiv' : 'bigger → more reactive', 400, 90, {color:'#8A4508', font:'800 16px Nunito, sans-serif'}); }
  },
  mole(ctx, v, t, ts){
    if(v.stage === 0){ for(let d = 0; d < 12; d++){ const x = 190 + (d % 6)*60, y = 150 + Math.floor(d/6)*80; ctx.fillStyle = '#fbf3e4'; ctx.beginPath(); ctx.ellipse(x, y, 22, 28, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#e0cfa8'; ctx.lineWidth = 2; ctx.stroke(); }
      lbl(ctx, '12 = 1 ' + (LANG === 'ro' ? 'duzină' : 'dozen'), 330, 330, {font:'600 26px Fredoka, Nunito, sans-serif'});
      lbl(ctx, '6.022 × 10²³ = ' + t_('lMole'), 600, 230, {font:'600 26px Fredoka, Nunito, sans-serif', color:'#1a74b3'}); return; }
    if(v.stage === 1){ const k = clamp01(ts/3); const full = '602 214 076 000 000 000 000 000'; lbl(ctx, full.slice(0, Math.max(1, Math.round(full.length*k))), 400, 190, {font:'500 38px "IBM Plex Mono", monospace'}); lbl(ctx, '= 6.022 × 10²³', 400, 270, {font:'600 34px Fredoka, Nunito, sans-serif', color:'#1a74b3'}); return; }
    ctx.fillStyle = '#b9c1c7'; ctx.beginPath(); ctx.ellipse(300, 230, 110, 45, 0, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(120,180,230,.8)'; ctx.beginPath(); ctx.ellipse(300, 225, 92, 34, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#b9c1c7'; roundRect(ctx, 400, 218, 220, 18, 9); ctx.fill();
    lbl(ctx, t_('lWater18'), 400, 340, {font:'600 22px Fredoka, Nunito, sans-serif'}); molAt(ctx, 'H2O', 300, 120 + Math.sin(t*2)*4, 30); lbl(ctx, '× 6.022 × 10²³', 440, 120, {font:'500 20px "IBM Plex Mono", monospace', align:'left'});
  },
  redox(ctx, v, t, ts){
    const e = ts % 6, mv = clamp01((e - 1)/2);
    const fe = [240, 210], cu = [560, 210];
    drawAtom(ctx, fe[0], fe[1], 'Fe', 110, mv >= 1 ? '2+' : null, 1); drawAtom(ctx, cu[0], cu[1], 'Cu', 110, mv >= 1 ? null : '2+', 1);
    for(let i = 0; i < 2; i++){ const x = lerp(fe[0] + 50, cu[0] - 50, mv) , y = fe[1] - 70 - 60*Math.sin(mv*Math.PI) + i*26; if(mv > 0 && mv < 1 || e < 1){ ctx.fillStyle = '#1a74b3'; ctx.beginPath(); ctx.arc(e < 1 ? fe[0] + 60 + i*18 : x + i*18, e < 1 ? fe[1] - 60 : y, 9, 0, 7); ctx.fill(); lbl(ctx, '−', e < 1 ? fe[0] + 60 + i*18 : x + i*18, e < 1 ? fe[1] - 60 : y, {color:'#fff', font:'800 12px Nunito, sans-serif'}); } }
    lbl(ctx, t_('lOx'), fe[0], 350, {color:'#c93a33', font:'800 17px Nunito, sans-serif'}); lbl(ctx, t_('lRed'), cu[0], 350, {color:'#1a74b3', font:'800 17px Nunito, sans-serif'});
    lbl(ctx, 'Fe + Cu²⁺ → Fe²⁺ + Cu', 400, 410, {font:'500 22px "IBM Plex Mono", monospace'});
    if(v.battery){ ctx.strokeStyle = '#E9821C'; ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.lineDashOffset = -t*40; ctx.beginPath(); ctx.moveTo(fe[0], 100); ctx.quadraticCurveTo(400, 30, cu[0], 100); ctx.stroke(); ctx.setLineDash([]); ctx.lineDashOffset = 0; lbl(ctx, LANG === 'ro' ? 'curent electric' : 'electric current', 400, 45, {color:'#8A4508', font:'800 15px Nunito, sans-serif'}); }
  },
  lattice(ctx, v, t){ for(let r = 0; r < 5; r++) for(let c = 0; c < 8; c++){ const na = (r + c) % 2 === 0; drawAtom(ctx, 190 + c*60 + r*14, 110 + r*52, na ? 'Na' : 'Cl', na ? 32 : 40, na ? '+' : '−', 1); } lbl(ctx, 'NaCl', 400, 415, {font:'500 24px "IBM Plex Mono", monospace'}); },
  chain(ctx, v, t, ts){
    if(v.polymer){ const s = 26; for(let i = 0; i < 12; i++){ const x = 90 + i*56, y = 200 + (i % 2 ? 14 : -14); if(i) drawBond(ctx, x - 56, 200 + ((i - 1) % 2 ? 14 : -14), x, y, 1, s, '#7b8a91', 1); }
      for(let i = 0; i < 12; i++){ const x = 90 + i*56, y = 200 + (i % 2 ? 14 : -14); drawAtom(ctx, x, y, 'C', s, null, 1); drawAtom(ctx, x, y + (i % 2 ? 30 : -30), 'H', s, null, 1); if(i % 3 === 1) drawAtom(ctx, x, y + (i % 2 ? -30 : 30), 'O', s, null, 1); else drawAtom(ctx, x, y + (i % 2 ? -30 : 30), 'H', s, null, 1); }
      ctx.strokeStyle = '#16252E'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(250, 140); ctx.lineTo(240, 140); ctx.lineTo(240, 260); ctx.lineTo(250, 260); ctx.moveTo(398, 140); ctx.lineTo(408, 140); ctx.lineTo(408, 260); ctx.lineTo(398, 260); ctx.stroke(); lbl(ctx, 'n', 422, 262, {font:'800 22px Nunito, sans-serif'});
      lbl(ctx, LANG === 'ro' ? 'unitatea care se repetă (monomer)' : 'repeating unit (monomer)', 324, 300, {font:'800 14px Nunito, sans-serif', color:'#8A4508'}); return; }
    const n = v.grow ? 1 + Math.floor(ts/2.2) % 4 : 1; const names = [['methane','metan'], ['ethane','etan'], ['propane','propan'], ['butane','butan']];
    const s = 48, x0 = 400 - (n - 1)*s*.75;
    for(let i = 0; i < n; i++){ const x = x0 + i*s*1.5, y = 210; if(i) drawBond(ctx, x - s*1.5, y, x, y, 1, s, '#7b8a91', 1);
      const hs = [[0, -1.1], [0, 1.1]]; if(i === 0) hs.push([-1.1, 0]); if(i === n - 1) hs.push([1.1, 0]);
      hs.forEach(h => { drawBond(ctx, x, y, x + h[0]*s, y + h[1]*s, 1, s, '#7b8a91', 1); drawAtom(ctx, x + h[0]*s, y + h[1]*s, 'H', s, null, 1); }); }
    for(let i = 0; i < n; i++) drawAtom(ctx, x0 + i*s*1.5, 210, 'C', s, null, 1);
    const f = 'C' + (n > 1 ? String.fromCharCode(0x2080 + n) : '') + 'H' + String(2*n + 2).split('').map(d => String.fromCharCode(0x2080 + +d)).join('');
    lbl(ctx, (LANG === 'ro' ? names[n - 1][1] : names[n - 1][0]) + '  ' + f, 400, 360, {font:'600 26px Fredoka, Nunito, sans-serif'});
  },
};

// ---------- classroom UI ----------
function courseProg(id){ return CR.progress[id]; }
function nextInFlow(){
  const all = allLessons(); const st0 = stageForLevel(LEVEL); let i0 = all.findIndex(l => l.stage === st0); if(i0 < 0) i0 = 0;
  for(let i = i0; i < all.length; i++) if(!courseProg(all[i].id)) return all[i];
  for(let i = 0; i < i0; i++) if(!courseProg(all[i].id)) return all[i];
  return null;
}
function renderCourseMap(){
  const el = $('#courseMap'); const all = allLessons(); const nx = nextInFlow();
  let h = '<p class="eyebrow">' + t('courseTitle') + '</p>';
  const doneN = all.filter(l => courseProg(l.id)).length;
  h += '<div class="cm-prog"><div class="cm-bar"><i style="width:' + Math.round(doneN/all.length*100) + '%"></i></div><span>' + t('lessonsDone', {n:doneN, total:all.length}) + '</span></div>';
  if(nx) h += '<button class="btn primary small cm-next" data-lesson="' + nx.id + '"><span>' + t('continueFlow') + '</span><b>' + esc(tr(nx.title)) + '</b></button>';
  const recSt = stageForLevel(LEVEL); const curSt = CR.lesson && CR.lesson.stage;
  STAGES.forEach(sg => {
    const ls = all.filter(l => l.stage === sg); const d = ls.filter(l => courseProg(l.id)).length;
    const open = CR.openStages ? CR.openStages[sg.id] : (sg === curSt || sg === recSt);
    h += '<details class="stage' + (sg === recSt || (LEVEL === 2 && sg.n === 4) ? ' rec' : '') + '" data-stage="' + sg.id + '"' + (open ? ' open' : '') + '><summary><span class="sg-n">' + sg.n + '</span><span class="sg-t"><b>' + tr(sg.name) + '</b><small>' + t('agesN', {a:sg.ages}) + ' · ' + tr(sg.sub) + '</small></span><span class="sg-p">' + d + '/' + ls.length + '</span></summary>';
    sg.modules.forEach(m => {
      h += '<div class="track"><h4>' + tr(m.name) + '</h4><ol class="lessons">';
      m.lessons.forEach(id => { const l = lessonById(id); if(!l) return; const n = all.indexOf(l) + 1; const p = courseProg(l.id); const cur = CR.lesson && CR.lesson.id === l.id;
        h += '<li><button data-lesson="' + l.id + '" class="' + (cur ? 'cur ' : '') + (p ? 'done ' : '') + (nx === l ? 'nextup' : '') + '"><span class="ln">' + (p ? '✓' : n) + '</span><span class="lt">' + tr(l.title) + '</span>' + (p ? '<span class="lstars">' + '★'.repeat(p.stars) + '<i>' + '★'.repeat(Math.max(0, p.total - p.stars)) + '</i></span>' : '') + '</button></li>'; });
      h += '</ol></div>';
    });
    h += '</details>';
  });
  el.innerHTML = h;
  el.querySelectorAll('details.stage>summary').forEach(sm => sm.addEventListener('click', () => { const dd = sm.parentElement; CR.openStages = CR.openStages || {}; el.querySelectorAll('details.stage').forEach(x => CR.openStages[x.dataset.stage] = x === dd ? !x.open : x.open); }));
  const c = el.querySelector('button.cur'); if(c && !CR.mapScrolled){ CR.mapScrolled = true; setTimeout(() => { try{ c.scrollIntoView({block:'nearest'}); }catch(e){} }, 50); }
}
function openLesson(id, slide){
  const l = lessonById(id); if(!l) return;
  CR.lesson = l; CR.slide = slide == null ? -1 : slide; CR.mode = 'slides'; CR.t0 = nowS(); CR.lz.spec = null; CR.lz.started = false; CR.paused = false;
  store.set('lesson', id);
  if(CR.openStages && l.stage) CR.openStages[l.stage.id] = true;
  renderCourseMap(); renderLesson(); renderLessonSide();
}
function lessonIndex(l){ return allLessons().findIndex(x => x.id === l.id); }
const lcFirst = x => x.replace(/^\d+\.\s*/, '').replace(/^./, c => c.toLowerCase());
function introSlide(l){
  const topics = l.slides.map(s => s.h ? lcFirst(tr(s.h)) : '').filter(Boolean);
  const is101 = lessonIndex(l) === 0; const first = is101 || !CR.greeted;
  const T = l.slides.map(s => s.h ? lcFirst(s.h.en) : '').filter(Boolean).join(', '), TR = l.slides.map(s => s.h ? lcFirst(s.h.ro) : '').filter(Boolean).join(', ');
  const sgEn = l.stage ? 'stage ' + l.stage.n + ', ' + l.stage.name.en : '', sgRo = l.stage ? 'etapa ' + l.stage.n + ', ' + l.stage.name.ro : '';
  const en = is101 ? 'Welcome to my class, Chemistry 101! I’m Professor Ion. In this lesson, “{title}”, here is what we will learn: {topics}. Let’s begin!'
    : first ? 'Welcome to my chemistry class! I’m Professor Ion. This lesson is from {stage}: “{title}”. Here is what we will learn: {topics}. Let’s begin!'
    : 'Today’s lesson is “{title}”. Here is what we will learn: {topics}. Let’s begin!';
  const ro = is101 ? 'Bun venit la ora mea, Chimie 101! Eu sunt Profesorul Ion. În această lecție, „{title}”, iată ce vom învăța: {topics}. Să începem!'
    : first ? 'Bun venit la ora mea de chimie! Eu sunt Profesorul Ion. Lecția aceasta este din {stage}: „{title}”. Iată ce vom învăța: {topics}. Să începem!'
    : 'Lecția de azi este „{title}”. Iată ce vom învăța: {topics}. Să începem!';
  return {v:{type:'title'}, h:is101 ? L('Welcome to Chemistry 101!','Bun venit la Chimie 101!') : first ? L('Welcome to class!','Bun venit la oră!') : L('Welcome back to class!','Bine ai revenit la oră!'),
    t:L(fill(en, {title:l.title.en, topics:T, stage:sgEn}), fill(ro, {title:l.title.ro, topics:TR, stage:sgRo}))};
}
function curSlide(){ const l = CR.lesson; if(!l) return null; if(CR.slide < 0){ if(!CR.intro || CR.intro._l !== l){ CR.intro = introSlide(l); CR.intro._l = l; } return CR.intro; } return l.slides[Math.min(CR.slide, l.slides.length - 1)]; }
function speakLesson(txt){ if(!canSpeak() || TAB !== 'course') return; const talk = $('#lessonTalk'); talk.classList.add('talking'); speak(txt, {end:() => talk.classList.remove('talking')}); }
function renderLesson(){
  const l = CR.lesson; if(!l) return;
  const talk = $('#lessonTalk');
  $('#lessonEyebrow').textContent = (l.stage ? t('stageN', {n:l.stage.n}) + ' · ' + tr(l.stage.name) + ' · ' : '') + t('lessonN', {n:lessonIndex(l) + 1});
  if(CR.mode === 'slides'){
    if(CR.slide < 0){ CR.intro = introSlide(l); CR.intro._l = l; }
    const s = curSlide();
    $('#lessonTitle').textContent = s.h ? tr(s.h) : tr(l.title);
    const p = $('#lessonText'); p.innerHTML = '<p></p>'; const txt = tr(s.t);
    clearInterval(CR.typing);
    if(REDUCED || CR.paused) p.firstChild.textContent = txt; else { let i = 0; talk.classList.add('talking'); CR.typing = setInterval(() => { i += 2; p.firstChild.textContent = txt.slice(0, i); if(i >= txt.length){ clearInterval(CR.typing); if(!speakingNow()) talk.classList.remove('talking'); } }, 28); }
    $('#lessonDots').innerHTML = '<i class="' + (CR.slide < 0 ? 'on' : 'past') + '"></i>' + l.slides.map((_, k) => '<i class="' + (k === CR.slide ? 'on' : k < CR.slide ? 'past' : '') + '"></i>').join('') + '<i class="quizdot"></i>';
    $('#lessonPrev').disabled = CR.slide < 0;
    $('#lessonNext').textContent = CR.slide < l.slides.length - 1 ? t('nextPage') : t('startQuiz');
    $('#lessonNav').hidden = false; $('#lessonQuiz').hidden = true; $('#lessonCtl').hidden = false;
    updatePlayBtn();
    if(!CR.paused) narrate(); else { CR.token++; clearTimeout(CR.timer); }
  } else { $('#lessonCtl').hidden = true; renderQuiz(); }
}
function speakingNow(){ try{ return !!(window.speechSynthesis && speechSynthesis.speaking); }catch(e){ return false; } }
function readingMs(txt){ return Math.max(6500, txt.length*62 + 2500); }
function canSpeak(){ const ok = SPEAK && !!window.speechSynthesis && USER_GESTURE; if(ok && typeof langVoiceOK === 'function' && !langVoiceOK()){ noVoiceNotice(); return false; } return ok; }
function narrate(){
  clearTimeout(CR.timer); clearTimeout(CR.fallback); CR.token++; const tok = CR.token;
  if(TAB !== 'course' || CR.mode !== 'slides') return;
  const txt = tr(curSlide().t); const talk = $('#lessonTalk');
  let fired = false;
  const done = () => { if(fired || tok !== CR.token) return; fired = true; clearTimeout(CR.fallback); talk.classList.remove('talking');
    if(!CR.paused && CR.mode === 'slides') CR.timer = setTimeout(() => { if(tok === CR.token && !CR.paused) lessonGo(CR.slide + 1); }, 1500); };
  if(canSpeak()){
    const tStart = Date.now(), need = readingMs(txt);
    const endSpeech = () => { const el = Date.now() - tStart; if(el < need*.35){ clearTimeout(CR.timer); CR.timer = setTimeout(done, need - el); } else done(); };
    if(CR.lesson){ const nx = CR.lesson.slides[CR.slide + 1]; if(nx) setTimeout(() => ttsPrefetch(hookFor(CR.slide + 1) + tr(nx.t)), 1500); }
    speak(hookFor(CR.slide) + txt, {start:() => { if(tok === CR.token) talk.classList.add('talking'); }, end:endSpeech});
    CR.fallback = setTimeout(done, readingMs(txt)*2.2 + 5000);
  } else CR.timer = setTimeout(done, readingMs(txt));
  updateTapHint();
}
function updateTapHint(){ const h = $('#tapHint'); if(h) h.hidden = !(SPEAK && window.speechSynthesis && !USER_GESTURE && TAB === 'course' && !(LANG === 'ro' && typeof RO_VOICE !== 'undefined' && !RO_VOICE)); }
function updatePlayBtn(){ const b = $('#lessonPlay'); if(!b) return; b.setAttribute('aria-pressed', String(!CR.paused)); b.querySelector('span').textContent = t(CR.paused ? 'play' : 'pause'); b.querySelector('.ic-pause').style.display = CR.paused ? 'none' : ''; b.querySelector('.ic-play').style.display = CR.paused ? '' : 'none'; }
function pauseLesson(){ CR.paused = true; CR.token++; clearTimeout(CR.timer); clearTimeout(CR.fallback); stopSpeak(); clearInterval(CR.typing); const s = curSlide(); if(s && CR.mode === 'slides') $('#lessonText').firstChild.textContent = tr(s.t); $('#lessonTalk').classList.remove('talking'); updatePlayBtn(); }
function playLesson(){ CR.paused = false; updatePlayBtn(); narrate(); }
function repeatSlide(){ CR.paused = false; CR.t0 = nowS(); CR.lz.spec = null; CR.lz.started = false; stopSpeak(); renderLesson(); }
function courseLeave(){ CR.token++; clearTimeout(CR.timer); clearTimeout(CR.fallback); clearInterval(CR.typing); stopSpeak(); }
function courseEnter(){ if(CR.lesson && CR.mode === 'slides' && !CR.paused){ CR.t0 = nowS(); renderLesson(); } updateTapHint(); }
function lessonGo(i){
  const l = CR.lesson; if(!l) return;
  if(i >= l.slides.length){ CR.token++; clearTimeout(CR.timer); clearTimeout(CR.fallback); stopSpeak(); CR.mode = 'quiz'; CR.quiz = {i:0, score:0, answered:false}; renderLesson(); return; }
  if(CR.slide < 0 && i >= 0) CR.greeted = true;
  CR.slide = Math.max(-1, i); CR.t0 = nowS(); CR.lz.spec = null; CR.lz.started = false; stopSpeak(); renderLesson();
}
let USER_GESTURE = false;
function onFirstGesture(){ if(USER_GESTURE) return; USER_GESTURE = true; updateTapHint(); if(TAB === 'course' && CR.mode === 'slides' && !CR.paused) setTimeout(() => { if(TAB === 'course' && !CR.paused && !speakingNow()) narrate(); }, 60); }
document.addEventListener('pointerdown', onFirstGesture, true); document.addEventListener('keydown', onFirstGesture, true);
function renderQuiz(){
  clearInterval(CR.typing); $('#lessonTalk').classList.remove('talking');
  const l = CR.lesson, Q = CR.quiz; const box = $('#lessonQuiz'); $('#lessonNav').hidden = true; box.hidden = false;
  $('#lessonDots').innerHTML = l.slides.map(() => '<i class="past"></i>').join('') + '<i class="quizdot on"></i>';
  if(Q.i >= l.quiz.length){
    const stars = Q.score; const prev = CR.progress[l.id];
    CR.progress[l.id] = {stars:Math.max(stars, prev ? prev.stars : 0), total:l.quiz.length}; store.set('course', CR.progress);
    $('#lessonTitle').textContent = t('quizDone', {n:Q.score, total:l.quiz.length});
    $('#lessonText').innerHTML = '<p class="bigstars">' + '★'.repeat(Q.score) + '<i>' + '★'.repeat(l.quiz.length - Q.score) + '</i></p>';
    const idx = lessonIndex(l), next = allLessons()[idx + 1];
    box.innerHTML = '<div class="row-btns">' + (next ? '<button class="btn primary small" data-q="nextlesson">' + t('nextLesson') + ': ' + esc(tr(next.title)) + '</button>' : '') + '<button class="btn small" data-q="try">' + t('tryIt') + '</button><button class="btn small" data-q="again">' + t('retry') + '</button><button class="btn small" data-q="rewatch">' + t('restartLesson') + '</button></div>';
    speakLesson(t('quizDone', {n:Q.score, total:l.quiz.length}));
    if(Q.score === l.quiz.length) { FX.celebrate = null; }
    renderCourseMap(); return;
  }
  const q = l.quiz[Q.i];
  $('#lessonTitle').textContent = tr(q.q); $('#lessonText').innerHTML = '<p class="meta">' + t('quizQ', {n:Q.i + 1, total:l.quiz.length}) + '</p>';
  box.innerHTML = '<div class="answers">' + q.a.map((a, k) => '<button class="ans" data-a="' + k + '">' + esc(tr(a)) + '</button>').join('') + '</div><div class="feedback" id="quizFb"></div>';
  speakLesson(tr(q.q));
}
function answerQuiz(k){
  const l = CR.lesson, Q = CR.quiz, q = l.quiz[Q.i]; if(Q.answered) return; Q.answered = true;
  const ok = k === q.c; if(ok) Q.score++;
  document.querySelectorAll('#lessonQuiz .ans').forEach((b, i) => { b.disabled = true; if(i === q.c) b.classList.add('right'); else if(i === k) b.classList.add('wrong'); });
  const fb = $('#quizFb'); fb.className = 'feedback ' + (ok ? 'ok' : 'no');
  const pr = praise(ok); fb.innerHTML = '<b>' + esc(pr) + '</b> ' + esc(tr(q.why)) + '<div class="row-btns"><button class="btn primary small" data-q="nextq">' + (Q.i < l.quiz.length - 1 ? t('nextQ') : t('finish')) + '</button></div>';
  speakLesson(pr + ' ' + tr(q.why));
}
function renderLessonSide(){
  const l = CR.lesson; if(!l) return;
  $('#lessonTerms').innerHTML = '<p class="eyebrow">' + t('keyWords') + '</p><dl class="terms">' + l.terms.map(([a, b]) => '<dt>' + esc(tr(a)) + '</dt><dd>' + esc(tr(b)) + '</dd>').join('') + '</dl>';
  const all = allLessons(), idx = all.indexOf(l), prev = idx > 0 ? all[idx - 1] : null;
  const pre = prev && !courseProg(prev.id) && prev.stage === l.stage ? '<div class="prereq"><p class="eyebrow">' + t('prereq') + '</p><p>' + esc(t('prereqTxt', {title:tr(prev.title)})) + '</p><button class="btn small" data-lesson="' + prev.id + '">' + esc(tr(prev.title)) + '</button></div>' : '';
  $('#lessonTry').innerHTML = pre + '<p class="eyebrow">' + t('tryIt') + '</p><p style="margin:6px 0 10px;font-weight:700">' + esc(tr(l.try.label)) + '</p><button class="btn small primary" data-q="try">' + t('go') + ' →</button>';
}
function goTry(){
  const l = CR.lesson; if(!l) return; const tt = l.try;
  switchTab(tt.tab);
  if(tt.tab === 'lab' && tt.mission){ const i = MISSIONS.findIndex(m => m.key === tt.mission); if(i >= 0){ gotoMission(i); } }
}
function drawCourse(t){
  const ctx = CR.ctx; if(!ctx || !CR.lesson) return;
  ctx.clearRect(0, 0, CR.W, CR.H); ctx.fillStyle = '#f8fbfa'; ctx.fillRect(0, 0, CR.W, CR.H);
  ctx.strokeStyle = 'rgba(26,116,179,.06)'; ctx.lineWidth = 1; for(let x = 0; x < CR.W; x += 25){ ctx.beginPath(); ctx.moveTo(x + .5, 0); ctx.lineTo(x + .5, CR.H); ctx.stroke(); } for(let y = 0; y < CR.H; y += 25){ ctx.beginPath(); ctx.moveTo(0, y + .5); ctx.lineTo(CR.W, y + .5); ctx.stroke(); }
  const v = CR.mode === 'slides' ? curSlide().v : CR.lesson.slides[CR.lesson.slides.length - 1].v;
  const f = VIS[v.type]; if(f){ ctx.save(); f(ctx, v, t, t - CR.t0); ctx.restore(); }
}
function bindCourse(){
  $('#courseMap').addEventListener('click', e => { const b = e.target.closest('button[data-lesson]'); if(b) openLesson(b.dataset.lesson); });
  $('#courseMap').addEventListener('change', e => { if(e.target.id === 'ageSel'){ AGE = e.target.value; store.set('age', AGE); openLesson(courseTracks()[0].lessons[0].id); } });
  $('#lessonPrev').addEventListener('click', () => lessonGo(CR.slide - 1));
  $('#lessonPlay').addEventListener('click', () => { if(CR.paused) playLesson(); else pauseLesson(); });
  $('#lessonRepeat').addEventListener('click', repeatSlide);
  $('#skipLab').addEventListener('click', () => { pauseLesson(); switchTab('lab'); });
  $('#lessonNext').addEventListener('click', () => lessonGo(CR.slide + 1));
  $('#lessonSpeak').addEventListener('click', () => { SPEAK = !SPEAK; store.set('speak', SPEAK); $('#lessonSpeak').setAttribute('aria-pressed', String(SPEAK)); $('#profSpeak').setAttribute('aria-pressed', String(SPEAK)); if(!SPEAK){ stopSpeak(); $('#lessonTalk').classList.remove('talking'); } if(CR.mode === 'slides' && !CR.paused) narrate(); });
  document.querySelector('.course').addEventListener('click', e => {
    const a = e.target.closest('button[data-a]'); if(a){ answerQuiz(+a.dataset.a); return; }
    const pl = e.target.closest('#lessonTry button[data-lesson]'); if(pl){ openLesson(pl.dataset.lesson); return; }
    const q = e.target.closest('button[data-q]'); if(!q) return; const k = q.dataset.q;
    if(k === 'nextq'){ CR.quiz.i++; CR.quiz.answered = false; renderQuiz(); }
    if(k === 'again'){ CR.quiz = {i:0, score:0, answered:false}; renderQuiz(); }
    if(k === 'rewatch'){ openLesson(CR.lesson.id, -1); }
    if(k === 'nextlesson'){ const nx = allLessons()[lessonIndex(CR.lesson) + 1]; if(nx) openLesson(nx.id); }
    if(k === 'try') goTry();
  });
  $('#lessonAsk').addEventListener('submit', e => { e.preventDefault(); askProf({q:'#lessonQ', out:'#lessonAnswer', btn:'#lessonAskBtn', form:'#lessonAsk', talk:'#lessonTalk', ctx:'The child is in the Chemistry 101 lesson "' + CR.lesson.title.en + '". Slide text: ' + CR.lesson.slides[Math.max(0, Math.min(CR.slide, CR.lesson.slides.length - 1))].t.en}); });
}
function initCourse(){
  CR.canvas = $('#lessonCanvas'); CR.ctx = CR.canvas.getContext('2d'); CR.lz.ctx = CR.ctx;
  bindCourse();
  const saved = store.get('lesson', null);
  const first = allLessons()[0].id;
  openLesson(saved && lessonById(saved) ? saved : first, -1);
  $('#lessonSpeak').setAttribute('aria-pressed', String(SPEAK));
}
function openLessonFromLab(id){ closeProf(); switchTab('course'); openLesson(id); }

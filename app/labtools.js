// ===================== v5: lab tools (titration, electrolysis, cells, gas tests, wet heat, indicators) =====================
Object.assign(S, {
  ltTools:L('Lab tools','Instrumente'),
  lt_burette:L('Burette','Biuretă'), lt_electrodes:L('Electrodes','Electrozi'), lt_cell:L('Cell','Pilă'), lt_straw:L('Straw','Pai'),
  ltClose:L('Close','Închide'),
  ltTitTitle:L('Titration','Titrare'),
  ltTitAcid:L('Acid in the flask: 25.0 cm³, 0.100 mol/dm³','Acidul din vas: 25,0 cm³, 0,100 mol/dm³'),
  ltStrong:L('Hydrochloric acid (strong)','Acid clorhidric (tare)'), ltWeak:L('Ethanoic acid (weak)','Acid etanoic (slab)'),
  ltInd:L('Indicator','Indicator'), ltBur:L('Burette: sodium hydroxide, 0.100 mol/dm³','Biuretă: hidroxid de sodiu, 0,100 mol/dm³'),
  ltAdded:L('Added','Adăugat'), ltDrip:L('Hold to drip','Ține apăsat: picură'), ltRefill:L('Refill and restart','Umple din nou'),
  ltTitHelp:L('Add 1 cm³ at a time, then slow down to 0.1 cm³ (or drip) when the colour starts to change.','Adaugă câte 1 cm³, apoi încetinește la 0,1 cm³ (sau picură) când culoarea începe să se schimbe.'),
  ltTitDone:L('End point: {v} cm³. Keep adding to see the whole pH curve.','Punct final: {v} cm³. Continuă să adaugi ca să vezi toată curba de pH.'),
  ltBurEmpty:L('The burette is empty. Refill it to start again.','Biureta este goală. Umple-o din nou ca să reîncepi.'),
  ltTitSay:L('The flask holds 25.0 cm³ of acid and a few drops of indicator. Open the tap and watch the colour!','Vasul conține 25,0 cm³ de acid și câteva picături de indicator. Deschide robinetul și urmărește culoarea!'),
  ltWarnMO:L(' Careful: methyl orange changes colour far too early with a weak acid, so this titre is wrong. Use phenolphthalein.',' Atenție: metiloranjul își schimbă culoarea mult prea devreme cu un acid slab, deci acest volum este greșit. Folosește fenolftaleina.'),
  ltWarnUniv:L(' Universal indicator changes gradually, so the end point is not sharp. Titrations use a single indicator.',' Indicatorul universal se schimbă treptat, deci punctul final nu este clar. La titrări se folosește un singur indicator.'),
  ltCurve:L('pH curve','Curba de pH'), ltVolAxis:L('NaOH added / cm³','NaOH adăugat / cm³'),
  ltNoLiquid:L('Pour in a liquid first, then add the electrodes.','Toarnă întâi un lichid, apoi pune electrozii.'),
  ltPure:L('Pure water hardly conducts electricity: almost no bubbles. Add sodium sulfate or salt to help.','Apa pură aproape că nu conduce electricitatea: aproape nicio bulă. Adaugă sulfat de sodiu sau sare.'),
  ltElSay:L('The power is on. Watch both electrodes carefully!','Curentul este pornit. Urmărește atent ambii electrozi!'),
  ltCathode:L('cathode (−)','catod (−)'), ltAnode:L('anode (+)','anod (+)'), ltGasCol:L('Gas collected','Gaz colectat'),
  ltCellTitle:L('Electrochemical cell','Pilă electrochimică'),
  ltCellHelp:L('Pick a metal for each half-cell. Each metal stands in a solution of its own ions, and a salt bridge joins the two beakers.','Alege un metal pentru fiecare semipilă. Fiecare metal stă într-o soluție a propriilor ioni, iar o punte de sare unește cele două pahare.'),
  ltLeft:L('Left half-cell','Semipila stângă'), ltRight:L('Right half-cell','Semipila dreaptă'),
  ltConnect:L('Connect the voltmeter','Conectează voltmetrul'), ltDisconnect:L('Disconnect','Deconectează'),
  ltNeg:L('{m} is the negative electrode: electrons flow out of it, through the wire, to {p}.','{m} este electrodul negativ: electronii ies din el și merg prin fir spre {p}.'),
  ltSame:L('Two identical metals give no voltage.','Două metale identice nu dau tensiune.'),
  ltSwap:L('The reading is negative because the right-hand metal is the negative electrode. Swap them round to read a positive voltage.','Valoarea este negativă pentru că metalul din dreapta este electrodul negativ. Inversează-le ca să citești o tensiune pozitivă.'),
  ltStrawNo:L('Blow bubbles into a liquid: pour something into the beaker first.','Suflă bule într-un lichid: toarnă întâi ceva în pahar.'),
  ltStrawSay:L('You are blowing out carbon dioxide from your lungs.','Sufli dioxid de carbon din plămâni.'),
  ltTestGasH:L('Test the gas','Testează gazul'), ltTestGas:L('Test the gas: {g}','Testează gazul: {g}'),
  ltCurr:L('In the curriculum:','În programă:'), ltOpenLesson:L('Open lesson','Deschide lecția'),
  ltGasEye:L('Gas test','Testul gazului'),
});
const LT = {panel:null, wetAcc:0, tit:null, titAcid:'hcl', titInd:'phph', el:null, thio:null, cell:{l:'fe', r:'ag', conn:false, emitted:{}}, ind:null, chrom:null, chromFlipped:false, straw:null, gas:null};
const fmtN = (x, d) => x.toFixed(d).replace('.', LANG === 'ro' ? ',' : '.');
const CELLM = {
  mg:{E:-2.37, n:L('Magnesium','Magneziu'), f:'Mg', c:'#b7bcc2', sol:'#eef3f6', ion:'Mg²⁺'},
  zn:{E:-.76, n:L('Zinc','Zinc'), f:'Zn', c:'#9aa3ad', sol:'#eef3f6', ion:'Zn²⁺'},
  fe:{E:-.44, n:L('Iron','Fier'), f:'Fe', c:'#6f767d', sol:'#d3ebc9', ion:'Fe²⁺'},
  cu:{E:.34, n:L('Copper','Cupru'), f:'Cu', c:'#c8743a', sol:'#6fb2ec', ion:'Cu²⁺'},
  ag:{E:.80, n:L('Silver','Argint'), f:'Ag', c:'#dfe3e8', sol:'#eef3f6', ion:'Ag⁺'},
};
const GASF = {h2:'H₂', o2:'O₂', co2:'CO₂', cl2:'Cl₂'};
const GAS_OK = {mg_acid:['h2'], zn_acid:['h2'], li_water:['h2'], na_water:['h2'], k_water:['h2'], al_cucl2:['h2'], h2o2_yeast:['o2'], h2o2_ki:['o2'], mno2:['o2'],
  acid_carb:['co2'], ferment:['co2'], cacl2_soda:['co2'], soda_heat:['co2']};
const GAS_TXT = {
  h2:{t:L('Squeaky pop: hydrogen!','Poc ascuțit: hidrogen!'),
    b:L('The lit splint made a squeaky pop! That tiny explosion proves the gas is hydrogen.','Așchia aprinsă a făcut un „poc” ascuțit! Mica explozie arată că gazul este hidrogen.'),
    s:L('Hydrogen mixed with air burns almost instantly: 2H₂ + O₂ → 2H₂O. The rapid expansion makes the pop, and the only product is water.','Hidrogenul amestecat cu aer arde aproape instantaneu: 2H₂ + O₂ → 2H₂O. Dilatarea bruscă produce pocnetul, iar singurul produs este apa.')},
  o2:{t:L('The splint relights: oxygen!','Așchia se reaprinde: oxigen!'),
    b:L('The glowing splint burst back into flame! Things burn much better in pure oxygen, so the gas is oxygen.','Așchia care mocnea s-a aprins din nou! Lucrurile ard mult mai bine în oxigen pur, deci gazul este oxigen.'),
    s:L('Air is only about 21% oxygen. In pure O₂ the glowing wood oxidises so fast that it reignites. Carbon dioxide or nitrogen would put it out instead.','Aerul conține doar circa 21% oxigen. În O₂ pur lemnul care mocnește se oxidează atât de repede încât se reaprinde. Dioxidul de carbon sau azotul l-ar stinge.')},
  co2:{t:L('Limewater turns milky: carbon dioxide!','Apa de var se tulbură: dioxid de carbon!'),
    b:L('When the gas bubbled through limewater, it turned milky white. That is the test for carbon dioxide.','Când gazul a trecut prin apa de var, aceasta a devenit albă ca laptele. Acesta este testul pentru dioxid de carbon.'),
    s:L('Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s) + H₂O(l). The insoluble calcium carbonate makes the milkiness. A lit splint would simply go out in CO₂.','Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s) + H₂O(l). Carbonatul de calciu insolubil produce tulbureala. O așchie aprinsă doar s-ar stinge în CO₂.')},
  cl2:{t:L('Litmus bleached: chlorine!','Turnesol decolorat: clor!'),
    b:L('The damp blue litmus paper turned red and then white. Chlorine is acidic and it bleaches colours.','Hârtia de turnesol albastră și umedă a devenit roșie, apoi albă. Clorul este acid și decolorează.'),
    s:L('Cl₂ + H₂O ⇌ HCl + HClO: the acids turn litmus red, then hypochlorous acid oxidises the dye, bleaching it white.','Cl₂ + H₂O ⇌ HCl + HClO: acizii înroșesc turnesolul, apoi acidul hipocloros oxidează colorantul și îl decolorează.')},
};
const LT_IC = {
  burette:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2h4v12l-1 2v6h-2v-6l-1-2z"/><path d="M7 15h10"/><path d="M11 6h1.5M11 9h1.5"/></svg>',
  electrodes:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7v13M16 7v13"/><path d="M8 7V4h8v3"/><path d="M11 2l-1 2h3l-1 2" stroke-width="1.6"/></svg>',
  cell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="17" height="10" rx="2"/><path d="M22 10v4"/><path d="M6 12h4M8 10v4M13 12h3"/></svg>',
  straw:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l-7 17"/><path d="M15 2h4"/><circle cx="7" cy="20" r="1.6"/><circle cx="12" cy="21" r="1.2"/><circle cx="5" cy="15" r="1.1"/></svg>',
  gas:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c1 3 4 4.5 4 8a4 4 0 0 1-8 0c0-2 1-3 2-4 0 1.5.8 2 2 2 0-2.5-1-4 0-6z"/><path d="M12 15v7"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5.5C5.5 4 8.5 4 12 6c3.5-2 6.5-2 9-.5V19c-2.5-1.5-5.5-1.5-9 .5-3.5-2-6.5-2-9-.5z"/><path d="M12 6v13.5"/></svg>',
};

// ---------- shelf icons for new items ----------
function iconSVG3(s){
  if(s.icon === 'granules'){
    return '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="8" y="12" width="32" height="32" rx="5" fill="#eaf4f8" stroke="#9db6c2" stroke-width="1.6"/>' +
      '<path d="M13 40l3-5 5 1 2 4zM22 41l2-6 6-1 3 5-2 3zM16 33l4-4 4 2-1 4zM27 33l3-4 5 2-1 4z" fill="' + s.c + '" stroke="#6f777f" stroke-width="1"/>' +
      '<path d="M17 36l2-1M25 37l3-1M29 31l2 0" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".8"/>' +
      '<rect x="6" y="6" width="36" height="7" rx="2.5" fill="#2c3a40"/></svg>';
  }
  if(s.icon === 'drop'){
    const c = s.ic || s.c;
    return '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M20 4h8l1 9h-10z" fill="#2c3a40"/><rect x="18" y="12" width="12" height="4" rx="1.5" fill="#46545b"/>' +
      '<path d="M15 16h18v22a5 5 0 0 1-5 5h-8a5 5 0 0 1-5-5z" fill="#eaf4f8" stroke="#9db6c2" stroke-width="1.6"/>' +
      '<path d="M16.6 27h14.8v11a3.6 3.6 0 0 1-3.6 3.6h-7.6a3.6 3.6 0 0 1-3.6-3.6z" fill="' + c + '" opacity="' + (s.id === 'phph' ? '.18' : '.85') + '"/>' +
      '<rect x="18" y="20" width="12" height="5" rx="1" fill="#fff" opacity=".9"/><circle cx="24" cy="22.5" r="1.6" fill="' + c + '"/>' +
      '<path d="M40 30c0 2-1.4 3.4-3 3.4S34 32 34 30c0-2 3-5.5 3-5.5s3 3.5 3 5.5z" fill="' + c + '"/></svg>';
  }
  return '';
}

// ---------- toolbar & panels ----------
function renderLabTools(){
  const el = document.getElementById('labTools'); if(!el) return;
  const on = {burette:!!LT.tit, electrodes:!!(LT.el && LT.el.on), cell:LT.panel === 'cell', straw:false};
  el.innerHTML = '<span class="lt-label">' + t('ltTools') + '</span>' + ['burette','electrodes','cell','straw'].map(k =>
    '<button class="btn small" data-tool="' + k + '" aria-pressed="' + on[k] + '">' + LT_IC[k] + '<span>' + t('lt_' + k) + '</span></button>').join('');
  renderPanel();
}
function renderPanel(){
  const p = document.getElementById('toolPanel'); if(!p) return;
  if(!LT.panel){ p.hidden = true; p.innerHTML = ''; if(typeof highlightStep === 'function') highlightStep(); return; }
  p.hidden = false;
  const head = (title) => '<div class="tp-head"><h3>' + title + '</h3><button class="btn small" data-tp="close" aria-label="' + t('ltClose') + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>';
  if(LT.panel === 'burette' && LT.tit){
    const T = LT.tit;
    const seg = (attr, cur, opts) => '<div class="seg tp-seg">' + opts.map(o => '<button data-' + attr + '="' + o[0] + '" aria-pressed="' + (o[0] === cur) + '">' + o[1] + '</button>').join('') + '</div>';
    p.innerHTML = head(t('ltTitTitle')) + '<div class="tp-grid"><div class="tp-ctl">' +
      '<p class="tp-lbl">' + t('ltTitAcid') + '</p>' + seg('titacid', T.acid, [['hcl', t('ltStrong')], ['eth', t('ltWeak')]]) +
      '<p class="tp-lbl" style="margin-top:8px">' + t('ltInd') + '</p>' + seg('titind', T.ind, [['phph', nm('phph')], ['mo', nm('mo')], ['univ', nm('univ')]]) +
      '<p class="tp-lbl" style="margin-top:8px">' + t('ltBur') + '</p>' +
      '<div class="tp-read"><div><span>' + t('ltAdded') + '</span><b id="titV"></b></div><div><span>pH</span><b id="titPH"></b></div></div>' +
      '<div class="row-btns" style="margin-top:0"><button class="btn small primary" data-tit="1">+1 cm³</button><button class="btn small" data-tit="0.1">+0,1 cm³</button>' +
      '<button class="btn small" data-tit="drip">' + t('ltDrip') + '</button><button class="btn small" data-tit="reset">' + t('ltRefill') + '</button></div>' +
      '<p class="meta" id="titMsg"></p></div>' +
      '<div class="tp-curve"><p class="eyebrow">' + t('ltCurve') + '</p><canvas id="titCurve" aria-label="' + esc(t('ltCurve')) + '"></canvas></div></div>';
    if(LANG === 'en') p.querySelector('[data-tit="0.1"]').textContent = '+0.1 cm³';
    updateTitReadout();
  } else if(LT.panel === 'cell'){
    const C = LT.cell;
    const row = (side, lbl) => '<div class="tp-cellrow"><span class="lbl">' + t(lbl) + '</span>' + Object.keys(CELLM).map(m =>
      '<button class="btn small" data-cellm="' + side + ':' + m + '" aria-pressed="' + (C[side] === m) + '">' + tr(CELLM[m].n) + ' <span class="f">' + CELLM[m].f + '</span></button>').join('') + '</div>';
    p.innerHTML = head(t('ltCellTitle')) + '<p class="meta">' + t('ltCellHelp') + '</p>' + row('l', 'ltLeft') + row('r', 'ltRight') +
      '<canvas id="cellCanvas" aria-label="' + esc(t('ltCellTitle')) + '"></canvas>' +
      '<p id="cellMsg" style="font-weight:700;margin:8px 0 0"></p><div class="row-btns"><button class="btn small ' + (C.conn ? '' : 'primary') + '" data-cell="conn">' + t(C.conn ? 'ltDisconnect' : 'ltConnect') + '</button></div>';
    updateCellMsg();
  } else { LT.panel = null; p.hidden = true; }
  if(typeof highlightStep === 'function') highlightStep();
}

// ---------- titration ----------
function titPH(acid, v){
  const Va = 25, C = .1, Vt = (Va + v)/1000, Ct = C*Va/1000/Vt, Na = C*v/1000/Vt;
  const Ka = acid === 'hcl' ? 1e3 : Math.pow(10, -4.76), Kw = 1e-14;
  let lo = 0, hi = 14;
  for(let i = 0; i < 60; i++){ const ph = (lo + hi)/2, h = Math.pow(10, -ph); const f = h + Na - Kw/h - Ct*Ka/(Ka + h); if(f > 0) lo = ph; else hi = ph; }
  return (lo + hi)/2;
}
function titEnd(ind, ph){ return ind === 'phph' ? ph >= 8.3 : ind === 'mo' ? ph >= 4.4 : ph >= 7; }
function startTitration(){
  if(typeof ANIM !== 'undefined' && ANIM.cur) return;
  washBeaker(true);
  LT.tit = {acid:LT.titAcid, ind:LT.titInd, v:0, pts:[[0, titPH(LT.titAcid, 0)]], done:false, drip:false, dripAcc:0, drops:[], emitted:false};
  B.items = [{uid:B.uid++, id:'titmix', t:nowS()}]; titSetVol(); B.dispVol = B.vol; B.disp = null;
  LT.panel = 'burette';
  renderLabTools(); renderContents();
  const b = document.getElementById('bubble'); if(b) b.innerHTML = t('ltTitSay');
}
function endTitration(){ LT.tit = null; if(LT.panel === 'burette') LT.panel = null; washBeaker(true); renderLabTools(); }
function titSetVol(){ B.vol = .9 + LT.tit.v*.028; }
function titAdd(dv){
  const T = LT.tit; if(!T || !hasId('titmix')) return;
  if(T.v >= 50){ flashBanner(t('ltBurEmpty')); T.drip = false; return; }
  T.v = Math.min(50, Math.round((T.v + dv)*100)/100);
  const ph = titPH(T.acid, T.v); T.pts.push([T.v, ph]);
  T.drops.push({t0:nowS()}); if(T.drops.length > 8) T.drops.shift();
  B.wave = Math.max(B.wave, .3); titSetVol(); B.colorRate = 6; B.colorRateUntil = nowS() + 1;
  if(!T.emitted){ T.emitted = true; emit('tit:add'); }
  if(!T.done && titEnd(T.ind, ph)){ T.done = true; T.drip = false; titEndpoint(ph); }
  updateTitReadout();
}
function titEndpoint(ph){
  const T = LT.tit; const v = T.v, acid = T.acid, ind = T.ind;
  const warn = acid === 'eth' && ind === 'mo' ? 'ltWarnMO' : ind === 'univ' ? 'ltWarnUniv' : '';
  showResults([{kind:'rule', rule:TIT_RULE, key:'titration:' + acid + ':' + ind,
    varsFn:() => ({titre:fmtN(v, 2), conc:fmtN(.1*v/25, 3), acid:acid === 'hcl' ? 'HCl' : 'CH₃COOH', ind:nm(ind), ph:fmtN(ph, 1), warn:warn ? t(warn) : ''})}]);
}
function updateTitReadout(){
  const T = LT.tit; if(!T) return;
  const ph = titPH(T.acid, T.v);
  const a = document.getElementById('titV'), b = document.getElementById('titPH'), m = document.getElementById('titMsg');
  if(a) a.textContent = fmtN(T.v, 2) + ' cm³'; if(b) b.textContent = fmtN(ph, 2);
  if(m) m.textContent = T.done ? t('ltTitDone', {v:fmtN(T.pts.find(p => titEnd(T.ind, p[1]))[0], 2)}) : t('ltTitHelp');
  drawTitCurve();
}
function drawTitCurve(){
  const c = document.getElementById('titCurve'); const T = LT.tit; if(!c || !T) return;
  const r = c.getBoundingClientRect(); if(!r.width) return;
  const W = 520, H = 240, dpr = Math.min(2, window.devicePixelRatio || 1);
  c.width = Math.round(r.width*dpr); c.height = Math.round(r.height*dpr);
  const ctx = c.getContext('2d'); ctx.setTransform(dpr*r.width/W, 0, 0, dpr*r.height/H, 0, 0);
  const x0 = 44, x1 = 506, y0 = 14, y1 = 200; const X = v => x0 + v/50*(x1 - x0), Y = ph => y1 - ph/14*(y1 - y0);
  ctx.clearRect(0, 0, W, H);
  // indicator range
  const band = T.ind === 'phph' ? [8.2, 10, 'rgba(224,36,122,.14)'] : T.ind === 'mo' ? [3.1, 4.4, 'rgba(238,122,34,.18)'] : null;
  if(band){ ctx.fillStyle = band[2]; ctx.fillRect(x0, Y(band[1]), x1 - x0, Y(band[0]) - Y(band[1])); }
  ctx.strokeStyle = '#dfe7e3'; ctx.lineWidth = 1; ctx.font = '700 11px Nunito, sans-serif'; ctx.fillStyle = '#56666D';
  ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
  for(let ph = 0; ph <= 14; ph += 2){ ctx.beginPath(); ctx.moveTo(x0, Y(ph)); ctx.lineTo(x1, Y(ph)); ctx.stroke(); ctx.fillText(String(ph), x0 - 6, Y(ph)); }
  ctx.textAlign = 'center'; ctx.textBaseline = 'top';
  for(let v = 0; v <= 50; v += 10){ ctx.beginPath(); ctx.moveTo(X(v), y0); ctx.lineTo(X(v), y1); ctx.stroke(); ctx.fillText(String(v), X(v), y1 + 5); }
  ctx.fillText(t('ltVolAxis'), (x0 + x1)/2, y1 + 22);
  ctx.save(); ctx.translate(12, (y0 + y1)/2); ctx.rotate(-Math.PI/2); ctx.fillText('pH', 0, -4); ctx.restore();
  ctx.strokeStyle = '#16252E'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y1); ctx.lineTo(x1, y1); ctx.stroke();
  // measured curve
  const pts = T.pts;
  ctx.strokeStyle = '#1A74B3'; ctx.lineWidth = 2.4; ctx.lineJoin = 'round'; ctx.beginPath();
  pts.forEach((p, i) => i ? ctx.lineTo(X(p[0]), Y(p[1])) : ctx.moveTo(X(p[0]), Y(p[1]))); ctx.stroke();
  for(const p of pts){ const col = indColor3(T.ind, p[1]); ctx.fillStyle = col ? 'rgb(' + (col[0]|0) + ',' + (col[1]|0) + ',' + (col[2]|0) + ')' : '#ffffff';
    ctx.beginPath(); ctx.arc(X(p[0]), Y(p[1]), 3.2, 0, 7); ctx.fill(); ctx.strokeStyle = '#1A74B3'; ctx.lineWidth = 1; ctx.stroke(); }
  if(T.done){ const ep = pts.find(p => titEnd(T.ind, p[1]));
    ctx.setLineDash([5, 4]); ctx.strokeStyle = '#E9821C'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(X(ep[0]), y0); ctx.lineTo(X(ep[0]), y1); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#8A4508'; ctx.textAlign = ep[0] > 40 ? 'right' : 'left'; ctx.textBaseline = 'top'; ctx.fillText(fmtN(ep[0], 2) + ' cm³', X(ep[0]) + (ep[0] > 40 ? -6 : 6), y0 + 4); }
}

// ---------- electrolysis ----------
const NONION = new Set(['water','ethanol','ethanolaq','sugaraq','glucoseaq','phph','mo','univ','cabbage','oil','hexane','hexene','titmix','foodcolor','starch','glycerol','glycerolaq','milk','eggwhite','ester','dibromo','h2o2','emul','indigo','luminol','iodine']);
const CHLORIDE = new Set(['saltaq','kcl','cacl2','mgcl2','hcl','cucl2aq','fecl2','zncl2','fecl3','liclaq','srcl2aq','clwater','bacl2']);
function elKind(){
  if(!waterPresent()) return null;
  const ids = B.items.map(i => i.id);
  const cu = ids.some(id => id === 'cuso4aq' || id === 'cucl2aq');
  const cl = ids.some(id => CHLORIDE.has(id));
  const ionic = ids.some(id => !NONION.has(id) && (SPECIES[id].st === 'd' || SPECIES[id].st === 'l'));
  return {kind: cu ? 'copper' : cl ? 'brine' : ionic ? 'water' : 'pure', anode: cl ? 'cl2' : 'o2', cathode: cu ? 'cu' : 'h2', salt: ids.indexOf('saltaq') >= 0};
}
function toggleElectrodes(){
  if(LT.el && LT.el.on){ LT.el.on = false; renderLabTools(); return; }
  if(LT.tit) endTitration();
  if(!waterPresent()){ flashBanner(t('ltNoLiquid')); const b = document.getElementById('bubble'); if(b) b.innerHTML = t('ltNoLiquid'); return; }
  LT.el = {on:true, t:0, prog:0, cAcc:0, aAcc:0, gc:0, ga:0, fired:{}, pureSaid:false, info:elKind()};
  emit('tool:electrodes');
  const b = document.getElementById('bubble'); if(b && !MISSION_JUST_DONE) b.innerHTML = t('ltElSay');
  renderLabTools();
}
function elTick(dt){
  const E = LT.el; if(!E || !E.on) return;
  if(!waterPresent()){ E.on = false; renderLabTools(); return; }
  const I = elKind(); E.info = I; E.t += dt;
  const k = I.kind, rate = k === 'pure' ? .06 : 1, red = REDUCED ? .5 : 1;
  const sy = surfY(), xs = [G.cx - 46, G.cx + 46], tip = G.bot - 40, from = Math.max(sy + 8, tip - 90);
  const cr = I.cathode === 'h2' ? 18*rate : 0, ar = (I.anode === 'cl2' ? 16 : 9)*rate;
  E.cAcc += dt*cr*red; E.aAcc += dt*ar*red;
  while(E.cAcc >= 1){ E.cAcc -= 1; FX.bubbles.push({x:xs[0] + rnd(-6, 6), y:rnd(from, tip), r:rnd(1.2, 2.4), vy:rnd(70, 120), ph:rnd(0, 6)}); }
  while(E.aAcc >= 1){ E.aAcc -= 1; FX.bubbles.push({x:xs[1] + rnd(-6, 6), y:rnd(from, tip), r:rnd(1.6, 3), vy:rnd(60, 110), ph:rnd(0, 6)}); }
  if(I.anode === 'cl2' && Math.random() < dt*3*red) FX.puffs.push({x:xs[1] + rnd(-12, 12), y:sy - 8, r:rnd(8, 13), vx:rnd(-8, 8), vy:rnd(-40, -22), life:0, max:rnd(2, 3), c:'196,226,110', a:.35});
  const cap = 1;
  if(I.cathode === 'h2') E.gc = Math.min(cap, E.gc + dt*rate*(I.anode === 'cl2' ? .06 : .08));
  E.ga = Math.min(cap, E.ga + dt*rate*(I.anode === 'cl2' ? .06 : .04));
  if(k === 'pure'){ if(E.t > 3 && !E.pureSaid){ E.pureSaid = true; flashBanner(t('ltPure')); const b = document.getElementById('bubble'); if(b) b.innerHTML = t('ltPure'); } return; }
  E.prog += dt/5;
  if(E.prog >= 1 && !E.fired[k]){ E.fired[k] = true; elFinish(I); }
}
function elFinish(I){
  const k = I.kind; const tm = nowS();
  if(k === 'brine'){
    const had = ['phph','mo','univ','cabbage','indigo','foodcolor'].some(hasId);
    B.items = B.items.filter(i => ['phph','mo','univ','cabbage','indigo','foodcolor'].indexOf(i.id) < 0);
    if(!hasId('naoh')) B.items.push({uid:B.uid++, id:'naoh', t:tm});
    LT.ind = null; B.lastBand = null;
    if(had){ B.colorRate = .5; B.colorRateUntil = tm + 8; }
  } else if(k === 'copper'){
    B.items = B.items.filter(i => i.id !== 'cuso4aq');
    B.items.push({uid:B.uid++, id:'h2so4d', t:tm});
    B.colorRate = .25; B.colorRateUntil = tm + 14;
  }
  const key = 'electrolysis:' + (k === 'brine' && !I.salt ? 'chloride' : k);
  showResults([{kind:'rule', rule:EL_RULES[k], key, varsFn:() => ({})}]);
}

// ---------- cell ----------
function cellVoltage(){ const C = LT.cell; return CELLM[C.r].E - CELLM[C.l].E; }
function updateCellMsg(){
  const m = document.getElementById('cellMsg'); if(!m) return; const C = LT.cell;
  if(!C.conn){ m.textContent = ''; return; }
  if(C.l === C.r){ m.textContent = t('ltSame'); return; }
  const v = cellVoltage(); const neg = v > 0 ? C.l : C.r, pos = v > 0 ? C.r : C.l;
  m.textContent = t('ltNeg', {m:tr(CELLM[neg].n), p:tr(CELLM[pos].n).toLowerCase()}) + (v < 0 ? ' ' + t('ltSwap') : '');
}
function cellCheck(){
  const C = LT.cell; if(!C.conn || C.l === C.r) return;
  const key = 'cell:' + C.l + ':' + C.r; if(C.emitted[key]) return; C.emitted[key] = true;
  const l = C.l, r = C.r, v = CELLM[r].E - CELLM[l].E, neg = v > 0 ? l : r, pos = v > 0 ? r : l;
  showResults([{kind:'rule', rule:CELL_RULE, key, varsFn:() => ({l:CELLM[l].f, r:CELLM[r].f, v:fmtN(v, 2), neg:tr(CELLM[neg].n).toLowerCase(), pos:tr(CELLM[pos].n).toLowerCase()})}]);
}
function drawCell(tm){
  const c = document.getElementById('cellCanvas'); if(!c) return;
  const r = c.getBoundingClientRect(); if(!r.width) return;
  const W = 520, H = 240, dpr = Math.min(2, window.devicePixelRatio || 1);
  if(c.width !== Math.round(r.width*dpr)){ c.width = Math.round(r.width*dpr); c.height = Math.round(r.height*dpr); }
  const ctx = c.getContext('2d'); ctx.setTransform(dpr*r.width/W, 0, 0, dpr*r.height/H, 0, 0); ctx.clearRect(0, 0, W, H);
  const C = LT.cell, v = cellVoltage(), live = C.conn && C.l !== C.r;
  const beaker = (x, m, side) => {
    const M = CELLM[m];
    ctx.fillStyle = hexA(M.sol, .75); ctx.fillRect(x, 130, 130, 88);
    ctx.strokeStyle = '#8fa6ae'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(x, 96); ctx.lineTo(x, 218); ctx.lineTo(x + 130, 218); ctx.lineTo(x + 130, 96); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(x + 8, 136, 5, 70);
    const sx = side === 'l' ? x + 40 : x + 74;
    ctx.fillStyle = M.c; ctx.fillRect(sx, 70, 16, 128); ctx.strokeStyle = shade(M.c, -.35); ctx.lineWidth = 1.2; ctx.strokeRect(sx, 70, 16, 128);
    ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(sx + 3, 74, 3, 118);
    ctx.fillStyle = '#16252E'; ctx.font = '700 13px Nunito, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillText(M.f + ' | ' + M.ion, x + 65, 222);
    return sx + 8;
  };
  const lx = beaker(28, C.l, 'l'), rx = beaker(362, C.r, 'r');
  // salt bridge
  ctx.lineCap = 'round'; ctx.strokeStyle = '#b9ad8c'; ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(126, 176); ctx.lineTo(126, 104); ctx.lineTo(394, 104); ctx.lineTo(394, 176); ctx.stroke();
  ctx.strokeStyle = '#f1ead6'; ctx.lineWidth = 15; ctx.stroke();
  ctx.fillStyle = '#7a6f55'; ctx.font = '700 11px Nunito, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('KNO₃', 260, 104);
  // wires
  const vm = {x:210, y:12, w:100, h:44};
  const wire = (x, tx, col) => { ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, 70); ctx.lineTo(x, 34); ctx.lineTo(tx, 34); ctx.stroke(); };
  wire(lx, vm.x, '#1b1f22'); wire(rx, vm.x + vm.w, '#c93a33');
  // electrons
  if(live && Math.abs(v) > .001){
    const fromX = v > 0 ? lx : rx, toX = v > 0 ? rx : lx;
    const path = [[fromX, 70], [fromX, 34], [fromX < toX ? vm.x : vm.x + vm.w, 34], [fromX < toX ? vm.x + vm.w : vm.x, 34], [toX, 34], [toX, 70]];
    const segs = []; let total = 0; for(let i = 0; i < path.length - 1; i++){ const d = Math.hypot(path[i + 1][0] - path[i][0], path[i + 1][1] - path[i][1]); segs.push(d); total += d; }
    const n = 9, speed = REDUCED ? 0 : 60*Math.min(2, Math.abs(v));
    ctx.fillStyle = '#E9821C';
    for(let k = 0; k < n; k++){
      let d = ((tm*speed + k*total/n) % total), i = 0; while(i < segs.length - 1 && d > segs[i]){ d -= segs[i]; i++; }
      const f = segs[i] ? d/segs[i] : 0; const x = lerp(path[i][0], path[i + 1][0], f), y = lerp(path[i][1], path[i + 1][1], f);
      if(x > vm.x - 2 && x < vm.x + vm.w + 2 && y < vm.y + vm.h) continue;
      ctx.beginPath(); ctx.arc(x, y, 3.2, 0, 7); ctx.fill();
    }
    ctx.fillStyle = '#8A4508'; ctx.font = '800 11px Nunito, sans-serif'; ctx.fillText('e⁻', (fromX + (fromX < toX ? vm.x : vm.x + vm.w))/2, 24);
  }
  // voltmeter
  ctx.fillStyle = '#2c3a40'; roundRect(ctx, vm.x, vm.y, vm.w, vm.h, 8); ctx.fill();
  ctx.fillStyle = '#c9f0d2'; roundRect(ctx, vm.x + 10, vm.y + 7, vm.w - 20, vm.h - 14, 4); ctx.fill();
  ctx.fillStyle = '#12301c'; ctx.font = '600 19px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(live ? (v < 0 ? '−' : '') + fmtN(Math.abs(v), 2) + ' V' : C.conn ? fmtN(0, 2) + ' V' : '— V', vm.x + vm.w/2, vm.y + vm.h/2 + 1);
  // signs
  if(live && Math.abs(v) > .001){
    ctx.font = '800 20px Nunito, sans-serif'; ctx.fillStyle = '#16252E';
    ctx.fillText(v > 0 ? '−' : '+', lx - 22, 84); ctx.fillText(v > 0 ? '+' : '−', rx + 22, 84);
  }
}

// ---------- straw (breath into the beaker) ----------
function breathe(){
  if(!liquidPresent()){ flashBanner(t('ltStrawNo')); return; }
  const tm = nowS(); LT.straw = {t0:tm}; FX.emit({t:'bubbles', rate:45, dur:2.2}, tm); B.wave = Math.max(B.wave, .6);
  const b = document.getElementById('bubble'); if(b) b.innerHTML = t('ltStrawSay');
  emit('tool:straw');
  if(hasId('limewater')) setTimeout(() => {
    const it = {uid:B.uid++, id:'breathco2', t:nowS()}; B.items.push(it);
    const res = processReactions([it.uid]); B.items = B.items.filter(i => i.id !== 'breathco2');
    if(res.length) showResults(res); else renderContents();
  }, 1100);
}

// ---------- gas tests ----------
function showGasTest(g){
  const area = document.getElementById('resultArea'); if(!area || !GAS_TXT[g]) return;
  const old = area.querySelector('.gastest'); if(old) old.remove();
  const G2 = GAS_TXT[g];
  const d = document.createElement('div'); d.className = 'card gastest result';
  d.innerHTML = '<p class="eyebrow">' + t('ltGasEye') + ': ' + GASF[g] + '</p><h3>' + tr(G2.t) + '</h3><canvas id="gasCanvas" aria-label="' + esc(tr(G2.t)) + '"></canvas><p>' + tr(LEVEL === 2 ? G2.s : G2.b) + '</p>' + (LEVEL === 1 ? '<p class="meta">' + tr(G2.s) + '</p>' : '');
  area.prepend(d);
  LT.gas = {g, t0:nowS()};
  d.scrollIntoView({behavior: REDUCED ? 'auto' : 'smooth', block:'nearest'});
  emit('test:' + g);
}
function drawGas(tm){
  const c = document.getElementById('gasCanvas'); if(!c || !LT.gas){ LT.gas = null; return; }
  const r = c.getBoundingClientRect(); if(!r.width) return;
  const W = 400, H = 200, dpr = Math.min(2, window.devicePixelRatio || 1);
  if(c.width !== Math.round(r.width*dpr)){ c.width = Math.round(r.width*dpr); c.height = Math.round(r.height*dpr); }
  const ctx = c.getContext('2d'); ctx.setTransform(dpr*r.width/W, 0, 0, dpr*r.height/H, 0, 0); ctx.clearRect(0, 0, W, H);
  const g = LT.gas.g, e = REDUCED ? 5 : tm - LT.gas.t0;
  const tube = (x, y, w, h, fill) => { ctx.fillStyle = fill; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h - w/2); ctx.arc(x + w/2, y + h - w/2, w/2, Math.PI, 0, true); ctx.lineTo(x + w, y); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#8fa6ae'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(x + 5, y + 8, 3, h - 30); };
  const flame = (x, y, s, col) => { const f = 1 + .12*Math.sin(tm*30); ctx.fillStyle = col || 'rgba(255,160,40,.9)'; ctx.beginPath(); ctx.moveTo(x - 6*s, y); ctx.quadraticCurveTo(x - 8*s, y - 12*s*f, x, y - 24*s*f); ctx.quadraticCurveTo(x + 8*s, y - 12*s*f, x + 6*s, y); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,240,170,.95)'; ctx.beginPath(); ctx.ellipse(x, y - 6*s, 3*s, 6*s, 0, 0, 7); ctx.fill(); };
  const splint = (x, y, ang) => { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.fillStyle = '#c99a5b'; ctx.fillRect(0, -3, 150, 6); ctx.fillStyle = '#6b4a22'; ctx.fillRect(0, -3, 6, 6); ctx.restore(); };
  if(g === 'h2' || g === 'o2'){
    tube(170, 70, 40, 120, 'rgba(225,240,248,.55)');
    ctx.fillStyle = '#56666D'; ctx.font = '700 13px Nunito, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(GASF[g], 190, 150);
    const k = easeOut(e/1.3); const tipX = lerp(330, 196, k), tipY = lerp(30, g === 'h2' ? 66 : 96, k);
    splint(tipX, tipY, -.5);
    if(g === 'h2'){
      if(e < 1.35) flame(tipX, tipY, 1);
      else { const p = clamp01((e - 1.35)/.5); if(p < 1){ ctx.fillStyle = 'rgba(255,236,150,' + (1 - p) + ')'; ctx.beginPath(); ctx.arc(192, 64, 20 + 50*p, 0, 7); ctx.fill(); }
        ctx.fillStyle = '#E9821C'; ctx.font = '800 30px Fredoka, Nunito, sans-serif'; ctx.fillText('POP!', 100, 60);
        ctx.strokeStyle = '#E9821C'; ctx.lineWidth = 3; for(let i = 0; i < 6; i++){ const a = -Math.PI*.9 + i*.35; ctx.beginPath(); ctx.moveTo(192 + Math.cos(a)*28, 62 + Math.sin(a)*28); ctx.lineTo(192 + Math.cos(a)*44, 62 + Math.sin(a)*44); ctx.stroke(); } }
    } else {
      if(e < 1.4){ ctx.fillStyle = 'rgba(255,110,30,' + (.7 + .3*Math.sin(tm*8)) + ')'; ctx.beginPath(); ctx.arc(tipX, tipY, 4.5, 0, 7); ctx.fill(); }
      else flame(tipX, tipY, Math.min(1.3, (e - 1.4)*3));
    }
  } else if(g === 'co2'){
    tube(80, 70, 40, 120, 'rgba(225,240,248,.55)');
    const milk = clamp01((e - .8)/2);
    tube(270, 70, 40, 120, 'rgba(255,255,255,.2)');
    ctx.fillStyle = 'rgba(' + (lerp(226, 250, milk)|0) + ',' + (lerp(238, 250, milk)|0) + ',' + (lerp(244, 246, milk)|0) + ',' + (.35 + .6*milk) + ')'; ctx.fillRect(272, 110, 36, 60); ctx.beginPath(); ctx.arc(290, 170, 18, 0, Math.PI); ctx.fill();
    ctx.strokeStyle = '#8fa6ae'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(100, 76); ctx.lineTo(100, 36); ctx.lineTo(290, 36); ctx.lineTo(290, 160); ctx.stroke();
    ctx.fillStyle = '#56666D'; ctx.font = '700 13px Nunito, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('CO₂', 100, 150); ctx.fillText(tr(L('limewater','apă de var')), 290, 196);
    if(e < 3.2) for(let i = 0; i < 5; i++){ const y = 160 - ((tm*70 + i*22) % 50); ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(290 + Math.sin(i*2 + tm*5)*4, y, 2.5, 0, 7); ctx.stroke(); }
  } else if(g === 'cl2'){
    tube(170, 80, 40, 110, 'rgba(206,232,140,.45)');
    const p1 = clamp01((e - .6)/.7), p2 = clamp01((e - 1.6)/.9);
    const blue = [70, 110, 210], red = [214, 60, 70], white = [250, 250, 246];
    const col = p2 > 0 ? [0,1,2].map(i => lerp(red[i], white[i], p2)) : [0,1,2].map(i => lerp(blue[i], red[i], p1));
    const y = lerp(10, 44, easeOut(e/.6));
    ctx.fillStyle = 'rgb(' + (col[0]|0) + ',' + (col[1]|0) + ',' + (col[2]|0) + ')'; ctx.fillRect(180, y, 20, 60); ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 1; ctx.strokeRect(180, y, 20, 60);
    ctx.fillStyle = '#56666D'; ctx.font = '700 13px Nunito, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('Cl₂', 190, 176);
  }
  if(e > 6) LT.gas = null;
}

// ---------- engine hooks ----------
function labPH(){ if(LT.tit && hasId('titmix')) return titPH(LT.tit.acid, LT.tit.v); return null; }
function activeInd3(){ for(const k of ['univ','mo','phph']) if(hasId(k)) return k; return null; }
function labLiquidColor(){
  if(LT.tit && hasId('titmix')){ const c = indColor3(LT.tit.ind, titPH(LT.tit.acid, LT.tit.v)); return c || [232, 242, 250, .25]; }
  if(hasId('thiomix') && LT.thio){ const k = clamp01(LT.thio.prog); return [lerp(236, 240, k), lerp(242, 228, k), lerp(248, 160, k), .14 + .84*k]; }
  if(hasId('biuretpos') || hasId('milk') || hasId('magicmilk') || hasId('emul')) return null;
  const ind = activeInd3();
  if(ind && waterPresent()){ const c = indColor3(ind, computePH()); if(c) return c; }
  if(hasId('k2cro4') && waterPresent()){ const ph = computePH(); return ph < 6 ? [232, 112, 26, .74] : [242, 212, 28, .62]; }
  return null;
}
function labAfterAdd(results){
  if(!LT.tit){
    const ind = activeInd3();
    if(!ind || !waterPresent()) LT.ind = null;
    else { const ph = computePH(), band = indBand3(ind, ph), key = ind + ':' + band[0];
      if(key !== LT.ind){ LT.ind = key; const side = ph < 6.5 ? 'acid' : ph > 7.5 ? 'base' : 'neutral';
        const sideName = side === 'acid' ? L('acidic','acid') : side === 'base' ? L('alkaline (basic)','bazic') : L('neutral','neutru');
        results.push({kind:'rule', rule:IND3_RULE, key:'indicator2:' + ind + ':' + side, varsFn:() => ({ind:tr(IND3[ind].n), color:tr(band[1]), ph:fmtN(ph, 1), side:tr(sideName)})}); } }
  }
  if(!hasId('k2cro4') || !waterPresent()){ LT.chrom = null; return; }
  const state = computePH() < 6 ? 'orange' : 'yellow';
  if(LT.chrom == null){ LT.chrom = state; if(state === 'yellow') return; }
  else if(state === LT.chrom) return;
  LT.chrom = state;
  if(state === 'orange' && !LT.chromFlipped){ LT.chromFlipped = true; results.push({kind:'rule', rule:CHROMATE_FWD, key:'chromate_fwd', varsFn:() => ({})}); }
  else results.push({kind:'rule', rule:CHROMATE_RULE, key:'chromate:' + state, varsFn:() => ({col:tr(state === 'orange' ? L('orange','portocaliu') : L('yellow','galben'))})});
}
function labOnWash(){
  LT.tit = null; LT.el = null; LT.thio = null; LT.ind = null; LT.chrom = null; LT.chromFlipped = false; LT.straw = null;
  if(LT.panel === 'burette') LT.panel = null;
  renderLabTools();
}
function wetHeatCheck(){
  if(!liquidPresent() || (typeof ANIM !== 'undefined' && ANIM.cur)) return;
  for(const r of RULES){
    if(!r.wet || !r.heatOnly) continue;
    if(B.temp < r.minT || (r.maxT != null && B.temp > r.maxT)) continue;
    if(r.unless && r.unless.some(hasId)) continue;
    if(r.cond && !r.cond()) continue;
    if(!(r.consume && r.consume.length) && B.fired.has(r.key)) continue;
    const m = matchRule(r, null); if(!m) continue;
    showResults([applyRule(r, m)]);
    return;
  }
}
function labTick(dt){
  const tm = nowS();
  LT.wetAcc += dt; if(LT.wetAcc > .25){ LT.wetAcc = 0; wetHeatCheck(); }
  const T = LT.tit;
  if(T){ if(!hasId('titmix')){ LT.tit = null; if(LT.panel === 'burette') LT.panel = null; renderLabTools(); }
    else if(T.drip){ T.dripAcc += dt*.5; while(T.dripAcc >= .05 && T.drip){ T.dripAcc -= .05; titAdd(.05); } } }
  elTick(dt);
  if(hasId('thiomix')){
    if(!LT.thio) LT.thio = {t:0, prog:0, done:false};
    const H = LT.thio;
    if(!H.done){ H.t += dt; H.prog += dt/Math.max(3, 30*Math.pow(2, -(B.temp - 20)/10));
      if(H.prog >= 1){ H.done = true; H.prog = 1; const sec = H.t, temp = B.temp;
        showResults([{kind:'rule', rule:THIO_RULE, key:'thio', varsFn:() => ({sec:fmtN(sec, 1), temp:String(Math.round(temp)), rate:fmtN(1/sec, 3)})}]); } }
  } else LT.thio = null;
  if(typeof TAB !== 'undefined' && TAB === 'lab'){
    if(LT.panel === 'cell') drawCell(tm);
    if(LT.gas) drawGas(tm);
  }
}

// ---------- result-card extras ----------
function gasesOf(r){
  if(!r || r.kind !== 'rule') return [];
  const R = r.rule;
  if(R.id === 'electrolysis'){ const k = r.key.split(':')[1]; return k === 'water' ? ['h2','o2'] : k === 'copper' ? ['o2'] : ['h2','cl2']; }
  const ok = GAS_OK[R.id]; return ok ? (R.wp || []).filter(g => ok.indexOf(g) >= 0) : [];
}
function lessonFor3(id){
  if(typeof lessonById !== 'function') return null;
  const list = [];
  if(typeof RULE_LESSON !== 'undefined' && RULE_LESSON[id]) list.push(RULE_LESSON[id]);
  (LAB_LESSON3[id] || []).forEach(x => list.push(x));
  for(const x of list){ try{ const l = lessonById(x); if(l) return l; }catch(e){} }
  return null;
}
function labCardExtras(r){
  let h = '';
  const gases = []; (LAST.length ? LAST : [r]).forEach(x => gasesOf(x).forEach(g => { if(gases.indexOf(g) < 0) gases.push(g); }));
  if(gases.length) h += '<div class="lab-gas"><span class="eyebrow">' + t('ltTestGasH') + '</span>' + gases.map(g => '<button class="btn small" data-gastest="' + g + '">' + LT_IC.gas + t('ltTestGas', {g:GASF[g]}) + '</button>').join('') + '</div>';
  const l = lessonFor3(r.rule.id);
  if(l) h += '<div class="lab-curr"><span>' + t('ltCurr') + ' <b>' + esc(tr(l.title)) + '</b></span><button class="btn small" data-lablesson="' + esc(l.id) + '">' + LT_IC.book + t('ltOpenLesson') + '</button></div>';
  return h;
}
function labHighlight(ev){
  const q = s => document.querySelectorAll(s).forEach(e => e.classList.add('hl'));
  if(ev.indexOf('tool:') === 0){ const k = ev.slice(5);
    if(!(k === 'burette' && LT.tit) && !(k === 'electrodes' && LT.el && LT.el.on) && !(k === 'cell' && LT.panel === 'cell')) q('[data-tool="' + k + '"]'); }
  else if(ev === 'tit:add' || ev === 'rule:titration'){ if(LT.tit) q(ev === 'tit:add' ? '[data-tit="1"]' : '[data-tit="0.1"],[data-tit="drip"]'); else q('[data-tool="burette"]'); }
  else if(ev.indexOf('cellpick:') === 0){ const m = ev.slice(9); if(LT.panel === 'cell') q('[data-cellm="' + (m === 'zn' ? 'l' : 'r') + ':' + m + '"]'); else q('[data-tool="cell"]'); }
  else if(ev === 'rule:cell'){ if(LT.panel === 'cell'){ if(!LT.cell.conn) q('[data-cell="conn"]'); } else q('[data-tool="cell"]'); }
  else if(ev.indexOf('test:') === 0) q('[data-gastest="' + ev.slice(5) + '"]');
}

// ---------- scene drawing ----------
OBJPOS.zn = {x:G.cx + 44, y:G.bot - 12};
function drawLab3(ctx, tm, phase){
  if(phase === 'objects'){
    for(const it of B.items){
      if(it.id === 'zn' || it.id === 'zn_cu') drawZinc(ctx, it, tm);
    }
    if(hasId('thiomix') || hasId('thio')){
      ctx.fillStyle = '#fbfaf3'; ctx.beginPath(); ctx.ellipse(G.cx, G.bot + 1, 70, 11, 0, 0, 7); ctx.fill();
      ctx.strokeStyle = '#141414'; ctx.lineWidth = 6; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(G.cx - 42, G.bot - 6); ctx.lineTo(G.cx + 42, G.bot + 8); ctx.moveTo(G.cx - 42, G.bot + 8); ctx.lineTo(G.cx + 42, G.bot - 6); ctx.stroke();
    }
    return;
  }
  // top phase
  if(hasId('ester') && B.dispVol > .05){
    const sy = surfY(); ctx.save(); beakerClip(ctx); ctx.clip();
    ctx.fillStyle = 'rgba(250,234,160,.42)'; ctx.fillRect(G.cx - G.hw, sy - G.ry, G.hw*2, G.ry + 9);
    ctx.strokeStyle = 'rgba(210,170,60,.55)'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.ellipse(G.cx, sy + 8, G.hw - 5, G.ry*.8, 0, 0, Math.PI); ctx.stroke();
    ctx.restore();
  }
  if(LT.el && LT.el.on) drawElectrodes(ctx, tm);
  if(LT.tit) drawBurette(ctx, tm);
  if(LT.straw){ const e = tm - LT.straw.t0; if(e > 2.6) LT.straw = null; else {
    const k = Math.min(1, e/.4, (2.6 - e)/.4);
    ctx.save(); ctx.globalAlpha = k; ctx.strokeStyle = '#e8f1f5'; ctx.lineWidth = 9; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(G.cx + 110, G.top - 110); ctx.lineTo(G.cx + 18, G.bot - 24); ctx.stroke();
    ctx.strokeStyle = '#e45b8a'; ctx.lineWidth = 3; ctx.setLineDash([10, 10]); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); } }
  if(LT.thio && hasId('thiomix')) drawTimer(ctx, 262, 336, LT.thio);
}
function drawZinc(ctx, it, tm){
  const pts = [[-20,-7,9],[-4,-5,10],[12,-8,8],[-12,-16,8],[5,-17,9],[22,-4,7]];
  let col = '#a9b1b9';
  if(it.id === 'zn_cu'){ const k = clamp01((tm - it.t)/10); const a = hexToRgb('#a9b1b9'), b = hexToRgb('#5a3222'); col = 'rgb(' + (lerp(a[0], b[0], k)|0) + ',' + (lerp(a[1], b[1], k)|0) + ',' + (lerp(a[2], b[2], k)|0) + ')'; }
  const bx = OBJPOS.zn.x, by = G.bot + 2;
  for(const p of pts){
    ctx.fillStyle = col; ctx.beginPath();
    for(let i = 0; i < 7; i++){ const a = i/7*Math.PI*2, rr = p[2]*(.8 + .25*Math.sin(i*2.7 + p[0])); const x = bx + p[0] + Math.cos(a)*rr, y = by + p[1] + Math.sin(a)*rr*.75; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(40,45,50,.45)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = it.id === 'zn_cu' ? 'rgba(160,90,60,.5)' : 'rgba(255,255,255,.7)'; ctx.fillRect(bx + p[0] - 3, by + p[1] - 3, 3, 1.6);
  }
}
function drawElectrodes(ctx, tm){
  const E = LT.el, I = E.info || {}; const sy = surfY(); const xs = [G.cx - 46, G.cx + 46]; const top = G.top - 62, bot = G.bot - 40;
  // power pack
  const px = 604, py = 424;
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(px + 55, 474, 62, 6, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#2c3a40'; roundRect(ctx, px, py, 110, 48, 8); ctx.fill();
  ctx.fillStyle = '#c9f0d2'; roundRect(ctx, px + 12, py + 10, 52, 22, 3); ctx.fill();
  ctx.fillStyle = '#12301c'; ctx.font = '600 14px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('6.0 V', px + 38, py + 21);
  ctx.fillStyle = '#1b1f22'; ctx.beginPath(); ctx.arc(px + 78, py + 14, 6, 0, 7); ctx.fill();
  ctx.fillStyle = '#c93a33'; ctx.beginPath(); ctx.arc(px + 96, py + 14, 6, 0, 7); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = '800 10px Nunito, sans-serif'; ctx.fillText('−', px + 78, py + 32); ctx.fillText('+', px + 96, py + 32);
  // wires
  ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.strokeStyle = '#1b1f22'; ctx.beginPath(); ctx.moveTo(xs[0], top); ctx.bezierCurveTo(xs[0] - 10, top - 50, px + 60, top - 70, px + 78, py + 14); ctx.stroke();
  ctx.strokeStyle = '#c93a33'; ctx.beginPath(); ctx.moveTo(xs[1], top); ctx.bezierCurveTo(xs[1] + 10, top - 40, px + 90, top - 50, px + 96, py + 14); ctx.stroke();
  // rods
  const c = B.disp || [207, 230, 255, .2];
  xs.forEach((x, i) => {
    const g = ctx.createLinearGradient(x - 6, 0, x + 6, 0); g.addColorStop(0, '#2b2f33'); g.addColorStop(.45, '#5d646b'); g.addColorStop(1, '#25292c');
    ctx.fillStyle = g; ctx.fillRect(x - 6, top, 12, bot - top);
    ctx.fillStyle = '#9aa3a9'; ctx.fillRect(x - 9, top - 6, 18, 9);
    if(i === 0 && I.cathode === 'cu'){ const k = clamp01(E.prog); ctx.fillStyle = 'rgba(196,106,62,' + (.25 + .7*k) + ')'; ctx.fillRect(x - 6 - 2*k, Math.max(sy, top) + 2, 12 + 4*k, bot - Math.max(sy, top) - 2); }
    const ly = Math.max(sy, top);
    if(ly < bot){ ctx.fillStyle = rgba([c[0], c[1], c[2], Math.min(.55, c[3])], 1); ctx.fillRect(x - 8, ly, 16, bot - ly); }
    ctx.fillStyle = i ? '#c93a33' : '#1b1f22'; ctx.beginPath(); ctx.arc(x, top - 20, 9, 0, 7); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = '800 14px Nunito, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(i ? '+' : '−', x, top - 20);
    if(LEVEL >= 1){ ctx.fillStyle = '#16252E'; ctx.font = '700 11px Nunito, sans-serif'; ctx.fillText(t(i ? 'ltAnode' : 'ltCathode'), x + (i ? 38 : -38), top - 20); }
  });
  // gas collected gauge
  const gx = 616, gy = 300, gh = 104, gw = 26;
  ctx.fillStyle = 'rgba(255,255,255,.85)'; roundRect(ctx, gx - 14, gy - 22, 104, gh + 50, 10); ctx.fill();
  ctx.fillStyle = '#16252E'; ctx.font = '800 10.5px Nunito, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(t('ltGasCol'), gx + 38, gy - 11);
  const gas = [[E.gc, I.cathode === 'cu' ? 'Cu' : 'H₂', 'rgba(230,240,248,.95)'], [E.ga, I.anode === 'cl2' ? 'Cl₂' : 'O₂', I.anode === 'cl2' ? 'rgba(206,232,130,.95)' : 'rgba(230,240,248,.95)']];
  gas.forEach((q, i) => { const x = gx + i*50;
    ctx.fillStyle = rgba([c[0], c[1], c[2], Math.max(.35, c[3])]); ctx.fillRect(x, gy, gw, gh);
    ctx.fillStyle = q[2]; ctx.fillRect(x, gy, gw, gh*q[0]);
    ctx.strokeStyle = '#8fa6ae'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, gy + gh); ctx.lineTo(x, gy + 4); ctx.arc(x + gw/2, gy + 4, gw/2, Math.PI, 0); ctx.lineTo(x + gw, gy + gh); ctx.stroke();
    ctx.strokeStyle = 'rgba(80,100,110,.6)'; ctx.lineWidth = 1; for(let k = 1; k < 5; k++){ ctx.beginPath(); ctx.moveTo(x + gw - 7, gy + k*gh/5); ctx.lineTo(x + gw, gy + k*gh/5); ctx.stroke(); }
    ctx.fillStyle = '#16252E'; ctx.font = '800 12px Nunito, sans-serif'; ctx.fillText(q[1], x + gw/2, gy + gh + 13);
  });
}
function drawBurette(ctx, tm){
  const T = LT.tit; const x = G.cx + 34, top = 30, bot = 150, tip = G.top - 6;
  ctx.fillStyle = '#6d777d'; ctx.fillRect(x + 78, 26, 7, 446); ctx.fillStyle = '#4d565d'; roundRect(ctx, x + 50, 462, 70, 10, 3); ctx.fill();
  ctx.fillStyle = '#8e979d'; ctx.fillRect(x + 8, 76, 74, 6); ctx.fillRect(x + 4, 70, 8, 18);
  ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(x - 8, top, 16, bot - top);
  const lvl = top + 6 + T.v/50*(bot - top - 10);
  ctx.fillStyle = 'rgba(214,232,250,.9)'; ctx.fillRect(x - 6, lvl, 12, bot - lvl);
  ctx.strokeStyle = 'rgba(70,95,105,.55)'; ctx.lineWidth = 1.5; ctx.strokeRect(x - 8, top, 16, bot - top);
  ctx.fillStyle = '#16252E'; ctx.font = '700 8px Nunito, sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
  for(let v = 0; v <= 50; v += 5){ const y = top + 6 + v/50*(bot - top - 10); ctx.fillRect(x - 8, y - .4, v % 10 ? 4 : 7, .8); if(v % 10 === 0) ctx.fillText(String(v), x - 11, y); }
  ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(x - 6, bot, 12, 10); ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(x - 2, bot + 10, 4, tip - bot - 10);
  ctx.strokeStyle = 'rgba(70,95,105,.55)'; ctx.lineWidth = 1; ctx.strokeRect(x - 2, bot + 10, 4, tip - bot - 10);
  ctx.save(); ctx.translate(x, bot + 5); ctx.rotate(T.drip ? Math.PI/2 : 0); ctx.fillStyle = '#2c3a40'; roundRect(ctx, -13, -3, 26, 6, 3); ctx.fill(); ctx.restore();
  ctx.fillStyle = '#2c3a40'; ctx.beginPath(); ctx.arc(x, bot + 5, 3.5, 0, 7); ctx.fill();
  const sy = surfY();
  for(const d of T.drops){ const e = tm - d.t0; if(e > .45) continue; const y = lerp(tip, sy, e/.45); ctx.fillStyle = 'rgba(200,225,250,.95)'; ctx.beginPath(); ctx.ellipse(x, y, 2.6, 3.4, 0, 0, 7); ctx.fill(); }
}
function drawTimer(ctx, x, y, H){
  ctx.fillStyle = 'rgba(0,0,0,.14)'; ctx.beginPath(); ctx.arc(x + 2, y + 3, 30, 0, 7); ctx.fill();
  ctx.fillStyle = '#fbfaf5'; ctx.beginPath(); ctx.arc(x, y, 30, 0, 7); ctx.fill(); ctx.strokeStyle = '#16252E'; ctx.lineWidth = 3; ctx.stroke();
  ctx.fillStyle = '#16252E'; ctx.fillRect(x - 4, y - 38, 8, 6);
  const a = (H.t % 60)/60*Math.PI*2; ctx.strokeStyle = '#E9821C'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(a)*24, y - Math.cos(a)*24); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,.9)'; roundRect(ctx, x - 40, y + 36, 80, 38, 8); ctx.fill();
  ctx.fillStyle = '#16252E'; ctx.font = '600 15px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(fmtN(H.t, 1) + ' s', x, y + 48); ctx.font = '700 11px Nunito, sans-serif'; ctx.fillText(Math.round(B.temp) + ' °C', x, y + 64);
}

// ---------- wiring (runs after the whole script has loaded) ----------
function labToolsInit(){
  const bar = document.getElementById('labTools'), panel = document.getElementById('toolPanel'), area = document.getElementById('resultArea');
  if(!bar || !panel) return;
  bar.addEventListener('click', e => { const b = e.target.closest('button[data-tool]'); if(!b) return; const k = b.dataset.tool;
    if(k === 'burette'){ if(LT.tit) endTitration(); else { startTitration(); emit('tool:burette'); } }
    else if(k === 'electrodes') toggleElectrodes();
    else if(k === 'cell'){ if(LT.panel === 'cell'){ LT.panel = null; } else { if(LT.tit) endTitration(); LT.panel = 'cell'; emit('tool:cell'); } renderLabTools(); }
    else if(k === 'straw') breathe();
  });
  panel.addEventListener('click', e => {
    const c = e.target.closest('[data-tp="close"]'); if(c){ if(LT.panel === 'burette') endTitration(); else { LT.panel = null; renderLabTools(); } return; }
    const a = e.target.closest('[data-titacid]'); if(a){ LT.titAcid = a.dataset.titacid; startTitration(); return; }
    const i = e.target.closest('[data-titind]'); if(i){ LT.titInd = i.dataset.titind; startTitration(); return; }
    const tb = e.target.closest('[data-tit]'); if(tb){ const v = tb.dataset.tit;
      if(v === 'reset') startTitration(); else if(v === 'drip'){ if(e.detail === 0) titAdd(.1); } else titAdd(+v); return; }
    const m = e.target.closest('[data-cellm]'); if(m){ const [side, metal] = m.dataset.cellm.split(':'); LT.cell[side] = metal; renderPanel(); emit('cellpick:' + metal); cellCheck(); return; }
    const cn = e.target.closest('[data-cell="conn"]'); if(cn){ LT.cell.conn = !LT.cell.conn; renderPanel(); cellCheck(); }
  });
  panel.addEventListener('pointerdown', e => { const b = e.target.closest('[data-tit="drip"]'); if(b && LT.tit){ e.preventDefault(); LT.tit.drip = true; LT.tit.dripAcc = .05; } });
  const stop = () => { if(LT.tit) LT.tit.drip = false; };
  window.addEventListener('pointerup', stop); window.addEventListener('pointercancel', stop);
  panel.addEventListener('pointerleave', stop);
  panel.addEventListener('contextmenu', e => { if(e.target.closest('[data-tit="drip"]')) e.preventDefault(); });
  if(area) area.addEventListener('click', e => {
    const g = e.target.closest('[data-gastest]'); if(g){ showGasTest(g.dataset.gastest); return; }
    const l = e.target.closest('[data-lablesson]'); if(l && typeof openLessonFromLab === 'function') openLessonFromLab(l.dataset.lablesson);
  });
  const rer = () => setTimeout(() => { renderLabTools(); }, 0);
  ['langSeg','levelSeg'].forEach(id => { const el = document.getElementById(id); if(el) el.addEventListener('click', rer); });
  window.addEventListener('resize', () => { if(LT.tit) drawTitCurve(); });
  renderLabTools();
}
setTimeout(labToolsInit, 0);

// ===================== board visuals for the full curriculum =====================
Object.assign(EL, {F:{c:'#8fd34a', r:.44, txt:'#23323a'}, B:{c:'#f0a8a8', r:.5, txt:'#23323a'}, Br:{c:'#a62929', r:.6, txt:'#fff'}, Zn:{c:'#7d80b0', r:.55, txt:'#fff'}, P:{c:'#ff9d3a', r:.52, txt:'#23323a'}, X:{c:'#9aa6ab', r:.5, txt:'#fff'}});
const LR = (en, ro) => LANG === 'ro' ? ro : en;
const INK = '#16252E', MUTED = '#56666D', ACC = '#1A74B3', FL = '#E9821C', GOOD = '#23945A', BAD = '#C93A33';
function txt(ctx, s, x, y, size, opt){ opt = opt || {}; ctx.font = (opt.w || 700) + ' ' + size + 'px ' + (opt.mono ? '"IBM Plex Mono", monospace' : opt.disp ? 'Fredoka, Nunito, sans-serif' : 'Nunito, sans-serif'); ctx.fillStyle = opt.color || INK; ctx.textAlign = opt.align || 'center'; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y); }
function curly(ctx, x1, y1, x2, y2, bend, col){ const mx = (x1 + x2)/2 + bend[0], my = (y1 + y2)/2 + bend[1]; ctx.strokeStyle = col || BAD; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(mx, my, x2, y2); ctx.stroke(); const a = Math.atan2(y2 - my, x2 - mx); ctx.fillStyle = col || BAD; ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - Math.cos(a - .45)*11, y2 - Math.sin(a - .45)*11); ctx.lineTo(x2 - Math.cos(a + .45)*11, y2 - Math.sin(a + .45)*11); ctx.closePath(); ctx.fill(); }
function flask(ctx, x, y, w, h, liq, lvl){ ctx.save(); ctx.beginPath(); ctx.moveTo(x - w*.12, y - h); ctx.lineTo(x - w*.12, y - h*.62); ctx.lineTo(x - w/2, y - 6); ctx.quadraticCurveTo(x - w/2, y, x - w/2 + 8, y); ctx.lineTo(x + w/2 - 8, y); ctx.quadraticCurveTo(x + w/2, y, x + w/2, y - 6); ctx.lineTo(x + w*.12, y - h*.62); ctx.lineTo(x + w*.12, y - h); ctx.closePath(); ctx.fillStyle = 'rgba(225,240,246,.6)'; ctx.fill(); ctx.clip(); if(liq){ ctx.fillStyle = liq; ctx.fillRect(x - w, y - h*(lvl || .35), w*2, h); } ctx.restore(); ctx.strokeStyle = '#7f9aa6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - w*.12, y - h); ctx.lineTo(x - w*.12, y - h*.62); ctx.lineTo(x - w/2, y - 6); ctx.quadraticCurveTo(x - w/2, y, x - w/2 + 8, y); ctx.lineTo(x + w/2 - 8, y); ctx.quadraticCurveTo(x + w/2, y, x + w/2, y - 6); ctx.lineTo(x + w*.12, y - h*.62); ctx.lineTo(x + w*.12, y - h); ctx.stroke(); }
function beakerV(ctx, x, y, w, h, liq, lvl){ ctx.fillStyle = 'rgba(225,240,246,.55)'; ctx.fillRect(x - w/2, y - h, w, h); if(liq){ ctx.fillStyle = liq; ctx.fillRect(x - w/2 + 2, y - h*(lvl || .6), w - 4, h*(lvl || .6) - 2); } ctx.strokeStyle = '#7f9aa6'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - w/2, y - h); ctx.lineTo(x - w/2, y); ctx.lineTo(x + w/2, y); ctx.lineTo(x + w/2, y - h); ctx.stroke(); }
function tube(ctx, x, y, w, h, liq, lvl){ ctx.fillStyle = 'rgba(225,240,246,.6)'; roundRect(ctx, x - w/2, y - h, w, h, w/2); ctx.fill(); if(liq){ ctx.save(); roundRect(ctx, x - w/2, y - h, w, h, w/2); ctx.clip(); ctx.fillStyle = liq; ctx.fillRect(x - w/2, y - h*(lvl || .5), w, h); ctx.restore(); } ctx.strokeStyle = '#7f9aa6'; ctx.lineWidth = 2; roundRect(ctx, x - w/2, y - h, w, h, w/2); ctx.stroke(); }
function axes(ctx, x0, y0, x1, y1, xl, yl){ ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y1); ctx.lineTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke(); txt(ctx, xl, (x0 + x1)/2, y0 + 24, 14); ctx.save(); ctx.translate(x0 - 26, (y0 + y1)/2); ctx.rotate(-Math.PI/2); txt(ctx, yl, 0, 0, 14); ctx.restore(); }
function bubbleUp(ctx, x, y, t, n, spread, col, h){ for(let i = 0; i < n; i++){ const k = (t*.8 + i/n) % 1; ctx.strokeStyle = col || 'rgba(255,255,255,.95)'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(x + Math.sin(i*2.3 + t*3)*spread, y - k*(h || 120), 3 + (i % 3), 0, 7); ctx.stroke(); } }
function hexPath(ctx, cx, cy, r, rot){ ctx.beginPath(); for(let i = 0; i < 6; i++){ const a = rot + i*Math.PI/3; const x = cx + Math.cos(a)*r, y = cy + Math.sin(a)*r; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.closePath(); }

Object.assign(VIS, {
  lab(ctx, v, t){
    if(v.show === 'hazards'){
      const hz = [['flam', LR('Flammable','Inflamabil')], ['corr', LR('Corrosive','Coroziv')], ['tox', LR('Toxic','Toxic')], ['harm', LR('Harmful','Nociv')], ['oxid', LR('Oxidising','Oxidant')], ['env', LR('Harms nature','Periculos pentru mediu')]];
      hz.forEach(([k, name], i) => { const x = 160 + (i % 3)*240, y = 130 + Math.floor(i/3)*190;
        ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI/4); ctx.fillStyle = '#fff'; ctx.fillRect(-55, -55, 110, 110); ctx.strokeStyle = '#d12a2a'; ctx.lineWidth = 9; ctx.strokeRect(-55, -55, 110, 110); ctx.restore();
        ctx.fillStyle = INK; ctx.strokeStyle = INK; ctx.lineWidth = 4;
        if(k === 'flam' || k === 'oxid'){ if(k === 'oxid'){ ctx.beginPath(); ctx.arc(x, y + 18, 16, 0, 7); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(x - 16, y + (k === 'oxid' ? 0 : 26)); ctx.quadraticCurveTo(x - 22, y - 10, x, y - 34); ctx.quadraticCurveTo(x + 4, y - 12, x + 16, y - 16); ctx.quadraticCurveTo(x + 20, y + 10, x + 16, y + (k === 'oxid' ? 0 : 26)); ctx.closePath(); ctx.fill(); }
        if(k === 'corr'){ ctx.fillRect(x - 32, y + 12, 26, 8); ctx.fillRect(x + 6, y + 12, 26, 8); ctx.beginPath(); ctx.moveTo(x - 24, y - 30); ctx.lineTo(x - 14, y - 30); ctx.lineTo(x - 18, y + 6); ctx.fill(); ctx.beginPath(); ctx.moveTo(x + 14, y - 30); ctx.lineTo(x + 24, y - 30); ctx.lineTo(x + 20, y + 6); ctx.fill(); }
        if(k === 'tox'){ ctx.beginPath(); ctx.arc(x, y - 12, 20, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x - 7, y - 14, 5, 0, 7); ctx.arc(x + 7, y - 14, 5, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x - 26, y + 14); ctx.lineTo(x + 26, y + 34); ctx.moveTo(x + 26, y + 14); ctx.lineTo(x - 26, y + 34); ctx.stroke(); }
        if(k === 'harm'){ ctx.fillRect(x - 5, y - 32, 10, 42); ctx.beginPath(); ctx.arc(x, y + 24, 6, 0, 7); ctx.fill(); }
        if(k === 'env'){ ctx.fillRect(x - 20, y - 4, 4, 30); ctx.beginPath(); ctx.moveTo(x - 36, y + 4); ctx.lineTo(x - 18, y - 30); ctx.lineTo(x, y + 4); ctx.fill(); ctx.beginPath(); ctx.ellipse(x + 18, y + 20, 14, 7, 0, 0, 7); ctx.fill(); }
        txt(ctx, name, x, y + 95, 15, {w:800}); });
      return;
    }
    const items = [[LR('Beaker','Pahar Berzelius'), 'beaker'], [LR('Conical flask','Flacon Erlenmeyer'), 'flask'], [LR('Test tube','Eprubetă'), 'tube'], [LR('Measuring cylinder','Cilindru gradat'), 'cyl'], [LR('Bunsen burner','Bec de gaz'), 'bunsen'], [LR('Pipette','Pipetă'), 'pip'], [LR('Safety goggles','Ochelari de protecție'), 'gog'], [LR('Tongs','Clește'), 'tongs']];
    items.forEach(([name, k], i) => { const x = 110 + (i % 4)*195, y = 190 + Math.floor(i/4)*200; const bob = Math.sin(t*1.5 + i)*2;
      if(k === 'beaker') beakerV(ctx, x, y + bob, 80, 100, 'rgba(90,160,230,.55)', .5);
      if(k === 'flask') flask(ctx, x, y + bob, 90, 120, 'rgba(230,110,150,.6)', .3);
      if(k === 'tube') tube(ctx, x, y + bob, 26, 120, 'rgba(80,190,120,.6)', .4);
      if(k === 'cyl'){ ctx.fillStyle = 'rgba(225,240,246,.6)'; ctx.fillRect(x - 16, y - 130 + bob, 32, 124); ctx.fillStyle = 'rgba(90,160,230,.5)'; ctx.fillRect(x - 15, y - 70 + bob, 30, 64); ctx.strokeStyle = '#7f9aa6'; ctx.lineWidth = 2; ctx.strokeRect(x - 16, y - 130 + bob, 32, 124); ctx.fillRect(x - 30, y - 6 + bob, 60, 6); for(let g = 0; g < 8; g++){ ctx.beginPath(); ctx.moveTo(x - 16, y - 20 - g*14 + bob); ctx.lineTo(x - 6, y - 20 - g*14 + bob); ctx.stroke(); } }
      if(k === 'bunsen'){ ctx.fillStyle = '#6c757b'; ctx.fillRect(x - 10, y - 90, 20, 84); ctx.fillStyle = '#3a4248'; ctx.beginPath(); ctx.ellipse(x, y - 4, 36, 8, 0, 0, 7); ctx.fill(); const fl = 1 + .1*Math.sin(t*20); ctx.fillStyle = 'rgba(80,130,255,.7)'; ctx.beginPath(); ctx.moveTo(x - 9, y - 90); ctx.quadraticCurveTo(x - 10, y - 115, x, y - 140*fl); ctx.quadraticCurveTo(x + 10, y - 115, x + 9, y - 90); ctx.fill(); }
      if(k === 'pip'){ ctx.strokeStyle = '#7f9aa6'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, y - 140 + bob); ctx.lineTo(x, y - 10 + bob); ctx.stroke(); ctx.fillStyle = 'rgba(225,240,246,.9)'; ctx.beginPath(); ctx.ellipse(x, y - 80 + bob, 11, 22, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#E9821C'; ctx.beginPath(); ctx.arc(x, y - 146 + bob, 10, 0, 7); ctx.fill(); }
      if(k === 'gog'){ ctx.fillStyle = 'rgba(159,211,242,.8)'; ctx.strokeStyle = INK; ctx.lineWidth = 4; roundRect(ctx, x - 60, y - 80, 120, 44, 20); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y - 80); ctx.lineTo(x, y - 36); ctx.stroke(); ctx.strokeStyle = '#1A74B3'; ctx.beginPath(); ctx.moveTo(x - 60, y - 58); ctx.lineTo(x - 80, y - 60); ctx.moveTo(x + 60, y - 58); ctx.lineTo(x + 80, y - 60); ctx.stroke(); }
      if(k === 'tongs'){ ctx.strokeStyle = '#8f989e'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x - 30, y - 140); ctx.lineTo(x - 4, y - 20); ctx.moveTo(x + 30, y - 140); ctx.lineTo(x + 4, y - 20); ctx.stroke(); }
      txt(ctx, name, x, y + 22, 14, {w:800}); });
  },
  separate(ctx, v, t, ts){
    const m = v.method;
    if(m === 'filter'){ ctx.fillStyle = 'rgba(225,240,246,.7)'; ctx.beginPath(); ctx.moveTo(300, 90); ctx.lineTo(500, 90); ctx.lineTo(410, 210); ctx.lineTo(410, 260); ctx.lineTo(390, 260); ctx.lineTo(390, 210); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#7f9aa6'; ctx.lineWidth = 2.5; ctx.stroke();
      ctx.fillStyle = '#fbfaf2'; ctx.beginPath(); ctx.moveTo(315, 96); ctx.lineTo(485, 96); ctx.lineTo(400, 205); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#c8a46a'; ctx.beginPath(); ctx.moveTo(360, 160); ctx.lineTo(440, 160); ctx.lineTo(400, 205); ctx.fill();
      beakerV(ctx, 400, 410, 150, 120, 'rgba(120,180,230,.5)', .15 + .35*tri(ts*.08)); for(let i = 0; i < 3; i++){ const k = (t*.9 + i/3) % 1; ctx.fillStyle = 'rgba(90,160,230,.8)'; ctx.beginPath(); ctx.arc(400, 265 + k*110, 4, 0, 7); ctx.fill(); }
      txt(ctx, LR('residue (sand)','reziduu (nisip)'), 580, 175, 15, {color:'#8A4508'}); arrowLine(ctx, 520, 178, 440, 185, FL); txt(ctx, LR('filtrate','filtrat'), 580, 360, 15, {color:ACC}); arrowLine(ctx, 540, 362, 478, 372, ACC); return; }
    if(m === 'distil'){ flask(ctx, 170, 330, 120, 150, 'rgba(120,180,230,.55)', .35); drawFlames(ctx, 170, 395, 30, 50, '#5a8cff', t, .9);
      ctx.strokeStyle = '#7f9aa6'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(170, 180); ctx.lineTo(170, 150); ctx.lineTo(560, 260); ctx.stroke(); ctx.lineWidth = 26; ctx.strokeStyle = 'rgba(120,190,240,.35)'; ctx.beginPath(); ctx.moveTo(280, 181); ctx.lineTo(480, 238); ctx.stroke();
      for(let i = 0; i < 5; i++){ const k = (t*.4 + i/5) % 1; const x = 170 + k*390, y = 150 + k*110; ctx.fillStyle = 'rgba(255,255,255,' + (1 - k) + ')'; ctx.beginPath(); ctx.arc(x, y, 7, 0, 7); ctx.fill(); }
      beakerV(ctx, 600, 400, 100, 110, 'rgba(120,180,230,.45)', .1 + .3*tri(ts*.07)); const k = (t*1.2) % 1; ctx.fillStyle = 'rgba(90,160,230,.8)'; ctx.beginPath(); ctx.arc(565, 265 + k*60, 4, 0, 7); ctx.fill();
      txt(ctx, LR('condenser (cold water)','refrigerent (apă rece)'), 400, 150, 15, {color:ACC}); txt(ctx, LR('pure water','apă pură'), 600, 425, 15); txt(ctx, LR('salt water','apă sărată'), 170, 425, 15); return; }
    if(m === 'chrom'){ ctx.fillStyle = '#fbfaf2'; ctx.fillRect(330, 60, 140, 330); ctx.strokeStyle = '#cfc9ba'; ctx.strokeRect(330, 60, 140, 330);
      const front = 360 - 280*clamp01(ts/8); ctx.fillStyle = 'rgba(120,180,230,.25)'; ctx.fillRect(330, front, 140, 390 - front); ctx.strokeStyle = ACC; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.moveTo(320, front); ctx.lineTo(480, front); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = MUTED; ctx.beginPath(); ctx.moveTo(335, 360); ctx.lineTo(465, 360); ctx.stroke();
      const cols = [['#e23a6e', .8], ['#2f6fe0', .55], ['#f2c23a', .3]]; const prog = 360 - front;
      cols.forEach(([c, rf], i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(400, 360 - prog*rf, 12, 8, 0, 0, 7); ctx.fill(); });
      ctx.fillStyle = '#6b3fa0'; ctx.beginPath(); ctx.arc(400, 360, prog < 5 ? 10 : 3, 0, 7); ctx.fill();
      txt(ctx, LR('solvent front','frontul solventului'), 560, front, 15, {color:ACC}); txt(ctx, LR('pencil start line','linia de start (creion)'), 580, 360, 15, {color:MUTED}); txt(ctx, 'Rf = ' + LR('distance moved by spot ÷ distance moved by solvent','distanța petei ÷ distanța solventului'), 400, 425, 14, {w:800}); return; }
    ctx.fillStyle = '#e9ecef'; ctx.beginPath(); ctx.ellipse(400, 250, 150, 40, 0, 0, Math.PI); ctx.fill(); ctx.strokeStyle = '#9aa6ab'; ctx.lineWidth = 3; ctx.stroke();
    const k = clamp01(ts/7); ctx.fillStyle = 'rgba(120,180,230,' + (.6*(1 - k)) + ')'; ctx.beginPath(); ctx.ellipse(400, 256, 140*(1 - k*.3), 26*(1 - k*.5), 0, 0, 7); ctx.fill();
    for(let i = 0; i < Math.floor(k*24); i++){ ctx.save(); ctx.translate(300 + (i*37) % 200, 260 + (i % 3)*6); ctx.rotate(i); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#b9c7ce'; ctx.lineWidth = 1; ctx.fillRect(-6, -6, 12, 12); ctx.strokeRect(-6, -6, 12, 12); ctx.restore(); }
    drawFlames(ctx, 400, 360, 40, 60, '#5a8cff', t, .9); for(let i = 0; i < 6; i++){ const kk = (t*.5 + i/6) % 1; ctx.fillStyle = 'rgba(160,180,195,' + (.5*(1 - kk)*(1 - k)) + ')'; ctx.beginPath(); ctx.arc(330 + i*28, 220 - kk*120, 12 + kk*10, 0, 7); ctx.fill(); }
    txt(ctx, LR('crystals form as the water evaporates','cristalele apar pe măsură ce apa se evaporă'), 400, 420, 16);
  },
  cycle(ctx, v, t){
    if(v.kind === 'water'){ ctx.fillStyle = '#cfe6ff'; ctx.fillRect(0, 330, 800, 120); ctx.fillStyle = '#6a9c5a'; ctx.beginPath(); ctx.moveTo(430, 330); ctx.lineTo(560, 170); ctx.lineTo(650, 250); ctx.lineTo(720, 190); ctx.lineTo(800, 330); ctx.fill();
      ctx.fillStyle = '#f2c23a'; ctx.beginPath(); ctx.arc(90, 80, 36 + Math.sin(t*2)*2, 0, 7); ctx.fill();
      for(const [x, y, s] of [[380, 90, 1], [560, 70, .8]]){ ctx.fillStyle = '#fff'; ctx.strokeStyle = '#c9d6dc'; ctx.lineWidth = 2; for(const [dx, dy, r] of [[0,0,28],[30,-10,34],[62,2,26]]){ ctx.beginPath(); ctx.arc(x + dx*s, y + dy*s, r*s, 0, 7); ctx.fill(); } }
      for(let i = 0; i < 10; i++){ const k = (t*.8 + i/10) % 1; ctx.strokeStyle = ACC; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(560 + (i*13) % 90, 110 + k*120); ctx.lineTo(556 + (i*13) % 90, 122 + k*120); ctx.stroke(); }
      for(let i = 0; i < 5; i++){ const k = (t*.4 + i/5) % 1; ctx.strokeStyle = 'rgba(26,116,179,' + (1 - k) + ')'; ctx.lineWidth = 2; ctx.beginPath(); for(let yy = 0; yy < 30; yy += 3) { const x = 200 + i*40 + Math.sin(yy*.3 + t*4)*4; yy ? ctx.lineTo(x, 320 - k*180 - yy) : ctx.moveTo(x, 320 - k*180); } ctx.stroke(); }
      txt(ctx, LR('evaporation','evaporare'), 260, 250, 15, {color:'#8A4508'}); txt(ctx, LR('condensation','condensare'), 450, 40, 15, {color:MUTED}); txt(ctx, LR('precipitation','precipitații'), 690, 150, 15, {color:ACC}); txt(ctx, LR('collection','colectare'), 470, 380, 15, {color:ACC}); arrowLine(ctx, 700, 300, 540, 345, ACC); return; }
    const P = [[400, 90, LR('Gas','Gaz'), '#6fb6ea'], [200, 340, LR('Solid','Solid'), '#1a74b3'], [600, 340, LR('Liquid','Lichid'), '#2f8fd6']];
    const arrows = [[1, 2, LR('melting','topire'), 0], [2, 1, LR('freezing','solidificare'), 1], [2, 0, LR('evaporating / boiling','vaporizare / fierbere'), 0], [0, 2, LR('condensing','condensare'), 1], [1, 0, LR('sublimation','sublimare'), 0]];
    arrows.forEach(([a, b, name, side]) => { const A = P[a], Bp = P[b]; const off = side ? 16 : -16; const dx = Bp[0] - A[0], dy = Bp[1] - A[1], d = Math.hypot(dx, dy), nx = -dy/d*off, ny = dx/d*off;
      arrowLine(ctx, A[0] + dx/d*72 + nx, A[1] + dy/d*72 + ny, Bp[0] - dx/d*72 + nx, Bp[1] - dy/d*72 + ny, side ? ACC : FL); txt(ctx, name, (A[0] + Bp[0])/2 + nx*3.2, (A[1] + Bp[1])/2 + ny*3.2, 14, {color:side ? ACC : '#8A4508'}); });
    P.forEach(([x, y, name, c], i) => { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x, y, 62, 0, 7); ctx.fill(); ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.stroke();
      for(let j = 0; j < 9; j++){ let px, py; if(i === 1){ px = x - 24 + (j % 3)*24 + Math.sin(t*9 + j)*1.5; py = y - 24 + Math.floor(j/3)*24; } else if(i === 2){ px = x - 30 + tri(t*.05*(1 + j*.1) + j*.3)*60; py = y - 5 + tri(t*.04 + j*.5)*35; } else { px = x - 40 + tri(t*.3*(1 + j*.1) + j*.3)*80; py = y - 40 + tri(t*.27 + j*.6)*80; } ctx.fillStyle = c; ctx.beginPath(); ctx.arc(px, py, 7, 0, 7); ctx.fill(); }
      txt(ctx, name, x, y + 80, 17, {disp:1, w:600}); });
  },
  materials(ctx, v, t){
    const M = [[LR('Metal','Metal'), '#b8c0c7', [LR('strong','rezistent'), LR('conducts','conduce')]], [LR('Glass','Sticlă'), '#bfe3f0', [LR('transparent','transparent'), LR('brittle','casant')]], [LR('Plastic','Plastic'), '#f2a23a', [LR('light','ușor'), LR('waterproof','impermeabil')]], [LR('Wood','Lemn'), '#b98552', [LR('strong','rezistent'), LR('insulates','izolant')]], [LR('Rubber','Cauciuc'), '#3d434a', [LR('flexible','flexibil'), LR('insulates','izolant')]], [LR('Ceramic','Ceramică'), '#e8d9c4', [LR('heat-proof','rezistă la căldură'), LR('hard','dur')]]];
    M.forEach(([name, col, props], i) => { const x = 60 + (i % 3)*240, y = 45 + Math.floor(i/3)*200; box(ctx, x, y, 210, 175, null, false);
      ctx.fillStyle = col; roundRect(ctx, x + 70, y + 20 + Math.sin(t*1.5 + i)*3, 70, 60, i === 4 ? 30 : 8); ctx.fill(); if(i === 1){ ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(x + 80, y + 26, 8, 48); }
      txt(ctx, name, x + 105, y + 102, 18, {disp:1, w:600}); props.forEach((p, j) => { ctx.fillStyle = '#E2EFF8'; roundRect(ctx, x + 15 + j*95, y + 125, 88, 28, 14); ctx.fill(); txt(ctx, p, x + 59 + j*95, y + 139, 12.5, {color:'#0F4F7D'}); }); });
  },
  reacttype(ctx, v, t, ts){
    const k = easeOut(((ts % 6) - 1)/2); const C = {A:'#e2553f', B:'#1a74b3', C:'#23945A', D:'#f2c23a'};
    const blk = (x, y, l) => { ctx.fillStyle = C[l]; roundRect(ctx, x - 26, y - 26, 52, 52, 10); ctx.fill(); txt(ctx, l, x, y + 1, 22, {color:'#fff', disp:1}); };
    const lerpP = (a, b) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
    const kinds = {combine:{from:{A:[200,220], B:[340,220]}, to:{A:[500,220], B:[552,220]}, eq:'A + B → AB', name:LR('Combination (synthesis)','Combinare (sinteză)')},
      decompose:{from:{A:[250,220], B:[302,220]}, to:{A:[470,220], B:[610,220]}, eq:'AB → A + B', name:LR('Decomposition','Descompunere')},
      displace:{from:{A:[170,220], B:[300,220], C:[352,220]}, to:{A:[500,220], C:[552,220], B:[680,220]}, eq:'A + BC → AC + B', name:LR('Displacement (substitution)','Substituție (dezlocuire)')},
      exchange:{from:{A:[160,220], B:[212,220], C:[330,220], D:[382,220]}, to:{A:[470,220], D:[522,220], C:[630,220], B:[682,220]}, eq:'AB + CD → AD + CB', name:LR('Exchange (double displacement)','Schimb (dublă înlocuire)')}};
    const K = kinds[v.kind] || kinds.combine; for(const l in K.from) blk(...lerpP(K.from[l], K.to[l]), l);
    txt(ctx, K.name, 400, 80, 26, {disp:1, w:600}); txt(ctx, K.eq, 400, 340, 30, {mono:1, w:500});
  },
  series(ctx, v, t){
    const S2 = [['K','Potassium','Potasiu'],['Na','Sodium','Sodiu'],['Li','Lithium','Litiu'],['Ca','Calcium','Calciu'],['Mg','Magnesium','Magneziu'],['Al','Aluminium','Aluminiu'],['C','(carbon)','(carbon)'],['Zn','Zinc','Zinc'],['Fe','Iron','Fier'],['Sn','Tin','Staniu'],['Pb','Lead','Plumb'],['H','(hydrogen)','(hidrogen)'],['Cu','Copper','Cupru'],['Ag','Silver','Argint'],['Au','Gold','Aur']];
    const hl = v.hl || [];
    S2.forEach(([s, en, ro], i) => { const col = i < 8 ? 0 : 1; const x = 220 + col*300, y = 50 + (i % 8)*48; const on = hl.indexOf(s) >= 0; const ref = s === 'C' || s === 'H';
      ctx.fillStyle = on ? '#FDEBD6' : ref ? '#f3f6f5' : '#fff'; roundRect(ctx, x - 120, y - 20, 240, 40, 10); ctx.fill(); ctx.strokeStyle = on ? FL : '#cfdcd7'; ctx.lineWidth = on ? 3 : 1.5; ctx.stroke();
      txt(ctx, s, x - 85, y, 20, {disp:1, w:600, color:ref ? MUTED : INK}); txt(ctx, LANG === 'ro' ? ro : en, x + 10, y, 15, {color:ref ? MUTED : INK, align:'left'}); });
    arrowLine(ctx, 60, 400, 60, 60, BAD); ctx.save(); ctx.translate(40, 230); ctx.rotate(-Math.PI/2); txt(ctx, LR('more reactive','mai reactiv'), 0, 0, 15, {color:BAD}); ctx.restore();
  },
  fire(ctx, v, t){
    const P = [[400, 70], [220, 360], [580, 360]]; ctx.strokeStyle = FL; ctx.lineWidth = 8; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.stroke();
    txt(ctx, LR('HEAT','CĂLDURĂ'), 400, 45, 20, {disp:1, color:BAD}); txt(ctx, LR('FUEL','COMBUSTIBIL'), 180, 395, 20, {disp:1, color:'#8A4508'}); txt(ctx, LR('OXYGEN','OXIGEN'), 620, 395, 20, {disp:1, color:ACC});
    for(let i = 0; i < 5; i++){ const off = (i - 2)*16, h = 80 + 30*Math.abs(Math.sin(t*(5 + i) + i)); ctx.fillStyle = i % 2 ? 'rgba(255,190,60,.9)' : 'rgba(240,110,30,.85)'; ctx.beginPath(); ctx.moveTo(400 + off - 16, 300); ctx.quadraticCurveTo(400 + off - 18, 300 - h*.5, 400 + off + Math.sin(t*8 + i)*6, 300 - h); ctx.quadraticCurveTo(400 + off + 18, 300 - h*.5, 400 + off + 16, 300); ctx.fill(); }
    txt(ctx, LR('fuel + oxygen → carbon dioxide + water + energy','combustibil + oxigen → dioxid de carbon + apă + energie'), 400, 430, 15, {w:800});
  },
  air(ctx, v, t){
    if(v.mode === 'greenhouse'){ ctx.fillStyle = '#2f6fbf'; ctx.beginPath(); ctx.arc(400, 760, 460, Math.PI*1.15, Math.PI*1.85); ctx.lineTo(400, 760); ctx.fill(); ctx.fillStyle = '#5aa05a'; ctx.beginPath(); ctx.arc(400, 760, 452, Math.PI*1.25, Math.PI*1.45); ctx.lineTo(400, 760); ctx.fill();
      ctx.fillStyle = 'rgba(160,160,160,.22)'; ctx.beginPath(); ctx.arc(400, 760, 590, Math.PI*1.1, Math.PI*1.9); ctx.arc(400, 760, 540, Math.PI*1.9, Math.PI*1.1, true); ctx.fill(); txt(ctx, LR('greenhouse gases (CO₂, CH₄, H₂O)','gaze cu efect de seră (CO₂, CH₄, H₂O)'), 400, 200, 15, {color:MUTED});
      ctx.fillStyle = '#f2c23a'; ctx.beginPath(); ctx.arc(80, 70, 40, 0, 7); ctx.fill();
      const k = (t*.25) % 1; arrowLine(ctx, 120, 100, 120 + 220*Math.min(1, k*2), 100 + 180*Math.min(1, k*2), '#e0a800'); if(k > .5){ const k2 = (k - .5)*2; arrowLine(ctx, 340, 280, 340 + 80*k2, 280 - 60*k2, BAD); arrowLine(ctx, 420, 230, 420 + 80*k2, 230 + 20*k2, BAD); }
      txt(ctx, LR('sunlight in','lumina soarelui intră'), 250, 120, 14, {color:'#8A4508'}); txt(ctx, LR('heat (infrared) trapped','căldura (infraroșu) rămâne prinsă'), 590, 250, 14, {color:BAD}); return; }
    const parts = [[.78, '#1a74b3', 'N₂ 78%'], [.21, '#E9821C', 'O₂ 21%'], [.0093, '#9aa6ab', 'Ar 0.9%'], [.0007, BAD, 'CO₂ 0.04%']]; let a0 = -Math.PI/2 + t*.05;
    parts.forEach(([f, c, name], i) => { const a1 = a0 + f*Math.PI*2; ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(300, 230); ctx.arc(300, 230, 150, a0, a1 + .003); ctx.closePath(); ctx.fill(); a0 = a1; ctx.fillStyle = c; ctx.fillRect(520, 140 + i*50, 22, 22); txt(ctx, name, 552, 151 + i*50, 18, {align:'left', w:800}); });
    txt(ctx, LR('What is air made of?','Din ce e făcut aerul?'), 400, 420, 18, {disp:1, w:600});
  },
  config(ctx, v, t){
    const z = v.z || 11; const order = [['1s',1],['2s',1],['2p',3],['3s',1],['3p',3],['4s',1],['3d',5],['4p',3]];
    const fillN = {}; let left = z; for(const [o, n] of order){ const cap = n*2; let k = Math.min(cap, left); fillN[o] = k; left -= k; }
    if(z === 24){ fillN['4s'] = 1; fillN['3d'] = 5; } if(z === 29){ fillN['4s'] = 1; fillN['3d'] = 10; }
    const pos = {'1s':[140, 390], '2s':[140, 320], '2p':[250, 305], '3s':[140, 240], '3p':[250, 225], '4s':[140, 165], '3d':[420, 140], '4p':[250, 90]};
    const E = z <= 20 ? ELEMENTS[z - 1] : null; const names = {21:'Sc',22:'Ti',23:'V',24:'Cr',25:'Mn',26:'Fe',27:'Co',28:'Ni',29:'Cu',30:'Zn'};
    txt(ctx, (E ? E[1] : names[z] || '') + '  (Z = ' + z + ')', 620, 60, 26, {disp:1, w:600});
    axes(ctx, 90, 420, 90, 40, '', LR('energy','energie'));
    let shown = 0; const reveal = Math.floor(t*3) % (z + 8);
    for(const [o, n] of order){ const p = pos[o]; if(!p) continue; const e = fillN[o] || 0; if(!e && ['4p','3d'].includes(o) && z < 19) continue;
      txt(ctx, o, p[0] - 28, p[1] + 16, 15, {mono:1, w:500});
      for(let b = 0; b < n; b++){ const x = p[0] + b*40, y = p[1]; ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.strokeRect(x, y, 36, 32);
        const inBox = (b < e ? 1 : 0) + (e > n + b ? 1 : 0);
        for(let s2 = 0; s2 < inBox; s2++){ shown++; if(shown > reveal) continue; ctx.fillStyle = s2 === 0 ? ACC : BAD; const ax = x + 12 + s2*12; ctx.beginPath(); if(s2 === 0){ ctx.moveTo(ax, y + 6); ctx.lineTo(ax - 5, y + 14); ctx.lineTo(ax + 5, y + 14); } else { ctx.moveTo(ax, y + 26); ctx.lineTo(ax - 5, y + 18); ctx.lineTo(ax + 5, y + 18); } ctx.fill(); ctx.fillRect(ax - 1.2, s2 === 0 ? y + 12 : y + 8, 2.4, 14); } } }
    const sup = s => String(s).split('').map(d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+d]).join('');
    const cfg = order.filter(([o]) => fillN[o]).map(([o]) => o + sup(fillN[o])).join(' ');
    txt(ctx, cfg, 620, 400, 18, {mono:1, w:500});
  },
  orbitals(ctx, v, t){
    const s = (x, y, r) => { const g = ctx.createRadialGradient(x - r*.3, y - r*.3, 4, x, y, r); g.addColorStop(0, 'rgba(120,180,240,.9)'); g.addColorStop(1, 'rgba(26,116,179,.25)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); };
    const p = (x, y, ang, col) => { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); for(const sg of [-1, 1]){ const g = ctx.createRadialGradient(sg*40, 0, 4, sg*40, 0, 50); g.addColorStop(0, col); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(sg*42, 0, 44, 24, 0, 0, 7); ctx.fill(); } ctx.restore(); };
    if(v.show !== 'p'){ const x = v.show === 's' ? 400 : 200; s(x, 220, 90); txt(ctx, LR('s orbital: a sphere (2 electrons)','orbital s: o sferă (2 electroni)'), x, 360, 16); }
    if(v.show !== 's'){ const x = v.show === 'p' ? 400 : 560; p(x, 220, 0, 'rgba(226,85,63,.8)'); p(x, 220, Math.PI/2, 'rgba(35,148,90,.75)'); p(x, 220, Math.PI/4 + Math.sin(t)*.1, 'rgba(233,130,28,.6)'); txt(ctx, LR('3 p orbitals: dumbbells (6 electrons)','3 orbitali p: haltere (6 electroni)'), x, 360, 16); }
    txt(ctx, LR('An orbital holds at most 2 electrons with opposite spins','Un orbital are cel mult 2 electroni cu spin opus'), 400, 420, 15, {color:MUTED});
  },
  structures(ctx, v, t){
    const T2 = [LR('Giant ionic','Rețea ionică'), LR('Simple molecular','Molecular simplu'), LR('Giant covalent','Covalent gigant'), LR('Metallic','Metalic')];
    T2.forEach((name, i) => { const x = 22 + i*195, y = 70, w = 175, h = 300; box(ctx, x, y, w, h, name, v.focus === i); ctx.save(); roundRect(ctx, x, y, w, h, 14); ctx.clip();
      if(i === 0) for(let r = 0; r < 6; r++) for(let c = 0; c < 4; c++) drawAtom(ctx, x + 30 + c*38, y + 40 + r*42, (r + c) % 2 ? 'Cl' : 'Na', (r + c) % 2 ? 30 : 24, null, 1, false);
      if(i === 1) for(let m = 0; m < 6; m++) molAt(ctx, 'H2O', x + 30 + (m % 2)*90 + tri(t*.05 + m*.3)*30, y + 40 + Math.floor(m/2)*90 + tri(t*.04 + m*.5)*30, 16, t*.4 + m);
      if(i === 2){ ctx.strokeStyle = '#555c63'; ctx.lineWidth = 2; for(let r = 0; r < 6; r++) for(let c = 0; c < 3; c++){ const cx = x + 35 + c*52 + (r % 2)*26, cy = y + 40 + r*45; hexPath(ctx, cx, cy, 26, Math.PI/6); ctx.stroke(); } for(let r = 0; r < 7; r++) for(let c = 0; c < 4; c++){ ctx.fillStyle = '#3d434a'; ctx.beginPath(); ctx.arc(x + 22 + c*45, y + 30 + r*42, 5, 0, 7); ctx.fill(); } }
      if(i === 3){ for(let r = 0; r < 5; r++) for(let c = 0; c < 4; c++){ const cx = x + 28 + c*40, cy = y + 40 + r*52; ctx.fillStyle = '#c8cdd3'; ctx.beginPath(); ctx.arc(cx, cy, 16, 0, 7); ctx.fill(); txt(ctx, '+', cx, cy, 16, {color:MUTED}); } for(let e = 0; e < 26; e++){ ctx.fillStyle = ACC; ctx.beginPath(); ctx.arc(x + 10 + tri(t*.12*(1 + e%4*.2) + e*.37)*(w - 20), y + 10 + tri(t*.1 + e*.61)*(h - 20), 4, 0, 7); ctx.fill(); } }
      ctx.restore(); });
    const ex = [LR('NaCl · high melting point','NaCl · punct de topire ridicat'), LR('H₂O · low boiling point','H₂O · punct de fierbere scăzut'), LR('diamond · very hard','diamant · foarte dur'), LR('copper · conducts','cupru · conduce')];
    ex.forEach((e, i) => txt(ctx, e, 22 + i*195 + 87, 400, 12.5, {w:800, color:MUTED}));
  },
  vsepr(ctx, v, t){
    const D = {linear:{c:'C', a:[['O',-1,0],['O',1,0]], ang:'180°', f:'CO₂', lp:0}, trigonal:{c:'B', a:[['F',0,-1],['F',-.87,.5],['F',.87,.5]], ang:'120°', f:'BF₃', lp:0},
      tetrahedral:{c:'C', a:[['H',0,-1],['H',-.94,.33],['H',.94,.33],['H',0,.55]], ang:'109.5°', f:'CH₄', lp:0}, pyramidal:{c:'N', a:[['H',-.9,.45],['H',.9,.45],['H',0,.8]], ang:'107°', f:'NH₃', lp:1},
      bent:{c:'O', a:[['H',-.8,.6],['H',.8,.6]], ang:'104.5°', f:'H₂O', lp:2}, octahedral:{c:'S', a:[['F',0,-1],['F',0,1],['F',-1,0],['F',1,0],['F',-.5,-.35],['F',.5,.35]], ang:'90°', f:'SF₆', lp:0}};
    const names = {linear:LR('linear','liniară'), trigonal:LR('trigonal planar','trigonal plană'), tetrahedral:LR('tetrahedral','tetraedrică'), pyramidal:LR('pyramidal','piramidală'), bent:LR('bent','unghiulară'), octahedral:LR('octahedral','octaedrică')};
    const sh = (v.shapes || ['linear','trigonal','tetrahedral','bent']).slice(0, 4); const n = sh.length;
    sh.forEach((k, i) => { const d = D[k]; if(!d) return; const cx = 400 + (i - (n - 1)/2)*(n > 3 ? 190 : 240), cy = 200, s = 62; const rot = Math.sin(t*.8 + i)*.12;
      for(let l = 0; l < d.lp; l++){ const a = -Math.PI/2 + (l - (d.lp - 1)/2)*.9 + rot; ctx.fillStyle = 'rgba(233,130,28,.3)'; ctx.beginPath(); ctx.ellipse(cx + Math.cos(a)*44, cy + Math.sin(a)*44, 22, 12, a, 0, 7); ctx.fill(); ctx.fillStyle = FL; ctx.beginPath(); ctx.arc(cx + Math.cos(a)*44 - 5, cy + Math.sin(a)*44, 3, 0, 7); ctx.arc(cx + Math.cos(a)*44 + 5, cy + Math.sin(a)*44, 3, 0, 7); ctx.fill(); }
      const pts = d.a.map(([el, x, y]) => [el, cx + (x*Math.cos(rot) - y*Math.sin(rot))*s*1.2, cy + (x*Math.sin(rot) + y*Math.cos(rot))*s*1.2]);
      pts.forEach(p => drawBond(ctx, cx, cy, p[1], p[2], k === 'linear' ? 2 : 1, 40, '#7b8a91', 1)); drawAtom(ctx, cx, cy, d.c, 50, null, 1); pts.forEach(p => drawAtom(ctx, p[1], p[2], p[0], 44, null, 1));
      txt(ctx, names[k], cx, 330, 17, {disp:1, w:600}); txt(ctx, d.f + ' · ' + d.ang, cx, 358, 16, {mono:1, w:500}); if(d.lp) txt(ctx, d.lp + ' ' + LR(d.lp > 1 ? 'lone pairs' : 'lone pair', d.lp > 1 ? 'perechi neparticipante' : 'pereche neparticipantă'), cx, 384, 13, {color:'#8A4508'}); });
  },
  calc(ctx, v, t, ts){
    const lines = v.lines || []; const shown = Math.min(lines.length, 1 + Math.floor(ts/1.4));
    const y0 = 225 - (lines.length - 1)*33;
    lines.forEach((l, i) => { if(i >= shown) return; const s = typeof l === 'string' ? l : tr(l); const y = y0 + i*66; const last = i === lines.length - 1 && shown === lines.length;
      if(last){ ctx.fillStyle = '#FDEBD6'; ctx.font = '500 30px "IBM Plex Mono", monospace'; const w = ctx.measureText(s).width; roundRect(ctx, 400 - w/2 - 20, y - 28, w + 40, 56, 12); ctx.fill(); }
      txt(ctx, s, 400, y, 30, {mono:1, w:500, color:last ? '#8A4508' : INK}); });
  },
  titration(ctx, v, t, ts){
    const weak = v.type2 === 'weak'; const prog = clamp01((ts % 12)/10); const vol = prog*50;
    const pHat = x => { if(!weak){ if(x < 24.9) return Math.max(1, -Math.log10((2.5 - .1*x)/(25 + x)*1)*1) ; if(x <= 25.1) return 7; return 14 + Math.log10((.1*x - 2.5)/(25 + x)); } if(x < .01) return 2.9; if(x < 24.9) return 4.76 + Math.log10(x/(25 - x)); if(x <= 25.1) return 8.7; return 14 + Math.log10((.1*x - 2.5)/(25 + x)); };
    const px = x => 390 + x/50*370, py = p => 400 - p/14*340;
    axes(ctx, 390, 400, 770, 50, LR('volume of NaOH added (cm³)','volum de NaOH adăugat (cm³)'), 'pH');
    for(const p of [0, 7, 14]) txt(ctx, String(p), 375, py(p), 13, {color:MUTED}); for(const x of [0, 25, 50]) txt(ctx, String(x), px(x), 414, 13, {color:MUTED});
    ctx.setLineDash([4, 6]); ctx.strokeStyle = '#b9cbc5'; ctx.beginPath(); ctx.moveTo(px(25), 400); ctx.lineTo(px(25), 50); ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = ACC; ctx.lineWidth = 3.5; ctx.beginPath(); for(let x = 0; x <= vol; x += .25){ const p = pHat(x); x ? ctx.lineTo(px(x), py(p)) : ctx.moveTo(px(x), py(p)); } ctx.stroke();
    txt(ctx, LR('equivalence point','punct de echivalență'), px(25) + 70, py(weak ? 8.7 : 7), 13, {color:'#8A4508'});
    if(weak) txt(ctx, LR('buffer region','zonă tampon'), px(12), py(4.3) - 22, 13, {color:GOOD});
    ctx.fillStyle = 'rgba(225,240,246,.8)'; ctx.fillRect(160, 40, 20, 220); ctx.fillStyle = 'rgba(90,160,230,.45)'; ctx.fillRect(161, 40 + prog*200, 18, 220 - prog*200 - 20); ctx.strokeStyle = '#7f9aa6'; ctx.lineWidth = 2; ctx.strokeRect(160, 40, 20, 220); ctx.fillStyle = '#3a4248'; ctx.fillRect(163, 258, 14, 14);
    if(prog < 1){ const k = (t*3) % 1; ctx.fillStyle = 'rgba(90,160,230,.9)'; ctx.beginPath(); ctx.arc(170, 280 + k*60, 4, 0, 7); ctx.fill(); }
    const pink = pHat(vol) > 8.3; flask(ctx, 170, 410, 130, 120, pink ? 'rgba(236,90,160,.75)' : 'rgba(225,235,245,.8)', .35);
    txt(ctx, 'pH ' + pHat(vol).toFixed(1), 170, 430 - 150, 14, {color:MUTED}); txt(ctx, LR('phenolphthalein','fenolftaleină'), 250, 360, 12, {color:'#b0306a', align:'left'});
  },
  gas(ctx, v, t){
    const charles = v.law === 'charles'; const k = .5 + .5*Math.sin(t*.7);
    const top = charles ? 230 - k*110 : 120 + k*150; const x0 = 250, x1 = 470, bot = 400;
    ctx.fillStyle = 'rgba(225,240,246,.6)'; ctx.fillRect(x0, 60, x1 - x0, bot - 60); ctx.strokeStyle = '#7f9aa6'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, 60); ctx.lineTo(x0, bot); ctx.lineTo(x1, bot); ctx.lineTo(x1, 60); ctx.stroke();
    ctx.fillStyle = '#8f989e'; ctx.fillRect(x0 + 3, top - 16, x1 - x0 - 6, 16); ctx.fillRect(355, top - 60, 10, 44);
    const speed = charles ? .2 + .5*k : .45;
    for(let i = 0; i < 18; i++){ const px = x0 + 12 + tri(t*speed*(1 + (i % 4)*.2) + i*.31)*(x1 - x0 - 24), py = top + 10 + tri(t*speed*.9*(1 + (i % 3)*.25) + i*.57)*(bot - top - 20); ctx.fillStyle = ACC; ctx.beginPath(); ctx.arc(px, py, 7, 0, 7); ctx.fill(); }
    if(charles) drawFlames(ctx, 360, 440, 60, 30 + 40*k, '#ff8a2a', t, .9);
    const V = (bot - top)/280; const p = charles ? 1 : 1/V*.5; const T = charles ? 273 + 100*k : 293;
    txt(ctx, 'p = ' + p.toFixed(2) + ' atm', 640, 150, 22, {mono:1, w:500}); txt(ctx, 'V = ' + (V*2).toFixed(2) + ' L', 640, 200, 22, {mono:1, w:500}); txt(ctx, 'T = ' + Math.round(T) + ' K', 640, 250, 22, {mono:1, w:500});
    txt(ctx, charles ? LR('Charles: V ∝ T (constant p)','Charles: V ∝ T (p constant)') : LR('Boyle: p × V = constant (constant T)','Boyle: p × V = constant (T constant)'), 640, 330, 16, {w:800, color:'#8A4508'}); txt(ctx, 'pV = nRT', 640, 380, 26, {mono:1, w:500, color:ACC});
  },
  electrolysis(ctx, v, t){
    const el = v.el || 'water'; const liq = el === 'copper' ? 'rgba(40,130,220,.45)' : 'rgba(207,230,255,.6)';
    beakerV(ctx, 400, 410, 360, 230, liq, .85);
    ctx.fillStyle = '#3a4248'; ctx.fillRect(295, 150, 16, 240); ctx.fillRect(489, 150, 16, 240);
    if(el === 'copper'){ const k = (t*.05) % 1; ctx.fillStyle = '#b8643a'; ctx.fillRect(292, 390 - 180*Math.min(1, .3 + k), 22, 180*Math.min(1, .3 + k)); }
    ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(303, 150); ctx.lineTo(303, 90); ctx.lineTo(370, 90); ctx.moveTo(430, 90); ctx.lineTo(497, 90); ctx.lineTo(497, 150); ctx.stroke();
    ctx.fillStyle = '#f2c23a'; ctx.fillRect(370, 72, 60, 36); txt(ctx, '−   +', 400, 90, 18, {w:800}); txt(ctx, LR('cathode (−)','catod (−)'), 240, 170, 15, {color:ACC}); txt(ctx, LR('anode (+)','anod (+)'), 565, 170, 15, {color:BAD});
    const cat = el === 'copper' ? null : 'rgba(255,255,255,.95)'; const an = el === 'brine' ? 'rgba(170,220,110,.95)' : 'rgba(255,255,255,.95)';
    if(cat) bubbleUp(ctx, 303, 380, t*1.4, 10, 10, cat, 200); bubbleUp(ctx, 497, 380, t*(el === 'water' ? .7 : 1.2), el === 'water' ? 5 : 8, 10, an, 200);
    for(let i = 0; i < 8; i++){ const k = (t*.25 + i/8) % 1; ctx.fillStyle = el === 'copper' ? '#d07a3a' : '#9a5ee0'; ctx.beginPath(); ctx.arc(lerp(440, 320, k), 250 + i*16, 6, 0, 7); ctx.fill(); txt(ctx, '+', lerp(440, 320, k), 250 + i*16, 9, {color:'#fff'}); ctx.fillStyle = el === 'brine' ? '#3fbf5c' : '#e5463f'; ctx.beginPath(); ctx.arc(lerp(360, 480, k), 258 + i*16, 6, 0, 7); ctx.fill(); txt(ctx, '−', lerp(360, 480, k), 258 + i*16, 9, {color:'#fff'}); }
    const prods = {water:['H₂ (2 vol)', 'O₂ (1 vol)'], brine:['H₂', 'Cl₂'], copper:['Cu', 'O₂']}[el];
    txt(ctx, prods[0], 180, 300, 20, {mono:1, w:500, color:ACC}); txt(ctx, prods[1], 620, 300, 20, {mono:1, w:500, color:BAD});
    txt(ctx, {water:LR('2H₂O → 2H₂ + O₂','2H₂O → 2H₂ + O₂'), brine:LR('2NaCl + 2H₂O → H₂ + Cl₂ + 2NaOH','2NaCl + 2H₂O → H₂ + Cl₂ + 2NaOH'), copper:LR('Cu²⁺ + 2e⁻ → Cu (cathode)','Cu²⁺ + 2e⁻ → Cu (catod)')}[el], 400, 438, 16, {mono:1, w:500});
  },
  cell(ctx, v, t){
    beakerV(ctx, 220, 400, 200, 180, 'rgba(230,236,240,.7)', .8); beakerV(ctx, 580, 400, 200, 180, 'rgba(40,130,220,.45)', .8);
    ctx.fillStyle = '#7d80b0'; ctx.fillRect(210, 180, 22, 200); ctx.fillStyle = '#b8643a'; ctx.fillRect(570, 180, 22, 200);
    ctx.strokeStyle = '#f2f2ea'; ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(270, 330); ctx.lineTo(270, 220); ctx.lineTo(530, 220); ctx.lineTo(530, 330); ctx.stroke(); ctx.strokeStyle = '#cfc9ba'; ctx.lineWidth = 2; ctx.stroke(); txt(ctx, LR('salt bridge','punte de sare'), 400, 245, 13, {color:MUTED});
    ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(221, 180); ctx.lineTo(221, 80); ctx.lineTo(350, 80); ctx.moveTo(450, 80); ctx.lineTo(581, 80); ctx.lineTo(581, 180); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(400, 80, 50, 0, 7); ctx.fill(); ctx.stroke(); txt(ctx, '1.10 V', 400, 90, 20, {mono:1, w:500}); ctx.strokeStyle = BAD; ctx.beginPath(); ctx.moveTo(400, 80); ctx.lineTo(430, 50); ctx.stroke();
    for(let i = 0; i < 5; i++){ const k = (t*.3 + i/5) % 1; const d = k*490; let x, y; if(d < 100){ x = 221; y = 180 - d; } else if(d < 229){ x = 221 + (d - 100); y = 80; } else if(d < 360){ x = 450 + (d - 360) + 131; y = 80; x = 350 + (d - 229)*1.77; } else { x = 581; y = 80 + (d - 360); } ctx.fillStyle = ACC; ctx.beginPath(); ctx.arc(Math.min(581, x), y, 6, 0, 7); ctx.fill(); }
    txt(ctx, 'Zn → Zn²⁺ + 2e⁻', 220, 425, 15, {mono:1, w:500}); txt(ctx, 'Cu²⁺ + 2e⁻ → Cu', 580, 425, 15, {mono:1, w:500}); txt(ctx, LR('e⁻ flow','flux de e⁻'), 290, 60, 13, {color:ACC});
  },
  equil(ctx, v, t, ts){
    const T = ts % 14; const shiftAt = 7;
    const A = t2 => { let a = .35 + .65*Math.exp(-t2*.6); if(v.shift && t2 > shiftAt){ a += .45*Math.exp(-(t2 - shiftAt)*.7); } return a; };
    const Bc = t2 => { let b = .65 - .65*Math.exp(-t2*.6); if(v.shift && t2 > shiftAt){ b += .3*(1 - Math.exp(-(t2 - shiftAt)*.7)); } return b; };
    box(ctx, 40, 90, 290, 290, null, false); const a = A(T), b = Bc(T); const nA = Math.round(a*20), nB = Math.round(b*20);
    for(let i = 0; i < nA + nB; i++){ const x = 60 + tri(t*.08*(1 + (i % 4)*.2) + i*.31)*250, y = 110 + tri(t*.07*(1 + (i % 3)*.25) + i*.57)*250; ctx.fillStyle = i < nA ? ACC : FL; ctx.beginPath(); ctx.arc(x, y, 8, 0, 7); ctx.fill(); }
    txt(ctx, 'A ⇌ B', 185, 60, 26, {mono:1, w:500});
    axes(ctx, 400, 380, 770, 70, LR('time','timp'), LR('concentration','concentrație'));
    const px = x => 400 + x/14*370, py = c => 380 - c*280;
    for(const [f, c] of [[A, ACC], [Bc, FL]]){ ctx.strokeStyle = c; ctx.lineWidth = 3.5; ctx.beginPath(); for(let x = 0; x <= T; x += .05){ x ? ctx.lineTo(px(x), py(f(x))) : ctx.moveTo(px(x), py(f(x))); } ctx.stroke(); }
    txt(ctx, '[A]', px(T) + 18, py(A(T)), 14, {color:ACC}); txt(ctx, '[B]', px(T) + 18, py(Bc(T)), 14, {color:FL});
    if(T > 4.5) txt(ctx, LR('equilibrium: rates equal','echilibru: viteze egale'), 590, 90, 14, {color:GOOD});
    if(v.shift && T > shiftAt){ txt(ctx, LR('+ more A added','+ se adaugă A'), px(shiftAt) + 10, 120, 13, {color:BAD, align:'left'}); ctx.setLineDash([4, 5]); ctx.strokeStyle = BAD; ctx.beginPath(); ctx.moveTo(px(shiftAt), 380); ctx.lineTo(px(shiftAt), 110); ctx.stroke(); ctx.setLineDash([]); }
  },
  mb(ctx, v, t){
    axes(ctx, 90, 390, 760, 50, LR('energy of molecules','energia moleculelor'), LR('number of molecules','număr de molecule'));
    const f = (e, T) => { const a = 2/(T*T); return 300*a*e*Math.exp(-e*e/(T*T))*T*1.1; };
    const curve = (T, col, dash) => { ctx.strokeStyle = col; ctx.lineWidth = 3.5; ctx.setLineDash(dash || []); ctx.beginPath(); for(let e = 0; e <= 4; e += .02){ const x = 90 + e/4*670, y = 390 - f(e, T)*.95; e ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.setLineDash([]); };
    const Ea = 2.6, xEa = 90 + Ea/4*670;
    ctx.fillStyle = 'rgba(233,130,28,.25)'; ctx.beginPath(); ctx.moveTo(xEa, 390); for(let e = Ea; e <= 4; e += .02) ctx.lineTo(90 + e/4*670, 390 - f(e, 1)*.95); ctx.lineTo(760, 390); ctx.fill();
    curve(1, ACC); if(v.temp){ curve(1.45, BAD, [8, 6]); txt(ctx, LR('higher T','T mai mare'), 520, 250, 15, {color:BAD}); }
    ctx.strokeStyle = FL; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xEa, 390); ctx.lineTo(xEa, 120); ctx.stroke(); txt(ctx, 'Eₐ', xEa, 105, 20, {w:800, color:'#8A4508'});
    if(v.cat){ const xc = 90 + 1.6/4*670; ctx.strokeStyle = GOOD; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.moveTo(xc, 390); ctx.lineTo(xc, 150); ctx.stroke(); ctx.setLineDash([]); txt(ctx, LR('Eₐ with catalyst','Eₐ cu catalizator'), xc, 135, 14, {color:GOOD}); }
    txt(ctx, LR('shaded: molecules with enough energy to react','zona hașurată: molecule cu destulă energie să reacționeze'), 520, 430, 14, {color:'#8A4508'});
  },
  hess(ctx, v, t){
    const R = [180, 120], P = [620, 120], E = [400, 360];
    const node = (p, s) => { ctx.fillStyle = '#fff'; roundRect(ctx, p[0] - 110, p[1] - 28, 220, 56, 12); ctx.fill(); ctx.strokeStyle = '#cfdcd7'; ctx.lineWidth = 2; ctx.stroke(); txt(ctx, s, p[0], p[1], 17, {mono:1, w:500}); };
    arrowLine(ctx, R[0] + 115, R[1], P[0] - 115, P[1], FL); arrowLine(ctx, R[0] + 40, R[1] + 32, E[0] - 70, E[1] - 30, ACC); arrowLine(ctx, E[0] + 70, E[1] - 30, P[0] - 40, P[1] + 32, ACC);
    node(R, LR('reactants','reactanți')); node(P, LR('products','produși')); node(E, LR('elements','elemente'));
    txt(ctx, 'ΔH_r = ?', 400, 90, 20, {mono:1, w:500, color:'#8A4508'}); txt(ctx, 'ΔH₁', 250, 250, 20, {mono:1, w:500, color:ACC}); txt(ctx, 'ΔH₂', 550, 250, 20, {mono:1, w:500, color:ACC});
    const k = Math.floor(t) % 2; ctx.globalAlpha = .6 + .4*k; txt(ctx, 'ΔH_r = ΔH₁ + ΔH₂', 400, 430, 24, {mono:1, w:500}); ctx.globalAlpha = 1;
    txt(ctx, LR('same start, same end → same total ΔH','același început, același sfârșit → același ΔH total'), 400, 200, 14, {color:MUTED});
  },
  gibbs(ctx, v, t){
    txt(ctx, 'ΔG = ΔH − TΔS', 400, 70, 40, {mono:1, w:500, color:ACC});
    const cells = [['ΔH −', 'ΔS +', LR('always feasible','mereu posibilă'), GOOD], ['ΔH +', 'ΔS −', LR('never feasible','niciodată posibilă'), BAD], ['ΔH −', 'ΔS −', LR('feasible at low T','posibilă la T mică'), FL], ['ΔH +', 'ΔS +', LR('feasible at high T','posibilă la T mare'), FL]];
    cells.forEach(([a, b, res, c], i) => { const x = 110 + (i % 2)*320, y = 130 + Math.floor(i/2)*140; box(ctx, x, y, 270, 115, null, false); txt(ctx, a + '   ' + b, x + 135, y + 38, 22, {mono:1, w:500}); txt(ctx, res, x + 135, y + 80, 18, {color:c, w:800}); });
    txt(ctx, LR('A reaction is feasible when ΔG < 0','O reacție e posibilă când ΔG < 0'), 400, 420, 17, {w:800});
  },
  complex(ctx, v, t){
    const cx = 220, cy = 210, rot = t*.4; const L6 = [[0,-1,0],[0,1,0],[1,0,0],[-1,0,0],[0,0,1],[0,0,-1]];
    const pts = L6.map(([x, y, z]) => { const X = x*Math.cos(rot) + z*Math.sin(rot), Z = -x*Math.sin(rot) + z*Math.cos(rot); return [cx + X*110 + Z*30, cy + y*110 + Z*25, Z]; }).sort((a, b) => a[2] - b[2]);
    pts.filter(p => p[2] < 0).forEach(p => { drawBond(ctx, cx, cy, p[0], p[1], 1, 40, '#7b8a91', .6); molAt(ctx, 'H2O', p[0], p[1], 22, 0); });
    drawAtom(ctx, cx, cy, 'Cu', 60, '2+', 1); pts.filter(p => p[2] >= 0).forEach(p => { drawBond(ctx, cx, cy, p[0], p[1], 1, 40, '#7b8a91', 1); molAt(ctx, 'H2O', p[0], p[1], 24, 0); });
    txt(ctx, '[Cu(H₂O)₆]²⁺', cx, 400, 20, {mono:1, w:500});
    const cols = [['Cu²⁺', '#3a8fd8'], ['[Cu(NH₃)₄]²⁺', '#1b2bb8'], ['[CuCl₄]²⁻', '#b7c83a'], ['Fe³⁺', '#c98a1e'], ['Co²⁺', '#e0709a'], ['Cr³⁺', '#3a8a4a'], ['MnO₄⁻', '#6a1478']];
    cols.forEach(([n, c], i) => { const x = 450 + (i % 4)*85, y = 190 + Math.floor(i/4)*190; tube(ctx, x, y, 30, 130, c, .6); txt(ctx, n, x, y + 22, 12, {mono:1, w:500}); });
  },
  mechanism(ctx, v, t, ts){
    const step = Math.floor((ts % 12)/4);
    if(v.kind === 'radical'){ const S3 = [[LR('Initiation (UV light)','Inițiere (lumină UV)'), 'Cl–Cl  →  Cl•  +  Cl•'], [LR('Propagation','Propagare'), 'Cl• + CH₄ → HCl + •CH₃'], [LR('Termination','Terminare'), '•CH₃ + Cl• → CH₃Cl']];
      S3.forEach(([h, eq], i) => { const y = 110 + i*110; ctx.globalAlpha = i <= step ? 1 : .25; txt(ctx, h, 400, y - 28, 18, {disp:1, w:600, color:i === step ? '#8A4508' : INK}); txt(ctx, eq, 400, y + 10, 26, {mono:1, w:500}); ctx.globalAlpha = 1; });
      if(step === 0){ curly(ctx, 330, 145, 290, 110, [0, -40], BAD); curly(ctx, 350, 145, 400, 110, [0, -40], BAD); } return; }
    if(v.kind === 'addition'){
      drawAtom(ctx, 200, 200, 'C', 50, null, 1); drawAtom(ctx, 290, 200, 'C', 50, null, 1); drawBond(ctx, 200, 200, 290, 200, step === 0 ? 2 : 1, 50, '#7b8a91', 1);
      if(step < 2){ drawAtom(ctx, 450, 130 + (step ? 30 : 0), 'H', 50, step ? null : 'δ+', 1); drawAtom(ctx, 540, 130, 'Br', 50, step ? '−' : 'δ−', 1); if(!step) drawBond(ctx, 450, 130, 540, 130, 1, 50, '#7b8a91', 1); }
      if(step === 0){ curly(ctx, 245, 185, 440, 150, [0, -60], BAD); curly(ctx, 495, 130, 540, 105, [0, -30], BAD); txt(ctx, LR('the C=C electrons attack H','electronii C=C atacă H'), 400, 360, 17); }
      if(step === 1){ drawAtom(ctx, 290, 140, 'H', 40, null, 1); drawBond(ctx, 290, 200, 290, 140, 1, 40, '#7b8a91', 1); txt(ctx, '+', 205, 160, 30, {color:BAD}); curly(ctx, 540, 160, 215, 215, [0, 100], BAD); txt(ctx, LR('carbocation + Br⁻','carbocation + Br⁻'), 400, 360, 17); }
      if(step === 2){ drawAtom(ctx, 290, 140, 'H', 40, null, 1); drawBond(ctx, 290, 200, 290, 140, 1, 40, '#7b8a91', 1); drawAtom(ctx, 200, 270, 'Br', 50, null, 1); drawBond(ctx, 200, 200, 200, 270, 1, 50, '#7b8a91', 1); txt(ctx, LR('bromoalkane formed','s-a format bromoalcanul'), 400, 360, 17); }
      txt(ctx, LR('Electrophilic addition','Adiție electrofilă'), 400, 60, 22, {disp:1, w:600}); return; }
    drawAtom(ctx, 400, 200, 'C', 50, 'δ+', 1); drawAtom(ctx, step < 2 ? 500 : 620, 200, 'Br', 56, step < 2 ? 'δ−' : '−', 1); if(step < 2) drawBond(ctx, 400, 200, 500, 200, 1, 50, '#7b8a91', 1);
    drawAtom(ctx, step < 2 ? 220 : 320, 200, 'O', 50, step < 2 ? '−' : null, 1); drawAtom(ctx, step < 2 ? 180 : 280, 180, 'H', 40, null, 1); if(step === 2) drawBond(ctx, 320, 200, 400, 200, 1, 50, '#7b8a91', 1);
    if(step === 0){ curly(ctx, 240, 190, 380, 185, [0, -50], BAD); curly(ctx, 450, 205, 505, 225, [0, 30], BAD); }
    txt(ctx, LR('Nucleophilic substitution: OH⁻ replaces Br','Substituție nucleofilă: OH⁻ înlocuiește Br'), 400, 360, 18, {w:800}); txt(ctx, 'CH₃Br + OH⁻ → CH₃OH + Br⁻', 400, 410, 20, {mono:1, w:500});
  },
  chiral(ctx, v, t){
    const draw = (cx, m) => { const g = [['H',0,-1.1],['Cl',-1.1*m,.45],['Br',1.1*m,.45],['F',0,1.2]]; g.forEach(([el, x, y]) => { drawBond(ctx, cx, 210, cx + x*70, 210 + y*70, 1, 44, '#7b8a91', 1); }); drawAtom(ctx, cx, 210, 'C', 52, null, 1); g.forEach(([el, x, y]) => drawAtom(ctx, cx + x*70, 210 + y*70, el, 46, null, 1)); };
    draw(230, 1); draw(570, -1); ctx.strokeStyle = MUTED; ctx.setLineDash([8, 8]); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(400, 60); ctx.lineTo(400, 370); ctx.stroke(); ctx.setLineDash([]);
    txt(ctx, LR('mirror','oglindă'), 400, 45, 15, {color:MUTED}); txt(ctx, LR('Enantiomers: mirror images that cannot be superimposed, like your left and right hands','Enantiomeri: imagini în oglindă care nu se suprapun, ca mâna stângă și dreaptă'), 400, 420, 14.5, {w:800});
  },
  benzene(ctx, v, t){
    const cx = 480, cy = 215, r = 95; ctx.strokeStyle = INK; ctx.lineWidth = 4; hexPath(ctx, cx, cy, r, Math.PI/6); ctx.stroke();
    ctx.strokeStyle = 'rgba(26,116,179,' + (.55 + .35*Math.sin(t*2)) + ')'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(cx, cy, r*.6, 0, 7); ctx.stroke();
    for(let i = 0; i < 6; i++){ const a = Math.PI/6 + i*Math.PI/3; const x = cx + Math.cos(a)*r, y = cy + Math.sin(a)*r; drawBond(ctx, x, y, cx + Math.cos(a)*(r + 55), cy + Math.sin(a)*(r + 55), 1, 36, '#7b8a91', 1); drawAtom(ctx, x, y, 'C', 40, null, 1); drawAtom(ctx, cx + Math.cos(a)*(r + 55), cy + Math.sin(a)*(r + 55), 'H', 36, null, 1); }
    const k = Math.floor(t*.7) % 2; ctx.strokeStyle = MUTED; ctx.lineWidth = 3; hexPath(ctx, 150, 215, 60, Math.PI/6); ctx.stroke();
    for(let i = 0; i < 3; i++){ const a1 = Math.PI/6 + (2*i + k)*Math.PI/3, a2 = a1 + Math.PI/3; const s = .78; ctx.beginPath(); ctx.moveTo(150 + Math.cos(a1)*60*s, 215 + Math.sin(a1)*60*s); ctx.lineTo(150 + Math.cos(a2)*60*s, 215 + Math.sin(a2)*60*s); ctx.stroke(); }
    txt(ctx, LR('Kekulé (old model)','Kekulé (model vechi)'), 150, 310, 14, {color:MUTED}); txt(ctx, LR('delocalised ring of 6 π electrons','inel delocalizat de 6 electroni π'), cx, 410, 16, {w:800}); txt(ctx, 'C₆H₆', cx, 40, 24, {mono:1, w:500});
  },
  func(ctx, v, t){
    const F2 = [['alkane', LR('alkane','alcan'), 'C–C'], ['alkene', LR('alkene','alchenă'), 'C=C'], ['alkyne', LR('alkyne','alchină'), 'C≡C'], ['alcohol', LR('alcohol','alcool'), 'R–OH'], ['aldehyde', LR('aldehyde','aldehidă'), 'R–CHO'], ['ketone', LR('ketone','cetonă'), 'R–CO–R’'], ['acid', LR('carboxylic acid','acid carboxilic'), 'R–COOH'], ['ester', LR('ester','ester'), 'R–COO–R’'], ['amine', LR('amine','amină'), 'R–NH₂'], ['amide', LR('amide','amidă'), 'R–CONH₂'], ['halo', LR('halogenoalkane','derivat halogenat'), 'R–X'], ['arene', LR('arene','arenă'), 'C₆H₅–R']];
    const hl = v.hl || [];
    F2.forEach(([k, name, f], i) => { const x = 30 + (i % 4)*188, y = 30 + Math.floor(i/4)*135; const on = hl.indexOf(k) >= 0; const pulse = on ? 1 + .03*Math.sin(t*3) : 1;
      ctx.save(); ctx.translate(x + 85, y + 60); ctx.scale(pulse, pulse); ctx.globalAlpha = hl.length && !on ? .35 : 1; box(ctx, -85, -55, 170, 110, null, on);
      txt(ctx, f, 0, -12, 22, {mono:1, w:500, color:on ? '#8A4508' : INK}); txt(ctx, name, 0, 28, 15, {w:800}); ctx.restore(); });
  },
  isomers(ctx, v, t){
    const drawC = (pts, bonds) => { bonds.forEach(([a, b]) => drawBond(ctx, pts[a][0], pts[a][1], pts[b][0], pts[b][1], 1, 40, '#7b8a91', 1)); pts.forEach(p => drawAtom(ctx, p[0], p[1], 'C', 44, null, 1)); };
    drawC([[90, 200], [170, 200], [250, 200], [330, 200]], [[0,1],[1,2],[2,3]]); drawC([[480, 200], [560, 200], [640, 200], [560, 120]], [[0,1],[1,2],[1,3]]);
    txt(ctx, LR('butane','butan'), 210, 300, 20, {disp:1, w:600}); txt(ctx, LR('methylpropane','metilpropan'), 560, 300, 20, {disp:1, w:600});
    txt(ctx, LR('boils at −1 °C','fierbe la −1 °C'), 210, 330, 14, {color:MUTED}); txt(ctx, LR('boils at −12 °C','fierbe la −12 °C'), 560, 330, 14, {color:MUTED});
    txt(ctx, LR('same formula C₄H₁₀, different structure','aceeași formulă C₄H₁₀, structură diferită'), 400, 400, 18, {w:800, color:'#8A4508'}); txt(ctx, LR('(hydrogen atoms not shown)','(atomii de hidrogen nu sunt desenați)'), 400, 428, 13, {color:MUTED});
  },
  spectrum(ctx, v, t, ts){
    const k = clamp01(ts/3);
    if(v.kind === 'ms'){ axes(ctx, 90, 390, 760, 60, 'm/z', LR('abundance','abundență')); const peaks = [[15,.35],[29,.6],[31,1],[45,.25],[46,.3]]; peaks.forEach(([m, a]) => { const x = 90 + m/50*640; ctx.fillStyle = m === 46 ? BAD : ACC; ctx.fillRect(x - 6, 390 - a*300*k, 12, a*300*k); txt(ctx, String(m), x, 405, 13, {color:MUTED}); }); txt(ctx, LR('M⁺ = 46: ethanol','M⁺ = 46: etanol'), 640, 220, 16, {color:BAD}); return; }
    if(v.kind === 'ir'){ axes(ctx, 90, 390, 760, 60, LR('wavenumber (cm⁻¹) 4000 → 500','număr de undă (cm⁻¹) 4000 → 500'), LR('transmittance','transmitanță')); ctx.strokeStyle = ACC; ctx.lineWidth = 3; ctx.beginPath();
      for(let x = 90; x <= 90 + 670*k; x += 2){ const w = 4000 - (x - 90)/670*3500; let y = 90; y += 220*Math.exp(-Math.pow((w - 3000)/300, 2)); y += 250*Math.exp(-Math.pow((w - 1715)/40, 2)); y += 60*Math.exp(-Math.pow((w - 1250)/60, 2)) + Math.sin(x*.4)*4*(w < 1500); x === 90 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
      if(k >= 1){ txt(ctx, LR('O–H (broad, acid)','O–H (larg, acid)'), 90 + (4000 - 3000)/3500*670, 340, 14, {color:BAD}); txt(ctx, 'C=O 1715', 90 + (4000 - 1715)/3500*670, 365, 14, {color:BAD}); } return; }
    axes(ctx, 90, 390, 760, 60, 'δ / ppm   (10 → 0)', LR('signal','semnal')); const pk = [[3.7, 2, 4], [1.2, 3, 3]];
    pk.forEach(([d, area, mult]) => { const x0 = 90 + (10 - d)/10*670; for(let j = 0; j < mult; j++){ const h = [[1],[1,1],[1,2,1],[1,3,3,1]][mult - 1][j]/([1,2,4,8][mult - 1])*area*230*k; const x = x0 + (j - (mult - 1)/2)*9; ctx.strokeStyle = ACC; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, 390); ctx.lineTo(x, 390 - h); ctx.stroke(); } });
    txt(ctx, LR('CH₂: quartet (next to CH₃)','CH₂: cvartet (lângă CH₃)'), 90 + 6.3/10*670, 120, 14, {color:'#8A4508'}); txt(ctx, LR('CH₃: triplet (next to CH₂)','CH₃: triplet (lângă CH₂)'), 90 + 8.8/10*670, 160, 14, {color:'#8A4508'});
  },
  decay(ctx, v, t, ts){
    if(v.mode === 'halflife'){ axes(ctx, 90, 390, 760, 60, LR('time (half-lives)','timp (timpi de înjumătățire)'), LR('atoms left','atomi rămași')); ctx.strokeStyle = ACC; ctx.lineWidth = 3.5; ctx.beginPath(); for(let x = 0; x <= 5; x += .05){ const px = 90 + x/5*670, py = 390 - 300*Math.pow(.5, x); x ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
      for(let h = 1; h <= 3; h++){ const px = 90 + h/5*670, py = 390 - 300*Math.pow(.5, h); ctx.setLineDash([4, 5]); ctx.strokeStyle = FL; ctx.beginPath(); ctx.moveTo(px, 390); ctx.lineTo(px, py); ctx.lineTo(90, py); ctx.stroke(); ctx.setLineDash([]); txt(ctx, ['1/2','1/4','1/8'][h - 1], 60, py, 14, {color:'#8A4508'}); }
      const alive = Math.round(64*Math.pow(.5, (ts % 10)/2)); for(let i = 0; i < 64; i++){ ctx.fillStyle = i < alive ? '#e2553f' : '#d5dde0'; ctx.beginPath(); ctx.arc(520 + (i % 8)*26, 90 + Math.floor(i/8)*22, 8, 0, 7); ctx.fill(); } return; }
    const types = [['α', LR('alpha: 2p + 2n','alfa: 2p + 2n'), '#e2553f', 1], ['β', LR('beta: fast electron','beta: electron rapid'), ACC, 2], ['γ', LR('gamma: energy wave','gama: undă de energie'), '#6a1478', 3]];
    drawBohr(ctx, 110, 220, 50, 8, 10, [], t);
    const shields = [[LR('paper','hârtie'), '#f4f0e0', 440, 8], [LR('aluminium','aluminiu'), '#c8cdd3', 560, 16], [LR('lead','plumb'), '#5a5d66', 680, 30]];
    shields.forEach(([n, c, x, w]) => { ctx.fillStyle = c; ctx.fillRect(x, 70, w, 300); txt(ctx, n, x + w/2, 395, 13, {w:800}); });
    types.forEach(([s, n, c, stop], i) => { const y = 130 + i*90; const k = (t*.35 + i*.3) % 1; const xmax = [440, 560, 740][i]; const x = 170 + k*(xmax - 170); if(i === 2){ ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.beginPath(); for(let xx = 170; xx < x; xx += 3) ctx.lineTo(xx, y + Math.sin(xx*.15)*8); ctx.stroke(); } else { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, i ? 5 : 11, 0, 7); ctx.fill(); }
      txt(ctx, s + '  ' + n, 300, y - 24, 14, {color:c}); });
  },
  dna(ctx, v, t){
    if(v.mode === 'protein'){ const cols = ['#e2553f','#1a74b3','#23945A','#f2c23a','#9a5ee0','#E9821C']; for(let i = 0; i < 18; i++){ const x = 70 + i*38, y = 210 + Math.sin(i*.7 + t)*60*Math.min(1, i/4); if(i){ const xp = 70 + (i - 1)*38, yp = 210 + Math.sin((i - 1)*.7 + t)*60*Math.min(1, (i - 1)/4); ctx.strokeStyle = '#7b8a91'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(xp, yp); ctx.lineTo(x, y); ctx.stroke(); } ctx.fillStyle = cols[(i*7) % 6]; ctx.beginPath(); ctx.arc(x, y, 15, 0, 7); ctx.fill(); }
      txt(ctx, LR('amino acids joined by peptide bonds fold into a protein','aminoacizi uniți prin legături peptidice se pliază într-o proteină'), 400, 410, 16, {w:800}); txt(ctx, '–CO–NH–', 400, 60, 22, {mono:1, w:500, color:'#8A4508'}); return; }
    const pairs = [['A','T','#e2553f','#1a74b3'],['G','C','#23945A','#f2c23a']];
    for(let i = 0; i < 16; i++){ const x = 80 + i*42, ph = i*.55 + t; const y1 = 210 + Math.sin(ph)*90, y2 = 210 - Math.sin(ph)*90; const pr = pairs[(i*3) % 2]; const front = Math.cos(ph) > 0;
      ctx.strokeStyle = '#cfdcd7'; ctx.lineWidth = 3; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, y2); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = pr[2]; ctx.beginPath(); ctx.arc(x, y1, front ? 13 : 10, 0, 7); ctx.fill(); txt(ctx, pr[0], x, y1, 12, {color:'#fff'}); ctx.fillStyle = pr[3]; ctx.beginPath(); ctx.arc(x, y2, front ? 10 : 13, 0, 7); ctx.fill(); txt(ctx, pr[1], x, y2, 12, {color:'#fff'}); }
    txt(ctx, LR('A pairs with T, G pairs with C (hydrogen bonds)','A se împerechează cu T, G cu C (legături de hidrogen)'), 400, 420, 16, {w:800});
  },
  crude(ctx, v, t, ts){
    if(v.mode === 'cracking'){ const k = easeOut(((ts % 7) - 1.5)/2); const n = 10; for(let i = 0; i < n; i++){ const split = i >= 6; const x = 140 + i*55 + (split ? 80*k : 0), y = 180 + (split ? 60*k : 0); if(i && i !== 6) drawBond(ctx, x - 55, y, x, y, 1, 36, '#7b8a91', 1); if(i === 7 && k > .9) drawBond(ctx, x - 55, y, x, y, 2, 36, BAD, 1); drawAtom(ctx, x, y, 'C', 36, null, 1); }
      if(k < .5){ drawFlames(ctx, 400, 360, 80, 50, '#ff8a2a', t, 1 - k*2); } txt(ctx, LR('long alkane → shorter alkane + alkene','alcan lung → alcan mai scurt + alchenă'), 400, 90, 20, {disp:1, w:600}); txt(ctx, 'C₁₀H₂₂ → C₆H₁₄ + C₄H₈', 400, 420, 22, {mono:1, w:500}); return; }
    const x = 330, y0 = 60, h = 340; const g = ctx.createLinearGradient(0, y0, 0, y0 + h); g.addColorStop(0, '#dff0fb'); g.addColorStop(1, '#f7c7a6'); ctx.fillStyle = g; roundRect(ctx, x, y0, 110, h, 20); ctx.fill(); ctx.strokeStyle = '#7f9aa6'; ctx.lineWidth = 3; ctx.stroke();
    const fr = [[LR('refinery gas','gaze de rafinărie'), '< 25 °C'], [LR('petrol','benzină'), '40 °C'], [LR('kerosene','kerosen'), '180 °C'], [LR('diesel','motorină'), '260 °C'], [LR('fuel oil','păcură'), '350 °C'], [LR('bitumen','bitum'), '> 400 °C']];
    fr.forEach(([n, T], i) => { const y = y0 + 30 + i*55; arrowLine(ctx, x + 110, y, x + 170, y, INK); txt(ctx, n, x + 180, y, 16, {align:'left', w:800}); txt(ctx, T, x - 20, y, 14, {align:'right', color:MUTED}); });
    drawFlames(ctx, x + 55, y0 + h + 30, 60, 30, '#ff8a2a', t, .9); txt(ctx, LR('crude oil in','țiței'), x - 90, y0 + h - 20, 15, {color:'#8A4508'});
    for(let i = 0; i < 8; i++){ const k = (t*.3 + i/8) % 1; ctx.fillStyle = 'rgba(160,160,160,' + (.5*(1 - k)) + ')'; ctx.beginPath(); ctx.arc(x + 30 + (i*17) % 50, y0 + h - 20 - k*(h - 40), 7, 0, 7); ctx.fill(); }
  },
  bromine(ctx, v, t, ts){
    const k = clamp01(((ts % 9) - 1.5)/3);
    tube(ctx, 280, 360, 70, 260, 'rgba(210,120,30,.75)', .55); tube(ctx, 520, 360, 70, 260, 'rgba(210,120,30,' + (.75*(1 - k)) + ')', .55);
    txt(ctx, LR('alkane + bromine water','alcan + apă de brom'), 280, 400, 15, {w:800}); txt(ctx, LR('stays orange','rămâne portocaliu'), 280, 425, 14, {color:'#8A4508'});
    txt(ctx, LR('alkene + bromine water','alchenă + apă de brom'), 520, 400, 15, {w:800}); txt(ctx, LR('turns colourless','se decolorează'), 520, 425, 14, {color:GOOD});
    txt(ctx, 'C=C + Br₂ → CBr–CBr', 400, 50, 22, {mono:1, w:500});
  },
  ptrend(ctx, v, t){
    const vals = {radius:[53,31,167,112,87,67,56,48,42,38,190,145,118,111,98,88,79,71,243,194], ie:[1312,2372,520,900,801,1086,1402,1314,1681,2081,496,738,578,786,1012,1000,1251,1521,419,590], en:[2.2,0,.98,1.57,2.04,2.55,3.04,3.44,3.98,0,.93,1.31,1.61,1.9,2.19,2.58,3.16,0,.82,1]};
    const tv = vals[v.trend] || vals.radius; const mx = Math.max(...tv);
    const names = {radius:LR('Atomic radius','Raza atomică'), ie:LR('First ionisation energy','Prima energie de ionizare'), en:LR('Electronegativity','Electronegativitate')};
    txt(ctx, names[v.trend] || names.radius, 400, 40, 24, {disp:1, w:600});
    ELEMENTS.forEach((E, i) => { const val = tv[i]; const k = val/mx; const x = 150 + E[7]*62, y = 80 + E[6]*72; ctx.fillStyle = val ? 'rgba(233,130,28,' + (.12 + .85*k) + ')' : '#eef2f1'; roundRect(ctx, x, y, 56, 64, 8); ctx.fill(); txt(ctx, E[1], x + 28, y + 24, 20, {disp:1, w:600}); txt(ctx, val ? String(val) : '—', x + 28, y + 48, 11, {color:MUTED}); });
    const inc = v.trend === 'radius' ? [LR('increases ↓','crește ↓'), LR('decreases →','scade →')] : [LR('decreases ↓','scade ↓'), LR('increases →','crește →')];
    txt(ctx, LR('down a group: ','în jos în grupă: ') + inc[0], 250, 400, 15, {w:800, color:'#8A4508'}); txt(ctx, LR('across a period: ','de-a lungul perioadei: ') + inc[1], 580, 400, 15, {w:800, color:'#8A4508'});
  },
  recycle(ctx, v, t){
    const st = [LR('raw materials','materii prime'), LR('manufacture','fabricare'), LR('use','utilizare'), LR('disposal or recycling','eliminare sau reciclare')];
    st.forEach((s, i) => { const a = -Math.PI/2 + i*Math.PI/2 + t*.15; const x = 400 + Math.cos(a)*150, y = 225 + Math.sin(a)*150; const a2 = a + Math.PI/2;
      arrowLine(ctx, 400 + Math.cos(a + .35)*150, 225 + Math.sin(a + .35)*150, 400 + Math.cos(a2 - .35)*150, 225 + Math.sin(a2 - .35)*150, GOOD);
      ctx.fillStyle = '#fff'; roundRect(ctx, x - 90, y - 26, 180, 52, 14); ctx.fill(); ctx.strokeStyle = GOOD; ctx.lineWidth = 2.5; ctx.stroke(); txt(ctx, s, x, y, 15, {w:800}); });
    txt(ctx, LR('life cycle','ciclu de viață'), 400, 225, 20, {disp:1, w:600, color:GOOD});
  },
});

// ===================== v2 effects =====================
Object.assign(FX, {fire:null, thermite:null, flameT:null, geyser:null, jet:[], milk:null, trails:[], glow:null, celebrate:null});
const MILK_COLS = ['#e23a6e', '#2f6fe0', '#f2c23a', '#2fb35a'];
function seeded(seed){ let s = seed % 2147483647; if(s <= 0) s += 2147483646; return () => (s = s*16807 % 2147483647)/2147483647; }

function fxEmit2(f, t){
  switch(f.t){
    case 'fire': FX.fire = {t0:t, delay:f.delay || 0, dur:f.dur, color:f.color}; break;
    case 'thermite': FX.thermite = {t0:t, dur:f.dur}; FX.flash = .8; FX.flashColor = '#fff4d0'; FX.shake = REDUCED ? 0 : 4; break;
    case 'flametest': FX.flameT = {t0:t, dur:f.dur, color:f.color}; break;
    case 'geyser': FX.geyser = {t0:t, dur:f.dur, color:f.color}; B.wave = 2; break;
    case 'fog': FX.emitters.push({kind:'fog', until:t + f.dur, rate:f.weak ? 3 : 14, weak:f.weak, acc:0}); break;
    case 'milkburst': FX.milk = {t0:t, dur:f.dur}; break;
    case 'trails': { const r = seeded(Math.floor(t*1000)); const lines = []; for(let i = 0; i < 7; i++) lines.push({x:G.cx + (r() - .5)*150, amp:4 + r()*10, ph:r()*6, sp:.7 + r()*.6}); FX.trails.push({t0:t, dur:f.dur, color:f.color, lines}); break; }
    case 'glow': FX.glow = {t0:t, dur:f.dur, color:f.color}; break;
  }
}
function celebrate(){
  if(REDUCED) return;
  const t = nowS(); FX.celebrate = [];
  const cols = ['#E9821C', '#1A74B3', '#23945A', '#e23a6e', '#f2c23a'];
  for(let i = 0; i < 90; i++) FX.celebrate.push({x:rnd(250, 650), y:rnd(-40, 0), vx:rnd(-80, 80), vy:rnd(80, 240), rot:rnd(0, 6), vr:rnd(-6, 6), c:cols[i % cols.length], t0:t});
}

function fxUpdate2(dt, t){
  const sy = surfY();
  if(FX.thermite){
    const e = t - FX.thermite.t0;
    if(e > FX.thermite.dur) FX.thermite = null;
    else {
      const n = Math.floor((REDUCED ? 60 : 220)*dt);
      for(let i = 0; i < n; i++) FX.sparks.push({x:G.cx + rnd(-30, 30), y:G.bot - 20, vx:rnd(-420, 420), vy:rnd(-760, -180), life:0, max:rnd(.6, 1.5), c:Math.random() < .5 ? '#fff2b0' : '#ffae3a'});
      FX.flash = Math.max(FX.flash, .22 + .14*Math.sin(t*37));
      if(Math.random() < dt*10) FX.puffs.push({x:G.cx + rnd(-50, 50), y:G.top - 10, r:rnd(14, 22), vx:rnd(-20, 20), vy:rnd(-70, -40), life:0, max:3, c:'240,238,232', a:.55});
    }
  }
  if(FX.flameT && t - FX.flameT.t0 > FX.flameT.dur) FX.flameT = null;
  if(FX.fire){
    const e = t - FX.fire.t0;
    if(e > FX.fire.delay + FX.fire.dur) FX.fire = null;
    else if(e < FX.fire.delay){ if(Math.random() < dt*(1 + e*2)) FX.puffs.push({x:G.cx + rnd(-20, 20), y:G.bot - 14, r:rnd(5, 9), vx:rnd(-8, 8), vy:rnd(-40, -20), life:0, max:2.5, c:'220,215,210', a:.4}); }
    else { if(Math.random() < dt*8) FX.puffs.push({x:G.cx + rnd(-30, 30), y:G.top - 30, r:rnd(12, 18), vx:rnd(-15, 15), vy:rnd(-60, -35), life:0, max:3, c:'90,85,80', a:.45});
      if(Math.random() < dt*25) FX.sparks.push({x:G.cx + rnd(-30, 30), y:G.bot - 30, vx:rnd(-120, 120), vy:rnd(-360, -160), life:0, max:rnd(.3, .7), c:'#ffc15a'}); }
  }
  if(FX.geyser){
    const e = t - FX.geyser.t0;
    if(e > FX.geyser.dur) FX.geyser = null;
    else { const k = 1 - e/FX.geyser.dur; const n = Math.floor((REDUCED ? 40 : 160)*dt*(.4 + k));
      for(let i = 0; i < n; i++) FX.jet.push({x:G.cx + rnd(-8, 8), y:sy - 4, vx:rnd(-70, 70), vy:-rnd(700, 1050)*(.55 + .45*k), r:rnd(2.5, 5), c:FX.geyser.color}); }
  }
  for(const d of FX.jet){ d.vy += 900*dt; d.x += d.vx*dt; d.y += d.vy*dt; }
  FX.jet = FX.jet.filter(d => d.y < 508 && !(d.vy > 0 && Math.abs(d.x - G.cx) < G.hw - 6 && d.y > surfY()));
  if(FX.jet.length > 900) FX.jet.splice(0, FX.jet.length - 900);
  FX.trails = FX.trails.filter(tr2 => t - tr2.t0 < tr2.dur);
  if(FX.glow && t - FX.glow.t0 > FX.glow.dur) FX.glow = null;
  if(FX.celebrate){ for(const c of FX.celebrate){ c.vy += 120*dt; c.x += c.vx*dt; c.y += c.vy*dt; c.rot += c.vr*dt; } if(t - FX.celebrate[0].t0 > 4) FX.celebrate = null; }
}

// ---------- objects inside the beaker ----------
function drawFoil(ctx, x, y, k){
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.fillStyle = '#cfd4da'; ctx.beginPath();
  const pts = [[-16,4],[-12,-8],[-2,-12],[10,-9],[16,-2],[13,8],[2,11],[-10,10]]; pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#9aa1a8'; ctx.lineWidth = 1; ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.beginPath(); ctx.moveTo(-9, -5); ctx.lineTo(0, -8); ctx.lineTo(6, -3); ctx.stroke();
  ctx.restore();
}
function drawWire(ctx, x, y, k){
  ctx.save(); ctx.strokeStyle = '#b8652e'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.globalAlpha = Math.max(.2, k);
  ctx.beginPath(); for(let i = 0; i <= 60; i++){ const a = i/60*Math.PI*10; const yy = y + 55 - i*1.9*k; const xx = x + Math.cos(a)*12; i ? ctx.lineTo(xx, yy + Math.sin(a)*3) : ctx.moveTo(xx, yy); } ctx.stroke();
  ctx.strokeStyle = 'rgba(255,210,170,.8)'; ctx.lineWidth = 1.3; ctx.stroke(); ctx.restore();
}
function drawDryIce(ctx, x, y, k){
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  for(const b of [[-22,0,20,16],[0,-4,22,20],[20,1,18,14]]){ ctx.fillStyle = '#f3f7f9'; roundRect(ctx, b[0] - b[2]/2, b[1] - b[3]/2, b[2], b[3], 3); ctx.fill(); ctx.strokeStyle = '#c9d6dc'; ctx.lineWidth = 1; ctx.stroke(); }
  ctx.restore();
}
function drawCandies(ctx, x, y){
  for(const c of [[-14,0],[4,-3],[20,1]]){ ctx.fillStyle = '#f5f3ec'; ctx.beginPath(); ctx.ellipse(x + c[0], y + c[1], 9, 5, .2, 0, 7); ctx.fill(); ctx.strokeStyle = '#d9d4c6'; ctx.lineWidth = 1; ctx.stroke(); }
}
function drawObjects2(ctx, t){
  for(const it of B.items){
    const id = it.id, age = t - it.t;
    if(id === 'li' || id === 'cs') drawChunk(ctx, OBJPOS.chunk.x, OBJPOS.chunk.y, SPECIES[id].c, 1);
    else if(id === 'al') drawFoil(ctx, OBJPOS.foil.x, OBJPOS.foil.y, 1);
    else if(id === 'cu') drawWire(ctx, OBJPOS.wire.x, OBJPOS.wire.y, 1);
    else if(id === 'mentos') drawCandies(ctx, G.cx - 30, G.bot - 6);
    else if(id === 'dryice') drawDryIce(ctx, OBJPOS.dryice.x, OBJPOS.dryice.y, 1);
    else if(id.indexOf('garden_') === 0){
      const r = seeded(it.uid*7919); const col = SPECIES[id].c; const g = clamp01(age/14);
      for(let i = 0; i < 7; i++){
        const x0 = G.cx + (r() - .5)*150, hmax = Math.min(70 + r()*140, Math.max(20, G.bot - surfY() - 14)), ph = r()*6, h = g*hmax;
        ctx.strokeStyle = shade(col, -.25); ctx.lineCap = 'round';
        ctx.beginPath(); for(let yy = 0; yy <= h; yy += 6){ const xx = x0 + Math.sin(yy*.05 + ph)*7 + yy*.04*(r() > .5 ? 1 : -1); yy ? ctx.lineTo(xx, G.bot - 4 - yy) : ctx.moveTo(xx, G.bot - 4); }
        ctx.lineWidth = 8; ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.stroke();
        ctx.fillStyle = shade(col, .3); ctx.beginPath(); ctx.arc(x0 + Math.sin(h*.05 + ph)*7, G.bot - 4 - h, 4.5, 0, 7); ctx.fill();
      }
      ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(G.cx, G.bot - 2, 30, 8, 0, 0, 7); ctx.fill();
    }
    else if(id === 'agtree'){
      const r = seeded(it.uid*104729); const g = clamp01(age/10);
      ctx.strokeStyle = '#e8ecf1'; ctx.lineCap = 'round';
      for(let i = 0; i < 26; i++){
        const y0 = OBJPOS.wire.y + 55 - r()*105, dir = r() < .5 ? -1 : 1, len = (10 + r()*26)*g;
        let x = OBJPOS.wire.x + dir*10, y = y0; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(x, y);
        for(let s2 = 0; s2 < 4; s2++){ x += dir*len/4; y += (r() - .6)*len/3; ctx.lineTo(x, y); }
        ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,' + (.5 + .5*Math.sin(t*4 + i)) + ')'; ctx.fillRect(x - 1, y - 1, 2.5, 2.5);
      }
    }
    else if(id === 'moltenfe'){
      const k = clamp01(age/22); const a = hexToRgb('#fff1a8'), b = hexToRgb('#ff7a1a'), c = hexToRgb('#5d5f64');
      const mix = k < .4 ? [lerp(a[0], b[0], k/.4), lerp(a[1], b[1], k/.4), lerp(a[2], b[2], k/.4)] : [lerp(b[0], c[0], (k - .4)/.6), lerp(b[1], c[1], (k - .4)/.6), lerp(b[2], c[2], (k - .4)/.6)];
      ctx.fillStyle = 'rgb(' + (mix[0]|0) + ',' + (mix[1]|0) + ',' + (mix[2]|0) + ')'; ctx.beginPath(); ctx.ellipse(G.cx, G.bot + 1, 60, 12, 0, 0, 7); ctx.fill();
      if(k < .6){ ctx.save(); ctx.globalCompositeOperation = 'lighter'; const gl = ctx.createRadialGradient(G.cx, G.bot, 4, G.cx, G.bot, 110); gl.addColorStop(0, 'rgba(255,160,60,' + (.6*(1 - k/.6)) + ')'); gl.addColorStop(1, 'rgba(255,120,30,0)'); ctx.fillStyle = gl; ctx.fillRect(G.cx - 120, G.bot - 110, 240, 130); ctx.restore(); }
    }
  }
}

// ---------- liquid overlays and tall objects ----------
function drawLiquid2(ctx, t){
  const sy = surfY(), L = innerL(), R = innerR(), rx = (R - L)/2, ry = G.ry*.85;
  const liquid = B.dispVol > .03;
  if(liquid){
    ctx.save(); beakerClip(ctx); ctx.clip();
    // colour trails
    for(const tr2 of FX.trails){ const e = (t - tr2.t0)/tr2.dur; const len = (G.bot - sy)*Math.min(1, e*1.6);
      ctx.globalAlpha = .75*(1 - e); ctx.strokeStyle = tr2.color; ctx.lineWidth = 5; ctx.lineCap = 'round';
      for(const ln of tr2.lines){ ctx.beginPath(); for(let yy = 0; yy <= len; yy += 6){ const xx = ln.x + Math.sin(yy*.04*ln.sp + ln.ph + t)*ln.amp; yy ? ctx.lineTo(xx, sy + yy) : ctx.moveTo(xx, sy); } ctx.stroke(); }
      ctx.globalAlpha = 1; }
    // hot ice crystals
    const hi = B.items.find(i => i.id === 'hoticesolid');
    if(hi){ const g = easeOut((t - hi.t)/1.3); const r = seeded(hi.uid*31);
      ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 1.6;
      for(let i = 0; i < 90; i++){ const a = -Math.PI*(.05 + .9*r()); const len = (40 + r()*190)*g; const x0 = G.cx + (r() - .5)*30, y0 = G.bot - 4;
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + Math.cos(a)*len, y0 + Math.sin(a)*len); ctx.stroke(); }
      ctx.fillStyle = 'rgba(255,255,255,' + (.35*g) + ')'; ctx.fillRect(L, sy, R - L, G.bot - sy + G.ry); }
    // slime shine
    if(hasId('slime')){ ctx.fillStyle = 'rgba(255,255,255,.35)'; for(let i = 0; i < 4; i++){ ctx.beginPath(); ctx.ellipse(G.cx - 50 + i*34, sy + 18 + Math.sin(t*1.5 + i)*6, 14, 5, .3, 0, 7); ctx.fill(); } }
    ctx.restore();
    // milk colours on the surface
    if((hasId('milk') || hasId('magicmilk')) && hasId('foodcolor')){
      const burst = hasId('magicmilk');
      const e = burst && FX.milk ? t - FX.milk.t0 : burst ? 20 : 0;
      ctx.save(); ctx.beginPath(); ctx.ellipse(G.cx, sy, rx, ry, 0, 0, 7); ctx.clip();
      MILK_COLS.forEach((c, k) => {
        const baseA = k*Math.PI/2 + .6;
        if(!burst){ ctx.fillStyle = hexA(c, .9); ctx.beginPath(); ctx.ellipse(G.cx + Math.cos(baseA)*22, sy + Math.sin(baseA)*6, 9, 3.5, 0, 0, 7); ctx.fill(); return; }
        const spread = Math.min(1, e/3.5);
        for(let j = 0; j < 9; j++){
          const a = baseA + j*.34 + (REDUCED ? 0 : Math.min(e, 9)*.35) + Math.sin(t*.8 + j)*.1;
          const rr = (.15 + j*.1)*rx*spread + 18;
          ctx.fillStyle = hexA(c, .75); ctx.beginPath(); ctx.ellipse(G.cx + Math.cos(a)*rr, sy + Math.sin(a)*rr*ry/rx, 16 - j, (16 - j)*ry/rx + 1.5, 0, 0, 7); ctx.fill();
        }
      });
      ctx.restore();
    }
  }
  // tall things that stick out of the beaker (drawn before the front glass)
  for(const it of B.items){
    const age = t - it.t;
    if(it.id === 'snow'){
      const g = easeOut(age/2); const h = 175*g, r = seeded(it.uid*17);
      for(let i = 0; i < 70; i++){ const u = r(), v = r(); const y = G.bot - v*h; const w = (G.hw - 8)*(1 - Math.pow(v, 3)*.35);
        const x = G.cx + (u - .5)*2*w; ctx.fillStyle = v > .8 ? '#ffffff' : '#eef4fa'; ctx.beginPath(); ctx.arc(x, y, 10 + r()*9, 0, 7); ctx.fill(); }
      ctx.fillStyle = 'rgba(160,190,220,.25)'; ctx.beginPath(); ctx.ellipse(G.cx, G.bot - 6, G.hw - 10, 8, 0, 0, 7); ctx.fill();
    }
    if(it.id === 'carbonsnake'){
      const g = easeOut(age/6.5); const H = 290*g, r = seeded(it.uid*13);
      for(let yy = 0; yy <= H; yy += 5){
        const y = G.bot - 6 - yy, x = G.cx + Math.sin(yy*.018)*14 + Math.sin(yy*.07)*3, w = 30 - yy*.02;
        ctx.fillStyle = yy > H - 12 ? '#2a2724' : '#1c1a18'; ctx.beginPath(); ctx.ellipse(x, y, w, 7, 0, 0, 7); ctx.fill();
        if(r() < .8){ ctx.fillStyle = 'rgba(120,112,100,.55)'; ctx.fillRect(x + (r() - .5)*w*1.6, y + (r() - .5)*6, 2.2, 2.2); }
      }
    }
    if(it.id === 'agmirror'){
      const g = clamp01(age/5); const L2 = G.cx - G.hw + 2, W = G.hw*2 - 4;
      const m = ctx.createLinearGradient(L2, 0, L2 + W, 0);
      m.addColorStop(0, 'rgba(150,158,168,' + .9*g + ')'); m.addColorStop(.18, 'rgba(245,247,250,' + .95*g + ')'); m.addColorStop(.4, 'rgba(170,178,188,' + .9*g + ')');
      m.addColorStop(.65, 'rgba(235,238,242,' + .95*g + ')'); m.addColorStop(1, 'rgba(140,148,158,' + .9*g + ')');
      ctx.fillStyle = m; ctx.beginPath(); ctx.moveTo(L2, G.top + 14); ctx.lineTo(L2, G.bot); ctx.ellipse(G.cx, G.bot, W/2, G.ry, 0, Math.PI, 0, true); ctx.lineTo(L2 + W, G.top + 14); ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(40,50,60,' + .18*g + ')'; ctx.fillRect(G.cx + 20, G.top + 40, 24, 180);
    }
  }
}
function drawFront2(ctx, t){
  if(B.cracked){
    ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = 1.6; const r = seeded(77);
    const ox = G.cx + 28, oy = G.bot - 70;
    for(let i = 0; i < 7; i++){ let x = ox, y = oy; const a = i/7*Math.PI*2 + r(); ctx.beginPath(); ctx.moveTo(x, y);
      for(let s2 = 0; s2 < 5; s2++){ x += Math.cos(a + (r() - .5))*16; y += Math.sin(a + (r() - .5))*16; ctx.lineTo(Math.max(G.cx - G.hw, Math.min(G.cx + G.hw, x)), Math.max(G.top, Math.min(G.bot, y))); } ctx.stroke(); }
    ctx.strokeStyle = 'rgba(40,60,70,.35)'; ctx.lineWidth = .8; ctx.beginPath(); ctx.arc(ox, oy, 5, 0, 7); ctx.stroke();
  }
  if(B.temp < 10){
    const k = clamp01((10 - B.temp)/12); const r = seeded(5);
    for(let i = 0; i < 260; i++){ const x = G.cx - G.hw + r()*G.hw*2, y = G.top + 8 + r()*(G.bot - G.top - 8); ctx.fillStyle = 'rgba(255,255,255,' + (.75*k*r()) + ')'; ctx.fillRect(x, y, 2, 2); }
    ctx.fillStyle = 'rgba(235,245,252,' + .25*k + ')'; ctx.fillRect(G.cx - G.hw, G.top, G.hw*2, G.bot - G.top);
  }
}
function drawFlames(ctx, x, baseY, width, height, color, t, alpha){
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  const gl = ctx.createRadialGradient(x, baseY - height*.4, 4, x, baseY - height*.4, height*1.1);
  gl.addColorStop(0, hexA(color, .45*alpha)); gl.addColorStop(1, hexA(color, 0));
  ctx.fillStyle = gl; ctx.fillRect(x - height*1.2, baseY - height*1.6, height*2.4, height*2);
  for(let i = 0; i < 6; i++){
    const off = (i - 2.5)/2.5*width*.5, h = height*(.55 + .45*Math.abs(Math.sin(t*(6 + i) + i*1.7)));
    ctx.fillStyle = hexA(color, .55*alpha); ctx.beginPath(); ctx.moveTo(x + off - 12, baseY);
    ctx.quadraticCurveTo(x + off - 16, baseY - h*.5, x + off + Math.sin(t*9 + i)*8, baseY - h);
    ctx.quadraticCurveTo(x + off + 16, baseY - h*.5, x + off + 12, baseY); ctx.closePath(); ctx.fill();
  }
  ctx.fillStyle = 'rgba(255,250,235,' + .5*alpha + ')'; ctx.beginPath(); ctx.ellipse(x, baseY - 10, width*.3, 14, 0, 0, 7); ctx.fill();
  ctx.restore();
}
function drawTop2(ctx, t){
  if(FX.flameT){ const e = t - FX.flameT.t0, a = Math.min(1, e/.4)*Math.min(1, (FX.flameT.dur - e)/.8); drawFlames(ctx, G.cx, G.bot - 6, 90, 230, FX.flameT.color, t, a); }
  if(FX.fire){ const e = t - FX.fire.t0 - FX.fire.delay; if(e > 0){ const a = Math.min(1, e/.3)*Math.min(1, (FX.fire.dur - e)/1); drawFlames(ctx, G.cx, G.bot - 6, 80, 200, '#ff9a3a', t, a); drawFlames(ctx, G.cx, G.bot - 6, 50, 140, FX.fire.color, t + 1, a*.8); } }
  if(FX.thermite){ const e = t - FX.thermite.t0; const a = Math.min(1, e/.2)*Math.min(1, (FX.thermite.dur - e)/1.2);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(G.cx, G.bot - 20, 5, G.cx, G.bot - 20, 260); g.addColorStop(0, 'rgba(255,255,235,' + a + ')'); g.addColorStop(.3, 'rgba(255,190,80,' + .6*a + ')'); g.addColorStop(1, 'rgba(255,120,30,0)'); ctx.fillStyle = g; ctx.fillRect(G.cx - 280, G.bot - 290, 560, 400); ctx.restore(); }
  if(FX.jet.length){ for(const d of FX.jet){ ctx.fillStyle = hexA(d.c, .85); ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 7); ctx.fill(); } }
  if(FX.glow){
    const e = t - FX.glow.t0, d = FX.glow.dur; const dark = Math.min(1, e/.8)*Math.min(1, (d - e)/1.2); const lum = dark*(1 - .5*clamp01((e - 2)/(d - 2)));
    ctx.save(); ctx.fillStyle = 'rgba(4,8,22,' + (.8*dark) + ')'; ctx.fillRect(SC.vb.x, SC.vb.y, SC.vb.w, SC.vb.h);
    ctx.globalCompositeOperation = 'lighter';
    const sy = surfY(); const L = innerL(), R = innerR(), rx = (R - L)/2;
    ctx.beginPath(); ctx.moveTo(L, sy); ctx.lineTo(L, G.bot); ctx.ellipse(G.cx, G.bot, rx, G.ry, 0, Math.PI, 0, true); ctx.lineTo(R, sy); ctx.ellipse(G.cx, sy, rx, G.ry*.85, 0, 0, Math.PI, false); ctx.closePath();
    ctx.fillStyle = hexA(FX.glow.color, .85*lum); ctx.fill();
    const g = ctx.createRadialGradient(G.cx, (sy + G.bot)/2, 10, G.cx, (sy + G.bot)/2, 260); g.addColorStop(0, hexA(FX.glow.color, .55*lum)); g.addColorStop(1, hexA(FX.glow.color, 0));
    ctx.fillStyle = g; ctx.fillRect(G.cx - 280, sy - 260, 560, 520);
    ctx.restore();
  }
  if(FX.celebrate){ for(const c of FX.celebrate){ ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(c.rot); ctx.fillStyle = c.c; ctx.fillRect(-5, -2.5, 10, 5); ctx.restore(); } }
}

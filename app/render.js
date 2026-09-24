// ===================== scene rendering =====================
const G = {cx:450, hw:104, top:172, bot:398, ry:15, unit:36};
const SC = {canvas:null, ctx:null, bg:null, dpr:1, kx:1, ky:1, pw:0, ph:0};
S.ptTitle = L('Periodic table','Tabelul periodic');
const rnd = (a, b) => a + Math.random()*(b - a);
const clamp01 = x => Math.max(0, Math.min(1, x));
const lerp = (a, b, k) => a + (b - a)*k;
const easeOut = x => 1 - Math.pow(1 - clamp01(x), 3);

function sceneResize(){
  const c = SC.canvas; const r = c.getBoundingClientRect(); if(!r.width || !r.height) return;
  SC.dpr = Math.min(2, window.devicePixelRatio || 1);
  SC.pw = Math.round(r.width*SC.dpr); SC.ph = Math.round(r.height*SC.dpr);
  SC.vb = window.innerWidth <= 760 ? {x:170, y:100, w:560, h:420} : {x:0, y:0, w:900, h:600};
  c.width = SC.pw; c.height = SC.ph; SC.kx = r.width/SC.vb.w; SC.ky = r.height/SC.vb.h; SC.bg = null;
}
function setT(ctx){ const a = SC.dpr*SC.kx, d = SC.dpr*SC.ky; ctx.setTransform(a, 0, 0, d, -SC.vb.x*a, -SC.vb.y*d); }

// ---------- static background ----------
function buildBG(){
  const off = document.createElement('canvas'); off.width = SC.pw; off.height = SC.ph;
  const ctx = off.getContext('2d'); setT(ctx);
  // wall
  ctx.fillStyle = '#dde8e4'; ctx.fillRect(0, 0, 900, 472);
  ctx.lineWidth = 1.2;
  for(let y = 0, row = 0; y < 472; y += 34, row++){
    ctx.strokeStyle = 'rgba(255,255,255,.65)'; ctx.beginPath(); ctx.moveTo(0, y + .5); ctx.lineTo(900, y + .5); ctx.stroke();
    ctx.strokeStyle = 'rgba(90,125,115,.13)'; ctx.beginPath(); ctx.moveTo(0, y + 2); ctx.lineTo(900, y + 2); ctx.stroke();
    for(let x = (row % 2) * 34; x < 900; x += 68){
      ctx.strokeStyle = 'rgba(255,255,255,.65)'; ctx.beginPath(); ctx.moveTo(x + .5, y); ctx.lineTo(x + .5, y + 34); ctx.stroke();
      ctx.strokeStyle = 'rgba(90,125,115,.12)'; ctx.beginPath(); ctx.moveTo(x + 2, y); ctx.lineTo(x + 2, y + 34); ctx.stroke();
    }
  }
  const sh = ctx.createLinearGradient(0, 0, 0, 472); sh.addColorStop(0, 'rgba(18,52,46,.10)'); sh.addColorStop(.55, 'rgba(18,52,46,0)'); sh.addColorStop(1, 'rgba(18,52,46,.16)');
  ctx.fillStyle = sh; ctx.fillRect(0, 0, 900, 472);
  const spot = ctx.createRadialGradient(450, 260, 30, 450, 260, 420); spot.addColorStop(0, 'rgba(255,255,255,.35)'); spot.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = spot; ctx.fillRect(0, 0, 900, 472);

  // periodic table poster
  ctx.save(); ctx.translate(40, 92);
  ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(4, 5, 262, 176);
  ctx.fillStyle = '#fbfaf5'; ctx.fillRect(0, 0, 262, 176);
  ctx.fillStyle = '#16252E'; ctx.font = '600 14px Fredoka, Nunito, sans-serif'; ctx.textBaseline = 'alphabetic'; ctx.fillText(tr(S.ptTitle), 12, 22);
  const cs = 13, ox = 12, oy = 32;
  const colFor = (r, c) => { if(r === 0 && c === 0) return '#bfe8c6'; if(c === 0) return '#ffc9a8'; if(c === 1) return '#ffe39e'; if(c >= 2 && c <= 11) return '#c9d9e8'; if(c === 17) return '#d6c8f5'; if(c === 16) return '#a9e3e0'; return (c - 12 > 5 - r) ? '#bfe8c6' : '#d9dfb4'; };
  for(let r = 0; r < 7; r++) for(let c = 0; c < 18; c++){
    if(r === 0 && c > 0 && c < 17) continue; if((r === 1 || r === 2) && c > 1 && c < 12) continue;
    ctx.fillStyle = colFor(r, c); ctx.fillRect(ox + c*cs + .5, oy + r*cs + .5, cs - 2, cs - 2);
  }
  for(let r = 0; r < 2; r++) for(let c = 0; c < 14; c++){ ctx.fillStyle = r ? '#f3d2e4' : '#f7dccf'; ctx.fillRect(ox + (c + 3)*cs + .5, oy + 7.5*cs + r*cs + .5, cs - 2, cs - 2); }
  ctx.fillStyle = '#9aa6ab'; ctx.fillRect(250, 4, 8, 3); ctx.fillRect(4, 4, 8, 3);
  ctx.restore();

  // wall shelf with bottles
  ctx.fillStyle = 'rgba(0,0,0,.14)'; ctx.fillRect(598, 272, 284, 8);
  const plank = ctx.createLinearGradient(0, 260, 0, 272); plank.addColorStop(0, '#c99a66'); plank.addColorStop(1, '#a8794a');
  ctx.fillStyle = plank; ctx.fillRect(592, 260, 290, 12);
  ctx.fillStyle = '#8c6038'; ctx.fillRect(612, 272, 8, 18); ctx.fillRect(852, 272, 8, 18);
  const shelfBottle = (x, w, h, glass, liq, lvl) => {
    const y = 260 - h;
    ctx.fillStyle = glass; roundRect(ctx, x, y + 14, w, h - 14, 6); ctx.fill();
    ctx.fillRect(x + w/2 - 5, y, 10, 16);
    ctx.fillStyle = liq; roundRect(ctx, x + 2, y + 14 + (h - 14)*(1 - lvl), w - 4, (h - 14)*lvl - 2, 5); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.fillRect(x + 5, y + h*.55, w - 10, 12);
    ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.fillRect(x + 4, y + 18, 3, h - 30);
    ctx.fillStyle = '#2c3a40'; ctx.fillRect(x + w/2 - 6, y - 5, 12, 7);
  };
  shelfBottle(612, 36, 70, 'rgba(122,74,28,.85)', 'rgba(70,40,15,.6)', .7);
  shelfBottle(662, 44, 58, 'rgba(214,236,244,.75)', 'rgba(64,170,120,.55)', .5);
  shelfBottle(720, 30, 76, 'rgba(214,236,244,.75)', 'rgba(230,120,60,.55)', .6);
  shelfBottle(766, 40, 52, 'rgba(122,74,28,.85)', 'rgba(70,40,15,.6)', .5);
  shelfBottle(822, 34, 64, 'rgba(214,236,244,.75)', 'rgba(60,110,210,.55)', .65);

  // clock face
  ctx.save(); ctx.translate(640, 104);
  ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.beginPath(); ctx.arc(3, 4, 42, 0, 7); ctx.fill();
  ctx.fillStyle = '#fbfaf5'; ctx.beginPath(); ctx.arc(0, 0, 42, 0, 7); ctx.fill();
  ctx.lineWidth = 4; ctx.strokeStyle = '#16252E'; ctx.stroke();
  ctx.fillStyle = '#16252E';
  for(let i = 0; i < 12; i++){ const a = i/12*Math.PI*2; ctx.fillRect(Math.cos(a)*33 - 1.5, Math.sin(a)*33 - 1.5, 3, 3); }
  ctx.restore();

  // bench
  const top = ctx.createLinearGradient(0, 472, 0, 528); top.addColorStop(0, '#39444b'); top.addColorStop(1, '#232b30');
  ctx.fillStyle = top; ctx.fillRect(0, 472, 900, 56);
  ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(0, 472, 900, 2);
  const refl = ctx.createLinearGradient(0, 480, 0, 528); refl.addColorStop(0, 'rgba(255,255,255,.07)'); refl.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = refl; ctx.fillRect(0, 480, 900, 48);
  ctx.fillStyle = '#6d7a82'; ctx.fillRect(0, 527, 900, 3);
  const face = ctx.createLinearGradient(0, 530, 0, 600); face.addColorStop(0, '#4a5962'); face.addColorStop(1, '#34424a');
  ctx.fillStyle = face; ctx.fillRect(0, 530, 900, 70);
  ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 2;
  for(const x of [300, 600]){ ctx.beginPath(); ctx.moveTo(x, 536); ctx.lineTo(x, 600); ctx.stroke(); }
  ctx.fillStyle = '#9aa7ae'; for(const x of [280, 320, 580, 620]) roundRect(ctx, x - 12, 552, 24, 5, 2.5), ctx.fill();

  // test tube rack
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(175, 505, 92, 7, 0, 0, 7); ctx.fill();
  const tubes = [['#e45b8a', .55], ['#4fb56d', .4], ['#f0a53a', .65], ['#8fc9f0', .3]];
  tubes.forEach((tb, i) => {
    const x = 118 + i*38;
    ctx.fillStyle = 'rgba(225,240,246,.55)'; roundRect(ctx, x - 8, 402, 16, 92, 8); ctx.fill();
    ctx.fillStyle = tb[0]; roundRect(ctx, x - 6, 492 - 86*tb[1], 12, 86*tb[1], 6); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(x - 4, 408, 2.5, 76);
    ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 1.2; roundRect(ctx, x - 8, 402, 16, 92, 8); ctx.stroke();
  });
  const wood = ctx.createLinearGradient(0, 440, 0, 452); wood.addColorStop(0, '#c99a66'); wood.addColorStop(1, '#a8794a');
  ctx.fillStyle = wood; roundRect(ctx, 92, 440, 166, 12, 3); ctx.fill();
  ctx.fillStyle = '#a8794a'; roundRect(ctx, 92, 494, 166, 12, 3); ctx.fill(); ctx.fillRect(94, 446, 8, 52); ctx.fillRect(248, 446, 8, 52);

  // erlenmeyer flask
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(762, 506, 58, 6, 0, 0, 7); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.moveTo(748, 392); ctx.lineTo(748, 432); ctx.lineTo(712, 496); ctx.quadraticCurveTo(708, 504, 718, 504); ctx.lineTo(806, 504); ctx.quadraticCurveTo(816, 504, 812, 496); ctx.lineTo(776, 432); ctx.lineTo(776, 392); ctx.closePath();
  ctx.fillStyle = 'rgba(225,240,246,.45)'; ctx.fill(); ctx.clip();
  const fl = ctx.createLinearGradient(0, 462, 0, 504); fl.addColorStop(0, 'rgba(46,160,150,.85)'); fl.addColorStop(1, 'rgba(22,110,110,.9)');
  ctx.fillStyle = fl; ctx.fillRect(700, 464, 120, 44);
  ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(700, 463, 120, 2);
  ctx.restore();
  ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(748, 392); ctx.lineTo(748, 432); ctx.lineTo(712, 496); ctx.quadraticCurveTo(708, 504, 718, 504); ctx.lineTo(806, 504); ctx.quadraticCurveTo(816, 504, 812, 496); ctx.lineTo(776, 432); ctx.lineTo(776, 392); ctx.stroke();
  ctx.fillStyle = '#e8eef0'; roundRect(ctx, 744, 386, 36, 8, 3); ctx.fill();

  // tripod shadow + hose
  ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.beginPath(); ctx.ellipse(450, 510, 118, 9, 0, 0, 7); ctx.fill();
  ctx.strokeStyle = '#c9542f'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(470, 500); ctx.bezierCurveTo(560, 520, 640, 490, 700, 520); ctx.bezierCurveTo(760, 548, 850, 520, 910, 530); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(470, 498); ctx.bezierCurveTo(560, 518, 640, 488, 700, 518); ctx.stroke();
  SC.bg = off;
}
function roundRect(ctx, x, y, w, h, r){ r = Math.min(r, w/2, h/2); ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }

// ---------- effects ----------
const FX = {
  bubbles:[], puffs:[], sparks:[], crystals:[], grains:[], drops:[], emitters:[], skaters:[], objs:[], swirls:[], precip:{},
  flash:0, flashColor:'#ffffff', shake:0, shimmer:0, burn:null, stir:null,
  foam:{level:0, target:0, hold:0, rise:1, color:'#ffffff'},
  clear(){ this.bubbles=[]; this.puffs=[]; this.sparks=[]; this.crystals=[]; this.grains=[]; this.drops=[]; this.emitters=[]; this.skaters=[]; this.objs=[]; this.swirls=[]; this.precip={}; this.burn=null; this.stir=null; this.foam={level:0,target:0,hold:0,rise:1,color:'#ffffff'}; this.shimmer=0; this.fire=null; this.thermite=null; this.flameT=null; this.geyser=null; this.jet=[]; this.milk=null; this.trails=[]; this.glow=null; this.celebrate=null; },
  start(rule, match, t){ (rule.fx || []).forEach(f => this.emit(f, t)); },
  emit(f, t){
    switch(f.t){
      case 'bubbles': this.emitters.push({kind:'bubbles', until:t + f.dur, rate:f.rate, acc:0}); break;
      case 'foam': this.foam.target = Math.max(this.foam.target, f.h); this.foam.hold = t + (f.dur || 6); this.foam.rise = f.rise || 1; this.foam.color = f.color || '#fff'; break;
      case 'skate': this.skaters.push({t0:t, dur:f.dur, x:G.cx - 20, vx:120, color:f.color, flame:f.flame, pop:f.pop, acc:0}); break;
      case 'smoke': this.emitters.push({kind:'smoke', until:t + f.dur, rate:f.rate || 4, dark:f.dark, color:f.color, alpha:f.alpha, acc:0}); break;
      case 'steam': this.emitters.push({kind:'steam', until:t + f.dur, rate:f.rate || 4, acc:0}); break;
      case 'shimmer': this.shimmer = 1; break;
      case 'swirl': this.swirls.push({t0:t, dur:f.dur || 2}); break;
      case 'dissolve': this.emitters.push({kind:'crystals', until:t + f.dur*.55, rate:34, color:f.color, acc:0}); break;
      case 'sink': this.emitters.push({kind:'grains', until:t + f.dur*.5, rate:70, color:f.color, acc:0}); break;
      case 'oildrops': this.emitters.push({kind:'oildrops', until:t + f.dur*.6, rate:22, acc:0}); break;
      case 'objfizz': this.objs.push({obj:f.obj, t0:t, dur:f.dur, rate:f.rate, acc:0}); break;
      case 'burn': this.burn = {t0:t, dur:f.dur}; this.flash = .95; this.flashColor = '#ffffff'; break;
      default: fxEmit2(f, t);
    }
  }
};
const OBJPOS = { ribbon:{x:G.cx - 12, y:G.bot - 18}, chalk:{x:G.cx + 44, y:G.bot - 11}, chunk:{x:G.cx - 22, y:G.bot - 10}, foil:{x:G.cx + 30, y:G.bot - 14}, wire:{x:G.cx - 30, y:G.bot - 60}, dryice:{x:G.cx, y:G.bot - 12} };
function surfY(){ return G.bot - B.dispVol*G.unit; }
function innerL(){ return G.cx - G.hw + 4; } function innerR(){ return G.cx + G.hw - 4; }

function targetLiquidColor(){
  if(B.seq && B.items.some(i => i.uid === B.seq.uid)){ const e = nowS() - B.seq.t0; let c = B.seq.steps[0]; for(const st of B.seq.steps) if(e >= st[0]) c = st; const rgb = hexToRgb(c[1]); return [rgb[0], rgb[1], rgb[2], c[2]]; }
  if(typeof labLiquidColor === 'function'){ const lc = labLiquidColor(); if(lc) return lc; }
  if(hasId('hoticesolid')) return [246, 247, 250, .9];
  if(hasId('milk') || hasId('magicmilk')) return [250, 250, 244, .96];
  if(hasId('emul')) return [241, 228, 184, .86];
  const water = waterPresent();
  if(hasId('cabbage') && water){ const c = hexToRgb(phBand(computePH()).c); return [c[0], c[1], c[2], .82]; }
  let r = 0, g = 0, b = 0, w = 0, amax = 0;
  for(const it of B.items){
    const s = SPECIES[it.id]; if(!(s.st === 'l' || s.st === 'd') || !s.c) continue; if(it.id === 'oil' && water) continue;
    const c = hexToRgb(s.c), a = s.a || .2; r += c[0]*a; g += c[1]*a; b += c[2]*a; w += a; amax = Math.max(amax, a);
  }
  if(!w) return [185, 220, 247, .3];
  return [r/w, g/w, b/w, Math.max(.3, amax)];
}

function fxUpdate(dt, t){
  const sy = surfY(), liquid = B.dispVol > .03, L = innerL(), R = innerR();
  // emitters
  for(const e of FX.emitters){
    if(t > e.until) continue;
    e.acc += e.rate*dt*(REDUCED ? .4 : 1);
    while(e.acc >= 1){ e.acc -= 1;
      if(e.kind === 'bubbles' && liquid) FX.bubbles.push({x:rnd(L + 8, R - 8), y:G.bot - rnd(2, 10), r:rnd(1.6, 4.6), vy:rnd(70, 150), ph:rnd(0, 6)});
      else if(e.kind === 'smoke') FX.puffs.push({x:G.cx + rnd(-40, 40), y:Math.min(sy, G.bot - 20) - 6, r:rnd(8, 14), vx:rnd(-14, 14), vy:rnd(-45, -25), life:0, max:rnd(2.2, 3.4), c:e.color || (e.dark ? '60,56,52' : '215,215,210'), a:e.alpha || (e.dark ? .55 : .45)});
      else if(e.kind === 'fog') FX.puffs.push({x:G.cx + rnd(-60, 60), y:Math.min(sy, G.bot - 16) - 4, r:rnd(12, 20), vx:rnd(-30, 30), vy:rnd(-60, -38), life:0, max:rnd(5, 7), c:'246,249,251', a:e.weak ? .35 : .62, fog:1});
      else if(e.kind === 'steam') FX.puffs.push({x:G.cx + rnd(-50, 50), y:Math.min(sy, G.bot - 10) - 4, r:rnd(8, 13), vx:rnd(-10, 10), vy:rnd(-55, -35), life:0, max:rnd(1.8, 2.6), c:'255,255,255', a:.5});
      else if(e.kind === 'crystals') FX.crystals.push({x:rnd(G.cx - 50, G.cx + 50), y:sy + 2, vy:rnd(30, 70), s:rnd(3, 6), life:0, max:rnd(.9, 1.5), c:e.color, rot:rnd(0, 3)});
      else if(e.kind === 'grains') FX.grains.push({x:rnd(G.cx - 60, G.cx + 60), y:sy + 2, vy:rnd(80, 160), c:e.color});
      else if(e.kind === 'oildrops' && liquid) FX.bubbles.push({x:rnd(L + 10, R - 10), y:G.bot - rnd(4, 40), r:rnd(3, 7), vy:rnd(40, 80), ph:rnd(0, 6), oil:1});
    }
  }
  FX.emitters = FX.emitters.filter(e => t <= e.until);
  // boiling & warm-liquid
  if(liquid && waterPresent() && B.temp > 78){
    const n = (B.temp - 78)*.9*dt*(REDUCED ? .4 : 1);
    if(Math.random() < n) FX.bubbles.push({x:rnd(L + 10, R - 10), y:G.bot - 4, r:rnd(3, 7), vy:rnd(90, 160), ph:rnd(0, 6)});
    if(B.temp > 92 && Math.random() < (B.temp - 88)*.06*dt*10) FX.puffs.push({x:G.cx + rnd(-60, 60), y:sy - 6, r:rnd(8, 12), vx:rnd(-8, 8), vy:rnd(-60, -35), life:0, max:rnd(1.8, 2.6), c:'255,255,255', a:.45});
  }
  // skaters (sodium/potassium)
  for(const k of FX.skaters){
    const e = t - k.t0; const p = e/k.dur;
    if(Math.random() < dt*2.5) k.vx = rnd(80, 220)*(Math.random() < .5 ? -1 : 1);
    k.x += k.vx*dt; if(k.x < L + 16){ k.x = L + 16; k.vx = Math.abs(k.vx); } if(k.x > R - 16){ k.x = R - 16; k.vx = -Math.abs(k.vx); }
    k.acc += dt*(REDUCED ? 10 : 40);
    while(k.acc >= 1){ k.acc -= 1;
      if(k.flame) FX.sparks.push({x:k.x + rnd(-5, 5), y:sy - 8, vx:rnd(-90, 90), vy:rnd(-220, -80), life:0, max:rnd(.25, .6), c:k.flame});
      else if(Math.random() < .6) FX.bubbles.push({x:k.x + rnd(-10, 10), y:sy + rnd(2, 8), r:rnd(1.5, 3), vy:rnd(30, 60), ph:0});
      if(Math.random() < .35) FX.bubbles.push({x:k.x + rnd(-12, 12), y:sy + rnd(2, 10), r:rnd(1.5, 3), vy:rnd(20, 40), ph:0});
      if(Math.random() < .12) FX.puffs.push({x:k.x, y:sy - 14, r:rnd(6, 10), vx:rnd(-10, 10), vy:rnd(-50, -30), life:0, max:1.8, c:'235,235,230', a:.4});
    }
    if(p >= 1 && !k.done){
      k.done = true;
      if(k.pop){ FX.flash = .35*k.pop; FX.flashColor = k.flame; FX.shake = REDUCED ? 0 : 5*k.pop;
        for(let i = 0; i < 26*k.pop; i++) FX.sparks.push({x:k.x, y:sy - 6, vx:rnd(-240, 240), vy:rnd(-340, -60), life:0, max:rnd(.3, .8), c:k.flame});
        for(let i = 0; i < 5; i++) FX.puffs.push({x:k.x + rnd(-10, 10), y:sy - 10, r:rnd(10, 16), vx:rnd(-20, 20), vy:rnd(-50, -20), life:0, max:2.4, c:'230,230,226', a:.5});
      }
    }
  }
  FX.skaters = FX.skaters.filter(k => !k.done);
  // fizzing objects
  for(const o of FX.objs){
    const pos = OBJPOS[o.obj]; o.acc += o.rate*dt*(1 - .6*clamp01((t - o.t0)/o.dur));
    while(o.acc >= 1){ o.acc -= 1; if(liquid) FX.bubbles.push({x:pos.x + rnd(-26, 26), y:pos.y + rnd(-6, 6), r:rnd(1.4, 3.6), vy:rnd(60, 120), ph:rnd(0, 6)}); }
  }
  FX.objs = FX.objs.filter(o => t - o.t0 < o.dur);
  // magnesium burn
  if(FX.burn){
    const e = t - FX.burn.t0;
    if(e > FX.burn.dur) FX.burn = null;
    else { FX.flash = Math.max(FX.flash, .25 + .15*Math.sin(t*40)); if(Math.random() < dt*14) FX.puffs.push({x:OBJPOS.ribbon.x + rnd(-20, 20), y:G.bot - 30, r:rnd(10, 16), vx:rnd(-12, 12), vy:rnd(-60, -35), life:0, max:3, c:'245,245,242', a:.6});
      if(Math.random() < dt*30) FX.sparks.push({x:OBJPOS.ribbon.x + rnd(-10, 10), y:G.bot - 22, vx:rnd(-160, 160), vy:rnd(-260, -80), life:0, max:rnd(.2, .5), c:'#fffbe6'}); }
  }
  // particles
  for(const b of FX.bubbles){ b.y -= b.vy*dt; b.x += Math.sin(b.ph + t*5)*14*dt; }
  FX.bubbles = FX.bubbles.filter(b => liquid && b.y > sy + (b.oil ? B.oilVol*G.unit*.2 : 2));
  if(FX.bubbles.length > 420) FX.bubbles.splice(0, FX.bubbles.length - 420);
  for(const p of FX.puffs){ if(p.fog){ if(p.y < G.top + 4 || p.over){ p.over = 1; if(Math.abs(p.x - G.cx) < G.hw + 8){ p.vx += Math.sign(p.x - G.cx || 1)*120*dt; } else { p.vy += 60*dt; } if(p.y > 500){ p.y = 500; p.vy = 0; p.vx *= .98; p.vx += Math.sign(p.vx || 1)*10*dt; } } p.r += 9*dt; } else p.r += 16*dt; p.x += p.vx*dt; p.y += p.vy*dt; p.life += dt; }
  FX.puffs = FX.puffs.filter(p => p.life < p.max);
  for(const s of FX.sparks){ s.vy += 520*dt; s.x += s.vx*dt; s.y += s.vy*dt; s.life += dt; }
  FX.sparks = FX.sparks.filter(s => s.life < s.max);
  for(const c of FX.crystals){ c.y += c.vy*dt; c.life += dt; c.rot += dt*2; }
  FX.crystals = FX.crystals.filter(c => c.life < c.max && c.y < G.bot);
  for(const g of FX.grains){ g.y += g.vy*dt; }
  FX.grains = FX.grains.filter(g => g.y < (liquid ? G.bot - 8 : G.bot - 8));
  for(const d of FX.drops){ d.vy += 600*dt; d.x += d.vx*dt; d.y += d.vy*dt; d.life += dt; }
  FX.drops = FX.drops.filter(d => d.life < .8 && d.y < G.bot + 60);
  // foam
  const F = FX.foam;
  if(t > F.hold) F.target *= (1 - .16*dt);
  if(F.target < .01) F.target = 0;
  F.level += (F.target - F.level)*Math.min(1, dt*(F.level < F.target ? F.rise*1.6 : .5));
  if(!liquid && F.level > 0) F.target = 0;
  FX.flash = Math.max(0, FX.flash - dt*1.8);
  FX.shake *= Math.max(0, 1 - dt*6);
  FX.shimmer = Math.max(0, FX.shimmer - dt*.28);
  FX.swirls = FX.swirls.filter(s => t - s.t0 < s.dur);
  B.wave = Math.max(0, B.wave - dt*.9);
}

// ---------- drawing ----------
function beakerClip(ctx){
  const L = innerL() - 1, R = innerR() + 1;
  ctx.beginPath(); ctx.moveTo(L, G.top); ctx.lineTo(L, G.bot); ctx.ellipse(G.cx, G.bot, (R - L)/2, G.ry, 0, Math.PI, 0, true); ctx.lineTo(R, G.top); ctx.closePath();
}
function rgba(c, aMul){ return 'rgba(' + (c[0]|0) + ',' + (c[1]|0) + ',' + (c[2]|0) + ',' + Math.max(0, Math.min(1, c[3]*(aMul == null ? 1 : aMul))).toFixed(3) + ')'; }

function drawTripodBurner(ctx, t){
  // back leg
  ctx.strokeStyle = '#1f2529'; ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(450, 404); ctx.lineTo(452, 498); ctx.stroke();
  // burner
  ctx.fillStyle = '#2f373d'; ctx.beginPath(); ctx.ellipse(450, 503, 36, 8, 0, 0, 7); ctx.fill();
  const tube = ctx.createLinearGradient(439, 0, 461, 0); tube.addColorStop(0, '#6c757b'); tube.addColorStop(.35, '#c9d0d4'); tube.addColorStop(1, '#5d666c');
  ctx.fillStyle = tube; ctx.fillRect(440, 442, 20, 60);
  ctx.fillStyle = '#4d565d'; ctx.fillRect(436, 484, 28, 9);
  ctx.fillStyle = '#8e979d'; ctx.fillRect(438, 440, 24, 4);
  if(B.heat){
    const fl = 1 + .08*Math.sin(t*30) + .05*Math.sin(t*47);
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const glow = ctx.createRadialGradient(450, 424, 2, 450, 424, 34); glow.addColorStop(0, 'rgba(120,170,255,.45)'); glow.addColorStop(1, 'rgba(120,170,255,0)');
    ctx.fillStyle = glow; ctx.fillRect(410, 390, 80, 60);
    ctx.fillStyle = 'rgba(110,160,255,.55)'; ctx.beginPath(); ctx.moveTo(441, 441); ctx.quadraticCurveTo(438, 420, 450, 408 - 4*fl); ctx.quadraticCurveTo(462, 420, 459, 441); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(40,90,255,.8)'; ctx.beginPath(); ctx.moveTo(444, 441); ctx.quadraticCurveTo(444, 428, 450, 424 - 3*fl); ctx.quadraticCurveTo(456, 428, 456, 441); ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  // gauze + ring
  const hot = clamp01((B.temp - 60)/150)*(B.heat ? 1 : .6);
  ctx.fillStyle = '#7d878d'; ctx.beginPath(); ctx.moveTo(346, 404); ctx.lineTo(372, 398); ctx.lineTo(554, 398); ctx.lineTo(528, 410); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(40,48,54,.5)'; ctx.lineWidth = 1;
  for(let x = 360; x < 550; x += 9){ ctx.beginPath(); ctx.moveTo(x, 399); ctx.lineTo(x - 20, 409); ctx.stroke(); }
  ctx.fillStyle = '#d8d3c8'; ctx.beginPath(); ctx.ellipse(450, 404, 52, 5, 0, 0, 7); ctx.fill();
  if(hot > 0){ ctx.fillStyle = 'rgba(255,110,30,' + (.55*hot) + ')'; ctx.beginPath(); ctx.ellipse(450, 404, 36, 4, 0, 0, 7); ctx.fill(); }
  // front legs
  ctx.strokeStyle = '#2b3136'; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(372, 408); ctx.lineTo(346, 506); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(528, 408); ctx.lineTo(556, 506); ctx.stroke();
  ctx.strokeStyle = '#3a4248'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(450, 410, 82, 7, 0, 0, Math.PI); ctx.stroke();
}

function drawBeakerBack(ctx){
  const L = G.cx - G.hw, R = G.cx + G.hw;
  ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.fillRect(L, G.top, R - L, G.bot - G.top);
  ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.ellipse(G.cx, G.top, G.hw, G.ry, 0, Math.PI, Math.PI*2); ctx.stroke();
  ctx.strokeStyle = 'rgba(80,110,120,.25)'; ctx.beginPath(); ctx.ellipse(G.cx, G.bot, G.hw, G.ry, 0, Math.PI, Math.PI*2); ctx.stroke();
}
function drawBeakerFront(ctx){
  const L = G.cx - G.hw, R = G.cx + G.hw;
  // outline
  ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(70,95,105,.35)';
  ctx.beginPath(); ctx.moveTo(L, G.top); ctx.lineTo(L, G.bot); ctx.ellipse(G.cx, G.bot, G.hw, G.ry, 0, Math.PI, 0, true); ctx.lineTo(R, G.top); ctx.stroke();
  ctx.lineWidth = 1.6; ctx.strokeStyle = 'rgba(255,255,255,.9)';
  ctx.beginPath(); ctx.moveTo(L + 1, G.top); ctx.lineTo(L + 1, G.bot); ctx.stroke(); ctx.beginPath(); ctx.moveTo(R - 1, G.top); ctx.lineTo(R - 1, G.bot); ctx.stroke();
  // highlights
  const hl = ctx.createLinearGradient(L + 8, 0, L + 30, 0); hl.addColorStop(0, 'rgba(255,255,255,0)'); hl.addColorStop(.5, 'rgba(255,255,255,.42)'); hl.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = hl; ctx.fillRect(L + 8, G.top + 24, 22, G.bot - G.top - 44);
  ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(R - 18, G.top + 30, 4, G.bot - G.top - 70);
  // graduations
  ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = 1.6;
  ctx.font = '700 10px Nunito, sans-serif'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  ctx.shadowColor = 'rgba(20,40,50,.45)'; ctx.shadowBlur = 2;
  for(let k = 1; k <= 5; k++){
    const y = G.bot - k*G.unit; const long = k % 2 === 0;
    ctx.beginPath(); ctx.moveTo(G.cx + 30, y); ctx.lineTo(G.cx + (long ? 60 : 48), y); ctx.stroke();
    if(long) ctx.fillText(k*100 + ' mL', G.cx + 64, y);
  }
  ctx.shadowBlur = 0;
  // rim + spout
  ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.ellipse(G.cx, G.top, G.hw, G.ry, 0, 0, Math.PI); ctx.stroke();
  ctx.strokeStyle = 'rgba(70,95,105,.35)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.ellipse(G.cx, G.top, G.hw + 1.5, G.ry + 1.5, 0, 0, Math.PI); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(L + 2, G.top + 2); ctx.quadraticCurveTo(L - 10, G.top - 2, L - 14, G.top - 8); ctx.stroke();
}

function drawPiles(ctx, t){
  const dry = !waterPresent();
  const piles = B.items.filter(it => { const s = SPECIES[it.id]; if(s.st === 's') return true; return dry && (s.st === 'd' || (s.st === 'l' && it.id !== 'oil')) && !s.volatile; });
  const flat = piles.filter(p => p.id === 'caramel'); const heaps = piles.filter(p => p.id !== 'caramel');
  for(const p of flat){
    const g = ctx.createLinearGradient(0, G.bot - 10, 0, G.bot + 8); g.addColorStop(0, '#c7772a'); g.addColorStop(1, '#7a3c10');
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(G.cx, G.bot + 2, G.hw - 10, 11, 0, 0, 7); ctx.fill();
    ctx.fillStyle = 'rgba(255,230,180,.45)'; ctx.beginPath(); ctx.ellipse(G.cx - 30, G.bot - 2, 26, 3, 0, 0, 7); ctx.fill();
  }
  const n = heaps.length;
  heaps.forEach((p, i) => {
    const s = SPECIES[p.id]; let col = s.c || '#f3f3ef';
    if(dry && (s.st === 'd' || s.st === 'l')) col = s.c && s.a > .5 ? s.c : '#f1f1ec';
    const x = G.cx + (i - (n - 1)/2)*Math.min(64, 170/Math.max(1, n - 1 || 1)), by = G.bot + 5;
    const w = n > 2 ? 30 : 38, h = p.id === 'carbon' ? 26 : p.id === 'sand' ? 18 : 15;
    ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x - w, by);
    if(p.id === 'carbon'){ for(let k = 0; k <= 8; k++){ const xx = x - w + k*(2*w/8); ctx.lineTo(xx, by - h*Math.sin(k/8*Math.PI)*(0.75 + .25*Math.sin(k*2.3))); } }
    else ctx.quadraticCurveTo(x, by - h*2, x + w, by);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,.14)'; ctx.lineWidth = 1; ctx.stroke();
    // speckles
    let seed = p.uid*97;
    for(let k = 0; k < 14; k++){ seed = (seed*9301 + 49297) % 233280; const u = seed/233280; seed = (seed*9301 + 49297) % 233280; const v = seed/233280;
      const xx = x - w*.8 + u*w*1.6, top = by - h*2*(1 - Math.pow((xx - x)/w, 2))*.5; const yy = by - 2 - v*(by - top - 2);
      ctx.fillStyle = p.id === 'cuso4' ? 'rgba(160,215,255,.9)' : p.id === 'carbon' ? 'rgba(90,90,90,.7)' : 'rgba(255,255,255,.8)'; ctx.fillRect(xx, yy, 1.8, 1.8);
      ctx.fillStyle = 'rgba(0,0,0,.08)'; ctx.fillRect(xx + 1, yy + 1.5, 1.4, 1.4); }
  });
  // yeast specks suspended
  if(hasId('yeast') && !dry){
    const sy = surfY();
    for(let k = 0; k < 40; k++){ const x = G.cx - 90 + ((k*53) % 180) + Math.sin(t*.6 + k)*6; const y = sy + 10 + ((k*37) % Math.max(10, G.bot - sy - 14)) + Math.cos(t*.5 + k)*4; ctx.fillStyle = 'rgba(180,140,85,.8)'; ctx.fillRect(x, y, 2.2, 2.2); }
  }
}
function drawObjects(ctx, t){
  for(const it of B.items){
    const s = SPECIES[it.id]; if(s.st !== 'm') continue;
    if(it.id === 'fe' || it.id === 'fe_cu'){
      let col = '#8a9097';
      if(it.id === 'fe_cu'){ const k = clamp01((t - it.t)/8); const a = hexToRgb('#8a9097'), b = hexToRgb('#b8643a'); col = 'rgb(' + (lerp(a[0],b[0],k)|0) + ',' + (lerp(a[1],b[1],k)|0) + ',' + (lerp(a[2],b[2],k)|0) + ')'; }
      drawNail(ctx, G.cx - 46, G.bot - 4, G.cx + 34, G.bot - 168, col);
    } else if(it.id === 'mg') drawRibbon(ctx, OBJPOS.ribbon.x, OBJPOS.ribbon.y, 1);
    else if(it.id === 'chalk') drawChalk(ctx, OBJPOS.chalk.x, OBJPOS.chalk.y, 1);
    else if(it.id === 'na' || it.id === 'k') drawChunk(ctx, OBJPOS.chunk.x, OBJPOS.chunk.y, s.c, 1);
  }
  for(const o of FX.objs){ const k = 1 - clamp01((t - o.t0)/o.dur); if(o.obj === 'ribbon') drawRibbon(ctx, OBJPOS.ribbon.x, OBJPOS.ribbon.y, k); else if(o.obj === 'chalk') drawChalk(ctx, OBJPOS.chalk.x, OBJPOS.chalk.y, .25 + .75*k); else if(o.obj === 'foil') drawFoil(ctx, OBJPOS.foil.x, OBJPOS.foil.y, .2 + .8*k); else if(o.obj === 'wire') drawWire(ctx, OBJPOS.wire.x, OBJPOS.wire.y, .2 + .8*k); else if(o.obj === 'dryice') drawDryIce(ctx, OBJPOS.dryice.x, OBJPOS.dryice.y, .15 + .85*k); }
  drawObjects2(ctx, t);
  if(typeof drawLab3 === 'function') drawLab3(ctx, t, 'objects');
}
function drawNail(ctx, x1, y1, x2, y2, col){
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), a = Math.atan2(dy, dx);
  ctx.save(); ctx.translate(x1, y1); ctx.rotate(a);
  ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(14, -3.6); ctx.lineTo(len, -3.6); ctx.lineTo(len, 3.6); ctx.lineTo(14, 3.6); ctx.closePath(); ctx.fill();
  roundRect(ctx, len - 2, -10, 6, 20, 2); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.fillRect(16, -2.6, len - 20, 1.6);
  ctx.restore();
}
function drawRibbon(ctx, x, y, k){
  if(k <= .02) return;
  const pts = [[-44,6],[-30,-16],[-14,4],[2,-20],[18,2],[32,-14],[44,4]];
  const n = Math.max(2, Math.round(pts.length*k));
  ctx.save(); ctx.translate(x, y); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.strokeStyle = '#8c9298'; ctx.lineWidth = 7; ctx.beginPath(); pts.slice(0, n).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  ctx.strokeStyle = '#d6dadf'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
}
function drawChalk(ctx, x, y, k){
  const w = 64*k, h = 14*Math.max(.5, k);
  ctx.fillStyle = '#f2f0e8'; roundRect(ctx, x - w/2, y - h/2, w, h, h/2); ctx.fill();
  ctx.strokeStyle = '#cfcabb'; ctx.lineWidth = 1.2; ctx.stroke();
  ctx.fillStyle = 'rgba(0,0,0,.06)'; ctx.fillRect(x - w/2 + 4, y + 1, w - 8, 2);
}
function drawChunk(ctx, x, y, col, k){
  ctx.fillStyle = col; roundRect(ctx, x - 13*k, y - 9*k, 26*k, 18*k, 4*k); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(x - 9*k, y - 6*k, 10*k, 2.5*k);
  ctx.fillStyle = 'rgba(120,120,120,.5)'; ctx.fillRect(x + 2*k, y + 2*k, 7*k, 4*k);
}

function drawLiquid(ctx, t){
  const v = B.dispVol; if(v <= .02) return;
  const L = innerL(), R = innerR(), rx = (R - L)/2, sy = surfY();
  const c = B.disp || [207, 230, 255, .2];
  const water = waterPresent() || hasId('emul');
  const oilOnTop = hasId('oil') && water;
  const oilTh = oilOnTop ? Math.min(v, B.oilVol)*G.unit*.9 : 0;
  // body
  ctx.save();
  ctx.beginPath(); ctx.moveTo(L, sy); ctx.lineTo(L, G.bot); ctx.ellipse(G.cx, G.bot, rx, G.ry, 0, Math.PI, 0, true); ctx.lineTo(R, sy); ctx.ellipse(G.cx, sy, rx, G.ry*.85, 0, 0, Math.PI, false); ctx.closePath();
  const g = ctx.createLinearGradient(0, sy, 0, G.bot + G.ry);
  g.addColorStop(0, rgba([c[0], c[1], c[2], c[3]], .85)); g.addColorStop(1, rgba([c[0]*.8, c[1]*.8, c[2]*.85, Math.min(1, c[3] + .12)]));
  ctx.fillStyle = g; ctx.fill();
  ctx.clip();
  // precipitates
  for(const it of B.items){
    const s = SPECIES[it.id]; if(s.st !== 'p') continue;
    const age = t - it.t; const f1 = clamp01(age/1.2), f2 = easeOut((age - 1.5)/6);
    let P = FX.precip[it.uid]; if(!P){ P = FX.precip[it.uid] = []; for(let i = 0; i < 90; i++) P.push({u:Math.random(), v:Math.random(), r:rnd(1.2, 3)}); }
    const col = hexToRgb(s.c);
    ctx.fillStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + (.38*f1*(1 - f2)).toFixed(3) + ')'; ctx.fillRect(L, sy, R - L, G.bot - sy + G.ry);
    for(const q of P){ const x = L + 6 + q.u*(R - L - 12); const y0 = sy + 6 + q.v*(G.bot - sy - 8); const y = lerp(y0, G.bot - 3 - q.v*6, f2);
      ctx.fillStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + (.9*f1) + ')'; ctx.beginPath(); ctx.arc(x + Math.sin(t + q.u*9)*2*(1 - f2), y, q.r, 0, 7); ctx.fill();
      if(s.glitter && Math.sin(t*6 + q.u*40) > .82){ ctx.fillStyle = 'rgba(255,255,230,' + (.95*f1) + ')'; ctx.fillRect(x - 2.5, y - .6, 5, 1.2); ctx.fillRect(x - .6, y - 2.5, 1.2, 5); } }
    if(f2 > .2){ ctx.fillStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + (.95*f2) + ')'; ctx.beginPath(); ctx.ellipse(G.cx, G.bot + 3, rx, G.ry*.95, 0, 0, 7); ctx.fill(); ctx.fillRect(L, G.bot - 3*f2, R - L, 3*f2 + 1); }
  }
  // swirls
  for(const s of FX.swirls){ const k = (t - s.t0)/s.dur; ctx.strokeStyle = 'rgba(255,255,255,' + (.35*(1 - k)) + ')'; ctx.lineWidth = 2;
    for(let i = 0; i < 3; i++){ const yy = sy + (G.bot - sy)*(.3 + i*.22); ctx.beginPath(); ctx.ellipse(G.cx, yy, rx*.7, 7, 0, t*4 + i, t*4 + i + 2.2); ctx.stroke(); } }
  // crystals falling / grains
  for(const c2 of FX.crystals){ const k = 1 - c2.life/c2.max; ctx.save(); ctx.translate(c2.x, c2.y); ctx.rotate(c2.rot); ctx.fillStyle = c2.c; ctx.globalAlpha = k; ctx.fillRect(-c2.s*k/2, -c2.s*k/2, c2.s*k, c2.s*k); ctx.restore(); }
  for(const gr of FX.grains){ ctx.fillStyle = gr.c; ctx.fillRect(gr.x, gr.y, 2.4, 2.4); }
  // bubbles
  for(const b of FX.bubbles){
    if(b.oil){ ctx.fillStyle = 'rgba(240,196,63,.85)'; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 7); ctx.fill(); continue; }
    ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 7); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.fillRect(b.x - b.r*.45, b.y - b.r*.5, 1.4, 1.4);
  }
  // oil layer
  if(oilTh > 0){
    const og = ctx.createLinearGradient(0, sy, 0, sy + oilTh); og.addColorStop(0, 'rgba(246,206,72,.9)'); og.addColorStop(1, 'rgba(226,176,40,.85)');
    ctx.fillStyle = og; ctx.fillRect(L, sy - G.ry, R - L, oilTh + G.ry);
    ctx.strokeStyle = 'rgba(190,140,20,.5)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(G.cx, sy + oilTh, rx, G.ry*.85, 0, 0, Math.PI); ctx.stroke();
  }
  ctx.restore();
  // surface
  const top = oilTh > 0 ? [246, 212, 90, .95] : [Math.min(255, c[0] + 35), Math.min(255, c[1] + 30), Math.min(255, c[2] + 25), Math.min(1, c[3] + .12)];
  ctx.fillStyle = rgba(top); ctx.beginPath();
  const amp = B.wave*2.6 + (B.boiling ? 1.2 : 0) + (FX.skaters.length ? 1.3 : 0);
  for(let i = 0; i <= 40; i++){ const a = i/40*Math.PI*2; const x = G.cx + Math.cos(a)*rx; const y = sy + Math.sin(a)*G.ry*.85 + Math.sin(a*3 + t*7)*amp; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.ellipse(G.cx, sy, rx, G.ry*.85, 0, Math.PI*.1, Math.PI*.9); ctx.stroke();
}

function drawSkaters(ctx, t){
  const sy = surfY();
  for(const k of FX.skaters){
    const p = clamp01((t - k.t0)/k.dur); const r = 8*(1 - .6*p);
    const fl = 1 + .2*Math.sin(t*38) + .1*Math.sin(t*23);
    if(k.flame){ ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const gl = ctx.createRadialGradient(k.x, sy - 12, 1, k.x, sy - 12, 40); gl.addColorStop(0, hexA(k.flame, .6)); gl.addColorStop(1, hexA(k.flame, 0));
    ctx.fillStyle = gl; ctx.fillRect(k.x - 40, sy - 52, 80, 80);
    ctx.fillStyle = hexA(k.flame, .85); ctx.beginPath(); ctx.moveTo(k.x - 9, sy - 3); ctx.quadraticCurveTo(k.x - 11, sy - 18*fl, k.x, sy - 30*fl); ctx.quadraticCurveTo(k.x + 11, sy - 18*fl, k.x + 9, sy - 3); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,250,220,.9)'; ctx.beginPath(); ctx.ellipse(k.x, sy - 9, 4, 8*fl, 0, 0, 7); ctx.fill();
    ctx.restore(); }
    const g = ctx.createRadialGradient(k.x - r*.4, sy - 2 - r*.4, 1, k.x, sy - 2, r); g.addColorStop(0, '#ffffff'); g.addColorStop(1, k.color);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(k.x, sy - 2, r, 0, 7); ctx.fill();
  }
}
function hexA(hex, a){ const c = hexToRgb(hex); return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }

function drawFoam(ctx, t){
  const F = FX.foam; if(F.level < .01 || B.dispVol <= .02) return;
  const sy = surfY(), L = innerL(), R = innerR();
  const topY = sy - F.level*120; const over = Math.max(0, G.top - topY);
  if(!FX.foamBlobs){ FX.foamBlobs = []; for(let i = 0; i < 260; i++) FX.foamBlobs.push({u:Math.random(), v:Math.pow(Math.random(), .8), r:rnd(5, 13), p:rnd(0, 6)}); }
  const col = F.color, dark = shadeHex(col, -.12);
  const bulge = Math.min(40, over*.18);
  const drawBlob = (x, y, r) => { ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); };
  // drips outside
  if(over > 4){
    ctx.fillStyle = dark; ctx.strokeStyle = col;
    const drips = [[G.cx - G.hw - 6, 1], [G.cx + G.hw + 6, 1.2], [G.cx - 40, .8], [G.cx + 50, .9], [G.cx - G.hw + 20, .7], [G.cx + G.hw - 24, 1.05]];
    for(const d of drips){ const len = Math.min(G.bot + 90 - G.top, over*1.6*d[1]); ctx.lineCap = 'round'; ctx.lineWidth = 16; ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(d[0], G.top); ctx.lineTo(d[0] + Math.sin(d[1]*9)*6, G.top + len); ctx.stroke(); ctx.fillStyle = col; drawBlob(d[0] + Math.sin(d[1]*9)*6, G.top + len, 11); }
    if(over > 60){ const pw = Math.min(170, over*.9); ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(G.cx, 508, pw, 9, 0, 0, 7); ctx.fill(); }
  }
  // inside column + above rim
  for(const b of FX.foamBlobs){
    const y = sy - b.v*(sy - topY);
    const wide = y < G.top ? bulge*(1 - (G.top - y)/Math.max(1, over)) + 6 : 0;
    const x = L - wide + b.u*(R - L + wide*2) + Math.sin(t*1.5 + b.p)*1.5;
    const r = b.r*(y < G.top ? 1.3 : 1);
    ctx.fillStyle = dark; drawBlob(x + 1.5, y + 2, r);
    ctx.fillStyle = col; drawBlob(x, y, r);
  }
  ctx.fillStyle = 'rgba(255,255,255,.7)';
  for(let i = 0; i < 30; i++){ const b = FX.foamBlobs[i]; const y = sy - b.v*(sy - topY); ctx.fillRect(L + b.u*(R - L) - 2, y - b.r*.5, 3, 3); }
}
function shadeHex(hex, amt){ return shade(hex, amt); }

function drawPour(ctx, t){
  const a = ANIM.cur; if(!a) return; const e = t - a.t0; const s = SPECIES[a.id];
  const sy = B.dispVol > .02 ? surfY() : G.bot - 4;
  if(a.kind === 'pour'){
    const inP = easeOut(e/.35), outP = clamp01((e - 1.4)/.35);
    let ang = 0; if(e > .35) ang = -2.05*easeOut((e - .35)/.25); if(e > 1.3) ang = -2.05*(1 - easeOut((e - 1.3)/.3));
    const mx = lerp(700, 548, inP) + outP*140, my = lerp(96, 136, inP) - outP*30;
    ctx.save(); ctx.globalAlpha = 1 - outP;
    if(e > .56 && e < 1.42){
      const k = clamp01((e - .56)/.08)*(1 - clamp01((e - 1.3)/.12));
      const col = s.c && s.a > .3 ? hexA(s.c, .9) : 'rgba(205,228,250,.85)';
      ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineWidth = 6*k + 1;
      ctx.beginPath(); ctx.moveTo(mx - 4, my + 2); ctx.bezierCurveTo(mx - 16, my + 20, mx - 26, my + 50, mx - 30, sy); ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 1.5; ctx.stroke();
      if(Math.random() < .5) FX.drops.push({x:mx - 30 + rnd(-6, 6), y:sy - 2, vx:rnd(-60, 60), vy:rnd(-160, -60), life:.3, c:col});
      B.wave = Math.max(B.wave, .6);
    }
    drawBottle(ctx, mx, my, ang, s);
    ctx.restore();
  } else if(a.kind === 'spoon'){
    const inP = easeOut(e/.35), outP = clamp01((e - 1.15)/.35);
    const tx = lerp(640, 470, inP) + outP*160, ty = lerp(110, 146, inP) - outP*20;
    let ang = 0; if(e > .35) ang = -.6*easeOut((e - .35)/.25); if(e > 1.0) ang = -.6*(1 - easeOut((e - 1.0)/.25));
    const dump = clamp01((e - .5)/.45);
    if(e > .5 && e < 1.0){ for(let i = 0; i < 3; i++) FX.grains.push({x:tx + rnd(-4, 10), y:ty + 4, vy:rnd(140, 240), c:s.c === '#ffffff' ? '#fbfbfb' : s.c}); }
    ctx.save(); ctx.globalAlpha = 1 - outP; ctx.translate(tx, ty); ctx.rotate(ang);
    ctx.strokeStyle = '#8f989e'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(44, -2); ctx.lineTo(170, -58); ctx.stroke();
    ctx.strokeStyle = '#d7dde1'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#b8c0c5'; roundRect(ctx, -4, -4, 52, 9, 4); ctx.fill();
    if(dump < 1){ ctx.fillStyle = s.c; ctx.beginPath(); ctx.ellipse(22, -6, 20*(1 - dump) + 2, 9*(1 - dump) + 1, 0, Math.PI, 0); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.12)'; ctx.lineWidth = 1; ctx.stroke(); }
    ctx.restore();
    // grains drawn outside liquid too
    ctx.fillStyle = s.c === '#ffffff' ? '#f4f4f4' : s.c;
  } else {
    const target = B.dispVol > .02 ? sy : G.bot - 10;
    const p = clamp01(e/.62); const y = lerp(40, target, p*p);
    if(e < .62){
      ctx.save();
      if(s.icon === 'nail') drawNail(ctx, G.cx - 60, y + 40, G.cx + 10, y - 60, s.c);
      else if(s.icon === 'ribbon') drawRibbon(ctx, G.cx - 10, y, 1);
      else if(s.icon === 'chalk') drawChalk(ctx, G.cx + 10, y, 1);
      else if(s.icon === 'foil') drawFoil(ctx, G.cx + 10, y, 1);
      else if(s.icon === 'wire') drawWire(ctx, G.cx - 20, y - 50, 1);
      else if(s.icon === 'candy') drawCandies(ctx, G.cx - 20, y);
      else drawChunk(ctx, G.cx - 10, y, s.c, 1);
      ctx.restore();
    } else if(!a.splashed){
      a.splashed = true;
      if(B.dispVol > .02){ const col = B.disp ? rgba(B.disp, 1.2) : 'rgba(205,228,250,.9)'; for(let i = 0; i < 16; i++) FX.drops.push({x:G.cx - 10 + rnd(-10, 10), y:sy - 2, vx:rnd(-120, 120), vy:rnd(-260, -120), life:0, c:col}); B.wave = 1.2; }
    }
  }
}
function drawBottle(ctx, x, y, ang, s){
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
  const brown = s.icon === 'brown';
  const path = () => { ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(-8, 14); ctx.quadraticCurveTo(-27, 18, -27, 32); ctx.lineTo(-27, 98); ctx.quadraticCurveTo(-27, 106, -19, 106); ctx.lineTo(19, 106); ctx.quadraticCurveTo(27, 106, 27, 98); ctx.lineTo(27, 32); ctx.quadraticCurveTo(27, 18, 8, 14); ctx.lineTo(8, 0); ctx.closePath(); };
  path(); ctx.fillStyle = brown ? 'rgba(122,74,28,.9)' : 'rgba(220,238,246,.75)'; ctx.fill();
  ctx.save(); path(); ctx.clip();
  // liquid stays level in world space
  ctx.rotate(-ang);
  const cw = [-Math.sin(ang)*60, Math.cos(ang)*60];
  const lvl = cw[1] - 8;
  ctx.fillStyle = s.c && s.a > .25 ? hexA(s.c, .85) : 'rgba(190,220,245,.55)';
  ctx.fillRect(-160, lvl, 320, 200);
  ctx.restore();
  ctx.strokeStyle = brown ? 'rgba(70,40,12,.8)' : 'rgba(255,255,255,.95)'; ctx.lineWidth = 2; path(); ctx.stroke();
  ctx.fillStyle = '#fbfbf7'; roundRect(ctx, -22, 50, 44, 28, 3); ctx.fill();
  ctx.fillStyle = '#16252E'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const lbl = s.f && s.f.length <= 9 ? s.f : nm(s.id).split(' ')[0];
  ctx.font = (s.f && s.f.length <= 9 ? '500 ' + (lbl.length > 6 ? 9 : 12) + 'px "IBM Plex Mono", monospace' : '800 9px Nunito, sans-serif'); ctx.fillText(lbl, 0, 64);
  ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.fillRect(-21, 26, 4, 66);
  ctx.restore();
}

function drawTopParticles(ctx){
  for(const p of FX.puffs){ const k = p.life/p.max; ctx.fillStyle = 'rgba(' + p.c + ',' + (p.a*(1 - k)*(k < .15 ? k/.15 : 1)).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill(); }
  for(const s of FX.sparks){ const k = 1 - s.life/s.max; ctx.strokeStyle = hexA(s.c, k); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx*.02, s.y - s.vy*.02); ctx.stroke(); }
  for(const d of FX.drops){ ctx.fillStyle = d.c; ctx.beginPath(); ctx.arc(d.x, d.y, 2.2, 0, 7); ctx.fill(); }
  for(const g of FX.grains){ if(g.y < surfY()){ ctx.fillStyle = g.c; ctx.fillRect(g.x, g.y, 2.4, 2.4); } }
}
function drawBurnAndGlow(ctx, t){
  if(FX.burn){
    const e = t - FX.burn.t0, k = Math.sin(clamp01(e/FX.burn.dur)*Math.PI);
    const x = OBJPOS.ribbon.x, y = G.bot - 20, r = 40 + 18*k + 6*Math.sin(t*50);
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const g = ctx.createRadialGradient(x, y, 2, x, y, r*3); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.25, 'rgba(235,240,255,.7)'); g.addColorStop(1, 'rgba(200,210,255,0)');
    ctx.fillStyle = g; ctx.fillRect(x - r*3, y - r*3, r*6, r*6);
    ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 2;
    for(let i = 0; i < 12; i++){ const a = i/12*Math.PI*2 + t*2; ctx.beginPath(); ctx.moveTo(x + Math.cos(a)*r*.6, y + Math.sin(a)*r*.6); ctx.lineTo(x + Math.cos(a)*r*1.8, y + Math.sin(a)*r*1.8); ctx.stroke(); }
    ctx.restore();
  }
  if(FX.shimmer > 0){
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const g = ctx.createRadialGradient(G.cx, G.bot - 60, 20, G.cx, G.bot - 60, 190); g.addColorStop(0, 'rgba(255,140,40,' + (.22*FX.shimmer) + ')'); g.addColorStop(1, 'rgba(255,140,40,0)');
    ctx.fillStyle = g; ctx.fillRect(G.cx - 200, G.bot - 260, 400, 400); ctx.restore();
  }
  if(B.temp > 60){ // heat haze glow on glass
    const k = clamp01((B.temp - 60)/200);
    ctx.fillStyle = 'rgba(255,120,40,' + (.10*k) + ')'; ctx.fillRect(G.cx - G.hw, G.bot - 40, G.hw*2, 40);
  }
}
function drawClockHands(ctx){
  const d = new Date(); const h = d.getHours()%12 + d.getMinutes()/60, m = d.getMinutes() + d.getSeconds()/60, s = d.getSeconds();
  ctx.save(); ctx.translate(640, 104); ctx.strokeStyle = '#16252E'; ctx.lineCap = 'round';
  const hand = (a, len, w) => { ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.sin(a)*len, -Math.cos(a)*len); ctx.stroke(); };
  hand(h/12*Math.PI*2, 20, 4); hand(m/60*Math.PI*2, 29, 3); ctx.strokeStyle = '#E9821C'; hand(s/60*Math.PI*2, 31, 1.5);
  ctx.fillStyle = '#16252E'; ctx.beginPath(); ctx.arc(0, 0, 3.5, 0, 7); ctx.fill(); ctx.restore();
}

function drawScene(t){
  const ctx = SC.ctx; if(!SC.pw) return;
  if(!SC.bg) buildBG();
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(SC.bg, 0, 0);
  setT(ctx);
  if(FX.shake > .3) ctx.translate(rnd(-FX.shake, FX.shake), rnd(-FX.shake, FX.shake));
  drawClockHands(ctx);
  drawTripodBurner(ctx, t);
  drawBeakerBack(ctx);
  ctx.save(); beakerClip(ctx); ctx.clip(); drawPiles(ctx, t); drawObjects(ctx, t); ctx.restore();
  drawLiquid(ctx, t);
  drawLiquid2(ctx, t);
  drawSkaters(ctx, t);
  if(FX.stir){ const e = t - FX.stir; if(e > 2.2) FX.stir = null; else { const a = e*7; const x = G.cx + Math.cos(a)*50, y = Math.max(surfY(), G.top + 40) + 30; ctx.strokeStyle = 'rgba(230,242,248,.9)'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y + Math.sin(a)*6); ctx.lineTo(x + 70, G.top - 70); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 1.5; ctx.stroke(); } }
  drawBeakerFront(ctx);
  drawFront2(ctx, t);
  drawFoam(ctx, t);
  drawTopParticles(ctx);
  drawPour(ctx, t);
  drawBurnAndGlow(ctx, t);
  drawTop2(ctx, t);
  if(typeof drawLab3 === 'function') drawLab3(ctx, t, 'top');
  if(FX.flash > 0){ ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = hexA(FX.flashColor, Math.min(.85, FX.flash)); ctx.fillRect(0, 0, SC.pw, SC.ph); }
}

// ===================== v2: spectacular reactions =====================
// shelf groups for existing items
const GRP_OF = {water:'basic', salt:'basic', sugar:'basic', sand:'basic', oil:'basic', vinegar:'kitchen', lemon:'kitchen', soda:'kitchen', soap:'kitchen',
  cabbage:'dye', chalk:'kitchen', fe:'metal', yeast:'kitchen', h2o2:'kitchen', mg:'metal', hcl:'acid', naoh:'acid', cuso4:'salt', agno3:'salt', na:'metal', k:'metal'};
for(const id in GRP_OF) SPECIES[id].grp = GRP_OF[id];
const GROUPS = [
  ['basic', L('Basics','De bază')], ['kitchen', L('Kitchen','Bucătărie')], ['fun', L('Party tricks','Trucuri spectaculoase')],
  ['dye', L('Colours & indicators','Culori și indicatori')], ['acid', L('Acids & bases','Acizi și baze')], ['salt', L('Salts & crystals','Săruri și cristale')], ['metal', L('Metals','Metale')]
];
const D = (en, ro) => ({en, ro});
Object.assign(SPECIES, {
  li:{n:L('Lithium','Litiu'), f:'Li', st:'m', c:'#c9ced4', shelf:1, cat:'lab', icon:'chunk', grp:'metal', desc:D('The lightest metal of all. It is so light it floats on oil.','Cel mai ușor metal dintre toate. Este atât de ușor încât plutește pe ulei.')},
  cs:{n:L('Caesium','Cesiu'), f:'Cs', st:'m', c:'#e3c96a', shelf:1, cat:'lab', icon:'ampoule', grp:'metal', desc:D('A soft, golden metal that melts in a warm hand. It is kept sealed in glass.','Un metal moale, auriu, care se topește în palmă. Se păstrează închis în sticlă.')},
  al:{n:L('Aluminium','Aluminiu'), art:L('the aluminium','aluminiul'), f:'Al', st:'m', c:'#d7dbe0', shelf:1, cat:'home', icon:'foil', grp:'metal', desc:D('Kitchen foil. A reactive metal hidden under a thin protective skin of oxide.','Folie de bucătărie. Un metal reactiv, ascuns sub o piele subțire de oxid care îl protejează.')},
  cu:{n:L('Copper wire','Sârmă de cupru'), f:'Cu', st:'m', c:'#c8743a', shelf:1, cat:'home', icon:'wire', grp:'metal', desc:D('A coil of reddish copper, the metal inside electric cables.','Un colac de cupru roșiatic, metalul din cablurile electrice.')},
  fe2o3:{n:L('Iron oxide (rust)','Oxid de fier (rugină)'), f:'Fe₂O₃', st:'s', c:'#9b3d1c', shelf:1, cat:'home', icon:'jar', grp:'salt', desc:D('Red-brown rust powder: iron that has joined with oxygen.','Pulbere roșie-maro de rugină: fier care s-a unit cu oxigenul.')},
  kmno4:{n:L('Potassium permanganate','Permanganat de potasiu'), art:L('the permanganate','permanganatul'), f:'KMnO₄', st:'s', c:'#4b0f55', shelf:1, cat:'lab', icon:'jar', grp:'salt', desc:D('Dark purple crystals. A tiny pinch colours a whole bucket of water.','Cristale mov închis. Un vârf de cuțit colorează o găleată întreagă de apă.')},
  glycerol:{n:L('Glycerin','Glicerină'), f:'C₃H₈O₃', st:'l', c:'#f1f5f7', a:.22, aq:1, vol:1, shelf:1, cat:'adult', icon:'bottle', grp:'kitchen', desc:D('A thick, sweet, clear liquid used in soaps and creams.','Un lichid gros, dulceag și limpede, folosit în săpunuri și creme.')},
  glucose:{n:L('Glucose','Glucoză'), f:'C₆H₁₂O₆', st:'s', c:'#fbfaf3', shelf:1, cat:'home', icon:'jar', grp:'kitchen', desc:D('The sugar your body uses for energy.','Zahărul pe care corpul tău îl folosește pentru energie.')},
  indigo:{n:L('Indigo carmine dye','Colorant indigo carmin'), f:'', st:'l', c:'#1f3fbf', a:.82, aq:1, vol:1, shelf:1, cat:'home', icon:'bottle', grp:'dye', desc:D('A blue food colouring (E132) that changes colour when it gains or loses electrons.','Un colorant alimentar albastru (E132) care își schimbă culoarea când primește sau pierde electroni.')},
  ki:{n:L('Potassium iodide','Iodură de potasiu'), f:'KI', st:'s', c:'#fbfbf8', shelf:1, cat:'adult', icon:'jar', grp:'salt', desc:D('White crystals, the iodine in iodised salt.','Cristale albe, iodul din sarea iodată.')},
  pbno3:{n:L('Lead nitrate','Azotat de plumb'), f:'Pb(NO₃)₂', st:'l', c:'#f5f6fa', a:.12, aq:1, vol:1, shelf:1, cat:'lab', icon:'brown', grp:'salt', desc:D('A clear, poisonous solution containing lead.','O soluție limpede și otrăvitoare care conține plumb.')},
  fecl3:{n:L('Iron(III) chloride','Clorură de fier(III)'), f:'FeCl₃', st:'l', c:'#d9941e', a:.6, ph:-2, aq:1, vol:1, shelf:1, cat:'lab', icon:'bottle', grp:'salt', desc:D('An orange-yellow solution used to etch circuit boards.','O soluție galben-portocalie folosită la corodarea plăcilor de circuite.')},
  kscn:{n:L('Potassium thiocyanate','Tiocianat de potasiu'), f:'KSCN', st:'s', c:'#fbfbf8', shelf:1, cat:'lab', icon:'jar', grp:'salt', desc:D('White crystals that are a detective for iron.','Cristale albe care sunt un detectiv pentru fier.')},
  silicate:{n:L('Water glass','Sticlă solubilă'), f:'Na₂SiO₃', st:'l', c:'#eef4f2', a:.28, ph:4, aq:1, vol:1, shelf:1, cat:'adult', icon:'bottle', grp:'salt', desc:D('Sodium silicate: “liquid glass”, a thick syrupy solution.','Silicat de sodiu: „sticlă lichidă”, o soluție groasă ca siropul.')},
  cocl2:{n:L('Cobalt chloride','Clorură de cobalt'), f:'CoCl₂·6H₂O', st:'s', c:'#c2386e', shelf:1, cat:'lab', icon:'jar', grp:'salt', desc:D('Pink-red crystals that turn blue when they dry out.','Cristale roz-roșii care devin albastre când se usucă.')},
  cucl2:{n:L('Copper chloride','Clorură de cupru'), f:'CuCl₂', st:'s', c:'#2fa38a', shelf:1, cat:'lab', icon:'jar', grp:'salt', desc:D('Blue-green crystals containing copper.','Cristale albastru-verzui care conțin cupru.')},
  licl:{n:L('Lithium chloride','Clorură de litiu'), f:'LiCl', st:'s', c:'#fbfbf8', shelf:1, cat:'lab', icon:'jar', grp:'salt', desc:D('A white salt of lithium. Watch it in a flame!','O sare albă de litiu. Privește-o într-o flacără!')},
  srcl2:{n:L('Strontium chloride','Clorură de stronțiu'), f:'SrCl₂', st:'s', c:'#fbfbf8', shelf:1, cat:'lab', icon:'jar', grp:'salt', desc:D('A white salt used to make red fireworks.','O sare albă folosită pentru artificiile roșii.')},
  cacl2s:{n:L('Calcium chloride','Clorură de calciu'), f:'CaCl₂', st:'s', c:'#fbfbf8', shelf:1, cat:'home', icon:'jar', grp:'salt', desc:D('White flakes spread on icy roads in winter.','Fulgi albi care se împrăștie iarna pe drumurile cu gheață.')},
  nh4no3:{n:L('Cold pack crystals','Cristale pentru pungă rece'), f:'NH₄NO₃', st:'s', c:'#fbfbf8', shelf:1, cat:'adult', icon:'jar', grp:'salt', desc:D('Ammonium nitrate, the crystals inside instant cold packs.','Azotat de amoniu, cristalele din pungile reci instant.')},
  cola:{n:L('Cola','Cola'), f:'H₃PO₄ + CO₂', st:'l', c:'#4a2310', a:.9, ph:-4.5, aq:1, vol:1, volatile:1, shelf:1, cat:'home', icon:'bottle', grp:'fun', desc:D('A fizzy drink full of dissolved carbon dioxide gas.','O băutură acidulată plină de dioxid de carbon dizolvat.')},
  mentos:{n:L('Mint candies','Bomboane mentosate'), f:'', st:'m', c:'#f4f2ea', shelf:1, cat:'home', icon:'candy', grp:'fun', desc:D('Chalky mint candies with a very bumpy surface.','Bomboane mentosate cretoase, cu o suprafață foarte zgrunțuroasă.')},
  milk:{n:L('Milk','Lapte'), f:'', st:'l', c:'#fbfbf5', a:.95, aq:1, vol:1, volatile:1, shelf:1, cat:'home', icon:'bottle', grp:'kitchen', desc:D('Water with tiny drops of fat and protein floating in it.','Apă în care plutesc picături minuscule de grăsime și proteine.')},
  foodcolor:{n:L('Food colouring','Colorant alimentar'), f:'', st:'l', c:'#e23a6e', a:.5, aq:1, shelf:1, cat:'home', icon:'dropper', grp:'dye', desc:D('A few drops of bright colour.','Câteva picături de culoare vie.')},
  dryice:{n:L('Dry ice','Gheață carbonică'), f:'CO₂(s)', st:'s', c:'#eef4f6', shelf:1, cat:'adult', icon:'jar', grp:'fun', desc:D('Frozen carbon dioxide at −78 °C. Never touch it with bare hands!','Dioxid de carbon înghețat la −78 °C. Nu-l atinge niciodată cu mâna goală!')},
  glue:{n:L('PVA glue','Aracet'), f:'PVA', st:'l', c:'#f7f7f2', a:.9, aq:1, vol:1, shelf:1, cat:'home', icon:'bottle', grp:'fun', desc:D('White school glue made of long chain molecules called polymers.','Lipici alb făcut din molecule lungi ca niște lanțuri, numite polimeri.')},
  borax:{n:L('Borax solution','Soluție de borax'), f:'Na₂B₄O₇', st:'l', c:'#f2f6fa', a:.15, ph:2.5, aq:1, vol:1, shelf:1, cat:'adult', icon:'bottle', grp:'fun', desc:D('A cleaning powder dissolved in water.','O pulbere de curățat dizolvată în apă.')},
  snowpow:{n:L('Instant snow powder','Pulbere de zăpadă instant'), f:'(C₃H₃NaO₂)ₙ', st:'s', c:'#ffffff', shelf:1, cat:'home', icon:'jar', grp:'fun', desc:D('Sodium polyacrylate, the super-absorber inside nappies.','Poliacrilat de sodiu, super-absorbantul din scutece.')},
  hotice:{n:L('Hot ice liquid','Lichid „gheață fierbinte”'), f:'CH₃COONa(aq)', st:'l', c:'#f6f7fb', a:.15, ph:1, aq:1, vol:1, shelf:1, cat:'home', icon:'bottle', grp:'fun', desc:D('A supersaturated sodium acetate solution: it holds more than it should.','O soluție suprasaturată de acetat de sodiu: conține mai mult decât ar trebui.')},
  naacs:{n:L('Sodium acetate crystal','Cristal de acetat de sodiu'), f:'CH₃COONa·3H₂O', st:'s', c:'#fbfbf8', shelf:1, cat:'home', icon:'jar', grp:'fun', desc:D('One tiny seed crystal. It can start something big.','Un singur cristal-sămânță. Poate porni ceva mare.')},
  h2so4:{n:L('Sulfuric acid (concentrated)','Acid sulfuric (concentrat)'), f:'H₂SO₄', st:'l', c:'#f4f4ee', a:.15, ph:-7, aq:1, vol:1, acid:1, shelf:1, cat:'lab', icon:'bottle', grp:'acid', desc:D('A very strong, thick acid that grabs water from anything it touches.','Un acid foarte tare și vâscos, care smulge apa din orice atinge.')},
  hno3c:{n:L('Nitric acid (concentrated)','Acid azotic (concentrat)'), f:'HNO₃', st:'l', c:'#f7f3dc', a:.2, ph:-7, aq:1, vol:1, volatile:1, acid:1, shelf:1, cat:'lab', icon:'brown', grp:'acid', desc:D('A strong acid that can even dissolve copper.','Un acid tare care poate dizolva chiar și cuprul.')},
  ammonia:{n:L('Ammonia solution','Soluție de amoniac'), f:'NH₃(aq)', st:'l', c:'#f2f7fb', a:.12, ph:4, aq:1, vol:1, volatile:1, base:1, shelf:1, cat:'adult', icon:'bottle', grp:'acid', desc:D('A smelly base used in glass cleaners.','O bază cu miros puternic, folosită în soluțiile pentru geamuri.')},
  luminol:{n:L('Luminol solution','Soluție de luminol'), f:'C₈H₇N₃O₂', st:'l', c:'#f4f7fa', a:.15, ph:3, aq:1, vol:1, shelf:1, cat:'lab', icon:'brown', grp:'dye', desc:D('A chemical that can glow in the dark. Detectives use it.','O substanță care poate străluci în întuneric. Detectivii o folosesc.')},
  vitc:{n:L('Vitamin C drink','Băutură cu vitamina C'), f:'C₆H₈O₆', st:'l', c:'#fff1bf', a:.32, ph:-2, aq:1, vol:1, volatile:1, shelf:1, cat:'home', icon:'bottle', grp:'kitchen', desc:D('A vitamin C tablet dissolved in water.','O tabletă de vitamina C dizolvată în apă.')},
  starch:{n:L('Starch water','Apă cu amidon'), f:'(C₆H₁₀O₅)ₙ', st:'l', c:'#f3f3ec', a:.45, aq:1, vol:1, volatile:1, shelf:1, cat:'home', icon:'bottle', grp:'kitchen', desc:D('Water with a spoon of corn starch stirred in.','Apă în care s-a amestecat o lingură de amidon de porumb.')},
  iodine:{n:L('Iodine tincture','Tinctură de iod'), f:'I₂', st:'l', c:'#7a3b0e', a:.8, aq:1, vol:1, volatile:1, shelf:1, cat:'adult', icon:'brown', grp:'dye', desc:D('A brown antiseptic from the first-aid kit.','Un antiseptic maro din trusa de prim ajutor.')},

  // products
  lioh:{n:L('lithium hydroxide','hidroxid de litiu'), f:'LiOH', st:'d', ph:5.5, base:1},
  csoh:{n:L('caesium hydroxide','hidroxid de cesiu'), f:'CsOH', st:'d', ph:6.5, base:1},
  kmno4aq:{n:L('permanganate (dissolved)','permanganat (dizolvat)'), f:'MnO₄⁻', st:'d', c:'#6a1478', a:.92, res:'kmno4'},
  chameleon:{n:L('manganese dioxide','dioxid de mangan'), f:'MnO₂', st:'d', c:'#b0762a', a:.85},
  glucoseaq:{n:L('glucose (dissolved)','glucoză (dizolvată)'), f:'C₆H₁₂O₆(aq)', st:'d', res:'glucose'},
  gluconate:{n:L('gluconate','gluconat'), f:'C₆H₁₁O₇⁻', st:'d'},
  traffic:{n:L('indigo carmine (changing)','indigo carmin (în schimbare)'), f:'', st:'d', c:'#d6aa1c', a:.85},
  kiaq:{n:L('potassium iodide (dissolved)','iodură de potasiu (dizolvată)'), f:'K⁺ + I⁻', st:'d', res:'ki'},
  pbi2:{n:L('lead iodide','iodură de plumb'), f:'PbI₂', st:'p', c:'#f6c21b', glitter:1},
  agi:{n:L('silver iodide','iodură de argint'), f:'AgI', st:'p', c:'#efe29a'},
  feoh3:{n:L('iron(III) hydroxide','hidroxid de fier(III)'), f:'Fe(OH)₃', st:'p', c:'#9a4518'},
  fescn:{n:L('iron thiocyanate','tiocianat de fier'), f:'[Fe(SCN)]²⁺', st:'d', c:'#8e0b12', a:.95},
  cocl2aq:{n:L('cobalt chloride (dissolved)','clorură de cobalt (dizolvată)'), f:'Co²⁺ + Cl⁻', st:'d', c:'#e0709a', a:.6, res:'cocl2'},
  cocl2b:{n:L('blue cobalt chloride','clorură de cobalt albastră'), f:'CoCl₂', st:'s', c:'#2c46c8'},
  cucl2aq:{n:L('copper chloride (dissolved)','clorură de cupru (dizolvată)'), f:'Cu²⁺ + Cl⁻', st:'d', c:'#2d9ab0', a:.6, res:'cucl2'},
  garden_cu:{n:L('copper silicate garden','grădină de silicat de cupru'), f:'CuSiO₃', st:'m', c:'#2f86d6'},
  garden_co:{n:L('cobalt silicate garden','grădină de silicat de cobalt'), f:'CoSiO₃', st:'m', c:'#8a3a9a'},
  garden_ca:{n:L('calcium silicate garden','grădină de silicat de calciu'), f:'CaSiO₃', st:'m', c:'#f2f2ea'},
  h2co3:{n:L('carbonic acid','acid carbonic'), f:'H₂CO₃', st:'d', ph:-2.5, acid:1, volatile:1},
  slime:{n:L('slime','slime'), f:'PVA–borate', st:'d', c:'#7fd89a', a:.93},
  snow:{n:L('instant snow','zăpadă instant'), f:'', st:'m', c:'#ffffff'},
  hoticesolid:{n:L('sodium acetate crystals','cristale de acetat de sodiu'), f:'CH₃COONa·3H₂O', st:'m', c:'#fbfbf8'},
  nh4no3aq:{n:L('ammonium nitrate (dissolved)','azotat de amoniu (dizolvat)'), f:'NH₄⁺ + NO₃⁻', st:'d', ph:-1.5},
  caco3p:{n:L('chalk (calcium carbonate)','cretă (carbonat de calciu)'), f:'CaCO₃', st:'p', c:'#fbfbf5'},
  alcl3:{n:L('aluminium salt','sare de aluminiu'), f:'Al³⁺', st:'d', ph:-1},
  cuppt:{n:L('copper (spongy)','cupru (spongios)'), f:'Cu', st:'p', c:'#a5532a'},
  cu2aq:{n:L('copper nitrate','azotat de cupru'), f:'Cu(NO₃)₂', st:'d', c:'#3a8fd8', a:.55},
  cuno3g:{n:L('copper nitrate','azotat de cupru'), f:'Cu(NO₃)₂', st:'d', c:'#1f9a8c', a:.75},
  agtree:{n:L('silver crystals','cristale de argint'), f:'Ag', st:'m', c:'#dfe3e8'},
  agmirror:{n:L('silver (mirror)','argint (oglindă)'), f:'Ag', st:'m', c:'#dfe3e8'},
  cuamm:{n:L('copper–ammonia complex','complex cupru–amoniac'), f:'[Cu(NH₃)₄]²⁺', st:'d', c:'#1b2bb8', a:.93},
  lumspent:{n:L('used luminol','luminol consumat'), f:'', st:'d'},
  moltenfe:{n:L('iron (molten)','fier (topit)'), f:'Fe', st:'m', c:'#6d6f73'},
  al2o3:{n:L('aluminium oxide','oxid de aluminiu'), f:'Al₂O₃', st:'s', c:'#f2efe8'},
  carbonsnake:{n:L('carbon','carbon'), f:'C', st:'m', c:'#1e1b19'},
  ash:{n:L('ash','cenușă'), f:'', st:'s', c:'#4d4033'},
  magicmilk:{n:L('soapy colourful milk','lapte colorat cu săpun'), f:'', st:'d'},
  curd:{n:L('curds (casein)','cheag (cazeină)'), f:'', st:'p', c:'#fbfbf0'},
  iodstarch:{n:L('starch–iodine complex','complex amidon–iod'), f:'', st:'d', c:'#161c44', a:.95},
  iodide:{n:L('iodide (colourless)','iodură (incoloră)'), f:'I⁻', st:'d'},
  no2:{n:L('nitrogen dioxide (brown gas)','dioxid de azot (gaz brun)'), f:'NO₂', st:'g'},
  liclaq:{n:L('lithium chloride (dissolved)','clorură de litiu (dizolvată)'), f:'Li⁺ + Cl⁻', st:'d', res:'licl'},
  srcl2aq:{n:L('strontium chloride (dissolved)','clorură de stronțiu (dizolvată)'), f:'Sr²⁺ + Cl⁻', st:'d', res:'srcl2'},
  i2:{n:L('iodine','iod'), f:'I₂', st:'d', c:'#9a5a1a', a:.55},
});
for(const id in SPECIES){ SPECIES[id].id = id; if(!SPECIES[id].n.en) console.warn(id); }
SHELF.length = 0; Object.keys(SPECIES).filter(k => SPECIES[k].shelf).forEach(k => SHELF.push(k));

// ---------- new rules (checked before the older ones) ----------
const NEW = [];
const R = r => { r.key = r.key || r.id; NEW.push(r); if(!RULE_INFO[r.id]) RULE_INFO[r.id] = r; return r; };

R({id:'cs_water', needs:['cs','@water'], consume:[0], produce:['csoh'], wp:['h2'], kind:'chem', energy:'exo', safety:'lab', temp:30, crack:1,
  signs:['gas','heat','light'], eq:'2Cs + 2H₂O → 2CsOH + H₂↑', fx:[{t:'skate', color:'#f0d77a', flame:'#b9a6ff', dur:.7, pop:5}],
  zoom:{from:['Cs','Cs','H2O','H2O'], to:['CsOH','CsOH','H2']},
  title:L('Caesium goes BANG!','Cesiul face BUM!'),
  b:L('BANG! The caesium exploded the moment it touched the water, and the beaker cracked! Caesium is the wildest metal in the whole alkali family.','BUM! Cesiul a explodat în clipa în care a atins apa, iar paharul s-a crăpat! Cesiul este cel mai sălbatic metal din toată familia metalelor alcaline.'),
  e:L('Lithium, sodium, potassium, rubidium and caesium are all in group 1. The further down the group, the bigger the atom and the more easily it throws away its single outer electron. Caesium reacts so fast that the hydrogen and heat are released all at once, as an explosion.','Litiul, sodiul, potasiul, rubidiul și cesiul sunt toate în grupa 1. Cu cât cobori în grupă, cu atât atomul e mai mare și își aruncă mai ușor singurul electron exterior. Cesiul reacționează atât de repede încât hidrogenul și căldura se eliberează dintr-odată, ca o explozie.'),
  s:L('Caesium has the lowest first ionisation energy of the stable elements (376 kJ/mol). With water it forms CsOH and H₂ so rapidly that a steam and hydrogen shock wave can shatter glass. It is also denser than water (1.93 g/cm³), so it sinks and reacts all over at once.','Cesiul are cea mai mică primă energie de ionizare dintre elementele stabile (376 kJ/mol). Cu apa formează CsOH și H₂ atât de rapid încât unda de șoc de abur și hidrogen poate sparge sticla. Este și mai dens decât apa (1,93 g/cm³), așa că se scufundă și reacționează peste tot deodată.'),
  fact:L('Caesium atoms are used to keep time in atomic clocks: they tick 9,192,631,770 times per second.','Atomii de cesiu sunt folosiți în ceasurile atomice: ei „bat” de 9.192.631.770 de ori pe secundă.')});

R({id:'li_water', needs:['li','@water'], consume:[0], produce:['lioh'], wp:['h2'], kind:'chem', energy:'exo', safety:'lab', temp:6,
  signs:['gas','heat'], eq:'2Li + 2H₂O → 2LiOH + H₂↑', fx:[{t:'skate', color:'#d6dade', flame:null, dur:7, pop:0}],
  zoom:{from:['Li','Li','H2O','H2O'], to:['LiOH','LiOH','H2']},
  title:L('Lithium fizzes calmly','Litiul sfârâie liniștit'),
  b:L('The lithium floated and fizzed, making bubbles of hydrogen, but no fire. Lithium is the calmest member of its metal family.','Litiul a plutit și a sfârâit, făcând bule de hidrogen, dar fără foc. Litiul este cel mai liniștit membru al familiei sale de metale.'),
  e:L('Lithium is at the top of group 1. Its only outer electron sits close to the nucleus and is held more tightly than in sodium or potassium, so it reacts more slowly. Compare it with sodium, potassium and caesium to see the pattern.','Litiul se află în vârful grupei 1. Singurul său electron exterior este aproape de nucleu și e ținut mai strâns decât la sodiu sau potasiu, așa că reacționează mai încet. Compară-l cu sodiul, potasiul și cesiul ca să vezi regula.'),
  s:L('2Li + 2H₂O → 2LiOH + H₂. The first ionisation energy (520 kJ/mol) is the highest in group 1 and the small Li⁺ ion is strongly hydrated, but the kinetics are slow and too little heat builds up to melt the metal (m.p. 180 °C) or ignite the hydrogen.','2Li + 2H₂O → 2LiOH + H₂. Prima energie de ionizare (520 kJ/mol) este cea mai mare din grupa 1, iar ionul mic Li⁺ este puternic hidratat, dar cinetica este lentă și se acumulează prea puțină căldură ca să topească metalul (p.t. 180 °C) sau să aprindă hidrogenul.'),
  fact:L('Lithium powers the batteries in phones and electric cars.','Litiul alimentează bateriile telefoanelor și ale mașinilor electrice.')});

R({id:'kmno4_glycerol', needs:['kmno4','glycerol'], consume:[0,1], produce:['ash'], wp:['co2','steam'], kind:'chem', energy:'exo', safety:'lab', temp:90,
  signs:['light','heat','gas'], eq:'14KMnO₄ + 4C₃H₅(OH)₃ → 7K₂CO₃ + 7Mn₂O₃ + 5CO₂↑ + 16H₂O↑', fx:[{t:'fire', delay:3.5, dur:6, color:'#c86bff'}],
  title:L('Fire from nowhere!','Foc din senin!'),
  b:L('Nothing happened… then smoke… then WHOOSH, purple-pink flames! No match was needed. The purple crystals and the glycerin set themselves on fire.','Nu s-a întâmplat nimic… apoi fum… apoi FÂȘ, flăcări roz-mov! Nu a fost nevoie de chibrit. Cristalele mov și glicerina s-au aprins singure.'),
  e:L('Potassium permanganate is an oxidiser: it is packed with oxygen it can give away. When it touches glycerin, it slowly starts pulling it apart. That reaction makes heat, the heat speeds the reaction up, and it keeps getting faster until it bursts into flame. The purple tint comes from potassium.','Permanganatul de potasiu este un oxidant: este plin de oxigen pe care îl poate da. Când atinge glicerina, începe încet s-o desfacă. Reacția produce căldură, căldura o grăbește, și devine tot mai rapidă până ia foc. Nuanța mov vine de la potasiu.'),
  s:L('A self-accelerating redox reaction: Mn(VII) oxidises the triol. The induction period reflects slow initial electron transfer on the crystal surface; as ΔH is released the rate increases exponentially (Arrhenius behaviour, thermal runaway) until ignition. Potassium emission lines colour the flame.','O reacție redox care se autoaccelerează: Mn(VII) oxidează triolul. Perioada de inducție reflectă transferul inițial lent de electroni pe suprafața cristalului; pe măsură ce se eliberează ΔH, viteza crește exponențial (comportament Arrhenius, ambalare termică) până la aprindere. Liniile de emisie ale potasiului colorează flacăra.'),
  fact:L('Survival kits sometimes contained permanganate and glycerin as an emergency fire starter.','Unele truse de supraviețuire conțineau permanganat și glicerină pentru aprinderea focului în caz de urgență.')});

R({id:'thermite', needs:['fe2o3','al'], heatOnly:1, dry:1, minT:170, consume:[0,1], produce:['moltenfe','al2o3'], kind:'chem', energy:'exo', safety:'lab', temp:200,
  signs:['light','heat','solid'], eq:'Fe₂O₃ + 2Al → 2Fe + Al₂O₃', fx:[{t:'thermite', dur:5}],
  zoom:{from:['Fe2O3','Al','Al'], to:['Fe','Fe','Al2O3']},
  title:L('Thermite: molten iron!','Termit: fier topit!'),
  b:L('A blinding shower of sparks and glowing, melted iron! Aluminium stole the oxygen from the rust so fiercely that it got hotter than 2,000 °C.','O ploaie orbitoare de scântei și fier topit, incandescent! Aluminiul a furat oxigenul din rugină atât de violent încât s-a încins peste 2.000 °C.'),
  e:L('Rust is iron joined to oxygen. Aluminium wants oxygen even more than iron does, so once the mixture is hot enough to start, the aluminium grabs the oxygen and leaves pure iron behind. So much heat is released that the iron comes out as a white-hot liquid.','Rugina este fier unit cu oxigen. Aluminiul vrea oxigenul și mai tare decât fierul, așa că, odată ce amestecul e destul de fierbinte ca să pornească, aluminiul ia oxigenul și lasă în urmă fier pur. Se eliberează atâta căldură încât fierul iese ca un lichid incandescent.'),
  s:L('A metallothermic redox reaction: ΔH ≈ −852 kJ/mol. It needs a high activation energy (usually a magnesium fuse), then reaches about 2,500 °C, above the melting point of iron (1,538 °C). It carries its own oxygen, so it cannot be smothered.','O reacție redox aluminotermică: ΔH ≈ −852 kJ/mol. Are nevoie de o energie de activare mare (de obicei un fitil de magneziu), apoi atinge aproximativ 2.500 °C, peste punctul de topire al fierului (1.538 °C). Își aduce singură oxigenul, deci nu poate fi înăbușită.'),
  fact:L('Railway workers use thermite to weld rails together right on the track.','Muncitorii de la calea ferată folosesc termitul ca să sudeze șinele direct pe traseu.')});

R({id:'sugar_snake', needs:['sugar','soda'], heatOnly:1, dry:1, minT:110, consume:[0,1], produce:['carbonsnake'], wp:['co2','steam'], kind:'chem', safety:'adult',
  signs:['gas','color','smell'], eq:'C₁₂H₂₂O₁₁ → 12C + 11H₂O ; 2NaHCO₃ → Na₂CO₃ + H₂O + CO₂', fx:[{t:'smoke', dur:6, rate:5, dark:1}],
  title:L('The black sugar snake','Șarpele negru de zahăr'),
  b:L('A black snake grew and wriggled up out of the beaker! The sugar burned to black carbon, and gas from the baking soda puffed it up like a sponge.','Un șarpe negru a crescut și s-a ridicat din pahar! Zahărul s-a ars până la carbon negru, iar gazul din bicarbonat l-a umflat ca pe un burete.'),
  e:L('Two reactions happen together. Heat breaks sugar down into black carbon and water vapour. At the same time baking soda breaks down and releases carbon dioxide. The gases get trapped in the soft, sticky carbon and push it up into a long, light snake.','Au loc două reacții deodată. Căldura descompune zahărul în carbon negru și vapori de apă. În același timp, bicarbonatul se descompune și eliberează dioxid de carbon. Gazele rămân prinse în carbonul moale și lipicios și îl împing în sus, într-un șarpe lung și ușor.'),
  s:L('Pyrolysis of sucrose (→ C + H₂O) combined with thermal decomposition of NaHCO₃ (→ Na₂CO₃ + H₂O + CO₂) produces a foamed carbon char. The expanding gas inflates the plastic intermediate (caramelan) before it sets, giving a low-density, porous column.','Piroliza zaharozei (→ C + H₂O), combinată cu descompunerea termică a NaHCO₃ (→ Na₂CO₃ + H₂O + CO₂), produce un cărbune spumos. Gazul care se dilată umflă intermediarul plastic (caramelanul) înainte să se întărească, rezultând o coloană poroasă, cu densitate mică.'),
  fact:L('The famous “Pharaoh’s serpent” works the same way, but uses a poisonous mercury compound, so we use sugar instead.','Celebrul „șarpe al faraonului” funcționează la fel, dar folosește un compus otrăvitor de mercur, așa că noi folosim zahăr.')});

R({id:'acid_snake', needs:['h2so4','sugar'], consume:[0,1], produce:['carbonsnake'], wp:['steam'], kind:'chem', energy:'exo', safety:'lab', temp:70,
  signs:['color','heat','gas','smell'], eq:'C₁₂H₂₂O₁₁ → 12C + 11H₂O  (H₂SO₄ removes the water)', fx:[{t:'steam', dur:6, rate:7}, {t:'smoke', dur:4, rate:3}],
  title:L('A column of black carbon','O coloană de carbon negru'),
  b:L('The white sugar turned yellow, brown, then black, and a steaming black tower rose out of the beaker! The acid pulled all the water out of the sugar.','Zahărul alb a devenit galben, maro, apoi negru, iar din pahar s-a ridicat un turn negru care scotea aburi! Acidul a scos toată apa din zahăr.'),
  e:L('Sugar is made of carbon, hydrogen and oxygen, with the hydrogen and oxygen in the same 2-to-1 ratio as in water. Concentrated sulfuric acid is so hungry for water that it rips those atoms out as water, leaving black carbon. The heat turns the water to steam, which puffs the carbon up.','Zahărul este format din carbon, hidrogen și oxigen, iar hidrogenul și oxigenul sunt în același raport de 2 la 1 ca în apă. Acidul sulfuric concentrat este atât de „însetat” de apă încât smulge acești atomi sub formă de apă, lăsând carbon negru. Căldura transformă apa în abur, care umflă carbonul.'),
  s:L('A dehydration: C₁₂H₂₂O₁₁ → 12C + 11H₂O, driven by the very exothermic hydration of H₂SO₄. Some carbon is also oxidised (C + 2H₂SO₄ → CO₂ + 2SO₂ + 2H₂O), which gives the sharp smell of sulfur dioxide.','O deshidratare: C₁₂H₂₂O₁₁ → 12C + 11H₂O, favorizată de hidratarea foarte exotermă a H₂SO₄. O parte din carbon este și oxidată (C + 2H₂SO₄ → CO₂ + 2SO₂ + 2H₂O), de unde mirosul înțepător de dioxid de sulf.'),
  fact:L('Sulfuric acid is the most produced chemical in the world, mostly for fertilisers.','Acidul sulfuric este substanța chimică cea mai produsă din lume, mai ales pentru îngrășăminte.')});

R({id:'h2so4_water', needs:['h2so4','@water'], consume:[], produce:[], kind:'phys', energy:'exo', safety:'lab', temp:38, quiet:1, noEq:1,
  signs:['heat'], fx:[{t:'steam', dur:3, rate:5}, {t:'shimmer'}],
  title:L('Acid meets water: HOT!','Acidul întâlnește apa: FIERBINTE!'),
  b:L('The beaker got very hot and started to steam! Mixing strong acid with water releases lots of heat.','Paharul s-a încins foarte tare și a început să scoată aburi! Amestecarea acidului tare cu apa eliberează multă căldură.'),
  e:L('Sulfuric acid molecules grab water molecules very strongly, and every grab releases energy as heat. Chemists always pour the acid slowly into the water, never water into acid, so the heat spreads out safely.','Moleculele de acid sulfuric apucă moleculele de apă foarte puternic, iar fiecare „apucare” eliberează energie sub formă de căldură. Chimiștii toarnă mereu acidul încet în apă, niciodată apa în acid, ca să se împrăștie căldura în siguranță.'),
  s:L('The enthalpy of dilution of concentrated H₂SO₄ is about −95 kJ/mol, from ionisation to H₃O⁺/HSO₄⁻ and strong hydration. Adding water to acid can boil the water locally and spray acid.','Entalpia de diluare a H₂SO₄ concentrat este de circa −95 kJ/mol, datorită ionizării la H₃O⁺/HSO₄⁻ și hidratării puternice. Dacă torni apă în acid, apa poate fierbe local și poate împroșca acidul.'),
  fact:L('Chemists remember it with a rhyme: “Do as you oughta, add acid to water.”','Chimiștii țin minte regula: „Acidul în apă, nu apa în acid!”')});

// flame tests
const FLAMES = {
  salt:{c:'#ffb22e', n:L('bright orange-yellow','galben-portocaliu intens'), el:L('sodium','sodiu'), nm:'589 nm'},
  licl:{c:'#ff2a55', n:L('crimson red','roșu carmin'), el:L('lithium','litiu'), nm:'671 nm'},
  srcl2:{c:'#ff2d2d', n:L('scarlet red','roșu aprins'), el:L('strontium','stronțiu'), nm:'640–690 nm'},
  cucl2:{c:'#2fe0a0', n:L('blue-green','albastru-verzui'), el:L('copper','cupru'), nm:'510–525 nm'},
  cacl2s:{c:'#ff7a2a', n:L('orange-red','roșu-portocaliu'), el:L('calcium','calciu'), nm:'622 nm'},
};
for(const f in FLAMES){ const F = FLAMES[f];
  R({id:'flame', key:'flame:' + f, needs:[f], heatOnly:1, dry:1, minT:160, consume:[], produce:[], kind:'phys', safety:'lab', noEq:1,
    signs:['light','color'], fx:[{t:'flametest', dur:7, color:F.c}], vars:() => ({col:tr(F.n), el:tr(F.el), nm:F.nm}),
    title:L('Flame test: {col}!','Testul flăcării: {col}!'),
    b:L('The flame turned {col}! Every metal paints a flame with its own special colour. This one is {el}.','Flacăra s-a colorat în {col}! Fiecare metal colorează flacăra în culoarea lui specială. Acesta este {el}.'),
    e:L('The heat gives the electrons in the {el} atoms extra energy, so they jump up to a higher shell. When they fall back down, they give that energy away as light of one exact colour. Chemists use flame colours to find out which metal is in a sample.','Căldura le dă electronilor din atomii de {el} energie în plus, așa că sar pe un strat mai înalt. Când cad înapoi, cedează energia sub formă de lumină de o culoare exactă. Chimiștii folosesc culorile flăcării ca să afle ce metal se află într-o probă.'),
    s:L('Atomic emission: thermal excitation promotes electrons to higher energy levels; relaxation emits photons with E = hν corresponding to specific transitions. For {el} the dominant emission is around {nm}. The same principle underlies flame photometry and atomic emission spectroscopy.','Emisie atomică: excitarea termică promovează electronii pe niveluri energetice mai înalte; revenirea emite fotoni cu E = hν, corespunzători unor tranziții specifice. Pentru {el}, emisia dominantă este în jur de {nm}. Același principiu stă la baza fotometriei în flacără și a spectroscopiei de emisie atomică.'),
    fact:L('Firework colours are flame tests in the sky: strontium for red, copper for blue-green, sodium for gold.','Culorile artificiilor sunt teste ale flăcării pe cer: stronțiu pentru roșu, cupru pentru albastru-verzui, sodiu pentru auriu.')});
}

R({id:'cocl2_heat', needs:['cocl2'], heatOnly:1, dry:1, minT:110, consume:[0], produce:['cocl2b'], wp:['steam'], kind:'chem', energy:'endo', safety:'lab',
  signs:['color','gas'], eq:'CoCl₂·6H₂O → CoCl₂ + 6H₂O↑', fx:[{t:'steam', dur:3, rate:5}],
  title:L('Pink turns blue','Rozul devine albastru'),
  b:L('The pink crystals turned bright blue when they got hot and dry! Add water and watch them turn pink again.','Cristalele roz au devenit albastre când s-au încălzit și uscat! Adaugă apă și privește cum redevin roz.'),
  e:L('Pink cobalt chloride has water molecules hugging each cobalt ion. Heating drives the water out, and cobalt surrounded by chloride instead is blue. This colour change works like a water detector.','Clorura de cobalt roz are molecule de apă care îmbrățișează fiecare ion de cobalt. Căldura scoate apa, iar cobaltul înconjurat în schimb de clor este albastru. Această schimbare de culoare funcționează ca un detector de apă.'),
  s:L('Octahedral [Co(H₂O)₆]²⁺ (pink, weak absorption near 510 nm) converts to tetrahedral CoCl₄²⁻-type species (intense blue, absorption ~690 nm) on dehydration. Tetrahedral complexes lack a centre of symmetry, so their d–d bands are much stronger.','[Co(H₂O)₆]²⁺ octaedric (roz, absorbție slabă în jur de 510 nm) trece la specii de tip CoCl₄²⁻ tetraedrice (albastru intens, absorbție ~690 nm) prin deshidratare. Complecșii tetraedrici nu au centru de simetrie, deci benzile lor d–d sunt mult mai intense.'),
  fact:L('Little packets of silica gel sometimes contain cobalt chloride beads that turn pink when they are full of moisture.','Pliculețele de silicagel conțin uneori bile cu clorură de cobalt care devin roz când s-au umplut de umezeală.')});

// chemical gardens
const GARDENS = {cuso4:['garden_cu', L('blue','albastre'), 'CuSO₄ + Na₂SiO₃ → CuSiO₃↓ + Na₂SO₄'], cocl2:['garden_co', L('purple','mov'), 'CoCl₂ + Na₂SiO₃ → CoSiO₃↓ + 2NaCl'], cacl2s:['garden_ca', L('white','albe'), 'CaCl₂ + Na₂SiO₃ → CaSiO₃↓ + 2NaCl']};
for(const g in GARDENS){ const G2 = GARDENS[g];
  R({id:'garden', key:'garden:' + g, needs:['silicate', g], consume:[1], produce:[G2[0]], kind:'chem', safety:'adult',
    signs:['solid','color'], eq:G2[2], vars:() => ({col:tr(G2[1])}),
    title:L('A chemical garden grows','Crește o grădină chimică'),
    b:L('Twisty {col} towers are growing up from the crystal like strange underwater plants! They are not alive, they are made by chemistry.','Din cristal cresc turnulețe {col} și răsucite, ca niște plante ciudate de sub apă! Nu sunt vii, le face chimia.'),
    e:L('As the metal crystal starts to dissolve, it reacts with the water glass and wraps itself in a thin skin of solid metal silicate. Water pushes in through the skin, the pressure bursts it at the top, and new skin forms there. So the tube keeps growing upward.','Când cristalul metalic începe să se dizolve, reacționează cu sticla solubilă și se învelește într-o piele subțire de silicat metalic solid. Apa intră prin această piele, presiunea o sparge sus, iar acolo se formează piele nouă. Așa tubul crește mereu în sus.'),
    s:L('Precipitation of a semipermeable metal-silicate membrane followed by osmotic flow: the concentrated metal-salt solution inside draws water in, the membrane ruptures, and buoyant jets of salt solution precipitate fresh silicate, forming hollow tubes. Similar tubular precipitates form at hydrothermal vents.','Precipitarea unei membrane semipermeabile de silicat metalic, urmată de flux osmotic: soluția concentrată de sare dinăuntru atrage apă, membrana se rupe, iar jeturile ascendente de soluție precipită silicat nou, formând tuburi goale. Precipitate tubulare asemănătoare se formează la izvoarele hidrotermale.'),
    fact:L('Scientists study chemical gardens to understand how life may have started near hot vents on the sea floor.','Oamenii de știință studiază grădinile chimice ca să înțeleagă cum ar fi putut începe viața lângă izvoarele fierbinți de pe fundul mării.')});
}

R({id:'hotice', needs:['hotice','naacs'], consume:[0,1], produce:['hoticesolid'], kind:'phys', energy:'exo', safety:'home', temp:28,
  signs:['solid','heat'], eq:'CH₃COONa(aq, supersaturated) → CH₃COONa·3H₂O(s)',
  title:L('Instant hot ice!','Gheață fierbinte instant!'),
  b:L('The moment the tiny crystal touched the liquid, crystals shot through the whole beaker and it turned solid, and warm! It looks like ice, but it feels hot.','În clipa în care cristalul mic a atins lichidul, cristalele s-au răspândit prin tot paharul și totul s-a solidificat, și s-a încălzit! Arată ca gheața, dar e cald.'),
  e:L('The liquid held more dissolved sodium acetate than it normally can, so it was just waiting for a place to start crystallising. The seed crystal gave it that place. When particles lock into a crystal they give off heat, which is why hot ice is warm.','Lichidul conținea mai mult acetat de sodiu dizolvat decât poate în mod normal, așa că doar aștepta un loc de unde să înceapă cristalizarea. Cristalul-sămânță i-a oferit acel loc. Când particulele se așază într-un cristal, eliberează căldură, de aceea gheața fierbinte e caldă.'),
  s:L('A supersaturated solution is metastable: nucleation has a high energy barrier. A seed crystal removes that barrier and crystal growth proceeds rapidly, releasing the enthalpy of crystallisation (about 264 J/g for sodium acetate trihydrate).','O soluție suprasaturată este metastabilă: nucleația are o barieră energetică mare. Un cristal-sămânță elimină bariera, iar creșterea cristalelor are loc rapid, eliberând entalpia de cristalizare (circa 264 J/g pentru acetatul de sodiu trihidrat).'),
  fact:L('Reusable hand warmers contain hot ice: you click a small metal disc to start the crystals.','Încălzitoarele de mâini reutilizabile conțin gheață fierbinte: apeși o plăcuță metalică și pornesc cristalele.')});

R({id:'geyser', needs:['mentos','cola'], consume:[], produce:[], kind:'phys', safety:'home', volMul:.3, noEq:1,
  signs:['gas'], fx:[{t:'geyser', dur:3.2, color:'#6b3a1a'}, {t:'foam', h:1.3, color:'#e9d7b8', rise:3, dur:3}],
  title:L('Cola geyser!','Gheizer de cola!'),
  b:L('WHOOSH! A fountain of cola shot up high out of the beaker! The candy made all the gas in the cola escape at once.','FÂȘ! O fântână de cola a țâșnit sus din pahar! Bomboana a făcut tot gazul din cola să iasă dintr-odată.'),
  e:L('Cola is full of dissolved carbon dioxide that is waiting to escape, but bubbles find it hard to start. The candy’s surface is covered in millions of tiny pits where bubbles can form easily. So huge numbers of bubbles form at once and push the cola out. No new substance is made: it’s a physical change.','Cola este plină de dioxid de carbon dizolvat care abia așteaptă să iasă, dar bulelor le e greu să se formeze. Suprafața bomboanei este acoperită de milioane de adâncituri minuscule unde bulele se formează ușor. Așa se formează dintr-odată foarte multe bule, care împing cola afară. Nu se formează o substanță nouă: este o transformare fizică.'),
  s:L('Heterogeneous nucleation: the rough candy surface provides nucleation sites that lower the energy barrier for CO₂ bubble formation in the supersaturated solution. Gum arabic and aspartame lower the surface tension, which speeds bubble growth further.','Nucleație eterogenă: suprafața aspră a bomboanei oferă centre de nucleație care scad bariera energetică pentru formarea bulelor de CO₂ în soluția suprasaturată. Guma arabică și aspartamul scad tensiunea superficială, ceea ce grăbește și mai mult creșterea bulelor.'),
  fact:L('The record cola-geyser display used over 2,000 bottles going off at the same time.','Recordul pentru gheizere de cola a folosit peste 2.000 de sticle declanșate în același timp.')});

R({id:'cola_salt', needs:['cola','salt'], consume:[1], produce:['saltaq'], kind:'phys', safety:'home', noEq:1,
  signs:['gas'], fx:[{t:'foam', h:1.1, color:'#e9d7b8', rise:2, dur:3}, {t:'bubbles', rate:40, dur:2}],
  title:L('Salty cola fizz-up','Cola spumează cu sare'),
  b:L('The cola foamed up as soon as the salt went in! The rough salt grains helped the gas bubbles escape.','Cola a făcut spumă imediat ce a intrat sarea! Grăunțele aspre de sare au ajutat bulele de gaz să iasă.'),
  e:L('Each salt grain gives dissolved carbon dioxide lots of little corners to form bubbles on. It’s the same trick as the candy geyser, just smaller.','Fiecare grăunte de sare oferă dioxidului de carbon dizolvat multe colțișoare pe care să formeze bule. Este același truc ca la gheizerul cu bomboane, doar mai mic.'),
  s:L('Salt crystals act as nucleation sites for CO₂ in the supersaturated solution, and the dissolving ions also slightly lower CO₂ solubility (salting out).','Cristalele de sare sunt centre de nucleație pentru CO₂ în soluția suprasaturată, iar ionii care se dizolvă scad și ei puțin solubilitatea CO₂ (efectul de „salting out”).'),
  fact:L('Sparkling drinks go flat faster in a scratched glass than in a smooth one.','Băuturile acidulate se răsuflă mai repede într-un pahar zgâriat decât într-unul neted.')});

R({id:'magic_milk', needs:['soap','milk','foodcolor'], consume:[], produce:['magicmilk'], kind:'phys', safety:'home', noEq:1,
  signs:['color'], fx:[{t:'milkburst', dur:9}],
  title:L('Magic milk colour burst','Explozia de culori din lapte'),
  b:L('The colours exploded and swirled across the milk like fireworks! The soap chased the fat around and dragged the colours along.','Culorile au explodat și s-au rotit pe lapte ca niște artificii! Săpunul a fugărit grăsimea și a tras culorile după el.'),
  e:L('Milk has a stretchy surface and tiny drops of fat. Soap breaks the surface tension where it lands, so the surface pulls away from that spot, carrying the colour with it. Soap also grabs onto the fat, and that keeps the milk moving and swirling.','Laptele are o suprafață elastică și picături mici de grăsime. Săpunul rupe tensiunea superficială acolo unde cade, așa că suprafața se trage departe de acel loc și duce culoarea cu ea. Săpunul se prinde și de grăsime, iar asta ține laptele în mișcare și în vârtejuri.'),
  s:L('A Marangoni flow: the surfactant creates a surface-tension gradient, and liquid flows from low to high surface tension. Surfactant molecules then keep migrating and binding to fat globules and proteins (micelle formation), which sustains the currents until the surfactant is evenly spread.','Un flux Marangoni: surfactantul creează un gradient de tensiune superficială, iar lichidul curge de la tensiune mică spre tensiune mare. Moleculele de surfactant continuă să migreze și să se lege de globulele de grăsime și de proteine (formând micele), ceea ce întreține curenții până când surfactantul se distribuie uniform.'),
  fact:L('Whole milk gives a much bigger colour show than skimmed milk, because it has more fat.','Laptele integral face un spectacol de culori mult mai mare decât cel degresat, pentru că are mai multă grăsime.')});

R({id:'milk_dots', needs:['foodcolor','milk'], unless:['soap'], consume:[], produce:[], kind:'phys', safety:'home', quiet:1, noEq:1,
  signs:[], title:L('Colour drops on milk','Picături de culoare pe lapte'),
  b:L('The colour drops are just sitting still on the milk. Now add a drop of dish soap and watch closely!','Picăturile de culoare stau liniștite pe lapte. Acum adaugă o picătură de detergent și privește atent!'),
  e:L('The milk’s surface is like a stretched skin that holds the colours in place. Something that breaks that skin will make them move.','Suprafața laptelui e ca o piele întinsă care ține culorile pe loc. Ceva care rupe această piele le va pune în mișcare.'),
  s:L('Without a surface-tension gradient there is no Marangoni flow, and the dye only spreads by slow diffusion.','Fără un gradient de tensiune superficială nu există flux Marangoni, iar colorantul se răspândește doar prin difuzie lentă.'),
  fact:L('Painters use the same trick to make marbled paper.','Pictorii folosesc același truc ca să facă hârtie marmorată.')});

R({id:'milk_curd', needs:['milk','vinegar|lemon'], consume:[0], produce:['curd'], kind:'chem', safety:'home',
  signs:['solid'], eq:'casein (dissolved) + H⁺ → casein curds', noEq:1,
  title:L('Milk turns into lumps','Laptele se face cocoloașe'),
  b:L('White lumps appeared in the milk! The acid made the milk protein clump together. That’s how cheese starts.','În lapte au apărut cocoloașe albe! Acidul a făcut proteina din lapte să se strângă. Așa începe brânza.'),
  e:L('Milk protein, called casein, floats around in tiny balls that push each other away because they carry a negative charge. Acid cancels that charge, so the balls stick together into curds. The watery liquid left over is called whey.','Proteina din lapte, numită cazeină, plutește în biluțe mici care se resping, pentru că au sarcină negativă. Acidul anulează această sarcină, așa că biluțele se lipesc în cheaguri. Lichidul apos care rămâne se numește zer.'),
  s:L('Casein micelles are stabilised by negatively charged κ-casein. Lowering the pH towards casein’s isoelectric point (pH ≈ 4.6) neutralises that charge, and the micelles aggregate and precipitate (acid coagulation).','Micelele de cazeină sunt stabilizate de κ-cazeina încărcată negativ. Scăderea pH-ului spre punctul izoelectric al cazeinei (pH ≈ 4,6) neutralizează această sarcină, iar micelele se agregă și precipită (coagulare acidă).'),
  fact:L('Before plastic, people made buttons and jewellery from milk curds (casein plastic).','Înainte de plastic, oamenii făceau nasturi și bijuterii din cheag de lapte (plastic din cazeină).')});

R({id:'dryice_soap', needs:['dryice','soap','@water'], consume:[0], produce:['h2co3'], kind:'phys', safety:'adult', temp:-6, noEq:1,
  signs:['gas','cold'], fx:[{t:'fog', dur:16}, {t:'foam', h:1.4, color:'#eef2f4', rise:1.2, dur:14}, {t:'bubbles', rate:30, dur:14}, {t:'objfizz', obj:'dryice', dur:16, rate:30}],
  title:L('Bubbles full of fog','Bule pline de ceață'),
  b:L('A tower of bubbles grew out of the beaker, and each bubble was full of white fog! When one pops, a little cloud comes out.','Din pahar a crescut un turn de bule, iar fiecare bulă era plină de ceață albă! Când se sparge una, iese un norișor.'),
  e:L('Dry ice is frozen carbon dioxide. In water it turns straight into gas, and the gas is so cold that it chills the air and turns water vapour into tiny droplets: fog. The soap film traps the gas and fog inside bubbles.','Gheața carbonică este dioxid de carbon înghețat. În apă se transformă direct în gaz, iar gazul este atât de rece încât răcește aerul și transformă vaporii de apă în picături minuscule: ceață. Pelicula de săpun prinde gazul și ceața în bule.'),
  s:L('Sublimation of CO₂(s) at −78.5 °C, accelerated by heat from the water. The cold CO₂ stream cools humid air below its dew point, condensing a water aerosol. The surfactant stabilises a foam of CO₂-filled films.','Sublimarea CO₂(s) la −78,5 °C, accelerată de căldura apei. Curentul rece de CO₂ răcește aerul umed sub punctul de rouă și condensează un aerosol de apă. Surfactantul stabilizează o spumă din pelicule pline cu CO₂.'),
  fact:L('Theatres use dry ice in warm water to make low fog that rolls across the stage.','Teatrele folosesc gheață carbonică în apă caldă ca să facă ceața joasă care se rostogolește pe scenă.')});

R({id:'dryice_water', needs:['dryice','@water'], consume:[0], produce:['h2co3'], kind:'phys', safety:'adult', temp:-8, noEq:1,
  signs:['gas','cold'], fx:[{t:'fog', dur:16}, {t:'bubbles', rate:35, dur:15}, {t:'objfizz', obj:'dryice', dur:16, rate:30}],
  title:L('A spooky fog waterfall','O cascadă de ceață înfricoșătoare'),
  b:L('Thick white fog poured over the edge of the beaker and rolled across the bench, and the water bubbled like a cauldron! The dry ice is turning into gas.','O ceață albă și groasă s-a revărsat peste marginea paharului și s-a rostogolit pe masă, iar apa a clocotit ca un ceaun! Gheața carbonică se transformă în gaz.'),
  e:L('Dry ice skips being a liquid and turns straight from solid into gas. That is called sublimation. The gas is so cold that the air around it can’t hold its water vapour, which turns into fog. Carbon dioxide is heavier than air, so the fog sinks and flows downward. Some of the gas dissolves and makes the water slightly acidic.','Gheața carbonică sare peste starea lichidă și trece direct din solid în gaz. Asta se numește sublimare. Gazul e atât de rece încât aerul din jur nu-și mai poate ține vaporii de apă, care devin ceață. Dioxidul de carbon este mai greu decât aerul, așa că ceața coboară și curge în jos. O parte din gaz se dizolvă și face apa ușor acidă.'),
  s:L('CO₂ sublimes at −78.5 °C (1 atm); there is no liquid phase below 5.1 atm. The dense (1.98 g/L), cold gas carries a condensed water aerosol downward. Dissolved CO₂ forms carbonic acid: CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻, so the pH drops. Add red cabbage juice to see it!','CO₂ sublimează la −78,5 °C (1 atm); nu există fază lichidă sub 5,1 atm. Gazul dens (1,98 g/L) și rece duce în jos un aerosol de apă condensată. CO₂ dizolvat formează acid carbonic: CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻, deci pH-ul scade. Adaugă suc de varză roșie ca să vezi!'),
  fact:L('Dry ice is so cold that it can burn skin, which is why it is always handled with thick gloves.','Gheața carbonică e atât de rece încât poate arde pielea, de aceea se manevrează mereu cu mănuși groase.')});

R({id:'dryice_dry', needs:['dryice'], consume:[], produce:[], kind:'phys', safety:'adult', quiet:1, noEq:1, temp:-4,
  signs:['cold'], fx:[{t:'fog', dur:8, weak:1}],
  title:L('Smoking ice','Gheață care fumegă'),
  b:L('The dry ice is slowly giving off cold fog, even without water. Pour some water on it to see a big fog show!','Gheața carbonică scoate încet ceață rece, chiar și fără apă. Toarnă apă peste ea ca să vezi un spectacol mare de ceață!'),
  e:L('Dry ice sublimates: it turns straight from a solid into a gas. Water speeds this up a lot, because water is much warmer than −78 °C.','Gheața carbonică sublimează: trece direct din solid în gaz. Apa grăbește mult acest proces, pentru că apa e mult mai caldă decât −78 °C.'),
  s:L('Sublimation rate depends on heat transfer: air is a poor conductor, water a much better one.','Viteza sublimării depinde de transferul de căldură: aerul este un conductor slab, apa unul mult mai bun.'),
  fact:L('On Mars, the polar ice caps are partly made of dry ice.','Pe Marte, calotele polare sunt formate în parte din gheață carbonică.')});

R({id:'slime', needs:['glue','borax'], consume:[0,1], produce:['slime'], kind:'chem', safety:'adult', noEq:1,
  signs:['solid'], fx:[{t:'swirl', dur:3}],
  title:L('Stretchy slime!','Slime elastic!'),
  b:L('The runny glue turned into gooey, stretchy slime! The borax joined the long glue molecules together like a net.','Lipiciul curgător s-a transformat în slime lipicios și elastic! Boraxul a unit moleculele lungi de lipici ca pe o plasă.'),
  e:L('Glue is made of polymers: very long chain molecules that slide past each other, so glue flows. Borax makes little bridges that link the chains to each other. Now the chains are tangled into a net that stretches and oozes but doesn’t run like water.','Lipiciul este făcut din polimeri: molecule foarte lungi, ca niște lanțuri, care alunecă unele pe lângă altele, de aceea lipiciul curge. Boraxul face mici poduri care leagă lanțurile între ele. Acum lanțurile sunt încâlcite într-o plasă care se întinde și se prelinge, dar nu curge ca apa.'),
  s:L('Borate ions, B(OH)₄⁻, form reversible diol–borate cross-links between hydroxyl groups on neighbouring poly(vinyl alcohol) chains. Because the cross-links constantly break and re-form, the gel is viscoelastic: it flows slowly but bounces or snaps under fast stress (a non-Newtonian behaviour).','Ionii borat, B(OH)₄⁻, formează legături încrucișate reversibile diol–borat între grupările hidroxil de pe lanțuri vecine de poli(alcool vinilic). Pentru că aceste legături se rup și se refac continuu, gelul este vâscoelastic: curge încet, dar sare sau se rupe sub o forță rapidă (comportament nenewtonian).'),
  fact:L('Your hair, rubber bands and DNA are all polymers too.','Părul tău, elasticele și ADN-ul sunt tot polimeri.')});

R({id:'snow', needs:['snowpow','@water'], consume:[0,1], produce:['snow'], kind:'phys', safety:'home', volMul:0, noEq:1,
  signs:['solid'],
  title:L('Instant snow!','Zăpadă instant!'),
  b:L('The powder soaked up all the water and puffed up into a big pile of fluffy fake snow! It even feels cool.','Pulberea a absorbit toată apa și s-a umflat într-o grămadă mare de zăpadă pufoasă! E chiar răcoroasă la atingere.'),
  e:L('The powder is a polymer that loves water. Each grain can soak up hundreds of times its own weight of water and swell up. The water is still there, just trapped inside the grains.','Pulberea este un polimer căruia îi place apa. Fiecare grăunte poate absorbi de sute de ori greutatea lui în apă și se umflă. Apa e tot acolo, doar prinsă în grăunțe.'),
  s:L('Sodium polyacrylate is a cross-linked polyelectrolyte. Osmotic pressure from its Na⁺ counter-ions draws water into the network, which swells until elasticity balances osmosis (up to ~300× its mass in pure water; salt water reduces the swelling).','Poliacrilatul de sodiu este un polielectrolit reticulat. Presiunea osmotică a contraionilor Na⁺ atrage apa în rețea, care se umflă până când elasticitatea echilibrează osmoza (până la ~300× masa sa în apă pură; apa sărată reduce umflarea).'),
  fact:L('Sprinkle salt on the snow and it turns back into a watery mess!','Presară sare peste zăpadă și redevine o băltoacă apoasă!')});

R({id:'coldpack', needs:['nh4no3','@water'], consume:[0], produce:['nh4no3aq'], kind:'phys', energy:'endo', safety:'adult', temp:-22,
  signs:['cold'], eq:'NH₄NO₃(s) → NH₄⁺(aq) + NO₃⁻(aq)', fx:[{t:'dissolve', color:'#ffffff', dur:2.4}, {t:'swirl', dur:2}],
  title:L('Freezing cold beaker!','Pahar înghețat!'),
  b:L('The beaker got so cold that frost appeared on the glass! Dissolving these crystals soaks up heat.','Paharul s-a răcit atât de tare încât pe sticlă a apărut brumă! Dizolvarea acestor cristale absoarbe căldură.'),
  e:L('To pull the crystal apart, the water needs energy, and it takes that energy from its surroundings as heat. So the water, and the glass, get colder. The water vapour in the air freezes on the cold glass as frost.','Ca să desfacă cristalul, apa are nevoie de energie, pe care o ia din jur sub formă de căldură. De aceea apa și sticla se răcesc. Vaporii de apă din aer îngheață pe sticla rece sub formă de brumă.'),
  s:L('Endothermic dissolution: ΔH_sol ≈ +25.7 kJ/mol. It is still spontaneous because ΔS is large and positive, so ΔG = ΔH − TΔS < 0. The temperature can fall from 20 °C to near 0 °C.','Dizolvare endotermă: ΔH_diz ≈ +25,7 kJ/mol. Este totuși spontană, pentru că ΔS este mare și pozitivă, deci ΔG = ΔH − TΔS < 0. Temperatura poate scădea de la 20 °C aproape de 0 °C.'),
  fact:L('Instant cold packs for sports injuries work exactly like this.','Pungile reci instant pentru accidentările sportive funcționează exact așa.')});

R({id:'hotpack', needs:['cacl2s','@water'], consume:[0], produce:['cacl2'], kind:'phys', energy:'exo', safety:'home', temp:24,
  signs:['heat'], eq:'CaCl₂(s) → Ca²⁺(aq) + 2Cl⁻(aq)', fx:[{t:'dissolve', color:'#ffffff', dur:2.4}, {t:'shimmer'}, {t:'steam', dur:2, rate:2}],
  title:L('Water that heats itself','Apă care se încălzește singură'),
  b:L('The water got hot all by itself when the flakes dissolved! Some substances give off heat when they dissolve.','Apa s-a încălzit singură când s-au dizolvat fulgii! Unele substanțe degajă căldură când se dizolvă.'),
  e:L('When calcium and chloride ions get surrounded by water molecules, they release more energy than it took to break up the crystal. That extra energy comes out as heat. Try the cold pack crystals next for the opposite!','Când ionii de calciu și clorură sunt înconjurați de molecule de apă, eliberează mai multă energie decât a costat desfacerea cristalului. Energia în plus iese ca, căldură. Încearcă apoi cristalele pentru pungă rece, pentru efectul opus!'),
  s:L('Exothermic dissolution: ΔH_sol ≈ −82 kJ/mol, because the hydration enthalpy of the small, doubly charged Ca²⁺ ion outweighs the lattice enthalpy.','Dizolvare exotermă: ΔH_diz ≈ −82 kJ/mol, pentru că entalpia de hidratare a ionului mic, dublu încărcat Ca²⁺ depășește entalpia de rețea.'),
  fact:L('Calcium chloride melts ice on roads both by lowering the freezing point and by warming up as it dissolves.','Clorura de calciu topește gheața de pe drum atât prin scăderea punctului de îngheț, cât și prin încălzirea care apare când se dizolvă.')});

R({id:'cacl2_soda', needs:['cacl2','soda|sodaaq'], consume:[0,1], produce:['caco3p','saltaq'], wp:['co2'], kind:'chem', safety:'home',
  signs:['solid','gas'], eq:'CaCl₂ + 2NaHCO₃ → CaCO₃↓ + 2NaCl + H₂O + CO₂↑', fx:[{t:'bubbles', rate:25, dur:3}, {t:'swirl', dur:2}],
  zoom:{from:['Ca2+','HCO3-','HCO3-'], to:['CaCO3n','H2O','CO2']},
  title:L('Making chalk in a beaker','Facem cretă în pahar'),
  b:L('Bubbles AND a white cloud! Two clear liquids made brand-new chalk, plus carbon dioxide gas.','Bule ȘI un nor alb! Două lichide limpezi au făcut cretă nouă-nouță, plus dioxid de carbon.'),
  e:L('Calcium ions from the calcium chloride meet carbonate from the baking soda and form calcium carbonate, which is chalk. Chalk does not dissolve, so it appears as a white cloud. Some of the baking soda also breaks down into carbon dioxide, which makes the bubbles.','Ionii de calciu din clorura de calciu întâlnesc carbonatul din bicarbonat și formează carbonat de calciu, adică cretă. Creta nu se dizolvă, așa că apare ca un nor alb. O parte din bicarbonat se descompune și în dioxid de carbon, care face bulele.'),
  s:L('Ca²⁺ + 2HCO₃⁻ → CaCO₃(s) + H₂O + CO₂(g). Removing CO₃²⁻ as the insoluble precipitate (Ksp ≈ 3.3 × 10⁻⁹) shifts the bicarbonate equilibrium, releasing CO₂. This is how limescale and cave stalactites form.','Ca²⁺ + 2HCO₃⁻ → CaCO₃(s) + H₂O + CO₂(g). Eliminarea CO₃²⁻ ca precipitat insolubil (Ks ≈ 3,3 × 10⁻⁹) deplasează echilibrul bicarbonatului, eliberând CO₂. Așa se formează calcarul din ceainic și stalactitele din peșteri.'),
  fact:L('Stalactites in caves grow by this same reaction, about one centimetre every hundred years.','Stalactitele din peșteri cresc prin aceeași reacție, cam un centimetru la o sută de ani.')});

R({id:'traffic', needs:['indigo','glucose|glucoseaq','naoh|koh'], consume:[0], produce:['traffic'], kind:'chem', safety:'lab', noEq:1,
  signs:['color'], eq:'indigo carmine (ox, green) + glucose → indigo carmine (red → yellow)', seq:[[0,'#2f9e44',.85],[4.5,'#c0392b',.85],[9.5,'#e0b020',.85]], stirReset:1,
  title:L('The traffic light reaction','Reacția semafor'),
  b:L('Green… red… yellow! The liquid is changing colour all by itself like a traffic light. Now press Stir to shake it and watch it turn green again!','Verde… roșu… galben! Lichidul își schimbă singur culoarea, ca un semafor. Acum apasă Amestecă ca să-l agiți și privește cum redevine verde!'),
  e:L('The glucose slowly gives electrons to the blue dye, and in this basic liquid each step shows a different colour: green, then red, then yellow. Stirring mixes in oxygen from the air, which takes the electrons back, and the colours start again. It works until the glucose runs out.','Glucoza dă încet electroni colorantului albastru, iar în acest lichid bazic fiecare etapă are altă culoare: verde, apoi roșu, apoi galben. Amestecarea aduce oxigen din aer, care ia electronii înapoi, iar culorile o iau de la capăt. Funcționează până se termină glucoza.'),
  s:L('In alkaline solution glucose (as its enediolate) reduces indigo carmine in two one-electron steps: oxidised form (yellow-green mix at high pH) → radical/semiquinone (red) → leuco form (yellow). Dissolved O₂ from shaking reoxidises the dye, so the cycle is a reversible redox clock limited by glucose.','În soluție bazică, glucoza (ca enediolat) reduce indigo carminul în două etape de câte un electron: forma oxidată (verde la pH mare) → radical/semichinonă (roșu) → forma leuco (galben). O₂ dizolvat prin agitare reoxidează colorantul, deci ciclul este un ceas redox reversibil, limitat de glucoză.'),
  fact:L('The famous “blue bottle” experiment works the same way with a different dye.','Celebrul experiment al „sticlei albastre” funcționează la fel, cu alt colorant.')});

R({id:'chameleon', needs:['kmno4aq','naoh|koh','glucose|glucoseaq'], consume:[0], produce:['chameleon'], kind:'chem', safety:'lab', noEq:1,
  signs:['color'], eq:'MnO₄⁻ (purple) → MnO₄²⁻ (green) → MnO₂ (brown)', seq:[[0,'#7b2a8c',.92],[3,'#3b3fb0',.9],[6.5,'#2e8b57',.88],[11,'#b98a2a',.85]],
  title:L('The chemical chameleon','Cameleonul chimic'),
  b:L('Purple, then blue, then green, then orange-brown! Like a chameleon, the liquid keeps changing colour on its own.','Mov, apoi albastru, apoi verde, apoi portocaliu-maro! Ca un cameleon, lichidul își schimbă singur culoarea.'),
  e:L('The purple colour comes from manganese holding lots of oxygen. The sugar slowly takes some of that oxygen away, step by step, and each step has its own colour: purple, green, then brown. The blue you saw in the middle is the purple and green mixed together.','Culoarea mov vine de la manganul care ține mult oxigen. Zahărul ia încet o parte din acest oxigen, pas cu pas, iar fiecare pas are culoarea lui: mov, verde, apoi maro. Albastrul din mijloc este amestecul de mov și verde.'),
  s:L('Stepwise reduction of manganese in base: Mn(VII) permanganate MnO₄⁻ (violet) → Mn(VI) manganate MnO₄²⁻ (green), via transient Mn(V) hypomanganate (blue) → Mn(IV) MnO₂ (brown colloid). Glucose is oxidised to gluconate. The base stabilises the intermediate oxidation states.','Reducerea treptată a manganului în mediu bazic: Mn(VII) permanganat MnO₄⁻ (violet) → Mn(VI) manganat MnO₄²⁻ (verde), prin Mn(V) hipomanganat tranzitoriu (albastru) → Mn(IV) MnO₂ (coloid maro). Glucoza se oxidează la gluconat. Baza stabilizează stările de oxidare intermediare.'),
  fact:L('The chemist Glauber described this colour change almost 400 years ago.','Chimistul Glauber a descris această schimbare de culoare acum aproape 400 de ani.')});

R({id:'kmno4_dissolve', needs:['kmno4','@water'], consume:[0], produce:['kmno4aq'], kind:'phys', safety:'lab', colorRate:.5,
  signs:['color'], eq:'KMnO₄(s) → K⁺(aq) + MnO₄⁻(aq)', fx:[{t:'trails', color:'#7a1a8c', dur:5}],
  title:L('Purple ribbons','Panglici mov'),
  b:L('Beautiful purple ribbons streamed down from the crystals and turned all the water deep purple! Just a few crystals coloured the whole beaker.','Din cristale au curs panglici mov frumoase, care au colorat toată apa în mov închis! Doar câteva cristale au colorat tot paharul.'),
  e:L('Permanganate particles spread out through the water all by themselves. This is called diffusion. The colour is so strong that even a tiny amount is easy to see.','Particulele de permanganat se împrăștie singure prin apă. Asta se numește difuzie. Culoarea este atât de puternică încât se vede ușor chiar și o cantitate foarte mică.'),
  s:L('MnO₄⁻ has an intense ligand-to-metal charge-transfer absorption (λmax ≈ 525 nm, ε ≈ 2,400 L mol⁻¹ cm⁻¹), so dilute solutions remain strongly coloured. The streamers are dense solution sinking and diffusing.','MnO₄⁻ are o absorbție intensă de transfer de sarcină ligand–metal (λmax ≈ 525 nm, ε ≈ 2.400 L mol⁻¹ cm⁻¹), așa că soluțiile diluate rămân puternic colorate. Panglicile sunt soluție densă care coboară și difuzează.'),
  fact:L('Doctors once used very dilute permanganate to disinfect skin.','Medicii foloseau odinioară permanganat foarte diluat pentru dezinfectarea pielii.')});

R({id:'golden', needs:['pbno3','ki|kiaq'], consume:[0,1], produce:['pbi2','kno3'], kind:'chem', safety:'lab', colorRate:1.2,
  signs:['solid','color'], eq:'Pb(NO₃)₂ + 2KI → PbI₂↓ + 2KNO₃', fx:[{t:'swirl', dur:2}],
  zoom:{from:['Pb2+','I-','I-'], to:['PbI2']},
  title:L('Golden rain','Ploaie de aur'),
  b:L('Two clear liquids made a cloud of glittering gold! It looks like golden rain, but it is lead iodide, not real gold.','Două lichide limpezi au făcut un nor de aur strălucitor! Arată ca o ploaie de aur, dar este iodură de plumb, nu aur adevărat.'),
  e:L('Lead ions from one liquid meet iodide ions from the other. Together they form lead iodide, a yellow solid that can’t dissolve in cold water. It comes out as tiny, flat, shiny crystals that sparkle as they fall.','Ionii de plumb dintr-un lichid îi întâlnesc pe ionii de iodură din celălalt. Împreună formează iodură de plumb, un solid galben care nu se poate dizolva în apă rece. Apare sub formă de cristale minuscule, plate și lucioase, care strălucesc când cad.'),
  s:L('Precipitation: Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s), Ksp ≈ 7 × 10⁻⁹. PbI₂ is far more soluble in hot water, so in the full demonstration the precipitate is dissolved by heating and recrystallises on slow cooling as hexagonal platelets that glitter.','Precipitare: Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s), Ks ≈ 7 × 10⁻⁹. PbI₂ este mult mai solubilă în apă fierbinte, așa că în demonstrația completă precipitatul se dizolvă prin încălzire și recristalizează la răcire lentă ca plăcuțe hexagonale strălucitoare.'),
  fact:L('Lead is poisonous, which is why this beautiful experiment is only for real labs.','Plumbul este otrăvitor, de aceea acest experiment frumos este doar pentru laboratoarele adevărate.')});

R({id:'agi', needs:['agno3','ki|kiaq'], consume:[0,1], produce:['agi','kno3'], kind:'chem', safety:'lab',
  signs:['solid','color'], eq:'AgNO₃ + KI → AgI↓ + KNO₃', fx:[{t:'swirl', dur:2}],
  zoom:{from:['Ag+','I-'], to:['AgI']},
  title:L('A pale yellow cloud','Un nor galben-pal'),
  b:L('A creamy yellow cloud appeared! Silver and iodine made a new solid.','A apărut un nor galben-crem! Argintul și iodul au făcut un solid nou.'),
  e:L('Silver ions meet iodide ions and form silver iodide, which does not dissolve. With chloride you get a white cloud, with iodide a yellow one: chemists use the colour to tell them apart.','Ionii de argint întâlnesc ionii de iodură și formează iodură de argint, care nu se dizolvă. Cu clorura obții un nor alb, cu iodura unul galben: chimiștii folosesc culoarea ca să le deosebească.'),
  s:L('Ag⁺ + I⁻ → AgI(s), Ksp ≈ 8.5 × 10⁻¹⁷, far less soluble than AgCl. The halide test: Cl⁻ white, Br⁻ cream, I⁻ yellow; AgI does not redissolve in concentrated ammonia.','Ag⁺ + I⁻ → AgI(s), Ks ≈ 8,5 × 10⁻¹⁷, mult mai puțin solubilă decât AgCl. Testul halogenurilor: Cl⁻ alb, Br⁻ crem, I⁻ galben; AgI nu se redizolvă în amoniac concentrat.'),
  fact:L('Silver iodide is sprayed into clouds to help make rain or snow (cloud seeding).','Iodura de argint se pulverizează în nori ca să ajute la formarea ploii sau a zăpezii (însămânțarea norilor).')});

const KIF = L('Potassium iodide is the catalyst: iodide ions grab an oxygen atom from hydrogen peroxide and hand it on, over and over, so the peroxide breaks down extremely fast. Some iodine forms too, giving the foam a yellow-brown tint.','Iodura de potasiu este catalizatorul: ionii de iodură iau un atom de oxigen de la apa oxigenată și îl dau mai departe, iar și iar, așa că apa oxigenată se descompune extrem de repede. Se formează și puțin iod, care dă spumei o nuanță galben-maronie.');
const KIS = L('Iodide catalysis: H₂O₂ + I⁻ → H₂O + IO⁻ (slow, rate-determining), then H₂O₂ + IO⁻ → H₂O + O₂ + I⁻. Overall 2H₂O₂ → 2H₂O + O₂, strongly exothermic; the foam can reach near 100 °C and steams.','Cataliză cu iodură: H₂O₂ + I⁻ → H₂O + IO⁻ (etapa lentă, determinantă de viteză), apoi H₂O₂ + IO⁻ → H₂O + O₂ + I⁻. Global 2H₂O₂ → 2H₂O + O₂, puternic exotermă; spuma poate ajunge aproape de 100 °C și scoate aburi.');
R({id:'h2o2_ki', key:'h2o2_ki:soap', needs:['h2o2','ki|kiaq','soap'], consume:[0], produce:['water','i2'], wp:['o2'], kind:'chem', energy:'exo', safety:'lab', temp:40,
  signs:['gas','heat','color'], eq:'2H₂O₂ → 2H₂O + O₂↑  (catalyst: I⁻)', fx:[{t:'foam', h:3.6, color:'#f3dc92', rise:4, dur:9}, {t:'steam', dur:6, rate:6}, {t:'bubbles', rate:50, dur:2}],
  zoom:{from:['H2O2','H2O2','I-'], to:['H2O','H2O','O2','I-']},
  title:L('Super elephant toothpaste!','Super pastă de dinți pentru elefanți!'),
  b:L('KABOOM of foam! A giant, steaming, yellow foam monster shot out even faster than with yeast!','BUM de spumă! Un monstru uriaș de spumă galbenă, care scoate aburi, a țâșnit chiar mai repede decât cu drojdia!'),
  e:KIF, s:KIS,
  fact:L('Science museums use this version for their biggest foam shows, with 30% peroxide that only trained staff may handle.','Muzeele de știință folosesc această variantă pentru cele mai mari spectacole cu spumă, cu apă oxigenată de 30%, pe care doar personalul instruit o poate folosi.')});
R({id:'h2o2_ki', key:'h2o2_ki:plain', needs:['h2o2','ki|kiaq'], unless:['soap'], consume:[0], produce:['water','i2'], wp:['o2'], kind:'chem', energy:'exo', safety:'adult', temp:25,
  signs:['gas','heat','color'], eq:'2H₂O₂ → 2H₂O + O₂↑  (catalyst: I⁻)', fx:[{t:'bubbles', rate:55, dur:5}, {t:'steam', dur:3, rate:3}, {t:'foam', h:.5, color:'#f5e2a8', rise:2, dur:5}],
  zoom:{from:['H2O2','H2O2','I-'], to:['H2O','H2O','O2','I-']},
  title:L('Iodide makes oxygen fast','Iodura face oxigen rapid'),
  b:L('Tons of bubbles and steam, and the liquid turned yellow-brown! Add dish soap first next time for a huge foam tower.','O mulțime de bule și aburi, iar lichidul a devenit galben-maroniu! Data viitoare pune întâi detergent pentru un turn uriaș de spumă.'),
  e:KIF, s:KIS,
  fact:L('Catalysts in car exhausts work in a similar way, helping harmful gases react without being used up.','Catalizatorii din țevile de eșapament funcționează asemănător: ajută gazele nocive să reacționeze fără să se consume.')});

R({id:'fe_scn', needs:['fecl3','kscn'], consume:[0,1], produce:['fescn'], kind:'chem', safety:'lab', colorRate:2.5,
  signs:['color'], eq:'Fe³⁺ + SCN⁻ → [Fe(SCN)]²⁺', fx:[{t:'trails', color:'#8e0b12', dur:3}],
  zoom:{from:['Fe3+','SCN-'], to:['FeSCN']},
  title:L('Fake blood!','Sânge fals!'),
  b:L('The orange liquid turned blood red in a flash! It looks spooky, but it is just iron and a detective chemical holding hands.','Lichidul portocaliu s-a făcut roșu ca sângele într-o clipă! Arată înfricoșător, dar sunt doar fierul și o substanță-detectiv care se țin de mână.'),
  e:L('Thiocyanate ions latch onto iron ions and form a new particle with a very strong red colour. Even a tiny trace of iron turns red, so chemists use it to detect iron.','Ionii tiocianat se prind de ionii de fier și formează o particulă nouă, cu o culoare roșie foarte puternică. Chiar și o urmă mică de fier se înroșește, așa că chimiștii o folosesc ca să detecteze fierul.'),
  s:L('Complex formation: Fe³⁺(aq) + SCN⁻(aq) ⇌ [Fe(SCN)(H₂O)₅]²⁺, an intense charge-transfer band near 480 nm. The equilibrium is the classic demonstration of Le Chatelier’s principle.','Formarea unui complex: Fe³⁺(aq) + SCN⁻(aq) ⇌ [Fe(SCN)(H₂O)₅]²⁺, cu o bandă intensă de transfer de sarcină în jur de 480 nm. Echilibrul este demonstrația clasică a principiului lui Le Chatelier.'),
  fact:L('Film special effects teams have used this trick to make fake blood appear on a clean knife.','Echipele de efecte speciale au folosit acest truc ca să facă să apară sânge fals pe un cuțit curat.')});

R({id:'fe_base', needs:['fecl3','naoh|koh'], consume:[0,1], produce:['feoh3','saltaq'], kind:'chem', safety:'lab',
  signs:['solid','color'], eq:'FeCl₃ + 3NaOH → Fe(OH)₃↓ + 3NaCl', fx:[{t:'swirl', dur:2}],
  zoom:{from:['Fe3+','OH-','OH-','OH-'], to:['FeOH3']},
  title:L('A rusty cloud','Un nor ruginiu'),
  b:L('A rusty orange-brown cloud appeared! The iron made a solid that looks just like rust.','A apărut un nor maro-portocaliu, ruginiu! Fierul a făcut un solid care arată exact ca rugina.'),
  e:L('Iron ions met hydroxide ions from the base and formed iron hydroxide, which does not dissolve. It is closely related to rust, which is why it has that colour.','Ionii de fier s-au întâlnit cu ionii hidroxid din bază și au format hidroxid de fier, care nu se dizolvă. Este o rudă apropiată a ruginii, de aceea are această culoare.'),
  s:L('Fe³⁺ + 3OH⁻ → Fe(OH)₃(s) (hydrous FeO(OH)), Ksp ≈ 10⁻³⁸. Compare Cu²⁺ (blue) and Fe²⁺ (green) hydroxides: this is a standard test for metal ions.','Fe³⁺ + 3OH⁻ → Fe(OH)₃(s) (FeO(OH) hidratat), Ks ≈ 10⁻³⁸. Compară cu hidroxizii de Cu²⁺ (albastru) și Fe²⁺ (verde): este un test standard pentru ionii metalici.'),
  fact:L('Iron hydroxide is used in water treatment to trap dirt and arsenic.','Hidroxidul de fier se folosește la tratarea apei pentru a prinde murdăria și arsenul.')});

R({id:'iodine_clock', needs:['h2o2','iodine','starch','vitc'], consume:[0,1], produce:['iodstarch'], kind:'chem', safety:'adult', noEq:1,
  signs:['color'], eq:'H₂O₂ + 2I⁻ + 2H⁺ → I₂ + 2H₂O ; I₂ + C₆H₈O₆ → 2I⁻ + C₆H₆O₆ + 2H⁺', seq:[[0,'#f2f0e0',.3],[7,'#141a3a',.96]],
  title:L('The iodine clock','Ceasul cu iod'),
  b:L('Tick… tock… nothing… then suddenly the whole beaker turned dark blue-black in a flash! It was like a chemical timer.','Tic… tac… nimic… apoi deodată tot paharul s-a făcut albastru-negru într-o clipă! A fost ca un cronometru chimic.'),
  e:L('Two races happen at once. Hydrogen peroxide keeps making iodine, but vitamin C instantly turns it back into colourless iodide. When all the vitamin C is used up, iodine finally survives, meets the starch and turns dark blue all at once. Less vitamin C means a shorter timer.','Au loc două curse deodată. Apa oxigenată face mereu iod, dar vitamina C îl transformă imediat înapoi în iodură incoloră. Când vitamina C se termină, iodul supraviețuiește în sfârșit, întâlnește amidonul și se face albastru închis dintr-odată. Mai puțină vitamina C înseamnă un cronometru mai scurt.'),
  s:L('A clock reaction: slow oxidation H₂O₂ + 2I⁻ + 2H⁺ → I₂ + 2H₂O competes with fast reduction of I₂ by ascorbic acid. The induction time is set by the ascorbic acid amount divided by the rate of iodine formation. When ascorbate is exhausted, I₂/I₃⁻ threads into starch helices, forming the blue-black complex (λmax ≈ 600 nm).','O reacție-ceas: oxidarea lentă H₂O₂ + 2I⁻ + 2H⁺ → I₂ + 2H₂O concurează cu reducerea rapidă a I₂ de către acidul ascorbic. Timpul de inducție este dat de cantitatea de acid ascorbic împărțită la viteza de formare a iodului. Când ascorbatul se epuizează, I₂/I₃⁻ intră în spiralele de amidon și formează complexul albastru-negru (λmax ≈ 600 nm).'),
  fact:L('Scientists use clock reactions to measure how fast reactions go.','Oamenii de știință folosesc reacțiile-ceas ca să măsoare cât de repede au loc reacțiile.')});

R({id:'iodine_starch', needs:['iodine','starch'], unless:['vitc'], consume:[0], produce:['iodstarch'], kind:'chem', safety:'home', colorRate:3,
  signs:['color'], eq:'I₂ + starch → blue-black complex', noEq:1, fx:[{t:'trails', color:'#141a3a', dur:2.5}],
  title:L('The starch detector','Detectorul de amidon'),
  b:L('The brown iodine turned inky blue-black the moment it touched the starch! Iodine is a starch detector.','Iodul maro s-a făcut albastru-negru ca cerneala în clipa în care a atins amidonul! Iodul este un detector de amidon.'),
  e:L('Starch molecules are long spirals. Iodine slips inside the spiral like a thread through a spring, and that combination looks blue-black. Try it on bread or potato: they are full of starch.','Moleculele de amidon sunt spirale lungi. Iodul intră în spirală ca un fir printr-un arc, iar această combinație pare albastru-neagră. Încearcă pe pâine sau cartof: sunt pline de amidon.'),
  s:L('Amylose forms a left-handed helix; linear polyiodide chains (I₃⁻, I₅⁻) sit in its hydrophobic channel, producing a charge-transfer complex that absorbs strongly around 600 nm.','Amiloza formează o spirală spre stânga; lanțuri liniare de poliiodură (I₃⁻, I₅⁻) stau în canalul ei hidrofob și produc un complex de transfer de sarcină care absoarbe puternic în jur de 600 nm.'),
  fact:L('Shops can test for fake banknotes with an iodine pen: real banknote paper has no starch, so the mark stays yellow.','Magazinele pot testa bancnotele false cu un creion cu iod: hârtia bancnotelor adevărate nu are amidon, așa că urma rămâne galbenă.')});

R({id:'iodine_vitc', needs:['iodine','vitc'], unless:['starch'], consume:[0], produce:['iodide'], kind:'chem', safety:'home', colorRate:2,
  signs:['color'], eq:'I₂ + C₆H₈O₆ → 2I⁻ + C₆H₆O₆ + 2H⁺',
  title:L('Iodine vanishes!','Iodul dispare!'),
  b:L('The brown iodine disappeared and the liquid went clear! Vitamin C made the colour vanish.','Iodul maro a dispărut, iar lichidul s-a limpezit! Vitamina C a făcut culoarea să dispară.'),
  e:L('Vitamin C gives electrons to brown iodine and turns it into iodide, which has no colour. Vitamin C is an antioxidant: it loves giving electrons away.','Vitamina C dă electroni iodului maro și îl transformă în iodură, care nu are culoare. Vitamina C este un antioxidant: îi place să dea electroni.'),
  s:L('Ascorbic acid reduces I₂ to I⁻ and is oxidised to dehydroascorbic acid. This titration is used to measure the vitamin C content of juices.','Acidul ascorbic reduce I₂ la I⁻ și se oxidează la acid dehidroascorbic. Această titrare se folosește pentru a măsura conținutul de vitamina C al sucurilor.'),
  fact:L('Antioxidants in fruit protect your cells in a similar way.','Antioxidanții din fructe îți protejează celulele într-un mod asemănător.')});

R({id:'luminol', needs:['luminol','h2o2','cuso4aq|fecl3|cucl2aq'], consume:[0,1], produce:['lumspent'], wp:['o2'], kind:'chem', safety:'lab', noEq:1,
  signs:['light'], eq:'luminol + H₂O₂ → 3-aminophthalate* → 3-aminophthalate + light', fx:[{t:'glow', dur:11, color:'#3f8cff'}],
  title:L('Glowing in the dark!','Strălucește în întuneric!'),
  b:L('The lights went down and the liquid glowed a magical blue, with no fire and no heat! This is cold light made by chemistry.','Luminile s-au stins, iar lichidul a strălucit într-un albastru magic, fără foc și fără căldură! Aceasta este lumină rece făcută de chimie.'),
  e:L('The metal helps hydrogen peroxide react with luminol. The new molecule is made with extra energy, and it gets rid of that energy by giving off blue light instead of heat. This is called chemiluminescence, and glow sticks work the same way.','Metalul ajută apa oxigenată să reacționeze cu luminolul. Molecula nouă se formează cu energie în plus și scapă de ea emițând lumină albastră în loc de căldură. Asta se numește chemiluminescență, iar batoanele luminoase funcționează la fel.'),
  s:L('Metal-catalysed oxidation of luminol in base gives an excited-state 3-aminophthalate dianion via an endoperoxide intermediate; relaxation to the ground state emits at about 425 nm. Quantum yield is only about 1%, but it is enough to see in the dark.','Oxidarea luminolului în mediu bazic, catalizată de metal, dă dianionul 3-aminoftalat în stare excitată, printr-un intermediar endoperoxidic; revenirea la starea fundamentală emite la aproximativ 425 nm. Randamentul cuantic este doar de circa 1%, dar suficient ca să se vadă în întuneric.'),
  fact:L('Crime scene investigators spray luminol: the iron in blood makes it glow, even on cleaned surfaces.','Anchetatorii pulverizează luminol la locul faptei: fierul din sânge îl face să strălucească, chiar și pe suprafețe curățate.')});

R({id:'mirror', needs:['agno3','ammonia','glucose|glucoseaq'], consume:[0,2], produce:['agmirror','gluconate'], kind:'chem', safety:'lab', noEq:1,
  signs:['solid','color'], eq:'2[Ag(NH₃)₂]⁺ + RCHO + 3OH⁻ → 2Ag↓ + RCOO⁻ + 4NH₃ + 2H₂O',
  title:L('A silver mirror!','O oglindă de argint!'),
  b:L('The inside of the beaker turned into a shiny mirror! Real silver metal coated the glass.','Interiorul paharului s-a transformat într-o oglindă lucioasă! Argint adevărat a acoperit sticla.'),
  e:L('Ammonia holds the silver ions gently in the liquid. Glucose then gives them electrons, and each silver ion becomes a silver atom. The atoms stick to the glass in a smooth, thin layer that reflects light like a mirror.','Amoniacul ține ionii de argint ușor în lichid. Apoi glucoza le dă electroni, iar fiecare ion de argint devine un atom de argint. Atomii se lipesc de sticlă într-un strat subțire și neted, care reflectă lumina ca o oglindă.'),
  s:L('Tollens’ test: diamminesilver(I) is reduced by the aldehyde group of glucose to Ag(0), which nucleates on the glass surface as a continuous metallic film. It is a classic test for aldehydes and reducing sugars.','Testul Tollens: diaminoargintul(I) este redus de gruparea aldehidă a glucozei la Ag(0), care se depune pe suprafața sticlei ca o peliculă metalică continuă. Este un test clasic pentru aldehide și zaharuri reducătoare.'),
  fact:L('Mirrors and Christmas tree baubles used to be silvered with this exact reaction.','Oglinzile și globurile de brad erau argintate cu exact această reacție.')});

R({id:'cu_amm', needs:['cuso4aq|cucl2aq','ammonia'], consume:[0,1], produce:['cuamm'], kind:'chem', safety:'lab', noEq:1,
  signs:['color','solid'], eq:'Cu²⁺ + 4NH₃ → [Cu(NH₃)₄]²⁺', seq:[[0,'#8ecdf2',.75],[2.2,'#1b2bb8',.93]],
  title:L('Royal blue!','Albastru regal!'),
  b:L('First a pale cloud, then WOW, the liquid turned a deep, royal blue! Ammonia gave the copper a whole new colour.','Întâi un nor palid, apoi UAU, lichidul s-a făcut albastru regal, intens! Amoniacul i-a dat cuprului o culoare complet nouă.'),
  e:L('At first a little ammonia makes pale blue copper hydroxide. With more ammonia, four ammonia molecules wrap around each copper ion and pull the solid back into solution. This new copper-ammonia team absorbs light differently, so it looks deep blue.','La început, puțin amoniac face hidroxid de cupru albastru-pal. Cu mai mult amoniac, patru molecule de amoniac se înfășoară în jurul fiecărui ion de cupru și readuc solidul în soluție. Această nouă echipă cupru-amoniac absoarbe lumina altfel, deci pare albastru intens.'),
  s:L('Ligand substitution: [Cu(H₂O)₆]²⁺ + 4NH₃ → [Cu(NH₃)₄(H₂O)₂]²⁺ + 4H₂O. NH₃ is a stronger-field ligand than water, shifting the d–d band from ~800 nm to ~600 nm and increasing its intensity. Cu(OH)₂ forms transiently at low [NH₃].','Substituție de liganzi: [Cu(H₂O)₆]²⁺ + 4NH₃ → [Cu(NH₃)₄(H₂O)₂]²⁺ + 4H₂O. NH₃ este un ligand de câmp mai puternic decât apa, deplasând banda d–d de la ~800 nm la ~600 nm și crescându-i intensitatea. Cu(OH)₂ se formează tranzitoriu la [NH₃] mică.'),
  fact:L('This deep blue solution (Schweizer’s reagent) can even dissolve cotton.','Această soluție albastră intensă (reactivul Schweizer) poate dizolva chiar și bumbacul.')});

R({id:'cu_ag', needs:['cu','agno3'], consume:[1], produce:['agtree','cu2aq'], kind:'chem', safety:'lab', colorRate:.25,
  signs:['solid','color'], eq:'Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag',
  zoom:{from:['Cu','Ag+','Ag+'], to:['Cu2+','Ag','Ag']},
  title:L('A silver Christmas tree','Un brad de argint'),
  b:L('Sparkly silver crystals grew all over the copper wire like a frosty tree, and the liquid slowly turned blue!','Pe sârma de cupru au crescut cristale de argint strălucitoare, ca un brad plin de chiciură, iar lichidul s-a colorat încet în albastru!'),
  e:L('Copper is more reactive than silver, so it pushes silver out of the solution. Silver atoms land on the wire and build branching crystals, while copper goes into the water as blue copper ions.','Cuprul este mai reactiv decât argintul, așa că scoate argintul din soluție. Atomii de argint se așază pe sârmă și construiesc cristale ramificate, iar cuprul trece în apă ca ioni de cupru albaștri.'),
  s:L('Displacement: Cu(s) + 2Ag⁺(aq) → Cu²⁺(aq) + 2Ag(s), E°cell = 0.80 − 0.34 = +0.46 V. Diffusion-limited growth gives dendritic (fractal) silver crystals.','Substituție: Cu(s) + 2Ag⁺(aq) → Cu²⁺(aq) + 2Ag(s), E°pilă = 0,80 − 0,34 = +0,46 V. Creșterea limitată de difuzie dă cristale dendritice (fractale) de argint.'),
  fact:L('Frost on a window grows branches in the same fractal way.','Florile de gheață de pe geam cresc ramuri în același mod fractal.')});

R({id:'cu_hno3', needs:['cu','hno3c'], consume:[0,1], produce:['cuno3g'], wp:['no2','water'], kind:'chem', energy:'exo', safety:'lab', temp:30,
  signs:['gas','color','heat'], eq:'Cu + 4HNO₃ → Cu(NO₃)₂ + 2NO₂↑ + 2H₂O', fx:[{t:'smoke', dur:7, rate:9, color:'150,70,20', alpha:.7}, {t:'bubbles', rate:30, dur:5}, {t:'objfizz', obj:'wire', dur:6, rate:25}],
  title:L('Copper and the brown gas','Cuprul și gazul brun'),
  b:L('The copper fizzed away, a thick brown gas poured out, and the liquid turned green-blue! That brown gas is poisonous, so this is a job for a fume cupboard.','Cuprul a sfârâit și a dispărut, a ieșit un gaz brun și gros, iar lichidul s-a făcut verde-albastru! Gazul brun este otrăvitor, deci treaba asta se face sub nișă.'),
  e:L('Copper doesn’t react with most acids, but concentrated nitric acid is a powerful oxidiser. It pulls electrons from copper and turns into brown nitrogen dioxide gas. The copper ions colour the liquid green-blue.','Cuprul nu reacționează cu majoritatea acizilor, dar acidul azotic concentrat este un oxidant puternic. Smulge electroni de la cupru și se transformă în dioxid de azot, un gaz brun. Ionii de cupru colorează lichidul în verde-albastru.'),
  s:L('Cu + 4HNO₃(conc) → Cu(NO₃)₂ + 2NO₂ + 2H₂O. The nitrate is reduced (N +5 → +4). Dissolved NO₂ makes the solution green; on dilution it becomes the blue hexaaqua copper(II). With dilute acid, NO forms instead.','Cu + 4HNO₃(conc) → Cu(NO₃)₂ + 2NO₂ + 2H₂O. Nitratul se reduce (N +5 → +4). NO₂ dizolvat face soluția verde; prin diluare devine albastră (hexaacvo cupru(II)). Cu acid diluat se formează în schimb NO.'),
  fact:L('NO₂ is the brown haze you can sometimes see over busy cities on smoggy days.','NO₂ este ceața maronie care se vede uneori deasupra orașelor aglomerate în zilele cu smog.')});

R({id:'al_cucl2', needs:['al','cucl2aq'], consume:[0,1], produce:['cuppt','alcl3'], wp:['h2'], kind:'chem', energy:'exo', safety:'lab', temp:35, colorRate:.4,
  signs:['gas','heat','solid','color'], eq:'2Al + 3CuCl₂ → 2AlCl₃ + 3Cu', fx:[{t:'objfizz', obj:'foil', dur:7, rate:40}, {t:'steam', dur:6, rate:4}, {t:'shimmer'}],
  zoom:{from:['Al','Cu2+','Cl-','Cl-'], to:['Al3+','Cu','Cl-','Cl-']},
  title:L('Foil fizz and copper sludge','Folie care sfârâie și cupru spongios'),
  b:L('The foil fizzed wildly, the beaker got hot, the blue-green colour faded and brown-red copper appeared!','Folia a sfârâit puternic, paharul s-a încins, culoarea albastru-verzuie s-a estompat și a apărut cupru roșu-maroniu!'),
  e:L('Aluminium is much more reactive than copper, so it pushes the copper out. The chloride ions help by breaking the thin protective skin on the aluminium. Some aluminium also reacts with the water, making hydrogen bubbles and lots of heat.','Aluminiul este mult mai reactiv decât cuprul, așa că îl scoate afară. Ionii de clorură ajută, spărgând pielea subțire care protejează aluminiul. O parte din aluminiu reacționează și cu apa, făcând bule de hidrogen și multă căldură.'),
  s:L('2Al + 3Cu²⁺ → 2Al³⁺ + 3Cu, E°cell ≈ +2.0 V. Cl⁻ pits the passivating Al₂O₃ layer; hydrolysis of Al³⁺ acidifies the solution and exposed Al also reduces H⁺/H₂O to H₂, which adds to the heat.','2Al + 3Cu²⁺ → 2Al³⁺ + 3Cu, E°pilă ≈ +2,0 V. Cl⁻ perforează stratul pasivant de Al₂O₃; hidroliza Al³⁺ acidifică soluția, iar aluminiul expus reduce și H⁺/H₂O la H₂, ceea ce adaugă căldură.'),
  fact:L('Salt water corrodes aluminium boats for the same reason: chloride attacks the oxide skin.','Apa sărată corodează bărcile de aluminiu din același motiv: clorura atacă pielea de oxid.')});

R({id:'al_cucl2', key:'al_cucl2:salt', needs:['al','cuso4aq','salt|saltaq'], consume:[0,1], produce:['cuppt','alcl3'], wp:['h2'], kind:'chem', energy:'exo', safety:'lab', temp:30, colorRate:.4,
  signs:['gas','heat','solid','color'], eq:'2Al + 3CuSO₄ → Al₂(SO₄)₃ + 3Cu  (Cl⁻ breaks the oxide layer)', fx:[{t:'objfizz', obj:'foil', dur:7, rate:40}, {t:'steam', dur:6, rate:4}, {t:'shimmer'}],
  zoom:{from:['Al','Cu2+','Cl-','Cl-'], to:['Al3+','Cu','Cl-','Cl-']},
  title:L('Salt wakes up the aluminium!','Sarea trezește aluminiul!'),
  b:L('As soon as salt joined in, the lazy foil woke up: wild fizzing, heat and brown copper!','Imediat ce a venit sarea, folia leneșă s-a trezit: sfârâit puternic, căldură și cupru maro!'),
  e:L('Before, a thin invisible skin of aluminium oxide protected the foil. Chloride ions from the salt punch holes in that skin, and then the aluminium can finally push out the copper.','Înainte, o piele subțire și invizibilă de oxid de aluminiu proteja folia. Ionii de clorură din sare fac găuri în această piele, iar apoi aluminiul poate în sfârșit să scoată cuprul afară.'),
  s:L('Passivation: the ~5 nm Al₂O₃ film blocks electron transfer in sulfate solution. Cl⁻ adsorbs and causes pitting corrosion, exposing Al metal; the displacement 2Al + 3Cu²⁺ → 2Al³⁺ + 3Cu then proceeds rapidly.','Pasivare: pelicula de Al₂O₃ de ~5 nm blochează transferul de electroni în soluția de sulfat. Cl⁻ se adsoarbe și produce coroziune în puncte, expunând aluminiul metalic; substituția 2Al + 3Cu²⁺ → 2Al³⁺ + 3Cu are loc apoi rapid.'),
  fact:L('Aluminium is very reactive, yet aluminium pans last for years thanks to that invisible oxide skin.','Aluminiul este foarte reactiv, totuși tigăile de aluminiu rezistă ani la rând datorită acestei pieli invizibile de oxid.')});

R({id:'al_lazy', needs:['al','cuso4aq'], unless:['salt','saltaq'], consume:[], produce:[], kind:'phys', safety:'lab', quiet:1, noEq:1,
  signs:[], title:L('The aluminium is sleeping','Aluminiul doarme'),
  b:L('Nothing happened! Aluminium should push out copper, but here it just sits there. Try adding some table salt…','Nu s-a întâmplat nimic! Aluminiul ar trebui să scoată cuprul afară, dar aici doar stă. Încearcă să adaugi puțină sare de bucătărie…'),
  e:L('Aluminium is covered by a very thin, invisible skin of aluminium oxide that stops reactions. Sulfate can’t break it, but chloride can.','Aluminiul este acoperit de o piele foarte subțire și invizibilă de oxid de aluminiu, care oprește reacțiile. Sulfatul nu o poate sparge, dar clorura poate.'),
  s:L('Kinetic inertness from surface passivation, despite a large thermodynamic driving force (E°cell ≈ +2.0 V).','Inerție cinetică datorată pasivării suprafeței, deși forța motrice termodinamică este mare (E°pilă ≈ +2,0 V).'),
  fact:L('Anodising makes the oxide skin on aluminium even thicker, so it can be dyed bright colours.','Anodizarea face pielea de oxid a aluminiului și mai groasă, ca să poată fi vopsită în culori vii.')});

// silent dissolving (no card of their own)
for(const [s, p] of [['glucose','glucoseaq'],['ki','kiaq'],['cucl2','cucl2aq'],['cocl2','cocl2aq'],['naacs','naac'],['licl','liclaq'],['srcl2','srcl2aq']]){
  R({id:'dissolve_' + s, needs:[s, '@water'], consume:[0], produce:[p], silent:1, kind:'phys', fx:[{t:'dissolve', color:SPECIES[s].c === '#fbfbf8' ? '#ffffff' : SPECIES[s].c, dur:2.2}]});
  delete RULE_INFO['dissolve_' + s];
}
R({id:'cocl2b_water', needs:['cocl2b','@water'], consume:[0], produce:['cocl2aq'], kind:'chem', energy:'exo', safety:'lab', temp:8,
  signs:['color','heat'], eq:'CoCl₂ + 6H₂O → CoCl₂·6H₂O', fx:[{t:'swirl', dur:2}],
  title:L('Blue back to pink','Din albastru înapoi în roz'),
  b:L('The blue powder turned pink again as soon as water touched it! It is a water detector.','Pulberea albastră a redevenit roz imediat ce a atins-o apa! Este un detector de apă.'),
  e:L('Water molecules crowd back around each cobalt ion, and cobalt wrapped in water is pink. The change goes both ways.','Moleculele de apă se strâng din nou în jurul fiecărui ion de cobalt, iar cobaltul înconjurat de apă este roz. Schimbarea merge în ambele sensuri.'),
  s:L('Rehydration regenerates octahedral [Co(H₂O)₆]²⁺. The CoCl₄²⁻ ⇌ [Co(H₂O)₆]²⁺ equilibrium also shifts with temperature and chloride concentration (Le Chatelier).','Rehidratarea regenerează [Co(H₂O)₆]²⁺ octaedric. Echilibrul CoCl₄²⁻ ⇌ [Co(H₂O)₆]²⁺ se deplasează și cu temperatura și concentrația de clorură (Le Chatelier).'),
  fact:L('Old “weather predictor” toys used cobalt chloride: blue for dry weather, pink for rain on the way.','Jucăriile vechi care „preziceau vremea” foloseau clorură de cobalt: albastru pentru vreme uscată, roz pentru ploaie.')});

RULES.unshift(...NEW);
TOTAL_DISC = Object.keys(RULE_INFO).length;

// extra zoom templates / elements
Object.assign(EL, {Li:{c:'#c98bf0', r:.6, txt:'#fff'}, Cs:{c:'#5b2a95', r:.86, txt:'#fff'}, Pb:{c:'#5a5d66', r:.62, txt:'#fff'}, I:{c:'#8a2b8a', r:.62, txt:'#fff'}, Al:{c:'#b7a3a3', r:.58, txt:'#fff'}});
Object.assign(TPL, {
  Li:{a:[['Li',0,0]], b:[], l:'Li'}, Cs:{a:[['Cs',0,0]], b:[], l:'Cs'}, Al:{a:[['Al',0,0]], b:[], l:'Al'}, Ag:{a:[['Ag',0,0]], b:[], l:'Ag'},
  LiOH:{a:[['Li',-.95,0,'+'],['O',.22,0,'−'],['H',.95,-.3]], b:[[0,1,'i'],[1,2,1]], l:'LiOH'},
  CsOH:{a:[['Cs',-1.2,0,'+'],['O',.22,0,'−'],['H',.95,-.3]], b:[[0,1,'i'],[1,2,1]], l:'CsOH'},
  'Pb2+':{a:[['Pb',0,0,'2+']], b:[], l:'Pb²⁺'}, 'I-':{a:[['I',0,0,'−']], b:[], l:'I⁻'},
  PbI2:{a:[['I',-1.2,0],['Pb',0,0],['I',1.2,0]], b:[[0,1,'i'],[1,2,'i']], l:'PbI₂'},
  AgI:{a:[['Ag',-.62,0],['I',.64,0]], b:[[0,1,'i']], l:'AgI'},
  'Fe3+':{a:[['Fe',0,0,'3+']], b:[], l:'Fe³⁺'},
  'SCN-':{a:[['S',-1.0,0,'−'],['C',0,0],['N',.95,0]], b:[[0,1,1],[1,2,3]], l:'SCN⁻'},
  FeSCN:{a:[['Fe',-1.05,0,'2+'],['N',0,0],['C',.92,0],['S',1.95,0]], b:[[0,1,1],[1,2,3],[2,3,1]], l:'[FeSCN]²⁺'},
  FeOH3:{a:[['Fe',0,0],['O',-1,-.2],['H',-1.6,-.7],['O',1,-.2],['H',1.6,-.7],['O',0,1],['H',.6,1.5]], b:[[0,1,1],[1,2,1],[0,3,1],[3,4,1],[0,5,1],[5,6,1]], l:'Fe(OH)₃'},
  'Al3+':{a:[['Al',0,0,'3+']], b:[], l:'Al³⁺'},
  Fe2O3:{a:[['Fe',-.9,0],['O',0,-.7],['O',0,.7],['Fe',.9,0],['O',1.8,0]], b:[[0,1,1],[0,2,1],[3,1,1],[3,2,1],[3,4,2]], l:'Fe₂O₃'},
  Al2O3:{a:[['Al',-.9,0],['O',0,-.7],['O',0,.7],['Al',.9,0],['O',1.8,0]], b:[[0,1,1],[0,2,1],[3,1,1],[3,2,1],[3,4,2]], l:'Al₂O₃'},
  CaCO3n:{a:[['Ca',-1.5,0,'2+'],['O',-.42,0,'−'],['C',.4,0],['O',.95,-.8],['O',.95,.8,'−']], b:[[0,1,'i'],[1,2,1],[2,3,2],[2,4,1]], l:'CaCO₃'},
});

// ---------- missions (steps) ----------
const MS = (key, title, goal, steps) => ({key, title, goal, steps});
const st = (ev, en, ro) => ({ev, t:L(en, ro)});
MISSIONS.length = 0;
MISSIONS.push(
  MS('add:water', L('Fill the beaker','Umple paharul'), L('Add water to the beaker.','Adaugă apă în pahar.'), [st('add:water','Add Water','Adaugă Apă')]),
  MS('rule:salt_dissolve', L('Where did the salt go?','Unde a dispărut sarea?'), L('Dissolve table salt in water.','Dizolvă sare de bucătărie în apă.'), [st('add:water','Add Water','Adaugă Apă'), st('add:salt','Add Table salt','Adaugă Sare de bucătărie')]),
  MS('rule:oil_water', L('Oil versus water','Uleiul contra apei'), L('Find out if oil and water mix.','Află dacă uleiul și apa se amestecă.'), [st('add:water','Add Water','Adaugă Apă'), st('add:oil','Add Cooking oil','Adaugă Ulei de gătit')]),
  MS('rule:soap_emulsion', L('Make them friends','Fă-i prieteni'), L('Use dish soap to mix oil and water.','Folosește detergent ca să amesteci uleiul cu apa.'), [st('add:water','Add Water','Adaugă Apă'), st('add:oil','Add Cooking oil','Adaugă Ulei de gătit'), st('add:soap','Add Dish soap','Adaugă Detergent de vase')]),
  MS('rule:acid_carb:vinegar:soda', L('Kitchen volcano','Vulcanul din bucătărie'), L('Make a foamy eruption.','Fă o erupție spumoasă.'), [st('add:vinegar','Pour in Vinegar','Toarnă Oțet'), st('add:soda','Add Baking soda','Adaugă Bicarbonat de sodiu')]),
  MS('indicator:acid', L('Colour detective','Detectivul culorilor'), L('Turn red cabbage juice pink with an acid.','Fă sucul de varză roșie roz cu un acid.'), [st('add:cabbage','Add Red cabbage juice','Adaugă Suc de varză roșie'), st('add:lemon|add:vinegar','Add Lemon juice or Vinegar','Adaugă Suc de lămâie sau Oțet')]),
  MS('indicator:base', L('Green magic','Magie verde'), L('Turn red cabbage juice blue-green with a base.','Fă sucul de varză roșie albastru-verzui cu o bază.'), [st('add:cabbage','Add Red cabbage juice','Adaugă Suc de varză roșie'), st('add:soda|add:soap|add:naoh|add:ammonia','Add Baking soda, Dish soap or Ammonia','Adaugă Bicarbonat, Detergent sau Amoniac')]),
  MS('rule:na_water', L('Sodium on water','Sodiu pe apă'), L('Drop sodium into water. Only in a virtual lab!','Aruncă sodiu în apă. Doar în laboratorul virtual!'), [st('add:water','Add Water','Adaugă Apă'), st('add:na','Drop in Sodium (Metals)','Aruncă Sodiu (Metale)')]),
  MS('rule:neutralize', L('Back to neutral','Înapoi la neutru'), L('Neutralise an acid with a base and watch the colour.','Neutralizează un acid cu o bază și urmărește culoarea.'), [st('add:cabbage','Add Red cabbage juice','Adaugă Suc de varză roșie'), st('add:hcl','Add Hydrochloric acid','Adaugă Acid clorhidric'), st('add:naoh','Add Sodium hydroxide','Adaugă Hidroxid de sodiu')]),
  MS('rule:fe_cuso4', L('Copper-plated nail','Cuiul placat cu cupru'), L('Put an iron nail into copper sulfate solution.','Pune un cui de fier în soluție de sulfat de cupru.'), [st('add:water','Add Water','Adaugă Apă'), st('add:cuso4','Add Copper sulfate','Adaugă Sulfat de cupru'), st('add:fe','Drop in the Iron nail','Pune Cuiul de fier'), st('rule:fe_cuso4','Watch the nail change colour','Privește cum își schimbă cuiul culoarea')]),
  MS('rule:agno3_cl', L('Make a white cloud','Fă un nor alb'), L('Mix silver nitrate with salt water.','Amestecă azotat de argint cu apă sărată.'), [st('add:water','Add Water','Adaugă Apă'), st('add:salt','Add Table salt','Adaugă Sare de bucătărie'), st('add:agno3','Add Silver nitrate','Adaugă Azotat de argint')]),
  MS('rule:h2o2_yeast:soap', L('Elephant toothpaste','Pastă de dinți pentru elefanți'), L('Make a giant tower of foam.','Fă un turn uriaș de spumă.'), [st('add:h2o2','Add Hydrogen peroxide','Adaugă Apă oxigenată'), st('add:soap','Add Dish soap','Adaugă Detergent de vase'), st('add:yeast','Add Yeast','Adaugă Drojdie')]),
  MS('rule:evaporate:salt', L('Get the salt back','Recuperează sarea'), L('Make salt water, then boil all the water away.','Fă apă sărată, apoi fierbe toată apa.'), [st('add:water','Add Water','Adaugă Apă'), st('add:salt','Add Table salt','Adaugă Sare de bucătărie'), st('heat:on','Light the burner','Aprinde arzătorul'), st('rule:evaporate','Wait until the water boils away','Așteaptă până fierbe toată apa')]),
  MS('rule:mg_burn', L('Magnesium flash','Blitul de magneziu'), L('Heat magnesium ribbon in a dry beaker.','Încălzește panglica de magneziu într-un pahar uscat.'), [st('add:mg','Add Magnesium ribbon','Adaugă Panglică de magneziu'), st('heat:on','Light the burner','Aprinde arzătorul'), st('rule:mg_burn','Wait for it to get hot','Așteaptă să se încălzească')]),
  MS('rule:traffic', L('Traffic light','Semaforul'), L('Make a liquid that changes colour like a traffic light.','Fă un lichid care își schimbă culoarea ca un semafor.'), [st('add:indigo','Add Indigo carmine dye','Adaugă Colorant indigo carmin'), st('add:glucose','Add Glucose','Adaugă Glucoză'), st('add:naoh','Add Sodium hydroxide','Adaugă Hidroxid de sodiu'), st('stir','Wait for yellow, then press Stir','Așteaptă galbenul, apoi apasă Amestecă')]),
  MS('rule:chameleon', L('Chemical chameleon','Cameleonul chimic'), L('Watch purple change through a rainbow of colours.','Privește cum movul trece printr-un curcubeu de culori.'), [st('add:water','Add Water','Adaugă Apă'), st('add:kmno4','Add Potassium permanganate','Adaugă Permanganat de potasiu'), st('add:naoh','Add Sodium hydroxide','Adaugă Hidroxid de sodiu'), st('add:glucose','Add Glucose','Adaugă Glucoză')]),
  MS('rule:golden', L('Golden rain','Ploaie de aur'), L('Make glittering gold crystals from two clear liquids.','Fă cristale aurii strălucitoare din două lichide limpezi.'), [st('add:pbno3','Add Lead nitrate','Adaugă Azotat de plumb'), st('add:ki','Add Potassium iodide','Adaugă Iodură de potasiu')]),
  MS('rule:iodine_clock', L('The iodine clock','Ceasul cu iod'), L('Build a chemical timer that suddenly turns dark blue.','Construiește un cronometru chimic care devine brusc albastru închis.'), [st('add:vitc','Add Vitamin C drink','Adaugă Băutură cu vitamina C'), st('add:starch','Add Starch water','Adaugă Apă cu amidon'), st('add:iodine','Add Iodine tincture','Adaugă Tinctură de iod'), st('add:h2o2','Add Hydrogen peroxide, then wait','Adaugă Apă oxigenată, apoi așteaptă')]),
  MS('rule:geyser', L('Cola geyser','Gheizerul de cola'), L('Make a fountain of cola.','Fă o fântână de cola.'), [st('add:cola','Pour in Cola','Toarnă Cola'), st('add:mentos','Drop in Mint candies','Aruncă Bomboane mentosate')]),
  MS('rule:magic_milk', L('Magic milk','Laptele magic'), L('Make colours dance on milk.','Fă culorile să danseze pe lapte.'), [st('add:milk','Pour in Milk','Toarnă Lapte'), st('add:foodcolor','Add Food colouring','Adaugă Colorant alimentar'), st('add:soap','Add Dish soap','Adaugă Detergent de vase')]),
  MS('rule:dryice_water', L('Fog waterfall','Cascada de ceață'), L('Make fog pour over the edge of the beaker.','Fă ceața să se reverse peste marginea paharului.'), [st('add:water','Add Water','Adaugă Apă'), st('add:dryice','Add Dry ice','Adaugă Gheață carbonică')]),
  MS('rule:luminol', L('Glow in the dark','Strălucire în întuneric'), L('Make a liquid glow with cold blue light.','Fă un lichid să strălucească cu lumină rece, albastră.'), [st('add:water','Add Water','Adaugă Apă'), st('add:cuso4','Add Copper sulfate','Adaugă Sulfat de cupru'), st('add:luminol','Add Luminol solution','Adaugă Soluție de luminol'), st('add:h2o2','Add Hydrogen peroxide','Adaugă Apă oxigenată')]),
  MS('rule:mirror', L('Silver mirror','Oglinda de argint'), L('Coat the beaker with real silver.','Acoperă paharul cu argint adevărat.'), [st('add:agno3','Add Silver nitrate','Adaugă Azotat de argint'), st('add:ammonia','Add Ammonia solution','Adaugă Soluție de amoniac'), st('add:glucose','Add Glucose','Adaugă Glucoză')]),
  MS('rule:garden', L('Chemical garden','Grădina chimică'), L('Grow crystal towers in water glass.','Crește turnuri de cristale în sticlă solubilă.'), [st('add:silicate','Pour in Water glass','Toarnă Sticlă solubilă'), st('add:cuso4|add:cocl2|add:cacl2s','Drop in Copper sulfate or Cobalt chloride','Pune Sulfat de cupru sau Clorură de cobalt')]),
  MS('rule:hotice', L('Hot ice','Gheața fierbinte'), L('Turn a liquid solid in one second.','Transformă un lichid în solid într-o secundă.'), [st('add:hotice','Pour in Hot ice liquid','Toarnă Lichid „gheață fierbinte”'), st('add:naacs','Add one Sodium acetate crystal','Adaugă un Cristal de acetat de sodiu')]),
  MS('rule:flame', L('Flame rainbow','Curcubeul flăcărilor'), L('Colour a flame with a metal salt.','Colorează o flacără cu o sare metalică.'), [st('add:licl|add:srcl2|add:cucl2|add:salt|add:cacl2s','Add Lithium, Strontium or Copper chloride','Adaugă Clorură de litiu, stronțiu sau cupru'), st('heat:on','Light the burner','Aprinde arzătorul'), st('rule:flame','Wait for the flame','Așteaptă flacăra')]),
  MS('rule:acid_snake', L('Carbon column','Coloana de carbon'), L('Turn sugar into a steaming black tower.','Transformă zahărul într-un turn negru care scoate aburi.'), [st('add:sugar','Add Sugar','Adaugă Zahăr'), st('add:h2so4','Add Sulfuric acid','Adaugă Acid sulfuric')]),
  MS('rule:cs_water', L('The wildest metal','Cel mai sălbatic metal'), L('See what caesium does in water.','Vezi ce face cesiul în apă.'), [st('add:water','Add Water','Adaugă Apă'), st('add:cs','Drop in Caesium','Aruncă Cesiu')]),
  MS('rule:thermite', L('Thermite','Termitul'), L('Make molten iron from rust.','Fă fier topit din rugină.'), [st('add:fe2o3','Add Iron oxide (rust)','Adaugă Oxid de fier (rugină)'), st('add:al','Add Aluminium','Adaugă Aluminiu'), st('heat:on','Light the burner','Aprinde arzătorul'), st('rule:thermite','Wait for it to ignite','Așteaptă să se aprindă')]),
  MS('rule:slime', L('Slime lab','Laboratorul de slime'), L('Turn glue into stretchy slime.','Transformă lipiciul în slime elastic.'), [st('add:glue','Pour in PVA glue','Toarnă Aracet'), st('add:borax','Add Borax solution','Adaugă Soluție de borax')]),
);

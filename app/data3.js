// ===================== v5: school-curriculum lab (species, rules, missions) =====================
GROUPS.push(['test', L('Test reagents','Reactivi de test')], ['organic', L('Organic','Substanțe organice')]);
Object.assign(SPECIES, {
  zn:{n:L('Zinc granules','Granule de zinc'), art:L('the zinc','zincul'), f:'Zn', st:'m', c:'#a9b1b9', shelf:1, cat:'lab', icon:'granules', grp:'metal',
    desc:D('Small lumps of zinc, a grey metal more reactive than iron.','Bucățele de zinc, un metal cenușiu mai reactiv decât fierul.')},
  phph:{n:L('Phenolphthalein','Fenolftaleină'), f:'C₂₀H₁₄O₄', st:'l', c:'#f6f7fb', a:.04, aq:1, ic:'#e0247a', shelf:1, cat:'lab', icon:'drop', grp:'dye',
    desc:D('An indicator: colourless in acids and neutral water, pink in alkalis.','Un indicator: incolor în acizi și în apă neutră, roz în baze.')},
  mo:{n:L('Methyl orange','Metiloranj'), f:'C₁₄H₁₄N₃NaO₃S', st:'l', c:'#f2b43a', a:.35, aq:1, ic:'#ee7a22', shelf:1, cat:'lab', icon:'drop', grp:'dye',
    desc:D('An indicator: red in acids, yellow in neutral and alkaline solutions.','Un indicator: roșu în acizi, galben în soluții neutre și bazice.')},
  univ:{n:L('Universal indicator','Indicator universal'), f:'', st:'l', c:'#3fae4a', a:.5, aq:1, ic:'#3fae4a', shelf:1, cat:'adult', icon:'drop', grp:'dye',
    desc:D('A mix of indicators that shows the whole pH scale as a rainbow.','Un amestec de indicatori care arată toată scara pH ca un curcubeu.')},
  limewater:{n:L('Limewater','Apă de var'), f:'Ca(OH)₂(aq)', st:'l', c:'#f2f6f4', a:.14, ph:5, base:1, aq:1, vol:1, shelf:1, cat:'adult', icon:'bottle', grp:'test',
    desc:D('Clear calcium hydroxide solution. It turns milky with carbon dioxide.','Soluție limpede de hidroxid de calciu. Se tulbură (devine lăptoasă) cu dioxid de carbon.')},
  brwater:{n:L('Bromine water','Apă de brom'), f:'Br₂(aq)', st:'l', c:'#e0822a', a:.62, ph:-1.5, aq:1, vol:1, volatile:1, shelf:1, cat:'lab', icon:'brown', grp:'test',
    desc:D('Orange bromine dissolved in water. It tests for C=C double bonds.','Brom portocaliu dizolvat în apă. Testează legăturile duble C=C.')},
  clwater:{n:L('Chlorine water','Apă de clor'), f:'Cl₂(aq)', st:'l', c:'#dcecaa', a:.32, ph:-1.5, aq:1, vol:1, volatile:1, shelf:1, cat:'lab', icon:'brown', grp:'test',
    desc:D('Pale yellow-green chlorine dissolved in water. It bleaches.','Clor galben-verzui pal dizolvat în apă. Decolorează.')},
  hexane:{n:L('Hexane','Hexan'), f:'C₆H₁₄', st:'l', c:'#f7fafc', a:.08, vol:1, volatile:1, shelf:1, cat:'lab', icon:'bottle', grp:'organic',
    desc:D('An alkane: a saturated hydrocarbon with only single bonds.','Un alcan: o hidrocarbură saturată, numai cu legături simple.')},
  hexene:{n:L('Cyclohexene','Ciclohexenă'), f:'C₆H₁₀', st:'l', c:'#f7fafc', a:.08, vol:1, volatile:1, shelf:1, cat:'lab', icon:'bottle', grp:'organic',
    desc:D('An alkene: a hydrocarbon with one C=C double bond.','O alchenă: o hidrocarbură cu o legătură dublă C=C.')},
  ethanol:{n:L('Ethanol','Etanol'), f:'C₂H₅OH', st:'l', c:'#f5f8fb', a:.08, aq:1, vol:1, volatile:1, shelf:1, cat:'adult', icon:'bottle', grp:'organic',
    desc:D('The alcohol in drinks and hand gel. It burns with a clean blue flame.','Alcoolul din băuturi și din gelul de mâini. Arde cu o flacără albastră curată.')},
  ethacid:{n:L('Ethanoic acid','Acid etanoic'), art:L('the ethanoic acid','acidul etanoic'), f:'CH₃COOH', st:'l', c:'#f7f5ea', a:.12, ph:-3.5, acid:1, aq:1, vol:1, volatile:1, shelf:1, cat:'lab', icon:'bottle', grp:'organic',
    desc:D('Acetic acid, the weak acid in vinegar, but more concentrated.','Acid acetic, acidul slab din oțet, dar mai concentrat.')},
  k2cr2o7:{n:L('Potassium dichromate (acidified)','Dicromat de potasiu (acidulat)'), f:'K₂Cr₂O₇ / H⁺', st:'l', c:'#e8701a', a:.72, ph:-4, aq:1, vol:1, shelf:1, cat:'lab', icon:'brown', grp:'test',
    desc:D('An orange oxidising agent. It turns green when it oxidises alcohols.','Un oxidant portocaliu. Devine verde când oxidează alcoolii.')},
  benedict:{n:L('Benedict’s solution','Reactiv Benedict'), f:'Cu²⁺ (alkaline citrate)', st:'l', c:'#2a78de', a:.62, ph:3, aq:1, vol:1, shelf:1, cat:'adult', icon:'bottle', grp:'test',
    desc:D('A blue copper solution that tests for reducing sugars like glucose.','O soluție albastră de cupru care testează zaharurile reducătoare, precum glucoza.')},
  biuret:{n:L('Biuret reagent','Reactiv biuret'), f:'CuSO₄ + NaOH', st:'l', c:'#8cc4f2', a:.42, ph:5, aq:1, vol:1, shelf:1, cat:'lab', icon:'bottle', grp:'test',
    desc:D('A pale blue alkaline copper solution that tests for proteins.','O soluție bazică albastru-pal de cupru care testează proteinele.')},
  eggwhite:{n:L('Egg white','Albuș de ou'), f:'', st:'l', c:'#f3efd8', a:.55, aq:1, vol:1, volatile:1, shelf:1, cat:'home', icon:'bottle', grp:'kitchen',
    desc:D('Egg white mixed with water. It is full of protein.','Albuș de ou amestecat cu apă. Este plin de proteine.')},
  feso4s:{n:L('Iron(II) sulfate','Sulfat de fier(II)'), f:'FeSO₄', st:'l', c:'#bfe3b0', a:.35, ph:-1, aq:1, vol:1, shelf:1, cat:'lab', icon:'bottle', grp:'salt',
    desc:D('A pale green solution containing Fe²⁺ ions.','O soluție verde-pal care conține ioni Fe²⁺.')},
  bacl2:{n:L('Barium chloride','Clorură de bariu'), f:'BaCl₂', st:'l', c:'#f5f7fa', a:.1, aq:1, vol:1, shelf:1, cat:'lab', icon:'bottle', grp:'test',
    desc:D('A clear, poisonous solution used to test for sulfate ions.','O soluție limpede și otrăvitoare, folosită ca test pentru ionii sulfat.')},
  kbr:{n:L('Potassium bromide','Bromură de potasiu'), f:'KBr', st:'l', c:'#f5f7fa', a:.1, aq:1, vol:1, shelf:1, cat:'adult', icon:'bottle', grp:'salt',
    desc:D('A clear solution of a bromide salt.','O soluție limpede a unei sări de brom (bromură).')},
  k2cro4:{n:L('Potassium chromate','Cromat de potasiu'), f:'K₂CrO₄', st:'l', c:'#f2d41c', a:.6, ph:1, aq:1, vol:1, shelf:1, cat:'lab', icon:'bottle', grp:'salt',
    desc:D('A bright yellow solution. Acid turns it orange.','O soluție galben-aprins. Acidul o face portocalie.')},
  mno2:{n:L('Manganese(IV) oxide','Dioxid de mangan'), art:L('the manganese oxide','dioxidul de mangan'), f:'MnO₂', st:'s', c:'#2d2724', shelf:1, cat:'lab', icon:'jar', grp:'salt',
    desc:D('A black powder. A famous catalyst for breaking down hydrogen peroxide.','O pulbere neagră. Un catalizator celebru pentru descompunerea apei oxigenate.')},
  thio:{n:L('Sodium thiosulfate','Tiosulfat de sodiu'), f:'Na₂S₂O₃', st:'l', c:'#f4f7fa', a:.1, aq:1, vol:1, shelf:1, cat:'adult', icon:'bottle', grp:'salt',
    desc:D('A clear solution. With acid it slowly turns cloudy with sulfur.','O soluție limpede. Cu acid se tulbură încet din cauza sulfului.')},
  na2so4s:{n:L('Sodium sulfate','Sulfat de sodiu'), f:'Na₂SO₄', st:'l', c:'#f5f7fa', a:.1, aq:1, vol:1, shelf:1, cat:'adult', icon:'bottle', grp:'salt',
    desc:D('A harmless salt solution. It helps water conduct electricity.','O soluție de sare inofensivă. Ajută apa să conducă electricitatea.')},

  // products
  zncl2:{n:L('zinc chloride','clorură de zinc'), f:'ZnCl₂', st:'d'},
  znac:{n:L('zinc ethanoate','etanoat de zinc'), f:'Zn(CH₃COO)₂', st:'d'},
  zncit:{n:L('zinc citrate','citrat de zinc'), f:'Zn₃(C₆H₅O₇)₂', st:'d'},
  znso4:{n:L('zinc sulfate','sulfat de zinc'), f:'ZnSO₄', st:'d'},
  zn_cu:{n:L('copper (on the zinc)','cupru (pe zinc)'), f:'Cu', st:'m', c:'#6b3a22'},
  dibromo:{n:L('dibromocyclohexane','dibromociclohexan'), f:'C₆H₁₀Br₂', st:'d'},
  ester:{n:L('ethyl ethanoate','etanoat de etil'), f:'CH₃COOC₂H₅', st:'d', volatile:1},
  benred:{n:L('Benedict’s (reacted)','reactiv Benedict (reacționat)'), f:'', st:'d'},
  cu2o:{n:L('copper(I) oxide','oxid de cupru(I)'), f:'Cu₂O', st:'p', c:'#b53a1c'},
  biuretpos:{n:L('protein–copper complex','complex proteină–cupru'), f:'', st:'d', c:'#7b3fa6', a:.75},
  cr3:{n:L('chromium(III) ions','ioni de crom(III)'), f:'Cr³⁺', st:'d', c:'#3f8a4a', a:.66},
  ethanal:{n:L('ethanal','etanal'), f:'CH₃CHO', st:'d', volatile:1},
  soapmade:{n:L('soap (sodium stearate)','săpun (stearat de sodiu)'), f:'C₁₇H₃₅COONa', st:'d', c:'#f3edd6', a:.62},
  glycerolaq:{n:L('glycerol','glicerină'), f:'C₃H₈O₃', st:'d'},
  ethanolaq:{n:L('ethanol','etanol'), f:'C₂H₅OH', st:'d', volatile:1},
  feoh2:{n:L('iron(II) hydroxide','hidroxid de fier(II)'), f:'Fe(OH)₂', st:'p', c:'#5e8a4c'},
  baso4:{n:L('barium sulfate','sulfat de bariu'), f:'BaSO₄', st:'p', c:'#fbfbf8'},
  agbr:{n:L('silver bromide','bromură de argint'), f:'AgBr', st:'p', c:'#eee3b8'},
  br2aq:{n:L('bromine','brom'), f:'Br₂(aq)', st:'d', c:'#e8912e', a:.55},
  fecl2:{n:L('iron(II) chloride','clorură de fier(II)'), f:'FeCl₂', st:'d', c:'#bfe3b0', a:.35},
  thiomix:{n:L('sulfur (forming)','sulf (în formare)'), f:'S', st:'d'},
  h2so4d:{n:L('dilute sulfuric acid','acid sulfuric diluat'), f:'H₂SO₄(aq)', st:'d', ph:-5, acid:1},
  titmix:{n:L('acid in the flask','acidul din vas'), f:'', st:'l', aq:1, volatile:1},
  breathco2:{n:L('your breath','respirația ta'), f:'CO₂', st:'g'},
  so2:{n:L('sulfur dioxide','dioxid de sulf'), f:'SO₂', st:'g'},
  cl2:{n:L('chlorine gas','clor gazos'), f:'Cl₂', st:'g'},
});
for(const id in SPECIES) SPECIES[id].id = id;
SHELF.length = 0; Object.keys(SPECIES).filter(k => SPECIES[k].shelf).forEach(k => SHELF.push(k));

// ---------- rules (checked before older ones) ----------
const NEW3 = [];
const R3 = r => { r.key = r.key || r.id; NEW3.push(r); if(!RULE_INFO[r.id]) RULE_INFO[r.id] = r; return r; };
const LAB_LESSON3 = {}; // rule id -> candidate lesson ids (first one found in the current course is used)
const LL = (id, list) => { LAB_LESSON3[id] = list; };

// ---- zinc + acids
const ZNA = {
  hcl:{prod:'zncl2', eq:'Zn + 2HCl → ZnCl₂ + H₂↑', rate:16, dur:12, temp:5, a:L('hydrochloric acid','acidul clorhidric')},
  vinegar:{prod:'znac', eq:'Zn + 2CH₃COOH → Zn(CH₃COO)₂ + H₂↑', rate:4, dur:14, temp:1, a:L('vinegar','oțetul')},
  ethacid:{prod:'znac', eq:'Zn + 2CH₃COOH → Zn(CH₃COO)₂ + H₂↑', rate:5, dur:14, temp:1, a:L('ethanoic acid','acidul etanoic')},
  lemon:{prod:'zncit', eq:'3Zn + 2C₆H₈O₇ → Zn₃(C₆H₅O₇)₂ + 3H₂↑', rate:4, dur:14, temp:1, a:L('lemon juice','sucul de lămâie')},
};
for(const a in ZNA){ const Z = ZNA[a];
  R3({id:'zn_acid', key:'zn_acid:' + a, needs:['zn', a], consume:[1], produce:[Z.prod], wp:['h2'], kind:'chem', energy:'exo', safety: a === 'hcl' || a === 'ethacid' ? 'lab' : 'adult', temp:Z.temp,
    signs:['gas'], eq:Z.eq, fx:[{t:'objfizz', obj:'zn', dur:Z.dur, rate:Z.rate}], vars:() => ({acid:tr(Z.a)}),
    zoom:{from:['Zn','H+','H+'], to:['Zn2+','H2']},
    title:L('Zinc fizzes in acid','Zincul face bule în acid'),
    b:L('Tiny bubbles stream off the zinc! The acid is slowly eating the metal and making hydrogen gas. The zinc is not used up all at once, it just gets a little smaller.',
        'Din zinc ies bule mici, una după alta! Acidul „roade” încet metalul și produce hidrogen. Zincul nu se consumă dintr-odată, doar se micșorează puțin.'),
    e:L('Metal + acid → salt + hydrogen. Zinc is more reactive than hydrogen, so it gives its electrons to the H⁺ ions from {acid}. The H⁺ ions become hydrogen gas and the zinc becomes zinc ions, making a salt. It is slower than magnesium because zinc is lower in the reactivity series.',
        'Metal + acid → sare + hidrogen. Zincul este mai reactiv decât hidrogenul, așa că le cedează electronii ionilor H⁺ din {acid}. Ionii H⁺ devin hidrogen gazos, iar zincul devine ioni de zinc, formând o sare. Merge mai încet decât la magneziu, pentru că zincul este mai jos în seria reactivității.'),
    s:L('Redox: Zn(s) + 2H⁺(aq) → Zn²⁺(aq) + H₂(g); E°(Zn²⁺/Zn) = −0.76 V, so the reaction is spontaneous (E°cell = +0.76 V). The rate depends on [H⁺] and surface area: strong HCl fizzes steadily, weak acids only slowly. Adding a few drops of CuSO₄ speeds it up by forming Zn–Cu microcells.',
        'Redox: Zn(s) + 2H⁺(aq) → Zn²⁺(aq) + H₂(g); E°(Zn²⁺/Zn) = −0,76 V, deci reacția este spontană (E°pilă = +0,76 V). Viteza depinde de [H⁺] și de suprafață: HCl, acid tare, face bule constant, acizii slabi doar încet. Câteva picături de CuSO₄ o accelerează, formând micropile Zn–Cu.'),
    fact:L('This is how hydrogen was made for the first balloons in 1783: iron or zinc and acid.','Așa se obținea hidrogenul pentru primele baloane, în 1783: fier sau zinc și acid.')});
}
LL('zn_acid', ['metalsreact','acids','reactions','redox']);

R3({id:'zn_cuso4', needs:['zn','cuso4aq'], consume:[0,1], produce:['zn_cu','znso4'], kind:'chem', energy:'exo', safety:'lab', temp:3, colorRate:.2,
  signs:['color','solid','heat'], eq:'Zn + CuSO₄ → ZnSO₄ + Cu',
  zoom:{from:['Zn','Cu2+','SO4'], to:['Zn2+','Cu','SO4']},
  title:L('Zinc pushes copper out','Zincul scoate cuprul afară'),
  b:L('The blue colour slowly faded away and the zinc got covered in a brown-black crust. That crust is copper! The zinc swapped places with the copper.',
      'Culoarea albastră s-a stins încet, iar zincul s-a acoperit cu o crustă maro-negricioasă. Crusta aceea este cupru! Zincul a făcut schimb de locuri cu cuprul.'),
  e:L('A displacement reaction. Zinc is more reactive than copper, so it pushes copper out of copper sulfate. Copper atoms land on the zinc and the zinc goes into the water as colourless zinc ions, so the blue colour fades. The beaker warms up a little.',
      'O reacție de substituție. Zincul este mai reactiv decât cuprul, așa că îl scoate pe cupru din sulfatul de cupru. Atomii de cupru se depun pe zinc, iar zincul trece în apă ca ioni de zinc incolori, de aceea albastrul se stinge. Paharul se încălzește puțin.'),
  s:L('Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s), ΔH ≈ −217 kJ/mol. E°cell = 0.34 − (−0.76) = +1.10 V, the same pair used in the Daniell cell. Zn is oxidised (reducing agent), Cu²⁺ is reduced (oxidising agent); SO₄²⁻ is a spectator ion.',
      'Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s), ΔH ≈ −217 kJ/mol. E°pilă = 0,34 − (−0,76) = +1,10 V, aceeași pereche ca în pila Daniell. Zn se oxidează (reducător), Cu²⁺ se reduce (oxidant); SO₄²⁻ este ion spectator.'),
  fact:L('Put the same two metals in separate beakers joined by wires and you get a battery: the Daniell cell.','Pune aceleași două metale în pahare separate, legate cu fire, și obții o baterie: pila Daniell.')});
LL('zn_cuso4', ['metalsreact','redox','reacttypes','reactions']);

// ---- limewater (test for CO2)
const LIME_E = L('Limewater is calcium hydroxide dissolved in water. Carbon dioxide reacts with it to make calcium carbonate (chalk), which does not dissolve, so tiny white specks make the liquid milky. This is the standard test for carbon dioxide.',
  'Apa de var este hidroxid de calciu dizolvat în apă. Dioxidul de carbon reacționează cu ea și formează carbonat de calciu (cretă), care nu se dizolvă, așa că particule albe minuscule fac lichidul lăptos. Acesta este testul standard pentru dioxidul de carbon.');
const LIME_S = L('Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s) + H₂O(l). With excess CO₂ the milkiness clears again, because soluble calcium hydrogencarbonate forms: CaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂(aq), the same chemistry that dissolves limestone caves.',
  'Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s) + H₂O(l). Cu exces de CO₂ tulbureala dispare din nou, pentru că se formează hidrogenocarbonat de calciu solubil: CaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂(aq), aceeași chimie care dizolvă peșterile de calcar.');
R3({id:'limewater', key:'limewater:dryice', needs:['limewater','dryice'], consume:[0,1], produce:['caco3p','h2co3'], kind:'chem', safety:'adult', temp:-6,
  signs:['solid','gas','cold'], eq:'Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O', fx:[{t:'fog', dur:10}, {t:'bubbles', rate:30, dur:9}, {t:'objfizz', obj:'dryice', dur:10, rate:25}],
  wordsOverride:{r:['limewater','co2'], p:['caco3p','water']},
  title:L('Limewater turns milky','Apa de var devine lăptoasă'),
  b:L('The clear limewater turned milky white! The carbon dioxide from the dry ice made a new white solid, chalk, floating in the water.',
      'Apa de var limpede a devenit albă ca laptele! Dioxidul de carbon din gheața carbonică a format un solid nou, alb, cretă, care plutește în apă.'),
  e:LIME_E, s:LIME_S, fact:L('Your breath contains about 4% carbon dioxide, a hundred times more than fresh air.','Aerul pe care îl expiri conține aproximativ 4% dioxid de carbon, de o sută de ori mai mult decât aerul curat.')});
R3({id:'limewater', key:'limewater:co2', needs:['limewater','h2co3|breathco2'], consume:[0,1], produce:['caco3p'], kind:'chem', safety:'adult',
  signs:['solid'], eq:'Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O', fx:[{t:'bubbles', rate:24, dur:3}],
  wordsOverride:{r:['limewater','co2'], p:['caco3p','water']},
  title:L('Limewater turns milky','Apa de var devine lăptoasă'),
  b:L('The clear limewater turned milky white! Carbon dioxide made a new white solid, chalk, in the water. So there was carbon dioxide in the gas.',
      'Apa de var limpede a devenit albă ca laptele! Dioxidul de carbon a format în apă un solid nou, alb: creta. Deci în gaz era dioxid de carbon.'),
  e:LIME_E, s:LIME_S, fact:L('Your breath contains about 4% carbon dioxide, a hundred times more than fresh air.','Aerul pe care îl expiri conține aproximativ 4% dioxid de carbon, de o sută de ori mai mult decât aerul curat.')});
LL('limewater', ['analysis','acids','ions','reactions']);

// ---- bromine water test for alkenes
R3({id:'bromine', needs:['brwater','hexene'], consume:[0,1], produce:['dibromo'], kind:'chem', safety:'lab', colorRate:.9,
  signs:['color'], eq:'C₆H₁₀ + Br₂ → C₆H₁₀Br₂', fx:[{t:'swirl', dur:2.5}],
  title:L('Orange to colourless: an alkene!','Din portocaliu în incolor: o alchenă!'),
  b:L('The orange bromine water lost its colour! Cyclohexene has a special double bond that grabs the bromine, so the orange disappears.',
      'Apa de brom portocalie și-a pierdut culoarea! Ciclohexena are o legătură dublă specială care „înhață” bromul, așa că portocaliul dispare.'),
  e:L('Alkenes have a C=C double bond. Bromine adds across it: the double bond opens and each carbon grabs one bromine atom. The product is colourless, so the orange colour vanishes. Alkanes such as hexane only have single bonds and cannot do this. This is the test for an alkene (an unsaturated compound).',
      'Alchenele au o legătură dublă C=C. Bromul se adiționează la ea: legătura dublă se deschide și fiecare carbon ia câte un atom de brom. Produsul este incolor, deci culoarea portocalie dispare. Alcanii, ca hexanul, au doar legături simple și nu pot face asta. Acesta este testul pentru alchene (compuși nesaturați).'),
  s:L('Electrophilic addition: the π-bond polarises Br₂, a cyclic bromonium ion forms and Br⁻ attacks from the opposite face, giving trans-1,2-dibromocyclohexane. In bromine water some bromohydrin (2-bromocyclohexanol) also forms because water competes as the nucleophile.',
      'Adiție electrofilă: legătura π polarizează Br₂, se formează un ion bromoniu ciclic, iar Br⁻ atacă din partea opusă, dând trans-1,2-dibromociclohexan. În apa de brom se formează și bromhidrină (2-bromociclohexanol), pentru că apa concurează ca nucleofil.'),
  fact:L('Margarine is made by adding hydrogen across the C=C bonds of vegetable oils; the bromine test shows how unsaturated an oil is.','Margarina se face adiționând hidrogen la legăturile C=C din uleiurile vegetale; testul cu brom arată cât de nesaturat este un ulei.')});
R3({id:'bromine_neg', needs:['brwater','hexane'], unless:['hexene'], consume:[], produce:[], kind:'phys', safety:'lab', noEq:1,
  signs:[],
  title:L('Still orange: no double bond','Tot portocaliu: nicio legătură dublă'),
  b:L('The bromine water stayed orange. Hexane did not react. Now try cyclohexene!','Apa de brom a rămas portocalie. Hexanul nu a reacționat. Acum încearcă ciclohexena!'),
  e:L('Hexane is an alkane: all its bonds are single bonds, so it is saturated and bromine cannot add to it. No colour change means no C=C double bond. (The orange colour only moves into the hexane layer on top.)',
      'Hexanul este un alcan: toate legăturile lui sunt simple, deci este saturat, iar bromul nu se poate adiționa. Lipsa schimbării de culoare înseamnă că nu există legătură dublă C=C. (Culoarea portocalie doar trece în stratul de hexan de deasupra.)'),
  s:L('Alkanes react with bromine only by free-radical substitution, which needs UV light and is slow (C₆H₁₄ + Br₂ → C₆H₁₃Br + HBr). In the dark nothing happens, so a negative bromine-water test indicates a saturated compound.',
      'Alcanii reacționează cu bromul doar prin substituție radicalică, care are nevoie de lumină UV și este lentă (C₆H₁₄ + Br₂ → C₆H₁₃Br + HBr). La întuneric nu se întâmplă nimic, deci un test negativ cu apă de brom indică un compus saturat.'),
  fact:L('A test that stays the same is still a result: scientists call it a negative test.','Un test în care nu se schimbă nimic este tot un rezultat: oamenii de știință îl numesc test negativ.')});
LL('bromine', ['hydrocarbons','organic','functional']); LL('bromine_neg', ['hydrocarbons','organic']);

// ---- esterification (wet heat)
R3({id:'ester', needs:['ethanol','ethacid','h2so4'], heatOnly:1, wet:1, minT:65, consume:[0,1], produce:['ester'], kind:'chem', safety:'lab',
  signs:['smell'], eq:'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O  (H₂SO₄ catalyst)', fx:[{t:'steam', dur:4, rate:3}],
  wordsOverride:{r:['ethacid','ethanol'], p:['ester','water']},
  title:L('A fruity smell: an ester!','Un miros de fructe: un ester!'),
  b:L('A sweet, fruity smell like pear drops or nail-polish remover filled the air, and a thin oily layer floats on top. We made a new substance called an ester.',
      'Un miros dulce, de fructe, ca de bomboane cu pere sau de dizolvant de ojă, a umplut aerul, iar deasupra plutește un strat subțire, uleios. Am făcut o substanță nouă numită ester.'),
  e:L('An alcohol (ethanol) and a carboxylic acid (ethanoic acid) joined together and gave off a water molecule. The product, ethyl ethanoate, is an ester. Esters have fruity smells and do not mix well with water, so they float as an oily layer. The drop of sulfuric acid is a catalyst, and warming speeds the reaction up.',
      'Un alcool (etanolul) și un acid carboxilic (acidul etanoic) s-au unit și au eliminat o moleculă de apă. Produsul, etanoatul de etil, este un ester. Esterii au mirosuri de fructe și nu se amestecă bine cu apa, așa că plutesc ca un strat uleios. Picătura de acid sulfuric este un catalizator, iar încălzirea grăbește reacția.'),
  s:L('Fischer esterification: acid-catalysed nucleophilic addition–elimination. The alcohol O attacks the protonated carbonyl carbon, and water leaves (isotope labelling with ¹⁸O shows the water’s O comes from the acid). The reaction is a reversible equilibrium, Kc ≈ 4; excess alcohol or removing water raises the yield.',
      'Esterificare Fischer: adiție–eliminare nucleofilă catalizată de acid. Oxigenul alcoolului atacă carbonul carbonilic protonat, iar apa pleacă (marcarea cu ¹⁸O arată că oxigenul apei provine din acid). Reacția este un echilibru reversibil, Kc ≈ 4; excesul de alcool sau îndepărtarea apei cresc randamentul.'),
  fact:L('Many fruit flavours in sweets are esters made this way: pentyl ethanoate smells of bananas.','Multe arome de fructe din dulciuri sunt esteri făcuți așa: etanoatul de pentil miroase a banane.')});
LL('ester', ['functional','organic','carbonyls','equilibrium']);

// ---- Benedict's test (wet heat)
R3({id:'benedict', needs:['benedict','glucose|glucoseaq'], heatOnly:1, wet:1, minT:70, consume:[0,1], produce:['benred','cu2o','gluconate'], pDelay:5, kind:'chem', safety:'adult',
  signs:['color','solid'], eq:'RCHO + 2Cu²⁺ + 5OH⁻ → RCOO⁻ + Cu₂O↓ + 3H₂O',
  seq:[[0,'#2a78de',.62],[1.6,'#3a9f86',.7],[3.2,'#b9c33a',.74],[4.8,'#e0962a',.8],[6.4,'#c0501f',.86]],
  wordsOverride:{r:['glucose','benedict'], p:['gluconate','cu2o']},
  title:L('Blue to brick red: sugar found!','Din albastru în roșu-cărămiziu: am găsit zahăr!'),
  b:L('As it got hot, the blue liquid turned green, then yellow, then orange, and finally a brick-red solid appeared! That means there is glucose, a sugar, in the beaker.',
      'Când s-a încălzit, lichidul albastru a devenit verde, apoi galben, apoi portocaliu și, la final, a apărut un solid roșu-cărămiziu! Asta înseamnă că în pahar este glucoză, un zahăr.'),
  e:L('Benedict’s solution contains blue copper(II) ions. Glucose is a reducing sugar: when heated it gives electrons to the copper ions and turns them into copper(I) oxide, a brick-red solid. The more sugar, the further the colour goes from green to red. Table sugar (sucrose) is not a reducing sugar, so it stays blue.',
      'Reactivul Benedict conține ioni albaștri de cupru(II). Glucoza este un zahăr reducător: la încălzire cedează electroni ionilor de cupru și îi transformă în oxid de cupru(I), un solid roșu-cărămiziu. Cu cât e mai mult zahăr, cu atât culoarea trece mai departe, de la verde la roșu. Zahărul de masă (zaharoza) nu este reducător, deci rămâne albastru.'),
  s:L('The open-chain aldehyde form of glucose is oxidised to gluconate while citrate-complexed Cu²⁺ is reduced to Cu₂O(s). The colour sequence (green → yellow → orange → brick red) is semi-quantitative: blue Cu²⁺ mixes with a growing amount of red-orange Cu₂O suspension. Sucrose has no free anomeric carbon (a glycosidic link joins both), so it is non-reducing.',
      'Forma aldehidică deschisă a glucozei se oxidează la gluconat, iar Cu²⁺ complexat cu citrat se reduce la Cu₂O(s). Seria de culori (verde → galben → portocaliu → roșu-cărămiziu) este semicantitativă: Cu²⁺ albastru se amestecă cu o cantitate tot mai mare de suspensie roșie-portocalie de Cu₂O. Zaharoza nu are carbon anomeric liber (legătura glicozidică îi unește pe amândoi), deci nu este reducătoare.'),
  fact:L('Before modern test strips, doctors used a Benedict-style test on urine to check for diabetes.','Înainte de benzile de test moderne, medicii foloseau un test de tip Benedict pe urină ca să verifice diabetul.')});
R3({id:'benedict_neg', needs:['benedict','sugar|sugaraq'], unless:['glucose','glucoseaq'], heatOnly:1, wet:1, minT:70, consume:[], produce:[], kind:'phys', safety:'adult', noEq:1,
  signs:[],
  title:L('Still blue: not a reducing sugar','Tot albastru: nu este zahăr reducător'),
  b:L('Even when hot, the Benedict’s solution stayed blue. Table sugar does not change it. Try glucose instead!','Chiar și fierbinte, reactivul Benedict a rămas albastru. Zahărul de masă nu îl schimbă. Încearcă glucoza!'),
  e:L('Table sugar (sucrose) is made of glucose and fructose locked together, and the part that could react with copper ions is blocked. So it is a non-reducing sugar: a negative Benedict’s test.','Zahărul de masă (zaharoza) este format din glucoză și fructoză legate strâns, iar partea care ar putea reacționa cu ionii de cupru este blocată. Deci este un zahăr nereducător: test Benedict negativ.'),
  s:L('Sucrose, α-D-glucopyranosyl-(1→2)-β-D-fructofuranoside, links both anomeric carbons, so no open-chain aldehyde can form. Boiling with dilute acid first hydrolyses it to glucose and fructose, after which the test is positive.','Zaharoza, α-D-glucopiranozil-(1→2)-β-D-fructofuranozidă, leagă ambii atomi de carbon anomerici, deci nu se poate forma aldehida cu lanț deschis. Dacă o fierbi întâi cu acid diluat, se hidrolizează la glucoză și fructoză, iar apoi testul iese pozitiv.'),
  fact:L('Bees make honey by splitting sucrose into glucose and fructose, so honey gives a positive test.','Albinele fac mierea despicând zaharoza în glucoză și fructoză, de aceea mierea dă test pozitiv.')});
LL('benedict', ['biomolecules','carbonyls','organic','analysis']); LL('benedict_neg', ['biomolecules','organic']);

// ---- biuret test
R3({id:'biuret', needs:['biuret','eggwhite'], consume:[0], produce:['biuretpos'], kind:'chem', safety:'lab', colorRate:.8,
  signs:['color'], eq:'protein (peptide bonds) + Cu²⁺ (alkaline) → violet complex', noEq:1, fx:[{t:'trails', color:'#7b3fa6', dur:3}],
  title:L('Purple: protein found!','Mov: am găsit proteine!'),
  b:L('The pale blue liquid turned purple! That colour tells us the egg white is full of protein.','Lichidul albastru-pal a devenit mov! Culoarea aceasta ne spune că albușul este plin de proteine.'),
  e:L('Proteins are long chains of amino acids joined by peptide bonds. In an alkaline solution, copper ions from the biuret reagent attach to the nitrogen atoms of these bonds and form a purple complex. No heating is needed. Sugars and fats stay blue.',
      'Proteinele sunt lanțuri lungi de aminoacizi legați prin legături peptidice. Într-o soluție bazică, ionii de cupru din reactivul biuret se leagă de atomii de azot ai acestor legături și formează un complex mov. Nu este nevoie de încălzire. Zaharurile și grăsimile rămân albastre.'),
  s:L('In alkaline solution Cu²⁺ coordinates to four deprotonated amide nitrogens from adjacent peptide bonds, giving a square-planar violet complex (λmax ≈ 540 nm). At least two peptide bonds are needed, so free amino acids give a negative result. The absorbance is proportional to protein concentration (the basis of the biuret protein assay).',
      'În soluție bazică Cu²⁺ se coordinează la patru atomi de azot amidici deprotonați din legături peptidice vecine, dând un complex violet plan-pătrat (λmax ≈ 540 nm). Sunt necesare cel puțin două legături peptidice, deci aminoacizii liberi dau rezultat negativ. Absorbanța este proporțională cu concentrația proteinei (baza metodei biuret de dozare).'),
  fact:L('Hospitals still measure the total protein in blood with a version of the biuret test.','Spitalele încă măsoară proteinele totale din sânge cu o variantă a testului biuret.')});
LL('biuret', ['biomolecules','aminesdna','organic','analysis']);

// ---- oxidation of ethanol by acidified dichromate (wet heat)
R3({id:'dichromate', needs:['k2cr2o7','ethanol'], heatOnly:1, wet:1, minT:55, consume:[0,1], produce:['cr3','ethanal'], kind:'chem', safety:'lab',
  signs:['color','smell'], eq:'Cr₂O₇²⁻ + 3C₂H₅OH + 8H⁺ → 2Cr³⁺ + 3CH₃CHO + 7H₂O',
  seq:[[0,'#e8701a',.72],[2.5,'#9a8a2a',.7],[5,'#3f8a4a',.66]],
  wordsOverride:{r:['k2cr2o7','ethanol'], p:['cr3','ethanal']},
  title:L('Orange turns green','Portocaliul devine verde'),
  b:L('When warmed, the orange liquid turned green! The ethanol was changed into a new substance, and the orange chemical became green.','Încălzit, lichidul portocaliu a devenit verde! Etanolul s-a transformat într-o substanță nouă, iar substanța portocalie a devenit verde.'),
  e:L('Potassium dichromate is an oxidising agent: it takes electrons (or hydrogen) from the alcohol. Ethanol is oxidised to ethanal, which has a sharp apple-like smell, and would go on to ethanoic acid (vinegar). The orange dichromate ions are reduced to green chromium(III) ions. Old breathalysers used this colour change.',
      'Dicromatul de potasiu este un oxidant: ia electroni (sau hidrogen) de la alcool. Etanolul se oxidează la etanal, care are un miros înțepător, ca de mere, și ar putea continua până la acid etanoic (oțet). Ionii portocalii de dicromat se reduc la ioni verzi de crom(III). Etilotestele vechi foloseau această schimbare de culoare.'),
  s:L('Primary alcohol oxidation: Cr(VI) → Cr(III) (3 electrons per Cr). Distilling the aldehyde off as it forms stops at ethanal; heating under reflux with excess oxidant gives ethanoic acid. Secondary alcohols give ketones; tertiary alcohols are not oxidised, so the solution stays orange (a way to tell them apart).',
      'Oxidarea alcoolilor primari: Cr(VI) → Cr(III) (3 electroni pe atom de Cr). Dacă aldehida este distilată pe măsură ce se formează, oxidarea se oprește la etanal; încălzirea la reflux cu exces de oxidant dă acid etanoic. Alcoolii secundari dau cetone; cei terțiari nu se oxidează, deci soluția rămâne portocalie (așa îi deosebim).'),
  fact:L('The first roadside breath tests had crystals of dichromate that turned green if the driver had been drinking.','Primele teste de alcoolemie din trafic aveau cristale de dicromat care deveneau verzi dacă șoferul băuse.')});
LL('dichromate', ['functional','redox','organic','carbonyls','transition']);

// ---- saponification (wet heat)
R3({id:'saponify', needs:['oil','naoh'], heatOnly:1, wet:1, minT:80, consume:[0,1], produce:['soapmade','glycerolaq'], kind:'chem', safety:'lab',
  signs:['color','solid'], eq:'fat + 3NaOH → 3 soap (RCOONa) + glycerol', fx:[{t:'foam', h:.45, color:'#fbf6e4', rise:.8, dur:8}, {t:'steam', dur:4, rate:3}],
  wordsOverride:{r:['oil','naoh'], p:['soapmade','glycerolaq']},
  after:() => { B.oilVol = 0; },
  title:L('We made soap!','Am făcut săpun!'),
  b:L('The oil layer disappeared and the mixture turned cloudy and a little foamy. The oil and the sodium hydroxide made soap!','Stratul de ulei a dispărut, iar amestecul a devenit tulbure și puțin spumos. Uleiul și hidroxidul de sodiu au făcut săpun!'),
  e:L('Fats and oils are esters of glycerol and long fatty acids. Hot sodium hydroxide breaks these ester bonds (hydrolysis). The fatty acids become their sodium salts, which is soap, and glycerol is left over. This is called saponification, from the Latin word for soap.',
      'Grăsimile și uleiurile sunt esteri ai glicerinei cu acizi grași lungi. Hidroxidul de sodiu fierbinte rupe aceste legături esterice (hidroliză). Acizii grași devin sărurile lor de sodiu, adică săpun, iar glicerina rămâne. Procesul se numește saponificare, de la cuvântul latin pentru săpun.'),
  s:L('Base hydrolysis of a triglyceride: C₃H₅(OOCR)₃ + 3OH⁻ → C₃H₅(OH)₃ + 3RCOO⁻. It is irreversible because the carboxylate is deprotonated. Adding brine “salts out” the soap. Soap anions are amphiphilic: the COO⁻ head is hydrophilic and the hydrocarbon tail lipophilic, so they form micelles around grease.',
      'Hidroliza bazică a unei trigliceride: C₃H₅(OOCR)₃ + 3OH⁻ → C₃H₅(OH)₃ + 3RCOO⁻. Este ireversibilă, pentru că anionul carboxilat este deprotonat. Adăugarea de saramură „separă” săpunul. Anionii de săpun sunt amfifili: capul COO⁻ este hidrofil, iar coada hidrocarbonată lipofilă, așa că formează micele în jurul grăsimii.'),
  fact:L('People have made soap from animal fat and wood ash (which contains potassium hydroxide) for over 4,000 years.','Oamenii fac săpun din grăsime animală și cenușă de lemn (care conține hidroxid de potasiu) de peste 4.000 de ani.')});
LL('saponify', ['functional','organic','biomolecules']);

// ---- fermentation (warm water)
const FERM = {kind:'chem', safety:'home', signs:['gas'], eq:'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂↑  (enzymes in yeast)',
  fx:[{t:'bubbles', rate:7, dur:40}, {t:'foam', h:.3, color:'#efe2c4', rise:.3, dur:30}], wp:['co2'],
  wordsOverride:{r:['sugar'], p:['ethanolaq','co2']},
  title:L('Yeast is fermenting!','Drojdia fermentează!'),
  b:L('Slowly, little bubbles start to rise and a light foam forms. The yeast is alive and is eating the sugar, and it breathes out carbon dioxide gas!',
      'Încet, încep să urce bule mici și se formează o spumă ușoară. Drojdia este vie, mănâncă zahărul și „expiră” dioxid de carbon!'),
  e:L('Yeast cells use enzymes to break sugar down for energy without oxygen. This is called fermentation (anaerobic respiration). It makes ethanol, an alcohol, and carbon dioxide gas. Yeast works best when warm (about 35 °C): too cold and it is sleepy, too hot and the enzymes are destroyed.',
      'Celulele de drojdie folosesc enzime ca să descompună zahărul pentru energie, fără oxigen. Aceasta se numește fermentație (respirație anaerobă). Produce etanol, un alcool, și dioxid de carbon. Drojdia lucrează cel mai bine la cald (aproximativ 35 °C): prea rece și e „adormită”, prea fierbinte și enzimele se distrug.'),
  s:L('Alcoholic fermentation: glycolysis gives pyruvate, which is decarboxylated (pyruvate decarboxylase) to ethanal and reduced to ethanol (alcohol dehydrogenase), regenerating NAD⁺. Sucrose is first hydrolysed by invertase. The rate has an enzyme temperature optimum near 35 °C; yeast stops at about 15% ethanol.',
      'Fermentație alcoolică: glicoliza dă piruvat, care este decarboxilat (piruvat-decarboxilază) la etanal și redus la etanol (alcool-dehidrogenază), regenerând NAD⁺. Zaharoza este mai întâi hidrolizată de invertază. Viteza are un optim enzimatic în jur de 35 °C; drojdia se oprește la aproximativ 15% etanol.'),
  fact:L('The holes in bread are bubbles of carbon dioxide from fermenting yeast; the alcohol evaporates in the oven.','Găurile din pâine sunt bule de dioxid de carbon de la drojdia care fermentează; alcoolul se evaporă în cuptor.')};
R3(Object.assign({id:'ferment', key:'ferment:warm', needs:['yeast','sugaraq|glucoseaq'], consume:[1], produce:['ethanolaq'], cond:() => B.temp >= 28 && B.temp <= 48}, FERM));
R3(Object.assign({id:'ferment', key:'ferment:heat', needs:['yeast','sugaraq|glucoseaq'], heatOnly:1, wet:1, minT:30, maxT:48, consume:[1], produce:['ethanolaq']}, FERM));
LL('ferment', ['biomolecules','organic','rates','functional']);

// ---- iron(II) hydroxide
R3({id:'feii_base', needs:['feso4s|feso4','naoh|koh|ammonia'], consume:[0,1], produce:['feoh2','na2so4'], kind:'chem', safety:'lab',
  signs:['solid','color'], eq:'FeSO₄ + 2NaOH → Fe(OH)₂↓ + Na₂SO₄', fx:[{t:'swirl', dur:2}],
  wordsOverride:{r:['feso4s','naoh'], p:['feoh2','na2so4']},
  title:L('A dirty-green cloud','Un nor verde-murdar'),
  b:L('A dark green cloud appeared and slowly sank. This green solid tells chemists that iron(II) ions were in the liquid.','A apărut un nor verde-închis care s-a lăsat încet la fund. Acest solid verde le spune chimiștilor că în lichid erau ioni de fier(II).'),
  e:L('Hydroxide ions from the sodium hydroxide met the iron(II) ions and made iron(II) hydroxide, which does not dissolve. Each metal ion gives a hydroxide of its own colour: copper blue, iron(II) green, iron(III) orange-brown. Left in the air, the green solid slowly turns brown at the top as it is oxidised.',
      'Ionii hidroxid din hidroxidul de sodiu s-au întâlnit cu ionii de fier(II) și au format hidroxid de fier(II), care nu se dizolvă. Fiecare ion metalic dă un hidroxid de altă culoare: cuprul albastru, fierul(II) verde, fierul(III) maro-portocaliu. Lăsat la aer, solidul verde devine încet maro la suprafață, pe măsură ce se oxidează.'),
  s:L('Fe²⁺(aq) + 2OH⁻(aq) → Fe(OH)₂(s), Ksp ≈ 8 × 10⁻¹⁶. Air oxidation: 4Fe(OH)₂ + O₂ + 2H₂O → 4Fe(OH)₃ (rust-brown). Unlike Zn(OH)₂ or Al(OH)₃, it does not redissolve in excess NaOH, which helps identify the cation.',
      'Fe²⁺(aq) + 2OH⁻(aq) → Fe(OH)₂(s), Ks ≈ 8 × 10⁻¹⁶. Oxidare în aer: 4Fe(OH)₂ + O₂ + 2H₂O → 4Fe(OH)₃ (maro-ruginiu). Spre deosebire de Zn(OH)₂ sau Al(OH)₃, nu se redizolvă în exces de NaOH, ceea ce ajută la identificarea cationului.'),
  fact:L('Iron(II) sulfate is given as a medicine for people who do not have enough iron in their blood.','Sulfatul de fier(II) se dă ca medicament oamenilor care nu au destul fier în sânge.')});
LL('feii_base', ['analysis','ions','transition']);

// ---- barium chloride test for sulfate
const BAS = {na2so4s:['saltaq','BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl'], na2so4:['saltaq','BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl'], k2so4:['kcl','BaCl₂ + K₂SO₄ → BaSO₄↓ + 2KCl'],
  cuso4aq:['cucl2aq','BaCl₂ + CuSO₄ → BaSO₄↓ + CuCl₂'], feso4s:['fecl2','BaCl₂ + FeSO₄ → BaSO₄↓ + FeCl₂'], feso4:['fecl2','BaCl₂ + FeSO₄ → BaSO₄↓ + FeCl₂'], znso4:['zncl2','BaCl₂ + ZnSO₄ → BaSO₄↓ + ZnCl₂'], h2so4d:['hcl','BaCl₂ + H₂SO₄ → BaSO₄↓ + 2HCl']};
for(const s in BAS){
  R3({id:'bacl2', key:'bacl2:' + s, needs:['bacl2', s], consume:[0,1], produce:['baso4', BAS[s][0]], kind:'chem', safety:'lab',
    signs:['solid','color'], eq:BAS[s][1], fx:[{t:'swirl', dur:2}],
    title:L('A thick white cloud: sulfate!','Un nor alb și dens: sulfat!'),
    b:L('A thick white cloud appeared at once! That white solid tells us there are sulfate ions in the liquid.','A apărut imediat un nor alb și dens! Acest solid alb ne spune că în lichid sunt ioni sulfat.'),
    e:L('Barium ions (Ba²⁺) and sulfate ions (SO₄²⁻) join to make barium sulfate, which is extremely insoluble, so it forms a white precipitate. Chemists add a little hydrochloric acid first, to destroy any carbonate that could also give a white solid. This is the standard test for sulfate ions.',
        'Ionii de bariu (Ba²⁺) și ionii sulfat (SO₄²⁻) se unesc și formează sulfat de bariu, care este extrem de insolubil, deci formează un precipitat alb. Chimiștii adaugă întâi puțin acid clorhidric, ca să distrugă orice carbonat care ar putea da și el un solid alb. Acesta este testul standard pentru ionii sulfat.'),
    s:L('Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s), Ksp ≈ 1.1 × 10⁻¹⁰. Acidification with HCl prevents false positives from BaCO₃ or BaSO₃, which dissolve in acid. The same precipitation is used in gravimetric analysis to measure sulfate by mass.',
        'Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s), Ks ≈ 1,1 × 10⁻¹⁰. Acidularea cu HCl previne rezultatele fals pozitive de la BaCO₃ sau BaSO₃, care se dizolvă în acid. Aceeași precipitare se folosește în analiza gravimetrică, pentru a măsura sulfatul prin cântărire.'),
    fact:L('Barium salts are poisonous, but barium sulfate is so insoluble that patients drink it safely before X-rays of the gut.','Sărurile de bariu sunt otrăvitoare, dar sulfatul de bariu este atât de insolubil încât pacienții îl beau fără pericol înainte de radiografiile intestinului.')});
}
LL('bacl2', ['analysis','ions']);

// ---- silver bromide
R3({id:'agbr', needs:['agno3','kbr'], consume:[0,1], produce:['agbr','kno3'], kind:'chem', safety:'lab',
  signs:['solid','color'], eq:'AgNO₃ + KBr → AgBr↓ + KNO₃', fx:[{t:'swirl', dur:2}],
  zoom:{from:['Ag+','NO3-','K+','Br-'], to:['AgBr','K+','NO3-']},
  title:L('A cream-coloured cloud: bromide!','Un nor crem: bromură!'),
  b:L('A creamy, pale yellow cloud appeared! This colour shows there are bromide ions in the liquid.','A apărut un nor crem, galben-pal! Culoarea aceasta arată că în lichid sunt ioni bromură.'),
  e:L('Silver ions join halide ions to make solids that do not dissolve. The colour tells you which halide it is: chloride gives white, bromide cream and iodide yellow. Adding a little nitric acid first removes carbonate, which could also make a precipitate.',
      'Ionii de argint se unesc cu ionii halogenură și formează solide care nu se dizolvă. Culoarea îți spune ce halogenură este: clorura dă alb, bromura crem, iar iodura galben. Puțin acid azotic adăugat înainte îndepărtează carbonatul, care ar putea forma și el un precipitat.'),
  s:L('Ag⁺(aq) + Br⁻(aq) → AgBr(s), Ksp ≈ 5 × 10⁻¹³. Confirmation with ammonia: AgCl dissolves in dilute NH₃, AgBr only in concentrated NH₃ ([Ag(NH₃)₂]⁺), AgI in neither. AgBr is light-sensitive and was the key chemical in photographic film.',
      'Ag⁺(aq) + Br⁻(aq) → AgBr(s), Ks ≈ 5 × 10⁻¹³. Confirmare cu amoniac: AgCl se dizolvă în NH₃ diluat, AgBr doar în NH₃ concentrat ([Ag(NH₃)₂]⁺), iar AgI în niciunul. AgBr este sensibil la lumină și era substanța-cheie din filmele fotografice.'),
  fact:L('Black-and-white photographs were made with silver bromide crystals that darken where light hits them.','Fotografiile alb-negru se făceau cu cristale de bromură de argint care se înnegresc unde le lovește lumina.')});
LL('agbr', ['analysis','ions','groups']);

// ---- halogen displacement
const HD = [
  ['cl_br', ['clwater','kbr'], ['br2aq','kcl'], 'Cl₂ + 2KBr → 2KCl + Br₂', L('chlorine','clorul'), L('bromine','bromul'), L('yellow-orange','galben-portocaliu'), '#e8912e'],
  ['cl_i', ['clwater','ki|kiaq'], ['i2','kcl'], 'Cl₂ + 2KI → 2KCl + I₂', L('chlorine','clorul'), L('iodine','iodul'), L('brown','maro'), '#9a5a1a'],
  ['br_i', ['brwater','ki|kiaq'], ['i2','kbr'], 'Br₂ + 2KI → 2KBr + I₂', L('bromine','bromul'), L('iodine','iodul'), L('brown','maro'), '#9a5a1a'],
];
for(const H of HD){
  R3({id:'halogen_disp', key:'halogen_disp:' + H[0], needs:H[1], consume:[0,1], produce:H[2], kind:'chem', safety:'lab', colorRate:1,
    signs:['color'], eq:H[3], fx:[{t:'trails', color:H[7], dur:3}], vars:() => ({x:tr(H[4]), y:tr(H[5]), col:tr(H[6])}),
    title:L('A halogen swaps places','Un halogen face schimb de locuri'),
    b:L('The colourless liquid turned {col}! {x} pushed {y} out of its salt, and the free {y} gives the colour.','Lichidul incolor a devenit {col}! {x} a scos {y} din sarea lui, iar {y} liber dă culoarea.'),
    e:L('Halogens get less reactive down group 7: fluorine, chlorine, bromine, iodine. A more reactive halogen takes electrons from the ions of a less reactive one, so {x} became halide ions and {y} was set free. The reverse never happens: iodine cannot push out bromine or chlorine.',
        'Halogenii devin mai puțin reactivi în jos în grupa 17 (VII A): fluor, clor, brom, iod. Un halogen mai reactiv ia electroni de la ionii unuia mai puțin reactiv, așa că {x} a devenit ioni halogenură, iar {y} a fost eliberat. Invers nu se întâmplă niciodată: iodul nu poate scoate bromul sau clorul.'),
    s:L('Redox displacement: {eq}. Oxidising power falls down the group as atomic radius grows and the incoming electron is less attracted (E°: Cl₂/Cl⁻ +1.36 V, Br₂/Br⁻ +1.07 V, I₂/I⁻ +0.54 V). Shaking with hexane extracts Br₂ (orange) or I₂ (violet) into the organic layer to confirm the product.'.replace('{eq}', H[3]),
        'Substituție redox: {eq}. Puterea oxidantă scade în jos în grupă, pe măsură ce raza atomică crește și electronul nou este atras mai slab (E°: Cl₂/Cl⁻ +1,36 V, Br₂/Br⁻ +1,07 V, I₂/I⁻ +0,54 V). Agitarea cu hexan extrage Br₂ (portocaliu) sau I₂ (violet) în stratul organic, confirmând produsul.'.replace('{eq}', H[3])),
    fact:L('Bromine is extracted from sea water by exactly this reaction: chlorine gas is bubbled through bromide-rich brine.','Bromul se extrage din apa de mare exact prin această reacție: se barbotează clor prin saramură bogată în bromură.')});
}
LL('halogen_disp', ['groups','redox','reacttypes']);

// ---- MnO2 catalyst
R3({id:'mno2', needs:['h2o2','mno2'], consume:[0], produce:['water'], wp:['o2'], kind:'chem', energy:'exo', safety:'adult', temp:14,
  signs:['gas','heat'], eq:'2H₂O₂ → 2H₂O + O₂↑  (catalyst: MnO₂)',
  fx:[{t:'bubbles', rate:70, dur:6}, {t:'foam', h:.55, color:'#ffffff', rise:2, dur:5}, {t:'steam', dur:3, rate:3}],
  zoom:{from:['H2O2','H2O2'], to:['H2O','H2O','O2']},
  wordsOverride:{r:['h2o2'], p:['water','o2']},
  title:L('A black powder makes oxygen fast','O pulbere neagră face oxigen rapid'),
  b:L('Whoosh! The hydrogen peroxide fizzed hard and got warm. The black powder is still there at the bottom: it helped but was not used up!','Fâș! Apa oxigenată a făcut multe bule și s-a încălzit. Pulberea neagră este tot acolo, pe fund: a ajutat, dar nu s-a consumat!'),
  e:L('Manganese(IV) oxide is a catalyst. It speeds up the breakdown of hydrogen peroxide into water and oxygen by giving the reaction an easier path, but it is not used up. You could filter it out, dry it and use it again with the same mass. More powder means more surface, so the fizzing is faster.',
      'Dioxidul de mangan este un catalizator. Grăbește descompunerea apei oxigenate în apă și oxigen, oferind reacției o cale mai ușoară, dar nu se consumă. L-ai putea filtra, usca și folosi din nou, cu aceeași masă. Mai multă pulbere înseamnă mai multă suprafață, deci bulele apar mai repede.'),
  s:L('Heterogeneous catalysis: H₂O₂ adsorbs on MnO₂ surface sites, which lowers the activation energy (≈ 75 → ≈ 58 kJ/mol). Rate ∝ surface area; it is first order in [H₂O₂]. Measuring the O₂ volume against time with a gas syringe gives the rate curve.',
      'Cataliză eterogenă: H₂O₂ se adsoarbe pe suprafața MnO₂, ceea ce scade energia de activare (≈ 75 → ≈ 58 kJ/mol). Viteza ∝ suprafața; reacția este de ordinul 1 în [H₂O₂]. Măsurarea volumului de O₂ în timp cu o seringă de gaz dă curba vitezei.'),
  fact:L('Catalysts in car exhausts use platinum and rhodium in the same way: they speed up reactions without being used up.','Catalizatoarele mașinilor folosesc platină și rodiu la fel: grăbesc reacțiile fără să se consume.')});
LL('mno2', ['rates','kinetics','reactions']);

// ---- sodium thiosulfate + acid ("disappearing cross"): start card here, finish card when the cross vanishes (labtools)
R3({id:'thio_start', needs:['thio','hcl|vinegar|ethacid|lemon|h2so4d'], consume:[0,1], produce:['thiomix','saltaq'], wp:['so2'], kind:'chem', safety:'adult', noEq:1,
  signs:[],
  title:L('Watch the cross...','Privește crucea...'),
  b:L('Nothing much yet... Look at the black cross under the beaker and watch the timer. The liquid is slowly getting cloudy!','Deocamdată nu se vede mare lucru... Privește crucea neagră de sub pahar și cronometrul. Lichidul se tulbură încet!'),
  e:L('Acid makes thiosulfate break down into tiny specks of sulfur. They build up slowly, so the liquid gets more and more cloudy until you cannot see the cross any more. The time it takes tells you how fast the reaction is. Warmer liquid reacts faster.',
      'Acidul face tiosulfatul să se descompună în particule minuscule de sulf. Ele se adună încet, așa că lichidul devine tot mai tulbure, până când nu mai vezi crucea. Timpul necesar îți spune cât de rapidă este reacția. Un lichid mai cald reacționează mai repede.'),
  s:L('S₂O₃²⁻ + 2H⁺ → S(s) + SO₂ + H₂O. Colloidal sulfur scatters light; the time t for the cross to disappear is inversely proportional to the rate, so 1/t is used as a relative rate when varying concentration or temperature.',
      'S₂O₃²⁻ + 2H⁺ → S(s) + SO₂ + H₂O. Sulful coloidal împrăștie lumina; timpul t până la dispariția crucii este invers proporțional cu viteza, deci 1/t se folosește ca viteză relativă când variem concentrația sau temperatura.')});
delete RULE_INFO.thio_start;
const THIO_RULE = R3({id:'thio', needs:[], special:1, kind:'chem', safety:'adult', signs:['solid','color'], eq:'Na₂S₂O₃ + 2HCl → 2NaCl + S↓ + SO₂ + H₂O',
  wordsOverride:{r:['thio','hcl'], p:['saltaq', L('sulfur','sulf'), 'so2', 'water']},
  vars:() => ({sec:'30', temp:'21'}),
  title:L('The cross has vanished: {sec} s','Crucea a dispărut: {sec} s'),
  b:L('The liquid became so cloudy and pale yellow that the cross disappeared after {sec} seconds! The yellow cloud is made of tiny bits of sulfur.','Lichidul s-a tulburat atât de tare, galben-pal, încât crucea a dispărut după {sec} secunde! Norul galben este făcut din bucățele minuscule de sulf.'),
  e:L('It took {sec} s at about {temp} °C. Try again with a warmer liquid (light the burner first, then add the acid): the particles move faster and collide harder and more often, so the reaction is quicker and the cross vanishes sooner.',
      'A durat {sec} s la aproximativ {temp} °C. Încearcă din nou cu un lichid mai cald (aprinde întâi arzătorul, apoi adaugă acidul): particulele se mișcă mai repede și se ciocnesc mai des și mai puternic, deci reacția e mai rapidă și crucea dispare mai devreme.'),
  s:L('t = {sec} s at ≈ {temp} °C, relative rate 1/t = {rate} s⁻¹. A 10 °C rise roughly doubles the rate because the fraction of collisions with E ≥ Ea grows exponentially (Arrhenius: k = A·e^(−Ea/RT)). Plot 1/t against temperature or concentration to compare.',
      't = {sec} s la ≈ {temp} °C, viteză relativă 1/t = {rate} s⁻¹. O creștere cu 10 °C aproape dublează viteza, pentru că fracția ciocnirilor cu E ≥ Ea crește exponențial (Arrhenius: k = A·e^(−Ea/RT)). Reprezintă 1/t în funcție de temperatură sau concentrație pentru comparație.'),
  fact:L('The smell near the beaker is sulfur dioxide, the same gas that comes out of volcanoes.','Mirosul de lângă pahar este dioxidul de sulf, același gaz care iese din vulcani.')});
LL('thio', ['rates','kinetics']);

// ---- chromate ⇌ dichromate (handled by pH in labtools)
const CHROMATE_E = L('Chromate ions (yellow) and dichromate ions (orange) can turn into each other. Acid (H⁺) pushes the change towards orange dichromate; alkali removes H⁺ and pulls it back to yellow chromate. This is a reversible reaction that reaches equilibrium, and it responds to changes, as Le Chatelier’s principle says.',
  'Ionii cromat (galbeni) și ionii dicromat (portocalii) se pot transforma unii în alții. Acidul (H⁺) împinge transformarea spre dicromatul portocaliu; baza îndepărtează H⁺ și o aduce înapoi la cromatul galben. Aceasta este o reacție reversibilă care ajunge la echilibru și răspunde la schimbări, cum spune principiul lui Le Chatelier.');
const CHROMATE_S = L('2CrO₄²⁻(aq) + 2H⁺(aq) ⇌ Cr₂O₇²⁻(aq) + H₂O(l), K ≈ 4 × 10¹⁴. Adding H⁺ shifts the position right (orange); OH⁻ removes H⁺ (H⁺ + OH⁻ → H₂O), shifting it left (yellow). Not a redox change: Cr stays +6.',
  '2CrO₄²⁻(aq) + 2H⁺(aq) ⇌ Cr₂O₇²⁻(aq) + H₂O(l), K ≈ 4 × 10¹⁴. Adăugarea de H⁺ deplasează echilibrul spre dreapta (portocaliu); OH⁻ îndepărtează H⁺ (H⁺ + OH⁻ → H₂O), deplasându-l spre stânga (galben). Nu este o reacție redox: Cr rămâne +6.');
const CHROMATE_FWD = R3({id:'chromate_fwd', needs:[], special:1, kind:'chem', safety:'lab', signs:['color'], eq:'2CrO₄²⁻ + 2H⁺ ⇌ Cr₂O₇²⁻ + H₂O', noEq:1,
  title:L('Yellow turns orange','Galbenul devine portocaliu'),
  b:L('The acid turned the yellow chromate solution orange! Now add a base such as sodium hydroxide and watch.','Acidul a făcut soluția galbenă de cromat portocalie! Acum adaugă o bază, de exemplu hidroxid de sodiu, și privește.'),
  e:CHROMATE_E, s:CHROMATE_S, fact:L('Chromium gets its name from the Greek word chroma, colour, because its compounds are so colourful.','Cromul își ia numele de la cuvântul grecesc chroma, culoare, pentru că are compuși atât de colorați.')});
delete RULE_INFO.chromate_fwd;
const CHROMATE_RULE = R3({id:'chromate', needs:[], special:1, kind:'chem', safety:'lab', signs:['color'], eq:'2CrO₄²⁻ + 2H⁺ ⇌ Cr₂O₇²⁻ + H₂O', noEq:1,
  vars:() => ({col:tr(L('yellow','galben'))}),
  title:L('It flips back: a reversible reaction!','Se întoarce: o reacție reversibilă!'),
  b:L('The colour flipped back to {col}! Acid makes it orange, alkali makes it yellow, again and again. The reaction can go both ways.','Culoarea s-a întors la {col}! Acidul o face portocalie, baza o face galbenă, iar și iar. Reacția poate merge în ambele sensuri.'),
  e:CHROMATE_E, s:CHROMATE_S, fact:L('Chromium gets its name from the Greek word chroma, colour, because its compounds are so colourful.','Cromul își ia numele de la cuvântul grecesc chroma, culoare, pentru că are compuși atât de colorați.')});
LL('chromate', ['equilibrium','kc','transition']); LL('chromate_fwd', ['equilibrium']);

// ---- synthetic indicators (handled in labtools)
const IND3 = {
  univ:{n:L('Universal indicator','Indicatorul universal')},
  mo:{n:L('Methyl orange','Metiloranjul')},
  phph:{n:L('Phenolphthalein','Fenolftaleina')},
};
function indColor3(ind, ph){
  if(ind === 'phph'){ const k = clamp01((ph - 8.2)/1.6); if(k <= 0) return null; return [224, 36, 122, .12 + .72*k]; }
  if(ind === 'mo'){
    const a = [216, 40, 58], b = [238, 122, 34], c = [242, 195, 38];
    if(ph <= 3.1) return a.concat(.72); if(ph >= 4.4) return c.concat(.62);
    const k = (ph - 3.1)/1.3; const m = k < .5 ? [0,1,2].map(i => lerp(a[i], b[i], k*2)) : [0,1,2].map(i => lerp(b[i], c[i], (k - .5)*2)); return m.concat(.68);
  }
  if(ind === 'univ'){
    const st = [[0,'#c8102e'],[2,'#e2342a'],[3,'#ef6a24'],[4,'#f59a1e'],[5,'#f2c62a'],[6,'#c9d334'],[7,'#3fae4a'],[8,'#1f9a8a'],[9,'#2a6fc4'],[10,'#3b4fb0'],[11,'#5a3ca6'],[14,'#6a2f96']];
    let i = 0; while(i < st.length - 2 && ph > st[i + 1][0]) i++;
    const k = clamp01((ph - st[i][0])/(st[i + 1][0] - st[i][0])); const a = hexToRgb(st[i][1]), b = hexToRgb(st[i + 1][1]);
    return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k), .8];
  }
  return null;
}
function indBand3(ind, ph){
  if(ind === 'phph') return ph < 8.2 ? ['colourless', L('colourless','incoloră')] : ph < 9.4 ? ['pale', L('pale pink','roz-pal')] : ['pink', L('bright pink','roz-aprins')];
  if(ind === 'mo') return ph < 3.1 ? ['red', L('red','roșu')] : ph < 4.4 ? ['orange', L('orange','portocaliu')] : ['yellow', L('yellow','galben')];
  const U = [[3,'red',L('red','roșu')],[4.5,'orange',L('orange','portocaliu')],[6,'yellow',L('yellow','galben')],[7.5,'green',L('green','verde')],[9.5,'blue',L('blue','albastru')],[99,'purple',L('purple','mov')]];
  const u = U.find(x => ph < x[0]); return [u[1], u[2]];
}
const IND3_RULE = R3({id:'indicator2', needs:[], special:1, kind:'phys', safety:'lab', signs:['color'], noEq:1,
  vars:() => ({ind:'', color:'', ph:'7', side:''}),
  title:L('{ind}: {color}','{ind}: {color}'),
  b:L('{ind} turned {color}. That means the liquid is {side}.','{ind} a devenit {color}. Asta înseamnă că lichidul este {side}.'),
  e:L('Indicators are dyes that change colour at a particular pH. Phenolphthalein is colourless in acid and turns pink above about pH 8.3. Methyl orange is red below pH 3.1 and yellow above 4.4. Universal indicator is a mixture that goes through the rainbow: red for strong acid, green for neutral, purple for strong alkali. This liquid is about pH {ph}.',
      'Indicatorii sunt coloranți care își schimbă culoarea la un anumit pH. Fenolftaleina este incoloră în acid și devine roz peste pH 8,3. Metiloranjul este roșu sub pH 3,1 și galben peste 4,4. Indicatorul universal este un amestec care trece prin curcubeu: roșu pentru acid tare, verde pentru neutru, mov pentru bază tare. Acest lichid are pH în jur de {ph}.'),
  s:L('An indicator HIn is a weak acid whose two forms differ in colour: HIn ⇌ H⁺ + In⁻. The colour change happens over about pKa ± 1 (phenolphthalein pKa ≈ 9.3, range 8.2–10; methyl orange pKa ≈ 3.5, range 3.1–4.4). For a titration choose an indicator whose range lies inside the vertical part of the pH curve. Current pH ≈ {ph}.',
      'Un indicator HIn este un acid slab ale cărui două forme au culori diferite: HIn ⇌ H⁺ + In⁻. Virajul are loc pe un interval de aproximativ pKa ± 1 (fenolftaleina pKa ≈ 9,3, interval 8,2–10; metiloranjul pKa ≈ 3,5, interval 3,1–4,4). La titrare alegi un indicator al cărui interval se află în porțiunea verticală a curbei de pH. pH-ul actual ≈ {ph}.'),
  fact:L('Swimming-pool test kits use indicator dyes to check the pH of the water every day.','Trusele de testare pentru piscine folosesc coloranți indicatori ca să verifice zilnic pH-ul apei.')});
LL('indicator2', ['acids','acidsadv']);

// ---- tool rules (cards shown by labtools)
const TIT_RULE = R3({id:'titration', needs:[], special:1, kind:'chem', energy:'exo', safety:'lab', signs:['color','heat'], eq:'HA + NaOH → NaA + H₂O',
  wordsOverride:{r:[L('acid','acid'), 'naoh'], p:[L('salt','sare'), 'water']},
  vars:() => ({titre:'25.00', conc:'0.100', acid:'', ind:'', ph:'7', warn:''}),
  title:L('End point reached: {titre} cm³','Punctul final atins: {titre} cm³'),
  b:L('The indicator changed colour for good after {titre} cm³ of sodium hydroxide. The acid has just been neutralised!{warn}','Indicatorul și-a schimbat definitiv culoarea după {titre} cm³ de hidroxid de sodiu. Acidul tocmai a fost neutralizat!{warn}'),
  e:L('At the end point, just enough alkali has been added to react with all the acid. Titre = {titre} cm³. Moles of NaOH = 0.100 × {titre}/1000; the acid reacts 1 : 1, so its concentration = 0.100 × {titre} / 25.0 = {conc} mol/dm³.{warn}',
      'La punctul final s-a adăugat exact atâta bază cât să reacționeze cu tot acidul. Volumul de titrare = {titre} cm³. Moli de NaOH = 0,100 × {titre}/1000; acidul reacționează 1 : 1, deci concentrația lui = 0,100 × {titre} / 25,0 = {conc} mol/dm³.{warn}'),
  s:L('{acid} with {ind}: titre {titre} cm³ → c = cV(NaOH)/V(acid) = {conc} mol/dm³; pH at the end point ≈ {ph}. Strong acid–strong base: equivalence at pH 7 with a steep jump from about 3.5 to 10.5. Weak acid (pKa 4.76): a buffer region where pH = pKa at half-neutralisation (12.5 cm³), and equivalence at pH ≈ 8.7, so phenolphthalein is the right indicator.{warn}',
      '{acid} cu {ind}: volum {titre} cm³ → c = cV(NaOH)/V(acid) = {conc} mol/dm³; pH la punctul final ≈ {ph}. Acid tare–bază tare: echivalență la pH 7, cu un salt abrupt de la circa 3,5 la 10,5. Acid slab (pKa 4,76): o zonă tampon în care pH = pKa la jumătatea neutralizării (12,5 cm³) și echivalență la pH ≈ 8,7, deci fenolftaleina este indicatorul potrivit.{warn}'),
  fact:L('Titration is used every day to check the acidity of wine, milk and medicines.','Titrarea se folosește zilnic ca să se verifice aciditatea vinului, a laptelui și a medicamentelor.')});
LL('titration', ['acidsadv','concentration','acids']);

const EL_TXT = {
  water:{title:L('Splitting water with electricity','Descompunem apa cu electricitate'),
    b:L('Bubbles appeared on both electrodes: twice as much gas on the negative one as on the positive one. The electricity is splitting water into hydrogen and oxygen!','Au apărut bule pe ambii electrozi: de două ori mai mult gaz pe cel negativ decât pe cel pozitiv. Electricitatea descompune apa în hidrogen și oxigen!'),
    e:L('Electrolysis uses electricity to break a compound apart. Water molecules are H₂O, two hydrogens for every oxygen, so you get two volumes of hydrogen at the negative electrode (cathode) and one volume of oxygen at the positive electrode (anode). The sodium sulfate just helps the water conduct; it is not used up.',
        'Electroliza folosește electricitatea ca să descompună un compus. Moleculele de apă sunt H₂O, doi hidrogeni la fiecare oxigen, deci obții două volume de hidrogen la electrodul negativ (catod) și un volum de oxigen la electrodul pozitiv (anod). Sulfatul de sodiu doar ajută apa să conducă; nu se consumă.'),
    s:L('Cathode (reduction): 4H₂O + 4e⁻ → 2H₂ + 4OH⁻. Anode (oxidation): 2H₂O → O₂ + 4H⁺ + 4e⁻. Overall 2H₂O → 2H₂ + O₂, so V(H₂) : V(O₂) = 2 : 1 (Avogadro). Na⁺ and SO₄²⁻ are harder to discharge than water, so only water reacts. Minimum voltage 1.23 V, more in practice (overpotential).',
        'Catod (reducere): 4H₂O + 4e⁻ → 2H₂ + 4OH⁻. Anod (oxidare): 2H₂O → O₂ + 4H⁺ + 4e⁻. Global 2H₂O → 2H₂ + O₂, deci V(H₂) : V(O₂) = 2 : 1 (Avogadro). Na⁺ și SO₄²⁻ se descarcă mai greu decât apa, deci reacționează doar apa. Tensiune minimă 1,23 V, în practică mai mare (supratensiune).'),
    eq:'2H₂O → 2H₂↑ (cathode) + O₂↑ (anode)', words:{r:['water'], p:['h2','o2']},
    fact:L('Hydrogen made this way with solar or wind power is called green hydrogen, a clean fuel.','Hidrogenul obținut așa cu energie solară sau eoliană se numește hidrogen verde, un combustibil curat.')},
  brine:{title:L('Brine makes hydrogen and chlorine','Saramura dă hidrogen și clor'),
    b:L('Bubbles on both electrodes! A pale green gas with a swimming-pool smell came off the positive electrode: chlorine. Hydrogen bubbled off the negative one. The chlorine bleached the indicator!','Bule pe ambii electrozi! De la electrodul pozitiv a ieșit un gaz verde-pal cu miros de piscină: clorul. De la cel negativ a ieșit hidrogen. Clorul a decolorat indicatorul!'),
    e:L('Salt water contains Na⁺, Cl⁻, H⁺ and OH⁻ ions. At the negative electrode hydrogen is released (sodium is too reactive to be made). At the positive electrode chloride ions lose electrons and become chlorine gas, which bleaches damp indicator paper. Sodium hydroxide is left in the solution.',
        'Apa sărată conține ionii Na⁺, Cl⁻, H⁺ și OH⁻. La electrodul negativ se degajă hidrogen (sodiul este prea reactiv ca să se formeze). La electrodul pozitiv ionii clorură pierd electroni și devin clor gazos, care decolorează hârtia de indicator umedă. În soluție rămâne hidroxid de sodiu.'),
    s:L('Cathode: 2H₂O + 2e⁻ → H₂ + 2OH⁻. Anode: 2Cl⁻ → Cl₂ + 2e⁻ (favoured over O₂ in concentrated chloride despite E°, because of the oxygen overpotential). Overall 2NaCl + 2H₂O → 2NaOH + H₂ + Cl₂ (chlor-alkali process). Ideal gas ratio 1 : 1; less Cl₂ is collected because it dissolves and reacts with OH⁻ to form ClO⁻.',
        'Catod: 2H₂O + 2e⁻ → H₂ + 2OH⁻. Anod: 2Cl⁻ → Cl₂ + 2e⁻ (favorizat față de O₂ în clorură concentrată, în ciuda lui E°, din cauza supratensiunii oxigenului). Global 2NaCl + 2H₂O → 2NaOH + H₂ + Cl₂ (procesul clor-alcalii). Raport ideal al gazelor 1 : 1; se colectează mai puțin Cl₂, pentru că se dizolvă și reacționează cu OH⁻, formând ClO⁻.'),
    eq:'2NaCl + 2H₂O → 2NaOH + H₂↑ + Cl₂↑', words:{r:['saltaq','water'], p:['naoh','h2','cl2']},
    fact:L('The chlor-alkali industry electrolyses brine to make chlorine for PVC and clean water, and sodium hydroxide for soap and paper.','Industria clor-alcalii electrolizează saramura ca să obțină clor pentru PVC și apă curată, și hidroxid de sodiu pentru săpun și hârtie.')},
  copper:{title:L('Copper plating with electricity','Placare cu cupru prin electricitate'),
    b:L('The negative electrode got coated in pink-brown copper, and the blue colour slowly faded! Bubbles of oxygen came off the positive electrode.','Electrodul negativ s-a acoperit cu cupru roz-maroniu, iar albastrul s-a stins încet! De la electrodul pozitiv au ieșit bule de oxigen.'),
    e:L('Copper ions (Cu²⁺) are positive, so they are attracted to the negative electrode. There each one gains two electrons and becomes a copper atom, building up a copper layer. As the copper ions are used up, the blue colour fades. At the positive electrode, water gives off oxygen and the solution slowly becomes acidic.',
        'Ionii de cupru (Cu²⁺) sunt pozitivi, deci sunt atrași de electrodul negativ. Acolo fiecare primește doi electroni și devine atom de cupru, formând un strat de cupru. Pe măsură ce ionii de cupru se consumă, albastrul se stinge. La electrodul pozitiv apa degajă oxigen, iar soluția devine încet acidă.'),
    s:L('Cathode: Cu²⁺ + 2e⁻ → Cu (E° = +0.34 V, easier than reducing water). Graphite anode: 2H₂O → O₂ + 4H⁺ + 4e⁻, so H₂SO₄ accumulates. With a copper anode instead, Cu → Cu²⁺ + 2e⁻ and the colour stays constant (electrorefining). Mass deposited m = MIt/(nF) (Faraday).',
        'Catod: Cu²⁺ + 2e⁻ → Cu (E° = +0,34 V, mai ușor decât reducerea apei). Anod de grafit: 2H₂O → O₂ + 4H⁺ + 4e⁻, deci se acumulează H₂SO₄. Cu anod de cupru, Cu → Cu²⁺ + 2e⁻, iar culoarea rămâne constantă (rafinare electrolitică). Masa depusă m = MIt/(nF) (Faraday).'),
    eq:'2CuSO₄ + 2H₂O → 2Cu + O₂↑ + 2H₂SO₄', words:{r:['cuso4aq','water'], p:[L('copper','cupru'),'o2','h2so4d']},
    fact:L('Pure copper for electrical wires is made by electrolysis: it is 99.99% pure.','Cuprul pur pentru firele electrice se obține prin electroliză: este pur în proporție de 99,99%.')},
};
const EL_RULES = {};
for(const k in EL_TXT){ const T = EL_TXT[k];
  EL_RULES[k] = R3({id:'electrolysis', key:'electrolysis:' + k, needs:[], special:1, kind:'chem', energy:'endo', safety:'lab', signs: k === 'copper' ? ['solid','color','gas'] : k === 'brine' ? ['gas','smell','color'] : ['gas'],
    eq:T.eq, wordsOverride:T.words, title:T.title, b:T.b, e:T.e, s:T.s, fact:T.fact});
}
LL('electrolysis', ['electrolysis','electrode','redox']);

const CELL_RULE = R3({id:'cell', needs:[], special:1, kind:'chem', energy:'exo', safety:'home', signs:[], noEq:1,
  vars:() => ({l:'Zn', r:'Cu', v:'1.10', neg:'Zn', pos:'Cu'}),
  title:L('A {l}–{r} cell: {v} V','O pilă {l}–{r}: {v} V'),
  b:L('The voltmeter reads {v} volts! Two different metals in salt solutions, joined by a wire and a salt bridge, make electricity. That is a battery!','Voltmetrul arată {v} volți! Două metale diferite în soluții de săruri, legate cu un fir și o punte de sare, produc electricitate. Asta este o baterie!'),
  e:L('The more reactive metal ({neg}) gives away electrons more easily, so it becomes the negative electrode. Electrons flow through the wire to the less reactive metal ({pos}), the positive electrode. The further apart the two metals are in the reactivity series, the bigger the voltage.',
      'Metalul mai reactiv ({neg}) cedează electronii mai ușor, deci devine electrodul negativ. Electronii curg prin fir spre metalul mai puțin reactiv ({pos}), electrodul pozitiv. Cu cât cele două metale sunt mai departe în seria reactivității, cu atât tensiunea este mai mare.'),
  s:L('E°cell = E°(right) − E°(left) = {v} V (standard conditions, 1 mol/dm³, 298 K). Oxidation at the {neg} anode (−), reduction at the {pos} cathode (+); the salt bridge (KNO₃) completes the circuit and keeps each half-cell neutral. ΔG° = −nFE°cell, so a positive E° means a spontaneous reaction.',
      'E°pilă = E°(dreapta) − E°(stânga) = {v} V (condiții standard, 1 mol/dm³, 298 K). Oxidare la anodul de {neg} (−), reducere la catodul de {pos} (+); puntea de sare (KNO₃) închide circuitul și menține fiecare semipilă neutră. ΔG° = −nFE°pilă, deci un E° pozitiv înseamnă o reacție spontană.'),
  fact:L('The zinc–copper Daniell cell (1836) powered the first telegraph networks.','Pila Daniell zinc–cupru (1836) a alimentat primele rețele de telegraf.')});
LL('cell', ['cells','electrode','redox']);

// ---- "needs heat" hints (quiet, once)
const NH = [['benedict', ['benedict','glucose|glucoseaq']], ['ester', ['ethanol','ethacid','h2so4']], ['dichromate', ['k2cr2o7','ethanol']], ['saponify', ['oil','naoh']]];
for(const [k, needs] of NH){
  R3({id:'needs_heat', key:'needs_heat:' + k, needs, consume:[], produce:[], kind:'phys', safety:'home', quiet:1, noEq:1, signs:[],
    title:L('Nothing yet: it needs heat','Încă nimic: are nevoie de căldură'),
    b:L('Nothing seems to happen yet. This reaction is too slow when cold. Light the burner and warm it up!','Deocamdată nu pare să se întâmple nimic. Reacția este prea lentă la rece. Aprinde arzătorul și încălzește amestecul!'),
    e:L('Many reactions need energy to get started. Heating makes the particles move faster, so they collide more often and with enough energy to react.','Multe reacții au nevoie de energie ca să pornească. Încălzirea face particulele să se miște mai repede, deci se ciocnesc mai des și cu destulă energie ca să reacționeze.'),
    s:L('Rate constants rise steeply with temperature (Arrhenius). These reactions have activation energies high enough that at room temperature they are too slow to notice.','Constantele de viteză cresc abrupt cu temperatura (Arrhenius). Aceste reacții au energii de activare destul de mari încât la temperatura camerei sunt prea lente ca să se observe.')});
}
delete RULE_INFO.needs_heat;
R3({id:'ferment_cold', needs:['yeast','sugaraq|glucoseaq'], cond:() => B.temp < 28, consume:[], produce:[], kind:'phys', safety:'home', quiet:1, noEq:1, signs:[],
  title:L('The yeast is sleepy','Drojdia este adormită'),
  b:L('The yeast is alive, but it is too cold to be busy. Warm the beaker gently to about 35 °C with the burner.','Drojdia e vie, dar e prea frig ca să lucreze. Încălzește ușor paharul la aproximativ 35 °C cu arzătorul.'),
  e:L('Yeast is a living fungus. Its enzymes work fastest at body-warm temperatures and very slowly in the cold.','Drojdia este o ciupercă vie. Enzimele ei lucrează cel mai repede la temperaturi apropiate de cea a corpului și foarte încet la rece.')});
delete RULE_INFO.ferment_cold;

RULES.unshift(...NEW3);

// ---- ethanoic acid behaves like vinegar in the older rules
for(const r of RULES.slice()){
  if(!r.key || r.key.indexOf(':vinegar') < 0 || r.needs.indexOf('vinegar') < 0) continue;
  const nk = r.key.replace(':vinegar', ':ethacid'); if(RULES.some(x => x.key === nk)) continue;
  const c = Object.assign({}, r, {key:nk, needs:r.needs.map(x => x === 'vinegar' ? 'ethacid' : x)});
  if(r.id === 'acid_carb') c.vars = () => ({acid:tr(L('the ethanoic acid','acidul etanoic')), Acid:cap(tr(L('the ethanoic acid','acidul etanoic')))});
  RULES.push(c);
}
TOTAL_DISC = Object.keys(RULE_INFO).length;

// zoom templates for the new reactions
Object.assign(EL, {Zn:{c:'#8f9aa6', r:.6, txt:'#fff'}, Br:{c:'#a0341c', r:.62, txt:'#fff'}});
Object.assign(TPL, {
  Zn:{a:[['Zn',0,0]], b:[], l:'Zn'}, 'Zn2+':{a:[['Zn',0,0,'2+']], b:[], l:'Zn²⁺'},
  'Br-':{a:[['Br',0,0,'−']], b:[], l:'Br⁻'}, AgBr:{a:[['Ag',-.62,0],['Br',.64,0]], b:[[0,1,'i']], l:'AgBr'},
});

// ---------- missions ----------
MISSIONS.push(
  MS('rule:zn_acid', L('Zinc and acid','Zinc și acid'), L('Make hydrogen gas from zinc and an acid.','Fă hidrogen din zinc și un acid.'),
    [st('add:hcl','Pour in Hydrochloric acid','Toarnă Acid clorhidric'), st('add:zn','Drop in Zinc granules','Adaugă Granule de zinc'), st('rule:zn_acid','Watch the bubbles','Urmărește bulele')]),
  MS('rule:zn_cuso4', L('Zinc steals copper','Zincul fură cuprul'), L('Watch zinc push copper out of a blue solution.','Privește cum zincul scoate cuprul dintr-o soluție albastră.'),
    [st('add:water','Add Water','Adaugă Apă'), st('add:cuso4','Add Copper sulfate','Adaugă Sulfat de cupru'), st('add:zn','Drop in Zinc granules','Adaugă Granule de zinc'), st('rule:zn_cuso4','Watch the blue fade','Urmărește cum se stinge albastrul')]),
  MS('rule:limewater', L('The limewater test','Testul cu apă de var'), L('Show that breath or dry ice contains carbon dioxide.','Arată că respirația sau gheața carbonică conține dioxid de carbon.'),
    [st('add:limewater','Pour in Limewater','Toarnă Apă de var'), st('tool:straw|add:dryice','Blow through the Straw (or add Dry ice)','Suflă prin Pai (sau adaugă Gheață carbonică)'), st('rule:limewater','Watch it turn milky','Privește cum devine lăptoasă')]),
  MS('rule:bromine', L('Bromine water test','Testul cu apă de brom'), L('Tell an alkane from an alkene with bromine water.','Deosebește un alcan de o alchenă cu apă de brom.'),
    [st('add:brwater','Pour in Bromine water','Toarnă Apă de brom'), st('add:hexane','Add Hexane (alkane)','Adaugă Hexan (alcan)'), st('add:hexene','Add Cyclohexene (alkene)','Adaugă Ciclohexenă (alchenă)'), st('rule:bromine','Watch the orange disappear','Privește cum dispare portocaliul')]),
  MS('rule:ester', L('Make a fruity ester','Fă un ester cu miros de fructe'), L('Make an ester from an alcohol and an acid.','Fă un ester dintr-un alcool și un acid.'),
    [st('add:ethanol','Pour in Ethanol','Toarnă Etanol'), st('add:ethacid','Pour in Ethanoic acid','Toarnă Acid etanoic'), st('add:h2so4','Add a drop of Sulfuric acid (catalyst)','Adaugă o picătură de Acid sulfuric (catalizator)'), st('heat:on','Warm it with the burner','Încălzește cu arzătorul'), st('rule:ester','Smell the ester','Simte mirosul esterului')]),
  MS('rule:benedict', L('Benedict’s sugar test','Testul Benedict pentru zahăr'), L('Test glucose for a reducing sugar.','Testează glucoza: este zahăr reducător?'),
    [st('add:benedict','Pour in Benedict’s solution','Toarnă Reactiv Benedict'), st('add:glucose','Add Glucose','Adaugă Glucoză'), st('heat:on','Heat it with the burner','Încălzește cu arzătorul'), st('rule:benedict','Watch the colours change','Urmărește cum se schimbă culorile')]),
  MS('rule:biuret', L('Protein detector','Detectorul de proteine'), L('Test egg white for protein.','Testează albușul de ou pentru proteine.'),
    [st('add:eggwhite','Pour in Egg white','Toarnă Albuș de ou'), st('add:biuret','Add Biuret reagent','Adaugă Reactiv biuret'), st('rule:biuret','Look for purple','Caută culoarea mov')]),
  MS('rule:dichromate', L('Oxidising an alcohol','Oxidarea unui alcool'), L('Turn orange dichromate green with ethanol.','Fă dicromatul portocaliu verde cu etanol.'),
    [st('add:k2cr2o7','Pour in Potassium dichromate','Toarnă Dicromat de potasiu'), st('add:ethanol','Add Ethanol','Adaugă Etanol'), st('heat:on','Warm it with the burner','Încălzește cu arzătorul'), st('rule:dichromate','Watch orange turn green','Privește cum portocaliul devine verde')]),
  MS('rule:saponify', L('Make soap','Fă săpun'), L('Turn oil into soap with sodium hydroxide.','Transformă uleiul în săpun cu hidroxid de sodiu.'),
    [st('add:oil','Pour in Cooking oil','Toarnă Ulei de gătit'), st('add:naoh','Add Sodium hydroxide','Adaugă Hidroxid de sodiu'), st('heat:on','Heat it with the burner','Încălzește cu arzătorul'), st('rule:saponify','Wait for the soap','Așteaptă săpunul')]),
  MS('rule:ferment', L('Living chemistry','Chimie vie'), L('Let yeast ferment sugar in warm water.','Lasă drojdia să fermenteze zahărul în apă caldă.'),
    [st('add:water','Add Water','Adaugă Apă'), st('add:sugar','Add Sugar','Adaugă Zahăr'), st('add:yeast','Add Yeast','Adaugă Drojdie'), st('heat:on','Warm it gently (about 35 °C)','Încălzește ușor (circa 35 °C)'), st('rule:ferment','Watch for bubbles','Urmărește bulele')]),
  MS('rule:feii_base', L('Iron(II) test','Testul pentru fier(II)'), L('Identify iron(II) ions with sodium hydroxide.','Identifică ionii de fier(II) cu hidroxid de sodiu.'),
    [st('add:feso4s','Pour in Iron(II) sulfate','Toarnă Sulfat de fier(II)'), st('add:naoh','Add Sodium hydroxide','Adaugă Hidroxid de sodiu'), st('rule:feii_base','Look at the colour','Privește culoarea')]),
  MS('rule:bacl2', L('Sulfate test','Testul pentru sulfat'), L('Test for sulfate ions with barium chloride.','Testează ionii sulfat cu clorură de bariu.'),
    [st('add:na2so4s','Pour in Sodium sulfate','Toarnă Sulfat de sodiu'), st('add:hcl','Add a little Hydrochloric acid','Adaugă puțin Acid clorhidric'), st('add:bacl2','Add Barium chloride','Adaugă Clorură de bariu'), st('rule:bacl2','Look for a white solid','Caută un solid alb')]),
  MS('rule:agbr', L('Halide test: bromide','Testul halogenurilor: bromura'), L('Test for bromide ions with silver nitrate.','Testează ionii bromură cu azotat de argint.'),
    [st('add:kbr','Pour in Potassium bromide','Toarnă Bromură de potasiu'), st('add:agno3','Add Silver nitrate','Adaugă Azotat de argint'), st('rule:agbr','Look at the colour','Privește culoarea')]),
  MS('rule:fe_scn', L('Iron(III) detector','Detectorul de fier(III)'), L('Make blood-red colour to reveal iron(III) ions.','Fă o culoare roșu-sânge care arată ionii de fier(III).'),
    [st('add:fecl3','Pour in Iron(III) chloride','Toarnă Clorură de fier(III)'), st('add:kscn','Add Potassium thiocyanate','Adaugă Tiocianat de potasiu'), st('rule:fe_scn','Watch the colour','Urmărește culoarea')]),
  MS('rule:halogen_disp', L('Halogen tug of war','Lupta halogenilor'), L('Show that chlorine is more reactive than bromine.','Arată că clorul este mai reactiv decât bromul.'),
    [st('add:kbr','Pour in Potassium bromide','Toarnă Bromură de potasiu'), st('add:clwater','Add Chlorine water','Adaugă Apă de clor'), st('rule:halogen_disp','Watch the colour','Urmărește culoarea')]),
  MS('rule:chromate', L('A reversible reaction','O reacție reversibilă'), L('Flip chromate between yellow and orange.','Schimbă cromatul între galben și portocaliu.'),
    [st('add:k2cro4','Pour in Potassium chromate','Toarnă Cromat de potasiu'), st('add:hcl','Add Hydrochloric acid','Adaugă Acid clorhidric'), st('add:naoh','Add Sodium hydroxide','Adaugă Hidroxid de sodiu'), st('rule:chromate','Watch it flip back','Privește cum revine')]),
  MS('rule:mno2', L('A catalyst at work','Un catalizator la lucru'), L('Speed up hydrogen peroxide with manganese(IV) oxide.','Grăbește apa oxigenată cu dioxid de mangan.'),
    [st('add:h2o2','Pour in Hydrogen peroxide','Toarnă Apă oxigenată'), st('add:mno2','Add Manganese(IV) oxide','Adaugă Dioxid de mangan'), st('rule:mno2','Watch the fizz','Urmărește bulele')]),
  MS('rule:thio', L('The disappearing cross','Crucea care dispare'), L('Time how long it takes for the cross to vanish.','Cronometrează cât durează până dispare crucea.'),
    [st('add:thio','Pour in Sodium thiosulfate','Toarnă Tiosulfat de sodiu'), st('add:hcl','Add Hydrochloric acid (the timer starts)','Adaugă Acid clorhidric (pornește cronometrul)'), st('rule:thio','Wait until the cross disappears','Așteaptă până dispare crucea')]),
  MS('rule:titration', L('Titration','Titrarea'), L('Find the exact volume of alkali that neutralises an acid.','Află volumul exact de bază care neutralizează un acid.'),
    [st('tool:burette','Open the Burette tool','Deschide instrumentul Biuretă'), st('tit:add','Add sodium hydroxide from the burette','Adaugă hidroxid de sodiu din biuretă'), st('rule:titration','Stop at the colour change','Oprește-te la schimbarea culorii')]),
  MS('rule:electrolysis:water', L('Splitting water','Descompunerea apei'), L('Split water into hydrogen and oxygen with electricity.','Descompune apa în hidrogen și oxigen cu electricitate.'),
    [st('add:water','Add Water','Adaugă Apă'), st('add:na2so4s','Add Sodium sulfate','Adaugă Sulfat de sodiu'), st('tool:electrodes','Put in the Electrodes','Pune Electrozii'), st('rule:electrolysis:water','Compare the gas volumes','Compară volumele de gaz')]),
  MS('rule:electrolysis:brine', L('Electrolysis of brine','Electroliza saramurii'), L('Make hydrogen and chlorine from salt water.','Fă hidrogen și clor din apă sărată.'),
    [st('add:water','Add Water','Adaugă Apă'), st('add:salt','Add Table salt','Adaugă Sare de bucătărie'), st('add:univ','Add Universal indicator','Adaugă Indicator universal'), st('tool:electrodes','Put in the Electrodes','Pune Electrozii'), st('rule:electrolysis:brine','Watch both electrodes','Urmărește ambii electrozi')]),
  MS('rule:electrolysis:copper', L('Copper plating','Placarea cu cupru'), L('Coat an electrode with copper from copper sulfate.','Acoperă un electrod cu cupru din sulfat de cupru.'),
    [st('add:water','Add Water','Adaugă Apă'), st('add:cuso4','Add Copper sulfate','Adaugă Sulfat de cupru'), st('tool:electrodes','Put in the Electrodes','Pune Electrozii'), st('rule:electrolysis:copper','Watch the negative electrode','Urmărește electrodul negativ')]),
  MS('rule:cell', L('Make a battery','Fă o baterie'), L('Build a zinc–copper cell and measure its voltage.','Construiește o pilă zinc–cupru și măsoară-i tensiunea.'),
    [st('tool:cell','Open the Cell tool','Deschide instrumentul Pilă'), st('cellpick:zn','Choose Zinc for the left half-cell','Alege Zinc pentru semipila din stânga'), st('cellpick:cu','Choose Copper for the right half-cell','Alege Cupru pentru semipila din dreapta'), st('rule:cell','Connect the voltmeter','Conectează voltmetrul')]),
  MS('rule:cocl2_heat', L('Pink to blue','Din roz în albastru'), L('Heat cobalt chloride crystals and watch them change colour.','Încălzește cristalele de clorură de cobalt și privește cum își schimbă culoarea.'),
    [st('add:cocl2','Add Cobalt chloride','Adaugă Clorură de cobalt'), st('heat:on','Light the burner','Aprinde arzătorul'), st('rule:cocl2_heat','Wait for it to get hot','Așteaptă să se încălzească')]),
  MS('rule:coldpack', L('Instant cold pack','Punga rece instant'), L('Make water go cold without ice.','Răcește apa fără gheață.'),
    [st('add:water','Add Water','Adaugă Apă'), st('add:nh4no3','Add Cold pack crystals','Adaugă Cristale pentru pungă rece'), st('rule:coldpack','Check the thermometer','Verifică termometrul')]),
  MS('rule:hotpack', L('Instant hand warmer','Încălzitorul instant'), L('Make water heat itself up.','Fă apa să se încălzească singură.'),
    [st('add:water','Add Water','Adaugă Apă'), st('add:cacl2s','Add Calcium chloride','Adaugă Clorură de calciu'), st('rule:hotpack','Check the thermometer','Verifică termometrul')]),
  MS('rule:cu_amm', L('Royal blue','Albastru regal'), L('Make a deep blue copper–ammonia complex.','Fă un complex cupru–amoniac albastru-închis.'),
    [st('add:water','Add Water','Adaugă Apă'), st('add:cuso4','Add Copper sulfate','Adaugă Sulfat de cupru'), st('add:ammonia','Add Ammonia solution','Adaugă Soluție de amoniac'), st('rule:cu_amm','Watch the colour deepen','Privește cum se închide culoarea')]),
  MS('rule:iodine_starch', L('Starch detector','Detectorul de amidon'), L('Find starch with iodine.','Găsește amidonul cu iod.'),
    [st('add:starch','Pour in Starch water','Toarnă Apă cu amidon'), st('add:iodine','Add Iodine tincture','Adaugă Tinctură de iod'), st('rule:iodine_starch','Look for blue-black','Caută albastru-negru')]),
  MS('rule:milk_curd', L('Curds and whey','Cheag și zer'), L('Turn milk lumpy with an acid.','Fă laptele cocoloșit cu un acid.'),
    [st('add:milk','Pour in Milk','Toarnă Lapte'), st('add:vinegar|add:lemon','Add Vinegar or Lemon juice','Adaugă Oțet sau Suc de lămâie'), st('rule:milk_curd','Look for lumps','Caută cocoloașe')]),
  MS('rule:cu_ag', L('Silver tree','Bradul de argint'), L('Grow silver crystals on a copper wire.','Crește cristale de argint pe o sârmă de cupru.'),
    [st('add:agno3','Pour in Silver nitrate','Toarnă Azotat de argint'), st('add:cu','Add Copper wire','Adaugă Sârmă de cupru'), st('rule:cu_ag','Watch the crystals grow','Privește cum cresc cristalele')]),
  MS('test:h2', L('Test for hydrogen','Testul pentru hidrogen'), L('Make hydrogen and test it with a lit splint.','Fă hidrogen și testează-l cu o așchie aprinsă.'),
    [st('add:hcl','Pour in Hydrochloric acid','Toarnă Acid clorhidric'), st('add:zn|add:mg','Add Zinc or Magnesium','Adaugă Zinc sau Magneziu'), st('rule:zn_acid|rule:mg_acid','Collect the gas','Colectează gazul'), st('test:h2','Tap “Test the gas: H₂”','Atinge „Testează gazul: H₂”')]),
  MS('test:o2', L('Test for oxygen','Testul pentru oxigen'), L('Make oxygen and relight a glowing splint.','Fă oxigen și reaprinde o așchie care mocnește.'),
    [st('add:h2o2','Pour in Hydrogen peroxide','Toarnă Apă oxigenată'), st('add:mno2','Add Manganese(IV) oxide','Adaugă Dioxid de mangan'), st('rule:mno2','Collect the gas','Colectează gazul'), st('test:o2','Tap “Test the gas: O₂”','Atinge „Testează gazul: O₂”')]),
  MS('test:co2', L('Test for carbon dioxide','Testul pentru dioxid de carbon'), L('Make carbon dioxide and bubble it through limewater.','Fă dioxid de carbon și barbotează-l prin apă de var.'),
    [st('add:vinegar','Pour in Vinegar','Toarnă Oțet'), st('add:soda','Add Baking soda','Adaugă Bicarbonat'), st('rule:acid_carb','Collect the gas','Colectează gazul'), st('test:co2','Tap “Test the gas: CO₂”','Atinge „Testează gazul: CO₂”')]),
);

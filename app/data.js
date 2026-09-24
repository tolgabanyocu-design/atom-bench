// ===================== substances =====================
// st: l liquid (has volume) | s solid/powder | m object (metal, nail, chalk) | d dissolved | p precipitate
// cat: shelf safety: home | adult | lab ; ph: contribution to pH (7 + sum) ; aq: counts as water ; volatile: boils away
const SPECIES = {
  water:{n:{en:'Water',ro:'Apă'}, art:{en:'the water',ro:'apa'}, f:'H₂O', st:'l', c:'#b9dcf7', a:.3, aq:1, vol:1, volatile:1, shelf:1, cat:'home', icon:'bottle',
    desc:{en:'The most important liquid on Earth. Each molecule is two hydrogen atoms and one oxygen atom.', ro:'Cel mai important lichid de pe Pământ. Fiecare moleculă are doi atomi de hidrogen și un atom de oxigen.'}},
  salt:{n:{en:'Table salt',ro:'Sare de bucătărie'}, art:{en:'the salt',ro:'sarea'}, f:'NaCl', st:'s', c:'#f4f4f0', shelf:1, cat:'home', icon:'jar',
    desc:{en:'White, cube-shaped crystals made of sodium and chlorine.', ro:'Cristale albe, în formă de cub, formate din sodiu și clor.'}},
  sugar:{n:{en:'Sugar',ro:'Zahăr'}, art:{en:'the sugar',ro:'zahărul'}, f:'C₁₂H₂₂O₁₁', st:'s', c:'#fbfaf3', shelf:1, cat:'home', icon:'jar',
    desc:{en:'Sweet crystals that plants make from sunlight, water and air.', ro:'Cristale dulci pe care plantele le fac din lumină, apă și aer.'}},
  sand:{n:{en:'Sand',ro:'Nisip'}, art:{en:'the sand',ro:'nisipul'}, f:'SiO₂', st:'s', c:'#d8bd88', shelf:1, cat:'home', icon:'jar',
    desc:{en:'Tiny grains of rock, mostly silicon dioxide.', ro:'Grăunțe mici de rocă, mai ales dioxid de siliciu.'}},
  oil:{n:{en:'Cooking oil',ro:'Ulei de gătit'}, art:{en:'the oil',ro:'uleiul'}, f:'C₅₇H₁₀₄O₆', st:'l', c:'#f0c43f', a:.75, vol:1, shelf:1, cat:'home', icon:'bottle',
    desc:{en:'A fat squeezed from plants like sunflowers. It is lighter than water.', ro:'O grăsime stoarsă din plante precum floarea-soarelui. Este mai ușoară decât apa.'}},
  vinegar:{n:{en:'Vinegar',ro:'Oțet'}, art:{en:'the vinegar',ro:'oțetul'}, f:'CH₃COOH', st:'l', c:'#fff3d2', a:.2, ph:-4, aq:1, vol:1, volatile:1, acid:1, shelf:1, cat:'home', icon:'bottle',
    desc:{en:'A sour liquid. It tastes sour because it contains acetic acid.', ro:'Un lichid acru. Are gust acru pentru că conține acid acetic.'}},
  lemon:{n:{en:'Lemon juice',ro:'Suc de lămâie'}, art:{en:'the lemon juice',ro:'sucul de lămâie'}, f:'C₆H₈O₇', st:'l', c:'#f5e986', a:.4, ph:-4.5, aq:1, vol:1, volatile:1, acid:1, shelf:1, cat:'home', icon:'bottle',
    desc:{en:'Sour because of citric acid.', ro:'Este acru din cauza acidului citric.'}},
  soda:{n:{en:'Baking soda',ro:'Bicarbonat de sodiu'}, art:{en:'the baking soda',ro:'bicarbonatul'}, f:'NaHCO₃', st:'s', c:'#ffffff', ph:1.5, base:1, shelf:1, cat:'home', icon:'jar',
    desc:{en:'A white powder used in baking. It is a mild base.', ro:'O pulbere albă folosită la copt. Este o bază slabă.'}},
  soap:{n:{en:'Dish soap',ro:'Detergent de vase'}, art:{en:'the dish soap',ro:'detergentul'}, f:'', st:'l', c:'#7fcf8c', a:.35, ph:2.5, aq:1, vol:1, volatile:1, base:1, shelf:1, cat:'home', icon:'bottle',
    desc:{en:'Washing-up liquid. Its molecules like both water and grease.', ro:'Detergent de vase. Moleculelor lui le plac și apa, și grăsimea.'}},
  cabbage:{n:{en:'Red cabbage juice',ro:'Suc de varză roșie'}, art:{en:'the cabbage juice',ro:'sucul de varză'}, f:'', st:'l', c:'#6b3fa0', a:.8, aq:1, vol:1, volatile:1, shelf:1, cat:'home', icon:'bottle',
    desc:{en:'Purple juice from red cabbage. It changes colour with acids and bases.', ro:'Suc mov din varză roșie. Își schimbă culoarea cu acizii și bazele.'}},
  chalk:{n:{en:'Chalk',ro:'Cretă'}, art:{en:'the chalk',ro:'creta'}, f:'CaCO₃', st:'m', c:'#f2f0e8', shelf:1, cat:'home', icon:'chalk',
    desc:{en:'Calcium carbonate, the same stuff as seashells and limestone.', ro:'Carbonat de calciu, aceeași substanță ca în scoici și calcar.'}},
  fe:{n:{en:'Iron nail',ro:'Cui de fier'}, art:{en:'the iron nail',ro:'cuiul de fier'}, f:'Fe', st:'m', c:'#8a9097', shelf:1, cat:'home', icon:'nail',
    desc:{en:'An ordinary iron nail.', ro:'Un cui obișnuit de fier.'}},
  yeast:{n:{en:'Yeast',ro:'Drojdie'}, art:{en:'the yeast',ro:'drojdia'}, f:'', st:'s', c:'#c9a36b', shelf:1, cat:'home', icon:'jar',
    desc:{en:'Tiny living fungi used to make bread rise.', ro:'Ciuperci microscopice, vii, folosite la creșterea pâinii.'}},
  h2o2:{n:{en:'Hydrogen peroxide',ro:'Apă oxigenată'}, art:{en:'the hydrogen peroxide',ro:'apa oxigenată'}, f:'H₂O₂', st:'l', c:'#f2faff', a:.12, ph:-.5, aq:1, vol:1, volatile:1, shelf:1, cat:'adult', icon:'brown',
    desc:{en:'A 3% solution used to clean cuts. It slowly breaks down into water and oxygen.', ro:'O soluție de 3% folosită la dezinfectarea rănilor. Se descompune încet în apă și oxigen.'}},
  mg:{n:{en:'Magnesium ribbon',ro:'Panglică de magneziu'}, art:{en:'the magnesium',ro:'magneziul'}, f:'Mg', st:'m', c:'#b7bcc2', shelf:1, cat:'adult', icon:'ribbon',
    desc:{en:'A light, silvery metal ribbon that burns very brightly.', ro:'O panglică dintr-un metal ușor, argintiu, care arde foarte strălucitor.'}},
  hcl:{n:{en:'Hydrochloric acid',ro:'Acid clorhidric'}, art:{en:'the hydrochloric acid',ro:'acidul clorhidric'}, f:'HCl', st:'l', c:'#eef7ff', a:.15, ph:-6, aq:1, vol:1, volatile:1, acid:1, shelf:1, cat:'lab', icon:'bottle',
    desc:{en:'A strong acid. It burns skin, so chemists handle it with great care.', ro:'Un acid tare. Arde pielea, așa că chimiștii îl manevrează cu mare grijă.'}},
  naoh:{n:{en:'Sodium hydroxide',ro:'Hidroxid de sodiu'}, art:{en:'the sodium hydroxide',ro:'hidroxidul de sodiu'}, f:'NaOH', st:'l', c:'#eef3ff', a:.15, ph:6, aq:1, vol:1, base:1, shelf:1, cat:'lab', icon:'bottle',
    desc:{en:'A strong base, also called caustic soda. It is used to make soap.', ro:'O bază tare, numită și sodă caustică. Se folosește la fabricarea săpunului.'}},
  cuso4:{n:{en:'Copper sulfate',ro:'Sulfat de cupru'}, art:{en:'the copper sulfate',ro:'sulfatul de cupru'}, f:'CuSO₄·5H₂O', st:'s', c:'#1f7fd6', shelf:1, cat:'lab', icon:'jar',
    desc:{en:'Bright blue crystals that contain copper.', ro:'Cristale albastre strălucitoare care conțin cupru.'}},
  agno3:{n:{en:'Silver nitrate',ro:'Azotat de argint'}, art:{en:'the silver nitrate',ro:'azotatul de argint'}, f:'AgNO₃', st:'l', c:'#f5f6fa', a:.12, aq:1, vol:1, shelf:1, cat:'lab', icon:'brown',
    desc:{en:'A clear solution that contains silver. It stains skin black.', ro:'O soluție limpede care conține argint. Pătează pielea în negru.'}},
  na:{n:{en:'Sodium',ro:'Sodiu'}, art:{en:'the sodium',ro:'sodiul'}, f:'Na', st:'m', c:'#c9ced6', shelf:1, cat:'lab', icon:'chunk',
    desc:{en:'A soft, silvery metal that reacts strongly with water. It is kept under oil.', ro:'Un metal moale, argintiu, care reacționează puternic cu apa. Se păstrează sub ulei.'}},
  k:{n:{en:'Potassium',ro:'Potasiu'}, art:{en:'the potassium',ro:'potasiul'}, f:'K', st:'m', c:'#c4c7da', shelf:1, cat:'lab', icon:'chunk',
    desc:{en:'Like sodium, but even more reactive.', ro:'Ca sodiul, dar și mai reactiv.'}},

  // ---- products (not on the shelf) ----
  koh:{n:{en:'potassium hydroxide',ro:'hidroxid de potasiu'}, f:'KOH', st:'d', ph:6, base:1},
  saltaq:{n:{en:'salt (dissolved)',ro:'sare (dizolvată)'}, f:'Na⁺ + Cl⁻', st:'d', res:'salt'},
  sugaraq:{n:{en:'sugar (dissolved)',ro:'zahăr (dizolvat)'}, f:'C₁₂H₂₂O₁₁(aq)', st:'d', res:'sugar'},
  cuso4aq:{n:{en:'copper sulfate (dissolved)',ro:'sulfat de cupru (dizolvat)'}, f:'Cu²⁺ + SO₄²⁻', st:'d', c:'#1b7fe3', a:.72, res:'cuso4'},
  cuso4w:{n:{en:'white copper sulfate',ro:'sulfat de cupru alb'}, f:'CuSO₄', st:'s', c:'#ecebe5'},
  sodaaq:{n:{en:'baking soda (dissolved)',ro:'bicarbonat (dizolvat)'}, f:'Na⁺ + HCO₃⁻', st:'d', ph:1.5, base:1, res:'soda'},
  naac:{n:{en:'sodium acetate',ro:'acetat de sodiu'}, f:'CH₃COONa', st:'d', ph:1},
  nacit:{n:{en:'sodium citrate',ro:'citrat de sodiu'}, f:'Na₃C₆H₅O₇', st:'d', ph:.5},
  caac:{n:{en:'calcium acetate',ro:'acetat de calciu'}, f:'Ca(CH₃COO)₂', st:'d'},
  cacit:{n:{en:'calcium citrate',ro:'citrat de calciu'}, f:'Ca₃(C₆H₅O₇)₂', st:'d'},
  cacl2:{n:{en:'calcium chloride',ro:'clorură de calciu'}, f:'CaCl₂', st:'d'},
  kcl:{n:{en:'potassium chloride',ro:'clorură de potasiu'}, f:'KCl', st:'d'},
  kac:{n:{en:'potassium acetate',ro:'acetat de potasiu'}, f:'CH₃COOK', st:'d', ph:1},
  kcit:{n:{en:'potassium citrate',ro:'citrat de potasiu'}, f:'K₃C₆H₅O₇', st:'d', ph:.5},
  mgcl2:{n:{en:'magnesium chloride',ro:'clorură de magneziu'}, f:'MgCl₂', st:'d'},
  mgac:{n:{en:'magnesium acetate',ro:'acetat de magneziu'}, f:'Mg(CH₃COO)₂', st:'d'},
  mgcit:{n:{en:'magnesium citrate',ro:'citrat de magneziu'}, f:'Mg₃(C₆H₅O₇)₂', st:'d'},
  feso4:{n:{en:'iron sulfate',ro:'sulfat de fier'}, f:'FeSO₄', st:'d', c:'#aee0a4', a:.42},
  fe_cu:{n:{en:'copper (on the nail)',ro:'cupru (pe cui)'}, f:'Cu', st:'m', c:'#b8643a'},
  cuoh2:{n:{en:'copper hydroxide',ro:'hidroxid de cupru'}, f:'Cu(OH)₂', st:'p', c:'#78c1f0'},
  na2so4:{n:{en:'sodium sulfate',ro:'sulfat de sodiu'}, f:'Na₂SO₄', st:'d'},
  k2so4:{n:{en:'potassium sulfate',ro:'sulfat de potasiu'}, f:'K₂SO₄', st:'d'},
  agcl:{n:{en:'silver chloride',ro:'clorură de argint'}, f:'AgCl', st:'p', c:'#f8f8f6'},
  nano3:{n:{en:'sodium nitrate',ro:'azotat de sodiu'}, f:'NaNO₃', st:'d'},
  hno3:{n:{en:'nitric acid',ro:'acid azotic'}, f:'HNO₃', st:'d', ph:-6, acid:1, volatile:1},
  cano3:{n:{en:'calcium nitrate',ro:'azotat de calciu'}, f:'Ca(NO₃)₂', st:'d'},
  mgno3:{n:{en:'magnesium nitrate',ro:'azotat de magneziu'}, f:'Mg(NO₃)₂', st:'d'},
  kno3:{n:{en:'potassium nitrate',ro:'azotat de potasiu'}, f:'KNO₃', st:'d'},
  mgo:{n:{en:'magnesium oxide',ro:'oxid de magneziu'}, f:'MgO', st:'s', c:'#f6f6f3'},
  caramel:{n:{en:'caramel',ro:'caramel'}, f:'', st:'s', c:'#a3561b'},
  carbon:{n:{en:'carbon',ro:'carbon'}, f:'C', st:'s', c:'#1e1b19'},
  na2co3:{n:{en:'washing soda',ro:'sodă de rufe'}, f:'Na₂CO₃', st:'s', c:'#fbfbf7', ph:4, base:1},
  emul:{n:{en:'emulsion',ro:'emulsie'}, f:'', st:'d', c:'#f1e4b8', a:.85, res:'oil'},
  // gases & word-equation only
  h2:{n:{en:'hydrogen gas',ro:'hidrogen gazos'}, f:'H₂', st:'g'},
  o2:{n:{en:'oxygen gas',ro:'oxigen gazos'}, f:'O₂', st:'g'},
  o2air:{n:{en:'oxygen from the air',ro:'oxigen din aer'}, f:'O₂', st:'g'},
  co2:{n:{en:'carbon dioxide',ro:'dioxid de carbon'}, f:'CO₂', st:'g'},
  steam:{n:{en:'water vapour',ro:'vapori de apă'}, f:'H₂O(g)', st:'g'},
};
for(const id in SPECIES) SPECIES[id].id = id;
const SHELF = Object.keys(SPECIES).filter(k => SPECIES[k].shelf);
function nm(id){ return tr(SPECIES[id].n); }

// ===================== reactions =====================
const L = (en, ro) => ({en, ro});
const RULES = [];
const RULE_INFO = {}; // id -> {title} for discoveries list
function addRule(r){ r.key = r.key || r.id; RULES.push(r); if(!RULE_INFO[r.id]) RULE_INFO[r.id] = r; return r; }

// ---- group 1 metals + water
addRule({id:'na_water', needs:['na','@water'], consume:[0], produce:['naoh'], wp:['h2'], kind:'chem', energy:'exo', safety:'lab', temp:18,
  signs:['gas','heat','light'], eq:'2Na + 2H₂O → 2NaOH + H₂↑',
  fx:[{t:'skate', color:'#d3d8df', flame:'#ffae3b', dur:4.2, pop:1}],
  zoom:{from:['Na','Na','H2O','H2O'], to:['NaOH','NaOH','H2']},
  title:L('Sodium dances on water!','Sodiul dansează pe apă!'),
  b:L('The shiny sodium zoomed around, fizzed and even made a little fire! Sodium is a metal that really, really wants to react with water. It made a new, invisible gas called hydrogen, and the water turned slippery like soap.',
      'Sodiul lucios a alergat pe apă, a sfârâit și a făcut chiar un mic foc! Sodiul este un metal care vrea foarte, foarte tare să reacționeze cu apa. A făcut un gaz nou, invizibil, numit hidrogen, iar apa a devenit alunecoasă ca săpunul.'),
  e:L('Sodium atoms have one lonely outer electron that they give away very easily. Water takes it, and the reaction makes hydrogen gas and sodium hydroxide, a strong base. It gives off so much heat that the hydrogen catches fire with an orange flame. Sodium is lighter than water, so it floats.',
      'Atomii de sodiu au un singur electron exterior, pe care îl cedează foarte ușor. Apa îl preia, iar reacția produce hidrogen gazos și hidroxid de sodiu, o bază puternică. Se degajă atâta căldură încât hidrogenul ia foc cu o flacără portocalie. Sodiul este mai ușor decât apa, așa că plutește.'),
  s:L('An exothermic redox reaction: sodium is oxidised (Na → Na⁺ + e⁻) and water is reduced to H₂ and OH⁻. The heat melts the sodium into a ball and ignites the hydrogen; the orange colour comes from excited sodium atoms emitting light at 589 nm. The solution is now strongly alkaline (pH ≈ 13).',
      'O reacție redox exotermă: sodiul se oxidează (Na → Na⁺ + e⁻), iar apa se reduce la H₂ și OH⁻. Căldura topește sodiul într-o bilă și aprinde hidrogenul; culoarea portocalie vine de la atomii de sodiu excitați, care emit lumină la 589 nm. Soluția devine puternic bazică (pH ≈ 13).'),
  fact:L('In real labs sodium is stored under oil, because even the moisture in the air makes it react.','În laboratoare, sodiul se păstrează sub ulei, pentru că reacționează chiar și cu umezeala din aer.')});

addRule({id:'k_water', needs:['k','@water'], consume:[0], produce:['koh'], wp:['h2'], kind:'chem', energy:'exo', safety:'lab', temp:25,
  signs:['gas','heat','light'], eq:'2K + 2H₂O → 2KOH + H₂↑',
  fx:[{t:'skate', color:'#d0d2e3', flame:'#c77dff', dur:2.8, pop:2}],
  zoom:{from:['K','K','H2O','H2O'], to:['KOH','KOH','H2']},
  title:L('Potassium goes purple and POP!','Potasiul face flacără mov și POC!'),
  b:L('Potassium is sodium’s wilder cousin. It raced across the water, burst into a purple-pink flame and went POP! It made hydrogen gas too.',
      'Potasiul este vărul mai zburdalnic al sodiului. A alergat pe apă, a luat foc cu o flacără roz-mov și a făcut POC! Și el a produs hidrogen.'),
  e:L('Potassium sits right below sodium in the periodic table. Its outer electron is even further from the nucleus, so it is given away even more easily. That makes the reaction faster and hotter. The lilac flame is the colour of glowing potassium.',
      'Potasiul se află chiar sub sodiu în tabelul periodic. Electronul lui exterior este și mai departe de nucleu, deci este cedat și mai ușor. De aceea reacția este mai rapidă și mai fierbinte. Flacăra liliachie este culoarea potasiului incandescent.'),
  s:L('Reactivity of group 1 metals increases down the group as the atomic radius grows and the first ionisation energy falls (K: 419 kJ/mol, Na: 496 kJ/mol). 2K + 2H₂O → 2KOH + H₂ releases enough heat to ignite the H₂ almost instantly; the lilac emission lines are near 766 nm and 404 nm.',
      'Reactivitatea metalelor din grupa 1 crește în jos în grupă, pe măsură ce raza atomică crește și prima energie de ionizare scade (K: 419 kJ/mol, Na: 496 kJ/mol). Reacția 2K + 2H₂O → 2KOH + H₂ degajă suficientă căldură ca să aprindă H₂ aproape instantaneu; liniile de emisie liliachii sunt în jur de 766 nm și 404 nm.'),
  fact:L('Fireworks get their colours from metals: sodium gives yellow-orange, potassium lilac, copper blue-green and strontium red.','Artificiile își iau culorile de la metale: sodiul dă galben-portocaliu, potasiul liliachiu, cuprul albastru-verde, iar stronțiul roșu.')});

// ---- silver nitrate + chlorides (precipitate)
const CHLORIDES = {
  salt:{from:L('the salt','sare'), prod:'nano3', eq:'AgNO₃ + NaCl → AgCl↓ + NaNO₃'},
  saltaq:{from:L('the salt water','apa sărată'), prod:'nano3', eq:'AgNO₃ + NaCl → AgCl↓ + NaNO₃'},
  hcl:{from:L('the hydrochloric acid','acidul clorhidric'), prod:'hno3', eq:'AgNO₃ + HCl → AgCl↓ + HNO₃'},
  cacl2:{from:L('the calcium chloride','clorura de calciu'), prod:'cano3', eq:'2AgNO₃ + CaCl₂ → 2AgCl↓ + Ca(NO₃)₂'},
  mgcl2:{from:L('the magnesium chloride','clorura de magneziu'), prod:'mgno3', eq:'2AgNO₃ + MgCl₂ → 2AgCl↓ + Mg(NO₃)₂'},
  kcl:{from:L('the potassium chloride','clorura de potasiu'), prod:'kno3', eq:'AgNO₃ + KCl → AgCl↓ + KNO₃'},
};
for(const c in CHLORIDES){ const C = CHLORIDES[c];
  addRule({id:'agno3_cl', key:'agno3_cl:'+c, needs:['agno3', c], consume:[0,1], produce:['agcl', C.prod], kind:'chem', safety:'lab',
    signs:['solid','color'], eq:C.eq, vars:()=>({chl:tr(C.from)}), fx:[{t:'swirl', dur:2}],
    zoom:{from:['Ag+','NO3-','Na+','Cl-'], to:['AgCl','Na+','NO3-']},
    title:L('Make a white cloud','Fă un nor alb'),
    b:L('Two clear liquids made a milky white cloud! A new solid appeared out of nowhere. It is called silver chloride, and it slowly sinks to the bottom.',
        'Două lichide limpezi au făcut un nor alb ca laptele! Un solid nou a apărut ca din senin. Se numește clorură de argint și se lasă încet la fund.'),
    e:L('The silver ions (Ag⁺) found the chloride ions (Cl⁻) that came from {chl}. Silver chloride cannot dissolve in water, so it forms tiny white specks that make the liquid cloudy and then sink. A solid made from two solutions is called a precipitate. Chemists use this as a test for chloride.',
        'Ionii de argint (Ag⁺) au găsit ionii de clorură (Cl⁻) care veneau din {chl}. Clorura de argint nu se poate dizolva în apă, așa că formează particule albe minuscule, care tulbură lichidul și apoi se depun. Un solid format din două soluții se numește precipitat. Chimiștii folosesc asta ca test pentru clorură.'),
    s:L('Precipitation: Ag⁺(aq) + Cl⁻(aq) → AgCl(s), Ksp ≈ 1.8 × 10⁻¹⁰. This is the standard qualitative test for halides: chloride gives a white precipitate, bromide cream and iodide yellow. In light, AgCl slowly turns grey-violet as it decomposes to silver, the chemistry behind old photographic film.',
        'Precipitare: Ag⁺(aq) + Cl⁻(aq) → AgCl(s), Ks ≈ 1,8 × 10⁻¹⁰. Este testul calitativ standard pentru halogenuri: clorura dă un precipitat alb, bromura crem, iar iodura galben. La lumină, AgCl devine încet cenușiu-violet, descompunându-se în argint — chimia din spatele filmelor foto vechi.'),
    fact:L('Silver nitrate stains skin black for days. That’s why chemists wear gloves!','Azotatul de argint pătează pielea în negru pentru câteva zile. De aceea chimiștii poartă mănuși!')});
}

// ---- copper sulfate + strong base (precipitate)
for(const bse of ['naoh','koh']){
  addRule({id:'cuso4_base', key:'cuso4_base:'+bse, needs:['cuso4aq', bse], consume:[0,1], produce:['cuoh2', bse === 'naoh' ? 'na2so4' : 'k2so4'], kind:'chem', safety:'lab',
    signs:['solid','color'], eq: bse === 'naoh' ? 'CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄' : 'CuSO₄ + 2KOH → Cu(OH)₂↓ + K₂SO₄', colorRate:.7,
    fx:[{t:'swirl', dur:2}],
    zoom:{from:['Cu2+','OH-','OH-','Na+','Na+'], to:['CuOH2','Na+','Na+']},
    title:L('A blue jelly cloud','Un nor albastru ca o gelatină'),
    b:L('A pale blue cloud appeared and slowly sank! Two liquids made a new solid. A solid like this is called a precipitate.',
        'A apărut un nor albastru-deschis care s-a lăsat încet la fund! Din două lichide s-a format un solid nou. Un astfel de solid se numește precipitat.'),
    e:L('The copper ions from the copper sulfate met the hydroxide ions from the base. Together they make copper hydroxide, which does not dissolve in water, so it appears as a jelly-like blue solid. A new solid is a clue that a chemical reaction happened.',
        'Ionii de cupru din sulfatul de cupru s-au întâlnit cu ionii hidroxid din bază. Împreună formează hidroxid de cupru, care nu se dizolvă în apă, așa că apare ca un solid albastru, gelatinos. Un solid nou este un indiciu că a avut loc o reacție chimică.'),
    s:L('Precipitation: Cu²⁺(aq) + 2OH⁻(aq) → Cu(OH)₂(s), Ksp ≈ 2 × 10⁻²⁰. The alkali-metal and sulfate ions are spectators. Hydroxide precipitates identify metal ions: Cu²⁺ gives pale blue, Fe²⁺ green and Fe³⁺ orange-brown.',
        'Precipitare: Cu²⁺(aq) + 2OH⁻(aq) → Cu(OH)₂(s), Ks ≈ 2 × 10⁻²⁰. Ionii metalului alcalin și ionii sulfat sunt spectatori. Precipitatele de hidroxid identifică ionii metalici: Cu²⁺ dă albastru-deschis, Fe²⁺ verde, iar Fe³⁺ maro-portocaliu.'),
    fact:L('Water treatment plants use precipitation to pull dissolved metals out of water.','Stațiile de tratare a apei folosesc precipitarea ca să scoată metalele dizolvate din apă.')});
}

// ---- iron nail + copper sulfate (displacement)
addRule({id:'fe_cuso4', needs:['fe','cuso4aq'], consume:[0,1], produce:['fe_cu','feso4'], kind:'chem', safety:'lab', colorRate:.22,
  signs:['color','solid'], eq:'Fe + CuSO₄ → FeSO₄ + Cu',
  zoom:{from:['Fe','Cu2+','SO4'], to:['Fe2+','Cu','SO4']},
  title:L('The copper-plated nail','Cuiul acoperit cu cupru'),
  b:L('The grey nail slowly turned reddish-brown and the blue colour faded to green! The iron swapped places with the copper: now copper sits on the nail and iron is in the water.',
      'Cuiul gri a devenit încet maro-roșcat, iar albastrul s-a transformat în verde! Fierul a făcut schimb de locuri cu cuprul: acum cuprul stă pe cui, iar fierul e în apă.'),
  e:L('This is a displacement reaction. Iron is more reactive than copper, so it pushes the copper out of the copper sulfate. Iron atoms go into the water as iron ions (pale green) and copper atoms land on the nail as a reddish-brown layer.',
      'Aceasta este o reacție de substituție. Fierul este mai reactiv decât cuprul, așa că îl scoate pe cupru din sulfatul de cupru. Atomii de fier intră în apă ca ioni de fier (verde pal), iar atomii de cupru se depun pe cui ca un strat maro-roșcat.'),
  s:L('Single displacement (redox): Fe(s) + Cu²⁺(aq) → Fe²⁺(aq) + Cu(s). Iron is oxidised and Cu²⁺ is reduced; E°cell = 0.34 − (−0.44) = +0.78 V, so the reaction is spontaneous. The blue [Cu(H₂O)₆]²⁺ is replaced by pale green [Fe(H₂O)₆]²⁺.',
      'Substituție simplă (redox): Fe(s) + Cu²⁺(aq) → Fe²⁺(aq) + Cu(s). Fierul se oxidează, iar Cu²⁺ se reduce; E°pilă = 0,34 − (−0,44) = +0,78 V, deci reacția este spontană. [Cu(H₂O)₆]²⁺ albastru este înlocuit de [Fe(H₂O)₆]²⁺ verde pal.'),
  fact:L('The reactivity series ranks metals like a tug of war: a more reactive metal always wins the other metal’s partner.','Seria reactivității clasifică metalele ca la trasul frânghiei: metalul mai reactiv câștigă mereu partenerul celuilalt metal.')});

// ---- hydrogen peroxide + yeast
const H2O2_S = L('Catalytic decomposition: 2H₂O₂(aq) → 2H₂O(l) + O₂(g), ΔH ≈ −98 kJ per mole of H₂O₂. The enzyme catalase lowers the activation energy from about 75 kJ/mol to under 10 kJ/mol and can process millions of molecules per second.',
  'Descompunere catalitică: 2H₂O₂(aq) → 2H₂O(l) + O₂(g), ΔH ≈ −98 kJ pe mol de H₂O₂. Enzima catalază scade energia de activare de la aproximativ 75 kJ/mol la sub 10 kJ/mol și poate transforma milioane de molecule pe secundă.');
const H2O2_E = L('Hydrogen peroxide (H₂O₂) is like water with an extra oxygen atom. On its own it breaks down very slowly. Yeast contains an enzyme called catalase that speeds this up enormously. The yeast is a catalyst: it helps the reaction but is not used up. The reaction gives off heat, so the foam feels warm.',
  'Apa oxigenată (H₂O₂) este ca apa, dar cu un atom de oxigen în plus. Singură, se descompune foarte încet. Drojdia conține o enzimă numită catalază, care grăbește enorm acest proces. Drojdia este un catalizator: ajută reacția, dar nu se consumă. Reacția degajă căldură, de aceea spuma e caldă.');
addRule({id:'h2o2_yeast', key:'h2o2_yeast:soap', needs:['h2o2','yeast','soap'], consume:[0], produce:['water'], wp:['o2'], kind:'chem', energy:'exo', safety:'adult', temp:14,
  signs:['gas','heat'], eq:'2H₂O₂ → 2H₂O + O₂↑  (catalyst: catalase)',
  fx:[{t:'foam', h:3.1, color:'#fffdf6', rise:2.2, dur:9}, {t:'bubbles', rate:40, dur:3}, {t:'steam', dur:4, rate:3}],
  zoom:{from:['H2O2','H2O2','catalase'], to:['H2O','H2O','O2','catalase']},
  title:L('Elephant toothpaste!','Pastă de dinți pentru elefanți!'),
  b:L('A giant tower of foam shot out of the beaker! The yeast helped the hydrogen peroxide break apart very fast into water and oxygen gas, and the soap trapped the oxygen in millions of bubbles.',
      'Un turn uriaș de spumă a țâșnit din pahar! Drojdia a ajutat apa oxigenată să se descompună foarte repede în apă și oxigen, iar detergentul a prins oxigenul în milioane de bule.'),
  e:H2O2_E,
  s:L(H2O2_S.en + ' The surfactant traps the O₂ as a foam whose volume is hundreds of times that of the liquid.', H2O2_S.ro + ' Surfactantul prinde O₂ într-o spumă al cărei volum este de sute de ori mai mare decât al lichidului.'),
  fact:L('Your liver is full of catalase. It protects your cells by breaking down hydrogen peroxide.','Ficatul tău este plin de catalază. Ea îți protejează celulele descompunând apa oxigenată.')});
addRule({id:'h2o2_yeast', key:'h2o2_yeast:plain', needs:['h2o2','yeast'], unless:['soap'], consume:[0], produce:['water'], wp:['o2'], kind:'chem', energy:'exo', safety:'adult', temp:10,
  signs:['gas','heat'], eq:'2H₂O₂ → 2H₂O + O₂↑  (catalyst: catalase)',
  fx:[{t:'bubbles', rate:32, dur:6}, {t:'foam', h:.35, color:'#ffffff', rise:1, dur:6}],
  zoom:{from:['H2O2','H2O2','catalase'], to:['H2O','H2O','O2','catalase']},
  title:L('Oxygen bubbles','Bule de oxigen'),
  b:L('Lots of bubbles, and the beaker got warm! The yeast helped the hydrogen peroxide break apart into water and oxygen gas. Tip: next time add dish soap before the yeast for a big surprise!',
      'Multe bule, iar paharul s-a încălzit! Drojdia a ajutat apa oxigenată să se descompună în apă și oxigen. Sfat: data viitoare pune detergent înainte de drojdie, pentru o surpriză mare!'),
  e:H2O2_E, s:H2O2_S,
  fact:L('Your liver is full of catalase. It protects your cells by breaking down hydrogen peroxide.','Ficatul tău este plin de catalază. Ea îți protejează celulele descompunând apa oxigenată.')});

// ---- acids + carbonates
const ACIDS = {
  vinegar:{w:L('the vinegar','oțetul'), strong:false,
    soda:{eq:'CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑', prod:['naac','water'], foam:1.75, zf:['CH3COOH','NaHCO3'], zt:['CH3COONa','H2O','CO2']},
    chalk:{eq:'2CH₃COOH + CaCO₃ → Ca(CH₃COO)₂ + H₂O + CO₂↑', prod:['caac','water'], rate:6, zf:['CaCO3','H+','H+'], zt:['Ca2+','H2O','CO2']}},
  lemon:{w:L('the lemon juice','sucul de lămâie'), strong:false,
    soda:{eq:'C₆H₈O₇ + 3NaHCO₃ → Na₃C₆H₅O₇ + 3H₂O + 3CO₂↑', prod:['nacit','water'], foam:1.2, zf:['H+','NaHCO3'], zt:['Na+','H2O','CO2']},
    chalk:{eq:'2C₆H₈O₇ + 3CaCO₃ → Ca₃(C₆H₅O₇)₂ + 3H₂O + 3CO₂↑', prod:['cacit','water'], rate:5, zf:['CaCO3','H+','H+'], zt:['Ca2+','H2O','CO2']}},
  hcl:{w:L('the hydrochloric acid','acidul clorhidric'), strong:true,
    soda:{eq:'HCl + NaHCO₃ → NaCl + H₂O + CO₂↑', prod:['saltaq','water'], foam:1.9, zf:['HCl','NaHCO3'], zt:['Na+','Cl-','H2O','CO2']},
    chalk:{eq:'2HCl + CaCO₃ → CaCl₂ + H₂O + CO₂↑', prod:['cacl2','water'], rate:22, zf:['CaCO3','HCl','HCl'], zt:['Ca2+','Cl-','Cl-','H2O','CO2']}},
};
const AC_S = L('Acid–carbonate reaction: H⁺ ions from the acid protonate the carbonate or hydrogencarbonate, forming carbonic acid (H₂CO₃), which immediately decomposes into H₂O and CO₂(g). ',
  'Reacție acid–carbonat: ionii H⁺ ai acidului protonează carbonatul sau hidrogenocarbonatul și formează acid carbonic (H₂CO₃), care se descompune imediat în H₂O și CO₂(g). ');
const AC_STRONG = L('HCl is a strong acid (fully ionised), so the rate is high.', 'HCl este un acid tare (complet ionizat), deci viteza reacției este mare.');
const AC_WEAK = L('Acetic and citric acid are weak acids (only partly ionised), so fewer H⁺ ions are available and the reaction is gentler.', 'Acidul acetic și acidul citric sunt acizi slabi (ionizați doar parțial), deci sunt disponibili mai puțini ioni H⁺, iar reacția este mai blândă.');
const AC_ENDO = L(' With hydrogencarbonate the reaction is slightly endothermic: the mixture actually cools down a little.', ' Cu hidrogenocarbonatul reacția este ușor endotermă: amestecul chiar se răcește puțin.');
for(const a in ACIDS){ const A = ACIDS[a];
  for(const carb of ['soda','chalk']){ const V = A[carb];
    const s = L(AC_S.en + (A.strong ? AC_STRONG.en : AC_WEAK.en) + (carb === 'soda' ? AC_ENDO.en : ''), AC_S.ro + (A.strong ? AC_STRONG.ro : AC_WEAK.ro) + (carb === 'soda' ? AC_ENDO.ro : ''));
    const vars = () => ({acid:tr(A.w), Acid:cap(tr(A.w))});
    if(carb === 'soda'){
      addRule({id:'acid_carb', key:'acid_carb:'+a+':soda', needs:[a, 'soda|sodaaq'], consume:[0,1], produce:V.prod, wp:['co2'], kind:'chem', energy:'endo', safety: A.strong ? 'lab' : 'home', temp:-3,
        signs:['gas','cold'], eq:V.eq, vars, fx:[{t:'foam', h:V.foam, color:'#ffffff', rise:1.1, dur:5}, {t:'bubbles', rate:45, dur:3.5}],
        zoom:{from:V.zf, to:V.zt},
        title:L('Fizzy volcano!','Vulcan spumos!'),
        b:L('Whoosh! Lots of foam and bubbles! {Acid} and the baking soda reacted and made a gas called carbon dioxide. The gas bubbles pushed the foam up and over the top.',
            'Fâș! Multă spumă și bule! {Acid} și bicarbonatul au reacționat și au făcut un gaz numit dioxid de carbon. Bulele de gaz au împins spuma în sus, peste margine.'),
        e:L('{Acid} is acidic and baking soda is a base. When they meet, the acid breaks the baking soda apart into water, a salt and carbon dioxide gas. A gas takes up much more space than a powder or a liquid, so it bubbles out as foam. New substances were made, so this is a chemical reaction.',
            '{Acid} este acid, iar bicarbonatul de sodiu este o bază. Când se întâlnesc, acidul descompune bicarbonatul în apă, o sare și dioxid de carbon. Un gaz ocupă mult mai mult loc decât o pulbere sau un lichid, așa că iese sub formă de spumă. S-au format substanțe noi, deci aceasta este o reacție chimică.'),
        s, fact:L('Baking powder in cakes uses this same reaction: the CO₂ bubbles make the cake rise.','Praful de copt din prăjituri folosește aceeași reacție: bulele de CO₂ fac aluatul să crească.')});
    } else {
      addRule({id:'acid_carb', key:'acid_carb:'+a+':chalk', needs:[a, 'chalk'], consume:[0,1], produce:V.prod, wp:['co2'], kind:'chem', safety: A.strong ? 'lab' : 'home', temp: A.strong ? 3 : 0,
        signs:['gas'], eq:V.eq, vars, fx:[{t:'objfizz', obj:'chalk', dur: A.strong ? 6 : 11, rate:V.rate}],
        zoom:{from:V.zf, to:V.zt},
        title:L('Chalk fizzes away','Creta sfârâie și dispare'),
        b:L('Bubbles are coming off the chalk and it slowly gets smaller. {Acid} is eating away the chalk and turning part of it into carbon dioxide gas.',
            'Din cretă ies bule, iar ea se micșorează încet. {Acid} „roade” creta și transformă o parte din ea în dioxid de carbon.'),
        e:L('Chalk is calcium carbonate, the same stuff as limestone, marble and seashells. Acids react with carbonates to make carbon dioxide gas, water and a salt. Chalk is a hard solid, so the reaction only happens on its surface and goes slowly.',
            'Creta este carbonat de calciu, aceeași substanță ca în calcar, marmură și scoici. Acizii reacționează cu carbonații și formează dioxid de carbon, apă și o sare. Creta este un solid dur, așa că reacția are loc doar la suprafața ei și merge încet.'),
        s, fact:L('Acid rain slowly dissolves marble statues and limestone buildings in exactly this way.','Ploaia acidă dizolvă încet statuile de marmură și clădirile de calcar exact în acest fel.')});
    }
  }
}

// ---- neutralisation (acid + strong base)
const NEUT = {
  'hcl:naoh':{prod:['saltaq','water'], eq:'HCl + NaOH → NaCl + H₂O', zf:['HCl','NaOH'], zt:['Na+','Cl-','H2O']},
  'hcl:koh':{prod:['kcl','water'], eq:'HCl + KOH → KCl + H₂O', zf:['H+','OH-'], zt:['H2O']},
  'vinegar:naoh':{prod:['naac','water'], eq:'CH₃COOH + NaOH → CH₃COONa + H₂O', zf:['CH3COOH','NaOH'], zt:['CH3COONa','H2O']},
  'vinegar:koh':{prod:['kac','water'], eq:'CH₃COOH + KOH → CH₃COOK + H₂O', zf:['H+','OH-'], zt:['H2O']},
  'lemon:naoh':{prod:['nacit','water'], eq:'C₆H₈O₇ + 3NaOH → Na₃C₆H₅O₇ + 3H₂O', zf:['H+','OH-'], zt:['H2O']},
  'lemon:koh':{prod:['kcit','water'], eq:'C₆H₈O₇ + 3KOH → K₃C₆H₅O₇ + 3H₂O', zf:['H+','OH-'], zt:['H2O']},
};
for(const k in NEUT){ const N = NEUT[k]; const [ac, bs] = k.split(':');
  addRule({id:'neutralize', key:'neutralize:'+k, needs:[ac, bs], consume:[0,1], produce:N.prod, kind:'chem', energy:'exo', safety:'lab', temp:8,
    signs:['heat'], eq:N.eq, fx:[{t:'shimmer'}, {t:'swirl', dur:2.2}],
    vars:(m, c) => ({cab: c && c.cab ? ' ' + t('cabNote') : ''}),
    zoom:{from:N.zf, to:N.zt},
    title:L('Acid meets base: neutral!','Acidul întâlnește baza: neutru!'),
    b:L('The acid and the base cancelled each other out, and the beaker got a little warm. What’s left is mostly salty water!{cab}',
        'Acidul și baza s-au anulat reciproc, iar paharul s-a încălzit puțin. Ce a rămas este în mare parte apă sărată!{cab}'),
    e:L('Acids release H⁺ ions and bases release OH⁻ ions. When they meet, they join up to make water: H⁺ + OH⁻ → H₂O. The other ions that are left make a salt. This is called neutralisation, and it always gives off some heat.{cab}',
        'Acizii eliberează ioni H⁺, iar bazele eliberează ioni OH⁻. Când se întâlnesc, se unesc și formează apă: H⁺ + OH⁻ → H₂O. Ceilalți ioni rămași formează o sare. Aceasta se numește neutralizare și degajă întotdeauna puțină căldură.{cab}'),
    s:L('Neutralisation: H⁺(aq) + OH⁻(aq) → H₂O(l), ΔH ≈ −57 kJ per mole of water for a strong acid and a strong base. The final pH depends on the amounts: equal moles of HCl and NaOH give pH 7, while a weak acid with a strong base gives a slightly alkaline solution, because the anion is a weak base. Chemists find the exact end point by titration with an indicator.',
        'Neutralizare: H⁺(aq) + OH⁻(aq) → H₂O(l), ΔH ≈ −57 kJ pe mol de apă pentru un acid tare și o bază tare. pH-ul final depinde de cantități: numere egale de moli de HCl și NaOH dau pH 7, iar un acid slab cu o bază tare dă o soluție ușor bazică, pentru că anionul este o bază slabă. Chimiștii găsesc punctul exact de echivalență prin titrare, cu un indicator.'),
    fact:L('Antacid tablets work by neutralising extra stomach acid, which is hydrochloric acid!','Pastilele antiacide funcționează neutralizând excesul de acid din stomac, care este chiar acid clorhidric!')});
}
S.cabNote = L('Look: the cabbage juice changed colour to show it.','Uite: sucul de varză și-a schimbat culoarea ca să arate asta.');

// ---- magnesium + acids
const MGA = {
  hcl:{prod:'mgcl2', eq:'Mg + 2HCl → MgCl₂ + H₂↑', rate:26, dur:5, temp:7, zf:['Mg','HCl','HCl'], zt:['Mg2+','Cl-','Cl-','H2']},
  vinegar:{prod:'mgac', eq:'Mg + 2CH₃COOH → Mg(CH₃COO)₂ + H₂↑', rate:8, dur:10, temp:2, zf:['Mg','H+','H+'], zt:['Mg2+','H2']},
  lemon:{prod:'mgcit', eq:'3Mg + 2C₆H₈O₇ → Mg₃(C₆H₅O₇)₂ + 3H₂↑', rate:7, dur:10, temp:2, zf:['Mg','H+','H+'], zt:['Mg2+','H2']},
};
for(const a in MGA){ const M = MGA[a];
  addRule({id:'mg_acid', key:'mg_acid:'+a, needs:['mg', a], consume:[0,1], produce:[M.prod], wp:['h2'], kind:'chem', energy:'exo', safety: a === 'hcl' ? 'lab' : 'adult', temp:M.temp,
    signs:['gas','heat'], eq:M.eq, fx:[{t:'objfizz', obj:'ribbon', dur:M.dur, rate:M.rate}],
    zoom:{from:M.zf, to:M.zt},
    title:L('Magnesium makes hydrogen','Magneziul face hidrogen'),
    b:L('The magnesium ribbon got covered in bubbles and slowly disappeared! The acid pulled the metal apart and made hydrogen gas. The beaker got warm too.',
        'Panglica de magneziu s-a acoperit de bule și a dispărut încet! Acidul a desfăcut metalul și a produs hidrogen. Paharul s-a și încălzit.'),
    e:L('Magnesium is a reactive metal. Acids contain H⁺ ions, and magnesium gives them its electrons. The H⁺ ions become hydrogen gas (H₂) and the magnesium becomes dissolved magnesium ions, forming a salt. Hold a flame to the gas and it burns with a squeaky pop.',
        'Magneziul este un metal reactiv. Acizii conțin ioni H⁺, iar magneziul le cedează electronii săi. Ionii H⁺ devin hidrogen gazos (H₂), iar magneziul devine ioni dizolvați, formând o sare. Dacă apropii o flacără de gaz, arde cu un mic „poc” ascuțit.'),
    s:L('Metal + acid → salt + hydrogen, a redox reaction: Mg(s) + 2H⁺(aq) → Mg²⁺(aq) + H₂(g). Magnesium lies far above hydrogen in the reactivity series (E° Mg²⁺/Mg = −2.37 V). The rate depends on [H⁺], so strong HCl reacts vigorously while weak acetic or citric acid reacts slowly.',
        'Metal + acid → sare + hidrogen, o reacție redox: Mg(s) + 2H⁺(aq) → Mg²⁺(aq) + H₂(g). Magneziul se află mult deasupra hidrogenului în seria reactivității (E° Mg²⁺/Mg = −2,37 V). Viteza depinde de [H⁺], așa că HCl, acid tare, reacționează viguros, iar acidul acetic sau citric, acizi slabi, reacționează încet.'),
    fact:L('The “squeaky pop” test is how chemists check that a gas is hydrogen.','Testul „pocnetului” este felul în care chimiștii verifică dacă un gaz este hidrogen.')});
}

// ---- rehydrating white copper sulfate
addRule({id:'cuso4w_water', needs:['cuso4w','@water'], consume:[0], produce:['cuso4aq'], kind:'chem', energy:'exo', safety:'lab', temp:12,
  signs:['color','heat'], eq:'CuSO₄ + 5H₂O → CuSO₄·5H₂O', fx:[{t:'swirl', dur:2}, {t:'shimmer'}],
  title:L('Blue again, and warm!','Din nou albastru, și cald!'),
  b:L('The white powder turned blue again and the beaker got warm! The water went back inside the crystals.',
      'Pulberea albă a redevenit albastră, iar paharul s-a încălzit! Apa a intrat înapoi în cristale.'),
  e:L('When you heated the blue crystals, you drove out the water hidden inside them, and they turned white. Adding water puts it back: water molecules snuggle up to the copper ions again, the blue colour returns and heat is released. Chemists use this as a test for water.',
      'Când ai încălzit cristalele albastre, ai scos apa ascunsă în ele și au devenit albe. Adăugând apă, aceasta revine: moleculele de apă se lipesc din nou de ionii de cupru, culoarea albastră revine și se degajă căldură. Chimiștii folosesc asta ca test pentru apă.'),
  s:L('Rehydration of anhydrous copper(II) sulfate is strongly exothermic (ΔH ≈ −78 kJ/mol for CuSO₄ + 5H₂O → CuSO₄·5H₂O). Anhydrous CuSO₄ is a classic qualitative test for water: white → blue.',
      'Rehidratarea sulfatului de cupru(II) anhidru este puternic exotermă (ΔH ≈ −78 kJ/mol pentru CuSO₄ + 5H₂O → CuSO₄·5H₂O). CuSO₄ anhidru este un test calitativ clasic pentru apă: alb → albastru.'),
  fact:L('This change can go both ways: heat it and it turns white, add water and it turns blue, as often as you like.','Această transformare merge în ambele sensuri: dacă o încălzești devine albă, dacă adaugi apă devine albastră, de câte ori vrei.')});

// ---- soap + oil + water
addRule({id:'soap_emulsion', needs:['soap','oil','@water'], consume:[1], produce:['emul'], kind:'phys', safety:'home', colorRate:.6,
  signs:['color'], fx:[{t:'swirl', dur:3}, {t:'foam', h:.14, color:'#ffffff', rise:1, dur:5}], noEq:1,
  title:L('Soap makes peace','Săpunul face pace'),
  b:L('The soap mixed the oil and water into a cloudy liquid! Soap is a helper that can hold hands with water AND with oil at the same time. That’s how washing-up liquid cleans greasy plates.',
      'Detergentul a amestecat uleiul cu apa într-un lichid tulbure! Săpunul e un ajutor care se poate ține de mână și cu apa, ȘI cu uleiul, în același timp. Așa curăță detergentul farfuriile unsuroase.'),
  e:L('Soap molecules have two ends: a head that loves water and a tail that loves oil. The tails dig into tiny oil droplets and the heads face the water, so the oil gets wrapped in little balls called micelles that spread through the water. This mixture is called an emulsion.',
      'Moleculele de săpun au două capete: un cap căruia îi place apa și o coadă căreia îi place uleiul. Cozile intră în picăturile mici de ulei, iar capetele stau spre apă, așa că uleiul este învelit în biluțe numite micele, care se răspândesc prin apă. Acest amestec se numește emulsie.'),
  s:L('Surfactants are amphiphilic: a hydrophilic (often anionic sulfonate or carboxylate) head and a hydrophobic hydrocarbon tail. Above the critical micelle concentration they assemble around oil droplets, lower the interfacial tension and form a kinetically stable oil-in-water emulsion. The cloudiness is light scattered by the droplets.',
      'Surfactanții sunt amfifili: un cap hidrofil (adesea sulfonat sau carboxilat anionic) și o coadă hidrocarbonată hidrofobă. Peste concentrația micelară critică se asamblează în jurul picăturilor de ulei, scad tensiunea interfacială și formează o emulsie ulei-în-apă stabilă cinetic. Aspectul tulbure vine din lumina împrăștiată de picături.'),
  fact:L('Mayonnaise is an emulsion too: egg yolk works like soap to keep the oil mixed with lemon juice.','Maioneza este tot o emulsie: gălbenușul de ou funcționează ca un săpun și ține uleiul amestecat cu zeama de lămâie.')});

addRule({id:'oil_water', needs:['oil','@water'], unless:['soap','emul'], consume:[], produce:[], kind:'phys', safety:'home', quiet:1, noEq:1,
  signs:[], fx:[{t:'oildrops', dur:2.2}],
  title:L('Oil and water don’t mix','Uleiul și apa nu se amestecă'),
  b:L('The oil floated to the top and made a yellow layer. Oil and water don’t like each other, so they stay apart. Oil is lighter, so it stays on top.',
      'Uleiul s-a ridicat deasupra și a făcut un strat galben. Uleiul și apa nu se plac, așa că stau separat. Uleiul este mai ușor, deci rămâne sus.'),
  e:L('Water molecules are polar: one end is slightly negative and the other slightly positive, so they stick tightly to each other. Oil molecules are long, non-polar chains with no charged ends. Water keeps hugging water and pushes the oil away. Oil is less dense than water, so it floats.',
      'Moleculele de apă sunt polare: un capăt este ușor negativ, celălalt ușor pozitiv, așa că se lipesc strâns unele de altele. Moleculele de ulei sunt lanțuri lungi, nepolare, fără capete încărcate. Apa rămâne lipită de apă și împinge uleiul deoparte. Uleiul este mai puțin dens decât apa, deci plutește.'),
  s:L('“Like dissolves like”: fitting non-polar triglyceride chains into water would break its strong hydrogen-bond network, which is energetically and entropically unfavourable (the hydrophobic effect). Two immiscible phases form, ordered by density (oil ≈ 0.92 g/cm³, water 1.00 g/cm³).',
      '„Similarul dizolvă similarul”: ca să facă loc lanțurilor nepolare de trigliceride, apa și-ar rupe rețeaua puternică de legături de hidrogen, ceea ce este nefavorabil energetic și entropic (efectul hidrofob). Se formează două faze nemiscibile, ordonate după densitate (ulei ≈ 0,92 g/cm³, apă 1,00 g/cm³).'),
  fact:L('Oil spilled at sea floats on the surface, which is why it can be collected with floating barriers.','Petrolul vărsat în mare plutește la suprafață, de aceea poate fi adunat cu baraje plutitoare.')});

// ---- dissolving
addRule({id:'salt_dissolve', needs:['salt','@water'], consume:[0], produce:['saltaq'], kind:'phys', safety:'home',
  signs:[], eq:'NaCl(s) → Na⁺(aq) + Cl⁻(aq)', fx:[{t:'dissolve', color:'#ffffff', dur:2.4}, {t:'swirl', dur:2}],
  zoom:{from:['NaCl','NaCl','H2O','H2O','H2O'], to:['Na+','Cl-','Na+','Cl-','H2O','H2O','H2O']},
  wordsOverride:{r:['salt','water'], p:[L('salt water','apă sărată')]},
  title:L('Salt disappears… or does it?','Sarea dispare… sau nu?'),
  b:L('The salt crystals vanished! But the salt is still there, just in pieces too tiny to see. The water is now salty. No new substance was made: it’s a mixture called a solution.',
      'Cristalele de sare au dispărut! Dar sarea e tot acolo, doar în bucățele prea mici ca să le vezi. Apa este acum sărată. Nu s-a format o substanță nouă: este un amestec numit soluție.'),
  e:L('Salt is made of sodium ions (Na⁺) and chloride ions (Cl⁻) packed in a cube-shaped crystal. Water molecules are slightly charged at their ends, so they pull the ions apart and surround them. This is a physical change: boil the water away and the salt comes back.',
      'Sarea este formată din ioni de sodiu (Na⁺) și ioni de clorură (Cl⁻), așezați într-un cristal în formă de cub. Moleculele de apă au capetele ușor încărcate electric, așa că trag ionii unul de altul și îi înconjoară. Este o transformare fizică: fierbe apa până se evaporă și sarea revine.'),
  s:L('Dissolution of an ionic lattice: NaCl(s) → Na⁺(aq) + Cl⁻(aq). Polar H₂O molecules turn their δ− oxygen toward Na⁺ and their δ+ hydrogens toward Cl⁻ (hydration). The process is almost thermoneutral (ΔH ≈ +3.9 kJ/mol) and is driven by the increase in entropy. Solubility is about 360 g/L at 20 °C.',
      'Dizolvarea unei rețele ionice: NaCl(s) → Na⁺(aq) + Cl⁻(aq). Moleculele polare de H₂O își îndreaptă oxigenul δ− spre Na⁺ și hidrogenii δ+ spre Cl⁻ (hidratare). Procesul este aproape atermic (ΔH ≈ +3,9 kJ/mol) și este favorizat de creșterea entropiei. Solubilitatea este de circa 360 g/L la 20 °C.'),
  fact:L('Sea water is a salt solution: every litre holds about 35 grams of salt.','Apa de mare este o soluție de sare: fiecare litru conține aproximativ 35 de grame de sare.')});

addRule({id:'sugar_dissolve', needs:['sugar','@water'], consume:[0], produce:['sugaraq'], kind:'phys', safety:'home',
  signs:[], eq:'C₁₂H₂₂O₁₁(s) → C₁₂H₂₂O₁₁(aq)', fx:[{t:'dissolve', color:'#ffffff', dur:2.8}, {t:'swirl', dur:2}],
  wordsOverride:{r:['sugar','water'], p:[L('sugar water','apă îndulcită')]},
  title:L('Sweet water','Apă îndulcită'),
  b:L('The sugar dissolved and made sweet water. Like salt, the sugar is still there, just spread out in tiny pieces between the water.',
      'Zahărul s-a dizolvat și a făcut apă dulce. Ca și sarea, zahărul este tot acolo, doar împrăștiat în bucățele minuscule printre moleculele de apă.'),
  e:L('Sugar is different from salt: its molecules do not split into charged ions. Whole sugar molecules drift away from the crystal and mix with the water, held by weak attractions called hydrogen bonds. Warm water dissolves sugar faster.',
      'Zahărul este diferit de sare: moleculele lui nu se desfac în ioni. Molecule întregi de zahăr se desprind din cristal și se amestecă cu apa, ținute de atracții slabe numite legături de hidrogen. În apă caldă, zahărul se dizolvă mai repede.'),
  s:L('Sucrose (C₁₂H₂₂O₁₁) is a molecular, non-electrolyte solute: unlike NaCl(aq), the solution does not conduct electricity. Its eight –OH groups form hydrogen bonds with water, giving a very high solubility of about 2000 g/L at 20 °C.',
      'Zaharoza (C₁₂H₂₂O₁₁) este un solut molecular, neelectrolit: spre deosebire de NaCl(aq), soluția nu conduce curentul electric. Cele opt grupări –OH formează legături de hidrogen cu apa, de unde solubilitatea foarte mare, de circa 2000 g/L la 20 °C.'),
  fact:L('You can dissolve about 2 kg of sugar in just 1 litre of water. That’s how syrups are made.','Poți dizolva aproximativ 2 kg de zahăr într-un singur litru de apă. Așa se fac siropurile.')});

addRule({id:'cuso4_dissolve', needs:['cuso4','@water'], consume:[0], produce:['cuso4aq'], kind:'phys', safety:'lab', colorRate:.9,
  signs:['color'], eq:'CuSO₄(s) → Cu²⁺(aq) + SO₄²⁻(aq)', fx:[{t:'dissolve', color:'#2a86d8', dur:2.6}, {t:'swirl', dur:2.2}],
  zoom:{from:['CuSO4','H2O','H2O'], to:['Cu2+','SO4','H2O','H2O']},
  title:L('Blue water','Apă albastră'),
  b:L('The blue crystals dissolved and turned all the water a beautiful blue. The colour comes from the copper.',
      'Cristalele albastre s-au dizolvat și au colorat toată apa într-un albastru frumos. Culoarea vine de la cupru.'),
  e:L('Copper sulfate is made of copper ions (Cu²⁺) and sulfate ions (SO₄²⁻). In water each copper ion gets surrounded by water molecules, and this group absorbs orange-red light. Our eyes see the light that is left over, which is blue.',
      'Sulfatul de cupru este format din ioni de cupru (Cu²⁺) și ioni sulfat (SO₄²⁻). În apă, fiecare ion de cupru este înconjurat de molecule de apă, iar acest grup absoarbe lumina portocaliu-roșiatică. Ochii noștri văd lumina rămasă, care este albastră.'),
  s:L('CuSO₄ dissociates into [Cu(H₂O)₆]²⁺ and SO₄²⁻. The d⁹ copper(II) aqua complex absorbs around 800 nm through d–d transitions, so the transmitted light looks blue. Copper sulfate is harmful if swallowed and toxic to aquatic life.',
      'CuSO₄ disociază în [Cu(H₂O)₆]²⁺ și SO₄²⁻. Complexul acvo al cuprului(II), d⁹, absoarbe în jur de 800 nm prin tranziții d–d, așa că lumina transmisă pare albastră. Sulfatul de cupru este nociv la înghițire și toxic pentru viețuitoarele acvatice.'),
  fact:L('Farmers have sprayed grapevines with copper sulfate (“Bordeaux mixture”) for over 100 years to protect them from fungus.','De peste 100 de ani, viticultorii stropesc vița-de-vie cu sulfat de cupru („zeama bordeleză”) ca s-o apere de ciuperci.')});

addRule({id:'soda_dissolve', needs:['soda','@water'], consume:[0], produce:['sodaaq'], kind:'phys', safety:'home',
  signs:[], eq:'NaHCO₃(s) → Na⁺(aq) + HCO₃⁻(aq)', fx:[{t:'dissolve', color:'#ffffff', dur:2.2}, {t:'swirl', dur:2}],
  zoom:{from:['NaHCO3','H2O','H2O'], to:['Na+','HCO3-','H2O','H2O']},
  title:L('Baking soda dissolves','Bicarbonatul se dizolvă'),
  b:L('The baking soda dissolved into the water. No bubbles: to fizz, it needs an acid friend like vinegar or lemon juice.',
      'Bicarbonatul s-a dizolvat în apă. Nicio bulă: ca să facă spumă, are nevoie de un prieten acid, cum ar fi oțetul sau sucul de lămâie.'),
  e:L('Baking soda (sodium hydrogencarbonate) dissolves in water and makes it slightly basic, around pH 8. It’s a physical change. The fizzing only starts when an acid arrives.',
      'Bicarbonatul de sodiu (hidrogenocarbonat de sodiu) se dizolvă în apă și o face ușor bazică, cu pH în jur de 8. Este o transformare fizică. Spuma apare doar când vine un acid.'),
  s:L('NaHCO₃(s) → Na⁺(aq) + HCO₃⁻(aq). HCO₃⁻ is amphiprotic: it can accept H⁺ (forming H₂CO₃ → CO₂ + H₂O) or donate H⁺. The solution buffers near pH 8.3.',
      'NaHCO₃(s) → Na⁺(aq) + HCO₃⁻(aq). HCO₃⁻ este amfoter: poate accepta H⁺ (formând H₂CO₃ → CO₂ + H₂O) sau poate ceda H⁺. Soluția se tamponează în jur de pH 8,3.'),
  fact:L('Your blood uses hydrogencarbonate to keep its pH steady at about 7.4.','Sângele tău folosește hidrogenocarbonatul ca să-și mențină pH-ul constant, în jur de 7,4.')});

addRule({id:'sand_water', needs:['sand','@water'], consume:[], produce:[], kind:'phys', safety:'home', quiet:1, noEq:1,
  signs:[], fx:[{t:'sink', color:'#cfb07a', dur:2}],
  title:L('Sand won’t dissolve','Nisipul nu se dizolvă'),
  b:L('The sand just sank to the bottom. Nothing happened! Sand does not dissolve in water. That’s why beaches don’t disappear when waves wash over them.',
      'Nisipul s-a lăsat la fund. Nu s-a întâmplat nimic! Nisipul nu se dizolvă în apă. De aceea plajele nu dispar când trec valurile peste ele.'),
  e:L('Sand is mostly silicon dioxide. Its atoms are locked together in a giant, strong network that water molecules cannot pull apart. Sand is also denser than water, so it sinks. You could separate it by pouring the mixture through a filter.',
      'Nisipul este format mai ales din dioxid de siliciu. Atomii lui sunt legați într-o rețea uriașă și puternică, pe care moleculele de apă nu o pot desface. Nisipul este și mai dens decât apa, așa că se scufundă. L-ai putea separa trecând amestecul printr-un filtru.'),
  s:L('SiO₂ is a covalent network solid; breaking its Si–O bonds (≈ 452 kJ/mol) costs far more than any hydration energy gained, so its solubility in water is negligible. The mixture is a suspension that settles (density ≈ 2.65 g/cm³) and can be separated by filtration or decanting.',
      'SiO₂ este un solid cu rețea covalentă; ruperea legăturilor Si–O (≈ 452 kJ/mol) costă mult mai mult decât energia câștigată prin hidratare, așa că solubilitatea în apă este neglijabilă. Amestecul este o suspensie care se depune (densitate ≈ 2,65 g/cm³) și poate fi separat prin filtrare sau decantare.'),
  fact:L('Glass is made by melting sand at about 1700 °C.','Sticla se obține topind nisip la aproximativ 1700 °C.')});

addRule({id:'soap_water', needs:['soap','@water'], consume:[], produce:[], kind:'phys', safety:'home', quiet:1, noEq:1,
  signs:[], fx:[{t:'foam', h:.16, color:'#ffffff', rise:1, dur:6}, {t:'bubbles', rate:8, dur:2}],
  title:L('Bubbly suds','Clăbuc de săpun'),
  b:L('The soap mixed with the water and made bubbles on top. Nothing new was made: it’s soapy water, a mixture.',
      'Detergentul s-a amestecat cu apa și a făcut bule deasupra. Nu s-a format nimic nou: este apă cu săpun, un amestec.'),
  e:L('Soap molecules gather at the surface of water and make it stretchy, which is why soapy water can hold air in bubbles. Soap is slightly basic, which is why it feels slippery.',
      'Moleculele de săpun se adună la suprafața apei și o fac elastică, de aceea apa cu săpun poate ține aer prins în bule. Săpunul este ușor bazic, de aceea e alunecos.'),
  s:L('Surfactants lower the surface tension of water from about 72 mN/m to about 30 mN/m, which lets thin films (bubbles) form. Detergent solutions are usually mildly alkaline (pH 8–10).',
      'Surfactanții scad tensiunea superficială a apei de la aproximativ 72 mN/m la aproximativ 30 mN/m, ceea ce permite formarea peliculelor subțiri (bule). Soluțiile de detergent sunt de obicei ușor bazice (pH 8–10).'),
  fact:L('Bubble colours come from light bouncing off both sides of a film thinner than a thousandth of a millimetre.','Culorile baloanelor de săpun vin din lumina reflectată pe ambele fețe ale unei pelicule mai subțiri de o miime de milimetru.')});

// ---- heat rules (dry beaker)
addRule({id:'mg_burn', needs:['mg'], heatOnly:1, dry:1, minT:120, consume:[0], produce:['mgo'], wr:['o2air'], kind:'chem', energy:'exo', safety:'lab', temp:60,
  signs:['light','heat','solid'], eq:'2Mg + O₂ → 2MgO', fx:[{t:'burn', dur:3.2}],
  zoom:{from:['Mg','Mg','O2'], to:['MgO','MgO']},
  title:L('A blinding white flash!','O lumină albă orbitoare!'),
  b:L('The magnesium caught fire and burned with a super-bright white light! Afterwards only white ash was left. The metal joined with oxygen from the air to make something new.',
      'Magneziul a luat foc și a ars cu o lumină albă foarte puternică! După aceea a rămas doar o cenușă albă. Metalul s-a unit cu oxigenul din aer și a format ceva nou.'),
  e:L('Burning is a reaction with oxygen. Magnesium combines with oxygen from the air to make magnesium oxide, a white powder. So much energy is released that the flame is brighter than almost anything, including ultraviolet light, so you should never stare at it.',
      'Arderea este o reacție cu oxigenul. Magneziul se combină cu oxigenul din aer și formează oxid de magneziu, o pulbere albă. Se eliberează atât de multă energie încât flacăra este mai strălucitoare decât aproape orice, inclusiv lumină ultravioletă, deci nu te uita direct la ea.'),
  s:L('Combustion: 2Mg(s) + O₂(g) → 2MgO(s), ΔH ≈ −1204 kJ per 2 mol. The flame reaches about 3100 °C. Magnesium is such a strong reducing agent that it keeps burning even in CO₂ or steam, so magnesium fires cannot be put out with water.',
      'Ardere: 2Mg(s) + O₂(g) → 2MgO(s), ΔH ≈ −1204 kJ pentru 2 mol. Flacăra atinge aproximativ 3100 °C. Magneziul este un reducător atât de puternic încât arde chiar și în CO₂ sau în vapori de apă, de aceea incendiile de magneziu nu se sting cu apă.'),
  fact:L('Old camera flashes and emergency flares use burning magnesium.','Bliturile vechi ale aparatelor foto și rachetele de semnalizare folosesc magneziu care arde.')});

addRule({id:'soda_heat', needs:['soda'], heatOnly:1, dry:1, minT:120, consume:[0], produce:['na2co3'], wp:['steam','co2'], kind:'chem', energy:'endo', safety:'home',
  signs:['gas'], eq:'2NaHCO₃ → Na₂CO₃ + H₂O + CO₂↑', fx:[{t:'steam', dur:3, rate:5}],
  zoom:{from:['NaHCO3','NaHCO3'], to:['Na2CO3','H2O','CO2']},
  title:L('Baking soda breaks down','Bicarbonatul se descompune'),
  b:L('When heated, the baking soda gave off steam and an invisible gas, carbon dioxide. That’s the gas that makes cakes puff up in the oven!',
      'Încălzit, bicarbonatul a scos abur și un gaz invizibil, dioxidul de carbon. Acesta este gazul care face prăjiturile să crească în cuptor!'),
  e:L('Heat alone can break some substances apart. This is called thermal decomposition. Baking soda splits into washing soda (sodium carbonate), water and carbon dioxide. It still looks like a white powder, but it’s a different substance now.',
      'Doar căldura poate desface unele substanțe. Aceasta se numește descompunere termică. Bicarbonatul se desface în sodă de rufe (carbonat de sodiu), apă și dioxid de carbon. Arată tot ca o pulbere albă, dar acum este altă substanță.'),
  s:L('2NaHCO₃(s) → Na₂CO₃(s) + H₂O(g) + CO₂(g): endothermic, noticeable above about 80 °C and fast near 200 °C. Na₂CO₃ is a stronger base than NaHCO₃ (solution pH about 11 versus 8.3).',
      '2NaHCO₃(s) → Na₂CO₃(s) + H₂O(g) + CO₂(g): endotermă, observabilă peste aproximativ 80 °C și rapidă în jur de 200 °C. Na₂CO₃ este o bază mai tare decât NaHCO₃ (pH-ul soluției aproximativ 11, față de 8,3).'),
  fact:L('Some fire extinguishers use baking soda: the CO₂ it releases smothers the flames.','Unele stingătoare folosesc bicarbonat: CO₂-ul eliberat înăbușă flăcările.')});

addRule({id:'cuso4_heat', needs:['cuso4'], heatOnly:1, dry:1, minT:120, consume:[0], produce:['cuso4w'], wp:['steam'], kind:'chem', energy:'endo', safety:'lab',
  signs:['color','gas'], eq:'CuSO₄·5H₂O → CuSO₄ + 5H₂O↑', fx:[{t:'steam', dur:3.5, rate:5}],
  title:L('The blue crystals turn white','Cristalele albastre devin albe'),
  b:L('The heat made the blue crystals turn white, and a little steam came out. The crystals had water hiding inside them! Now try adding water.',
      'Căldura a făcut cristalele albastre să devină albe, iar din ele a ieșit puțin abur. Cristalele aveau apă ascunsă înăuntru! Acum încearcă să adaugi apă.'),
  e:L('Blue copper sulfate crystals contain water locked inside them, called water of crystallisation. Heating drives this water out as steam, and without it copper sulfate is white. Try adding water to the white powder!',
      'Cristalele albastre de sulfat de cupru conțin apă prinsă în interior, numită apă de cristalizare. Încălzirea scoate această apă sub formă de abur, iar fără ea sulfatul de cupru este alb. Încearcă să adaugi apă peste pulberea albă!'),
  s:L('Thermal dehydration: CuSO₄·5H₂O → CuSO₄ + 5H₂O(g), in steps between about 100 °C and 250 °C. Without water ligands the d–d absorption moves out of the visible range, so the anhydrous salt is white-grey. Endothermic.',
      'Deshidratare termică: CuSO₄·5H₂O → CuSO₄ + 5H₂O(g), în trepte, între aproximativ 100 °C și 250 °C. Fără liganzii de apă, absorbția d–d iese din domeniul vizibil, așa că sarea anhidră este alb-cenușie. Endotermă.'),
  fact:L('About 36% of the weight of blue copper sulfate crystals is water.','Aproximativ 36% din masa cristalelor albastre de sulfat de cupru este apă.')});

addRule({id:'sugar_caramel', needs:['sugar'], heatOnly:1, dry:1, minT:165, consume:[0], produce:['caramel'], wp:['steam'], kind:'chem', safety:'adult',
  signs:['color','smell'], eq:'C₁₂H₂₂O₁₁ → caramel + H₂O↑', fx:[{t:'steam', dur:4, rate:4}],
  title:L('Sugar turns into caramel','Zahărul devine caramel'),
  b:L('The white sugar melted and turned golden-brown, and it smells lovely. That’s caramel! You can’t turn caramel back into white sugar, so this is a chemical change.',
      'Zahărul alb s-a topit, a devenit maro-auriu și miroase minunat. Acesta este caramelul! Caramelul nu mai poate fi transformat înapoi în zahăr alb, deci este o transformare chimică.'),
  e:L('When sugar gets hot enough (about 160 °C) it first melts, then its molecules start to break apart and join into hundreds of new ones. Some are brown and some smell of caramel. Water escapes as steam. Keep heating and it burns to black carbon.',
      'Când zahărul se încălzește suficient (în jur de 160 °C), mai întâi se topește, apoi moleculele lui încep să se rupă și să se unească în sute de molecule noi. Unele sunt maro, altele miros a caramel. Apa iese sub formă de abur. Dacă mai încălzești, se arde și devine carbon negru.'),
  s:L('Caramelisation is the thermal decomposition and polymerisation of sucrose: inversion to glucose and fructose, dehydration, and formation of caramelans (C₂₄H₃₆O₁₈), caramelens and caramelins, plus aroma compounds such as diacetyl and furans. It is non-enzymatic browning, different from the Maillard reaction, which needs proteins.',
      'Caramelizarea înseamnă descompunerea termică și polimerizarea zaharozei: inversie în glucoză și fructoză, deshidratare și formarea caramelanilor (C₂₄H₃₆O₁₈), caramelenilor și caramelinilor, plus compuși aromatici precum diacetilul și furanii. Este o brunificare neenzimatică, diferită de reacția Maillard, care are nevoie de proteine.'),
  fact:L('Toast, roasted coffee and grilled food get their brown colour and flavour from similar browning reactions.','Pâinea prăjită, cafeaua prăjită și mâncarea la grătar își primesc culoarea și aroma din reacții de brunificare asemănătoare.')});

addRule({id:'sugar_burn', needs:['caramel'], heatOnly:1, dry:1, minT:235, minAge:4, consume:[0], produce:['carbon'], wp:['steam'], kind:'chem', safety:'adult',
  signs:['color','smell','gas'], eq:'C₁₂H₂₂O₁₁ → 12C + 11H₂O↑', fx:[{t:'smoke', dur:5, rate:7, dark:1}],
  title:L('Burnt to carbon!','Ars până la carbon!'),
  b:L('Oops! The caramel turned black and smoky. Too much heat broke the sugar down until mostly black carbon was left.',
      'Hopa! Caramelul s-a înnegrit și a scos fum. Prea multă căldură a descompus zahărul până a rămas mai ales carbon negru.'),
  e:L('Sugar is made of carbon, hydrogen and oxygen. Strong heat drives the hydrogen and oxygen away as water vapour and leaves black carbon behind. That’s why burnt toast is black.',
      'Zahărul este format din carbon, hidrogen și oxigen. Căldura puternică alungă hidrogenul și oxigenul sub formă de vapori de apă și lasă în urmă carbonul negru. De aceea pâinea arsă este neagră.'),
  s:L('Pyrolysis (carbonisation): in the limit C₁₂H₂₂O₁₁ → 12C + 11H₂O(g). In practice a porous carbon char forms, along with smoke from partially oxidised products.',
      'Piroliză (carbonizare): în cazul limită C₁₂H₂₂O₁₁ → 12C + 11H₂O(g). În practică se formează un cărbune poros, împreună cu fum din produșii parțial oxidați.'),
  fact:L('Charcoal is made the same way, by heating wood without much air.','Mangalul se obține la fel, încălzind lemnul fără prea mult aer.')});

// ---- special rules (handled in engine)
const EVAP_RULE = addRule({id:'evaporate', needs:[], special:1, kind:'phys', safety:'adult', signs:['gas'], noEq:1,
  eq:'H₂O(l) → H₂O(g)',
  title:L('The water boiled away','Apa a fiert și s-a evaporat'),
  b:L('The water boiled and turned into steam that floated away. Whatever was dissolved in it stayed behind on the bottom of the beaker: {list}',
      'Apa a fiert și s-a transformat în abur, care a plecat. Ce era dizolvat în ea a rămas pe fundul paharului: {list}'),
  e:L('At 100 °C water boils: its molecules move so fast that they escape into the air as a gas (steam). Dissolved solids like salt or sugar cannot escape, so they are left behind as crystals. This is called evaporation, and it’s an easy way to separate a solution. Left behind: {list}',
      'La 100 °C apa fierbe: moleculele ei se mișcă atât de repede încât scapă în aer sub formă de gaz (abur). Substanțele solide dizolvate, precum sarea sau zahărul, nu pot scăpa, așa că rămân în urmă sub formă de cristale. Aceasta se numește evaporare și este o metodă simplă de a separa o soluție. Au rămas: {list}'),
  s:L('Boiling happens when the vapour pressure equals atmospheric pressure (101.3 kPa at 100 °C). Non-volatile solutes raise the boiling point slightly (ΔT = i·Kb·m, Kb(water) = 0.512 K·kg/mol) and remain as a residue once the solvent has gone; crystal size depends on how fast it evaporates. Residue: {list}',
      'Fierberea are loc când presiunea vaporilor egalează presiunea atmosferică (101,3 kPa la 100 °C). Substanțele dizolvate nevolatile cresc puțin punctul de fierbere (ΔT = i·Kb·m, Kb(apă) = 0,512 K·kg/mol) și rămân ca reziduu după ce solventul a plecat; mărimea cristalelor depinde de viteza evaporării. Reziduu: {list}'),
  fact:L('In salt pans by the sea, the sun evaporates sea water to collect salt. People have done this for thousands of years.','În salinele de lângă mare, soarele evaporă apa sărată ca să se obțină sare. Oamenii fac asta de mii de ani.')});

const IND_RULE = addRule({id:'indicator', needs:[], special:1, kind:'phys', safety:'home', signs:['color'], noEq:1,
  title:L('Colour detective: {side}!','Detectivul culorilor: {side}!'),
  b:L('The cabbage juice is now {color}! Red cabbage juice is a colour detective: it turns pink-red with sour acids like lemon juice, and green-yellow with bases like baking soda or soap.',
      'Sucul de varză este acum {color}! Sucul de varză roșie este un detectiv al culorilor: se face roz-roșu cu acizii acri, ca sucul de lămâie, și verde-galben cu bazele, ca bicarbonatul sau săpunul.'),
  e:L('Red cabbage contains colourful molecules called anthocyanins. Their shape changes slightly depending on how acidic or basic the liquid is, and a different shape reflects a different colour. The pH scale goes from 0 (very acidic) through 7 (neutral) to 14 (very basic). This liquid is about pH {ph}, so it looks {color}.',
      'Varza roșie conține molecule colorate numite antociani. Forma lor se schimbă puțin în funcție de cât de acid sau bazic este lichidul, iar o altă formă reflectă altă culoare. Scara pH merge de la 0 (foarte acid), prin 7 (neutru), până la 14 (foarte bazic). Acest lichid are pH în jur de {ph}, deci arată {color}.'),
  s:L('Anthocyanins (e.g. cyanidin glycosides) are acid–base indicators: gaining or losing H⁺ changes the conjugated π-system and so the absorption maximum. Flavylium cation (red, pH < 3) → quinoidal base (violet, pH ≈ 7) → anionic forms (blue-green, pH 8–11) → chalcone (yellow, pH > 12). pH = −log[H⁺], so each unit is a tenfold change. Current pH ≈ {ph}.',
      'Antocianii (de exemplu glicozidele cianidinei) sunt indicatori acido-bazici: câștigarea sau pierderea de H⁺ modifică sistemul π conjugat și deci maximul de absorbție. Cation flavilium (roșu, pH < 3) → bază chinoidală (violet, pH ≈ 7) → forme anionice (albastru-verde, pH 8–11) → calconă (galben, pH > 12). pH = −log[H⁺], deci fiecare unitate înseamnă o schimbare de zece ori. pH-ul actual ≈ {ph}.'),
  fact:L('Hydrangea flowers change colour the same way: blue in acidic soil, pink in alkaline soil.','Florile de hortensie își schimbă culoarea la fel: albastre în sol acid, roz în sol alcalin.')});

const PH_BANDS = [
  {max:2.5, key:'red', c:'#d42a44', n:L('red','roșu')},
  {max:4.5, key:'pink', c:'#df4f8c', n:L('pink','roz')},
  {max:6, key:'violet', c:'#a0479f', n:L('violet','violet')},
  {max:7.6, key:'purple', c:'#6b3fa0', n:L('purple','mov')},
  {max:9, key:'blue', c:'#3f5fc0', n:L('blue','albastru')},
  {max:10.6, key:'teal', c:'#2c8f9c', n:L('blue-green','albastru-verzui')},
  {max:12.5, key:'green', c:'#3aa35a', n:L('green','verde')},
  {max:99, key:'yellow', c:'#d6c63a', n:L('yellow','galben')},
];
function phBand(ph){ return PH_BANDS.find(b => ph <= b.max); }

let TOTAL_DISC = Object.keys(RULE_INFO).length;

// ===================== missions =====================
const MISSIONS = [
  {key:'add:water', title:L('Fill the beaker','Umple paharul'), goal:L('Add water to the beaker.','Adaugă apă în pahar.'), hint:L('Tap the Water bottle on the shelf, or drag it onto the beaker.','Atinge sticla cu apă de pe raft sau trage-o peste pahar.')},
  {key:'rule:salt_dissolve', title:L('Where did the salt go?','Unde a dispărut sarea?'), goal:L('Dissolve table salt in water.','Dizolvă sare de bucătărie în apă.'), hint:L('Water first, then table salt.','Întâi apă, apoi sare de bucătărie.')},
  {key:'rule:oil_water', title:L('Oil versus water','Uleiul contra apei'), goal:L('Find out if oil and water mix.','Află dacă uleiul și apa se amestecă.'), hint:L('Wash the beaker, add water, then cooking oil.','Spală paharul, pune apă, apoi ulei de gătit.')},
  {key:'rule:soap_emulsion', title:L('Make them friends','Fă-i prieteni'), goal:L('Use dish soap to mix oil and water.','Folosește detergent ca să amesteci uleiul cu apa.'), hint:L('Water, then oil, then dish soap.','Apă, apoi ulei, apoi detergent.')},
  {key:'rule:acid_carb:vinegar:soda', title:L('Kitchen volcano','Vulcanul din bucătărie'), goal:L('Make a foamy eruption with vinegar and baking soda.','Fă o erupție spumoasă cu oțet și bicarbonat.'), hint:L('Pour in vinegar, then add baking soda.','Toarnă oțet, apoi adaugă bicarbonat.')},
  {key:'indicator:acid', title:L('Colour detective','Detectivul culorilor'), goal:L('Turn red cabbage juice pink with an acid.','Fă sucul de varză roșie roz cu un acid.'), hint:L('Cabbage juice first, then lemon juice or vinegar.','Întâi suc de varză, apoi suc de lămâie sau oțet.')},
  {key:'indicator:base', title:L('Green magic','Magie verde'), goal:L('Turn red cabbage juice blue-green with a base.','Fă sucul de varză roșie albastru-verzui cu o bază.'), hint:L('Cabbage juice, then baking soda or dish soap. Sodium hydroxide gives an even stronger colour.','Suc de varză, apoi bicarbonat sau detergent. Hidroxidul de sodiu dă o culoare și mai puternică.')},
  {key:'rule:na_water', title:L('Sodium on water','Sodiu pe apă'), goal:L('Drop a piece of sodium into water. Only in a virtual lab!','Aruncă o bucată de sodiu în apă. Doar în laboratorul virtual!'), hint:L('Water first, then sodium from the Lab shelf.','Întâi apă, apoi sodiu de pe raftul de laborator.')},
  {key:'rule:neutralize', title:L('Back to neutral','Înapoi la neutru'), goal:L('Neutralise an acid with a base and watch the colour.','Neutralizează un acid cu o bază și urmărește culoarea.'), hint:L('Cabbage juice, then hydrochloric acid, then sodium hydroxide.','Suc de varză, apoi acid clorhidric, apoi hidroxid de sodiu.')},
  {key:'rule:fe_cuso4', title:L('Copper-plated nail','Cuiul placat cu cupru'), goal:L('Put an iron nail into copper sulfate solution.','Pune un cui de fier în soluție de sulfat de cupru.'), hint:L('Water plus copper sulfate makes a blue solution. Then add the iron nail.','Apa plus sulfatul de cupru fac o soluție albastră. Apoi adaugă cuiul de fier.')},
  {key:'rule:agno3_cl', title:L('Make a white cloud','Fă un nor alb'), goal:L('Mix silver nitrate with salt water.','Amestecă azotat de argint cu apă sărată.'), hint:L('Make salt water first, then add silver nitrate.','Fă întâi apă sărată, apoi adaugă azotat de argint.')},
  {key:'rule:h2o2_yeast:soap', title:L('Elephant toothpaste','Pastă de dinți pentru elefanți'), goal:L('Make a giant tower of foam.','Fă un turn uriaș de spumă.'), hint:L('Hydrogen peroxide, then dish soap, then yeast.','Apă oxigenată, apoi detergent, apoi drojdie.')},
  {key:'rule:evaporate:salt', title:L('Get the salt back','Recuperează sarea'), goal:L('Make salt water, then boil all the water away.','Fă apă sărată, apoi fierbe toată apa.'), hint:L('Salt water, then light the burner and wait.','Apă sărată, apoi aprinde arzătorul și așteaptă.')},
  {key:'rule:mg_burn', title:L('Magnesium flash','Blitul de magneziu'), goal:L('Heat magnesium ribbon in a dry beaker.','Încălzește panglica de magneziu într-un pahar uscat.'), hint:L('Wash the beaker, add magnesium ribbon, then light the burner.','Spală paharul, pune panglica de magneziu, apoi aprinde arzătorul.')},
];

// ===================== elements 1-20 =====================
// [Z, sym, en, ro, neutrons(common), category, row, col, fact en, fact ro]
const ELEMENTS = [
  [1,'H','Hydrogen','Hidrogen',0,'nonmetal',0,0,'The lightest element. Stars like our Sun are mostly hydrogen.','Cel mai ușor element. Stelele, ca Soarele nostru, sunt formate mai ales din hidrogen.'],
  [2,'He','Helium','Heliu',2,'noble',0,7,'It makes balloons float and voices sound squeaky.','Face baloanele să plutească și vocea să sune pițigăiat.'],
  [3,'Li','Lithium','Litiu',4,'alkali',1,0,'It powers the batteries in phones and tablets.','Alimentează bateriile telefoanelor și tabletelor.'],
  [4,'Be','Beryllium','Beriliu',5,'earth',1,1,'A light, stiff metal used in the mirrors of space telescopes.','Un metal ușor și rigid, folosit la oglinzile telescoapelor spațiale.'],
  [5,'B','Boron','Bor',6,'metalloid',1,2,'Found in heat-proof glass for ovens.','Se găsește în sticla termorezistentă pentru cuptor.'],
  [6,'C','Carbon','Carbon',6,'nonmetal',1,3,'In every living thing, and in diamonds and pencil lead.','În orice ființă vie, dar și în diamante și în mina creionului.'],
  [7,'N','Nitrogen','Azot',7,'nonmetal',1,4,'It makes up 78% of the air you breathe.','Formează 78% din aerul pe care îl respiri.'],
  [8,'O','Oxygen','Oxigen',8,'nonmetal',1,5,'You need it to live. It is 21% of the air.','Ai nevoie de el ca să trăiești. Formează 21% din aer.'],
  [9,'F','Fluorine','Fluor',10,'halogen',1,6,'In toothpaste, where it helps protect your teeth.','În pasta de dinți, unde ajută la protejarea dinților.'],
  [10,'Ne','Neon','Neon',10,'noble',1,7,'It glows red-orange in neon signs.','Strălucește roșu-portocaliu în reclamele cu neon.'],
  [11,'Na','Sodium','Sodiu',12,'alkali',2,0,'Half of table salt. A soft metal you can cut with a knife.','Jumătate din sarea de bucătărie. Un metal moale, care se taie cu cuțitul.'],
  [12,'Mg','Magnesium','Magneziu',12,'earth',2,1,'Burns with a dazzling white light, and sits inside chlorophyll in green leaves.','Arde cu o lumină albă orbitoare și se află în clorofila din frunzele verzi.'],
  [13,'Al','Aluminium','Aluminiu',14,'metal',2,2,'Drink cans and kitchen foil are made of it.','Dozele de băuturi și folia de bucătărie sunt făcute din el.'],
  [14,'Si','Silicon','Siliciu',14,'metalloid',2,3,'In sand, and in every computer chip.','În nisip și în fiecare cip de computer.'],
  [15,'P','Phosphorus','Fosfor',16,'nonmetal',2,4,'On the side of every matchbox.','Pe marginea fiecărei cutii de chibrituri.'],
  [16,'S','Sulfur','Sulf',16,'nonmetal',2,5,'Yellow. Some of its compounds smell like rotten eggs.','Galben. Unii dintre compușii lui miros a ouă stricate.'],
  [17,'Cl','Chlorine','Clor',18,'halogen',2,6,'Keeps swimming pools clean, and is the other half of table salt.','Ține curată apa din piscine și este cealaltă jumătate a sării de bucătărie.'],
  [18,'Ar','Argon','Argon',22,'noble',2,7,'Almost 1% of the air. It is used inside some light bulbs.','Aproape 1% din aer. Se folosește în unele becuri.'],
  [19,'K','Potassium','Potasiu',20,'alkali',3,0,'Bananas are full of it.','Bananele sunt pline de potasiu.'],
  [20,'Ca','Calcium','Calciu',20,'earth',3,1,'It builds your bones and teeth.','Îți construiește oasele și dinții.'],
];
const STABLE_N = {1:[0,1],2:[1,2],3:[3,4],4:[5],5:[5,6],6:[6,7],7:[7,8],8:[8,9,10],9:[10],10:[10,11,12],11:[12],12:[12,13,14],13:[14],14:[14,15,16],15:[16],16:[16,17,18,20],17:[18,20],18:[18,20,22],19:[20,22],20:[20,22,23,24,26,28]};
const CAT_COLORS = {alkali:'#ffc9a8', earth:'#ffe39e', nonmetal:'#bfe8c6', noble:'#d6c8f5', halogen:'#a9e3e0', metalloid:'#d9dfb4', metal:'#c9d9e8'};
const CAT_KEYS = {alkali:'catAlkali', earth:'catEarth', nonmetal:'catNonmetal', noble:'catNoble', halogen:'catHalogen', metalloid:'catMetalloid', metal:'catMetal'};

// ===================== molecule builder recipes =====================
const MOLS = [
  {id:'H2', f:'H₂', counts:{H:2}, name:L('Hydrogen gas','Hidrogen gazos'), bond:L('covalent, single','covalentă, simplă'), shape:L('straight line','linie dreaptă'),
    b:L('Two hydrogen atoms share their electrons and hold on tight. That’s hydrogen gas, the fuel that powers the Sun!','Doi atomi de hidrogen își împart electronii și se țin strâns. Acesta este hidrogenul gazos, combustibilul Soarelui!'),
    e:L('Each H atom has 1 electron. By sharing, each one gets 2, a full first shell. A shared pair of electrons is a single covalent bond.','Fiecare atom de H are 1 electron. Prin împărțire, fiecare ajunge la 2, adică primul strat complet. O pereche de electroni împărțită formează o legătură covalentă simplă.'),
    s:L('H–H bond length 74 pm, bond energy 436 kJ/mol. Non-polar, because both atoms have the same electronegativity.','Lungimea legăturii H–H este 74 pm, energia de legătură 436 kJ/mol. Nepolară, pentru că ambii atomi au aceeași electronegativitate.')},
  {id:'O2', f:'O₂', counts:{O:2}, name:L('Oxygen gas','Oxigen gazos'), bond:L('covalent, double','covalentă, dublă'), shape:L('straight line','linie dreaptă'),
    b:L('Two oxygen atoms team up to make the oxygen you breathe.','Doi atomi de oxigen fac echipă și formează oxigenul pe care îl respiri.'),
    e:L('Each O has 6 outer electrons and needs 2 more. They share two pairs: a double bond.','Fiecare O are 6 electroni exteriori și mai are nevoie de 2. Împart două perechi: o legătură dublă.'),
    s:L('O=O bond 121 pm, 498 kJ/mol. Surprisingly, O₂ has two unpaired electrons, so liquid oxygen is attracted to a magnet (paramagnetic).','Legătura O=O: 121 pm, 498 kJ/mol. Surprinzător, O₂ are doi electroni neîmperecheați, așa că oxigenul lichid este atras de magnet (paramagnetic).')},
  {id:'N2', f:'N₂', counts:{N:2}, name:L('Nitrogen gas','Azot gazos'), bond:L('covalent, triple','covalentă, triplă'), shape:L('straight line','linie dreaptă'),
    b:L('Two nitrogen atoms hold on with three bonds. Super strong! Most of the air is nitrogen.','Doi atomi de azot se țin cu trei legături. Foarte puternic! Cea mai mare parte a aerului este azot.'),
    e:L('Each N has 5 outer electrons and needs 3 more, so they share three pairs: a triple bond. That’s why nitrogen hardly reacts.','Fiecare N are 5 electroni exteriori și mai are nevoie de 3, așa că împart trei perechi: o legătură triplă. De aceea azotul reacționează foarte greu.'),
    s:L('N≡N: 110 pm, 945 kJ/mol, one of the strongest bonds in chemistry. Breaking it to make fertiliser (the Haber process) uses about 1–2% of the world’s energy.','N≡N: 110 pm, 945 kJ/mol, una dintre cele mai puternice legături din chimie. Ruperea ei pentru îngrășăminte (procedeul Haber) consumă circa 1–2% din energia lumii.')},
  {id:'H2O', f:'H₂O', counts:{H:2,O:1}, name:L('Water','Apă'), bond:L('covalent, 2 single bonds','covalentă, 2 legături simple'), shape:L('bent, like a boomerang','îndoită, ca un bumerang'),
    b:L('Two hydrogens hold hands with one oxygen: you made water! It has a bent shape, like a boomerang.','Doi hidrogeni se țin de mână cu un oxigen: ai făcut apă! Are o formă îndoită, ca un bumerang.'),
    e:L('Oxygen shares one pair of electrons with each hydrogen. Oxygen pulls the shared electrons harder, so it becomes slightly negative and the hydrogens slightly positive. That makes water “sticky” and great at dissolving things.','Oxigenul împarte câte o pereche de electroni cu fiecare hidrogen. Oxigenul trage mai tare de electronii comuni, așa că devine ușor negativ, iar hidrogenii ușor pozitivi. Asta face apa „lipicioasă” și foarte bună la dizolvat.'),
    s:L('Bent geometry with an H–O–H angle of 104.5°, caused by two lone pairs (VSEPR AX₂E₂). Polar, dipole moment 1.85 D. Hydrogen bonding explains its high boiling point (100 °C) for such a small molecule.','Geometrie unghiulară, unghi H–O–H de 104,5°, din cauza celor două perechi neparticipante (VSEPR AX₂E₂). Polară, moment de dipol 1,85 D. Legăturile de hidrogen explică punctul de fierbere ridicat (100 °C) pentru o moleculă atât de mică.')},
  {id:'CO2', f:'CO₂', counts:{C:1,O:2}, name:L('Carbon dioxide','Dioxid de carbon'), bond:L('covalent, 2 double bonds','covalentă, 2 legături duble'), shape:L('straight line','linie dreaptă'),
    b:L('One carbon between two oxygens, in a straight line. It’s the gas in fizzy drinks and the gas you breathe out.','Un carbon între doi oxigeni, în linie dreaptă. Este gazul din băuturile acidulate și gazul pe care îl expiri.'),
    e:L('Carbon has 4 outer electrons and shares 2 pairs with each oxygen: two double bonds. Plants take in CO₂ and use sunlight to turn it into sugar.','Carbonul are 4 electroni exteriori și împarte câte 2 perechi cu fiecare oxigen: două legături duble. Plantele absorb CO₂ și, cu ajutorul luminii, îl transformă în zahăr.'),
    s:L('Linear (180°, AX₂). Each C=O bond is polar, but the dipoles cancel, so the molecule is non-polar. CO₂ absorbs infrared radiation, which makes it a greenhouse gas.','Liniară (180°, AX₂). Fiecare legătură C=O este polară, dar dipolii se anulează, deci molecula este nepolară. CO₂ absoarbe radiația infraroșie, ceea ce îl face gaz cu efect de seră.')},
  {id:'CH4', f:'CH₄', counts:{C:1,H:4}, name:L('Methane','Metan'), bond:L('covalent, 4 single bonds','covalentă, 4 legături simple'), shape:L('tetrahedron (a 3D pyramid)','tetraedru (o piramidă 3D)'),
    b:L('One carbon with four hydrogens around it: methane, the gas used in many cookers!','Un carbon cu patru hidrogeni în jur: metanul, gazul din aragaz!'),
    e:L('Carbon needs 4 more electrons, so it shares one pair with each of four hydrogens: four single bonds.','Carbonului îi mai trebuie 4 electroni, așa că împarte câte o pereche cu fiecare dintre cei patru hidrogeni: patru legături simple.'),
    s:L('Tetrahedral, bond angle 109.5° (sp³ carbon). Non-polar. Methane is the main component of natural gas and a greenhouse gas about 80 times stronger than CO₂ over 20 years.','Tetraedrică, unghi de 109,5° (carbon sp³). Nepolară. Metanul este componenta principală a gazului natural și un gaz cu efect de seră de circa 80 de ori mai puternic decât CO₂ pe 20 de ani.')},
  {id:'NH3', f:'NH₃', counts:{N:1,H:3}, name:L('Ammonia','Amoniac'), bond:L('covalent, 3 single bonds','covalentă, 3 legături simple'), shape:L('pyramid','piramidă'),
    b:L('One nitrogen with three hydrogens makes ammonia. It has a strong smell and is used in some cleaners.','Un azot cu trei hidrogeni formează amoniacul. Are un miros puternic și se folosește în unele soluții de curățat.'),
    e:L('Nitrogen has 5 outer electrons and shares 3 of them with three hydrogens. The two left over sit on top as a “lone pair”, which gives the molecule a pyramid shape.','Azotul are 5 electroni exteriori și împarte 3 dintre ei cu trei hidrogeni. Cei doi rămași stau deasupra ca o „pereche neparticipantă”, iar molecula are formă de piramidă.'),
    s:L('Trigonal pyramidal (AX₃E), H–N–H angle 107°. Polar and a weak base: NH₃ + H₂O ⇌ NH₄⁺ + OH⁻. About 180 million tonnes are made every year, mostly for fertiliser.','Piramidă trigonală (AX₃E), unghi H–N–H de 107°. Polară și bază slabă: NH₃ + H₂O ⇌ NH₄⁺ + OH⁻. Se produc circa 180 de milioane de tone pe an, mai ales pentru îngrășăminte.')},
  {id:'HCl', f:'HCl', counts:{H:1,Cl:1}, name:L('Hydrogen chloride','Clorură de hidrogen'), bond:L('polar covalent, single','covalentă polară, simplă'), shape:L('straight line','linie dreaptă'),
    b:L('Hydrogen and chlorine share electrons. Dissolved in water this makes hydrochloric acid, and your stomach makes some too!','Hidrogenul și clorul își împart electronii. Dizolvat în apă, formează acid clorhidric, iar stomacul tău produce și el puțin!'),
    e:L('Chlorine has 7 outer electrons and needs just 1 more. It shares a pair with hydrogen but pulls it strongly, so the bond is polar. In water the H⁺ breaks off, which makes it an acid.','Clorul are 7 electroni exteriori și mai are nevoie de unul singur. Împarte o pereche cu hidrogenul, dar trage puternic de ea, deci legătura este polară. În apă, H⁺ se desprinde, de aceea este un acid.'),
    s:L('Polar covalent bond (Δχ = 0.96), 127 pm. In water it ionises completely, HCl + H₂O → H₃O⁺ + Cl⁻, a strong acid (pKa ≈ −6).','Legătură covalentă polară (Δχ = 0,96), 127 pm. În apă ionizează complet, HCl + H₂O → H₃O⁺ + Cl⁻, acid tare (pKa ≈ −6).')},
  {id:'NaCl', f:'NaCl', counts:{Na:1,Cl:1}, name:L('Sodium chloride (salt)','Clorură de sodiu (sare)'), bond:L('ionic','ionică'), shape:L('part of a cube-shaped crystal','parte dintr-un cristal în formă de cub'),
    b:L('Sodium gives one electron to chlorine, and then they stick together like magnets. That’s table salt!','Sodiul îi dă un electron clorului, apoi cei doi se lipesc ca niște magneți. Aceasta este sarea de bucătărie!'),
    e:L('Sodium has 1 outer electron it wants to lose; chlorine has 7 and wants one more. Sodium hands its electron over, so sodium becomes Na⁺ and chlorine becomes Cl⁻. Opposite charges attract. This is an ionic bond: giving, not sharing.','Sodiul are 1 electron exterior pe care vrea să-l piardă; clorul are 7 și mai vrea unul. Sodiul își cedează electronul, așa că devine Na⁺, iar clorul devine Cl⁻. Sarcinile opuse se atrag. Aceasta este o legătură ionică: dăruire, nu împărțire.'),
    s:L('Ionic bond (Δχ = 2.23). In the solid each Na⁺ is surrounded by 6 Cl⁻ in a face-centred cubic lattice; the lattice energy is about 787 kJ/mol, hence the high melting point (801 °C).','Legătură ionică (Δχ = 2,23). În solid, fiecare Na⁺ este înconjurat de 6 Cl⁻ într-o rețea cubică cu fețe centrate; energia de rețea este de circa 787 kJ/mol, de unde punctul de topire ridicat (801 °C).')},
  {id:'H2O2', f:'H₂O₂', counts:{H:2,O:2}, name:L('Hydrogen peroxide','Apă oxigenată'), bond:L('covalent, 3 single bonds','covalentă, 3 legături simple'), shape:L('like an open book','ca o carte deschisă'),
    b:L('It’s like water with an extra oxygen! It is used to clean cuts, and it likes to break apart into water and oxygen.','Este ca apa, dar cu un oxigen în plus! Se folosește la curățarea rănilor și se descompune ușor în apă și oxigen.'),
    e:L('The two oxygen atoms are joined by a weak single bond. It breaks easily, which is why hydrogen peroxide releases oxygen bubbles.','Cei doi atomi de oxigen sunt uniți printr-o legătură simplă slabă. Ea se rupe ușor, de aceea apa oxigenată eliberează bule de oxigen.'),
    s:L('Non-planar (“open book”) structure with a dihedral angle of about 111°. The O–O bond energy is only about 146 kJ/mol, so H₂O₂ is a strong oxidiser that decomposes to H₂O and O₂.','Structură neplană („carte deschisă”) cu un unghi diedru de circa 111°. Energia legăturii O–O este de doar circa 146 kJ/mol, așa că H₂O₂ este un oxidant puternic care se descompune în H₂O și O₂.')},
];
const TRAY = ['H','C','N','O','Na','Cl'];

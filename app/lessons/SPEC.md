# Lesson-writing spec for Atom Bench (a chemistry school and lab for ages 8–18, English + Romanian)

You write lesson objects in plain JavaScript, into ONE file named in your task:
`/home/claude/lab/lessons/<name>.js`

The file must contain exactly:

```js
Object.assign(LESSON_BANK, {
  lessonId: { ...lesson... },
  otherId: { ... },
});
```

## Helpers (they already exist globally, do NOT define them)
- `L(en, ro)` → a bilingual text
- `sl(visual, textEn, textRo, headingEn, headingRo)` → one slide
- `tm(termEn, termRo, defEn, defRo)` → one key word
- `qz(questionEn, questionRo, [[answerEn, answerRo], [..], [..]], correctIndex, whyEn, whyRo)` → one quiz question (always exactly 3 answers)

## Lesson object shape (copy this exactly)
```js
bond: {id:'bond', title:L('What is a chemical bond?','Ce este o legătură chimică?'),
  slides:[
    sl({type:'bondshare'}, 'A chemical bond is what holds atoms together. ...', 'Legătura chimică este ...', 'The glue between atoms', 'Lipiciul dintre atomi'),
    sl({type:'shells', els:[1,6,8,10]}, '...', '...', 'Electron shells', 'Straturi de electroni'),
    sl(...), 
  ],
  terms:[tm('chemical bond','legătură chimică','a force that holds atoms together','o forță care ține atomii împreună'), ...],
  quiz:[qz('Which particles make chemical bonds?','Ce particule fac legăturile chimice?', [['protons','protonii'],['electrons','electronii'],['neutrons','neutronii']], 1, 'Bonds are all about the outer electrons.','Legăturile țin de electronii exteriori.'), ...],
  try:{tab:'molecules', label:L('Watch atoms bond','Privește atomii legându-se')}},
```

Rules:
- 3 or 4 slides per lesson. Each slide text is 2–4 sentences (35–75 words in English). Every slide has a short heading (2–5 words). The teacher reads the slide text aloud, so write it as a teacher speaking to the student ("we", "you"), clearly and warmly, with no lists or markdown inside the text.
- 3 to 5 key words per lesson (`terms`).
- 3 quiz questions per lesson, with exactly 3 answers each. Vary which answer index is correct (0, 1 or 2). The "why" explanation is one sentence.
- Pitch the level to the AGE BAND given in your task. For ages 14–16, use GCSE / Romanian grades 9–10 depth and simple formulas. For ages 16–18, use A-level / Romanian grades 11–12 depth: equations, units and correct terminology (Ka, Kc, ΔH, E°, mechanisms and so on). Always be scientifically accurate.
- Romanian must be natural, correct Romanian with full diacritics (ă â î ș ț, using comma-below ș ț). Use Romanian school terminology (for example: legătură covalentă, entalpie, constantă de echilibru, număr de oxidare, electroliză, pilă electrică, izomerie, grupă funcțională, hidrocarburi, alcani, alchene, alchine, arene, esteri, aminoacizi, zaharide, randament, concentrație molară, mol). Use Romanian quotes „…”, and a comma as the decimal separator in Romanian text (6,02 × 10²³).
- Use Unicode subscripts and superscripts in formulas (H₂O, SO₄²⁻, 10²³, ΔH°). Do NOT use HTML.
- Inside JS strings, escape apostrophes as ’ or use typographic ’ (preferred: use the ’ character). Never leave a raw ' inside a single-quoted string.
- Do NOT invent new helpers or fields.
- Safety: never give home instructions for dangerous experiments. It's fine to say "this is only done by trained chemists in a lab".

## `try` links (where the "Try it yourself" button goes)
- `{tab:'atoms', label:L(..)}` opens the atom builder (first 20 elements; protons, neutrons, electrons; ions; isotopes).
- `{tab:'molecules', label:L(..)}` opens the molecule builder (H₂, O₂, N₂, H₂O, CO₂, CH₄, NH₃, HCl, NaCl, H₂O₂).
- `{tab:'lab', mission:'<key>', label:L(..)}` opens the virtual lab with a guided mission. Allowed mission keys (pick the one that fits best):
  - Basics: rule:salt_dissolve, rule:oil_water, rule:soap_emulsion, rule:evaporate:salt, rule:acid_carb:vinegar:soda, indicator:acid, indicator:base, rule:hotice, rule:dryice_water, rule:geyser, rule:magic_milk, rule:slime, rule:milk_curd
  - Reactions and metals: rule:na_water, rule:cs_water, rule:fe_cuso4, rule:cu_ag, rule:zn_acid, rule:zn_cuso4, rule:mg_burn, rule:thermite
  - Acids and bases: rule:neutralize, rule:titration
  - Ions and analysis: rule:agno3_cl, rule:agbr, rule:bacl2, rule:feii_base, rule:fe_scn, rule:cu_amm, rule:flame, rule:golden, rule:limewater, test:h2, test:o2, test:co2
  - Energy: rule:coldpack, rule:hotpack
  - Rates and equilibrium: rule:thio, rule:h2o2_yeast:soap, rule:mno2, rule:iodine_clock, rule:chromate, rule:cocl2_heat
  - Electrochemistry: rule:electrolysis:water, rule:electrolysis:brine, rule:electrolysis:copper, rule:cell
  - Redox colour: rule:traffic, rule:chameleon, rule:luminol, rule:dichromate
  - Organic: rule:bromine, rule:ester, rule:ferment, rule:saponify, rule:benedict, rule:biuret, rule:mirror, rule:iodine_starch, rule:acid_snake
  - Halogens: rule:halogen_disp

## Visuals (the `visual` object in `sl(...)`) — use ONLY these types and params
Existing:
- `{type:'states'}` or `{type:'states', heat:1}`: particles in a solid, liquid and gas
- `{type:'atom', z:6, labels:1}` (Bohr model with labels); `{type:'atom', z:8, empty:1}`; `{type:'atom', z:8, charge:1}`
- `{type:'compare', els:[1,6,8]}`: Bohr atoms side by side (z ≤ 20)
- `{type:'ptable', hl:'all'|'order'|'groups'}`
- `{type:'molecules', list:[...]}`: up to 3 names from TPL
- `{type:'elemcomp', focus:0|1|2}`: element, compound, mixture
- `{type:'bondshare'}`, `{type:'bondionic'}`, `{type:'bondmetal'}`, `{type:'hbond'}`, `{type:'polar'}`, `{type:'polar', oil:1}`
- `{type:'dissolve'}`, `{type:'evap'}`, `{type:'change', side:0|1}`, `{type:'signs'}`
- `{type:'reaction', spec:{from:[...], to:[...]}}`: animated atoms swapping partners. Atoms MUST balance. Only use these TPL names: H2O H2 O2 N2 CO2 CH4 NH3 HCl NaCl H2O2 Na K Mg Fe Cu Li Cs Al Ag Na+ K+ Cl- H+ Ca2+ Mg2+ Fe2+ Fe3+ Cu2+ Ag+ Al3+ Pb2+ I- OH- NO3- SO4 SCN- NaOH KOH LiOH CsOH NaHCO3 HCO3- CH3COOH CH3COONa CaCO3 CaCO3n CuSO4 CuOH2 AgCl AgI PbI2 MgO Na2CO3 FeSCN FeOH3 Fe2O3 Al2O3 catalase
- `{type:'phscale'}`, `{type:'phscale', marks:1}`, `{type:'phscale', cabbage:1}`
- `{type:'energy', mode:'exo'|'endo'}` with optional `act:1` (activation-energy arrow) and `cat:1` (catalyst path)
- `{type:'collisions'}` or `{type:'collisions', two:1}` (cold vs hot)
- `{type:'shells', els:[3,11,19], glow:1}`: Bohr atoms in a row (z ≤ 20)
- `{type:'mole', stage:0|1|2}`, `{type:'redox'}`, `{type:'redox', battery:1}`, `{type:'lattice'}`
- `{type:'chain', n:1}`, `{type:'chain', grow:1}`, `{type:'chain', polymer:1}`
New (being built now; use them freely):
- `{type:'lab', show:'equipment'|'hazards'}`: lab glassware and tools / hazard pictograms
- `{type:'separate', method:'filter'|'distil'|'chrom'|'crystal'}`
- `{type:'cycle', kind:'states'|'water'}`: changes of state with named arrows / the water cycle
- `{type:'materials'}`: cards of materials with properties (metal, glass, plastic, wood, rubber, ceramic)
- `{type:'reacttype', kind:'combine'|'decompose'|'displace'|'exchange'}`: A + B → AB style blocks
- `{type:'series', hl:['Mg','Cu']}`: reactivity series ladder K Na Li Ca Mg Al C Zn Fe Sn Pb H Cu Ag Au
- `{type:'fire'}`: fire triangle (fuel, oxygen, heat) and combustion
- `{type:'air', mode:'air'|'greenhouse'}`: composition of air pie / greenhouse effect
- `{type:'config', z:11}`: orbital boxes 1s 2s 2p 3s 3p 4s 3d filled for element z (z ≤ 30)
- `{type:'orbitals', show:'s'|'p'|'sp'}`
- `{type:'structures', focus:0|1|2|3}`: giant ionic, simple molecular, giant covalent (diamond/graphite), metallic
- `{type:'vsepr', shapes:['linear','trigonal','tetrahedral','pyramidal','bent','octahedral']}`: up to 4 shapes, with bond angles
- `{type:'calc', lines:['n = m / M', 'n = 18 g ÷ 18 g/mol', 'n = 1 mol']}`: worked calculation revealed line by line (max 5 lines, each ≤ 42 characters; plain maths, so they work in both languages; decimals written with a point)
- `{type:'titration', type2:'strong'|'weak'}`: burette and pH curve with equivalence point
- `{type:'gas', law:'boyle'|'charles'}`: piston with particles
- `{type:'electrolysis', el:'water'|'brine'|'copper'}`
- `{type:'cell'}`: Daniell cell Zn|Cu with voltmeter
- `{type:'equil'}` or `{type:'equil', shift:1}`: A ⇌ B particles and a concentration–time graph levelling off (shift = a disturbance and a new equilibrium)
- `{type:'mb'}`, `{type:'mb', temp:1}`, `{type:'mb', cat:1}`: Maxwell–Boltzmann distribution with Ea
- `{type:'hess'}`: enthalpy cycle
- `{type:'gibbs'}`: ΔG = ΔH − TΔS with a sign table
- `{type:'complex'}`: octahedral complex ion and coloured transition-metal solutions
- `{type:'mechanism', kind:'radical'|'addition'|'subst'}`: curly-arrow steps
- `{type:'chiral'}`: mirror-image enantiomers
- `{type:'benzene'}`
- `{type:'func', hl:['alcohol','acid']}`: functional-group cards; keys: alkane alkene alkyne alcohol aldehyde ketone acid ester amine amide halo arene
- `{type:'isomers'}`: butane vs methylpropane
- `{type:'spectrum', kind:'ir'|'nmr'|'ms'}`
- `{type:'decay', mode:'decay'|'halflife'}`
- `{type:'dna', mode:'protein'|'dna'}`
- `{type:'crude', mode:'fractions'|'cracking'}`
- `{type:'bromine'}`: bromine water with an alkane (stays orange) vs an alkene (decolourises)
- `{type:'ptrend', trend:'radius'|'ie'|'en'}`: periodic-table heat map of a trend
- `{type:'recycle'}`: life-cycle / recycling loop

## Check your file before finishing
Run this in bash (it must print OK):
```
cd /home/claude/lab/lessons && node -e "global.LESSON_BANK={};global.L=(e,r)=>({en:e,ro:r});global.sl=(v,a,b,c,d)=>({v,t:L(a,b),h:c?L(c,d):null});global.tm=(a,b,c,d)=>[L(a,b),L(c,d)];global.qz=(q,r,a,c,w,x)=>({q:L(q,r),a:a.map(z=>L(z[0],z[1])),c,why:L(w,x)});require('./<name>.js');const ks=Object.keys(LESSON_BANK);for(const k of ks){const l=LESSON_BANK[k];if(l.id!==k||!l.slides||l.slides.length<3||l.quiz.length<3||!l.try)throw k;for(const q of l.quiz)if(q.a.length!==3)throw k+' quiz';}console.log('OK',ks.join(','))"
```
Then reply with the list of lesson ids you wrote (nothing else).

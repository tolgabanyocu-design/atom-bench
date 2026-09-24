// ===================== i18n + storage =====================
const store = {
  get(k, d){ try{ const v = localStorage.getItem('atombench.'+k); return v == null ? d : JSON.parse(v); }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem('atombench.'+k, JSON.stringify(v)); }catch(e){} }
};
let LANG = store.get('lang', 'en');
let LEVEL = store.get('level', 1); // 0 beginner, 1 explorer, 2 scientist
const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const S = {
  tagline:{en:'Virtual chemistry lab', ro:'Laborator virtual de chimie'},
  tabLab:{en:'Lab', ro:'Laborator'}, tabAtoms:{en:'Atoms', ro:'Atomi'}, tabMols:{en:'Molecules', ro:'Molecule'},
  level:{en:'Level', ro:'Nivel'},
  lvl0:{en:'Beginner', ro:'Începător'}, lvl1:{en:'Explorer', ro:'Explorator'}, lvl2:{en:'Scientist', ro:'Om de știință'},
  shelf:{en:'Chemicals shelf', ro:'Raftul cu substanțe'},
  fAll:{en:'All', ro:'Toate'}, fKitchen:{en:'Kitchen', ro:'Bucătărie'}, fLab:{en:'Lab', ro:'Laborator'},
  safeHome:{en:'Kitchen', ro:'Bucătărie'}, safeAdult:{en:'With an adult', ro:'Cu un adult'}, safeLab:{en:'Lab only', ro:'Doar laborator'},
  temp:{en:'Temperature', ro:'Temperatură'},
  heatOn:{en:'Light burner', ro:'Aprinde arzătorul'}, heatOff:{en:'Turn off burner', ro:'Stinge arzătorul'},
  stir:{en:'Stir', ro:'Amestecă'}, wash:{en:'Wash beaker', ro:'Spală paharul'}, seeAtoms:{en:'See the atoms', ro:'Vezi atomii'},
  inBeaker:{en:'In the beaker:', ro:'În pahar:'}, emptyBeaker:{en:'The beaker is empty. Tap or drag something from the shelf.', ro:'Paharul este gol. Atinge sau trage ceva de pe raft.'},
  sour:{en:'Sour', ro:'Acru'}, soapy:{en:'Soapy', ro:'Săpunos'}, neutral:{en:'Neutral', ro:'Neutru'},
  acidic:{en:'acidic', ro:'acid'}, basic:{en:'basic', ro:'bazic'},
  sourScale:{en:'Sour or soapy?', ro:'Acru sau săpunos?'},
  mission:{en:'Mission {n} of {total}', ro:'Misiunea {n} din {total}'},
  showHint:{en:'Show a hint', ro:'Arată un indiciu'}, prev:{en:'Back', ro:'Înapoi'}, next:{en:'Next mission', ro:'Misiunea următoare'},
  cleanStart:{en:'Clean beaker & start', ro:'Spală paharul și începe'},
  missionDone:{en:'Mission complete!', ro:'Misiune îndeplinită!'},
  allDone:{en:'You finished every mission! Keep exploring: there are more reactions to discover.', ro:'Ai terminat toate misiunile! Continuă să explorezi: mai sunt reacții de descoperit.'},
  stars:{en:'{n} stars', ro:'{n} stele'},
  whatHappened:{en:'What happened?', ro:'Ce s-a întâmplat?'},
  chemical:{en:'Chemical reaction', ro:'Reacție chimică'}, physical:{en:'Physical change', ro:'Transformare fizică'}, noReaction:{en:'No reaction', ro:'Nicio reacție'},
  newSub:{en:'New substance on the bench', ro:'Substanță nouă pe masă'},
  wordEq:{en:'Word equation', ro:'Ecuația în cuvinte'}, chemEq:{en:'Chemical equation', ro:'Ecuația chimică'},
  exo:{en:'Gives off heat (exothermic)', ro:'Degajă căldură (exotermă)'}, endo:{en:'Takes in heat (endothermic)', ro:'Absoarbe căldură (endotermă)'},
  realWorld:{en:'In real life', ro:'În viața reală'},
  sHome:{en:'Safe to try at home with an adult.', ro:'Poți încerca acasă, împreună cu un adult.'},
  sAdult:{en:'Only with an adult and safety glasses.', ro:'Doar cu un adult și cu ochelari de protecție.'},
  sLab:{en:'Dangerous! Only trained chemists, in a real lab.', ro:'Periculos! Doar chimiști pregătiți, într-un laborator adevărat.'},
  sigGas:{en:'Bubbles', ro:'Bule'}, sigColor:{en:'Colour change', ro:'Schimbare de culoare'}, sigSolid:{en:'New solid', ro:'Solid nou'},
  sigHeat:{en:'Heat', ro:'Căldură'}, sigLight:{en:'Light', ro:'Lumină'}, sigCold:{en:'Gets cold', ro:'Se răcește'}, sigSmell:{en:'Smell', ro:'Miros'},
  signsTitle:{en:'Signs of a chemical reaction', ro:'Semnele unei reacții chimice'},
  then:{en:'And then…', ro:'Și apoi…'},
  disc:{en:'Discoveries', ro:'Descoperiri'}, discHelp:{en:'Every new reaction you find is saved here. Tap one to read it again.', ro:'Fiecare reacție nouă pe care o găsești apare aici. Atinge una ca s-o citești din nou.'},
  undiscovered:{en:'{n} still hidden', ro:'încă {n} ascunse'},
  addedTitle:{en:'{Name} is in the beaker', ro:'În pahar: {name}'},
  addedNext:{en:'Now add something else and watch what happens!', ro:'Acum adaugă altceva și vezi ce se întâmplă!'},
  noneTitle:{en:'No reaction, just a mixture', ro:'Nicio reacție, doar un amestec'},
  noneB:{en:'{Name} and {others} just mixed together. No bubbles, no colour change, no heat. Nothing new was made, so this is a mixture.', ro:'{Name} și {others} doar s-au amestecat. Fără bule, fără schimbare de culoare, fără căldură. Nu s-a format nimic nou, deci este un amestec.'},
  noneE:{en:'Chemists look for signs of a reaction: gas bubbles, a colour change, a new solid, heat or light. None of those happened here, so each substance is still itself.', ro:'Chimiștii caută semnele unei reacții: bule de gaz, schimbare de culoare, un solid nou, căldură sau lumină. Nimic din toate acestea nu s-a întâmplat aici, deci fiecare substanță a rămas ce era.'},
  noneS:{en:'Without a driving force, such as a more stable product, a gas escaping, a precipitate forming or a weak electrolyte forming, the particles simply coexist.', ro:'Fără o forță motrice, cum ar fi un produs mai stabil, un gaz care se degajă, un precipitat sau un electrolit slab care se formează, particulele doar coexistă.'},
  heatNoTitle:{en:'Just getting hot', ro:'Doar se încălzește'},
  heatNoB:{en:'The heat warmed everything up, but nothing new was made.', ro:'Căldura a încălzit totul, dar nu s-a format nimic nou.'},
  nothingLeft:{en:'nothing, it was pure water!', ro:'nimic, era apă curată!'},
  and:{en:'and', ro:'și'},
  // professor lines
  pGreet:{en:'Hi! I’m <b>Professor Ion</b>, named after the ions in chemistry! Let’s start with your first mission.', ro:'Salut! Eu sunt <b>Profesoara Iona</b>, ca ionii din chimie! Hai să începem cu prima misiune.'},
  pReact:[{en:'Whoa, did you see that?', ro:'Uau, ai văzut?'},{en:'Now <b>that</b> is chemistry!', ro:'<b>Asta</b> da chimie!'},{en:'Look closely at what changed!', ro:'Uită-te atent la ce s-a schimbat!'},{en:'New substances were made. Read below how!', ro:'S-au format substanțe noi. Citește mai jos cum!'}],
  pPhys:{en:'Something changed, but no new substance was made. Chemists call that a physical change.', ro:'Ceva s-a schimbat, dar nu s-a format o substanță nouă. Chimiștii numesc asta transformare fizică.'},
  pNone:{en:'Hmm, no reaction. That’s a result too! Read why below.', ro:'Hmm, nicio reacție. Și acesta e un rezultat! Citește mai jos de ce.'},
  pAdded:{en:'Good. What will you add next?', ro:'Bun. Ce adaugi mai departe?'},
  pMission:{en:'Mission complete! Ready for the next one?', ro:'Misiune îndeplinită! Treci la următoarea?'},
  pFull:{en:'The beaker is full. Wash it to keep experimenting.', ro:'Paharul este plin. Spală-l ca să continui experimentele.'},
  pWash:{en:'Squeaky clean! What shall we mix next?', ro:'Curat lună! Ce amestecăm acum?'},
  pHeat:{en:'Burner on. Keep an eye on the thermometer!', ro:'Arzătorul este pornit. Urmărește termometrul!'},
  pHeatEmpty:{en:'Heating an empty beaker does nothing. Add something first!', ro:'Dacă încălzești un pahar gol, nu se întâmplă nimic. Adaugă ceva mai întâi!'},
  pBoil:{en:'It’s boiling! The water is turning into steam.', ro:'Fierbe! Apa se transformă în abur.'},
  pOil:{en:'The oil is very hot now. In real life hot oil can catch fire, so never leave it alone!', ro:'Uleiul e foarte fierbinte acum. În realitate, uleiul încins poate lua foc, deci nu-l lăsa niciodată nesupravegheat!'},
  pStir:{en:'Stirring helps things mix and dissolve faster.', ro:'Amestecatul ajută substanțele să se amestece și să se dizolve mai repede.'},
  pBusy:{en:'One at a time! Let’s watch this first.', ro:'Pe rând! Hai să vedem întâi asta.'},
  pLab:{en:'Remember: this one is for trained chemists only. In our virtual lab it’s perfectly safe!', ro:'Ține minte: asta e doar pentru chimiști pregătiți. În laboratorul nostru virtual este complet sigur!'},
  // zoom
  zoomTitle:{en:'Zoom into the atoms', ro:'Privește atomii de aproape'},
  before:{en:'Before', ro:'Înainte'}, after:{en:'After', ro:'După'},
  conserve:{en:'Atoms are never created or destroyed. They just swap partners!', ro:'Atomii nu se creează și nu se distrug. Doar își schimbă partenerii!'},
  conserveS:{en:'Count the atoms: the same number of each element before and after. That is why equations must balance (conservation of mass).', ro:'Numără atomii: același număr din fiecare element înainte și după. De aceea ecuațiile trebuie egalate (conservarea masei).'},
  replay:{en:'Play again', ro:'Din nou'}, close:{en:'Close', ro:'Închide'},
  // atoms tab
  pickElement:{en:'Pick an element', ro:'Alege un element'}, first20:{en:'The first 20 elements', ro:'Primele 20 de elemente'},
  protons:{en:'Protons', ro:'Protoni'}, neutrons:{en:'Neutrons', ro:'Neutroni'}, electrons:{en:'Electrons', ro:'Electroni'},
  atomicNo:{en:'Atomic number', ro:'Număr atomic'}, massNo:{en:'Mass number', ro:'Număr de masă'}, charge:{en:'Charge', ro:'Sarcină'}, outerE:{en:'Outer electrons', ro:'Electroni exteriori'},
  neutralAtom:{en:'Neutral atom', ro:'Atom neutru'}, posIon:{en:'Positive ion', ro:'Ion pozitiv'}, negIon:{en:'Negative ion', ro:'Ion negativ'},
  stable:{en:'Stable', ro:'Stabil'}, unstable:{en:'Unstable (radioactive)', ro:'Instabil (radioactiv)'},
  noAtom:{en:'No protons yet. Add a proton to make an atom!', ro:'Încă nu există protoni. Adaugă un proton ca să faci un atom!'},
  config:{en:'Electron configuration', ro:'Configurație electronică'},
  catAlkali:{en:'Alkali metal', ro:'Metal alcalin'}, catEarth:{en:'Alkaline earth metal', ro:'Metal alcalino-pământos'}, catNonmetal:{en:'Non-metal', ro:'Nemetal'}, catNoble:{en:'Noble gas', ro:'Gaz nobil'}, catHalogen:{en:'Halogen', ro:'Halogen'}, catMetalloid:{en:'Metalloid', ro:'Semimetal'}, catMetal:{en:'Other metal', ro:'Alt metal'},
  didYouKnow:{en:'Did you know?', ro:'Știai că?'},
  // molecules
  trayTitle:{en:'Atom tray', ro:'Tava cu atomi'},
  trayHelp:{en:'Tap an atom to add it to the box. Tap an atom in the box to take it out.', ro:'Atinge un atom ca să-l pui în cutie. Atinge un atom din cutie ca să-l scoți.'},
  clear:{en:'Empty the box', ro:'Golește cutia'}, challenges:{en:'Molecules to build', ro:'Molecule de construit'},
  bond:{en:'Bond', ro:'Legătură'}, shape:{en:'Shape', ro:'Formă'},
  molStart:{en:'Build a molecule', ro:'Construiește o moleculă'},
  molStartB:{en:'Molecules are atoms holding on to each other. Try 2 hydrogen (H) and 1 oxygen (O).', ro:'Moleculele sunt atomi care se țin unii de alții. Încearcă 2 hidrogen (H) și 1 oxigen (O).'},
  molUnknown:{en:'Not a molecule on our list yet', ro:'Încă nu e o moleculă din lista noastră'},
  molUnknownB:{en:'Keep going, or take some atoms out. Look at the list of molecules to build for ideas.', ro:'Continuă sau scoate câțiva atomi. Uită-te la lista de molecule pentru idei.'},
  molBuilt:{en:'You built it!', ro:'Ai construit-o!'},
};

function tr(o){ if(o == null) return ''; if(typeof o === 'string') return o; return o[LANG] != null ? o[LANG] : o.en; }
function fill(str, vars){ return vars ? str.replace(/\{(\w+)\}/g, (m, k) => vars[k] !== undefined ? vars[k] : m) : str; }
function t(key, vars){ const o = S[key]; return fill(o ? tr(o) : key, vars); }
function cap(s){ return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
function lv(o){ // pick level text from {b,e,s}
  if(!o) return '';
  return tr(LEVEL === 0 ? o.b : LEVEL === 1 ? (o.e || o.b) : (o.s || o.e || o.b));
}
function esc(s){ return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function joinList(arr){
  if(arr.length <= 1) return arr.join('');
  return arr.slice(0, -1).join(', ') + ' ' + t('and') + ' ' + arr[arr.length - 1];
}

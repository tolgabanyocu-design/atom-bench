// ===================== Intro card (welcome modal) =====================
const INTRO = {open:false, wasPlaying:false, lastFocus:null};
const INTRO_T = {
  about:L('About','Despre'),
  aboutAria:L('About Atom Bench','Despre Atom Bench'),
  eyebrow:L('Welcome to','Bun venit la'),
  tagline:L('A virtual chemistry lab and school','Un laborator și o școală virtuală de chimie'),
  lead:L('Mix real substances safely in a realistic virtual lab and see what really happens: colours change, liquids fizz, flames flare and crystals grow. Then learn why in a full chemistry course with animated lessons, quizzes and a teacher who talks you through everything and answers your questions.',
         'Amestecă în siguranță substanțe reale într-un laborator virtual realist și vezi ce se întâmplă cu adevărat: culorile se schimbă, lichidele fac spumă, flăcările se aprind și cristalele cresc. Apoi află de ce, într-un curs complet de chimie cu lecții animate, teste și un profesor care îți explică totul și îți răspunde la întrebări.'),
  ages:L('For ages 8 to 18','Pentru vârste între 8 și 18 ani'),
  chooseLevel:L('Choose your level','Alege nivelul'),
  lvlAges:[L('ages 8–11','8–11 ani'), L('ages 11–14','11–14 ani'), L('ages 14–18','14–18 ani')],
  language:L('Language','Limba'),
  teachers:L('Your teacher','Profesorul tău'),
  teachersNote:L('Professor Ion reads the lessons aloud in English. In Romanian, lessons are text only for now: a natural Romanian voice is coming soon.','Profesorul Ion citește lecțiile cu voce tare în engleză. În română, deocamdată lecțiile sunt doar text: o voce românească naturală vine în curând.'),
  ionName:L('Professor Ion','Profesorul Ion'), ionaName:'Profesoara Iona',
  ionRole:L('Teaches in English and Romanian','Predă în engleză și română'), ionaRole:L('Teaches in Romanian','Predă în română'),
  ionLine:L('“Hi! I’m named after the ions. Let’s find out what everything is made of!”','„Salut! Numele meu vine de la ioni. Hai să aflăm din ce e făcut totul!”'),
  ionaLine:L('“Hello! I’ll take you step by step, with real experiments.”','„Bună! Te învăț chimie pas cu pas, cu experimente adevărate.”'),
  curriculum:L('The curriculum','Programa'),
  curNote:L('Follows the UK national curriculum, GCSE and A-level, and the Romanian school programme (gimnaziu cls. VII–VIII, liceu IX–XII).',
            'Urmează programa națională din Marea Britanie (GCSE și A-level) și programa școlară din România (gimnaziu cls. VII–VIII, liceu IX–XII).'),
  stage:L('Stage','Etapa'),
  cando:L('What you can do','Ce poți face'),
  c1n:'60', c1:L('lessons with quizzes','lecții cu teste'),
  c2n:'150+', c2:L('lab reactions and 60+ guided experiments','reacții de laborator și peste 60 de experimente ghidate'),
  c3n:'2', c3:L('builders: atoms and molecules','constructori: atomi și molecule'),
  c4n:'?', c4:L('ask the teacher anything','întreabă profesorul orice'),
  start:L('Start the class','Începe ora'),
  lab:L('Go to the lab','Mergi în laborator'),
  close:L('Close','Închide'),
};
const INTRO_STAGES = [
  {n:1, name:L('Discover','Descoperă'), ages:L('ages 8–11','8–11 ani'), col:'#23945A',
   topics:[L('Matter','Materia'),L('Atoms','Atomi'),L('Elements','Elemente'),L('Molecules','Molecule'),L('Materials','Materiale'),L('Changes of state','Stări de agregare'),L('Mixtures and separating','Amestecuri și separare'),L('Lab safety','Siguranța în laborator')]},
  {n:2, name:L('Foundations','Fundamente'), ages:L('ages 11–14','11–14 ani'), col:'#1A74B3',
   topics:[L('Bonds','Legături'),L('The periodic table','Tabelul periodic'),L('Reactions and equations','Reacții și ecuații'),L('Energy and reaction speed','Energie și viteza reacțiilor'),L('Acids, bases and salts','Acizi, baze și săruri'),L('Metals and reactivity','Metale și reactivitate'),L('Combustion','Arderea'),L('Earth and air','Pământul și aerul')]},
  {n:3, name:L('Core chemistry','Chimie de bază'), ages:L('ages 14–16','14–16 ani'), col:'#E9821C',
   topics:[L('Structure and bonding','Structură și legături'),L('Moles and calculations','Moli și calcule'),L('Concentration','Concentrația'),L('Redox','Redox'),L('Electrolysis','Electroliza'),L('Cells','Pile electrice'),L('Equilibrium','Echilibrul chimic'),L('Gases','Gaze'),L('Organic chemistry','Chimie organică'),L('Chemical analysis','Analiză chimică'),L('Sustainability','Sustenabilitate')]},
  {n:4, name:L('Advanced','Avansat'), ages:L('ages 16–18','16–18 ani'), col:'#8a3fb0',
   topics:[L('Orbitals','Orbitali'),L('Shapes of molecules','Forma moleculelor'),L('Forces between molecules','Forțe intermoleculare'),L('Thermodynamics','Termodinamică'),L('Kinetics','Cinetică'),L('Equilibrium constants','Constante de echilibru'),L('pH and buffers','pH și soluții tampon'),L('Electrode potentials','Potențiale de electrod'),L('Transition metals','Metale tranziționale'),L('Reaction mechanisms','Mecanisme de reacție'),L('Isomers','Izomeri'),L('Aromatic compounds','Compuși aromatici'),L('Polymers','Polimeri'),L('Spectroscopy','Spectroscopie'),L('Nuclear chemistry','Chimie nucleară')]},
];
function it_(k){ return tr(INTRO_T[k]); }

function renderIntro(){
  const box = document.getElementById('introCard'); if(!box) return;
  box.querySelectorAll('[data-it]').forEach(el => { el.textContent = it_(el.dataset.it); });
  box.querySelectorAll('[data-it-aria]').forEach(el => { el.setAttribute('aria-label', it_(el.dataset.itAria)); });
  box.querySelectorAll('#introLevel button').forEach(b => {
    const k = +b.dataset.level; b.setAttribute('aria-pressed', String(k === LEVEL));
    b.innerHTML = '<b>' + esc(t('lvl' + k)) + '</b><small>' + esc(tr(INTRO_T.lvlAges[k])) + '</small>';
  });
  box.querySelectorAll('#introLang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === LANG)));
  document.getElementById('introStages').innerHTML = INTRO_STAGES.map(s =>
    '<li class="ic-stage" style="--sc:' + s.col + '"><div class="ic-stage-h"><span class="ic-num">' + s.n + '</span><div><b>' + esc(tr(s.name)) + '</b><small>' + esc(tr(s.ages)) + '</small></div></div>' +
    '<ul class="ic-chips">' + s.topics.map(x => '<li>' + esc(tr(x)) + '</li>').join('') + '</ul></li>').join('');
  const ab = document.getElementById('introAboutBtn'); if(ab){ ab.querySelector('span').textContent = it_('about'); ab.setAttribute('aria-label', it_('aboutAria')); }
}
function introFocusables(){ return [...document.querySelectorAll('#introCard button, #introCard [href], #introCard [tabindex]:not([tabindex="-1"])')].filter(el => !el.disabled && el.offsetParent !== null); }
function openIntro(){
  const box = document.getElementById('introCard'); if(!box || INTRO.open) return;
  INTRO.open = true; INTRO.lastFocus = document.activeElement;
  INTRO.wasPlaying = TAB === 'course' && CR.lesson && CR.mode === 'slides' && !CR.paused;
  if(CR.lesson && CR.mode === 'slides') pauseLesson(); else courseLeave();
  stopSpeak();
  renderIntro();
  box.hidden = false; document.documentElement.classList.add('intro-lock');
  const sc = box.querySelector('.ic-scroll'); if(sc) sc.scrollTop = 0;
  requestAnimationFrame(() => { box.classList.add('show'); const p = document.getElementById('introStart'); if(p) p.focus({preventScroll:true}); });
}
// mode: 'class' (default: start/resume the lesson) | 'lab' (go to the lab)
function closeIntro(mode){
  const box = document.getElementById('introCard'); if(!box || !INTRO.open) return;
  INTRO.open = false; box.classList.remove('show'); box.hidden = true; document.documentElement.classList.remove('intro-lock');
  store.set('seenIntro', true);
  // this runs inside a click/key handler: a user gesture, so speech may start now
  if(typeof onFirstGesture === 'function') onFirstGesture();
  if(mode === 'lab'){ switchTab('lab'); return; }
  switchTab('course');
  if(CR.lesson && CR.mode === 'slides'){ CR.t0 = nowS(); playLesson(); }
  updateTapHint();
  const f = document.querySelector('#lessonPlay'); if(f && f.offsetParent) f.focus({preventScroll:true});
}
function bindIntro(){
  const box = document.getElementById('introCard'); if(!box) return;
  box.addEventListener('click', e => {
    if(e.target === box){ closeIntro('class'); return; }
    const l = e.target.closest('#introLang button[data-lang]');
    if(l){ if(l.dataset.lang !== LANG){ const tb = document.querySelector('#langSeg button[data-lang="' + l.dataset.lang + '"]'); if(tb) tb.click(); } renderIntro(); return; }
    const v = e.target.closest('#introLevel button[data-level]');
    if(v){ if(+v.dataset.level !== LEVEL){ const tb = document.querySelector('#levelSeg button[data-level="' + v.dataset.level + '"]'); if(tb) tb.click(); } renderIntro(); return; }
  });
  document.getElementById('introStart').addEventListener('click', () => closeIntro('class'));
  document.getElementById('introClose').addEventListener('click', () => closeIntro('class'));
  document.getElementById('introLab').addEventListener('click', () => closeIntro('lab'));
  document.addEventListener('keydown', e => {
    if(!INTRO.open) return;
    if(e.key === 'Escape'){ e.preventDefault(); e.stopPropagation(); closeIntro('class'); return; }
    if(e.key === 'Tab'){
      const f = introFocusables(); if(!f.length) return;
      const a = f[0], z = f[f.length - 1];
      if(e.shiftKey && (document.activeElement === a || !box.contains(document.activeElement))){ e.preventDefault(); z.focus(); }
      else if(!e.shiftKey && (document.activeElement === z || !box.contains(document.activeElement))){ e.preventDefault(); a.focus(); }
    }
  }, true);
  // topbar: brand reopens the card, plus a small About button
  const brand = document.querySelector('.topbar .brand');
  if(brand){ brand.classList.add('brand-btn'); brand.setAttribute('role', 'button'); brand.tabIndex = 0; brand.setAttribute('aria-haspopup', 'dialog');
    brand.addEventListener('click', openIntro);
    brand.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openIntro(); } }); }
  const settings = document.querySelector('.topbar .settings');
  if(settings && !document.getElementById('introAboutBtn')){
    const b = document.createElement('button'); b.id = 'introAboutBtn'; b.className = 'about-btn'; b.type = 'button'; b.setAttribute('aria-haspopup', 'dialog');
    b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v6"/><circle cx="12" cy="7.4" r=".6" fill="currentColor"/></svg><span></span>';
    b.addEventListener('click', openIntro);
    settings.appendChild(b);
  }
  // keep the card in sync if language/level change elsewhere
  ['#langSeg', '#levelSeg'].forEach(s => { const el = document.querySelector(s); if(el) el.addEventListener('click', () => { if(INTRO.open) renderIntro(); else setTimeout(renderIntro, 0); }); });
  renderIntro();
}

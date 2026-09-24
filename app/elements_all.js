// ===================== all 118 elements =====================
// [Z, symbol, nameEn, nameRo, neutronsOfMostCommonIsotope, category, period, group, factEn, factRo, shells]
// group is null for lanthanides (57-71) and actinides (89-103); they sit in the f-block rows.
const ELEMENTS_ALL = [
  [1,'H','Hydrogen','Hidrogen',0,'nonmetal',1,1,'The lightest element. Stars like our Sun are mostly hydrogen.','Cel mai ușor element. Stelele, ca Soarele nostru, sunt formate mai ales din hidrogen.',[1]],
  [2,'He','Helium','Heliu',2,'noble',1,18,'It makes balloons float and voices sound squeaky.','Face baloanele să plutească și vocea să sune pițigăiat.',[2]],
  [3,'Li','Lithium','Litiu',4,'alkali',2,1,'It powers the batteries in phones and tablets.','Alimentează bateriile telefoanelor și tabletelor.',[2,1]],
  [4,'Be','Beryllium','Beriliu',5,'earth',2,2,'A light, stiff metal used in the mirrors of space telescopes.','Un metal ușor și rigid, folosit la oglinzile telescoapelor spațiale.',[2,2]],
  [5,'B','Boron','Bor',6,'metalloid',2,13,'Found in heat-proof glass for ovens.','Se găsește în sticla termorezistentă pentru cuptor.',[2,3]],
  [6,'C','Carbon','Carbon',6,'nonmetal',2,14,'In every living thing, and in diamonds and pencil lead.','În orice ființă vie, dar și în diamante și în mina creionului.',[2,4]],
  [7,'N','Nitrogen','Azot',7,'nonmetal',2,15,'It makes up 78% of the air you breathe.','Formează 78% din aerul pe care îl respiri.',[2,5]],
  [8,'O','Oxygen','Oxigen',8,'nonmetal',2,16,'You need it to live. It is 21% of the air.','Ai nevoie de el ca să trăiești. Formează 21% din aer.',[2,6]],
  [9,'F','Fluorine','Fluor',10,'halogen',2,17,'In toothpaste, where it helps protect your teeth.','În pasta de dinți, unde ajută la protejarea dinților.',[2,7]],
  [10,'Ne','Neon','Neon',10,'noble',2,18,'It glows red-orange in neon signs.','Strălucește roșu-portocaliu în reclamele cu neon.',[2,8]],
  [11,'Na','Sodium','Sodiu',12,'alkali',3,1,'Half of table salt. A soft metal you can cut with a knife.','Jumătate din sarea de bucătărie. Un metal moale, care se taie cu cuțitul.',[2,8,1]],
  [12,'Mg','Magnesium','Magneziu',12,'earth',3,2,'Burns with a dazzling white light, and sits inside chlorophyll in green leaves.','Arde cu o lumină albă orbitoare și se află în clorofila din frunzele verzi.',[2,8,2]],
  [13,'Al','Aluminium','Aluminiu',14,'metal',3,13,'Drink cans and kitchen foil are made of it.','Dozele de băuturi și folia de bucătărie sunt făcute din el.',[2,8,3]],
  [14,'Si','Silicon','Siliciu',14,'metalloid',3,14,'In sand, and in every computer chip.','În nisip și în fiecare cip de computer.',[2,8,4]],
  [15,'P','Phosphorus','Fosfor',16,'nonmetal',3,15,'On the side of every matchbox.','Pe marginea fiecărei cutii de chibrituri.',[2,8,5]],
  [16,'S','Sulfur','Sulf',16,'nonmetal',3,16,'Yellow. Some of its compounds smell like rotten eggs.','Galben. Unii dintre compușii lui miros a ouă stricate.',[2,8,6]],
  [17,'Cl','Chlorine','Clor',18,'halogen',3,17,'Keeps swimming pools clean, and is the other half of table salt.','Ține curată apa din piscine și este cealaltă jumătate a sării de bucătărie.',[2,8,7]],
  [18,'Ar','Argon','Argon',22,'noble',3,18,'Almost 1% of the air. It is used inside some light bulbs.','Aproape 1% din aer. Se folosește în unele becuri.',[2,8,8]],
  [19,'K','Potassium','Potasiu',20,'alkali',4,1,'Bananas are full of it.','Bananele sunt pline de potasiu.',[2,8,8,1]],
  [20,'Ca','Calcium','Calciu',20,'earth',4,2,'It builds your bones and teeth.','Îți construiește oasele și dinții.',[2,8,8,2]],
  [21,'Sc','Scandium','Scandiu',24,'transition',4,3,'Mixed into aluminium, it makes light, strong bike frames and baseball bats.','Adăugat în aluminiu, dă cadre de bicicletă și bâte de baseball ușoare și rezistente.',[2,8,9,2]],
  [22,'Ti','Titanium','Titan',26,'transition',4,4,'As strong as steel but much lighter. Used in planes and hip replacements.','La fel de rezistent ca oțelul, dar mult mai ușor. Se folosește la avioane și la proteze de șold.',[2,8,10,2]],
  [23,'V','Vanadium','Vanadiu',28,'transition',4,5,'A pinch of it makes steel tough enough for wrenches and car springs.','Puțin vanadiu face oțelul destul de dur pentru chei fixe și arcurile mașinilor.',[2,8,11,2]],
  [24,'Cr','Chromium','Crom',28,'transition',4,6,'Gives shiny car parts their mirror finish and keeps stainless steel from rusting.','Dă strălucirea de oglindă pieselor de mașină și ferește oțelul inoxidabil de rugină.',[2,8,13,1]],
  [25,'Mn','Manganese','Mangan',30,'transition',4,7,'Found in steel rails and in ordinary AA batteries.','Se găsește în șinele de oțel și în bateriile obișnuite de tip AA.',[2,8,13,2]],
  [26,'Fe','Iron','Fier',30,'transition',4,8,'The main metal in steel. It also carries oxygen in your blood and makes it red.','Metalul de bază al oțelului. Tot el duce oxigenul în sânge și îl face roșu.',[2,8,14,2]],
  [27,'Co','Cobalt','Cobalt',32,'transition',4,9,'Gives glass and pottery a deep blue colour, and is used in rechargeable batteries.','Colorează sticla și ceramica în albastru intens și se folosește în acumulatori.',[2,8,15,2]],
  [28,'Ni','Nickel','Nichel',30,'transition',4,10,'Many coins contain nickel. It is also one of the few metals a magnet attracts.','Multe monede conțin nichel. Este și unul dintre puținele metale atrase de magnet.',[2,8,16,2]],
  [29,'Cu','Copper','Cupru',34,'transition',4,11,'The electrical wires in your home are copper. Old copper turns green, like the Statue of Liberty.','Firele electrice din casă sunt din cupru. Cuprul vechi se înverzește, ca Statuia Libertății.',[2,8,18,1]],
  [30,'Zn','Zinc','Zinc',34,'transition',4,12,'A zinc coating stops iron from rusting. Your body needs a little zinc too.','Un strat de zinc oprește ruginirea fierului. Și corpul tău are nevoie de puțin zinc.',[2,8,18,2]],
  [31,'Ga','Gallium','Galiu',38,'metal',4,13,'A metal that melts in your hand! It is used in blue and white LEDs.','Un metal care se topește în palmă! Se folosește în LED-urile albastre și albe.',[2,8,18,3]],
  [32,'Ge','Germanium','Germaniu',42,'metalloid',4,14,'Used in the first transistors and today in fibre-optic cables and night-vision lenses.','Folosit la primele tranzistoare, azi apare în fibra optică și în lentilele de vedere nocturnă.',[2,8,18,4]],
  [33,'As','Arsenic','Arsen',42,'metalloid',4,15,'A famous poison from old mystery stories, but also used in some computer chips.','O otravă celebră din romanele polițiste vechi, dar folosită și în unele cipuri.',[2,8,18,5]],
  [34,'Se','Selenium','Seleniu',46,'nonmetal',4,16,'Named after the Moon. Brazil nuts are very rich in it.','Numele lui vine de la Lună. Nucile braziliene sunt foarte bogate în seleniu.',[2,8,18,6]],
  [35,'Br','Bromine','Brom',44,'halogen',4,17,'One of only two elements that are liquid at room temperature. It is dark red.','Unul dintre doar două elemente lichide la temperatura camerei. Are culoarea roșu-închis.',[2,8,18,7]],
  [36,'Kr','Krypton','Kripton',48,'noble',4,18,'A real gas, not Superman\'s rock! It glows whitish in some lamps and camera flashes.','Un gaz adevărat, nu piatra lui Superman! Luminează alb în unele lămpi și blițuri.',[2,8,18,8]],
  [37,'Rb','Rubidium','Rubidiu',48,'alkali',5,1,'So reactive it catches fire in air. It is used in super-precise atomic clocks.','Atât de reactiv încât ia foc în aer. Se folosește în ceasuri atomice foarte precise.',[2,8,18,8,1]],
  [38,'Sr','Strontium','Stronțiu',50,'earth',5,2,'It makes fireworks glow bright red.','Face artificiile să lumineze în roșu aprins.',[2,8,18,8,2]],
  [39,'Y','Yttrium','Ytriu',50,'transition',5,3,'Named after Ytterby, a tiny Swedish village that gave its name to four elements.','Poartă numele satului suedez Ytterby, care a dat nume la patru elemente.',[2,8,18,9,2]],
  [40,'Zr','Zirconium','Zirconiu',50,'transition',5,4,'Zirconia crystals look like diamonds and are used in cheap jewellery and dental crowns.','Cristalele de zirconiu arată ca diamantele și se folosesc la bijuterii și coroane dentare.',[2,8,18,10,2]],
  [41,'Nb','Niobium','Niobiu',52,'transition',5,5,'Used in the superconducting magnets of MRI scanners and particle accelerators.','Se folosește la magneții supraconductori din aparatele RMN și din acceleratoarele de particule.',[2,8,18,12,1]],
  [42,'Mo','Molybdenum','Molibden',56,'transition',5,6,'Makes steel so hard it is used in drill bits and armour. Plants need a tiny bit too.','Face oțelul atât de dur încât se folosește la burghie și blindaje. Și plantele au nevoie de puțin.',[2,8,18,13,1]],
  [43,'Tc','Technetium','Tehnețiu',55,'transition',5,7,'The first element made artificially. Doctors use it to take pictures inside the body.','Primul element obținut artificial. Medicii îl folosesc ca să vadă în interiorul corpului.',[2,8,18,13,2]],
  [44,'Ru','Ruthenium','Ruteniu',58,'transition',5,8,'A rare, hard metal used to make pen nibs and electrical contacts last longer.','Un metal rar și dur, folosit ca penițele și contactele electrice să țină mai mult.',[2,8,18,15,1]],
  [45,'Rh','Rhodium','Rodiu',58,'transition',5,9,'One of the most expensive metals. Car exhaust systems use it to clean the fumes.','Unul dintre cele mai scumpe metale. Mașinile îl folosesc ca să curețe gazele de eșapament.',[2,8,18,16,1]],
  [46,'Pd','Palladium','Paladiu',60,'transition',5,10,'It can soak up hydrogen gas like a sponge. Used in car catalytic converters.','Poate absorbi hidrogenul ca un burete. Se folosește în catalizatoarele mașinilor.',[2,8,18,18]],
  [47,'Ag','Silver','Argint',60,'transition',5,11,'The best conductor of electricity of all metals. Used in jewellery and mirrors.','Cel mai bun conducător de electricitate dintre toate metalele. Folosit la bijuterii și oglinzi.',[2,8,18,18,1]],
  [48,'Cd','Cadmium','Cadmiu',66,'transition',5,12,'Once used in rechargeable batteries and bright yellow paint, but it is toxic.','Folosit cândva în acumulatori și în vopseaua galben aprins, dar este toxic.',[2,8,18,18,2]],
  [49,'In','Indium','Indiu',66,'metal',5,13,'A thin layer of it makes phone touchscreens work. It squeaks when you bend it!','Un strat subțire de indiu face ecranele tactile să funcționeze. Scârțâie când îl îndoi!',[2,8,18,18,3]],
  [50,'Sn','Tin','Staniu',70,'metal',5,14,'Mixed with copper it makes bronze. "Tin cans" are really steel with a thin tin coat.','Cu cuprul formează bronzul. Conservele „de tablă” sunt din oțel acoperit cu staniu.',[2,8,18,18,4]],
  [51,'Sb','Antimony','Stibiu',70,'metalloid',5,15,'Ancient Egyptians used it as black eye make-up. Today it helps make fabrics fire-proof.','Egiptenii antici îl foloseau ca fard negru pentru ochi. Azi ajută la ignifugarea țesăturilor.',[2,8,18,18,5]],
  [52,'Te','Tellurium','Telur',78,'metalloid',5,16,'Used in some solar panels and rewritable DVDs. Eating it gives you garlic breath!','Se folosește în unele panouri solare și DVD-uri reinscriptibile. Îți dă o respirație cu miros de usturoi!',[2,8,18,18,6]],
  [53,'I','Iodine','Iod',74,'halogen',5,17,'Added to table salt to keep your thyroid healthy. Its vapour is a lovely violet.','Se adaugă în sare ca tiroida să rămână sănătoasă. Vaporii lui au o culoare violet frumoasă.',[2,8,18,18,7]],
  [54,'Xe','Xenon','Xenon',78,'noble',5,18,'Gives bright blue-white car headlights and powers some spacecraft engines.','Dă lumina alb-albăstruie a unor faruri și alimentează motoarele unor nave spațiale.',[2,8,18,18,8]],
  [55,'Cs','Caesium','Cesiu',78,'alkali',6,1,'Melts on a hot day and explodes in water. Caesium atomic clocks define the second.','Se topește într-o zi caniculară și explodează în apă. Ceasurile atomice cu cesiu definesc secunda.',[2,8,18,18,8,1]],
  [56,'Ba','Barium','Bariu',82,'earth',6,2,'Makes fireworks green. Doctors give a barium drink so your stomach shows up on X-rays.','Colorează artificiile în verde. Medicii dau o băutură cu bariu ca stomacul să se vadă la radiografie.',[2,8,18,18,8,2]],
  [57,'La','Lanthanum','Lantan',82,'lanthanide',6,null,'Used in camera lenses and in the batteries of hybrid cars.','Se folosește în obiectivele aparatelor foto și în bateriile mașinilor hibride.',[2,8,18,18,9,2]],
  [58,'Ce','Cerium','Ceriu',82,'lanthanide',6,null,'The spark in a lighter flint comes from cerium. It also polishes glass.','Scânteia din piatra de brichetă vine de la ceriu. Tot el lustruiește sticla.',[2,8,18,19,9,2]],
  [59,'Pr','Praseodymium','Praseodim',82,'lanthanide',6,null,'Its name means "green twin". It colours glass yellow-green and protects welders\' eyes.','Numele lui înseamnă „geamănul verde”. Colorează sticla galben-verde și apără ochii sudorilor.',[2,8,18,21,8,2]],
  [60,'Nd','Neodymium','Neodim',82,'lanthanide',6,null,'Makes the strongest permanent magnets, found in earbuds and electric car motors.','Formează cei mai puternici magneți permanenți, din căști și motoarele mașinilor electrice.',[2,8,18,22,8,2]],
  [61,'Pm','Promethium','Prometiu',84,'lanthanide',6,null,'Named after Prometheus, who stole fire. It has no stable form and is very rare on Earth.','Numit după Prometeu, care a furat focul. Nu are nicio formă stabilă și e foarte rar pe Pământ.',[2,8,18,23,8,2]],
  [62,'Sm','Samarium','Samariu',90,'lanthanide',6,null,'Samarium magnets keep working even when very hot, so they are used in guitars and motors.','Magneții cu samariu funcționează și la căldură mare, așa că apar în chitare și motoare.',[2,8,18,24,8,2]],
  [63,'Eu','Europium','Europiu',90,'lanthanide',6,null,'Named after Europe. It glows red under UV light and helps stop fake euro banknotes.','Numit după Europa. Luminează roșu în lumină UV și ajută la depistarea bancnotelor euro false.',[2,8,18,25,8,2]],
  [64,'Gd','Gadolinium','Gadoliniu',94,'lanthanide',6,null,'Injected before some MRI scans to make body parts show up more clearly.','Se injectează înaintea unor investigații RMN ca organele să se vadă mai clar.',[2,8,18,25,9,2]],
  [65,'Tb','Terbium','Terbiu',94,'lanthanide',6,null,'Gives the bright green glow in some screens and energy-saving bulbs.','Dă strălucirea verde din unele ecrane și becuri economice.',[2,8,18,27,8,2]],
  [66,'Dy','Dysprosium','Disprosiu',98,'lanthanide',6,null,'Its name means "hard to get" in Greek. It helps magnets in wind turbines stay strong.','Numele lui înseamnă „greu de obținut” în greacă. Ajută magneții turbinelor eoliene să rămână puternici.',[2,8,18,28,8,2]],
  [67,'Ho','Holmium','Holmiu',98,'lanthanide',6,null,'Named after Stockholm. It is the most magnetic element of all and is used in surgical lasers.','Numit după Stockholm. Are cel mai puternic magnetism dintre elemente și se folosește în laserele chirurgicale.',[2,8,18,29,8,2]],
  [68,'Er','Erbium','Erbiu',98,'lanthanide',6,null,'Boosts light signals in the internet\'s fibre-optic cables and colours glass pink.','Amplifică semnalele luminoase din fibra optică a internetului și colorează sticla în roz.',[2,8,18,30,8,2]],
  [69,'Tm','Thulium','Tuliu',100,'lanthanide',6,null,'Named after Thule, an old name for the far north. One of the rarest lanthanides.','Numit după Thule, un nume vechi pentru nordul îndepărtat. Una dintre cele mai rare lantanide.',[2,8,18,31,8,2]],
  [70,'Yb','Ytterbium','Yterbiu',104,'lanthanide',6,null,'Another element named after Ytterby. It keeps time in some of the most precise clocks ever built.','Încă un element numit după Ytterby. Măsoară timpul în unele dintre cele mai precise ceasuri construite.',[2,8,18,32,8,2]],
  [71,'Lu','Lutetium','Lutețiu',104,'lanthanide',6,null,'Named after Lutetia, the old Roman name of Paris. One of the priciest rare earths.','Numit după Lutetia, vechiul nume roman al Parisului. Unul dintre cele mai scumpe pământuri rare.',[2,8,18,32,9,2]],
  [72,'Hf','Hafnium','Hafniu',108,'transition',6,4,'Named after Copenhagen (Hafnia). Its control rods help keep nuclear reactors safe.','Numit după Copenhaga (Hafnia). Barele de control din hafniu ajută la siguranța reactoarelor nucleare.',[2,8,18,32,10,2]],
  [73,'Ta','Tantalum','Tantal',108,'transition',6,5,'Tiny tantalum capacitors sit inside almost every mobile phone.','Condensatoare mici din tantal se află în aproape fiecare telefon mobil.',[2,8,18,32,11,2]],
  [74,'W','Tungsten','Wolfram',110,'transition',6,6,'It has the highest melting point of any metal, so it was used for glowing bulb filaments.','Are cel mai ridicat punct de topire dintre metale, de aceea filamentele becurilor erau din wolfram.',[2,8,18,32,12,2]],
  [75,'Re','Rhenium','Reniu',110,'transition',6,7,'One of the rarest elements in Earth\'s crust. It helps jet engine blades survive huge heat.','Unul dintre cele mai rare elemente din scoarța Pământului. Ajută paletele motoarelor cu reacție să reziste la căldură.',[2,8,18,32,13,2]],
  [76,'Os','Osmium','Osmiu',116,'transition',6,8,'The densest element: a football-sized lump would weigh about 100 kg.','Cel mai dens element: o bucată cât o minge de fotbal ar cântări cam 100 kg.',[2,8,18,32,14,2]],
  [77,'Ir','Iridium','Iridiu',116,'transition',6,9,'A layer rich in iridium, left by an asteroid, marks when the dinosaurs died out.','Un strat bogat în iridiu, lăsat de un asteroid, arată momentul dispariției dinozaurilor.',[2,8,18,32,15,2]],
  [78,'Pt','Platinum','Platină',117,'transition',6,10,'A precious metal for jewellery. It also cleans car exhaust in catalytic converters.','Un metal prețios pentru bijuterii. Curăță și gazele de eșapament în catalizatoarele mașinilor.',[2,8,18,32,17,1]],
  [79,'Au','Gold','Aur',118,'transition',6,11,'Gold never rusts. One gram can be hammered into a sheet about one square metre wide.','Aurul nu ruginește niciodată. Un gram poate fi bătut într-o foaie de aproape un metru pătrat.',[2,8,18,32,18,1]],
  [80,'Hg','Mercury','Mercur',122,'transition',6,12,'The only metal that is liquid at room temperature. Old thermometers used it.','Singurul metal lichid la temperatura camerei. Termometrele vechi îl foloseau.',[2,8,18,32,18,2]],
  [81,'Tl','Thallium','Taliu',124,'metal',6,13,'Its name means "green twig" because it gives a bright green flame. Very poisonous.','Numele lui înseamnă „lăstar verde”, pentru că dă o flacără verde aprins. Foarte otrăvitor.',[2,8,18,32,18,3]],
  [82,'Pb','Lead','Plumb',126,'metal',6,14,'A heavy, soft metal that blocks X-rays. It is toxic, so it was removed from paint and petrol.','Un metal greu și moale care oprește razele X. Este toxic, de aceea a fost scos din vopsele și benzină.',[2,8,18,32,18,4]],
  [83,'Bi','Bismuth','Bismut',126,'metal',6,15,'Grows beautiful rainbow-coloured staircase crystals. It is in some stomach medicines.','Formează cristale frumoase în trepte, colorate ca un curcubeu. Se află în unele medicamente pentru stomac.',[2,8,18,32,18,5]],
  [84,'Po','Polonium','Poloniu',125,'metal',6,16,'Discovered by Marie Curie and named after her homeland, Poland. Extremely radioactive.','Descoperit de Marie Curie și numit după țara ei natală, Polonia. Extrem de radioactiv.',[2,8,18,32,18,6]],
  [85,'At','Astatine','Astatin',125,'halogen',6,17,'The rarest natural element: less than a gram exists in all of Earth\'s crust at any moment.','Cel mai rar element natural: în toată scoarța Pământului există mai puțin de un gram odată.',[2,8,18,32,18,7]],
  [86,'Rn','Radon','Radon',136,'noble',6,18,'A radioactive gas that can seep up from rocks into basements, so homes are tested for it.','Un gaz radioactiv care poate urca din roci în subsoluri, de aceea casele sunt verificate.',[2,8,18,32,18,8]],
  [87,'Fr','Francium','Franciu',136,'alkali',7,1,'Named after France. So rare and short-lived that nobody has ever seen a visible piece.','Numit după Franța. Atât de rar și de instabil încât nimeni n-a văzut vreodată o bucată din el.',[2,8,18,32,18,8,1]],
  [88,'Ra','Radium','Radiu',138,'earth',7,2,'Found by Marie and Pierre Curie. It glows faintly, and was once painted on watch dials.','Descoperit de Marie și Pierre Curie. Luminează slab și a fost pus cândva pe cadranele ceasurilor.',[2,8,18,32,18,8,2]],
  [89,'Ac','Actinium','Actiniu',138,'actinide',7,null,'It glows pale blue in the dark. Its name comes from the Greek word for "ray".','Luminează albastru pal în întuneric. Numele vine de la cuvântul grecesc pentru „rază”.',[2,8,18,32,18,9,2]],
  [90,'Th','Thorium','Toriu',142,'actinide',7,null,'Named after Thor, the Norse god of thunder. It could one day fuel safer nuclear reactors.','Numit după Thor, zeul nordic al tunetului. Ar putea alimenta cândva reactoare nucleare mai sigure.',[2,8,18,32,18,10,2]],
  [91,'Pa','Protactinium','Protactiniu',140,'actinide',7,null,'One of the rarest and most expensive natural elements. It slowly turns into actinium.','Unul dintre cele mai rare și scumpe elemente naturale. Se transformă încet în actiniu.',[2,8,18,32,20,9,2]],
  [92,'U','Uranium','Uraniu',146,'actinide',7,null,'The fuel of nuclear power plants. One small pellet gives as much energy as a tonne of coal.','Combustibilul centralelor nucleare. O pastilă mică dă tot atâta energie cât o tonă de cărbune.',[2,8,18,32,21,9,2]],
  [93,'Np','Neptunium','Neptuniu',144,'actinide',7,null,'The first element heavier than uranium, named after Neptune, the planet after Uranus.','Primul element mai greu decât uraniul, numit după Neptun, planeta de după Uranus.',[2,8,18,32,22,9,2]],
  [94,'Pu','Plutonium','Plutoniu',150,'actinide',7,null,'Powers space probes like Voyager and Curiosity, which travel far from the Sun.','Alimentează sonde spațiale precum Voyager și Curiosity, care călătoresc departe de Soare.',[2,8,18,32,24,8,2]],
  [95,'Am','Americium','Americiu',148,'actinide',7,null,'A tiny speck of it sits inside many home smoke detectors.','O fărâmă din el se află în multe detectoare de fum din case.',[2,8,18,32,25,8,2]],
  [96,'Cm','Curium','Curiu',151,'actinide',7,null,'Named after Marie and Pierre Curie. Mars rovers used it to find out what rocks are made of.','Numit după Marie și Pierre Curie. Roverele de pe Marte l-au folosit ca să afle din ce sunt făcute rocile.',[2,8,18,32,25,9,2]],
  [97,'Bk','Berkelium','Berkeliu',150,'actinide',7,null,'Named after Berkeley, the US city where it was first made in 1949.','Numit după Berkeley, orașul american unde a fost obținut prima dată, în 1949.',[2,8,18,32,27,8,2]],
  [98,'Cf','Californium','Californiu',153,'actinide',7,null,'Gives off so many neutrons that it is used to start up nuclear reactors and find oil.','Emite atât de mulți neutroni încât se folosește la pornirea reactoarelor și la căutarea petrolului.',[2,8,18,32,28,8,2]],
  [99,'Es','Einsteinium','Einsteiniu',153,'actinide',7,null,'Named after Albert Einstein. It was first found in the dust of a 1952 hydrogen bomb test.','Numit după Albert Einstein. A fost găsit prima dată în praful unui test cu bombă cu hidrogen din 1952.',[2,8,18,32,29,8,2]],
  [100,'Fm','Fermium','Fermiu',157,'actinide',7,null,'Named after Enrico Fermi, who built the first nuclear reactor. Found along with einsteinium.','Numit după Enrico Fermi, care a construit primul reactor nuclear. Descoperit odată cu einsteiniul.',[2,8,18,32,30,8,2]],
  [101,'Md','Mendelevium','Mendeleeviu',157,'actinide',7,null,'Named after Dmitri Mendeleev, the creator of the periodic table.','Numit după Dmitri Mendeleev, creatorul tabelului periodic.',[2,8,18,32,31,8,2]],
  [102,'No','Nobelium','Nobeliu',157,'actinide',7,null,'Named after Alfred Nobel, the man behind the Nobel Prizes.','Numit după Alfred Nobel, omul din spatele Premiilor Nobel.',[2,8,18,32,32,8,2]],
  [103,'Lr','Lawrencium','Lawrenciu',163,'actinide',7,null,'Named after Ernest Lawrence, who invented the cyclotron, a machine that speeds up particles.','Numit după Ernest Lawrence, inventatorul ciclotronului, o mașină care accelerează particule.',[2,8,18,32,32,8,3]],
  [104,'Rf','Rutherfordium','Rutherfordiu',163,'transition',7,4,'Named after Ernest Rutherford, who discovered the atomic nucleus. Made only in labs.','Numit după Ernest Rutherford, cel care a descoperit nucleul atomic. Obținut doar în laborator.',[2,8,18,32,32,10,2]],
  [105,'Db','Dubnium','Dubniu',163,'transition',7,5,'Named after Dubna, a Russian town with a famous lab that makes new elements.','Numit după Dubna, un oraș din Rusia cu un laborator celebru unde se creează elemente noi.',[2,8,18,32,32,11,2]],
  [106,'Sg','Seaborgium','Seaborgiu',163,'transition',7,6,'Named after Glenn Seaborg, who was still alive when the element got his name.','Numit după Glenn Seaborg, care încă trăia când elementul i-a primit numele.',[2,8,18,32,32,12,2]],
  [107,'Bh','Bohrium','Bohriu',163,'transition',7,7,'Named after Niels Bohr, who drew atoms with electrons in shells, just like in this app.','Numit după Niels Bohr, care a desenat atomii cu electronii pe straturi, exact ca în această aplicație.',[2,8,18,32,32,13,2]],
  [108,'Hs','Hassium','Hassiu',161,'transition',7,8,'Named after Hesse, the German state where it was first made. Only a few atoms exist at a time.','Numit după landul german Hessa, unde a fost obținut prima dată. Există doar câțiva atomi odată.',[2,8,18,32,32,14,2]],
  [109,'Mt','Meitnerium','Meitneriu',169,'transition',7,9,'Named after Lise Meitner, who helped explain how uranium atoms split.','Numit după Lise Meitner, care a ajutat la explicarea modului în care se divide atomul de uraniu.',[2,8,18,32,32,15,2]],
  [110,'Ds','Darmstadtium','Darmstadtiu',171,'transition',7,10,'Named after the German city of Darmstadt. Its atoms fall apart in seconds.','Numit după orașul german Darmstadt. Atomii lui se dezintegrează în câteva secunde.',[2,8,18,32,32,16,2]],
  [111,'Rg','Roentgenium','Roentgeniu',171,'transition',7,11,'Named after Wilhelm Röntgen, who discovered X-rays. It sits right below gold.','Numit după Wilhelm Röntgen, descoperitorul razelor X. Se află chiar sub aur în tabel.',[2,8,18,32,32,17,2]],
  [112,'Cn','Copernicium','Coperniciu',173,'transition',7,12,'Named after Copernicus, who said the Earth goes around the Sun. It sits below mercury.','Numit după Copernic, care a spus că Pământul se învârte în jurul Soarelui. Se află sub mercur.',[2,8,18,32,32,18,2]],
  [113,'Nh','Nihonium','Nihoniu',173,'metal',7,13,'The first element discovered in Asia. "Nihon" means Japan in Japanese.','Primul element descoperit în Asia. „Nihon” înseamnă Japonia în japoneză.',[2,8,18,32,32,18,3]],
  [114,'Fl','Flerovium','Fleroviu',175,'metal',7,14,'Named after Georgy Flerov, a Russian physicist. Scientists think it might behave almost like a gas.','Numit după fizicianul rus Gheorghi Flerov. Oamenii de știință cred că s-ar putea comporta aproape ca un gaz.',[2,8,18,32,32,18,4]],
  [115,'Mc','Moscovium','Moscoviu',175,'metal',7,15,'Named after the Moscow region. Only about a hundred atoms have ever been made.','Numit după regiunea Moscovei. Au fost obținuți doar în jur de o sută de atomi.',[2,8,18,32,32,18,5]],
  [116,'Lv','Livermorium','Livermoriu',177,'metal',7,16,'Named after the Livermore lab in California. Each atom lasts only a fraction of a second.','Numit după laboratorul Livermore din California. Fiecare atom trăiește doar o fracțiune de secundă.',[2,8,18,32,32,18,6]],
  [117,'Ts','Tennessine','Tennessin',177,'halogen',7,17,'Named after the US state of Tennessee. It was made by smashing calcium into berkelium.','Numit după statul american Tennessee. A fost obținut bombardând berkeliu cu calciu.',[2,8,18,32,32,18,7]],
  [118,'Og','Oganesson','Oganesson',176,'noble',7,18,'The heaviest element known, named after Yuri Oganessian. Only a handful of atoms have been made.','Cel mai greu element cunoscut, numit după Iuri Oganessian. S-au obținut doar câțiva atomi.',[2,8,18,32,32,18,8]],
];

// neutron counts of STABLE isotopes per Z (empty array = no stable isotope).
// Extremely long-lived primordial isotopes (half-life far beyond the age of the Universe, e.g. Ca-48, Bi-209)
// are counted as stable; ones like K-40, Rb-87, Re-187, Th-232, U-238 are not.
const STABLE_N_ALL = {
  1:[0,1],2:[1,2],3:[3,4],4:[5],5:[5,6],6:[6,7],7:[7,8],8:[8,9,10],9:[10],10:[10,11,12],
  11:[12],12:[12,13,14],13:[14],14:[14,15,16],15:[16],16:[16,17,18,20],17:[18,20],18:[18,20,22],19:[20,22],20:[20,22,23,24,26,28],
  21:[24],22:[24,25,26,27,28],23:[27,28],24:[26,28,29,30],25:[30],26:[28,30,31,32],27:[32],28:[30,32,33,34,36],29:[34,36],30:[34,36,37,38,40],
  31:[38,40],32:[38,40,41,42,44],33:[42],34:[40,42,43,44,46,48],35:[44,46],36:[42,44,46,47,48,50],37:[48],38:[46,48,49,50],39:[50],40:[50,51,52,54,56],
  41:[52],42:[50,52,53,54,55,56,58],43:[],44:[52,54,55,56,57,58,60],45:[58],46:[56,58,59,60,62,64],47:[60,62],48:[58,60,62,63,64,65,66,68],49:[64,66],50:[62,64,65,66,67,68,69,70,72,74],
  51:[70,72],52:[68,70,71,72,73,74,76,78],53:[74],54:[70,72,74,75,76,77,78,80,82],55:[78],56:[74,76,78,79,80,81,82],57:[82],58:[78,80,82,84],59:[82],60:[82,83,84,85,86,88,90],
  61:[],62:[82,86,87,88,90,92],63:[88,90],64:[88,90,91,92,93,94,96],65:[94],66:[90,92,94,95,96,97,98],67:[98],68:[94,96,98,99,100,102],69:[100],70:[98,100,101,102,103,104,106],
  71:[104],72:[102,104,105,106,107,108],73:[107,108],74:[106,108,109,110,112],75:[110],76:[108,110,111,112,113,114,116],77:[114,116],78:[114,116,117,118,120],79:[118],80:[116,118,119,120,121,122,124],
  81:[122,124],82:[122,124,125,126],83:[126],
  84:[],85:[],86:[],87:[],88:[],89:[],90:[],91:[],92:[],93:[],94:[],95:[],96:[],97:[],98:[],99:[],100:[],
  101:[],102:[],103:[],104:[],105:[],106:[],107:[],108:[],109:[],110:[],111:[],112:[],113:[],114:[],115:[],116:[],117:[],118:[],
};

// elements with no stable isotope: neutrons of the longest-lived (or most common natural) isotope + its half-life
const RADIO_INFO = {
  43:{n:55, hl:L('4.2 million years','4,2 milioane de ani')},        // Tc-98
  61:{n:84, hl:L('17.7 years','17,7 ani')},                          // Pm-145
  84:{n:125, hl:L('124 years','124 de ani')},                        // Po-209
  85:{n:125, hl:L('8.1 hours','8,1 ore')},                           // At-210
  86:{n:136, hl:L('3.8 days','3,8 zile')},                           // Rn-222
  87:{n:136, hl:L('22 minutes','22 de minute')},                     // Fr-223
  88:{n:138, hl:L('1,600 years','1.600 de ani')},                    // Ra-226
  89:{n:138, hl:L('21.8 years','21,8 ani')},                         // Ac-227
  90:{n:142, hl:L('14 billion years','14 miliarde de ani')},         // Th-232
  91:{n:140, hl:L('32,800 years','32.800 de ani')},                  // Pa-231
  92:{n:146, hl:L('4.5 billion years','4,5 miliarde de ani')},       // U-238
  93:{n:144, hl:L('2.1 million years','2,1 milioane de ani')},       // Np-237
  94:{n:150, hl:L('80 million years','80 de milioane de ani')},      // Pu-244
  95:{n:148, hl:L('7,400 years','7.400 de ani')},                    // Am-243
  96:{n:151, hl:L('15.6 million years','15,6 milioane de ani')},     // Cm-247
  97:{n:150, hl:L('1,380 years','1.380 de ani')},                    // Bk-247
  98:{n:153, hl:L('900 years','900 de ani')},                        // Cf-251
  99:{n:153, hl:L('472 days','472 de zile')},                        // Es-252
  100:{n:157, hl:L('100 days','100 de zile')},                       // Fm-257
  101:{n:157, hl:L('51 days','51 de zile')},                         // Md-258
  102:{n:157, hl:L('58 minutes','58 de minute')},                    // No-259
  103:{n:163, hl:L('11 hours','11 ore')},                            // Lr-266
  104:{n:163, hl:L('1.3 hours','1,3 ore')},                          // Rf-267
  105:{n:163, hl:L('16 hours','16 ore')},                            // Db-268
  106:{n:163, hl:L('14 minutes','14 minute')},                       // Sg-269
  107:{n:163, hl:L('2.4 minutes','2,4 minute')},                     // Bh-270
  108:{n:161, hl:L('16 seconds','16 secunde')},                      // Hs-269
  109:{n:169, hl:L('4.5 seconds','4,5 secunde')},                    // Mt-278
  110:{n:171, hl:L('13 seconds','13 secunde')},                      // Ds-281
  111:{n:171, hl:L('100 seconds','100 de secunde')},                 // Rg-282
  112:{n:173, hl:L('30 seconds','30 de secunde')},                   // Cn-285
  113:{n:173, hl:L('10 seconds','10 secunde')},                      // Nh-286
  114:{n:175, hl:L('2 seconds','2 secunde')},                        // Fl-289
  115:{n:175, hl:L('0.65 seconds','0,65 secunde')},                  // Mc-290
  116:{n:177, hl:L('60 milliseconds','60 de milisecunde')},          // Lv-293
  117:{n:177, hl:L('50 milliseconds','50 de milisecunde')},          // Ts-294
  118:{n:176, hl:L('0.7 milliseconds','0,7 milisecunde')},           // Og-294
};

// standard atomic mass (radioactive-only elements: mass number of the longest-lived isotope in brackets)
// Th, Pa and U keep numeric values because IUPAC gives them a standard atomic weight.
const MASS = {
  1:1.008,2:4.003,3:6.94,4:9.012,5:10.81,6:12.01,7:14.01,8:16.00,9:19.00,10:20.18,
  11:22.99,12:24.31,13:26.98,14:28.09,15:30.97,16:32.06,17:35.45,18:39.95,19:39.10,20:40.08,
  21:44.96,22:47.87,23:50.94,24:52.00,25:54.94,26:55.85,27:58.93,28:58.69,29:63.55,30:65.38,
  31:69.72,32:72.63,33:74.92,34:78.97,35:79.90,36:83.80,37:85.47,38:87.62,39:88.91,40:91.22,
  41:92.91,42:95.95,43:'[98]',44:101.1,45:102.9,46:106.4,47:107.9,48:112.4,49:114.8,50:118.7,
  51:121.8,52:127.6,53:126.9,54:131.3,55:132.9,56:137.3,57:138.9,58:140.1,59:140.9,60:144.2,
  61:'[145]',62:150.4,63:152.0,64:157.3,65:158.9,66:162.5,67:164.9,68:167.3,69:168.9,70:173.0,
  71:175.0,72:178.5,73:180.9,74:183.8,75:186.2,76:190.2,77:192.2,78:195.1,79:197.0,80:200.6,
  81:204.4,82:207.2,83:209.0,84:'[209]',85:'[210]',86:'[222]',87:'[223]',88:'[226]',89:'[227]',90:232.0,
  91:231.0,92:238.0,93:'[237]',94:'[244]',95:'[243]',96:'[247]',97:'[247]',98:'[251]',99:'[252]',100:'[257]',
  101:'[258]',102:'[259]',103:'[266]',104:'[267]',105:'[268]',106:'[269]',107:'[270]',108:'[269]',109:'[278]',110:'[281]',
  111:'[282]',112:'[285]',113:'[286]',114:'[289]',115:'[290]',116:'[293]',117:'[294]',118:'[294]',
};

// ---- categories for the full table ----
Object.assign(CAT_COLORS, {transition:'#ffd6cc', lanthanide:'#ffe2f1', actinide:'#f5cfe0'});
Object.assign(CAT_KEYS, {transition:'catTransition', lanthanide:'catLanthanide', actinide:'catActinide'});
Object.assign(S, {catTransition:L('Transition metal','Metal tranzițional'), catLanthanide:L('Lanthanide','Lantanid'), catActinide:L('Actinide','Actinid'),
  first20:L('The periodic table: all 118 elements','Tabelul periodic: toate cele 118 elemente'), ptHint:L('Tap any element and its atom appears below. Scroll sideways on small screens.','Atinge orice element și atomul lui apare mai jos. Pe ecrane mici, derulează lateral.'), backTable:L('Back to the periodic table','Înapoi la tabelul periodic')});

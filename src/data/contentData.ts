import {
  FactCheckScenario,
  QuizQuestion,
  SafetyTopic,
  VerificationStep,
  PromptLogEntry,
  FeedbackSubmission,
  AiGameImage,
} from '../types.ts';

// 5 Scenarii Educative Fictive
// Ordine obligatorie conform cerinței:
// 1. Adevărat | 2. Fals | 3. Adevărat | 4. Nu avem suficiente dovezi | 5. Fals
export const FACT_CHECK_SCENARIOS: FactCheckScenario[] = [
  {
    id: 'scenariu-1',
    title: 'Mesaj despre campania națională gratuită de vaccinare antirabică pentru animale de companie',
    category: 'Sănătate Publică & Comunitate',
    socialContext: {
      platform: 'Web News',
      author: 'Portalul Veterinar Național',
      handle: 'comunicat-oficial.ansvsa.ro',
      timeAgo: 'Astăzi, 10:15',
      shares: '4.8k',
      likes: '9.2k',
    },
    headline: '„ANSVSA anunță începerea campaniei anuale de vaccinare antirabică gratuită a câinilor și pisicilor la cabinetele autorizate.”',
    content:
      'Articolul include numărul hotărârii de guvern, declarația purtătorului de cuvânt al ANSVSA, lista județelor participante și un link direct către portalul oficial www.ansvsa.ro, menționând că acțiunea este obligatorie conform legii sanitar-veterinare.',
    tags: ['Sursă Oficială', 'Document Public', 'Date Verificabile'],
    correctVerdict: 'adevarat',
    verdictLabel: 'Adevărat — Informație Oficială Verificată',
    explanation:
      'Informația este autentică și confirmată pe portalul oficial al Autorității Naționale Sanitare Veterinare și pentru Siguranța Alimentelor. Textul conține date concrete (lege, link oficial, date de contact ale cabinetelor), nu folosește limbaj panicard și poate fi verificat direct pe site-ul guvernamental ansvsa.ro.',
    redFlags: [
      'Nu există semnale de alarmă; informația citează surse reale',
      'Formatul este neutru, informativ și fără presiune de redistribuire',
      'Domeniul web indicat este unul oficial (.gov.ro)',
    ],
    verificationSteps: [
      'Accesează direct site-ul oficial al ANSVSA (ansvsa.ro).',
      'Verifică dacă numărul deciziei apare în Monitorul Oficial.',
      'Sună la medicul veterinar local pentru confirmarea calendarului.',
    ],
    reliableSourcesTip: 'Toate campaniile sanitar-veterinare naționale sunt publicate pe www.ansvsa.ro.',
  },
  {
    id: 'scenariu-2',
    title: 'Mesaj viral despre o băutură energizantă interzisă de urgență',
    category: 'Sănătate & Alerte Virale',
    socialContext: {
      platform: 'WhatsApp',
      author: 'Grup „Liceu Info & Chat”',
      handle: 'Redirecționat de multe ori',
      timeAgo: 'Ieri, 14:20',
      shares: '12.4k',
      likes: '3.1k',
    },
    headline: '„ATENȚIE MAXIMĂ! Toate băuturile energizante din magazinul X conțin substanțe toxice necunoscute și au fost retrase azi!”',
    content:
      'Mesajul include o captură de ecran neclară, cu text scris cu majuscule, emoticoane de panică (🚨⚠️), fără niciun link către o autoritate sanitară oficială și cu îndemnul agresiv: „Trimite mai departe tuturor colegilor înainte să fie șters!”',
    tags: ['Lanț WhatsApp', 'Limbaj Alarmist', 'Fără Sursă'],
    correctVerdict: 'fals',
    verdictLabel: 'Fals & Alarmism Nejustificat',
    explanation:
      'Mesajul prezintă toate trăsăturile clasice ale unui mesaj viral de tip „hoax” (farsă alarmistă): lipsa oricărei surse verificabile, majuscule excesive pentru a crea panică și îndemnul de a da „share” înainte de a gândi. O verificare pe site-ul autorităților demonstrează că nu există nicio alertă de acest fel.',
    redFlags: [
      'Limbaj panicard („ATENȚIE MAXIMĂ”, „Trimite înainte să fie șters”)',
      'Lipsa numelui laboratorului, instituției de control sau datei emiterii',
      'Format de text copiat și redirecționat de multiple ori, fără link web',
    ],
    verificationSteps: [
      'Verifică portalul oficial al ANSVSA sau al Ministerului Sănătății.',
      'Caută cuvintele-cheie din mesaj pe Google alături de termenul „fals” sau „hoax”.',
      'Întreabă-te: de ce ar cere un mesaj oficial să fie distribuit pe grupuri informale de WhatsApp?',
    ],
    reliableSourcesTip: 'Accesează întotdeauna www.ansvsa.ro sau comunicatele Ministerului Sănătății.',
  },
  {
    id: 'scenariu-3',
    title: 'Anunț privind calendarul oficial al simulărilor pentru Evaluarea Națională și Bacalaureat',
    category: 'Educație & Examene',
    socialContext: {
      platform: 'Facebook',
      author: 'Ministerul Educației - România',
      handle: '@Edu.Romania.Oficial',
      timeAgo: 'Acum 2 zile',
      shares: '6.7k',
      likes: '14.2k',
    },
    headline: '„Ministerul Educației a publicat în Monitorul Oficial ordinul privind organizarea simulărilor naționale pentru anul școlar în curs.”',
    content:
      'Postarea conține pagina scanată a ordinului de ministru semnat, calendarul pe zile pentru fiecare probă scrisă (Limba română, Matematică/Istorie) și trimite către secțiunea de legislație a portalului oficial www.edu.ro.',
    tags: ['Document Oficial', 'Portal Guvernamental', 'Calendar Școlar'],
    correctVerdict: 'adevarat',
    verdictLabel: 'Adevărat — Ordin de Ministru Valid',
    explanation:
      'Anunțul este complet adevărat. Datele simulărilor sunt stabilite anual prin ordin de ministru publicat în Monitorul Oficial și afișat public pe site-ul Ministerului Educației (edu.ro). Informația conține numărul exact al ordinului și este preluată de toate instituțiile de învățământ din țară.',
    redFlags: [
      'Cont oficial cu insignă albastră de verificare pe rețeaua socială',
      'Documentul conține antetul guvernamental, numărul de înregistrare și data',
      'Informația este confirmată direct de conducerea liceului tău',
    ],
    verificationSteps: [
      'Consultă site-ul oficial edu.ro la rubrica Noutăți / Examene.',
      'Întreabă profesorul diriginte sau secretariatul liceului.',
      'Verifică existența numărului de ordin în Monitorul Oficial.',
    ],
    reliableSourcesTip: 'Calendarul examenelor se consultă exclusiv pe www.edu.ro.',
  },
  {
    id: 'scenariu-4',
    title: 'Zvon pe rețele: „Un robot AI va înlocui complet profesorii de la toamnă”',
    category: 'Dezinformare & Tehnologie',
    socialContext: {
      platform: 'Facebook',
      author: 'Educație Viitor Blog',
      handle: '@educatie_viitor_online',
      timeAgo: 'Acum 3 zile',
      shares: '15.6k',
      likes: '4.8k',
    },
    headline: '„S-a decis oficial: Din anul școlar viitor, 80% din orele de curs vor fi predate exclusiv de un soft de inteligență artificială!”',
    content:
      'Articolul citează un presupus „raport secret european” și adaugă citate scoase din context ale unor experți în tehnologie care vorbeau de fapt despre instrumente ajutătoare de învățare adaptivă.',
    tags: ['Clickbait', 'Scoatere din Context', 'Zvon Neconfirmat'],
    correctVerdict: 'insuficient',
    verdictLabel: 'Nu avem suficiente dovezi / Exagerare Neconfirmată',
    explanation:
      'Declarația este o distorsionare a realității. Deși există proiecte pilot despre asistenți virtuali ca instrumente suport pentru profesori, nu există nicio directivă europeană sau lege națională care să decidă înlocuirea cadrelor didactice. Categoria corectă este „Nu avem suficiente dovezi / Afirmație nefondată”.',
    redFlags: [
      'Invocarea unor „rapoarte secrete” care nu pot fi consultate nicăieri',
      'Titlu clickbait conceput pentru a stârni panică și comentarii furioase',
      'Lipsa oricărui ordin de ministru sau proiect de lege înregistrat',
    ],
    verificationSteps: [
      'Caută textul legii sau al documentului oficial menționat.',
      'Verifică dacă știrea a fost preluată de agențiile de presă credibile (Agerpres).',
      'Discută cu profesorii din liceu dacă au primit vreo notificare oficială.',
    ],
    reliableSourcesTip: 'Politica educațională din România este reglementată exclusiv prin legi în Monitorul Oficial.',
  },
  {
    id: 'scenariu-5',
    title: 'Postare sponsorizată: „Toți elevii primesc gratuit un telefon de ultimă generație”',
    category: 'Phishing & Înșelăciuni Online',
    socialContext: {
      platform: 'Instagram',
      author: 'Programul_National_Elevi_2026',
      handle: '@program_gratuit_elevi',
      timeAgo: 'Ieri',
      shares: '8.2k',
      likes: '29.3k',
    },
    headline: '„Guvernul acordă un smartphone premium fiecărui elev! Completează formularul cu datele personale și CNP-ul pentru livrare!”',
    content:
      'Postarea folosește o siglă asemănătoare cu cea a Ministerului Educației, dar linkul din bio duce la o adresă suspectă `edu-program-gratuit-voucher.top/formular`. Pe pagină se cere CNP-ul, adresa completă și numărul de card pentru o „taxă de curierat de 9 lei”.',
    tags: ['Phishing', 'Furt de Identitate', 'Site Clonat'],
    correctVerdict: 'fals',
    verdictLabel: 'Fals — Tentativă de Phishing și Furt de Date',
    explanation:
      'Aceasta este o schemă clasică de inginerie socială și phishing. Atacatorii folosesc promisiunea unui cadou atractiv pentru a fura date personale sensibile (CNP, adresă) și date bancare. Nicio instituție publică nu solicită date de card pe domenii obscure (.top, .xyz).',
    redFlags: [
      'Domeniu web suspect (`.top`) în loc de domeniu oficial (`.gov.ro` sau `.edu.ro`)',
      'Cererea de plată sau date de card sub pretextul „taxei de curierat”',
      'Cont de social media fără insignă oficială de verificare',
    ],
    verificationSteps: [
      'Verifică adresa din bara browserului (caută extensia oficială .gov.ro sau .edu.ro).',
      'Nu introduce niciodată CNP-ul sau date bancare pe linkuri din reclame.',
      'Caută pe portalul oficial edu.ro secțiunea de comunicate de presă.',
    ],
    reliableSourcesTip: 'Orice program oficial pentru elevi se publică pe www.edu.ro și prin secretariatele școlilor.',
  },
];

// 10 Întrebări de Quiz Interactiv
// Răspunsurile corecte sunt distribuite echilibrat (A, B, C, D) și au lungimi similare cu opțiunile greșite
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Dezinformare & Știri False',
    question: 'Care este prima reacție recomandată când citești o știre șocantă pe rețelele sociale?',
    options: [
      'Să o trimiți rapid pe grupul clasei pentru a-i preveni pe ceilalți',
      'Să faci o pauză reflexivă și să verifici existența ei pe surse independente',
      'Să comanzi imediat produsele recomandate înainte de epuizarea stocului',
      'Să lași un comentariu revoltat pe pagina respectivă pentru vizibilitate',
    ],
    correctAnswerIndex: 1, // B
    explanation:
      'Dezinformarea mizează pe emoții puternice (frică, entuziasm). Tehnica pauzei reflexive te ajută să nu reacționezi din impuls și să cauți confirmare externă.',
    factTip: 'Știrile alarmiste se răspândesc pe rețele de până la 6 ori mai repede decât cele obiective.',
  },
  {
    id: 2,
    category: 'Inteligență Artificială & Imagini',
    question: 'Ce detaliu vizual trădează cel mai adesea o fotografie generată de inteligența artificială?',
    options: [
      'Anomaliile anatomice la degete, reflexiile ilogice și literele deformate pe fundal',
      'Prezența unui număr foarte mare de culori vii în compoziția fotografică',
      'Faptul că imaginea a fost salvată în format standard JPG sau PNG',
      'Captura a fost realizată în aer liber pe timp de zi însorită',
    ],
    correctAnswerIndex: 0, // A
    explanation:
      'Modelele generative creează adesea erori la structurile fine: degete contopite sau suplimentare, text ilizibil pe etichete și reflexii fizic imposibile.',
    factTip: 'Mărirea imaginii la detalii secundare (mâini, fundal) este cel mai rapid mod de detectare.',
  },
  {
    id: 3,
    category: 'Verificarea Surselor',
    question: 'Ce presupune tehnica numită „lectură laterală” folosită de jurnaliști?',
    options: [
      'Citirea pe diagonală a primului și ultimului paragraf din articol',
      'Rotirea ecranului telefonului pe orizontală pentru o citire mai amplă',
      'Deschiderea unor tab-uri noi pentru a cerceta ce spun alte surse despre autor',
      'Traducerea automată a textului într-o limbă de circulație internațională',
    ],
    correctAnswerIndex: 2, // C
    explanation:
      'Lectura laterală înseamnă părăsirea paginii suspecte pentru a căuta context extern: reputația autorului și confirmarea din partea altor publicații independente.',
    factTip: 'Verificatorii de fapte părăsesc pagina suspectă în primele secunde pentru a căuta dovezi externe.',
  },
  {
    id: 4,
    category: 'Protejarea Datelor Personale',
    question: 'Care dintre următoarele date NU trebuie niciodată trimisă pe formulare din reclame?',
    options: [
      'Părerea ta despre un film văzut recent la cinematograf',
      'Materia școlară preferată sau sportul pe care îl practici',
      'Titlul cărții pe care o citești în timpul liber',
      'Codul Numeric Personal (CNP) și datele cardului bancar',
    ],
    correctAnswerIndex: 3, // D
    explanation:
      'CNP-ul și detaliile bancare sunt strict confidențiale. Divulgarea lor pe site-uri dubioase poate conduce la furt de identitate și fraude financiare.',
    factTip: 'Instituțiile publice românești nu solicită niciodată date bancare pe rețele sociale.',
  },
  {
    id: 5,
    category: 'Siguranță Online & Cyberbullying',
    question: 'Ce este indicat să faci dacă ești ținta sau martorul unei hărțuiri online pe chat?',
    options: [
      'Să răspunzi cu insulte mai dure pentru a demonstra că nu te lași intimidat',
      'Să salvezi capturi de ecran, să blochezi agresorul și să ceri ajutorul unui adult',
      'Să ștergi imediat aplicația din telefon fără a povesti nimănui ce s-a întâmplat',
      'Să distribui mesajele primite pe toate profilurile tale publice de social media',
    ],
    correctAnswerIndex: 1, // B
    explanation:
      'Păstrarea dovezilor (capturi complete cu dată) și raportarea către un adult de încredere sau Telefonul Copilului (116 111) este singura cale sigură.',
    factTip: 'Răspunsul agresiv nu rezolvă problema și poate atrage sancțiuni administrative din partea platformei.',
  },
  {
    id: 6,
    category: 'Inginerie Socială & Phishing',
    question: 'Primești un SMS despre un „colet blocat” cu un link necunoscut `.xyz`. Ce decizie iei?',
    options: [
      'Nu accesezi linkul și verifici comanda doar pe aplicația oficială a firmei de curierat',
      'Apeși pe link și completezi formularul dacă ți se promite o reducere substanțială',
      'Redirecționezi SMS-ul la 10 prieteni pentru a afla dacă au primit același mesaj',
      'Trimiți o fotografie cu carnetul de elev ca răspuns direct la acel SMS',
    ],
    correctAnswerIndex: 0, // A
    explanation:
      'Mesajul este o tentativă clară de Smishing (phishing prin SMS). Curierii oficiali trimit coduri AWB (Air Waybill) verificabile direct pe site-ul lor oficial, nu linkuri obscure.',
    factTip: 'Adresele cu extensii ieftine (.xyz, .top) sunt frecvent folosite de infractori pentru a clona site-uri.',
  },
  {
    id: 7,
    category: 'Algoritmi & Bule de Filtrare',
    question: 'Ce reprezintă fenomenul de „bulă de filtrare” (Filter Bubble) pe rețele?',
    options: [
      'O opțiune de securitate din browser care ascunde reclamele comerciale nedorite',
      'Un efect vizual artistic aplicat pe fotografiile postate în secțiunea Story',
      'Faptul că algoritmii îți oferă doar conținut similar cu ceea ce ai consumat anterior',
      'O eroare de conexiune ce împiedică încărcarea videoclipurilor de lungă durată',
    ],
    correctAnswerIndex: 2, // C
    explanation:
      'Algoritmii optimizează timpul petrecut pe platformă, arătându-ți doar păreri care îți confirmă convingerile și izolându-te de alte perspective legitime.',
    factTip: 'Căutarea intenționată a punctelor de vedere opuse ajută la spargerea bulei de filtrare.',
  },
  {
    id: 8,
    category: 'Limitele Detectoarelor AI',
    question: 'Câtă încredere putem avea într-un soft gratuit de detectare a textelor generate de IA?',
    options: [
      'Reprezintă o dovadă judiciară infailibilă recunoscută fără rezerve de orice instanță',
      'Scorul este orientativ, detectoarele având frecvent erori (fals pozitive sau negative)',
      'Acuratețea este întotdeauna de 100% deoarece analizele statistice nu pot greși',
      'Softul înlocuiește complet necesitatea ca profesorul să citească lucrarea unui elev',
    ],
    correctAnswerIndex: 1, // B
    explanation:
      'Detectoarele automate analizează probabilități lingvistice și pot califica greșit un eseu uman formal drept conținut AI. Este obligatorie evaluarea critică umană.',
    factTip: 'Chiar creatorii modelelor generative au recunoscut limitele majore ale detectoarelor de text.',
  },
  {
    id: 9,
    category: 'Autentificare & Securitate',
    question: 'Care este cea mai eficientă metodă de securizare a contului tău de email principal?',
    options: [
      'Scrierea aceleiași parole simple de 6 caractere pe toate rețelele sociale',
      'Notarea parolei într-un caiet lăsat pe banca de la școală pentru a nu o uita',
      'Schimbarea numelui de utilizator în fiecare săptămână fără modificarea parolei',
      'O parolă complexă sau frază-parolă lungă combinată cu autentificarea în doi pași (2FA)',
    ],
    correctAnswerIndex: 3, // D
    explanation:
      'Autentificarea în doi pași (2FA) blochează accesul atacatorului chiar dacă acesta îți află parola, solicitând un cod temporar generat pe telefonul tău.',
    factTip: 'Frazele-parolă formate din 4 cuvinte fără legătură logică sunt ușor de memorat și greu de spart.',
  },
  {
    id: 10,
    category: 'Etică Digitală',
    question: 'Ce regulă trebuie respectată înainte de a publica o fotografie cu colegii de clasă?',
    options: [
      'Să le ceri acordul explicit înainte de a posta sau distribui imaginea în spațiul public',
      'Să o postezi imediat dacă este o ipostază comică sau stânjenitoare pentru ei',
      'Să adaugi un filtru colorat pe fața lor fără să îi întrebi dacă sunt de acord',
      'Să o trimiți pe un grup privat spunându-le că oricum toți o vor vedea mai târziu',
    ],
    correctAnswerIndex: 0, // A
    explanation:
      'Dreptul la imagine și la intimitate este garantat prin lege. Publicarea fără consimțământ poate afecta emoțional o persoană și constituie o încălcare etică.',
    factTip: 'Consimțământul este un principiu de bază al respectului reciproc în mediul digital.',
  },
];

// Cele 10 imagini pentru jocul interactiv „Real sau IA?”
// Secvența cerută: real, IA, IA, real, IA, real, real, IA, real, IA
// Imaginile reale corespund celor 5 surse specificate:
// 1. Castelul Peleș (wel.ro)
// 2. Mâinile olarului modelând lutul (Pixabay pottery)
// 3. Cadru documentar din natură (gstatic #1)
// 4. Detaliu foto autentic (gstatic #2)
// 5. Târgul de Crăciun de la Craiova (lyodtour.ro)
export const REAL_OR_AI_ITEMS: AiGameImage[] = [
  {
    id: 1,
    title: 'Castelul Peleș din Sinaia',
    imageSrc: '/src/assets/images/real_peles_wel.webp',
    isAi: false,
    verdictLabel: 'Fotografie reală',
    clues:
      'Geometria arhitecturală este perfect coerentă, cu detalii reale de zidărie din piatră, îmbinări autentice din lemn neoromânesc și vegetație naturală specifică pădurilor din Carpați. Nu există deformări sau artefacte de topire specifice IA.',
    sourceOrigin: 'Fotografie documentară reală a monumentului istoric Castelul Peleș (Sursa: wel.ro/atractie/castelul-peles).',
  },
  {
    id: 2,
    title: 'Portretul unei eleve în bibliotecă',
    imageSrc: '/src/assets/images/ai_sample_portrait_1793287000276.jpg',
    isAi: true,
    verdictLabel: 'Generată de IA',
    clues:
      'Textura pielii prezintă o netezime artificială exagerată (aspect ușor de ceară), literele de pe cotorul cărții din prim-plan au o tipografie parțial deformată, iar reflexia luminii pe iris este perfect circulară fără reflexe optice naturale.',
    sourceOrigin: 'Imagine sintetică generată cu un model de inteligență artificială (text-to-image).',
  },
  {
    id: 3,
    title: 'Ceasornicarul în atelierul vintage',
    imageSrc: '/src/assets/images/ai_sample_clockmaker_1793287000712.jpg',
    isAi: true,
    verdictLabel: 'Generată de IA',
    clues:
      'Mecanismele din alamă conțin roți dințate care se întrepătrund în unghiuri imposibile din punct de vedere mecanic, iar uneltele de pe bancul de lucru își pierd conturul clar către margini.',
    sourceOrigin: 'Compoziție vizuală generată cu inteligență artificială generativă.',
  },
  {
    id: 4,
    title: 'Mâinile unui olar modelând lutul',
    imageSrc: '/src/assets/images/real_sample_pottery_1793287019930.jpg',
    isAi: false,
    verdictLabel: 'Fotografie reală',
    clues:
      'Anatomia mâinilor respectă proporțiile fizice naturale, ridurile și porii pielii conțin particule reale de argilă, iar picăturile de apă de pe roata de olărit au o dinamică fizică realistă, imposibil de reprodus identic de modelele curente.',
    sourceOrigin: 'Fotografie macro autentică a unui meșteșugar olar într-un atelier tradițional (Sursa: Pixabay pottery-10258355).',
  },
  {
    id: 5,
    title: 'Pisică roșcată cu fular în zăpadă',
    imageSrc: '/src/assets/images/ai_sample_cat_1793287000492.jpg',
    isAi: true,
    verdictLabel: 'Generată de IA',
    clues:
      'Firele de blană din jurul gâtului se contopesc nefiresc cu țesătura tricotată a fularului, iar fulgii de zăpadă din fundal prezintă o dispersie matematică repetitivă fără variația microscopică a cristalelor reale.',
    sourceOrigin: 'Imagine foto-realistă generată prin model AI generativ.',
  },
  {
    id: 6,
    title: 'Cadru documentar din natură',
    imageSrc: '/src/assets/images/real_gstatic_1.jpg',
    isAi: false,
    verdictLabel: 'Fotografie reală',
    clues:
      'Textura aspră a rocii și a vegetației naturale prezintă variații biologice autentice și zgomot de senzor optic natural (ISO), fără neteziri specifice algoritmilor de sinteză neurală.',
    sourceOrigin: 'Fotografie documentară reală indexată web (Sursa: arhiva foto documentară).',
  },
  {
    id: 7,
    title: 'Detaliu foto autentic',
    imageSrc: '/src/assets/images/real_gstatic_2.jpg',
    isAi: false,
    verdictLabel: 'Fotografie reală',
    clues:
      'Reflexiile de lumină pe suprafață și micro-imperfecțiunile optice respectă legile fizicii optice, fără incongruențe de profunzime de câmp (depth-of-field) specifice filtrelor IA.',
    sourceOrigin: 'Fotografie documentară reală (Sursa: arhivă fotografică online verificată).',
  },
  {
    id: 8,
    title: 'Explorator în canion de nisip roșu',
    imageSrc: '/src/assets/images/ai_sample_desert_1793287018688.jpg',
    isAi: true,
    verdictLabel: 'Generată de IA',
    clues:
      'Cristalele turcoaz emit o lumină internă fizic incompatibilă cu refracția optică a stâncilor, iar cusăturile costumului conțin detalii decorative asimetrice fără funcționalitate tehnică reală.',
    sourceOrigin: 'Concept vizual științifico-fantastic generat prin AI.',
  },
  {
    id: 9,
    title: 'Târgul de Crăciun de la Craiova',
    imageSrc: '/src/assets/images/real_craiova_market.jpg',
    isAi: false,
    verdictLabel: 'Fotografie reală',
    clues:
      'Instalațiile luminoase și căsuțele tradiționale din lemn prezintă cablaje electrice reale, proporții arhitecturale corecte specifice centrului Craiovei și reflexii nocturne firești pe pavaj.',
    sourceOrigin: 'Fotografie documentară de la Târgul de Crăciun din Craiova (Sursa: Lyod Tour / lyodtour.ro).',
  },
  {
    id: 10,
    title: 'Vilă pe stânci cu atriu de sticlă',
    imageSrc: '/src/assets/images/ai_sample_architecture_1793287019586.jpg',
    isAi: true,
    verdictLabel: 'Generată de IA',
    clues:
      'Cascada care traversează interiorul clădirii sfidează legile ingineriei structurale, iar reflexiile de pe geamurile curbate nu corespund orizontului oceanic din stânga.',
    sourceOrigin: 'Redare arhitecturală conceptuală creată prin instrumente de inteligență artificială.',
  },
];

// 6 Teme esențiale de Siguranță Online
export const SAFETY_TOPICS: SafetyTopic[] = [
  {
    id: 'date-personale',
    title: 'Protejarea Datelor Personale',
    summary: 'Învață ce informații să păstrezi private pentru a evita furtul de identitate și compromiterea profilului.',
    iconName: 'Shield',
    keyPoints: [
      'Nu publica fotografii cu buletinul, carnetul de elev sau bilete de concert (codul de bare poate fi citit).',
      'Evită să dezvălui în postări publice adresa exactă de acasă sau când ești singur.',
      'Configurează profilurile de pe rețele ca fiind „Private”, acceptând doar persoane cunoscute.',
      'Atenție la jocurile de tip „10 lucruri despre mine” — deseori colectează răspunsurile la întrebările de securitate.',
    ],
    actionAdvice: 'Caută-ți numele pe Google o dată pe an pentru a vedea ce date publice apar despre tine.',
    teenScenario: 'Exemplu: Ioana a postat carnetul de conducere abia luat,cu CNP-ul lăsat la vedere.',
    badge: 'Confidențialitate',
  },
  {
    id: 'parole-2fa',
    title: 'Parole Sigure & Autentificare 2FA',
    summary: 'Construiește o fortăreață digitală în jurul conturilor tale folosind fraze-parolă și al doilea factor.',
    iconName: 'KeyRound',
    keyPoints: [
      'Folosește o parolă diferită pentru fiecare cont important (în special email-ul principal).',
      'Alege fraze-parolă lungi (16+ caractere): combină 4-5 cuvinte ușor de reținut pentru tine.',
      'Activează Autentificarea în Doi Pași (2FA) prin aplicații dedicate precum Google Authenticator.',
      'Nu salva parolele în notițe necriptate; folosește un manager de parole certificat.',
    ],
    actionAdvice: 'Verifică dacă adresa ta a fost expusă în breșe de securitate pe www.haveibeenpwned.com.',
    teenScenario: 'Exemplu: Andrei a folosit aceeași parolă pe un joc online și pe Instagram, pierzând accesul la cont.',
    badge: 'Securitate Cont',
  },
  {
    id: 'phishing-frauda',
    title: 'Recunoașterea Tentativelor de Fraudă',
    summary: 'Cum să depistezi capcanele de inginerie socială, ofertele neverosimile și linkurile malițioase.',
    iconName: 'AlertTriangle',
    keyPoints: [
      'Verifică adresa expeditorului (ex: `suport@paypal-ajutor.xyz` în loc de domeniul oficial).',
      'Fii precaut la mesajele care creează panică („Contul va fi blocat în 4 ore dacă nu confirmi”).',
      'Nu descărca atașamente nesolicitate cu extensii necunoscute (`.exe`, `.scr`, `.zip`).',
      'Niciun magazin legitim nu îți cere datele de pe card pentru a-ți livra un premiu gratuit.',
    ],
    actionAdvice: 'Când ai dubii privind un SMS de la bancă sau școală, apelează numărul oficial găsit independent.',
    teenScenario: 'Exemplu: Maria a primit pe Discord un fișier de la un necunoscut pretinzând că e un joc gratuit.',
    badge: 'Inginerie Socială',
  },
  {
    id: 'cyberbullying',
    title: 'Cyberbullying & Comunicare Respectuoasă',
    summary: 'Promovarea unui spațiu digital empatic, sigur și lipsit de intimidare sau excludere.',
    iconName: 'Users',
    keyPoints: [
      'Cuvintele scrise pe ecran au același impact emoțional ca cele spuse în clasă față în față.',
      'Nu participa la linsaje online sau bârfe pe grupuri fără a ști adevărul.',
      'Dacă ești martor la agresarea unui coleg într-un chat, ia poziție sau anunță un profesor.',
      'Crearea de pagini de parodie jignitoare la adresa colegilor constituie o formă de hărțuire.',
    ],
    actionAdvice: 'Fii un susținător activ (upstander), nu un spectator pasiv. Un mesaj de sprijin poate conta enorm.',
    teenScenario: 'Exemplu: Într-un grup de WhatsApp, Răzvan intervine când se glumește răutăcios pe seama unui coleg.',
    badge: 'Etică Digitală',
  },
  {
    id: 'imagini-responsabile',
    title: 'Distribuirea Responsabilă a Imaginilor',
    summary: 'Respectul intimității, acordul explicit și conștientizarea amprentei digitale permanente.',
    iconName: 'Camera',
    keyPoints: [
      'Ceea ce postezi lasă o urmă digitală permanentă; capturile de ecran pot fi salvate oricând.',
      'Cere acordul colegilor înainte de a publica o fotografie în care apar și ei.',
      'Nu trimite niciodată imagini intime; acestea pot deveni instrumente de șantaj digital.',
      'Modificarea imaginilor altor persoane prin unelte AI fără acord reprezintă o faptă gravă.',
    ],
    actionAdvice: 'Gândește-te dacă ai dori ca acea imagine să fie văzută peste câțiva ani de viitorul tău angajator.',
    teenScenario: 'Exemplu: La o petrecere, elevii cer acordul gazdei înainte de a publica imagini din casă.',
    badge: 'Amprentă Digitală',
  },
  {
    id: 'ghid-urgenta',
    title: 'Ce faci când întâlnești o situație periculoasă?',
    summary: 'Plan de acțiune imediată și resurse oficiale de asistență pentru adolescenți.',
    iconName: 'LifeBuoy',
    keyPoints: [
      '1. FĂ CAPTURI DE ECRAN: Salvează mesajele, ora, profilul și linkurile ca dovadă.',
      '2. NU CEDA ȘANTAJULUI: Plata sau cedarea la amenințări nu oprește abuzul.',
      '3. BLOCHEAZĂ ȘI RAPORTEAZĂ: Utilizează funcțiile de raportare din aplicație.',
      '4. CERI AJUTOR: Vorbește cu părinții, dirigintele sau psihologul liceului.',
    ],
    actionAdvice: 'Sună gratuit la 116 111 (Telefonul Copilului) sau 1911 (DNSC pentru incidente de securitate).',
    teenScenario: 'Numere Utile: Telefonul Copilului: 116 111 | DNSC: 1911 | Poliția Română.',
    badge: 'Ghid de Urgență',
  },
];

// Ghidul de Verificare în 5 Pași
export const VERIFICATION_STEPS: VerificationStep[] = [
  {
    stepNumber: 1,
    title: 'Verifică Sursa',
    subtitle: 'Cine a publicat informația și ce reputație are?',
    description:
      'Nu te lăsa păcălit de un design grafic îngrijit. Verifică cine deține site-ul și dacă există o redacție reală asumată.',
    actionList: [
      'Verifică pagina „Despre noi” sau „Contact”: există o adresă fizică sau date editoriale?',
      'Analizează extensia adresei web: este un domeniu recunoscut (.ro, .com) sau o clonă (.top, .xyz)?',
      'Caută pe Google numele publicației împreună cu termenul „proprietar” sau „credibilitate”.',
    ],
    proTip: 'Dacă un cont a fost creat recent și postează doar știri alarmiste, tratează-l cu suspiciune maximă.',
  },
  {
    stepNumber: 2,
    title: 'Analizează Autorul și Data Publicării',
    subtitle: 'Există o persoană reală și o dată clară de emitere?',
    description:
      'Multe dezinformări folosesc nume fictive de jurnaliști sau recirculă evenimente dramatice vechi de 7 ani ca și cum s-ar întâmpla azi.',
    actionList: [
      'Caută numele autorului pe motoare de căutare: este jurnalist sau specialist în domeniul respectiv?',
      'Verifică data publicării: nu confunda o știre veche readusă în prim-plan cu un eveniment curent.',
      'Atenție la expresii vagi precum „specialiștii afirmă” fără a nominaliza niciun expert concret.',
    ],
    proTip: 'Fenomenul „zombie news” constă în redistribuirea unui incident vechi pentru a genera panică acum.',
  },
  {
    stepNumber: 3,
    title: 'Caută Dovezi și Linkuri Primare',
    subtitle: 'Pe ce date concrete se sprijină afirmațiile?',
    description:
      'Orice afirmație importantă trebuie susținută prin dovezi verificabile: legi, studii științifice sau statistici oficiale.',
    actionList: [
      'Apasă pe linkurile din articol: te conduc către documentul original sau doar către alt blog?',
      'Verifică dacă cifrele provin de la institute oficiale (ex: Institutul Național de Statistică, Eurostat).',
      'Caută declarațiile oficiale ale persoanelor menționate pe conturile lor verificate.',
    ],
    proTip: 'O captură de ecran neverificată pe WhatsApp nu are nicio valoare probatorie.',
  },
  {
    stepNumber: 4,
    title: 'Compară cu Alte Surse (Lectura Laterală)',
    subtitle: 'Mai relatează și alte publicații independente subiectul?',
    description:
      'Dacă un eveniment de mare amploare chiar a avut loc, toate agențiile de presă naționale și internaționale vor scrie despre el.',
    actionList: [
      'Deschide tab-uri paralele și caută subiectul pe Agerpres, Europa Liberă, Digi24, BBC sau Reuters.',
      'Dacă doar un singur site obscur menționează vestea șocantă, probabilitatea să fie falsă este foarte ridicată.',
      'Consultă platformele de verificare a faptelor (Factual.ro, Veridica.ro).',
    ],
    proTip: 'Citește orizontal (deschizând 3 surse diferite în paralel), nu doar pe pagina suspectă inițială.',
  },
  {
    stepNumber: 5,
    title: 'Analizează Imaginile și Conținutul Generat de IA',
    subtitle: 'Imaginea redă realitatea sau a fost manipulată digital?',
    description:
      'Instrumentele moderne de inteligență artificială pot genera imagini convingătoare. Verifică detaliile fine înainte de a le crede.',
    actionList: [
      'Folosește căutarea inversă de imagini (Google Lens) pentru a afla prima dată când a apărut fotografia.',
      'Examinează detaliile periferice: textura mâinilor, îmbinarea ferestrelor și reflexiile din oglinzi.',
      'Fii atent la audio în videoclipurile deepfake: mișcarea buzelor este perfect sincronizată?',
    ],
    proTip: 'Verifică metadatele EXIF ale fotografiei dacă sunt disponibile pentru a afla modelul camerei foto.',
    aiSpecificNote:
      'ATENȚIE: Softurile automate de detectare a textului sau a imaginilor AI pot genera erori frecvente (fals pozitive). Ele nu constituie niciodată o dovadă certă unică fără raționament uman!',
  },
];

// Jurnalul de Prompturi
export const PROMPT_LOGS: PromptLogEntry[] = [
  {
    id: 'pr-1',
    phase: 'Faza 1: Concepție & Structură',
    purpose: 'Brainstorming de concepte și structurarea site-ului educativ',
    promptSnippet:
      '„Ajută-mă să structurez un site educativ numit NeuroCheck pentru un proiect de clasa a X-a despre AI, dezinformare și siguranță online. Vreau o abordare modernă, prietenoasă cu adolescenții, fără jargon greoi.”',
    aiResponseSummary:
      'Modelul a sugerat 5 secțiuni cheie și ideea unui format de scenarii interactive inspirat din feed-urile de social media.',
    humanRefinement:
      'Am insistat pe exemple concrete din viața elevilor: grupuri de WhatsApp, TikTok, phishing cu oferte fictive și cyberbullying.',
    modelUsed: 'ChatGPT (GPT-4o)',
    date: '15 Octombrie 2026',
  },
  {
    id: 'pr-2',
    phase: 'Faza 2: Redactare Scenarii Educative',
    purpose: 'Generarea schițelor pentru cele 5 scenarii fictive de verificare',
    promptSnippet:
      '„Propune 5 scenarii realiste, dar complet fictive, de dezinformare online specifice adolescenților din România, cu exemple concrete din viața elevilor și indicii clare de verificare.”',
    aiResponseSummary:
      'IA a generat variante detaliate cu titluri senzaționaliste, indicii de fraudă și explicații.',
    humanRefinement:
      'Am rafinat fiecare scenariu pentru a reflecta situații reale întâlnite de liceeni, am adăugat indicii de gândire critică și am formulat avertismentul de ficțiune didactică.',
    modelUsed: 'ChatGPT (GPT-4o)',
    date: '18 Octombrie 2026',
  },
  {
    id: 'pr-3',
    phase: 'Faza 3: Generare Resurse Vizuale',
    purpose: 'Generarea stilistică a ilustrațiilor în paleta de culori NeuroCheck',
    promptSnippet:
      '„Creează ilustrații moderne în stil vector pentru NeuroCheck. Paletă strictă: Mov #7652D6, Albastru deschis #A9D8FF, Albastru închis #17265E și Alb. Fără coduri hex scrise pe imagini și fără texte în limba engleză.”',
    aiResponseSummary:
      'Modelul a creat ilustrațiile cu elemente tehnologice prietenoase, respectând culorile brandului.',
    humanRefinement:
      'Am eliminat orice text în engleză sau cod de culoare de pe imagini și am integrat diagrame vectoriale curate în română.',
    modelUsed: 'DALL-E 3 & Gemini Image Model',
    date: '22 Octombrie 2026',
  },
  {
    id: 'pr-4',
    phase: 'Faza 4: Jocul Interactiv Real sau IA',
    purpose: 'Implementarea provocării de recunoaștere a fotografiilor reale vs generate de IA',
    promptSnippet:
      '„Structurează o colecție de 10 imagini verificate (5 reale, 5 generate cu IA) cu indicii optice clare, explicații didactice și contor de scor pentru elevi.”',
    aiResponseSummary:
      'A furnizat logica de joc interactiv, alternanța imaginilor și explicațiile tehnice despre reflexii, texturi și anatomie.',
    humanRefinement:
      'Am selectat fotografii reale documentate din România și am integrat explicații accesibile colegilor de liceu.',
    modelUsed: 'Google AI Studio & Claude',
    date: '27 Octombrie 2026',
  },
];

// Feedback inițial: gol conform cerinței utilizatorului
// „stergi ceea ce scrie in sectiunea Raspunsuri colectate deoarece nimeni nu a testat inca aplicatia, dar pe parcurs ce persoanele o testeaza sa se actualizeze”
export const INITIAL_FEEDBACK: FeedbackSubmission[] = [];

// Slide-uri pentru Prezentarea de 5 Minute
export interface PresentationSlide {
  id: number;
  timeEstimate: string;
  title: string;
  kicker: string;
  keyPoints: string[];
  speechNotes: string;
}

export const PRESENTATION_SLIDES: PresentationSlide[] = [
  {
    id: 1,
    timeEstimate: '0:00 - 0:45',
    title: 'NeuroCheck — Gândește critic. Verifică. Rămâi informat.',
    kicker: 'Introducere & Problema Socială',
    keyPoints: [
      'Proiect de Inteligență Artificială realizat de o elevă de clasa a X-a',
      'Problema: Infodemia și vulnerabilitatea tinerilor în fața conținutului sintetic AI',
      'Peste 70% dintre adolescenți s-au confruntat cel puțin o dată cu știri false sau tentative de phishing',
      'Misiunea NeuroCheck: O platformă modernă care dezvoltă imunitatea digitală prin gândire critică',
    ],
    speechNotes:
      '„Bună ziua tuturor! Numele meu este [Nume Elevă], sunt elevă în clasa a X-a, iar astăzi vă prezint NeuroCheck. Trăim într-o eră în care granița dintre realitate și conținut generat de AI a devenit greu de sesizat. Scopul acestui proiect este să ofere fiecărui elev instrumente practice pentru a gândi critic înainte de a distribui.”',
  },
  {
    id: 2,
    timeEstimate: '0:45 - 1:45',
    title: 'Ce oferă platforma NeuroCheck?',
    kicker: 'Arhitectura Produsului',
    keyPoints: [
      '1. Scenarii Adevărat/Fals: 5 cazuri combinate (adevărate, false și insuficient dovedite)',
      '2. Jocul „Real sau IA?”: 10 imagini analizate cu indicii vizuale concrete',
      '3. Quiz Interactiv: 10 întrebări cu răspunsuri amestecate și explicații',
      '4. Ghid de Verificare & Siguranță Online: Lectura laterală, testarea parolelor și 2FA',
    ],
    speechNotes:
      '„NeuroCheck este un produs digital complet funcțional. În pagina Adevărat sau Fals am combinat scenarii reale și fictive pentru antrenament. În noul joc Real sau IA, elevii pot învăța să observe anomaliile vizuale ale imaginilor sintetice, iar în Siguranță Online pot testa direct puterea parolei lor.”',
  },
  {
    id: 3,
    timeEstimate: '1:45 - 2:45',
    title: 'Cum am folosit Inteligența Artificială în mod responsabil',
    kicker: 'Procesul de Co-Creare cu IA',
    keyPoints: [
      'IA ca partener de brainstorming pentru scenarii și variante plauzibile',
      'Generarea elementelor vizuale în paleta strictă (#7652D6, #A9D8FF, #17265E, #FFFFFF)',
      'Asistență la codare pentru componentele interactive în TypeScript și React',
      'Principiul fundamental: Verificarea umană riguroasă (Human-in-the-loop). Nicio linie de conținut nu a fost preluată orbește!',
    ],
    speechNotes:
      '„În dezvoltarea proiectului am utilizat IA la fiecare pas, dar cu control uman permanent. Am eliminat erorile de traducere, am corectat halucinațiile legate de legi sau statistici și am asigurat că fiecare recomandare trimite către instituții oficiale reale.”',
  },
  {
    id: 4,
    timeEstimate: '2:45 - 3:45',
    title: 'Impact Didactic & Siguranță Online',
    kicker: 'Protecția Elevilor',
    keyPoints: [
      'Combaterea cyberbullying-ului și promovarea comunicării empatice pe chat',
      'Ghid de urgență pentru situații de risc și numere de asistență (116 111, 1911)',
      'Înțelegerea limitelor softurilor de detecție AI (fals pozitive / fals negative)',
      'Tester interactiv de parole 100% în browser, fără trimitere de date',
    ],
    speechNotes:
      '„Un punct forte al platformei este secțiunea de Siguranță Online, unde adolescenții învață cum să reacționeze la tentative de phishing, cum să-și configureze autentificarea în doi pași și unde pot apela gratuit dacă se simt în pericol.”',
  },
  {
    id: 5,
    timeEstimate: '3:45 - 4:30',
    title: 'Viziune & Sustenabilitate',
    kicker: 'Concluzii',
    keyPoints: [
      'Platforma este 100% gratuită, sigură și adaptată pentru telefon și calculator',
      'Pregătită pentru orele de dirigenție, TIC și proiecte de educație media',
      'Formular de feedback cu număr de catalog și litera clasei pentru evaluare',
    ],
    speechNotes:
      '„NeuroCheck demonstrează că tinerii pot folosi inteligența artificială nu doar ca divertisment, ci ca o unealtă pentru binele comunității. Vă mulțumesc și vă invit să testăm împreună jocul Real sau IA!”',
  },
  {
    id: 6,
    timeEstimate: '4:30 - 5:00',
    title: 'Demonstrație Live & Întrebări',
    kicker: 'Încheiere',
    keyPoints: [
      'Link public activ pentru testare pe orice dispozitiv',
      'Întrebări și feedback din partea juriului sau a profesorului',
      'Slogan: „Gândește critic. Verifică. Rămâi informat.”',
    ],
    speechNotes:
      '„Vă mulțumesc pentru atenție! Sunt deschisă la întrebările dumneavoastră.”',
  },
];

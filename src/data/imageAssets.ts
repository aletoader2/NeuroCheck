export interface ImageAssetItem {
  key: string;
  title: string;
  description: string;
  defaultSrc: string;
  recommendedAspect: string;
  section: string;
}

export const DEFAULT_IMAGES: Record<string, string> = {
  hero: '/src/assets/images/hero_student_ai_1793279272334.jpg',
  factcheck: '/src/assets/images/factcheck_clean_1793286999256.jpg',
  misinfoPhone: '/src/assets/images/phone_misinfo_1793279275436.jpg',
  shield: '/src/assets/images/shield_digital_ro_clean.jpg',
  aiGuide: '/src/assets/images/guide_clean_1793286999477.jpg',
};

export const IMAGE_METADATA: ImageAssetItem[] = [
  {
    key: 'hero',
    title: 'Ilustrație Principală — Eleva la laptop & simboluri IA',
    description: 'Afișată pe pagina principală (Hero section)',
    defaultSrc: DEFAULT_IMAGES.hero,
    recommendedAspect: '16:9',
    section: 'Acasă',
  },
  {
    key: 'factcheck',
    title: 'Lupa digitală & Verificarea știrilor (Fără coduri de culoare)',
    description: 'Afișată în secțiunea „Adevărat sau fals?”',
    defaultSrc: DEFAULT_IMAGES.factcheck,
    recommendedAspect: '4:3',
    section: 'Adevărat sau fals?',
  },
  {
    key: 'misinfoPhone',
    title: 'Telefonul inteligent & Alertele de dezinformare',
    description: 'Afișată în secțiunile despre dezinformare și pe mobil',
    defaultSrc: DEFAULT_IMAGES.misinfoPhone,
    recommendedAspect: '4:3',
    section: 'Adevărat sau fals? / Quiz',
  },
  {
    key: 'shield',
    title: 'Scutul digital & Securitatea cibernetică',
    description: 'Afișată în secțiunea „Siguranță online”',
    defaultSrc: DEFAULT_IMAGES.shield,
    recommendedAspect: '4:3',
    section: 'Siguranță online',
  },
  {
    key: 'aiGuide',
    title: 'Ghidul vizual de inspecție în 5 pași',
    description: 'Afișată în Ghidul de verificare pas cu pas',
    defaultSrc: DEFAULT_IMAGES.aiGuide,
    recommendedAspect: '4:3',
    section: 'Ghid de verificare',
  },
];

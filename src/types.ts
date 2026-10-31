export type PageId =
  | 'acasa'
  | 'adevarat-fals'
  | 'real-sau-ia'
  | 'quiz'
  | 'siguranta'
  | 'ghid'
  | 'despre'
  | 'feedback'
  | 'prezentare'
  | 'jurnal';

export type ScenarioVerdict = 'adevarat' | 'fals' | 'insuficient';

export interface FactCheckScenario {
  id: string;
  title: string;
  category: string;
  socialContext: {
    platform: 'Instagram' | 'TikTok' | 'WhatsApp' | 'Facebook' | 'Web News';
    author: string;
    handle: string;
    timeAgo: string;
    shares: string;
    likes: string;
  };
  headline: string;
  content: string;
  tags: string[];
  correctVerdict: ScenarioVerdict;
  verdictLabel: string;
  explanation: string;
  redFlags: string[];
  verificationSteps: string[];
  reliableSourcesTip: string;
}

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  factTip: string;
}

export interface SafetyTopic {
  id: string;
  title: string;
  summary: string;
  iconName: string;
  keyPoints: string[];
  actionAdvice: string;
  teenScenario: string;
  badge: string;
}

export interface VerificationStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  actionList: string[];
  proTip: string;
  aiSpecificNote?: string;
}

export interface PromptLogEntry {
  id: string;
  phase: string;
  purpose: string;
  promptSnippet: string;
  aiResponseSummary: string;
  humanRefinement: string;
  modelUsed: string;
  date: string;
}

export interface FeedbackSubmission {
  id: string;
  date: string;
  catalogNumber?: string;
  classLetter?: string;
  ratingNavigation: number;
  ratingClarity: number;
  ratingQuiz: number;
  ratingDesign: number;
  whatWasLearned: string;
  suggestions: string;
}

export interface AiGameImage {
  id: number;
  title: string;
  imageSrc: string;
  isAi: boolean;
  verdictLabel: 'Fotografie reală' | 'Generată de IA';
  clues: string;
  sourceOrigin: string;
}

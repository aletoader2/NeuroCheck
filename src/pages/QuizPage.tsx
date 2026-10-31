import React, { useState, useRef } from 'react';
import { QUIZ_QUESTIONS } from '../data/contentData.ts';
import { PageId } from '../types.ts';
import { PageHomeButton } from '../components/PageHomeButton.tsx';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Award,
  Lightbulb,
} from 'lucide-react';

interface QuizPageProps {
  onNavigate: (page: PageId) => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const questionCardRef = useRef<HTMLDivElement>(null);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentSelection = selectedAnswers[currentQuestion.id];
  const hasAnsweredCurrent = currentSelection !== undefined;

  const handleSelectOption = (index: number) => {
    if (hasAnsweredCurrent) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: index,
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      // Automatically scrolls directly to where the question begins
      setTimeout(() => {
        questionCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else {
      setIsCompleted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate final score
  let correctCount = 0;
  QUIZ_QUESTIONS.forEach((q) => {
    if (selectedAnswers[q.id] === q.correctAnswerIndex) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const getRank = () => {
    if (correctCount >= 9) {
      return {
        badge: 'Detectiv Digital de Elită',
        color: 'text-[#7652D6]',
        bg: 'bg-[#A9D8FF]/30 border-[#7652D6]/40',
        desc: 'Ai o imunitate digitală remarcabilă! Știi să verifici sursele, depistezi conținutul AI și recunoști ingineria socială.',
      };
    }
    if (correctCount >= 7) {
      return {
        badge: 'Verificator Vigilent',
        color: 'text-emerald-700',
        bg: 'bg-emerald-50 border-emerald-200',
        desc: 'Ai reflexe bune de gândire critică. Cu puțină atenție suplimentară la detaliile deepfake și citirea laterală, vei fi de neoprit.',
      };
    }
    if (correctCount >= 5) {
      return {
        badge: 'Explorator în Învățare',
        color: 'text-amber-800',
        bg: 'bg-amber-50 border-amber-200',
        desc: 'Ai cunoștințe de bază, însă uneori te lași influențat de ceea ce pare adevărat. Consultă Ghidul de Verificare pentru a învăța să analizezi informațiile cu mai multă atenție.',
      };
    }
    return {
      badge: 'Ucenic Digital',
      color: 'text-red-700',
      bg: 'bg-red-50 border-red-200',
      desc: 'Internetul poate fi periculos fără precauții. Te sfătuim să reiei scenariile din secțiunea Adevărat sau Fals și să parcurgi sfaturile de siguranță.',
    };
  };

  const rank = getRank();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Home Navigation Button */}
      <PageHomeButton onNavigateHome={() => onNavigate('acasa')} position="top" />

      {/* Quiz Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7652D6]">
          Evaluare Interactivă
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17265E]">
          Quiz NeuroCheck: Cât de vigilent ești online?
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          10 întrebări practice despre știri false, imagini generate de IA, protejarea datelor și igiena digitală pe rețele.
        </p>
      </div>

      {!isCompleted ? (
        <div
          ref={questionCardRef}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6"
        >
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="text-[#17265E]">
                Întrebarea {currentIndex + 1} din {totalQuestions}
              </span>
              <span className="text-[#7652D6]">
                {currentQuestion.category}
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#7652D6] transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <h2 className="text-lg sm:text-2xl font-bold text-[#17265E] leading-snug pt-2">
            {currentQuestion.question}
          </h2>

          {/* 4 Options */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = currentSelection === idx;
              const isCorrect = idx === currentQuestion.correctAnswerIndex;

              let styleClasses = 'bg-white border-slate-200 hover:border-[#7652D6] text-slate-800';
              if (hasAnsweredCurrent) {
                if (isCorrect) {
                  styleClasses = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-400';
                } else if (isSelected && !isCorrect) {
                  styleClasses = 'bg-red-50 border-red-500 text-red-950 ring-1 ring-red-400';
                } else {
                  styleClasses = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnsweredCurrent}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3.5 ${styleClasses}`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                      hasAnsweredCurrent && isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : hasAnsweredCurrent && isSelected && !isCorrect
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-slate-100 text-slate-600 border-slate-300'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed flex-1">{option}</span>
                  {hasAnsweredCurrent && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {hasAnsweredCurrent && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation revealed on answer */}
          {hasAnsweredCurrent && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#7652D6]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#17265E]">
                  Explicație Didactică
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {currentQuestion.explanation}
              </p>
              <div className="p-2.5 rounded-xl bg-[#A9D8FF]/20 border border-[#A9D8FF]/60 text-xs text-[#17265E] font-medium">
                💡 <strong>Știai că?</strong> {currentQuestion.factTip}
              </div>
            </div>
          )}

          {/* Next Button Footer */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <span className="text-xs text-slate-500">
              {hasAnsweredCurrent
                ? 'Citește explicația înainte de a trece mai departe'
                : 'Selectează una din cele 4 variante'}
            </span>

            <button
              onClick={handleNextQuestion}
              disabled={!hasAnsweredCurrent}
              className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#7652D6] hover:bg-[#6442C4] disabled:opacity-40 disabled:pointer-events-none rounded-xl transition-all flex items-center gap-2 shadow-sm"
            >
              <span>{currentIndex === totalQuestions - 1 ? 'Vezi rezultatul final' : 'Următoarea întrebare'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results Card */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm text-center space-y-8 animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 rounded-3xl bg-[#A9D8FF]/30 border border-[#A9D8FF]/60 text-[#7652D6] mx-auto flex items-center justify-center">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Rezultat Final Evaluare
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#17265E]">
              {correctCount} / {totalQuestions}
            </h2>
            <p className="text-lg font-bold text-[#7652D6]">
              Acuratețe: {percentage}%
            </p>
          </div>

          {/* Badge & Feedback */}
          <div className={`p-6 rounded-3xl border max-w-lg mx-auto space-y-2 ${rank.bg}`}>
            <span className={`text-xs font-extrabold uppercase tracking-wider ${rank.color}`}>
              Titlu Obținut
            </span>
            <h3 className={`text-xl font-bold ${rank.color}`}>
              {rank.badge}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {rank.desc}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#7652D6] hover:bg-[#6442C4] rounded-xl transition-all shadow-sm flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reia testul</span>
            </button>

            <button
              onClick={() => onNavigate('real-sau-ia')}
              className="px-6 py-3.5 text-xs sm:text-sm font-bold text-[#17265E] bg-[#A9D8FF]/40 hover:bg-[#A9D8FF]/70 border border-[#A9D8FF] rounded-xl transition-all"
            >
              Joacă „Real sau IA?”
            </button>

            <button
              onClick={() => onNavigate('feedback')}
              className="px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              Lasă o evaluare la Feedback
            </button>
          </div>
        </div>
      )}

      {/* Bottom Home Navigation Button */}
      <PageHomeButton onNavigateHome={() => onNavigate('acasa')} position="bottom" />
    </div>
  );
};

import React, { useState, useRef } from 'react';
import { REAL_OR_AI_ITEMS } from '../data/contentData.ts';
import { PageId } from '../types.ts';
import { SafeImage } from '../components/SafeImage.tsx';
import { PageHomeButton } from '../components/PageHomeButton.tsx';
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  Camera,
  RotateCcw,
  ArrowRight,
  Info,
  Award,
  Search,
} from 'lucide-react';

interface RealOrAiPageProps {
  onNavigate: (page: PageId) => void;
}

export const RealOrAiPage: React.FC<RealOrAiPageProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentItem = REAL_OR_AI_ITEMS[currentIndex];
  const totalItems = REAL_OR_AI_ITEMS.length;
  const userChoice = selectedAnswers[currentItem.id];
  const hasAnsweredCurrent = userChoice !== undefined;

  const handleSelectChoice = (isAiChoice: boolean) => {
    if (hasAnsweredCurrent) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentItem.id]: isAiChoice,
    }));
  };

  const handleNextItem = () => {
    if (currentIndex < totalItems - 1) {
      setCurrentIndex((prev) => prev + 1);
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else {
      setIsCompleted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Score calculation
  let correctCount = 0;
  REAL_OR_AI_ITEMS.forEach((item) => {
    if (selectedAnswers[item.id] !== undefined && selectedAnswers[item.id] === item.isAi) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / totalItems) * 100);

  const getRankFeedback = () => {
    if (correctCount >= 9) {
      return {
        badge: 'Ochi de Vultur Digital',
        color: 'text-[#7652D6]',
        bg: 'bg-[#A9D8FF]/30 border-[#7652D6]/40',
        message:
          'Extraordinar! Ai un simț al observației excepțional. Ai identificat reflexiile, texturile fine și coerența anatomică.',
      };
    }
    if (correctCount >= 7) {
      return {
        badge: 'Investigator Vigilent',
        color: 'text-emerald-700',
        bg: 'bg-emerald-50 border-emerald-200',
        message:
          'Felicitări! Recunoști majoritatea imaginilor sintetice, deși unele cadre hiper-realiste te-au pus pe gânduri.',
      };
    }
    if (correctCount >= 5) {
      return {
        badge: 'Explorator Vizual',
        color: 'text-amber-800',
        bg: 'bg-amber-50 border-amber-200',
        message:
          'Scor onorabil! Granița dintre fotografiile reale și cele create de IA a devenit foarte subțire.',
      };
    }
    return {
      badge: 'Ucenic în Detecție Vizuală',
      color: 'text-red-700',
      bg: 'bg-red-50 border-red-200',
      message:
        'Nu te descuraja! Modelele de inteligență artificială devin tot mai performante. Privește explicațiile fiecărei imagini pentru a reține indiciile cheie.',
    };
  };

  const rank = getRankFeedback();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Home Navigation Button */}
      <PageHomeButton onNavigateHome={() => onNavigate('acasa')} position="top" />

      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A9D8FF]/30 border border-[#A9D8FF]/60 text-xs font-bold text-[#17265E]">
          <Sparkles className="w-3.5 h-3.5 text-[#7652D6]" />
          <span>Provocare Interactivă Vizuală</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17265E]">
          Real sau IA? Tu poți face diferența?
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Privește cu atenție imaginile și descoperă care sunt fotografii reale și care au fost generate de inteligența artificială.
        </p>
      </div>

      {/* Caution Box */}
      <div className="p-4 rounded-2xl bg-[#A9D8FF]/20 border border-[#A9D8FF]/60 flex items-start gap-3">
        <Info className="w-5 h-5 text-[#17265E] shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-[#17265E] leading-relaxed">
          <strong>Reține:</strong> Aspectul vizual al unei imagini nu permite întotdeauna identificarea sigură 100% a originii sale. În caz de dubiu, verificarea sursei primare, a contextului și căutarea inversă (Google Lens) rămân esențiale!
        </p>
      </div>

      {!isCompleted ? (
        <div
          ref={cardRef}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6"
        >
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-[#17265E]">
                Imaginea {currentIndex + 1} din {totalItems}
              </span>
              <span className="text-[#7652D6]">
                Scor curent: {correctCount} corecte
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#7652D6] transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalItems) * 100}%` }}
              />
            </div>
          </div>

          {/* Image Showcase Card */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-[#17265E]">
                {currentItem.title}
              </h2>
              <span className="text-xs text-slate-500 font-mono">
                Cadru #{currentItem.id}
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-100 shadow-inner group">
              <SafeImage
                src={currentItem.imageSrc}
                alt={currentItem.title}
                aspectRatioClass="aspect-[4/3] sm:aspect-[16/10]"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Interactive Choices (Two Buttons: Fotografie reală / Generată de IA) */}
          <div className="space-y-3 pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#17265E]">
              Care este originea acestei imagini?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Button 1: Fotografie reala */}
              <button
                onClick={() => handleSelectChoice(false)}
                disabled={hasAnsweredCurrent}
                className={`p-4 rounded-2xl border text-sm font-bold transition-all flex items-center justify-center gap-2.5 ${
                  hasAnsweredCurrent
                    ? !currentItem.isAi
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300'
                      : userChoice === false
                      ? 'bg-red-50 border-red-500 text-red-950 ring-2 ring-red-300'
                      : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                    : 'bg-white hover:bg-[#A9D8FF]/20 text-[#17265E] border-slate-200 hover:border-[#7652D6]'
                }`}
              >
                <Camera className="w-5 h-5 text-[#7652D6]" />
                <span>Fotografie reală</span>
              </button>

              {/* Button 2: Generată de IA */}
              <button
                onClick={() => handleSelectChoice(true)}
                disabled={hasAnsweredCurrent}
                className={`p-4 rounded-2xl border text-sm font-bold transition-all flex items-center justify-center gap-2.5 ${
                  hasAnsweredCurrent
                    ? currentItem.isAi
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300'
                      : userChoice === true
                      ? 'bg-red-50 border-red-500 text-red-950 ring-2 ring-red-300'
                      : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                    : 'bg-white hover:bg-[#7652D6]/10 text-[#17265E] border-slate-200 hover:border-[#7652D6]'
                }`}
              >
                <Sparkles className="w-5 h-5 text-[#7652D6]" />
                <span>Generată de IA</span>
              </button>
            </div>
          </div>

          {/* Feedback & Clues Revealed after user choice */}
          {hasAnsweredCurrent && (
            <div className="p-5 rounded-2xl border space-y-3 animate-in fade-in duration-200 bg-slate-50 border-slate-200">
              <div
                className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold ${
                  userChoice === currentItem.isAi
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                {userChoice === currentItem.isAi ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Excelent! Răspuns corect: Aceasta este o {currentItem.verdictLabel}.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>
                      Nu chiar! Răspunsul corect este: <strong>{currentItem.verdictLabel}</strong>.
                    </span>
                  </>
                )}
              </div>

              {/* Clues Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-1.5 font-bold text-[#17265E]">
                  <Search className="w-3.5 h-3.5 text-[#7652D6]" />
                  <span>Indicii vizuale de analizat:</span>
                </div>
                <p className="leading-relaxed pl-5">{currentItem.clues}</p>
              </div>

              {/* Verified Source Origin */}
              <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
                <strong className="text-slate-700">Proveniență verificată: </strong>
                <span>{currentItem.sourceOrigin}</span>
              </div>
            </div>
          )}

          {/* Next Button Footer */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <span className="text-xs text-slate-500">
              {hasAnsweredCurrent
                ? 'Analizează explicația și treci la următorul cadru'
                : 'Alege dacă imaginea este reală sau creată de IA'}
            </span>

            <button
              onClick={handleNextItem}
              disabled={!hasAnsweredCurrent}
              className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#7652D6] hover:bg-[#6442C4] disabled:opacity-40 disabled:pointer-events-none rounded-xl transition-all flex items-center gap-2 shadow-sm"
            >
              <span>{currentIndex === totalItems - 1 ? 'Vezi rezultatul final' : 'Următoarea imagine'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Final Score Board */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm text-center space-y-8 animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 rounded-3xl bg-[#A9D8FF]/30 border border-[#A9D8FF]/60 text-[#7652D6] mx-auto flex items-center justify-center">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Rezultat Provocare „Real sau IA?”
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#17265E]">
              {correctCount} / {totalItems}
            </h2>
            <p className="text-lg font-bold text-[#7652D6]">
              Acuratețe vizuală: {percentage}%
            </p>
          </div>

          {/* Encouraging rank message */}
          <div className={`p-6 rounded-3xl border max-w-lg mx-auto space-y-2 ${rank.bg}`}>
            <span className={`text-xs font-extrabold uppercase tracking-wider ${rank.color}`}>
              Evaluare Obținută
            </span>
            <h3 className={`text-xl font-bold ${rank.color}`}>{rank.badge}</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {rank.message}
            </p>
          </div>

          {/* Summary Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRestart}
              className="px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#7652D6] hover:bg-[#6442C4] rounded-xl transition-all shadow-sm flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Joacă din nou</span>
            </button>

            <button
              onClick={() => onNavigate('ghid')}
              className="px-6 py-3.5 text-xs sm:text-sm font-bold text-[#17265E] bg-[#A9D8FF]/40 hover:bg-[#A9D8FF]/70 border border-[#A9D8FF] rounded-xl transition-all"
            >
              Vezi Ghidul de Verificare
            </button>

            <button
              onClick={() => onNavigate('quiz')}
              className="px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              Treci la Quiz (10 Întrebări)
            </button>
          </div>
        </div>
      )}

      {/* Bottom Home Navigation Button */}
      <PageHomeButton onNavigateHome={() => onNavigate('acasa')} position="bottom" />
    </div>
  );
};

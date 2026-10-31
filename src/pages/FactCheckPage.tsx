import React, { useState } from 'react';
import { FACT_CHECK_SCENARIOS } from '../data/contentData.ts';
import { ScenarioVerdict, PageId } from '../types.ts';
import { SafeImage } from '../components/SafeImage.tsx';
import { PageHomeButton } from '../components/PageHomeButton.tsx';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertCircle,
  Search,
  Info,
} from 'lucide-react';

interface FactCheckPageProps {
  factcheckImageSrc: string;
  onNavigate: (page: PageId) => void;
}

export const FactCheckPage: React.FC<FactCheckPageProps> = ({ factcheckImageSrc, onNavigate }) => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(FACT_CHECK_SCENARIOS[0].id);
  const [userVerdicts, setUserVerdicts] = useState<Record<string, ScenarioVerdict>>({});

  const activeScenario =
    FACT_CHECK_SCENARIOS.find((s) => s.id === activeScenarioId) || FACT_CHECK_SCENARIOS[0];

  const handleSelectVerdict = (scenarioId: string, verdict: ScenarioVerdict) => {
    setUserVerdicts((prev) => ({
      ...prev,
      [scenarioId]: verdict,
    }));
  };

  const handleResetAll = () => {
    setUserVerdicts({});
  };

  const completedCount = Object.keys(userVerdicts).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Home Navigation Button */}
      <PageHomeButton onNavigateHome={() => onNavigate('acasa')} position="top" />

      {/* Disclaimer Banner: Strictly Educational Fiction */}
      <div className="p-4 rounded-2xl bg-[#A9D8FF]/20 border border-[#A9D8FF]/60 flex items-start gap-3">
        <Info className="w-5 h-5 text-[#17265E] shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-[#17265E]">
          <strong className="font-bold">Notă didactică:</strong> Scenariile de mai jos sunt concepute pentru antrenarea spiritului critic. Vei întâlni o combinație de informații adevărate, știri false și afirmații fără dovezi suficiente. Analizează fiecare caz cu atenție!
        </div>
      </div>

      {/* Header section with clean illustration (no color codes) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-6 border-b border-slate-200">
        <div className="lg:col-span-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7652D6]">
            Laborator Interactiv de Fact-Checking
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17265E]">
            Adevărat sau fals? Analizează scenariile
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            Pe rețelele sociale, dezinformarea se deghizează adesea în alerte medicale de urgență, imagini spectaculoase generate de IA sau oferte promoționale capcană. Alege un scenariu, analizează indiciile și alege verdictul corect.
          </p>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-2">
            <span>Progres evaluare:</span>
            <span className="text-[#7652D6] font-bold">
              {completedCount} din {FACT_CHECK_SCENARIOS.length} analizate
            </span>
            {completedCount > 0 && (
              <button
                onClick={handleResetAll}
                className="text-slate-400 hover:text-slate-700 underline text-xs"
              >
                Resetează răspunsurile
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-4">
          <SafeImage
            src={factcheckImageSrc}
            alt="Lupă digitală analizând știri și indicii de manipulare"
            fallbackType="factcheck"
            aspectRatioClass="aspect-[4/3]"
          />
        </div>
      </div>

      {/* Scenario Selector Strip */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {FACT_CHECK_SCENARIOS.map((scenario, index) => {
          const isSelected = scenario.id === activeScenarioId;
          const userChoice = userVerdicts[scenario.id];
          const isCorrect = userChoice && userChoice === scenario.correctVerdict;

          return (
            <button
              key={scenario.id}
              onClick={() => setActiveScenarioId(scenario.id)}
              className={`px-4 py-3 rounded-2xl text-xs font-bold text-left transition-all shrink-0 flex items-center gap-2.5 border ${
                isSelected
                  ? 'bg-[#17265E] text-white border-[#17265E] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  isSelected ? 'bg-[#7652D6] text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {index + 1}
              </span>
              <span className="truncate max-w-[160px] sm:max-w-[200px]">
                {scenario.title}
              </span>
              {userChoice && (
                <span className="shrink-0">
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-amber-400" />
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Scenario Card Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: The Social Post Mockup (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Post Social Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#7652D6] text-white font-bold flex items-center justify-center text-xs">
                {activeScenario.socialContext.platform[0]}
              </div>
              <div>
                <p className="text-xs font-bold text-[#17265E]">
                  {activeScenario.socialContext.author}
                </p>
                <p className="text-[11px] text-slate-500">
                  {activeScenario.socialContext.handle} · {activeScenario.socialContext.timeAgo}
                </p>
              </div>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#A9D8FF]/30 text-[#17265E]">
              {activeScenario.socialContext.platform}
            </span>
          </div>

          {/* Post Body */}
          <div className="p-6 space-y-4">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-950 font-bold text-sm sm:text-base leading-snug">
              {activeScenario.headline}
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {activeScenario.content}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {activeScenario.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Engagement metrics mock */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Aprecieri: {activeScenario.socialContext.likes}</span>
              <span>Distribuiri: {activeScenario.socialContext.shares}</span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Decision Deck & Detailed Analysis (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Decision Buttons */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#17265E]">
              Pasul 1: Ce verdict acorzi acestei informații?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleSelectVerdict(activeScenario.id, 'adevarat')}
                className={`p-3.5 rounded-2xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1.5 ${
                  userVerdicts[activeScenario.id] === 'adevarat'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Adevărat</span>
              </button>

              <button
                onClick={() => handleSelectVerdict(activeScenario.id, 'fals')}
                className={`p-3.5 rounded-2xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1.5 ${
                  userVerdicts[activeScenario.id] === 'fals'
                    ? 'bg-red-600 text-white border-red-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-red-50 hover:border-red-300'
                }`}
              >
                <XCircle className="w-5 h-5" />
                <span>Fals</span>
              </button>

              <button
                onClick={() => handleSelectVerdict(activeScenario.id, 'insuficient')}
                className={`p-3.5 rounded-2xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1.5 ${
                  userVerdicts[activeScenario.id] === 'insuficient'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50 hover:border-amber-300'
                }`}
              >
                <HelpCircle className="w-5 h-5" />
                <span>Nu avem dovezi</span>
              </button>
            </div>
          </div>

          {/* Explanation revealed once user chooses */}
          {userVerdicts[activeScenario.id] ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
              {/* Verdict outcome header */}
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 ${
                  userVerdicts[activeScenario.id] === activeScenario.correctVerdict
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                {userVerdicts[activeScenario.id] === activeScenario.correctVerdict ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold text-sm sm:text-base">
                    {userVerdicts[activeScenario.id] === activeScenario.correctVerdict
                      ? 'Felicitări! Ai identificat corect natura mesajului.'
                      : 'Aproape! Iată de ce analiza critică arată alt verdict:'}
                  </p>
                  <p className="text-xs font-semibold text-slate-700 mt-1">
                    Verdict oficial NeuroCheck: <strong>{activeScenario.verdictLabel}</strong>
                  </p>
                </div>
              </div>

              {/* Detailed Reasoning */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#17265E] mb-2">
                  De ce este această concluzie corectă?
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {activeScenario.explanation}
                </p>
              </div>

              {/* Red Flags Clues to Analyze */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#17265E] flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-[#7652D6]" />
                  <span>Indicii de analizat</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {activeScenario.redFlags.map((flag, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#7652D6] font-bold">✔</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Verification Steps */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#17265E]">
                  Ce pași de verificare se recomandă?
                </h4>
                <ol className="space-y-1.5 text-xs text-slate-700 list-decimal list-inside">
                  {activeScenario.verificationSteps.map((step, idx) => (
                    <li key={idx} className="pl-1 leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Reliable Sources Callout */}
              <div className="p-3.5 rounded-xl bg-[#A9D8FF]/20 border border-[#A9D8FF]/60 text-xs text-[#17265E] flex items-center justify-between">
                <div>
                  <span className="font-bold">Unde verifici oficial: </span>
                  <span>{activeScenario.reliableSourcesTip}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-slate-50 border border-dashed border-slate-300 text-center text-slate-500 text-xs space-y-2">
              <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="font-semibold text-slate-700">Alege o variantă de verdict mai sus</p>
              <p>După selectare, vei vedea analiza completă, indiciile ascunse și sursele recomandate.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Home Navigation Button */}
      <PageHomeButton onNavigateHome={() => onNavigate('acasa')} position="bottom" />
    </div>
  );
};

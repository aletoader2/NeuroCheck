import React, { useState } from 'react';
import { VERIFICATION_STEPS } from '../data/contentData.ts';
import { PageId } from '../types.ts';
import { SafeImage } from '../components/SafeImage.tsx';
import { VerificationChecklistModal } from '../components/VerificationChecklistModal.tsx';
import { PageHomeButton } from '../components/PageHomeButton.tsx';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  Globe,
  UserCheck,
  FileSearch,
  Camera,
} from 'lucide-react';

interface GuidePageProps {
  guideImageSrc: string;
  onNavigate: (page: PageId) => void;
}

export const GuidePage: React.FC<GuidePageProps> = ({ guideImageSrc, onNavigate }) => {
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  const visualStepsRomanian = [
    {
      step: 1,
      title: 'Verificarea Sursei',
      desc: 'Analizează adresa URL și reputația site-ului',
      icon: <Globe className="w-5 h-5 text-[#7652D6]" />,
    },
    {
      step: 2,
      title: 'Autorul & Data',
      desc: 'Identifică persoana reală și data emiterii',
      icon: <UserCheck className="w-5 h-5 text-[#7652D6]" />,
    },
    {
      step: 3,
      title: 'Căutarea Dovezilor',
      desc: 'Verifică legăturile primare și actele oficiale',
      icon: <FileSearch className="w-5 h-5 text-[#7652D6]" />,
    },
    {
      step: 4,
      title: 'Lectura Laterală',
      desc: 'Compară cu alte agenții independente de presă',
      icon: <Layers className="w-5 h-5 text-[#7652D6]" />,
    },
    {
      step: 5,
      title: 'Inspecția Conținutului IA',
      desc: 'Examinează anomaliile vizuale și audio',
      icon: <Camera className="w-5 h-5 text-[#7652D6]" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Home Navigation Button */}
      <PageHomeButton onNavigateHome={() => onNavigate('acasa')} position="top" />

      {/* Header section with illustration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-slate-200">
        <div className="lg:col-span-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7652D6]">
            Metodologie Didactică de Fact-Checking
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17265E]">
            Ghidul de Verificare în 5 Pași
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            Cum verifică jurnaliștii de investigație o știre înainte de publicare? Nu ai nevoie de unelte complicate, ci de un algoritm mental clar. Parcurge cei 5 pași pentru a verifica orice afirmație de pe internet.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsChecklistOpen(true)}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#7652D6] hover:bg-[#6442C4] rounded-xl transition-all shadow-xs flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Deschide Verificatorul Tău Pas cu Pas</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-4">
          <SafeImage
            src={guideImageSrc}
            alt="Ghid vizual de verificare și inspecție a informațiilor"
            fallbackType="guide"
            aspectRatioClass="aspect-[4/3]"
          />
        </div>
      </div>

      {/* Romanian 5-Step Visual Infographic Flow */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-[#17265E]">
            Schema Didactică a Procesului de Verificare 
          </h2>
          <span className="text-xs font-semibold text-[#7652D6]">
            De la sursă la concluzie
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          {visualStepsRomanian.map((step) => (
            <div
              key={step.step}
              className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-[#A9D8FF]/15 border border-slate-200 flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-[#7652D6] text-white text-xs font-bold flex items-center justify-center">
                  0{step.step}
                </span>
                <div className="p-1.5 rounded-lg bg-white shadow-2xs">
                  {step.icon}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#17265E]">{step.title}</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crucial Section: The Truth about Automated AI Detectors */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#17265E] to-[#2B3E84] text-white shadow-lg space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
          <AlertTriangle className="w-4 h-4 text-amber-300" />
          <span>Avertisment Critic despre Inteligența Artificială</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">
          De ce uneltele automate de „detectare AI” NU sunt dovezi absolute?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-200 leading-relaxed">
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
            <p className="font-bold text-white flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#A9D8FF]" />
              Fals Pozitive & Fals Negative Frecvente
            </p>
            <p className="text-slate-300">
              Detectoarele de text AI calculează doar probabilități statistice (perplexitate lingvistică). Un text formal, bine scris de un elev, poate fi etichetat eronat drept „100% AI”, în timp ce un text AI ușor modificat poate trece neobservat.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
            <p className="font-bold text-white flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#A9D8FF]" />
              Gândirea Umană este Decidentul Final
            </p>
            <p className="text-slate-300">
              Niciun detector automat nu poate înlocui analiza umană: căutarea sursei primare, verificarea autorului și confruntarea cu realitatea fizică. Niciodată nu acuza o persoană doar pe baza scorului unui site de detecție gratuit!
            </p>
          </div>
        </div>
      </div>

      {/* The 5 Detailed Steps */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7652D6]">
            Protocolul Didactic
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17265E]">
            Cei 5 Pași Explicați pe Larg
          </h2>
        </div>

        <div className="space-y-6">
          {VERIFICATION_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5 hover:border-[#7652D6]/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-[#7652D6] text-white font-extrabold text-base flex items-center justify-center shrink-0 shadow-xs">
                    0{step.stepNumber}
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#17265E]">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#7652D6] font-semibold">{step.subtitle}</p>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {step.description}
              </p>

              {/* Action list */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#17265E]">
                  Ce verifici concret:
                </h4>
                <ul className="space-y-2">
                  {step.actionList.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro Tip */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-[#7652D6] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#17265E]">Truc de profesionist: </strong>
                  <span>{step.proTip}</span>
                </div>
              </div>

              {step.aiSpecificNote && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                  {step.aiSpecificNote}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Verification Checklist Modal */}
      <VerificationChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />

      {/* Bottom Home Navigation Button */}
      <PageHomeButton onNavigateHome={() => onNavigate('acasa')} position="bottom" />
    </div>
  );
};

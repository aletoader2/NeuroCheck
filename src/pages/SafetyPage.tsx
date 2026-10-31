import React, { useState } from 'react';
import { SAFETY_TOPICS } from '../data/contentData.ts';
import { PageId } from '../types.ts';
import { SafeImage } from '../components/SafeImage.tsx';
import { InteractivePasswordTester } from '../components/InteractivePasswordTester.tsx';
import { PhishingSimulatorModal } from '../components/PhishingSimulatorModal.tsx';
import { PageHomeButton } from '../components/PageHomeButton.tsx';
import {
  ShieldCheck,
  KeyRound,
  AlertTriangle,
  Users,
  Camera,
  LifeBuoy,
  PhoneCall,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface SafetyPageProps {
  shieldImageSrc: string;
  onNavigate: (page: PageId) => void;
}

export const SafetyPage: React.FC<SafetyPageProps> = ({ shieldImageSrc, onNavigate }) => {
  const [openTopicId, setOpenTopicId] = useState<string>(SAFETY_TOPICS[0].id);
  const [isPhishingModalOpen, setIsPhishingModalOpen] = useState(false);

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <ShieldCheck className="w-5 h-5 text-[#7652D6]" />;
      case 'KeyRound':
        return <KeyRound className="w-5 h-5 text-[#7652D6]" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-5 h-5 text-[#7652D6]" />;
      case 'Users':
        return <Users className="w-5 h-5 text-[#7652D6]" />;
      case 'Camera':
        return <Camera className="w-5 h-5 text-[#7652D6]" />;
      case 'LifeBuoy':
        return <LifeBuoy className="w-5 h-5 text-[#7652D6]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#7652D6]" />;
    }
  };

  const toggleTopic = (id: string) => {
    setOpenTopicId(openTopicId === id ? '' : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Home Navigation Button */}
      <PageHomeButton onNavigateHome={() => onNavigate('acasa')} position="top" />

      {/* Header section with illustration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-slate-200">
        <div className="lg:col-span-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7652D6]">
            Ghid de Apărare Cibernetică pentru Elevi
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17265E]">
            Siguranță Online: Protejează-te în Lumea Digitală
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            Spațiul online îți oferă libertate și conexiune, dar ascunde și riscuri reale: furt de conturi, șantaj cu imagini, tentative de phishing și agresivitate. Află cum să-ți protejezi identitatea și ce faci dacă întâlnești un pericol.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setIsPhishingModalOpen(true)}
              className="px-4 py-2 text-xs font-bold text-white bg-[#7652D6] hover:bg-[#6442C4] rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Deschide Simulatorul de Phishing</span>
            </button>
            <a
              href="#parole-tester"
              className="px-4 py-2 text-xs font-bold text-[#17265E] bg-[#A9D8FF]/30 hover:bg-[#A9D8FF]/50 border border-[#A9D8FF]/60 rounded-xl transition-all"
            >
              Testează-ți parola
            </a>
          </div>
        </div>

        <div className="lg:col-span-4">
          <SafeImage
            src={shieldImageSrc}
            alt="Scut digital luminos și securitate cibernetică"
            fallbackType="shield"
            aspectRatioClass="aspect-[4/3]"
          />
        </div>
      </div>

      {/* 6 Structured Safety Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#17265E]">
            Cele 6 Teme Esențiale de Siguranță
          </h2>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Apasă pe oricare temă pentru a explora sfaturile și scenariile
          </span>
        </div>

        <div className="space-y-4">
          {SAFETY_TOPICS.map((topic) => {
            const isOpen = openTopicId === topic.id;

            return (
              <div
                key={topic.id}
                className="rounded-3xl border border-slate-200 bg-white shadow-xs overflow-hidden transition-all"
              >
                {/* Header Toggle */}
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#A9D8FF]/30 border border-[#A9D8FF]/60 flex items-center justify-center shrink-0">
                      {getTopicIcon(topic.iconName)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-[#7652D6] uppercase tracking-wider">
                          {topic.badge}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#17265E]">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 sm:line-clamp-none">
                        {topic.summary}
                      </p>
                    </div>
                  </div>

                  <div className="text-slate-400 p-1 rounded-lg">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Expanded Details */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-5 animate-in fade-in duration-150">
                    {/* Key points */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#17265E]">
                        Reguli de protecție obligatorii:
                      </h4>
                      <ul className="space-y-2">
                        {topic.keyPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Teen Scenario Example */}
                    <div className="p-4 rounded-2xl bg-[#A9D8FF]/15 border border-[#A9D8FF]/50 text-xs sm:text-sm text-slate-800 space-y-1">
                      <span className="font-bold text-[#17265E]">Situație din viața de liceu:</span>
                      <p className="text-slate-600 leading-relaxed italic">{topic.teenScenario}</p>
                    </div>

                    {/* Action Advice */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                      <span className="font-bold text-[#7652D6] shrink-0">Ce poți face acum:</span>
                      <span>{topic.actionAdvice}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Tool: Password Strength Tester */}
      <div id="parole-tester" className="scroll-mt-24">
        <InteractivePasswordTester />
      </div>

      {/* Emergency Help Banner: NON-INTERACTIVE informative display as requested */}
      <div className="rounded-3xl bg-[#17265E] text-white p-6 sm:p-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A9D8FF]">
              Ghid de Urgență & Asistență Gratuită
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Ești victima unui abuz sau a unui șantaj online?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Nu ești singur și nu e vina ta. Salvează capturile de ecran fără să ștergi conversația și apelează la serviciile specializate de protecție pentru copii și adolescenți.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col gap-3">
            {/* Non-interactive informational badge 1 */}
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Telefonul Copilului: 116 111</p>
                <p className="text-[11px] text-slate-300">Apel gratuit și confidențial</p>
              </div>
            </div>

            {/* Non-interactive informational badge 2 */}
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#A9D8FF]/20 text-[#A9D8FF] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">DNSC: Număr 1911</p>
                <p className="text-[11px] text-slate-300">Incidente cibernetice și fraude</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Modal */}
      <PhishingSimulatorModal
        isOpen={isPhishingModalOpen}
        onClose={() => setIsPhishingModalOpen(false)}
      />

      {/* Bottom Home Navigation Button */}
      <PageHomeButton onNavigateHome={() => onNavigate('acasa')} position="bottom" />
    </div>
  );
};

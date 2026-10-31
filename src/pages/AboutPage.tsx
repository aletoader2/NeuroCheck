import React, { useState } from 'react';
import { PROMPT_LOGS } from '../data/contentData.ts';
import { PageId } from '../types.ts';
import { PageHomeButton } from '../components/PageHomeButton.tsx';
import {
  Brain,
  Target,
  Users,
  Cpu,
  UserCheck,
  Terminal,
  Presentation,
  CheckCircle2,
} from 'lucide-react';

interface AboutPageProps {
  onOpenPresentation: () => void;
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenPresentation, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'descriere' | 'prompturi'>('descriere');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Home Navigation Button */}
      <PageHomeButton onNavigateHome={() => onNavigate('acasa')} position="top" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7652D6]">
          Despre Proiectul NeuroCheck
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#17265E]">
          Inteligență Artificială, Gândire Critică & Etică
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Proiect realizat pentru disciplina de Inteligență Artificială de către o elevă de clasa a X-a, dedicat combaterii dezinformării și protejării comunității de liceeni.
        </p>

        {/* Tab switcher: Only Viziune & Scop and Jurnal de Prompturi */}
        <div className="pt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => setActiveTab('descriere')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'descriere'
                ? 'bg-[#17265E] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Viziune & Scop
          </button>
          <button
            onClick={() => setActiveTab('prompturi')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'prompturi'
                ? 'bg-[#7652D6] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Jurnal de Prompturi</span>
          </button>
        </div>
      </div>

      {activeTab === 'descriere' && (
        <div className="space-y-10 animate-in fade-in duration-150">
          {/* 3 Architectural Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Problema Sociala */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#7652D6]/10 text-[#7652D6] flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#17265E]">Problema Socială Abordată</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tinerii petrec zilnic între 4 și 7 ore pe rețelele sociale, expuși direct conținutului algoritmic polarizant, manipulării vizuale prin deepfake-uri și schemelor de phishing. Fără un antrenament al gândirii critice, dezinformarea alterează deciziile de sănătate, siguranță și civică ale noii generații.
              </p>
            </div>

            {/* 2. Scopul Proiectului */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#A9D8FF]/30 text-[#17265E] flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#17265E]">Scopul NeuroCheck</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Crearea unui produs educațional digital modern, prietenos și 100% funcțional, care transformă teoria de fact-checking într-o experiență practică prin 5 scenarii captivante, jocul „Real sau IA?”, un quiz de auto-evaluare și instrumente interactive de securitate.
              </p>
            </div>

            {/* 3. Publicul Tinta */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#17265E]">Publicul-Țintă</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                În principal elevi de liceu (clasele IX–XII), dar și profesori de informatică, consilieri școlari și părinți care au nevoie de un ghid pragmatic de discuție la orele de dirigenție și TIC despre riscurile și oportunitățile erei IA.
              </p>
            </div>
          </div>

          {/* AI Usage & Human-in-the-Loop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#7652D6]" />
                <h3 className="text-lg font-bold text-[#17265E]">
                  Cum a fost utilizată Inteligența Artificială?
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Inteligența artificială a fost integrată activ ca asistent și partener de lucru pe parcursul întregului proiect:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Brainstorming și structură:</strong> Definirea arhitecturii paginilor și a fluxului logic de navigare.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Generare de scenarii:</strong> Crearea schițelor narative combinate din mediul online.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Generarea resurselor vizuale:</strong> Ilustrațiile tematice au fost create în paleta NeuroCheck fără coduri scrise pe imagine.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Asistență la programare:</strong> Sprijin în scrierea codului TypeScript/React și optimizarea funcțiilor interactive.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#17265E] text-white space-y-4">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#A9D8FF]" />
                <h3 className="text-lg font-bold text-white">
                  Importanța Verificării Umane (Human-in-the-Loop)
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Niciun text sau cod produs de inteligența artificială nu a fost preluat orbește fără filtrare și validare umană riguroasă:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#A9D8FF] font-bold">1.</span>
                  <span><strong>Corectarea halucinațiilor:</strong> Modelele generative au inventat uneori legi sau denumiri inexistente; am înlocuit fiecare referință cu legislație reală și instituții oficiale (DNSC, ANSVSA, edu.ro).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A9D8FF] font-bold">2.</span>
                  <span><strong>Ajustarea tonului:</strong> Am rescris explicațiile pentru a suna natural, empatic și accesibil elevilor de liceu.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A9D8FF] font-bold">3.</span>
                  <span><strong>Controlul etic:</strong> Nicio imagine nu a fost folosită fără a valida acuratețea mesajului transmis.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Callout Presentation Pitch */}
          <div className="p-8 rounded-3xl bg-[#A9D8FF]/20 border border-[#A9D8FF]/60 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold text-[#17265E]">
                Prezentare de 5 minute pentru evaluarea la clasă
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Slide-uri gata structurate cu timp estimat, notițe de discurs și argumente cheie.
              </p>
            </div>
            <button
              onClick={onOpenPresentation}
              className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#7652D6] hover:bg-[#6442C4] rounded-xl transition-all shadow-sm shrink-0 flex items-center gap-2"
            >
              <Presentation className="w-4 h-4" />
              <span>Lansează Mod Prezentare</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab: Jurnal de Prompturi */}
      {activeTab === 'prompturi' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
            <strong>Documentarea Procesului Creativ:</strong> Acest jurnal atestă interacțiunea reală cu modelele de limbaj și generare vizuală pe parcursul elaborării proiectului NeuroCheck, evidențiind valoarea adăugată prin intervenția umană.
          </div>

          <div className="space-y-6">
            {PROMPT_LOGS.map((log) => (
              <div
                key={log.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7652D6]">
                      {log.phase}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs font-semibold text-[#17265E]">{log.modelUsed}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{log.date}</span>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Scopul interacțiunii
                  </h4>
                  <p className="text-sm font-bold text-[#17265E]">{log.purpose}</p>
                </div>

                {/* Prompt code block */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5 text-[#7652D6]" />
                    <span>Promptul utilizat de elevă:</span>
                  </h4>
                  <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono leading-relaxed overflow-x-auto">
                    {log.promptSnippet}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="text-slate-800 block mb-1">Răspunsul / Propunerea IA:</strong>
                    <p className="text-slate-600 leading-relaxed">{log.aiResponseSummary}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <strong className="text-emerald-950 block mb-1">Intervenția & Rafinarea Umană:</strong>
                    <p className="text-emerald-900 leading-relaxed">{log.humanRefinement}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Home Navigation Button */}
      <PageHomeButton onNavigateHome={() => onNavigate('acasa')} position="bottom" />
    </div>
  );
};

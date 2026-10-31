import React, { useState } from 'react';
import { PageId } from '../types.ts';
import { SafeImage } from '../components/SafeImage.tsx';
import {
  Brain,
  Search,
  ShieldCheck,
  Bot,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Zap,
  Camera,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  heroImageSrc: string;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, heroImageSrc }) => {
  // Quick Interactive Mini-Test in Hero
  const [quickAnswer, setQuickAnswer] = useState<string | null>(null);

  const benefits = [
    {
      icon: <Brain className="w-6 h-6 text-[#7652D6]" />,
      title: 'Gândire Critică',
      kicker: 'Dezvoltă imunitate la clickbait',
      desc: 'Înveți să recunoști manipularea emoțională, titlurile senzaționaliste și tehnicile prin care dezinformarea se răspândește viral.',
      actionText: 'Exersează scenariile',
      page: 'adevarat-fals' as PageId,
    },
    {
      icon: <Camera className="w-6 h-6 text-[#7652D6]" />,
      title: 'Real sau IA?',
      kicker: 'Detectiv vizual (10 imagini)',
      desc: 'Analizează pe rând 10 imagini reale și generate de IA. Învață să observi anomaliile de textură, reflexii și iluminare.',
      actionText: 'Joacă „Real sau IA?”',
      page: 'real-sau-ia' as PageId,
    },
    {
      icon: <Search className="w-6 h-6 text-[#7652D6]" />,
      title: 'Verificarea Informațiilor',
      kicker: 'Metoda Lecturii Laterale',
      desc: 'Descoperi pașii practici folosiți de jurnaliști: căutarea inversă de imagini, analiza sursei primare și a datelor oficiale.',
      actionText: 'Citește ghidul în 5 pași',
      page: 'ghid' as PageId,
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#7652D6]" />,
      title: 'Siguranță Online',
      kicker: 'Protecția adolescenților',
      desc: 'Află cum să-ți securizezi conturile cu parole sigure și 2FA, cum să răspunzi la tentative de phishing și cum să oprești cyberbullying-ul.',
      actionText: 'Află cum te protejezi',
      page: 'siguranta' as PageId,
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 lg:pb-16 border-b border-slate-100 bg-gradient-to-b from-white via-slate-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copy & Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Quiet unboxed kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#7652D6]">
                <span>Platformă Educativă de Inteligență Artificială</span>
                <span aria-hidden="true">·</span>
                <span>Proiect de Clasa a X-a</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#17265E] leading-[1.12] tracking-tight text-balance">
                Internetul e plin de informații.{' '}
                <span className="text-[#7652D6]">Tu știi ce să crezi?</span>
              </h1>

              {/* Tagline & Subtitle with full slogan */}
              <p className="text-lg sm:text-xl font-bold text-[#7652D6]">
                „Gândește critic. Verifică. Rămâi informat.”
              </p>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                NeuroCheck este ghidul tău interactiv împotriva dezinformării, a știrilor false și a capcanelor digitale. Învață să recunoști conținutul generat de IA, testează imagini reale versus sintetice și devino un utilizator conștient.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('quiz')}
                  className="px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-[#7652D6] hover:bg-[#6442C4] rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Începe testul</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('real-sau-ia')}
                  className="px-6 py-3.5 text-sm sm:text-base font-bold text-[#17265E] bg-[#A9D8FF]/40 hover:bg-[#A9D8FF]/70 border border-[#A9D8FF] rounded-xl transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#7652D6]" />
                  <span>Joc: Real sau IA?</span>
                </button>

                <button
                  onClick={() => onNavigate('adevarat-fals')}
                  className="px-5 py-3.5 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all"
                >
                  Adevărat sau fals?
                </button>
              </div>

              {/* Proof strip */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>5 Scenarii Adevărat/Fals</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Joc nou: Real sau IA? (10 cadre)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Quiz de 10 întrebări cu scor</span>
                </div>
              </div>
            </div>

            {/* Right Column: Main Illustration (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white group">
                <SafeImage
                  src={heroImageSrc}
                  alt="Elevă de liceu învățând alfabetizarea în inteligență artificială și gândire critică"
                  fallbackType="hero"
                  aspectRatioClass="aspect-[4/3]"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-slate-100 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#7652D6]/10 text-[#7652D6] flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#17265E]">Dezvoltat de o elevă de clasa a X-a</p>
                  <p className="text-[11px] text-slate-500">Pentru orele de dirigenție, TIC și IA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Spotlight Banner: NEW GAME „Real sau IA?” */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#7652D6] via-[#6442C4] to-[#17265E] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-[#A9D8FF]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pagină Nouă Separată</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Real sau IA? Tu poți face diferența?
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
              Privește cu atenție 10 imagini (peisaje, portrete, meșteșuguri) și descoperă care sunt fotografii reale și care au fost generate de inteligența artificială!
            </p>
          </div>

          <button
            onClick={() => onNavigate('real-sau-ia')}
            className="px-6 py-3.5 text-xs sm:text-sm font-bold text-[#17265E] bg-white hover:bg-[#A9D8FF] rounded-xl shadow-md transition-all shrink-0 flex items-center gap-2"
          >
            <span>Joacă acum (10 Imagini)</span>
            <ArrowRight className="w-4 h-4 text-[#7652D6]" />
          </button>
        </div>
      </section>

      {/* 3. Interactive Mini-Test Widget: "Reflexul Tău Critic în 10 Secunde" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#17265E] text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#A9D8FF]">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Test Rapid de 10 Secunde</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Ai recunoaște un mesaj fals primit pe WhatsApp?
              </h2>
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-sm italic text-slate-200">
                „🚨 ATENȚIE MAXIMĂ! Mâine toate școlile se închid din cauza unui virus necunoscut! Trimite mai departe tuturor colegilor înainte să șteargă mesajul!”
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs uppercase font-bold text-[#A9D8FF] tracking-wider">
                Ce faci în primele 5 secunde?
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setQuickAnswer('share')}
                  className={`text-left p-3 rounded-xl border text-xs font-semibold transition-all ${
                    quickAnswer === 'share'
                      ? 'bg-red-500/30 border-red-400 text-white'
                      : 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
                  }`}
                >
                  A) Trimit imediat mesajul pe grupul clasei să știe toți
                </button>
                <button
                  onClick={() => setQuickAnswer('verify')}
                  className={`text-left p-3 rounded-xl border text-xs font-semibold transition-all ${
                    quickAnswer === 'verify'
                      ? 'bg-emerald-500/30 border-emerald-400 text-white'
                      : 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
                  }`}
                >
                  B) Mă opresc, nu trimit nimic și caut pe site-ul Ministerului Educației (edu.ro)
                </button>
              </div>

              {quickAnswer && (
                <div className="p-3 rounded-xl bg-white text-slate-800 text-xs font-medium animate-in fade-in duration-200">
                  {quickAnswer === 'verify' ? (
                    <div className="text-emerald-800 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Excelent reflex!</strong> Nu ai căzut în capcana panicii. Mesajele cu „trimite urgent” fără sursă sunt 99% false.
                      </div>
                    </div>
                  ) : (
                    <div className="text-red-700 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <strong>Atenție!</strong> Prin distribuire imediată, contribui fără să vrei la răspândirea panicii. Aplică regula pauzei reflexive!
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. The 4 Core Value Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7652D6]">
            Pilonii Platformei
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#17265E]">
            De ce este NeuroCheck esențial pentru adolescenți?
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Trăim într-un ocean de date. Cele 4 instrumente cheie care îți oferă claritate și protecție digitală:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((card, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-6 bg-white border border-slate-200 hover:border-[#7652D6]/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#A9D8FF]/30 border border-[#A9D8FF]/60 flex items-center justify-center transition-transform group-hover:scale-105">
                  {card.icon}
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#7652D6] block mb-1">
                    {card.kicker}
                  </span>
                  <h3 className="text-lg font-bold text-[#17265E]">
                    {card.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  onClick={() => onNavigate(card.page)}
                  className="text-xs font-bold text-[#7652D6] hover:text-[#6442C4] inline-flex items-center gap-1 group-hover:gap-1.5 transition-all"
                >
                  <span>{card.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Quick Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#A9D8FF]/20 border border-[#A9D8FF]/50 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17265E] max-w-xl mx-auto">
            Ești gata să-ți testezi instinctele de detectiv digital?
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Răspunde la cele 10 întrebări de sinteză sau explorează cele 5 scenarii reale de dezinformare întâlnite pe rețelele sociale.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('quiz')}
              className="px-6 py-3 text-sm font-bold text-white bg-[#7652D6] hover:bg-[#6442C4] rounded-xl shadow-sm transition-all"
            >
              Mergi la Quiz (10 Întrebări)
            </button>
            <button
              onClick={() => onNavigate('real-sau-ia')}
              className="px-6 py-3 text-sm font-bold text-white bg-[#17265E] hover:bg-[#2B3E84] rounded-xl transition-all shadow-sm"
            >
              Provocarea „Real sau IA?”
            </button>
            <button
              onClick={() => onNavigate('adevarat-fals')}
              className="px-6 py-3 text-sm font-bold text-[#17265E] bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-xs"
            >
              Scenariile Adevărat / Fals
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

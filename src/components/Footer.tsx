import React from 'react';
import { PageId } from '../types.ts';
import { NeuroCheckLogo } from './NeuroCheckLogo.tsx';
import { ShieldCheck, PhoneCall, HeartHandshake } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenPresentation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPresentation }) => {
  return (
    <footer className="bg-[#17265E] text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <NeuroCheckLogo theme="light" size="lg" />
            <p className="text-[#A9D8FF] text-sm font-semibold">
              „Gândește critic. Verifică. Rămâi informat.”
            </p>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Proiect educativ de Inteligență Artificială realizat de o elevă de clasa a X-a. Misiunea noastră este de a oferi liceenilor instrumentele și imunitatea digitală necesare pentru a naviga în siguranță într-o lume dominată de algoritmi și conținut sintetic.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#A9D8FF]" />
              <span>Conceput conform principiilor de etică digitală și transparență IA</span>
            </div>
          </div>

          {/* Nav Col */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#A9D8FF] mb-4">
              Navigare Rapidă
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <button
                  onClick={() => {
                    onNavigate('acasa');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Acasă
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('adevarat-fals');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Adevărat sau fals?
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('real-sau-ia');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left text-[#A9D8FF] font-semibold"
                >
                  Real sau IA? (10 Imagini)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('quiz');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Quiz Interactiv
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('siguranta');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Siguranță Online & 2FA
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('ghid');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Ghid de Verificare în 5 Pași
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('despre');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Despre Proiect & Jurnal IA
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('feedback');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Formular de Feedback
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Official Assistance Col */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#A9D8FF] mb-4">
              Resurse Oficiale de Ajutor
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 font-bold text-white">
                  <PhoneCall className="w-3.5 h-3.5 text-[#A9D8FF]" />
                  <span>Telefonul Copilului: 116 111</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5">Apel gratuit pentru suport emoțional și consiliere</p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 font-bold text-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A9D8FF]" />
                  <span>DNSC: 1911</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5">Directoratul Național de Securitate Cibernetică</p>
              </div>
            </div>
          </div>

          {/* Project Details Col */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#A9D8FF] mb-4">
              Materiale Didactice
            </h3>
            <div className="space-y-3">
              <button
                onClick={onOpenPresentation}
                className="w-full text-left p-3 rounded-xl bg-[#7652D6]/30 hover:bg-[#7652D6]/50 border border-[#7652D6]/50 transition-colors"
              >
                <div className="flex items-center gap-2 font-semibold text-white text-xs">
                  <HeartHandshake className="w-4 h-4 text-[#A9D8FF]" />
                  <span>Mod Prezentare 5 Min</span>
                </div>
                <p className="text-[11px] text-slate-200 mt-1">
                  Slide-uri structurate pentru susținerea proiectului la oră.
                </p>
              </button>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                <p className="font-semibold text-white">Verificare Umană (Human-in-the-Loop)</p>
                <p className="text-[11px] text-slate-300 mt-1">
                  Toate informațiile au fost validate manual. Scenariile sunt concepute în scop educativ.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <p>© 2026 NeuroCheck. Realizat pentru proiectul școlar de Inteligență Artificială de către o elevă de clasa a X-a.</p>
          <div className="flex items-center gap-4 text-slate-300">
            <span>Educație Media</span>
            <span>·</span>
            <span>Gândire Critică</span>
            <span>·</span>
            <span>Siguranță Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

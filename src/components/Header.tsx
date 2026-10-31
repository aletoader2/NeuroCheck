import React, { useState } from 'react';
import { PageId } from '../types.ts';
import { NeuroCheckLogo } from './NeuroCheckLogo.tsx';
import { Menu, X, Presentation } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenPresentation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenPresentation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Note: „Real sau IA?” must be placed immediately after „Adevărat sau fals?”
  const navItems: { id: PageId; label: string }[] = [
    { id: 'acasa', label: 'Acasă' },
    { id: 'adevarat-fals', label: 'Adevărat sau fals?' },
    { id: 'real-sau-ia', label: 'Real sau IA?' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'siguranta', label: 'Siguranță online' },
    { id: 'ghid', label: 'Ghid de verificare' },
    { id: 'despre', label: 'Despre proiect' },
    { id: 'feedback', label: 'Feedback' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-[0_1px_3px_rgba(23,38,94,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
          {/* Zone 1: Brand Wordmark with full Slogan */}
          <button
            onClick={() => handleNavClick('acasa')}
            className="text-left focus-visible:outline-[#7652D6] rounded-lg transition-transform hover:opacity-95 shrink-0"
            aria-label="NeuroCheck Acasă"
          >
            <NeuroCheckLogo size="md" showTagline={true} />
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 text-xs 2xl:text-sm font-medium" aria-label="Meniu principal">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1.5 whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#7652D6] font-bold'
                      : 'text-[#17265E]/80 hover:text-[#17265E]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7652D6] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Quick Pitch / Presentation Mode for School Project */}
            <button
              onClick={onOpenPresentation}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#17265E] bg-[#A9D8FF]/30 hover:bg-[#A9D8FF]/50 border border-[#A9D8FF]/60 rounded-xl transition-colors whitespace-nowrap"
              title="Deschide prezentarea de 5 minute pentru oră"
            >
              <Presentation className="w-3.5 h-3.5 text-[#7652D6]" />
              <span className="hidden md:inline">Prezentare 5 min</span>
            </button>

            {/* Primary CTA Button */}
            <button
              onClick={() => handleNavClick('quiz')}
              className="px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#7652D6] hover:bg-[#6442C4] rounded-xl shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0"
            >
              Începe testul
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#17265E] hover:bg-slate-100 rounded-lg focus-visible:outline-[#7652D6]"
              aria-expanded={mobileMenuOpen}
              aria-label="Deschide meniul de navigare"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#A9D8FF]/30 text-[#7652D6] font-semibold'
                      : 'text-[#17265E] hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenPresentation();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-[#17265E] bg-[#A9D8FF]/40 rounded-xl"
            >
              <Presentation className="w-4 h-4 text-[#7652D6]" />
              Mod Prezentare (5 minute)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

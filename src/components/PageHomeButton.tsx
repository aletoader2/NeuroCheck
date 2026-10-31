import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { PageId } from '../types.ts';

interface PageHomeButtonProps {
  onNavigateHome: () => void;
  position?: 'top' | 'bottom';
  label?: string;
}

export const PageHomeButton: React.FC<PageHomeButtonProps> = ({
  onNavigateHome,
  position = 'top',
  label = 'Acasă',
}) => {
  const handleClick = () => {
    onNavigateHome();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (position === 'top') {
    return (
      <div className="w-full flex items-center justify-between pb-4 mb-2 border-b border-slate-100">
        <button
          onClick={handleClick}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#17265E] bg-slate-100 hover:bg-[#A9D8FF]/40 border border-slate-200 hover:border-[#7652D6]/40 transition-all shadow-2xs group"
          title="Mergi înapoi la pagina principală Acasă"
        >
          <ArrowLeft className="w-4 h-4 text-[#7652D6] transition-transform group-hover:-translate-x-0.5" />
          <Home className="w-4 h-4 text-[#7652D6]" />
          <span>{label}</span>
        </button>

        <span className="text-[11px] font-semibold text-slate-600 hidden sm:inline">
          Apasă „Acasă” pentru a reveni la meniul general
        </span>
      </div>
    );
  }

  return (
    <div className="w-full pt-8 mt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-xs text-slate-500">
        Ai terminat această secțiune? Revino la pagina principală pentru a explora alte teme.
      </div>
      <button
        onClick={handleClick}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#17265E] hover:bg-[#7652D6] transition-colors shadow-sm"
      >
        <Home className="w-4 h-4 text-[#A9D8FF]" />
        <span>Mergi la Acasă</span>
      </button>
    </div>
  );
};

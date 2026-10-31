import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  theme?: 'dark' | 'light';
  showTagline?: boolean;
}

export const NeuroCheckLogo: React.FC<LogoProps> = ({
  size = 'md',
  theme = 'dark',
  showTagline = false,
}) => {
  const iconSizeClass = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  }[size];

  const titleSizeClass = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  const isLight = theme === 'light';

  return (
    <div className="flex items-center gap-2.5 group">
      {/* Brand Icon: Digital Brain + Magnifying Glass + Checkmark */}
      <div
        className={`${iconSizeClass} shrink-0 rounded-xl flex items-center justify-center p-1.5 transition-transform duration-200 group-hover:scale-105 shadow-sm`}
        style={{
          background: isLight
            ? 'linear-gradient(135deg, #17265E 0%, #7652D6 100%)'
            : 'linear-gradient(135deg, #7652D6 0%, #17265E 100%)',
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
          {/* Digital Brain Lobes */}
          <path
            d="M9 13C6.5 13 4.5 15 4.5 17.5C4.5 19.5 5.8 21.2 7.7 21.8C7.5 22.3 7.5 22.8 7.5 23.3C7.5 25.5 9.3 27.3 11.5 27.3H14V11C11.2 11 9 11.9 9 13Z"
            fill="#A9D8FF"
            opacity="0.9"
          />
          <path
            d="M20 11V27.3H22.5C24.7 27.3 26.5 25.5 26.5 23.3C26.5 22.8 26.5 22.3 26.3 21.8C28.2 21.2 29.5 19.5 29.5 17.5C29.5 15 27.5 13 25 13C25 11.9 22.8 11 20 11Z"
            fill="#FFFFFF"
            opacity="0.8"
          />
          {/* Neural Connector Nodes */}
          <circle cx="11" cy="16" r="1.5" fill="#17265E" />
          <circle cx="14" cy="20" r="1.5" fill="#7652D6" />
          <circle cx="20" cy="16" r="1.5" fill="#7652D6" />
          <circle cx="23" cy="20" r="1.5" fill="#17265E" />
          <path d="M11 16L14 20M20 16L23 20" stroke="#7652D6" strokeWidth="1" strokeDasharray="1.5 1.5" />
          {/* Magnifying Glass Overlay */}
          <circle cx="22" cy="22" r="7" fill="#17265E" stroke="#A9D8FF" strokeWidth="2" />
          <path d="M27.5 27.5L32 32" stroke="#A9D8FF" strokeWidth="2.5" strokeLinecap="round" />
          {/* Checkmark inside Magnifier */}
          <path
            d="M19.5 22L21.2 23.8L24.8 19.8"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-tight">
        <span
          className={`font-extrabold tracking-tight ${titleSizeClass} font-display ${
            isLight ? 'text-white' : 'text-[#17265E]'
          }`}
        >
          Neuro<span className="text-[#7652D6]">Check</span>
        </span>
        {showTagline && (
          <span
            className={`text-[11px] font-semibold tracking-normal ${
              isLight ? 'text-[#A9D8FF]' : 'text-[#7652D6]'
            }`}
          >
            „Gândește critic. Verifică. Rămâi informat.”
          </span>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ShieldCheck, Search, Sparkles, Smartphone, Image as ImageIcon } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackType?: 'hero' | 'factcheck' | 'phone' | 'shield' | 'guide' | 'general';
  aspectRatioClass?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackType = 'general',
  aspectRatioClass = 'aspect-video',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getFallbackIcon = () => {
    switch (fallbackType) {
      case 'hero':
        return <Sparkles className="w-12 h-12 text-[#7652D6]" />;
      case 'factcheck':
        return <Search className="w-12 h-12 text-[#7652D6]" />;
      case 'phone':
        return <Smartphone className="w-12 h-12 text-[#7652D6]" />;
      case 'shield':
        return <ShieldCheck className="w-12 h-12 text-[#7652D6]" />;
      case 'guide':
        return <Search className="w-12 h-12 text-[#7652D6]" />;
      default:
        return <ImageIcon className="w-12 h-12 text-[#7652D6]" />;
    }
  };

  if (hasError || !src) {
    return (
      <div
        className={`w-full ${aspectRatioClass} rounded-2xl bg-gradient-to-br from-[#A9D8FF]/20 via-white to-[#7652D6]/10 border border-[#A9D8FF]/40 flex flex-col items-center justify-center p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-[#A9D8FF]/50 flex items-center justify-center mb-3">
          {getFallbackIcon()}
        </div>
        <p className="text-sm font-semibold text-[#17265E] max-w-xs">{alt}</p>
        <p className="text-xs text-slate-500 mt-1">Ilustrație NeuroCheck</p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl ${aspectRatioClass} ${className} bg-slate-100`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-[#A9D8FF]/20 to-slate-100 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#7652D6] border-t-transparent animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};

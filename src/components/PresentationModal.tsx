import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, RotateCcw, FileText, CheckCircle2 } from 'lucide-react';
import { PRESENTATION_SLIDES } from '../data/contentData.ts';
import { NeuroCheckLogo } from './NeuroCheckLogo.tsx';

interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({ isOpen, onClose }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 minutes = 300 seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showNotes, setShowNotes] = useState(true);

  // Timer countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlideIndex((prev) => Math.min(prev + 1, PRESENTATION_SLIDES.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentSlide = PRESENTATION_SLIDES[currentSlideIndex];
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, PRESENTATION_SLIDES.length - 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#17265E]/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-5xl w-full h-[94vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Top Control Bar */}
        <div className="bg-[#17265E] text-white px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <NeuroCheckLogo theme="light" size="sm" />
            <span className="text-xs font-semibold text-[#A9D8FF] border-l border-white/20 pl-3">
              Mod Prezentare — 5 Minute
            </span>
          </div>

          {/* Timer & Controls */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl text-xs font-mono">
              <span className="text-slate-300">Timp rămas:</span>
              <span className={`font-bold text-sm ${timerSeconds <= 30 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                {formattedTime}
              </span>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-1 hover:text-[#A9D8FF] transition-colors ml-1"
                title={isTimerRunning ? 'Pauză' : 'Pornește'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(300);
                }}
                className="p-1 hover:text-[#A9D8FF] transition-colors"
                title="Resetează timerul"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-xl font-medium transition-colors ${
                showNotes ? 'bg-[#7652D6] text-white' : 'bg-white/10 text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Notițe Discurs</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Închide prezentarea"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Main Viewport */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-white via-slate-50 to-[#A9D8FF]/10">
          <div>
            {/* Slide Header */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7652D6]">
                {currentSlide.kicker}
              </span>
              <span className="text-xs font-mono text-slate-500">
                Segment: {currentSlide.timeEstimate}
              </span>
            </div>

            {/* Slide Title */}
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#17265E] mt-4 leading-tight">
              {currentSlide.title}
            </h2>

            {/* Bullet Points */}
            <div className="mt-8 space-y-4">
              {currentSlide.keyPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5 transition-all hover:border-[#7652D6]/40"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#7652D6] shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Speaker Notes Drawer (Optional toggle) */}
          {showNotes && (
            <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#17265E]/5 border border-[#17265E]/15">
              <div className="flex items-center gap-2 mb-1.5 text-xs font-bold uppercase tracking-wider text-[#17265E]">
                <FileText className="w-3.5 h-3.5 text-[#7652D6]" />
                <span>Ce să spui clasei și profesorului (Notițe de discurs):</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                {currentSlide.speechNotes}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Slide Navigation Bar */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentSlideIndex === 0}
              className="p-2 rounded-xl border border-slate-200 text-[#17265E] hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Slide anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-semibold text-slate-700 px-2">
              Slide {currentSlideIndex + 1} din {PRESENTATION_SLIDES.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentSlideIndex === PRESENTATION_SLIDES.length - 1}
              className="p-2 rounded-xl border border-slate-200 text-[#17265E] hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Slide următor"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Indicator dots */}
          <div className="hidden sm:flex items-center gap-2">
            {PRESENTATION_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlideIndex
                    ? 'w-8 bg-[#7652D6]'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Mergi la slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="text-xs text-slate-500 hidden sm:block">
            Folosește săgețile <kbd className="px-1.5 py-0.5 bg-slate-100 border rounded text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 bg-slate-100 border rounded text-[10px]">→</kbd> sau Space
          </div>
        </div>
      </div>
    </div>
  );
};

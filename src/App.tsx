/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PageId } from './types.ts';
import { DEFAULT_IMAGES } from './data/imageAssets.ts';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { FactCheckPage } from './pages/FactCheckPage.tsx';
import { RealOrAiPage } from './pages/RealOrAiPage.tsx';
import { QuizPage } from './pages/QuizPage.tsx';
import { SafetyPage } from './pages/SafetyPage.tsx';
import { GuidePage } from './pages/GuidePage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { FeedbackPage } from './pages/FeedbackPage.tsx';
import { PresentationModal } from './components/PresentationModal.tsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('acasa');
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const heroImg = DEFAULT_IMAGES.hero;
  const factcheckImg = DEFAULT_IMAGES.factcheck;
  const shieldImg = DEFAULT_IMAGES.shield;
  const guideImg = DEFAULT_IMAGES.aiGuide;

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#17265E] font-sans antialiased">
      {/* Primary Top Bar */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenPresentation={() => setIsPresentationOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {currentPage === 'acasa' && (
          <HomePage onNavigate={handleNavigate} heroImageSrc={heroImg} />
        )}
        {currentPage === 'adevarat-fals' && (
          <FactCheckPage factcheckImageSrc={factcheckImg} onNavigate={handleNavigate} />
        )}
        {currentPage === 'real-sau-ia' && (
          <RealOrAiPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'quiz' && (
          <QuizPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'siguranta' && (
          <SafetyPage shieldImageSrc={shieldImg} onNavigate={handleNavigate} />
        )}
        {currentPage === 'ghid' && (
          <GuidePage guideImageSrc={guideImg} onNavigate={handleNavigate} />
        )}
        {currentPage === 'despre' && (
          <AboutPage
            onOpenPresentation={() => setIsPresentationOpen(true)}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'feedback' && (
          <FeedbackPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPresentation={() => setIsPresentationOpen(true)}
      />

      {/* 5-Minute School Pitch Deck Presentation Modal */}
      <PresentationModal
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
      />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FloatingParticles } from './components/FloatingParticles';
import { MusicControl } from './components/MusicControl';
import { StoryProgress } from './components/StoryProgress';
import { GiftPage } from './pages/GiftPage';
import { BirthdayPage } from './pages/BirthdayPage';
import { MessagePage } from './pages/MessagePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasOpenedGift, setHasOpenedGift] = useState<boolean>(false);

  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleOpenGiftComplete = () => {
    setHasOpenedGift(true);
    setCurrentPage(2);
  };

  const handleProceedToMessage = () => {
    setCurrentPage(3);
  };

  const handleRestart = () => {
    setCurrentPage(1);
    setHasOpenedGift(false);
  };

  const handleNavigateStep = (step: number) => {
    if (step === 1 || hasOpenedGift) {
      setCurrentPage(step);
    }
  };

  return (
    <main id="sanika-birthday-app" className="relative min-h-screen bg-[#0a0a1a] text-white overflow-x-hidden flex flex-col justify-between">
      {/* 1. Ambient Floating Glowing Particles & Starfield */}
      <FloatingParticles />

      {/* 2. Floating Music Control Pill */}
      <MusicControl />

      {/* 3. Main Stage Content with Smooth Cinematic Transitions */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full max-w-7xl mx-auto px-3 sm:px-6 pt-6 pb-20 sm:pb-24">
        <AnimatePresence mode="wait">
          {currentPage === 1 && (
            <motion.div
              key="page-1-gift"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <GiftPage onOpenGiftComplete={handleOpenGiftComplete} />
            </motion.div>
          )}

          {currentPage === 2 && (
            <motion.div
              key="page-2-birthday"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, filter: 'blur(6px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <BirthdayPage onProceedToMessage={handleProceedToMessage} />
            </motion.div>
          )}

          {currentPage === 3 && (
            <motion.div
              key="page-3-message"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <MessagePage onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Subtle Story Progress Footer (Visible once user starts exploring) */}
      <StoryProgress currentStep={currentPage} onStepClick={handleNavigateStep} />
    </main>
  );
}

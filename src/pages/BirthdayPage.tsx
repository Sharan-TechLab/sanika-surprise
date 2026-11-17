import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BirthdayReveal } from '../components/BirthdayReveal';
import { PhotoWall } from '../components/PhotoWall';

interface BirthdayPageProps {
  onProceedToMessage: () => void;
}

export const BirthdayPage: React.FC<BirthdayPageProps> = ({ onProceedToMessage }) => {
  const [showMemories, setShowMemories] = useState(false);

  return (
    <div id="birthday-page" className="relative min-h-[90vh] flex flex-col items-center justify-center z-10 w-full">
      <AnimatePresence mode="wait">
        {!showMemories ? (
          <motion.div
            key="birthday-reveal-stage"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <BirthdayReveal onStartMemories={() => setShowMemories(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="photo-wall-stage"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl"
          >
            <PhotoWall onProceedToMessage={onProceedToMessage} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

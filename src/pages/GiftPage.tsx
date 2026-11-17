import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { GiftBox } from '../components/GiftBox';

interface GiftPageProps {
  onOpenGiftComplete: () => void;
}

export const GiftPage: React.FC<GiftPageProps> = ({ onOpenGiftComplete }) => {
  return (
    <div
      id="gift-page"
      className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-8 select-none z-10"
    >
      {/* Intro Greetings Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl mx-auto mb-6 sm:mb-8"
      >
        {/* Artistic Flair Eyebrow Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="text-pink-300/80 uppercase tracking-[0.4em] text-xs sm:text-sm font-semibold inline-flex items-center gap-2">
            <span>Happy Birthday, {birthdayData.name}</span>
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          </span>
        </motion.div>

        {/* "Hey Sanika... ❤️" in elegant italic display serif */}
        <h1 
          id="intro-heading"
          className="font-serif italic text-5xl sm:text-7xl md:text-[80px] lg:text-[86px] text-white leading-tight mb-3 tracking-tight drop-shadow-[0_0_30px_rgba(255,102,153,0.3)] flex items-center justify-center gap-3"
        >
          <span>Hey {birthdayData.name}...</span>
          <span className="text-pink-400 not-italic animate-pulse">❤️</span>
        </h1>

        {/* "I made a little something for you. But first... you have to open it." */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-white/75 text-base sm:text-lg font-light tracking-wide max-w-[500px] mx-auto mb-2 leading-relaxed"
        >
          {birthdayData.introMessage}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-pink-300/80 text-sm sm:text-base font-light tracking-wide"
        >
          {birthdayData.introHint}
        </motion.p>
      </motion.div>

      {/* The 3D Gift Box Component */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex items-center justify-center"
      >
        <GiftBox onOpenComplete={onOpenGiftComplete} />
      </motion.div>
    </div>
  );
};

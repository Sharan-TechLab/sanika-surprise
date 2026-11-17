import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Stars } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { audioManager } from '../utils/audio';

interface BirthdayRevealProps {
  onStartMemories: () => void;
}

export const BirthdayReveal: React.FC<BirthdayRevealProps> = ({ onStartMemories }) => {
  const handleProceed = () => {
    audioManager.playHeartPop();
    onStartMemories();
  };

  return (
    <div id="birthday-reveal-section" className="relative flex flex-col items-center justify-center text-center px-4 py-8 max-w-2xl mx-auto select-none">
      {/* Decorative Sparkles & Floating Accents */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="flex items-center justify-center gap-2 mb-4"
      >
        <span className="text-xs sm:text-sm uppercase tracking-[0.4em] font-semibold text-pink-300/85 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          <span>A Special Celebration</span>
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
        </span>
      </motion.div>

      {/* "Happy Birthday" Reveal in refined italic serif */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-5xl md:text-6xl font-serif italic tracking-tight text-white/95 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
      >
        Happy Birthday
      </motion.h2>

      {/* Main Focus: "Sanika ❤️" with Script Font and Radiant Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative my-2 sm:my-4"
      >
        {/* Glow halo behind Sanika's name */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/25 via-purple-600/35 to-pink-500/25 blur-3xl rounded-full scale-125 pointer-events-none animate-pulse-glow" />

        <h1 
          id="sanika-glowing-title"
          className="relative font-script text-6xl sm:text-8xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-pink-300 to-rose-200 filter drop-shadow-[0_0_30px_rgba(255,102,153,0.85)] tracking-normal py-2 flex items-center justify-center gap-3"
        >
          <span>{birthdayData.name}</span>
          <span className="text-4xl sm:text-6xl text-pink-400 animate-pulse">❤️</span>
        </h1>
      </motion.div>

      {/* Subtitle: "Today is all about you." */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="text-white/75 text-base sm:text-lg font-light tracking-wide max-w-md mx-auto leading-relaxed mb-8"
      >
        {birthdayData.revealSubtitle || "Today is all about you."}
      </motion.p>

      {/* "See Your Memories ✨" CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 2.3, duration: 0.7 }}
      >
        <button
          id="see-memories-btn"
          onClick={handleProceed}
          className="artistic-button px-9 py-4 sm:px-11 sm:py-4 rounded-full font-semibold text-white text-xs sm:text-sm flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group shadow-xl"
        >
          <Stars className="w-4 h-4 text-pink-300 group-hover:rotate-45 transition-transform duration-500" />
          <span className="tracking-[0.18em]">See Your Memories</span>
          <span className="text-pink-200">✨</span>
        </button>
      </motion.div>

      {/* Adorable little floating hearts */}
      <div className="flex items-center gap-3 mt-8 text-pink-400/40">
        <Heart className="w-3.5 h-3.5 fill-current animate-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-pink-400/30 to-transparent" />
        <Heart className="w-4 h-4 fill-current text-pink-400/60 animate-pulse" style={{ animationDelay: '0.6s' }} />
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-pink-400/30 to-transparent" />
        <Heart className="w-3.5 h-3.5 fill-current animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

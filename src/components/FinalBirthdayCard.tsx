import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Cake, RotateCcw, PartyPopper } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { fireHeartShower, fireGiftConfetti } from '../utils/confetti';
import { audioManager } from '../utils/audio';
import { HeartRain } from './HeartRain';

interface FinalBirthdayCardProps {
  onRestart: () => void;
}

export const FinalBirthdayCard: React.FC<FinalBirthdayCardProps> = ({ onRestart }) => {
  const [feedbackGiven, setFeedbackGiven] = useState<string | null>(null);
  const [isCelebrated, setIsCelebrated] = useState(false);
  const [heartRainActive, setHeartRainActive] = useState(false);
  const [heartRainKey, setHeartRainKey] = useState(0);

  const handleFeedback = (responseType: 'yes' | 'loved') => {
    setFeedbackGiven(responseType);
    setIsCelebrated(true);
    setHeartRainActive(true);
    setHeartRainKey((prev) => prev + 1);
    audioManager.playMagicalChime();
    audioManager.playHeartPop();
    fireHeartShower();
    fireGiftConfetti();
  };

  const handleCelebrateAgain = () => {
    audioManager.playMagicalChime();
    audioManager.playHeartPop();
    fireHeartShower();
    setHeartRainActive(true);
    setHeartRainKey((prev) => prev + 1);
  };

  return (
    <div id="final-birthday-card-section" className="relative w-full max-w-2xl mx-auto py-10 px-4 select-none">
      {/* Falling Heart Rain Animation Triggered by Final Buttons */}
      <HeartRain isActive={heartRainActive} triggerKey={heartRainKey} durationSeconds={8} />

      {/* Luxury Birthday Greeting Card Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative artistic-card rounded-2xl p-8 sm:p-12 text-center overflow-hidden border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_50px_rgba(255,102,153,0.2)]"
      >
        {/* Subtle Accent Ribbon Trim */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-500 via-purple-400 to-pink-500" />

        {/* Ambient Cake Icon Glow */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-xl">
            <Cake className="w-8 h-8 text-pink-300 animate-bounce" style={{ animationDuration: '3s' }} />
            <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-pink-200 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>

        {/* Card Title */}
        <h2 className="font-serif italic text-3xl sm:text-5xl text-white font-bold tracking-tight mb-3">
          Happy Birthday, {birthdayData.name} ❤️
        </h2>

        {/* Card Subtitle */}
        <p className="font-sans text-base sm:text-lg text-white/85 font-light max-w-lg mx-auto leading-relaxed mb-6">
          "{birthdayData.cardSubtitle}"
        </p>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-3 my-6 text-pink-400/50">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-pink-400/40" />
          <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-pink-400/40" />
        </div>

        {/* Sender Signature */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-white/60 font-medium">With lots of love,</p>
          <p className="font-script text-3xl sm:text-4xl text-pink-300 font-medium mt-1">
            {birthdayData.senderName}
          </p>
        </div>

        {/* Interactive Final Question */}
        <div className="pt-6 border-t border-white/15">
          {!isCelebrated ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-pink-300/80 font-semibold">
                One last question...
              </p>
              <h4 className="font-handwriting text-2xl sm:text-3xl text-white font-semibold">
                {birthdayData.finalQuestion}
              </h4>

              {/* Two Reaction Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
                <button
                  id="reaction-yes-btn"
                  onClick={() => handleFeedback('yes')}
                  className="w-full sm:w-auto artistic-button px-8 py-3.5 rounded-full font-semibold text-white text-xs sm:text-sm flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-xl"
                >
                  <span className="tracking-[0.15em]">Yes</span>
                  <Heart className="w-4 h-4 fill-pink-300 text-pink-300 animate-pulse" />
                </button>

                <button
                  id="reaction-loved-btn"
                  onClick={() => handleFeedback('loved')}
                  className="w-full sm:w-auto artistic-button px-8 py-3.5 rounded-full font-semibold text-white text-xs sm:text-sm bg-pink-500/25 border-pink-400/40 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-xl"
                >
                  <span className="tracking-[0.15em]">I Loved It</span>
                  <span className="text-base">🥹</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-3 py-2"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-pink-200 text-xs sm:text-sm font-medium">
                  <PartyPopper className="w-4 h-4 text-pink-300" />
                  <span>{birthdayData.finalResponseText}</span>
                </div>

                <p className="font-handwriting text-2xl sm:text-3xl text-pink-100 font-semibold text-glow-pink">
                  {birthdayData.finalCelebrationNote}
                </p>

                <div className="pt-4 flex items-center justify-center gap-3">
                  <button
                    id="celebrate-again-btn"
                    onClick={handleCelebrateAgain}
                    className="artistic-button px-6 py-2.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                    <span className="tracking-wider">Celebrate Again! 🎉</span>
                  </button>

                  <button
                    id="replay-experience-btn"
                    onClick={onRestart}
                    className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-xs text-white/70 hover:text-white flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer tracking-wider uppercase"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay Surprise</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
};

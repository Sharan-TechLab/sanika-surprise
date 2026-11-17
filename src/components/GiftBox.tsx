import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { fireGiftConfetti } from '../utils/confetti';
import { audioManager } from '../utils/audio';

interface GiftBoxProps {
  onOpenComplete: () => void;
}

export const GiftBox: React.FC<GiftBoxProps> = ({ onOpenComplete }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasBurst, setHasBurst] = useState(false);

  const handleOpenGift = async () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    // Start ambient romantic music
    audioManager.startMusic();
    audioManager.playMagicalChime();

    // Step 1: Box shakes for 600ms
    setTimeout(() => {
      // Step 2 & 3 & 4: Lid opens, light emerges
      setIsOpen(true);
      
      // Step 5 & 6 & 7: Confetti burst and hearts
      setTimeout(() => {
        setHasBurst(true);
        fireGiftConfetti();
        audioManager.playHeartPop();

        // Step 8 & 9: Smooth transition to Page 2 after reveal animation
        setTimeout(() => {
          onOpenComplete();
        }, 1600);
      }, 500);
    }, 600);
  };

  return (
    <div id="gift-box-wrapper" className="flex flex-col items-center justify-center relative select-none">
      {/* Warm Ambient Glow behind the box */}
      <div 
        className={`absolute w-72 h-72 rounded-full transition-all duration-1000 pointer-events-none ${
          isOpen 
            ? 'bg-gradient-to-r from-amber-300/40 via-pink-500/50 to-purple-600/40 blur-[80px] scale-150' 
            : 'bg-gradient-to-r from-pink-500/20 to-purple-600/20 blur-[50px] scale-100 animate-pulse-glow'
        }`} 
      />

      {/* Floating sparkles around gift box */}
      <div className="absolute -top-8 -left-8 text-pink-300/60 animate-bounce" style={{ animationDuration: '3s' }}>
        <Sparkles className="w-5 h-5" />
      </div>
      <div className="absolute top-10 -right-10 text-amber-300/60 animate-pulse" style={{ animationDuration: '2.4s' }}>
        <Sparkles className="w-4 h-4" />
      </div>
      <div className="absolute -bottom-4 -left-6 text-purple-300/50 animate-pulse" style={{ animationDuration: '3.5s' }}>
        <Heart className="w-4 h-4 fill-pink-400/30" />
      </div>

      {/* The 3D CSS Gift Container */}
      <motion.div
        id="gift-container"
        animate={
          isOpening && !isOpen
            ? {
                x: [-3, 3, -4, 4, -2, 2, 0],
                rotate: [-2, 2, -3, 3, -1, 1, 0],
                transition: { duration: 0.55, ease: "easeInOut" }
              }
            : {
                y: [0, -10, 0],
                transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
              }
        }
        className="relative w-48 h-48 sm:w-56 sm:h-56 cursor-pointer group"
        onClick={handleOpenGift}
      >
        {/* Inner Light Beams when lid opens */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: [0.2, 1.4, 1.2], rotate: 180 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            >
              {/* Sunburst glowing rays */}
              <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-radial from-amber-200 via-pink-400 to-transparent blur-md opacity-90 animate-pulse" />
              <div className="absolute w-full h-full bg-gradient-to-t from-yellow-300/80 via-pink-500/60 to-white blur-xl" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Heart particles emerging from the box on open */}
        {hasBurst && (
          <div className="absolute inset-0 pointer-events-none z-30">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.2 }}
                animate={{
                  opacity: [0, 1, 0],
                  x: (i % 2 === 0 ? 1 : -1) * (30 + i * 18),
                  y: -60 - i * 22,
                  scale: [0.2, 1.2, 0.8],
                  rotate: (i - 4) * 20,
                }}
                transition={{ duration: 1.4, delay: i * 0.08, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <Heart className="w-6 h-6 text-pink-400 fill-pink-400 filter drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Gift Box Lid (Opens upward & tilts back) */}
        <motion.div
          id="gift-box-lid"
          animate={
            isOpen
              ? {
                  y: -90,
                  rotateX: -45,
                  rotateZ: -12,
                  opacity: 0.9,
                  scale: 0.95,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                }
              : {}
          }
          className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 w-44 sm:w-52 h-14 sm:h-16 rounded-xl z-20 shadow-2xl transition-shadow group-hover:shadow-[0_10px_35px_rgba(255,102,153,0.5)]"
          style={{
            background: 'linear-gradient(135deg, #ff6699 0%, #ff3366 100%)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          {/* Vertical Ruby Ribbon on Lid */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-7 sm:w-8 bg-[#cc2255] shadow-md flex items-center justify-center">
            <div className="w-full h-[1px] bg-white/20" />
          </div>

          {/* Ribbon Bow on Top */}
          <div className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 flex items-center justify-center">
            {/* Left loop */}
            <div className="w-8 h-9 sm:w-10 sm:h-11 rounded-full border-[5px] border-[#ff3366] bg-pink-500/20 shadow-lg -rotate-[35deg]" />
            {/* Center knot */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#cc2255] shadow-xl z-10 -mx-2.5 border border-pink-300/40" />
            {/* Right loop */}
            <div className="w-8 h-9 sm:w-10 sm:h-11 rounded-full border-[5px] border-[#ff3366] bg-pink-500/20 shadow-lg rotate-[35deg]" />
          </div>
        </motion.div>

        {/* Gift Box Base Body */}
        <div
          id="gift-box-base"
          className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 w-40 sm:w-48 h-32 sm:h-36 rounded-xl z-10 overflow-hidden shadow-2xl border border-white/20"
          style={{
            background: 'linear-gradient(135deg, #ff6699 0%, #ff3366 100%)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.6), 0 0 35px rgba(255,51,102,0.3)'
          }}
        >
          {/* Vertical Ruby Ribbon */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-7 sm:w-8 bg-[#cc2255] shadow-md" />

          {/* Horizontal Ruby Ribbon */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-7 sm:h-8 bg-[#cc2255] shadow-md" />

          {/* Shimmer light reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* Interactive "Open Your Gift 🎁" Button */}
      <AnimatePresence>
        {!isOpening && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.4 }}
            className="mt-8"
          >
            <button
              id="open-gift-btn"
              onClick={handleOpenGift}
              className="artistic-button px-8 py-3.5 sm:px-10 sm:py-4 rounded-full font-semibold text-white text-xs sm:text-sm flex items-center gap-3 transition-all duration-300 cursor-pointer active:scale-95 group"
            >
              <Sparkles className="w-4 h-4 text-pink-300 group-hover:rotate-45 transition-transform duration-500" />
              <span className="tracking-[0.18em]">Open Your Gift</span>
              <span className="text-base">🎁</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

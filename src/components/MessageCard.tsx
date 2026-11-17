import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Quote, ArrowDown, Send } from 'lucide-react';
import { birthdayData, PhotoItem } from '../data/birthdayData';
import { audioManager } from '../utils/audio';

interface MessageCardProps {
  onScrollToCard: () => void;
}

export const MessageCard: React.FC<MessageCardProps> = ({ onScrollToCard }) => {
  const [revealedLinesCount, setRevealedLinesCount] = useState(0);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);

  // Split the birthday message into logical paragraphs / lines
  const paragraphs = birthdayData.birthdayMessage
    .split('\n\n')
    .map(p => p.trim())
    .filter(Boolean);

  // Progressive reveal effect for paragraphs
  useEffect(() => {
    if (revealedLinesCount < paragraphs.length) {
      const timer = setTimeout(() => {
        setRevealedLinesCount(prev => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setIsFullyRevealed(true);
    }
  }, [revealedLinesCount, paragraphs.length]);

  const featuredPhoto: PhotoItem = birthdayData.photos[0] || {
    id: 'default-photo',
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    fallbackSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    caption: "Sanika"
  };

  return (
    <div id="personal-message-section" className="relative w-full max-w-4xl mx-auto py-8 px-4 select-none">
      {/* Decorative Top Pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-2 mb-6"
      >
        <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm text-pink-200 font-semibold uppercase tracking-[0.25em] flex items-center gap-2 backdrop-blur-md">
          <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400 animate-pulse" />
          <span>From My Heart</span>
          <Sparkles className="w-3.5 h-3.5 text-pink-300" />
        </span>
      </motion.div>

      {/* Main Glassmorphism Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative artistic-card rounded-2xl p-6 sm:p-10 md:p-12 overflow-hidden"
      >
        {/* Soft Background Watermark Heart */}
        <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none">
          <Heart className="w-80 h-80 fill-pink-300" />
        </div>

        {/* Header with Title & Quote icon */}
        <div className="flex items-center justify-between border-b border-white/15 pb-5 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shadow-lg">
              <Quote className="w-5 h-5 text-pink-300" />
            </div>
            <div>
              <h2 className="font-serif italic text-2xl sm:text-3xl text-white font-bold flex items-center gap-2">
                <span>For {birthdayData.name}</span>
                <span className="text-pink-400 not-italic animate-pulse">❤️</span>
              </h2>
              <p className="text-xs text-white/60 font-light">A message written just for you</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-pink-400/60">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Content Layout: Photo Avatar + Message Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Side Photo / Polaroid accent */}
          <div className="md:col-span-4 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, rotate: -4, scale: 0.9 }}
              animate={{ opacity: 1, rotate: -2, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative w-44 sm:w-52 aspect-[3/4] bg-white/10 p-2.5 rounded-xl border border-white/20 shadow-2xl overflow-hidden group"
            >
              <img
                src={featuredPhoto.src}
                onError={(e) => {
                  if (featuredPhoto.fallbackSrc) (e.target as HTMLImageElement).src = featuredPhoto.fallbackSrc;
                }}
                alt={featuredPhoto.caption}
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-2 inset-x-2 text-center">
                <p className="text-xs font-handwriting text-white font-semibold">
                  {featuredPhoto.caption}
                </p>
              </div>
            </motion.div>

            {/* Special highlight badges */}
            <div className="w-full mt-6 space-y-2.5">
              {birthdayData.specialHighlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.2, duration: 0.5 }}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-2.5 text-xs text-white/90"
                >
                  <span className="text-base">{item.emoji}</span>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-[10px] text-white/60 leading-tight">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Letter Body: Paragraph by Paragraph Reveal */}
          <div className="md:col-span-8 space-y-5 text-white/90 font-light leading-relaxed text-base sm:text-lg">
            {paragraphs.map((paragraph, index) => {
              const isVisible = index < revealedLinesCount;
              const isGreeting = index === 0;
              const isSignoff = index === paragraphs.length - 1;

              return (
                <motion.div
                  key={`para-${index}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className={`${
                    isGreeting
                      ? 'font-serif italic text-xl sm:text-2xl text-pink-200 font-medium'
                      : isSignoff
                      ? 'font-handwriting text-2xl sm:text-3xl text-pink-300 font-semibold pt-4 border-t border-white/15'
                      : 'text-white/85 leading-relaxed font-sans'
                  }`}
                >
                  {paragraph.split('\n').map((line, lIdx) => (
                    <p key={`line-${lIdx}`} className="mb-2">
                      {line}
                    </p>
                  ))}
                </motion.div>
              );
            })}

            {/* Sender Sign-off */}
            {isFullyRevealed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="pt-4 flex items-center justify-between"
              >
                <div className="text-right ml-auto">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/60">With love,</p>
                  <p className="font-script text-3xl sm:text-4xl text-pink-300 font-medium">
                    {birthdayData.senderName}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom CTA to proceed to Final Card */}
        {isFullyRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 pt-6 border-t border-white/15 flex flex-col items-center justify-center text-center"
          >
            <button
              id="view-final-card-btn"
              onClick={() => {
                audioManager.playHeartPop();
                onScrollToCard();
              }}
              className="artistic-button px-9 py-3.5 rounded-full font-semibold text-white text-xs sm:text-sm flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-xl"
            >
              <span className="tracking-[0.16em]">View Your Birthday Card</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

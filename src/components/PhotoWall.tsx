import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause, Heart, Sparkles, MessageCircleHeart, Grid } from 'lucide-react';
import { birthdayData, PhotoItem } from '../data/birthdayData';
import { PhotoMemory } from './PhotoMemory';
import { audioManager } from '../utils/audio';

interface PhotoWallProps {
  onProceedToMessage: () => void;
}

export const PhotoWall: React.FC<PhotoWallProps> = ({ onProceedToMessage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showAllGrid, setShowAllGrid] = useState(false);
  const photos = birthdayData.photos;

  // Auto-advance spotlight photo
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPlaying, photos.length]);

  const handleNext = () => {
    audioManager.playHeartPop();
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    audioManager.playHeartPop();
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleSelectPhoto = (idx: number) => {
    audioManager.playHeartPop();
    setCurrentIndex(idx);
    setShowAllGrid(false);
  };

  // Background floating photos setup (multi-layer Pinterest/Instagram moodboard)
  const bgPhotos = photos.slice(0, 8);

  return (
    <div id="photo-wall-experience" className="relative min-h-[90vh] flex flex-col items-center justify-between py-6 px-4 select-none overflow-hidden">
      {/* 1. Slow Multi-Layered Floating Background Photos (Instagram/Pinterest Moodboard) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-25 md:opacity-35">
        {bgPhotos.map((photo, i) => {
          // Calculate varied floating path for each background photo
          const isLeft = i % 2 === 0;
          const posX = isLeft ? 5 + (i * 8) % 30 : 65 + (i * 7) % 25;
          const posY = 10 + (i * 22) % 75;
          const baseRotation = (i % 2 === 0 ? -1 : 1) * (4 + (i * 3) % 8);

          return (
            <motion.div
              key={`bg-photo-${photo.id}-${i}`}
              initial={{ 
                x: 0, 
                y: 0, 
                rotate: baseRotation, 
                scale: 0.95 
              }}
              animate={{
                x: [0, isLeft ? 15 : -15, 0],
                y: [0, -25, 0],
                rotate: [baseRotation, baseRotation + (isLeft ? 4 : -4), baseRotation],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 12 + i * 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-28 sm:w-36 md:w-44 aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl filter blur-[1.5px] hover:blur-none transition-all duration-700"
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
              }}
            >
              <img
                src={photo.src}
                onError={(e) => {
                  if (photo.fallbackSrc) (e.target as HTMLImageElement).src = photo.fallbackSrc;
                }}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-purple-950/40" />
            </motion.div>
          );
        })}
      </div>

      {/* 2. Top Header & Mode Toggle */}
      <div className="relative z-10 w-full max-w-xl flex items-center justify-between px-2 mb-4">
        <div>
          <span className="text-pink-300/80 uppercase tracking-[0.3em] text-[11px] font-semibold block mb-0.5">
            Moments Captured
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif italic text-white flex items-center gap-2">
            <span>Memories of Sanika</span>
            <Sparkles className="w-4 h-4 text-pink-300 animate-pulse" />
          </h3>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          <button
            id="toggle-autoplay-btn"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause auto-slideshow" : "Resume auto-slideshow"}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-md"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            id="toggle-grid-view-btn"
            onClick={() => setShowAllGrid(!showAllGrid)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-md"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-medium tracking-wide uppercase text-[11px]">{showAllGrid ? "Spotlight" : "All Photos"}</span>
          </button>
        </div>
      </div>

      {/* 3. Main Center Content: Spotlight or Grid View */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center my-2">
        <AnimatePresence mode="wait">
          {!showAllGrid ? (
            /* Spotlight Mode */
            <motion.div
              key="spotlight-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center"
            >
              <div className="relative w-full max-w-sm sm:max-w-md flex items-center justify-center">
                {/* Navigation arrows */}
                <button
                  id="prev-photo-btn"
                  onClick={handlePrev}
                  aria-label="Previous memory"
                  className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 border border-white/25 text-white shadow-xl backdrop-blur-xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <AnimatePresence mode="wait">
                  <PhotoMemory
                    key={photos[currentIndex].id}
                    photo={photos[currentIndex]}
                    isActive={true}
                    index={currentIndex}
                    total={photos.length}
                  />
                </AnimatePresence>

                <button
                  id="next-photo-btn"
                  onClick={handleNext}
                  aria-label="Next memory"
                  className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 border border-white/25 text-white shadow-xl backdrop-blur-xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-1.5 mt-4 max-w-xs overflow-x-auto py-1 px-2 scrollbar-none">
                {photos.map((_, i) => (
                  <button
                    key={`dot-${i}`}
                    onClick={() => handleSelectPhoto(i)}
                    aria-label={`Go to photo ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentIndex 
                        ? 'w-6 bg-pink-400 shadow-[0_0_8px_rgba(255,102,153,0.8)]' 
                        : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            /* All Photos Grid / Pinterest Moodboard Mode */
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl max-h-[55vh] overflow-y-auto px-2 py-3 grid grid-cols-2 sm:grid-cols-3 gap-3.5 scrollbar-thin"
            >
              {photos.map((photo, i) => (
                <div
                  key={photo.id}
                  onClick={() => handleSelectPhoto(i)}
                  className={`group relative aspect-[3/4] rounded-xl overflow-hidden border cursor-pointer transition-all duration-300 hover:scale-[1.03] ${
                    i === currentIndex
                      ? 'border-pink-400 ring-2 ring-pink-500/50 shadow-xl'
                      : 'border-white/15 hover:border-white/40'
                  }`}
                >
                  <img
                    src={photo.src}
                    onError={(e) => {
                      if (photo.fallbackSrc) (e.target as HTMLImageElement).src = photo.fallbackSrc;
                    }}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-2.5">
                    <p className="text-[11px] font-handwriting text-white font-medium truncate w-full">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Page 2 Transition Section: "Behind all these pictures..." */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-10 w-full max-w-md mt-6 pt-4 border-t border-white/15 text-center"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-pink-300/80 font-semibold mb-1 block">
          Behind all these pictures...
        </span>
        <p className="text-sm sm:text-base text-white/80 font-light mb-4">
          There is something I really wanted to tell you.
        </p>

        <button
          id="read-message-btn"
          onClick={() => {
            audioManager.playHeartPop();
            onProceedToMessage();
          }}
          className="w-full sm:w-auto artistic-button px-9 py-3.5 rounded-full font-semibold text-white text-xs sm:text-sm flex items-center justify-center gap-2.5 mx-auto transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-xl"
        >
          <MessageCircleHeart className="w-4 h-4 text-pink-300" />
          <span className="tracking-[0.16em]">Read My Message</span>
          <span>💌</span>
        </button>
      </motion.div>
    </div>
  );
};

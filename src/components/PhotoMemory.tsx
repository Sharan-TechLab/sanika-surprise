import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PhotoItem } from '../data/birthdayData';
import { Sparkles, Heart } from 'lucide-react';

interface PhotoMemoryProps {
  photo: PhotoItem;
  isActive: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  index: number;
  total: number;
}

export const PhotoMemory: React.FC<PhotoMemoryProps> = ({
  photo,
  isActive,
  index,
  total,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(photo.src);

  const handleImageError = () => {
    // If local path doesn't exist yet, seamlessly load beautiful curated fallback
    if (photo.fallbackSrc && imgSrc !== photo.fallbackSrc) {
      setImgSrc(photo.fallbackSrc);
    }
  };

  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto select-none">
      {/* Polaroid / Artistic Flair Glass Frame */}
      <motion.div
        key={photo.id}
        initial={{ opacity: 0, scale: 0.88, y: 20, rotate: photo.rotation || -2 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          rotate: photo.rotation || 0,
        }}
        exit={{ opacity: 0, scale: 0.92, y: -20 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white/10 backdrop-blur-xl p-3 sm:p-4 rounded-xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_35px_rgba(255,102,153,0.18)] overflow-hidden group"
      >
        {/* Subtle Top Tape / Pin Accent */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-white/20 backdrop-blur-md rounded-xs border border-white/20 -rotate-1 z-20" />

        {/* Photo Container */}
        <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden bg-black/40 flex items-center justify-center border border-white/10">
          {/* Skeleton Shimmer while loading */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-950/40 via-pink-900/20 to-purple-950/40 animate-pulse flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-pink-400/40 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
          )}

          <img
            src={imgSrc}
            alt={photo.caption}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
            className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Dreamy Warm Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

          {/* Date or Place Badge */}
          {photo.dateOrPlace && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[11px] text-pink-200/90 font-medium flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-pink-300" />
              <span>{photo.dateOrPlace}</span>
            </div>
          )}

          {/* Photo Index Indicator */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[11px] text-white/80 font-mono">
            {index + 1} / {total}
          </div>
        </div>

        {/* Caption & Emotion Area */}
        <div className="pt-3.5 pb-1 px-2 text-center">
          <p className="font-handwriting text-xl sm:text-2xl text-pink-100 font-semibold tracking-wide flex items-center justify-center gap-2 drop-shadow-sm">
            <span>{photo.caption}</span>
          </p>
        </div>

        {/* Decorative corner glow */}
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-pink-500/15 rounded-full blur-xl pointer-events-none" />
      </motion.div>
    </div>
  );
};

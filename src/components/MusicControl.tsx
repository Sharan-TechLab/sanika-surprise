import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { audioManager } from '../utils/audio';

export const MusicControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((playing, muted) => {
      setIsPlaying(playing);
      setIsMuted(muted);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    audioManager.toggleMute();
    audioManager.playHeartPop();
  };

  return (
    <div id="music-control-container" className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative"
      >
        <button
          id="music-toggle-btn"
          onClick={handleToggle}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label={isMuted ? "Unmute romantic background music" : "Mute music"}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 text-xs sm:text-sm text-white/90 hover:text-white shadow-xl group active:scale-95"
        >
          <div className="relative w-5 h-5 flex items-center justify-center text-pink-300">
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white/50" />
            ) : isPlaying ? (
              <Volume2 className="w-4 h-4 text-pink-300 animate-pulse" />
            ) : (
              <Music className="w-4 h-4 text-pink-300" />
            )}
          </div>

          {/* Soundwave animation bars */}
          {!isMuted && isPlaying ? (
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 bg-pink-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-3" />
              <span className="w-0.5 bg-pink-300 rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-4" />
              <span className="w-0.5 bg-pink-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2" />
              <span className="w-0.5 bg-pink-200 rounded-full animate-[pulse_1.0s_ease-in-out_infinite] h-3.5" />
            </div>
          ) : (
            <span className="hidden sm:inline font-medium text-white/70 text-xs tracking-wider uppercase">
              {isMuted ? "Muted" : "Music"}
            </span>
          )}

          <Sparkles className="w-3 h-3 text-pink-300 group-hover:rotate-12 transition-transform duration-300" />
        </button>

        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute right-0 top-full mt-2 w-48 py-1.5 px-3 rounded-xl bg-purple-950/90 border border-pink-500/20 text-[11px] text-pink-100 text-center shadow-xl backdrop-blur-md pointer-events-none"
            >
              {isMuted ? "Click to play soothing background music" : "Music is playing ✨"}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FallingHeart {
  id: string;
  xStart: number;
  swayAmount1: number;
  swayAmount2: number;
  swayAmount3: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  opacity: number;
  initialScale: number;
  rotationStart: number;
  rotationEnd: number;
  glow: boolean;
  glowSize: number;
  hasSparkle?: boolean;
}

const HEART_COLORS = [
  '#ff3366', // Deep ruby rose
  '#ff6699', // Bright romantic pink
  '#ff4d88', // Magenta pink
  '#f43f5e', // Rose
  '#fb7185', // Soft rose pink
  '#fda4af', // Light pastel pink
  '#ec4899', // Pink
  '#f472b6', // Pastel magenta
  '#db2777', // Rich fuchsia
  '#ffffff', // Crisp white sparkle heart
  '#fbcfe8', // Pale dreamy pink
];

function generateHearts(count: number, triggerId: number): FallingHeart[] {
  return Array.from({ length: count }, (_, i) => {
    const size = Math.floor(Math.random() * 22) + 16; // 16px to 38px
    const duration = Math.random() * 2.5 + 3.8; // 3.8s to 6.3s for graceful falling
    const delay = Math.random() * 2.8; // Staggered entry across 2.8s
    const xStart = Math.random() * 94 + 3; // 3vw to 97vw
    const sway1 = (Math.random() - 0.5) * 8; // -4vw to +4vw sway
    const sway2 = (Math.random() - 0.5) * 10;
    const sway3 = (Math.random() - 0.5) * 8;
    const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
    const opacity = Math.random() * 0.25 + 0.75; // 0.75 to 1.0
    const rotationStart = (Math.random() - 0.5) * 60; // -30deg to +30deg
    const rotationEnd = rotationStart + (Math.random() - 0.5) * 80;
    const glow = Math.random() > 0.35;
    const glowSize = Math.floor(Math.random() * 10) + 4;
    const hasSparkle = Math.random() > 0.6;

    return {
      id: `heart-rain-${triggerId}-${i}-${Math.random().toString(36).substring(2, 7)}`,
      xStart,
      swayAmount1: sway1,
      swayAmount2: sway2,
      swayAmount3: sway3,
      size,
      duration,
      delay,
      color,
      opacity,
      initialScale: Math.random() * 0.35 + 0.85,
      rotationStart,
      rotationEnd,
      glow,
      glowSize,
      hasSparkle,
    };
  });
}

interface HeartRainProps {
  isActive: boolean;
  triggerKey: number;
  durationSeconds?: number;
}

export const HeartRain: React.FC<HeartRainProps> = ({
  isActive,
  triggerKey,
  durationSeconds = 8,
}) => {
  const [hearts, setHearts] = useState<FallingHeart[]>([]);

  useEffect(() => {
    if (!isActive) {
      setHearts([]);
      return;
    }

    // Generate initial rich wave of falling hearts
    const wave1 = generateHearts(35, triggerKey * 10 + 1);
    
    // Generate second staggered wave after 1.2s
    let timeoutId: number;
    let cleanupId: number;

    setHearts(wave1);

    timeoutId = window.setTimeout(() => {
      const wave2 = generateHearts(30, triggerKey * 10 + 2);
      setHearts((prev) => [...prev, ...wave2]);
    }, 1400);

    cleanupId = window.setTimeout(() => {
      setHearts([]);
    }, (durationSeconds + 2) * 1000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(cleanupId);
    };
  }, [isActive, triggerKey, durationSeconds]);

  if (!isActive || hearts.length === 0) return null;

  return (
    <div
      id="heart-rain-container"
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none"
      aria-hidden="true"
    >
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{
              y: '-12vh',
              x: `${heart.xStart}vw`,
              opacity: 0,
              scale: heart.initialScale * 0.7,
              rotate: heart.rotationStart,
            }}
            animate={{
              y: '112vh',
              x: [
                `${heart.xStart}vw`,
                `${Math.max(2, Math.min(96, heart.xStart + heart.swayAmount1))}vw`,
                `${Math.max(2, Math.min(96, heart.xStart + heart.swayAmount2))}vw`,
                `${Math.max(2, Math.min(96, heart.xStart + heart.swayAmount3))}vw`,
              ],
              opacity: [0, heart.opacity, heart.opacity, heart.opacity * 0.8, 0],
              scale: [
                heart.initialScale * 0.7,
                heart.initialScale,
                heart.initialScale * 1.08,
                heart.initialScale * 0.95,
              ],
              rotate: [heart.rotationStart, (heart.rotationStart + heart.rotationEnd) / 2, heart.rotationEnd],
            }}
            exit={{ opacity: 0 }}
            transition={{
              y: {
                duration: heart.duration,
                delay: heart.delay,
                ease: [0.3, 0.1, 0.35, 1], // Smooth graceful gravity
              },
              x: {
                duration: heart.duration,
                delay: heart.delay,
                ease: 'easeInOut',
                times: [0, 0.33, 0.66, 1],
              },
              opacity: {
                duration: heart.duration,
                delay: heart.delay,
                times: [0, 0.08, 0.75, 0.92, 1],
              },
              scale: {
                duration: heart.duration,
                delay: heart.delay,
                ease: 'easeInOut',
                times: [0, 0.15, 0.6, 1],
              },
              rotate: {
                duration: heart.duration,
                delay: heart.delay,
                ease: 'easeInOut',
              },
            }}
            className="absolute will-change-transform flex items-center justify-center"
            style={{
              width: `${heart.size}px`,
              height: `${heart.size}px`,
              filter: heart.glow
                ? `drop-shadow(0 0 ${heart.glowSize}px ${heart.color}) drop-shadow(0 0 ${heart.glowSize * 1.5}px rgba(255,102,153,0.4))`
                : `drop-shadow(0 2px 6px rgba(0,0,0,0.35))`,
            }}
          >
            {/* SVG Heart Icon */}
            <svg
              viewBox="0 0 24 24"
              width={heart.size}
              height={heart.size}
              fill={heart.color}
              stroke="rgba(255, 255, 255, 0.55)"
              strokeWidth="0.8"
              className="w-full h-full"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>

            {/* Sparkle glimmer on some falling hearts */}
            {heart.hasSparkle && (
              <span
                className="absolute -top-1 -right-1 text-[10px] text-white/90 animate-ping pointer-events-none"
                style={{ animationDuration: '2s' }}
              >
                ✦
              </span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { MessageCard } from '../components/MessageCard';
import { FinalBirthdayCard } from '../components/FinalBirthdayCard';

interface MessagePageProps {
  onRestart: () => void;
}

export const MessagePage: React.FC<MessagePageProps> = ({ onRestart }) => {
  const finalCardRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToCard = () => {
    if (finalCardRef.current) {
      finalCardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      id="message-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
      className="relative z-10 w-full min-h-screen py-8 flex flex-col items-center justify-start space-y-12"
    >
      {/* 1. Heartfelt Personal Letter */}
      <div className="w-full">
        <MessageCard onScrollToCard={handleScrollToCard} />
      </div>

      {/* 2. Final Birthday Card with Interactive Reaction */}
      <div ref={finalCardRef} className="w-full pt-4">
        <FinalBirthdayCard onRestart={onRestart} />
      </div>
    </motion.div>
  );
};

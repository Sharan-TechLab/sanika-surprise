import React from 'react';
import { Gift, Image, Heart } from 'lucide-react';

interface StoryProgressProps {
  currentStep: number; // 1, 2, 3
  onStepClick: (step: number) => void;
}

export const StoryProgress: React.FC<StoryProgressProps> = ({ currentStep, onStepClick }) => {
  const steps = [
    { id: 1, label: 'The Secret Gift', shortLabel: 'Gift', icon: Gift },
    { id: 2, label: 'Photo Memories', shortLabel: 'Memories', icon: Image },
    { id: 3, label: 'Heartfelt Letter', shortLabel: 'For You', icon: Heart },
  ];

  const currentStepObj = steps.find(s => s.id === currentStep) || steps[0];

  return (
    <>
      {/* Desktop Bottom Left Step Indicator from Design */}
      <div className="hidden lg:flex fixed bottom-8 left-8 z-40 items-center gap-4 text-white/50 text-[11px] tracking-[0.25em] uppercase font-mono pointer-events-none select-none">
        <div className="w-8 h-[1px] bg-white/25" />
        <span>Step 0{currentStep}: {currentStepObj.label}</span>
      </div>

      {/* Main Interactive Progress Pill */}
      <div id="story-progress-bar" className="fixed bottom-4 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl pointer-events-auto">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isPassed = currentStep > step.id;

            return (
              <button
                key={step.id}
                onClick={() => onStepClick(step.id)}
                disabled={step.id > currentStep && currentStep === 1}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? 'bg-white/20 text-white border border-white/30 shadow-lg scale-105'
                    : isPassed
                    ? 'text-white/70 hover:text-white hover:bg-white/10'
                    : 'text-white/30 cursor-not-allowed'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-pink-400 animate-pulse' : ''}`} />
                <span className="hidden sm:inline">{step.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

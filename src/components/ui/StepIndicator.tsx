import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="mb-10">
      <div className="relative flex items-center justify-between">
        {/* Progress Bar */}
        <div className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-gray-200 w-full" />
        <div 
          className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-primary-500 transition-all duration-500" 
          style={{ width: `${(currentStep - 1) / (totalSteps - 1) * 100}%` }} 
        />
        
        {/* Steps */}
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? 'bg-primary-500 text-white'
                    : isCurrent
                    ? 'bg-white border-2 border-primary-500 text-primary-500'
                    : 'bg-white border-2 border-gray-300 text-gray-400'
                } transition-colors duration-300`}
              >
                {isCompleted ? <Check size={20} /> : stepNumber}
              </div>
              <span 
                className={`mt-2 text-xs ${
                  isCompleted || isCurrent ? 'text-gray-700 font-medium' : 'text-gray-400'
                } transition-colors duration-300`}
              >
                {getStepName(stepNumber)}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const getStepName = (step: number): string => {
  switch (step) {
    case 1:
      return 'Capture';
    case 2:
      return 'Voice/Text';
    case 3:
      return 'Preferences';
    case 4:
      return 'Results';
    default:
      return `Step ${step}`;
  }
};

export default StepIndicator;
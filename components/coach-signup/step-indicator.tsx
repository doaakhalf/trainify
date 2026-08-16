'use client';

import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const stepTitles = [
  'المعلومات الشخصية',
  'الإنجازات والشهادات',
  'معلومات الدفع',
];

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      {/* Progress Bar */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
        <div
          className="absolute top-0 right-0 h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Steps */}
      <div className="flex justify-between items-center">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={stepNumber} className="flex flex-col items-center flex-1">
              {/* Step Circle */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                  transition-all duration-300
                  ${
                    isCompleted
                      ? 'bg-primary text-white'
                      : isCurrent
                      ? 'bg-primary text-white ring-4 ring-primary/20'
                      : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>

              {/* Step Title */}
              <div
                className={`
                  mt-2 text-xs md:text-sm font-medium text-center
                  ${isCurrent ? 'text-primary' : 'text-gray-500'}
                `}
              >
                {stepTitles[index]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Counter */}
      {/* <div className="text-center mt-4 text-sm text-gray-600">
        الخطوة {currentStep} من {totalSteps}
      </div> */}
    </div>
  );
}


import React from 'react';
import { cn } from '@/lib/utils';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div 
              className={cn(
                "stepper-dot",
                index < currentStep ? "completed" : 
                index === currentStep ? "active" : ""
              )}
            >
              {index < currentStep ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <div className="text-xs mt-2 font-medium">
              {step}
            </div>
          </div>
          
          {index < steps.length - 1 && (
            <div 
              className={cn(
                "stepper-line mx-2",
                index < currentStep ? "active" : ""
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

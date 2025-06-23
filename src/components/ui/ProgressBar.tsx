import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  const renderSteps = () => {
    const steps = [];
    
    for (let i = 0; i <= totalSteps; i++) {
      const isActive = i <= currentStep;
      
      steps.push(
        <div 
          key={i}
          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
            isActive 
              ? 'bg-white text-blue-500' 
              : 'bg-blue-200 bg-opacity-30 text-white'
          } z-10 relative transition-colors duration-300`}
          aria-label={`Passo ${i + 1} de ${totalSteps + 1}`}
        >
          {i + 1}
        </div>
      );
    }
    
    return steps;
  };
  
  return (
    <div className="mt-8 relative">
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-200 bg-opacity-30 -translate-y-1/2"></div>
      <div 
        className="absolute top-1/2 left-0 h-1 bg-white -translate-y-1/2 transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
      
      <div className="flex justify-between relative">
        {renderSteps()}
      </div>
    </div>
  );
};

export default ProgressBar;
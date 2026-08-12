import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Brain, Code, Briefcase } from 'lucide-react';

const steps = [
  { icon: FileText, text: "Parsing your resume..." },
  { icon: Brain, text: "Analyzing with AI..." },
  { icon: Code, text: "Extracting skills..." },
  { icon: Briefcase, text: "Finding matching jobs..." }
];

const LoadingAnalysis = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = steps[step].icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-950/80 backdrop-blur-md">
      <div className="glass p-10 rounded-3xl flex flex-col items-center max-w-sm w-full mx-4">
        
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-20 animate-pulse-slow"></div>
          <motion.div
            key={step}
            initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 180 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-2xl relative z-10"
          >
            <CurrentIcon className="w-10 h-10 text-white" />
          </motion.div>
        </div>

        <div className="h-8 mb-6 flex items-center justify-center relative w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-lg font-medium text-white absolute text-center animate-shimmer bg-gradient-to-r from-white via-cyan-200 to-white bg-[length:200%_100%] bg-clip-text text-transparent"
            >
              {steps[step].text}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
            initial={{ width: '0%' }}
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingAnalysis;

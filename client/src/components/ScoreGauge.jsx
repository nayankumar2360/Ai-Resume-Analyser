import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ScoreGauge = ({ score, size = 200, label }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    let current = 0;
    const increment = score / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, 20);
    return () => clearInterval(timer);
  }, [score]);

  const strokeWidth = size * 0.08;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedScore / 100) * circumference;

  let color = 'text-rose-500';
  if (score >= 70) color = 'text-emerald-500';
  else if (score >= 40) color = 'text-amber-500';

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          {/* Background track */}
          <circle
            className="text-dark-800"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Progress ring */}
          <motion.circle
            className={`${color} transition-all duration-300 ease-in-out`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${color}`}>{animatedScore}</span>
        </div>
      </div>
      {label && <p className="mt-4 text-dark-300 font-medium text-center">{label}</p>}
    </div>
  );
};

export default ScoreGauge;

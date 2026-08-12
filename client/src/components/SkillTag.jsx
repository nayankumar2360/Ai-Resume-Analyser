import React from 'react';
import { motion } from 'framer-motion';

const SkillTag = ({ skill, category }) => {
  let bgClass = 'bg-dark-800 border-dark-600 text-dark-100';
  
  switch (category?.toLowerCase()) {
    case 'technical': bgClass = 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300'; break;
    case 'soft': bgClass = 'bg-purple-500/10 border-purple-500/20 text-purple-300'; break;
    case 'tools': bgClass = 'bg-blue-500/10 border-blue-500/20 text-blue-300'; break;
    case 'certifications': bgClass = 'bg-amber-500/10 border-amber-500/20 text-amber-300'; break;
    case 'missing': bgClass = 'bg-rose-500/10 border-rose-500/20 text-rose-300'; break;
    case 'matching': bgClass = 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'; break;
    default: break;
  }

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`px-3 py-1 rounded-full text-sm font-medium border shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${bgClass}`}
    >
      {skill}
    </motion.span>
  );
};

export default SkillTag;

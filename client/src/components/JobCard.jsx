import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink, Briefcase } from 'lucide-react';
import SkillTag from './SkillTag';

const JobCard = ({ job }) => {
  const [expanded, setExpanded] = useState(false);
  const { role, matchPercentage, description, matchingSkills, missingSkills, learningResources } = job;

  let matchColor = 'text-rose-400 bg-rose-400/10';
  if (matchPercentage >= 75) matchColor = 'text-emerald-400 bg-emerald-400/10';
  else if (matchPercentage >= 50) matchColor = 'text-amber-400 bg-amber-400/10';

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="glass rounded-xl p-6 flex flex-col"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-dark-800 rounded-lg">
            <Briefcase className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="text-xl font-bold text-white">{role}</h3>
        </div>
        <div className={`px-3 py-1 rounded-full font-bold text-sm ${matchColor}`}>
          {matchPercentage}% Match
        </div>
      </div>
      
      <p className="text-dark-300 text-sm mb-6 line-clamp-2">{description}</p>
      
      <div className="space-y-4 flex-grow">
        <div>
          <h4 className="text-xs font-semibold text-dark-400 uppercase mb-2">Matching Skills</h4>
          <div className="flex flex-wrap gap-2">
            {matchingSkills?.map((skill, i) => <SkillTag key={i} skill={skill} category="matching" />)}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-dark-400 uppercase mb-2">Missing Skills</h4>
          <div className="flex flex-wrap gap-2">
            {missingSkills?.map((skill, i) => <SkillTag key={i} skill={skill} category="missing" />)}
          </div>
        </div>
      </div>

      {learningResources && learningResources.length > 0 && (
        <div className="mt-6 pt-4 border-t border-dark-700">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Learning Resources to Skill Up</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {expanded && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-4 space-y-2"
            >
              {learningResources.map((res, i) => (
                <a 
                  key={i} 
                  href={res.url || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-dark-300 hover:text-white p-2 rounded-lg bg-dark-800/50 hover:bg-dark-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-cyan-500" />
                  <span>{res.title || res}</span>
                </a>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default JobCard;

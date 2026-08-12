import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Lightbulb, Download } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import api from '../services/api';
import toast from 'react-hot-toast';
import ScoreGauge from '../components/ScoreGauge';
import SkillTag from '../components/SkillTag';
import JobCard from '../components/JobCard';

const AnalysisPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [skillFilter, setSkillFilter] = useState('All');

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await api.get(`/resume/${id}`);
        setData(res.data);
      } catch (error) {
        toast.error('Failed to load analysis');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [id, navigate]);

  if (loading || !data) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const analysis = data.analysis || {};
  const skills = data.skills || { technical: [], soft: [], tools: [], certifications: [] };
  const jobRecommendations = data.jobRecommendations || [];

  const atsScore = analysis.atsScore || 0;
  const summary = analysis.summary || "Your resume shows good potential but needs optimization for ATS systems.";
  const strengths = analysis.strengths || [];
  const weaknesses = analysis.weaknesses || [];
  const improvementTips = analysis.improvements || [];
  const formatScore = analysis.formatScore || 0;
  const contentScore = analysis.contentScore || 0;
  const keywordScore = analysis.keywordScore || 0;

  const radarData = [
    { subject: 'Format', A: formatScore, fullMark: 100 },
    { subject: 'Content', A: contentScore, fullMark: 100 },
    { subject: 'Keywords', A: keywordScore, fullMark: 100 },
  ];

  const allSkills = [
    ...(skills.technical || []).map(s => ({ name: s, cat: 'Technical' })),
    ...(skills.soft || []).map(s => ({ name: s, cat: 'Soft' })),
    ...(skills.tools || []).map(s => ({ name: s, cat: 'Tools' })),
    ...(skills.certifications || []).map(s => ({ name: s, cat: 'Certifications' }))
  ];

  const filteredSkills = skillFilter === 'All' ? allSkills : allSkills.filter(s => s.cat === skillFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header / Score Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
          
          <div className="flex flex-col md:flex-row gap-10 items-center justify-between relative z-10">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-4">Resume Analysis Report</h1>
              <p className="text-lg text-dark-200 mb-6 leading-relaxed">{summary}</p>
              
              <div className="flex justify-center md:justify-start gap-4">
                <ScoreGauge score={formatScore} size={100} label="Format" />
                <ScoreGauge score={contentScore} size={100} label="Content" />
                <ScoreGauge score={keywordScore} size={100} label="Keywords" />
              </div>
            </div>
            
            <div className="flex-shrink-0 bg-dark-900/50 p-6 rounded-2xl border border-dark-700">
              <ScoreGauge score={atsScore} size={220} label="Overall ATS Score" />
            </div>
          </div>
        </motion.section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Radar Chart */}
          <motion.section 
            variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="glass rounded-3xl p-8 flex flex-col items-center justify-center"
          >
            <h2 className="text-xl font-bold text-white mb-6 self-start">Score Breakdown</h2>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 14 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Score" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.section>

          {/* Tips */}
          <motion.section 
            variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="glass rounded-3xl p-8"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-amber-400" /> Top Improvement Tips
            </h2>
            <ul className="space-y-4">
              {improvementTips.map((tip, idx) => (
                <li key={idx} className="flex gap-3 text-dark-200 bg-dark-800/50 p-4 rounded-xl border border-dark-700">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </motion.section>
        </div>

        {/* Strengths & Weaknesses */}
        <motion.section variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 gap-8">
          <div className="glass rounded-3xl p-8 border-t-4 border-t-emerald-500">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-emerald-500" /> Strengths
            </h2>
            <ul className="space-y-3">
              {strengths.map((s, idx) => (
                <li key={idx} className="flex gap-3 text-dark-200">
                  <CheckCircle className="w-5 h-5 text-emerald-500/50 flex-shrink-0 mt-0.5" /> <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-3xl p-8 border-t-4 border-t-rose-500">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-rose-500" /> Weaknesses
            </h2>
            <ul className="space-y-3">
              {weaknesses.map((w, idx) => (
                <li key={idx} className="flex gap-3 text-dark-200">
                  <AlertCircle className="w-5 h-5 text-rose-500/50 flex-shrink-0 mt-0.5" /> <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Skills Extracted */}
        <motion.section variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="glass rounded-3xl p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-white">Extracted Skills</h2>
            <div className="flex flex-wrap gap-2">
              {['All', 'Technical', 'Soft', 'Tools', 'Certifications'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setSkillFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${skillFilter === filter ? 'bg-cyan-500 text-white' : 'bg-dark-800 text-dark-300 hover:bg-dark-700'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 min-h-[100px]">
            {filteredSkills.map((skill, idx) => (
              <SkillTag key={idx} skill={skill.name} category={skill.cat} />
            ))}
            {filteredSkills.length === 0 && <p className="text-dark-400 italic">No skills found for this category.</p>}
          </div>
        </motion.section>

        {/* Job Recommendations */}
        <motion.section variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="text-2xl font-bold text-white mb-6">Recommended Roles for You</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {jobRecommendations.map((job, idx) => (
              <JobCard key={idx} job={job} />
            ))}
          </div>
          {jobRecommendations.length === 0 && (
            <div className="text-center py-12 glass rounded-2xl">
              <p className="text-dark-300">We couldn't generate specific job recommendations for this resume.</p>
            </div>
          )}
        </motion.section>

      </div>
    </div>
  );
};

export default AnalysisPage;

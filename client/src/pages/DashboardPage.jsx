import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import FileUpload from '../components/FileUpload';
import LoadingAnalysis from '../components/LoadingAnalysis';

const DashboardPage = () => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/resume/history');
        setRecentAnalyses(res.data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch history", error);
      }
    };
    fetchHistory();
  }, []);

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await api.post('/resume/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setIsAnalyzing(false);
      navigate(`/analysis/${res.data._id || res.data.id}`);
    } catch (error) {
      setIsAnalyzing(false);
      toast.error(error.response?.data?.message || 'Analysis failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {isAnalyzing && <LoadingAnalysis />}
      
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Welcome to your <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-dark-300">Upload your latest resume to get instant AI feedback and job matches.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl p-8 mb-12 shadow-2xl shadow-cyan-900/10"
        >
          <FileUpload onFileSelect={setFile} selectedFile={file} disabled={isAnalyzing} />
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={!file || isAnalyzing}
              className={`btn-primary flex items-center space-x-2 ${(!file || isAnalyzing) ? 'opacity-50 cursor-not-allowed transform-none' : ''}`}
            >
              <span>Analyze Resume</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {recentAnalyses.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" /> Recent Analyses
              </h2>
              <Link to="/history" className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center">
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {recentAnalyses.map((analysis, idx) => (
                <Link key={analysis._id || idx} to={`/analysis/${analysis._id}`}>
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="glass p-5 rounded-xl glass-hover cursor-pointer h-full flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-sm font-medium text-white truncate pr-2" title={analysis.fileName}>
                        {analysis.fileName || 'Resume.pdf'}
                      </p>
                      <span className={`text-xs font-bold px-2 py-1 rounded bg-dark-800 ${(analysis.analysis?.atsScore || 0) >= 70 ? 'text-emerald-400' : (analysis.analysis?.atsScore || 0) >= 40 ? 'text-amber-400' : 'text-rose-400'}`}>
                        {analysis.analysis?.atsScore || 0}
                      </span>
                    </div>
                    <p className="text-xs text-dark-400 mt-auto">
                      {new Date(analysis.createdAt).toLocaleDateString()}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;

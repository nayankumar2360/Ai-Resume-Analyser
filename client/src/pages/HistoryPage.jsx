import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Calendar, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get('/resume/history');
      setHistory(res.data);
    } catch (error) {
      toast.error('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this analysis?')) {
      try {
        await api.delete(`/resume/${id}`);
        setHistory(history.filter(item => item._id !== id && item.id !== id));
        toast.success('Analysis deleted');
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Analysis History</h1>
            <p className="text-dark-300">View and manage your past resume analyses.</p>
          </div>
          <Link to="/dashboard" className="btn-primary py-2 px-6">
            New Analysis
          </Link>
        </div>

        {history.length === 0 ? (
          <div className="glass rounded-3xl p-16 text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mb-6">
              <Search className="w-12 h-12 text-dark-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No analyses yet</h2>
            <p className="text-dark-300 mb-8 max-w-md">You haven't uploaded any resumes for analysis yet. Head to the dashboard to get started.</p>
            <Link to="/dashboard" className="btn-primary">
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {history.map((item) => (
              <motion.div key={item._id || item.id} variants={itemVariants}>
                <Link to={`/analysis/${item._id || item.id}`} className="block h-full">
                  <div className="glass p-6 rounded-2xl glass-hover h-full flex flex-col relative group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <div className="p-2 bg-cyan-500/10 rounded-lg flex-shrink-0">
                          <FileText className="w-6 h-6 text-cyan-400" />
                        </div>
                        <h3 className="text-white font-medium truncate pr-4" title={item.fileName}>
                          {item.fileName || 'Resume Document'}
                        </h3>
                      </div>
                      
                      {/* Score Badge */}
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border-2 border-dark-700 bg-dark-900 absolute top-6 right-6 shadow-lg">
                        <span className={`text-xs font-bold ${(item.analysis?.atsScore || 0) >= 70 ? 'text-emerald-400' : (item.analysis?.atsScore || 0) >= 40 ? 'text-amber-400' : 'text-rose-400'}`}>
                          {item.analysis?.atsScore || 0}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-dark-700/50 flex justify-between items-center text-sm text-dark-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" /> 
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                      
                      <button 
                        onClick={(e) => handleDelete(e, item._id || item.id)}
                        className="text-dark-500 hover:text-rose-400 transition-colors p-1"
                        title="Delete analysis"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;

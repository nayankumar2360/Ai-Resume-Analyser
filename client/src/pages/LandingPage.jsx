import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Cpu, Target, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 animated-gradient z-0 opacity-40"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/30 rounded-full blur-3xl animate-float z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-float z-0" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
              Analyze Your Resume <br className="hidden md:block" />
              <span className="gradient-text">With AI Precision</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-dark-200 mb-10">
              Get an instant ATS score, uncover missing skills, and discover job roles tailored to your exact experience using advanced AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="btn-primary w-full sm:w-auto text-lg flex items-center justify-center gap-2">
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#features" className="btn-secondary w-full sm:w-auto text-lg">
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-dark-950 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Supercharge Your Job Search</h2>
            <p className="text-dark-300 max-w-2xl mx-auto">Everything you need to optimize your resume and land your dream job faster.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'ATS Score Analysis', desc: 'Find out exactly how your resume performs in Applicant Tracking Systems before you apply.', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
              { icon: Cpu, title: 'Smart Skill Extraction', desc: 'Our AI automatically identifies your technical, soft, and tool-based skills to highlight gaps.', color: 'text-purple-400', bg: 'bg-purple-400/10' },
              { icon: Target, title: 'Job Recommendations', desc: 'Get matched with ideal roles and discover the exact skills you need to learn to get hired.', color: 'text-blue-400', bg: 'bg-blue-400/10' }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="glass p-8 rounded-2xl glass-hover group"
              >
                <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-dark-300 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-dark-900 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-between relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 -translate-y-1/2 z-0"></div>
            
            {[
              { step: '1', title: 'Upload Resume', desc: 'Drop your PDF or DOCX file securely.' },
              { step: '2', title: 'AI Analysis', desc: 'Our engine scans and evaluates your profile.' },
              { step: '3', title: 'Get Results', desc: 'Receive your score and job matches instantly.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center max-w-xs mb-10 md:mb-0"
              >
                <div className="w-16 h-16 rounded-full bg-dark-800 border-2 border-cyan-500/50 flex items-center justify-center text-2xl font-bold text-white mb-6 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-dark-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 glass border-b-0 border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <span className="text-xl font-bold gradient-text">ResumeAI</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-dark-300 hover:text-white transition-colors">Dashboard</Link>
                <Link to="/history" className="text-dark-300 hover:text-white transition-colors">History</Link>
                <button onClick={logout} className="text-dark-300 hover:text-rose-400 transition-colors">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-dark-300 hover:text-white transition-colors">Login</Link>
                <Link to="/register" className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-dark-300 hover:text-white">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass absolute w-full"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-dark-300 hover:text-white">Dashboard</Link>
                  <Link to="/history" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-dark-300 hover:text-white">History</Link>
                  <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-dark-300 hover:text-rose-400">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-dark-300 hover:text-white">Login</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-cyan-400 font-medium">Get Started</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

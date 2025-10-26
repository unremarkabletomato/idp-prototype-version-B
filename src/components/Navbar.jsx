import React from 'react';
import { useStore } from '@/store/useStore';
import { FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { darkMode, toggleDarkMode, profile } = useStore();

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🎯</div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Joblense AI
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Smart Internship Matching
              </p>
            </div>
          </div>

          {/* User Info & Theme Toggle */}
          <div className="flex items-center space-x-4">
            {profile.name && (
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {profile.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {profile.degree}
                </p>
              </div>
            )}
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { FiUpload, FiClipboard, FiHeart, FiArrowRight, FiLogIn, FiX } from 'react-icons/fi';

const Landing = () => {
  const router = useRouter();
  const [showSignIn, setShowSignIn] = useState(false);

  const features = [
    {
      icon: '🎯',
      title: 'AI-Powered Matching',
      description: 'Our algorithm analyzes your skills and personality to find perfect internship matches'
    },
    {
      icon: '📊',
      title: 'Skill Gap Analysis',
      description: 'Visualize your strengths and get personalized recommendations for improvement'
    },
    {
      icon: '⚡',
      title: 'Instant Applications',
      description: 'Apply to multiple positions with auto-generated, tailored resumes'
    },
    {
      icon: '🎓',
      title: 'Career Growth',
      description: 'Track your progress and get guidance on your professional development'
    }
  ];

  const handleGetStarted = () => {
    router.push('/profile-setup');
  };

  return (
    <div className="mobile-container min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Hero Section */}
      <div className="px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="mb-6"
          >
            <div className="inline-flex items-center space-x-3 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-xl">
              <span className="text-4xl">🎯</span>
              <div className="text-left">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Joblense AI
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-xs">
                  Smart Internship Matching
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight px-4"
          >
            Find Your Perfect Internship Match
            <br />
            <span className="text-blue-600 dark:text-blue-400">Powered by AI</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base text-gray-600 dark:text-gray-400 mb-8 px-4"
          >
            Upload your resume, take a quick quiz, and discover internships
            that align with your skills and goals.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col gap-3 mb-6 px-4"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold text-lg shadow-xl active:shadow-2xl transition-all flex items-center justify-center space-x-2"
            >
              <FiUpload />
              <span>Get Started</span>
              <FiArrowRight />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSignIn(true)}
              className="w-full px-6 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-semibold text-lg shadow-lg active:shadow-xl transition-all border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center space-x-2"
            >
              <FiLogIn />
              <span>Sign In</span>
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs text-gray-500 dark:text-gray-500 px-4"
          >
            ✨ Join 10,000+ students finding their dream internships
          </motion.p>
        </motion.div>

        {/* Features Grid - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-1 gap-4 mt-12 px-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-12 grid grid-cols-3 gap-4 px-4 pb-12"
        >
          {[
            { number: '10K+', label: 'Students Matched' },
            { number: '500+', label: 'Partner Companies' },
            { number: '95%', label: 'Success Rate' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Sign In Modal (Mock) */}
      <AnimatePresence>
        {showSignIn && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSignIn(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Sign In
                  </h3>
                  <button
                    onClick={() => setShowSignIn(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <FiX size={20} className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => {
                      alert('Mock sign-in successful!');
                      setShowSignIn(false);
                      router.push('/match-dashboard');
                    }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Sign In
                  </button>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <button
                      onClick={() => {
                        setShowSignIn(false);
                        router.push('/profile-setup');
                      }}
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;

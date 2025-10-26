import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FiX, FiCheck, FiTrendingUp, FiMapPin, FiClock, FiDollarSign, FiBarChart2, FiList, FiSettings } from 'react-icons/fi';
import SkillVisualizer from '@/components/SkillVisualizer';

const MatchCard = ({
  job,
  onSwipeLeft,
  onSwipeRight,
  showControls = true,
  profileSkills = [],
  processedCount = 0,
  totalJobs = 0,
  onNavigateApplications,
  onNavigateRecalibrate,
}) => {
  const [exitX, setExitX] = useState(0);
  const [showSkillGap, setShowSkillGap] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) > 100) {
      setExitX(info.offset.x > 0 ? 300 : -300);
      setTimeout(() => {
        if (info.offset.x > 0) {
          onSwipeRight(job);
        } else {
          onSwipeLeft(job);
        }
      }, 200);
    }
  };

  const getMatchColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-blue-500';
    if (score >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getMatchGradient = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-blue-500 to-cyan-600';
    if (score >= 40) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <motion.div
      className="absolute inset-0"
      style={{ x, rotate, opacity }}
      drag={showControls ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={exitX !== 0 ? { x: exitX, opacity: 0 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden max-w-md mx-auto h-full flex flex-col border border-gray-200 dark:border-gray-700">
        {/* Header with Logo and Match Score */}
        <div className={`bg-gradient-to-r ${getMatchGradient(job.matchScore)} p-6 text-white relative flex-shrink-0`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-5xl">{job.logo}</div>
              <div>
                <h2 className="text-2xl font-bold">{job.company}</h2>
                <p className="text-sm opacity-90">{job.role}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{job.matchScore}%</div>
              <div className="text-xs opacity-90">Match</div>
            </div>
          </div>
        </div>

        {/* Scrollable Job Details + Embedded Insights */}
        <div className="p-6 space-y-4 flex-1 overflow-y-auto no-scrollbar">
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <FiClock className="text-primary-500" />
              <span className="text-sm">{job.duration}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <FiDollarSign className="text-primary-500" />
              <span className="text-sm">{job.salary}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <FiMapPin className="text-primary-500" />
              <span className="text-sm">{job.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-semibold">
                {job.type}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Job Description</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Required Skills */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Match Reason */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <div className="flex items-start space-x-2">
              <FiTrendingUp className="text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-1">
                  Why this matches you
                </h4>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  {job.reason}
                </p>
              </div>
            </div>
          </div>

          {/* Embedded Controls previously outside the card */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setShowSkillGap(!showSkillGap)}
              className={`w-full px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                showSkillGap
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <FiBarChart2 />
              <span>{showSkillGap ? 'Hide' : 'Show'} Skill Analysis</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onNavigateApplications}
                className="w-full px-4 py-3 rounded-lg font-semibold bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 transition-all flex items-center justify-center space-x-2"
              >
                <FiList />
                <span>Applications</span>
              </button>
              <button
                onClick={onNavigateRecalibrate}
                className="w-full px-4 py-3 rounded-lg font-semibold bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 transition-all flex items-center justify-center space-x-2"
              >
                <FiSettings />
                <span>Recalibrate</span>
              </button>
            </div>
          </div>

          {/* Skill Gap Visualizer (inside the card) */}
          {showSkillGap && (
            <SkillVisualizer job={job} userSkills={profileSkills} />
          )}

          {/* Quick Tips */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              💡 Quick Tips
            </h3>
            <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">→</span>
                <span>Swipe right or tap ✓ to apply</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">→</span>
                <span>Swipe left or tap ✗ to skip</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">→</span>
                <span>Use Skill Analysis for insights</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">→</span>
                <span>Recalibrate for better matches</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        {showControls && (
          <div className="p-6 pt-0 flex justify-center space-x-4 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSwipeLeft(job)}
              className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
            >
              <FiX size={32} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSwipeRight(job)}
              className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
            >
              <FiCheck size={32} />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MatchCard;

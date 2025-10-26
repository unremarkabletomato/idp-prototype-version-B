import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useStore } from '@/store/useStore';
import { skillOptions, interestOptions } from '@/data/mockProfile';
import MobileLayout from '@/components/MobileLayout';
import { FiRefreshCw, FiEdit, FiCheck, FiArrowRight, FiTrendingUp, FiChevronUp, FiChevronDown } from 'react-icons/fi';

const FeedbackRecalibration = () => {
  const router = useRouter();
  const { profile, updateProfile, recalculateJobs, resetMatches, isProfileComplete } = useStore();
  
  const [editMode, setEditMode] = useState(false);
  const [skills, setSkills] = useState(profile.skills || []);
  const [interests, setInterests] = useState(profile.interests || []);
  const [availableSkills, setAvailableSkills] = useState(
    skillOptions.filter(skill => !skills.includes(skill))
  );
  const [recalibrating, setRecalibrating] = useState(false);

  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill));
      setAvailableSkills([...availableSkills, skill].sort());
    } else {
      setSkills([...skills, skill]);
      setAvailableSkills(availableSkills.filter(s => s !== skill));
    }
  };

  const toggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const moveSkillUp = (index) => {
    if (index > 0) {
      const newSkills = [...skills];
      [newSkills[index - 1], newSkills[index]] = [newSkills[index], newSkills[index - 1]];
      setSkills(newSkills);
    }
  };

  const moveSkillDown = (index) => {
    if (index < skills.length - 1) {
      const newSkills = [...skills];
      [newSkills[index], newSkills[index + 1]] = [newSkills[index + 1], newSkills[index]];
      setSkills(newSkills);
    }
  };

  const handleRecalibrate = () => {
    setRecalibrating(true);
    
    // Update profile with new skills and interests
    updateProfile({
      skills,
      interests
    });

    // Simulate recalculation
    setTimeout(() => {
      resetMatches();
      recalculateJobs();
      setRecalibrating(false);
      
      // Show success message
      alert('✨ Profile recalibrated! New job matches are ready for you.');
      
      router.push('/match-dashboard');
    }, 2000);
  };

  const getProfileCompleteness = () => {
    let score = 0;
    if (profile.resume || profile.completionStatus?.resume) score += 25;
    if (profile.name && profile.degree) score += 25;
    if (skills.length >= 3) score += 25;
    if (profile.personalityTraits) score += 25;
    return score;
  };

  const completeness = getProfileCompleteness();

  return (
    <MobileLayout showBack={true} title="Recalibrate">
      <div className="px-4 py-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Profile Recalibration
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Update your skills and interests
          </p>
        </motion.div>

        {/* Profile Completeness */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Profile Completeness
              </h3>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {completeness}%
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completeness}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${
                  completeness === 100
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                }`}
              />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              {completeness === 100
                ? '🎉 Complete! You\'ll get the best matches.'
                : '💡 Complete your profile for better matches.'}
            </p>
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  Your Top Skills
                </h2>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Order matters! Top skills prioritized in matching
                </p>
              </div>
              <button
                onClick={() => setEditMode(!editMode)}
                className={`px-3 py-2 rounded-lg font-semibold transition-all flex items-center space-x-2 text-sm ${
                  editMode
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 text-white'
                }`}
              >
                {editMode ? <FiCheck /> : <FiEdit />}
                <span>{editMode ? 'Done' : 'Edit'}</span>
              </button>
            </div>

            {/* Current Skills (Ordered) */}
            <div className="space-y-2 mb-4">
              {skills.length === 0 ? (
                <div className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
                  No skills selected. Add some below!
                </div>
              ) : (
                skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        #{index + 1}
                      </span>
                      <span className="font-semibold text-sm text-gray-900 dark:text-white">
                        {skill}
                      </span>
                    </div>
                    {editMode && (
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => moveSkillUp(index)}
                          disabled={index === 0}
                          className={`p-2 rounded ${
                            index === 0
                              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                              : 'bg-blue-600 text-white'
                          }`}
                        >
                          <FiChevronUp size={14} />
                        </button>
                        <button
                          onClick={() => moveSkillDown(index)}
                          disabled={index === skills.length - 1}
                          className={`p-2 rounded ${
                            index === skills.length - 1
                              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                              : 'bg-blue-600 text-white'
                          }`}
                        >
                          <FiChevronDown size={14} />
                        </button>
                        <button
                          onClick={() => toggleSkill(skill)}
                          className="px-2 py-1 bg-red-600 text-white rounded text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>

            {/* Add More Skills */}
            {editMode && (
              <div>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">
                  Add More Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Interests Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Career Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => (
                <motion.button
                  key={interest}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleInterest(interest)}
                  disabled={!editMode}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    interests.includes(interest)
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  } ${editMode ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'}`}
                >
                  {interests.includes(interest) && <FiCheck className="inline mr-1" size={12} />}
                  {interest}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Impact Prediction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800"
          >
            <div className="flex items-start space-x-3">
              <FiTrendingUp className="text-3xl text-green-600 dark:text-green-400 flex-shrink-0" />
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                  Expected Impact
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Based on your updated profile:
                </p>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                    <span>
                      <strong>Better matches:</strong> Jobs with your top {skills.length} skills
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                    <span>
                      <strong>Higher scores:</strong> Match score may increase 10-15%
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                    <span>
                      <strong>More opportunities:</strong> Roles matching your interests
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-3"
          >
            <button
              onClick={handleRecalibrate}
              disabled={recalibrating || skills.length === 0}
              className={`w-full px-4 py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center space-x-2 ${
                recalibrating || skills.length === 0
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
              }`}
            >
              {recalibrating ? (
                <>
                  <FiRefreshCw className="animate-spin" />
                  <span>Recalculating...</span>
                </>
              ) : (
                <>
                  <FiRefreshCw />
                  <span>Recalibrate & Find Matches</span>
                  <FiArrowRight />
                </>
              )}
            </button>

            <button
              onClick={() => router.push('/match-dashboard')}
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-bold text-sm border-2 border-gray-200 dark:border-gray-700"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default FeedbackRecalibration;

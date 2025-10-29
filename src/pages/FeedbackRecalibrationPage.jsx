import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useStore } from '@/store/useStore';
import { skillOptions, interestOptions, quizQuestions } from '@/data/mockProfile';
import MobileLayout from '@/components/MobileLayout';
import { FiRefreshCw, FiEdit, FiCheck, FiArrowRight, FiTrendingUp, FiChevronUp, FiChevronDown, FiEdit3 } from 'react-icons/fi';

const FeedbackRecalibration = () => {
  const router = useRouter();
  const { profile, updateProfile, recalculateJobs, resetMatches } = useStore();

  const [editMode, setEditMode] = useState(false);
  const [skills, setSkills] = useState(profile.skills || []);
  const [interests, setInterests] = useState(profile.interests || []);
  const [personalityTraits, setPersonalityTraits] = useState(profile.personalityTraits || {
    teamwork: 3,
    independence: 3,
    innovation: 3,
    structure: 3,
    communication: 3
  });

  const [editingGoal, setEditingGoal] = useState(null);
  const [editingGoalValue, setEditingGoalValue] = useState('');
  const [availableSkills, setAvailableSkills] = useState(
    skillOptions.filter(skill => !(profile.skills || []).includes(skill))
  );
  const [recalibrating, setRecalibrating] = useState(false);

  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill));
      setAvailableSkills(prev => [...prev, skill].sort());
    } else {
      setSkills([...skills, skill]);
      setAvailableSkills(prev => prev.filter(s => s !== skill));
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
    if (index <= 0) return;
    const newSkills = [...skills];
    const tmp = newSkills[index - 1];
    newSkills[index - 1] = newSkills[index];
    newSkills[index] = tmp;
    setSkills(newSkills);
  };

  const moveSkillDown = (index) => {
    if (index >= skills.length - 1) return;
    const newSkills = [...skills];
    const tmp = newSkills[index + 1];
    newSkills[index + 1] = newSkills[index];
    newSkills[index] = tmp;
    setSkills(newSkills);
  };

  const handleEditGoalStart = (goal) => {
    setEditingGoal(goal);
    setEditingGoalValue(goal);
  };

  const handleSaveGoal = (oldGoal) => {
    const newVal = editingGoalValue.trim();
    if (!newVal) return;
    // replace oldGoal with newVal across interests
    setInterests(prev => prev.map(i => i === oldGoal ? newVal : i));
    setEditingGoal(null);
    setEditingGoalValue('');
  };

  const handleCancelEditGoal = () => {
    setEditingGoal(null);
    setEditingGoalValue('');
  };

  const handleSliderChange = (key, value) => {
    setPersonalityTraits(prev => ({ ...prev, [key]: Number(value) }));
  };

  const handleRecalibrate = () => {
    setRecalibrating(true);

    // persist to store
    updateProfile({
      ...profile,
      skills,
      interests,
      personalityTraits
    });

    // simulate server recalculation
    setTimeout(() => {
      try {
        resetMatches();
        recalculateJobs();
      } catch (e) {
        // ignore in mock
      }
      setRecalibrating(false);
      alert('✨ Profile recalibrated! New job matches are ready for you.');
      router.push('/match-dashboard');
    }, 1200);
  };

  // profile completeness heuristic
  const completeness = Math.min(100, Math.round((
    (profile.photo ? 1 : 0) +
    (profile.resume ? 1 : 0) +
    (skills.length > 0 ? 1 : 0) +
    (interests.length > 0 ? 1 : 0) +
    (Object.keys(personalityTraits).length > 0 ? 1 : 0)
  ) / 5 * 100));

  return (
    <MobileLayout>
      <div className="p-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Profile</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">View and update your profile details</p>
          </div>
        </motion.div>

        {/* Profile summary card below title */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              {profile.photo && profile.photo.preview ? (
                <img src={profile.photo.preview} alt="Profile" className="w-full h-full object-cover" />
              ) : profile.photo && profile.photo.url ? (
                <img src={profile.photo.url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">👤</div>
              )}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">{profile.name || 'Your Name'}</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">{profile.degree || 'Degree'}</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">{profile.university || ''}</div>
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">{profile.email || ''}</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Year: {profile.year || '—'} • GPA: {profile.gpa || '—'}</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">GitHub: {profile.githubUrl || '—'}</div>
            </div>
            <div>
              <button onClick={() => router.push('/profile-setup')} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm text-gray-900 dark:text-white flex items-center gap-2">
                <FiEdit3 />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Profile Completeness */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Profile Completeness</h3>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{completeness}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${completeness}%` }} transition={{ duration: 0.8 }} className={`h-full rounded-full ${completeness === 100 ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-blue-500 to-indigo-600'}`} />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{completeness === 100 ? '🎉 Complete! You\'ll get the best matches.' : '💡 Complete your profile for better matches.'}</p>
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* Skills Section */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Your Top Skills</h2>
                <p className="text-xs text-gray-600 dark:text-gray-400">Order matters! Top skills prioritized in matching</p>
              </div>
              <button onClick={() => setEditMode(!editMode)} className={`px-3 py-2 rounded-lg font-semibold transition-all flex items-center space-x-2 text-sm ${editMode ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>
                {editMode ? <FiCheck /> : <FiEdit />}
                <span>{editMode ? 'Done' : 'Edit'}</span>
              </button>
            </div>

            <div className="space-y-2 mb-4">
              {skills.length === 0 ? (
                <div className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">No skills selected. Add some below!</div>
              ) : (
                skills.map((skill, index) => (
                  <motion.div key={skill} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">#{index + 1}</span>
                      <span className="font-semibold text-sm text-gray-900 dark:text-white">{skill}</span>
                    </div>
                    {editMode && (
                      <div className="flex items-center space-x-1">
                        <button onClick={() => moveSkillUp(index)} disabled={index === 0} className={`p-2 rounded ${index === 0 ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white'}`}><FiChevronUp size={14} /></button>
                        <button onClick={() => moveSkillDown(index)} disabled={index === skills.length - 1} className={`p-2 rounded ${index === skills.length - 1 ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white'}`}><FiChevronDown size={14} /></button>
                        <button onClick={() => toggleSkill(skill)} className="px-2 py-1 bg-red-600 text-white rounded text-xs">Remove</button>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>

            {editMode && (
              <div>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">Add More Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {availableSkills.map((skill) => (
                    <button key={skill} onClick={() => toggleSkill(skill)} className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">+ {skill}</button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Interests Section (Career Goals) */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Career Goals</h2>
              <button onClick={() => setEditMode(!editMode)} className={`px-3 py-2 rounded-lg font-semibold transition-all flex items-center space-x-2 text-sm ${editMode ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>
                {editMode ? <FiCheck /> : <FiEdit />}
                <span>{editMode ? 'Done' : 'Edit'}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {(() => {
                const customGoals = interests.filter(i => !interestOptions.includes(i));
                const displayGoals = [...interestOptions, ...customGoals];
                return displayGoals.map((goal) => (
                  <div key={goal} className="flex items-center">
                    {editingGoal === goal && editMode ? (
                      <div className="flex items-center gap-2">
                        <input type="text" value={editingGoalValue} onChange={(e) => setEditingGoalValue(e.target.value)} className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" />
                        <button onClick={() => handleSaveGoal(goal)} className="px-2 py-1 bg-blue-600 text-white rounded text-sm">Save</button>
                        <button onClick={handleCancelEditGoal} className="px-2 py-1 border rounded text-sm text-gray-700 dark:text-gray-300">Cancel</button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <motion.button whileTap={{ scale: 0.95 }} onClick={() => editMode ? toggleInterest(goal) : null} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${interests.includes(goal) ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} ${editMode ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'}`}>
                          {interests.includes(goal) && <FiCheck className="inline mr-1" size={12} />}
                          {goal}
                        </motion.button>
                        {editMode && (
                          <button onClick={() => handleEditGoalStart(goal)} className="text-xs text-gray-600 dark:text-gray-300 px-2 py-1"><FiEdit3 /></button>
                        )}
                      </div>
                    )}
                  </div>
                ));
              })()}
            </div>
          </motion.div>

          {/* Personality Quiz */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Personality Quiz</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">Answer each statement using the slider — this helps tailor role suggestions.</p>
              <div className="space-y-4">
                {quizQuestions.map(q => (
                  <div key={q.id} className="space-y-2">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{q.question}</div>

                    <div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={personalityTraits[q.trait] || 3}
                        onChange={(e) => handleSliderChange(q.trait, e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{q.min}</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{personalityTraits[q.trait] || 3}/5</span>
                      <span>{q.max}</span>
                    </div>
                  </div>
                ))}
              </div>
          </motion.div>

          {/* Impact Prediction */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }} className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <div className="flex items-start space-x-3">
              <FiTrendingUp className="text-3xl text-green-600 dark:text-green-400 flex-shrink-0" />
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Expected Impact</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Based on your updated profile:</p>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start"><span className="text-green-600 dark:text-green-400 mr-2">✓</span><span><strong>Better matches:</strong> Jobs with your top {skills.length || 0} skills</span></li>
                  <li className="flex items-start"><span className="text-green-600 dark:text-green-400 mr-2">✓</span><span><strong>Higher scores:</strong> Match score may increase 10-15%</span></li>
                  <li className="flex items-start"><span className="text-green-600 dark:text-green-400 mr-2">✓</span><span><strong>More opportunities:</strong> Roles matching your interests</span></li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }} className="flex flex-col gap-3">
            <button onClick={handleRecalibrate} disabled={recalibrating || skills.length === 0} className={`w-full px-4 py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center space-x-2 ${recalibrating || skills.length === 0 ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'}`}>
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

            <button onClick={() => router.push('/match-dashboard')} className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-bold text-sm border-2 border-gray-200 dark:border-gray-700">Cancel</button>
          </motion.div>

        </div>
      </div>
    </MobileLayout>
  );
};

export default FeedbackRecalibration;

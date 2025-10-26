import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useStore } from '@/store/useStore';
import { quizQuestions, skillOptions, interestOptions } from '@/data/mockProfile';
import { FiUpload, FiCheck, FiUser, FiCode, FiHeart, FiClipboard, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import MobileLayout from '@/components/MobileLayout';

const ProfileSetup = () => {
  const router = useRouter();
  const { profile, updateProfile, updateCompletionStatus, recalculateJobs } = useStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: profile.name || '',
    degree: profile.degree || '',
    university: profile.university || '',
    year: profile.year || '',
    gpa: profile.gpa || '',
    githubUrl: profile.githubUrl || '',
    resume: null,
    skills: profile.skills || [],
    interests: profile.interests || [],
    personalityTraits: profile.personalityTraits || {
      teamwork: 3,
      independence: 3,
      innovation: 3,
      structure: 3,
      communication: 3
    }
  });

  const steps = [
    { id: 0, title: 'Resume Upload', icon: <FiUpload />, key: 'resume' },
    { id: 1, title: 'Basic Info', icon: <FiUser />, key: 'basicInfo' },
    { id: 2, title: 'Skills & Interests', icon: <FiCode />, key: 'skills' },
    { id: 3, title: 'Personality Quiz', icon: <FiHeart />, key: 'quiz' }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, resume: file });
      updateCompletionStatus('resume', true);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleSkill = (skill) => {
    const newSkills = formData.skills.includes(skill)
      ? formData.skills.filter(s => s !== skill)
      : [...formData.skills, skill];
    setFormData({ ...formData, skills: newSkills });
  };

  const toggleInterest = (interest) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    setFormData({ ...formData, interests: newInterests });
  };

  const handleSliderChange = (trait, value) => {
    setFormData({
      ...formData,
      personalityTraits: {
        ...formData.personalityTraits,
        [trait]: value
      }
    });
  };

  const handleNext = () => {
    // Save current step data
    updateProfile(formData);
    
    // Mark step as complete
    const stepKey = steps[currentStep].key;
    if (stepKey === 'basicInfo' && formData.name && formData.degree) {
      updateCompletionStatus('basicInfo', true);
    } else if (stepKey === 'skills' && formData.skills.length > 0) {
      updateCompletionStatus('skills', true);
    } else if (stepKey === 'quiz') {
      updateCompletionStatus('quiz', true);
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    updateProfile(formData);
    updateCompletionStatus('quiz', true);
    
    // Simulate API call
    setTimeout(() => {
      recalculateJobs();
      router.push('/match-dashboard');
    }, 500);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.resume !== null;
      case 1:
        return formData.name && formData.degree;
      case 2:
        return formData.skills.length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <MobileLayout showBack={true} title="Profile Setup">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-8">
        <div className="px-4 py-6">
          {/* Progress Stepper */}
          <div className="mb-8">
            <div className="flex justify-between items-center relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                  className="h-full bg-blue-600"
                  transition={{ duration: 0.3 }}
                />
              </div>

              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: currentStep === index ? 1.1 : 1,
                      backgroundColor: currentStep >= index ? '#2563eb' : '#e5e7eb'
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                      currentStep >= index ? 'text-white' : 'text-gray-400 dark:text-gray-600'
                    } shadow-lg z-10`}
                  >
                    {step.icon}
                  </motion.div>
                  <p className={`mt-2 text-xs font-medium text-center max-w-[60px] ${
                    currentStep >= index ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
          >
            {/* Step 0: Resume Upload */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Upload Your Resume
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We'll analyze your resume to better understand your experience
                  </p>
                </div>

                <div className="border-4 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-8 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <FiUpload className="mx-auto text-5xl text-gray-400 dark:text-gray-500 mb-4" />
                    {formData.resume ? (
                      <div>
                        <p className="text-base font-semibold text-green-600 dark:text-green-400 mb-2">
                          ✓ {formData.resume.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Click to change file
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PDF, DOC, or DOCX (Max 10MB)
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            )}

            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Tell Us About Yourself
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Basic information to personalize your experience
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Wong Beng Hwa"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Degree *
                  </label>
                  <input
                    type="text"
                    value={formData.degree}
                    onChange={(e) => handleInputChange('degree', e.target.value)}
                    placeholder="Bachelor of Software Engineering"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    University
                  </label>
                  <input
                    type="text"
                    value={formData.university}
                    onChange={(e) => handleInputChange('university', e.target.value)}
                    placeholder="Singapore Management University"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Year of Study
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select year</option>
                    <option value="Year 1">Year 1</option>
                    <option value="Year 2">Year 2</option>
                    <option value="Year 3">Year 3</option>
                    <option value="Final Year">Final Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    GPA
                  </label>
                  <input
                    type="text"
                    value={formData.gpa}
                    onChange={(e) => handleInputChange('gpa', e.target.value)}
                    placeholder="3.8/4.0"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    GitHub Portfolio
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                    placeholder="https://github.com/username"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

            {/* Step 2: Skills & Interests */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Skills & Interests
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Select your technical skills and career interests
                  </p>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Technical Skills *
                  </h3>
                  <div className="flex flex-wrap gap-2">
                  {skillOptions.map((skill) => (
                    <motion.button
                      key={skill}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        formData.skills.includes(skill)
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {formData.skills.includes(skill) && <FiCheck className="inline mr-1" />}
                      {skill}
                    </motion.button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Selected: {formData.skills.length} skills
                </p>
              </div>

                {/* Interests */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Career Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <motion.button
                      key={interest}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        formData.interests.includes(interest)
                          ? 'bg-purple-600 text-white shadow-lg'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {formData.interests.includes(interest) && <FiCheck className="inline mr-1" />}
                      {interest}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}

            {/* Step 3: Personality Quiz */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Personality Assessment
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Help us understand your work style and preferences
                  </p>
                </div>

                {quizQuestions.map((question) => (
                  <div key={question.id} className="space-y-2">
                    <label className="block text-base font-medium text-gray-900 dark:text-white">
                      {question.question}
                    </label>
                    <div className="space-y-2">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={formData.personalityTraits[question.trait]}
                      onChange={(e) => handleSliderChange(question.trait, parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>{question.min}</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                          {formData.personalityTraits[question.trait]}/5
                        </span>
                        <span>{question.max}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                  currentStep === 0
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 active:bg-gray-300 dark:active:bg-gray-600'
                }`}
              >
                <FiArrowLeft />
                <span>Back</span>
              </button>

              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white active:shadow-lg'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>{currentStep === steps.length - 1 ? 'Complete' : 'Next'}</span>
                {currentStep === steps.length - 1 ? <FiCheck /> : <FiArrowRight />}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ProfileSetup;

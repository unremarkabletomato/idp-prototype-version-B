import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useStore } from '@/store/useStore';
import MobileLayout from '@/components/MobileLayout';
import ResumeModal from '@/components/ResumeModal';
import { FiFileText, FiClock, FiCheckCircle, FiXCircle, FiAlertCircle, FiEye } from 'react-icons/fi';

const Applications = () => {
  const router = useRouter();
  const { appliedJobs, profile } = useStore();
  const [selectedJob, setSelectedJob] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');

  const statusConfig = {
    'Applied': {
      icon: <FiClock />,
      color: 'blue',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-700 dark:text-blue-300',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    'Pending': {
      icon: <FiAlertCircle />,
      color: 'yellow',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      textColor: 'text-yellow-700 dark:text-yellow-300',
      borderColor: 'border-yellow-200 dark:border-yellow-800'
    },
    'Matched': {
      icon: <FiCheckCircle />,
      color: 'green',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-700 dark:text-green-300',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    'Rejected': {
      icon: <FiXCircle />,
      color: 'red',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      textColor: 'text-red-700 dark:text-red-300',
      borderColor: 'border-red-200 dark:border-red-800'
    }
  };

  const filteredJobs = filterStatus === 'All'
    ? appliedJobs
    : appliedJobs.filter(job => job.status === filterStatus);

  const statusCounts = {
    'All': appliedJobs.length,
    'Applied': appliedJobs.filter(j => j.status === 'Applied').length,
    'Pending': appliedJobs.filter(j => j.status === 'Pending').length,
    'Matched': appliedJobs.filter(j => j.status === 'Matched').length,
    'Rejected': appliedJobs.filter(j => j.status === 'Rejected').length
  };

  const handleViewResume = (job) => {
    setSelectedJob(job);
    setShowResumeModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <MobileLayout showBack={true} title="Applications">
      <div className="px-4 py-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex flex-col mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                My Applications
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track your internship applications
              </p>
            </div>
            <button
              onClick={() => router.push('/match-dashboard')}
              className="mt-4 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold"
            >
              Find More Jobs
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 no-scrollbar">
            {Object.keys(statusCounts).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {status}
                <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs">
                  {statusCounts[status]}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Applications Grid */}
        <div>
          {filteredJobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center border border-gray-200 dark:border-gray-700"
            >
              <div className="text-5xl mb-3">📭</div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No Applications
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Start swiping on job matches!
              </p>
              <button
                onClick={() => router.push('/match-dashboard')}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold"
              >
                Browse Jobs
              </button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {filteredJobs.map((job, index) => {
                  const config = statusConfig[job.status] || statusConfig['Applied'];
                  
                  return (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 ${config.borderColor}`}
                    >
                      {/* Header */}
                      <div className={`${config.bgColor} p-3 border-b ${config.borderColor}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{job.logo}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${config.bgColor} ${config.textColor}`}>
                            {config.icon}
                            <span>{job.status}</span>
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {job.company}
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {job.role}
                        </p>
                      </div>

                      {/* Body */}
                      <div className="p-3 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Match Score</span>
                          <span className={`font-bold ${
                            job.matchScore >= 80 ? 'text-green-600' :
                            job.matchScore >= 60 ? 'text-blue-600' :
                            'text-yellow-600'
                          }`}>
                            {job.matchScore}%
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Salary</span>
                          <span className="font-semibold text-gray-900 dark:text-white text-sm">
                            {job.salary}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Duration</span>
                          <span className="font-semibold text-gray-900 dark:text-white text-sm">
                            {job.duration}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Applied On</span>
                          <span className="font-semibold text-gray-900 dark:text-white text-xs">
                            {formatDate(job.appliedDate)}
                          </span>
                        </div>

                        {job.autoGeneratedResume && (
                          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                            <button
                              onClick={() => handleViewResume(job)}
                              className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold text-sm flex items-center justify-center space-x-2"
                            >
                              <FiEye />
                              <span>View Resume</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Footer - Skills Match */}
                      <div className="px-3 pb-3">
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-2">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Key Skills:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {job.requiredSkills.slice(0, 3).map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs border border-gray-200 dark:border-gray-700"
                              >
                                {skill}
                              </span>
                            ))}
                            {job.requiredSkills.length > 3 && (
                              <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs">
                                +{job.requiredSkills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Statistics */}
        {appliedJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Application Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {appliedJobs.length}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Total
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {appliedJobs.filter(j => j.status === 'Matched').length}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Matched
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
                  {appliedJobs.filter(j => j.status === 'Pending' || j.status === 'Applied').length}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Pending
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  {appliedJobs.length > 0
                    ? Math.round(appliedJobs.reduce((sum, job) => sum + job.matchScore, 0) / appliedJobs.length)
                    : 0}%
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Avg Match
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Resume Modal */}
      <ResumeModal
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
        profile={profile}
        job={selectedJob}
      />
    </MobileLayout>
  );
};

export default Applications;

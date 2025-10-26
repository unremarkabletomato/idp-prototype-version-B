import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useStore } from '@/store/useStore';
import MobileLayout from '@/components/MobileLayout';
import MatchCard from '@/components/MatchCard';
import { FiRefreshCw } from 'react-icons/fi';

const MatchDashboard = () => {
  const router = useRouter();
  const {
    profile,
    getCurrentJob,
    applyToJob,
    skipJob,
    availableJobs,
    appliedJobs,
    skippedJobs
  } = useStore();

  const [currentJob, setCurrentJob] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [noMoreJobs, setNoMoreJobs] = useState(false);

  useEffect(() => {
    const job = getCurrentJob();
    if (job) {
      setCurrentJob(job);
      setNoMoreJobs(false);
    } else {
      setNoMoreJobs(true);
    }
  }, [availableJobs, appliedJobs, skippedJobs]);

  const handleSwipeRight = (job) => {
    setSwipeDirection('right');
    setTimeout(() => {
      applyToJob(job);
      setSwipeDirection(null);
      const nextJob = getCurrentJob();
      setCurrentJob(nextJob);
      
      // Show success notification
      showNotification('✓ Application submitted!', 'success');
    }, 300);
  };

  const handleSwipeLeft = (job) => {
    setSwipeDirection('left');
    setTimeout(() => {
      skipJob(job);
      setSwipeDirection(null);
      const nextJob = getCurrentJob();
      setCurrentJob(nextJob);
    }, 300);
  };

  const showNotification = (message, type) => {
    // Simple notification (could be replaced with a toast library)
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-4 px-6 py-3 rounded-lg shadow-lg text-white z-50 ${
      type === 'success' ? 'bg-green-500' : 'bg-blue-500'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const processedCount = appliedJobs.length + skippedJobs.length;
  const totalJobs = availableJobs.length;

  return (
    <MobileLayout showBack={true} title="Job Matches">
      <div className="px-4 py-4">
        {/* Main Content - Only the Card visible */}
        <div className="h-[calc(100dvh-100px)] relative">
              <AnimatePresence mode="wait">
                {noMoreJobs ? (
                  <motion.div
                    key="no-more-jobs"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-200 dark:border-gray-700"
                  >
                    <div className="text-5xl mb-4">🎉</div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      All Done!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                      You've reviewed all matches. Check your applications or recalibrate.
                    </p>
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => router.push('/applications')}
                        className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold"
                      >
                        View Applications
                      </button>
                      <button
                        onClick={() => router.push('/feedback-recalibration')}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-600"
                      >
                        Recalibrate Profile
                      </button>
                    </div>
                  </motion.div>
                ) : currentJob ? (
                  <div key={currentJob.id} className="w-full h-full relative">
                    <MatchCard
                      job={currentJob}
                      onSwipeLeft={handleSwipeLeft}
                      onSwipeRight={handleSwipeRight}
                      showControls={true}
                      profileSkills={profile.skills || []}
                      processedCount={processedCount}
                      totalJobs={totalJobs}
                      onNavigateApplications={() => router.push('/applications')}
                      onNavigateRecalibrate={() => router.push('/feedback-recalibration')}
                    />
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center h-64"
                  >
                    <div className="text-center">
                      <FiRefreshCw className="animate-spin text-5xl text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Loading matches...</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
        </div>
      </div>
    </MobileLayout>
  );
};

export default MatchDashboard;

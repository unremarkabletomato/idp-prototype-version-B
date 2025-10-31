import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useStore } from '@/store/useStore';
import MobileLayout from '@/components/MobileLayout';
import MatchCard from '@/components/MatchCard';
import JobApplicationModal from '@/components/JobApplicationModal';
import { FiRefreshCw } from 'react-icons/fi';

const MatchDashboard = () => {
  const router = useRouter();
  const {
    profile,
    getCurrentJob,
    applyToJob,
    skipJob,
    undoSkip,
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
    // This handler previously auto-applied. Now we open the review modal and wait for confirmation.
    setPendingJob(job);
    setModalOpen(true);
    // Ensure audio context is created/resumed on first user gesture to satisfy Chrome autoplay policies
    ensureAudioInitialized();
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [pendingJob, setPendingJob] = useState(null);

  const handleConfirmApplication = (applicationData) => {
    if (!pendingJob) return;
    setSwipeDirection('right');
    setTimeout(() => {
      // attach application data to job meta and apply
      const jobToApply = { ...pendingJob, application: applicationData };
      applyToJob(jobToApply);
      // celebration: confetti + sound when application is submitted
      try {
        triggerCelebration();
      } catch (e) {
        // ignore in case of older browsers or SSR edge cases
        // console.warn('Celebration failed', e);
      }
      setSwipeDirection(null);
      const nextJob = getCurrentJob();
      setCurrentJob(nextJob);
      setPendingJob(null);
      setModalOpen(false);
      showNotification('✓ Application submitted!', 'success');
    }, 300);
  };

  // Simple DOM-based confetti (no external dependency) and short WebAudio tone.
  const audioCtxRef = useRef(null);

  const ensureAudioInitialized = async () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        const ctx = new AudioCtx();
        try { await ctx.resume(); } catch (e) {}
        audioCtxRef.current = ctx;
      } else {
        try { await audioCtxRef.current.resume(); } catch (e) {}
      }
    } catch (e) {
      // ignore
    }
  };

  const triggerCelebration = async () => {
    // confetti
    const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];
    const count = 36;
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = 0;
    container.style.top = 0;
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.overflow = 'visible';
    container.style.zIndex = 9999;

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      const size = Math.floor(Math.random() * 10) + 6;
      el.style.position = 'absolute';
      el.style.left = Math.random() * 100 + '%';
      el.style.top = '-10px';
      el.style.width = size + 'px';
      el.style.height = Math.max(4, Math.floor(size * 0.6)) + 'px';
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.borderRadius = '2px';
      el.style.opacity = '0.95';
      el.style.transform = `rotate(${Math.random() * 360}deg)`;
      el.style.willChange = 'transform, opacity, top, left';
      const duration = 1200 + Math.random() * 800;
      el.style.transition = `transform ${duration}ms cubic-bezier(.2,.8,.2,1), top ${duration}ms linear, opacity ${duration}ms linear, left ${duration}ms ease-out`;

      container.appendChild(el);
      // kickoff animation slightly after insert
      setTimeout(() => {
        el.style.top = 40 + Math.random() * 60 + '%';
        el.style.left = `calc(${Math.random() * 100}% + ${Math.random() * 60 - 30}px)`;
        el.style.transform = `translateY(${100 + Math.random() * 200}px) rotate(${Math.random() * 720}deg)`;
        el.style.opacity = '0';
      }, 20 + Math.random() * 120);
    }

    document.body.appendChild(container);
    // remove after animation
    setTimeout(() => {
      try {
        container.remove();
      } catch (e) {}
    }, 2500);

    // sound: simple single-tone celebration (original working sound)
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      // reuse existing context when available
      let ctx = audioCtxRef.current;
      if (!ctx) {
        ctx = new AudioCtx();
        try { await ctx.resume(); } catch (e) {}
        audioCtxRef.current = ctx;
      }

      const now = ctx.currentTime;

      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(880, now);
      g.gain.setValueAtTime(0.0001, now);
      o.connect(g);
      g.connect(ctx.destination);

      // envelope
      try { g.gain.exponentialRampToValueAtTime(0.2, now + 0.02); } catch (e) {}
      o.start(now);
      try { o.frequency.exponentialRampToValueAtTime(660, now + 0.12); } catch (e) {}
      try { g.gain.exponentialRampToValueAtTime(0.0001, now + 0.55); } catch (e) {}
      o.stop(now + 0.6);

      // If the context is still not running, audio was likely blocked. Notify the user.
      if (ctx.state !== 'running') {
        try {
          showNotification('Audio blocked by browser — tap the screen to enable sounds', 'info');
        } catch (e) {}
      }

      // cleanup small nodes after playback
      setTimeout(() => {
        try {
          g.disconnect();
        } catch (e) {}
      }, 800);
    } catch (e) {
      // ignore audio errors
    }
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

  // Back handler: undo last skip and restore that job as the current card.
  const handleBackToPreviousSkipped = () => {
    const lastSkipped = undoSkip();
    if (lastSkipped) {
      // Show the last skipped job again
      setCurrentJob(lastSkipped);
      showNotification('Returned to previous skipped job', 'success');
    } else {
      // No skipped jobs to undo; go to the main landing page instead of history back
      router.push('/');
    }
  };

  const processedCount = appliedJobs.length + skippedJobs.length;
  const totalJobs = availableJobs.length;

  const showBackButton = (skippedJobs && skippedJobs.length > 0);

  return (
    <MobileLayout showBack={showBackButton} title="Job Matches" onBack={handleBackToPreviousSkipped} >
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
                    <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm">
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
                    <>
                      <MatchCard
                        job={currentJob}
                        onSwipeLeft={handleSwipeLeft}
                        // request apply (open modal) instead of immediate apply
                        onRequestApply={handleSwipeRight}
                        showControls={true}
                        profileSkills={profile.skills || []}
                        processedCount={processedCount}
                        totalJobs={totalJobs}
                        onNavigateApplications={() => router.push('/applications')}
                        onNavigateRecalibrate={() => router.push('/feedback-recalibration')}
                      />

                      <JobApplicationModal
                        isOpen={modalOpen}
                        onClose={() => { setModalOpen(false); setPendingJob(null); }}
                        profile={profile}
                        job={pendingJob || currentJob}
                        onConfirm={handleConfirmApplication}
                      />
                    </>
                  
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center h-64"
                  >
                    <div className="text-center">
                      <FiRefreshCw className="animate-spin text-5xl text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                      <p className="text-gray-700 dark:text-gray-300 text-sm">Loading matches...</p>
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

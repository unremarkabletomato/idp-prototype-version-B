import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { FiArrowLeft, FiFilter, FiList, FiUser, FiBell, FiRefreshCw } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { mockJobs } from '../data/mockJobs';

// Simple notifications bell + popup shown in the header.
const BellButton = () => {
  
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const ref = useRef(null);

  // small list of industry updates to mix with job notifications
  const industryUpdates = [
    'New scholarship application deadline approaching',
    'Tech conference next month: Early bird tickets available',
    'Resume tips: Tailor your CV for internships',
    'AI job market trends report released',
    'Company spotlight: FinTech Corporation expands hiring'
  ];

  // create a randomized list of notifications mixing jobs and updates
  const generateNotifications = () => {
    const out = [];
    const count = Math.floor(Math.random() * 4) + 4; // 4-7 items
    for (let i = 0; i < count; i++) {
      if (Math.random() < 0.6 && mockJobs.length > 0) {
        const job = mockJobs[Math.floor(Math.random() * mockJobs.length)];
        out.push({
          id: `job-${Date.now()}-${i}`,
          type: 'job',
          title: `${job.logo || ''} ${job.role} @ ${job.company}`,
          message: job.description?.slice(0, 80) + (job.description?.length > 80 ? '…' : ''),
          time: `${Math.floor(Math.random() * 12) + 1}h`,
          jobId: job.id,
          read: Math.random() < 0.5 ? false : true,
        });
      } else {
        const upd = industryUpdates[Math.floor(Math.random() * industryUpdates.length)];
        out.push({
          id: `upd-${Date.now()}-${i}`,
          type: 'update',
          title: upd,
          message: '',
          time: `${Math.floor(Math.random() * 48) + 1}h`,
          read: Math.random() < 0.6 ? false : true,
        });
      }
    }

    // ensure newest first
    out.sort((a, b) => (a.id < b.id ? 1 : -1));
    setNotifications(out);
  };

  useEffect(() => {
    generateNotifications();
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const unread = notifications.filter((n) => !n.read).length;

  const refresh = () => generateNotifications();
  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <div ref={ref} className="relative">
      <button
        aria-label="Notifications"
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <FiBell size={20} className="text-gray-900 dark:text-white" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-white bg-red-600 rounded-full">{unread}</span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-w-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50">
          <div className="p-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</span>
            <div className="flex items-center gap-2">
              <button onClick={refresh} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"><FiRefreshCw size={16} className="text-gray-700 dark:text-gray-200" /></button>
              <button onClick={markAllRead} className="text-xs text-blue-600 dark:text-blue-400">Mark all read</button>
            </div>
          </div>

          <div className="max-h-64 overflow-auto">
            {notifications.length === 0 && (
              <div className="p-4 text-sm text-gray-500 dark:text-gray-300">No notifications</div>
            )}

            {notifications.map((n) => (
              <div key={n.id} className={`p-3 border-b last:border-b-0 border-gray-100 dark:border-gray-700 ${n.read ? 'opacity-70' : ''}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{n.title}</div>
                    {n.message && <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">{n.message}</div>}
                  </div>
                  <div className="text-xs text-gray-400 ml-2">{n.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">Demo notifications — items randomize each refresh</div>
        </div>
      )}
    </div>
  );
};

const MobileLayout = ({ children, showBack = false, title = '', onBack = null }) => {
  const router = useRouter();
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <>
      <div className="mobile-container min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Mobile Header - title always visible; back button shows only when showBack is true */}
        <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
            {showBack ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => (onBack ? onBack() : router.back())}
                className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Go back"
              >
                <FiArrowLeft size={24} className="text-gray-900 dark:text-white" />
              </motion.button>
            ) : (
              <div className="w-10" />
            )}

            {title && (
              <h1 className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h1>
            )}
            </div>

            {/* Notifications bell aligned to the right of the header (only on swipe page) */}
            {(router.pathname === '/match-dashboard' || router.pathname.startsWith('/match-dashboard')) && (
              <div className="relative">
                <BellButton />
              </div>
            )}
          </div>
        </div>
        
        {/* Content - add bottom padding so the fixed bottom nav doesn't overlap */}
        <div className="pb-24">
          {children}
        </div>

        {/* Bottom action bar: only visible on the job swipe page */}
        {(router.pathname === '/match-dashboard' || router.pathname.startsWith('/match-dashboard')) && (
          <div className="fixed bottom-0 left-0 right-0 z-50">
            {/* center and constrain to the same max width as .mobile-container */}
            <div className="mx-auto w-full max-w-[480px]">
              <div className="flex bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-t-md overflow-hidden">
                <button
                  aria-label="Filter"
                  className="w-1/3 py-3 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
                  onClick={() => setFilterOpen(true)}
                >
                  <FiFilter size={20} />
                  <span className="text-xs mt-1">Filter</span>
                </button>

                {/* Applications button: when on the applications page, make this button return to the swiping/matches page */}
                {(() => {
                  const isApplicationsPage = router.pathname === '/applications' || router.pathname.startsWith('/applications');
                  return (
                    <button
                      aria-label={isApplicationsPage ? 'Home' : 'Applications'}
                      className="w-1/3 py-3 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
                      onClick={() => router.push(isApplicationsPage ? '/match-dashboard' : '/applications')}
                    >
                      {isApplicationsPage ? (
                        <span className="text-2xl">🎯</span>
                      ) : (
                        <FiList size={20} />
                      )}
                      <span className="text-xs mt-1">{isApplicationsPage ? 'Home' : 'Applications'}</span>
                    </button>
                  );
                })()}

                <button
                  aria-label="Profile"
                  className="w-1/3 py-3 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
                  onClick={() => router.push('/feedback-recalibration')}
                >
                  <FiUser size={20} />
                  <span className="text-xs mt-1">Profile</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter Modal - mockup only */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFilterOpen(false)} />

          <div className="relative w-full max-w-md mx-4 mb-8 sm:mb-0 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filter Options</h2>

            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Salary Range:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
                <label className="flex items-center gap-2"><input type="checkbox" /> &lt; $50k</label>
                <label className="flex items-center gap-2"><input type="checkbox" /> $50k</label>
                <label className="flex items-center gap-2"><input type="checkbox" /> $75k</label>
                <label className="flex items-center gap-2"><input type="checkbox" /> $100k</label>
                <label className="flex items-center gap-2 col-span-2"><input type="checkbox" /> Other</label>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Type:</h3>
              <div className="flex flex-col text-sm text-gray-700 dark:text-gray-300">
                <label className="flex items-center gap-2"><input type="checkbox" /> Full-time</label>
                <label className="flex items-center gap-2"><input type="checkbox" /> Part-time</label>
                <label className="flex items-center gap-2"><input type="checkbox" /> Internship</label>
              </div>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Remote Jobs</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Toggle to include remote roles</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />

                {/* Track */}
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full dark:bg-gray-600 peer-checked:bg-blue-600 relative transition-colors">
                  {/* Knob */}
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition peer-checked:translate-x-5"></div>
                </div>

                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white"></span>
              </label>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setFilterOpen(false)} className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold">Apply Filters</button>
              <button onClick={() => setFilterOpen(false)} className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-600">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileLayout;

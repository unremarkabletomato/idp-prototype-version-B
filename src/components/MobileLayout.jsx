import React from 'react';
import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MobileLayout = ({ children, showBack = false, title = '' }) => {
  const router = useRouter();

  return (
    <div className="mobile-container min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header with Back Button */}
      {showBack && (
        <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Go back"
            >
              <FiArrowLeft size={24} className="text-gray-900 dark:text-white" />
            </motion.button>
            {title && (
              <h1 className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h1>
            )}
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="pb-safe">
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;

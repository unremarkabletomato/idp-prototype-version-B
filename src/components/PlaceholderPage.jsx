import React from 'react';
import { useRouter } from 'next/router';
import MobileLayout from '@/components/MobileLayout';
import { motion } from 'framer-motion';

const PlaceholderPage = ({ title = 'Page' }) => {
  const router = useRouter();

  return (
    <MobileLayout showBack={true} title={title}>
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This page is under construction
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    </MobileLayout>
  );
};

export default PlaceholderPage;

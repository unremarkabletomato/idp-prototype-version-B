import React from 'react';
import { motion } from 'framer-motion';
import { FiX, FiCheck } from 'react-icons/fi';

const SwipeButtons = ({ onLeft, onRight, disabled = false }) => {
  return (
    <div className="flex justify-center items-center space-x-6">
      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.1 }}
        whileTap={{ scale: disabled ? 1 : 0.9 }}
        onClick={onLeft}
        disabled={disabled}
        className={`w-20 h-20 rounded-full shadow-xl flex items-center justify-center transition-all ${
          disabled
            ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
            : 'bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 cursor-pointer'
        } text-white`}
      >
        <FiX size={40} />
      </motion.button>

      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Swipe or Click
        </p>
      </div>

      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.1 }}
        whileTap={{ scale: disabled ? 1 : 0.9 }}
        onClick={onRight}
        disabled={disabled}
        className={`w-20 h-20 rounded-full shadow-xl flex items-center justify-center transition-all ${
          disabled
            ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
            : 'bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 cursor-pointer'
        } text-white`}
      >
        <FiCheck size={40} />
      </motion.button>
    </div>
  );
};

export default SwipeButtons;

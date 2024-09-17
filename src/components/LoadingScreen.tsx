import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="w-24 h-24 mb-4 mx-auto"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-primary">
            <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" />
            <text x="50" y="60" fontSize="40" fill="white" textAnchor="middle">초</text>
          </svg>
        </motion.div>
        <motion.p
          className="text-xl font-bold text-primary"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          초성 맞추기 게임 로딩 중...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingScreen;

export const AILoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-r from-blue-100 to-teal-100 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="w-24 h-24 mb-4 mx-auto"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-blue-500">
            <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" />
            <text x="49" y="60" fontSize="30" fill="white" textAnchor="middle">AI</text>
          </svg>
        </motion.div>
        <motion.p
          className="text-xl font-bold text-blue-700"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          AI 통역 전문가 로딩 중...
        </motion.p>
      </div>
    </div>
  );
};
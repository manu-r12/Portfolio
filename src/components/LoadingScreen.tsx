'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  // Greetings in different languages
  const greetings = [
    { text: "नमस्ते", language: "Hindi" },
    { text: "Hello", language: "English" },
    { text: "こんにちは", language: "Japanese" },
    { text: "Bonjour", language: "French" },
    { text: "Hola", language: "Spanish" },
    { text: "안녕하세요", language: "Korean" },
    { text: "Ciao", language: "Italian" }
  ];

  useEffect(() => {
    // Track loading progress
    let progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        // Gradually increase progress
        if (prev < 100) {
          return Math.min(prev + 1, 100);
        }
        return prev;
      });
    }, 30);

    // Cycle through greetings
    let greetingInterval = setInterval(() => {
      setCurrentGreetingIndex(prevIndex => {
        if (prevIndex >= greetings.length - 1) {
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, 700);

    // Cleanup function
    return () => {
      clearInterval(progressInterval);
      clearInterval(greetingInterval);
    };
  }, []);

  // Track when loading is complete
  useEffect(() => {
    if (loadingProgress === 100 && currentGreetingIndex === greetings.length - 1) {
      // Wait a bit after reaching 100% before hiding the loading screen
      const timer = setTimeout(() => {
        setShowLoadingScreen(false);
        setTimeout(() => {
          onLoadingComplete();
        }, 500); // Wait for exit animation to complete
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [loadingProgress, currentGreetingIndex, onLoadingComplete]);

  return (
    <AnimatePresence>
      {showLoadingScreen && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        >
          <div className="relative w-36 h-36 mb-8">
            {/* Progress Circle */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#f1f1f1"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#000"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * loadingProgress) / 100}
                transform="rotate(-90 50 50)"
              />
            </svg>
            {/* Progress Text */}
            <div className="absolute inset-0 flex items-center justify-center text-lg font-medium">
              {Math.round(loadingProgress)}%
            </div>
          </div>
          
          <div className="h-20 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGreetingIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-1">
                  {greetings[currentGreetingIndex].text}
                </h2>
                <p className="text-sm text-gray-500">
                  {greetings[currentGreetingIndex].language}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <p className="mt-8 text-sm text-gray-600">Loading amazing experiences...</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
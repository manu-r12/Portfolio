'use client';

import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const quoteVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.footer 
      className="py-16 md:py-20 lg:py-24 px-4 sm:px-4 lg:px-14 bg-black text-white"
      initial="hidden"
      animate="visible"
      variants={footerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-4">
          {/* Copyright and Made with love */}
          <div className="text-center">
            <p className="mb-1">
              © {currentYear} Manu. All rights reserved.
            </p>
            <p className="flex items-center justify-center gap-1">
              Made with <FaHeart className="text-pink-500 animate-pulse" /> by Manu
            </p>
          </div>

          {/* Right side - Science quote */}
          <motion.div 
            className="text-center"
            variants={quoteVariants}
          >
            <blockquote className="not-italic">
              "The important thing is to not stop questioning. Curiosity has its own reason for existing."
              <footer className="text-sm mt-1 text-gray-400">— Albert Einstein</footer>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
} 
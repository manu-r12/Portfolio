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
      className="py-8 px-6 border-t border-[#fafafa]"
      initial="hidden"
      animate="visible"
      variants={footerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Copyright and Made with love */}
          <div className="text-center md:text-left">
            <p className="text-gray-600 mb-2">
              © {currentYear} Manu. All rights reserved.
            </p>
            <p className="text-gray-600 flex items-center justify-center md:justify-start gap-1">
              Made with <FaHeart className="text-pink-500 animate-pulse" /> by Manu
            </p>
          </div>

          {/* Right side - Science quote */}
          <motion.div 
            className="text-center md:text-right"
            variants={quoteVariants}
          >
            <blockquote className="text-gray-600 italic">
              "The important thing is to not stop questioning. Curiosity has its own reason for existing."
              <footer className="text-sm mt-1 text-gray-500">— Albert Einstein</footer>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
} 
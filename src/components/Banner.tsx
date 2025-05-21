'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SpotifyPlayer from './SpotifyPlayer';
import { motion, AnimatePresence } from 'framer-motion';

const ReactConfetti = dynamic(() => import('react-confetti'), {
  ssr: false
});

interface BannerProps {
  imageSrc?: string;
  onImageChange?: (newImage: string) => void;
}

export default function Banner({ 
  imageSrc = '/images/banner.jpg', 
  onImageChange 
}: BannerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(imageSrc);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle image URL change
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  // Handle form submission to change the image
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onImageChange) {
      onImageChange(imageUrl);
    }
    setIsEditing(false);
  };

  const bannerVariants = {
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

  const editButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div 
      className="relative border-b border-[#fafafa]"
      initial="hidden"
      animate="visible"
      variants={bannerVariants}
    >
      {showConfetti && (
        <ReactConfetti
          recycle={false}
          numberOfPieces={300}
          gravity={0.3}
          initialVelocityY={20}
          tweenDuration={100}
          colors={['#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD']}
          confettiSource={{ x: window.innerWidth / 2, y: window.innerHeight / 2, w: 0, h: 0 }}
        />
      )}
      <div 
        className="relative w-full h-36 sm:h-48 md:h-64 overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Banner Image */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Image 
            src={imageSrc}
            alt="Cover image"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw"
          />
        </motion.div>
        
        {/* Gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        
        {/* Spotify Player */}
        <motion.div 
          className="absolute bottom-3 right-3 z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SpotifyPlayer />
        </motion.div>
        
        {/* Edit button - appears on hover on desktop, always visible on mobile */}
        <AnimatePresence>
          {(isHovered || isMobile) && (
            <motion.div 
              className="absolute top-3 right-3 z-10"
              variants={editButtonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-white/90 hover:bg-white p-1.5 rounded-md text-gray-600 transition-colors"
                aria-label="Change cover"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Image URL input modal */}
        <AnimatePresence>
          {isEditing && (
            <motion.div 
              className="fixed inset-0 bg-white/50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-white rounded-lg p-6 max-w-md w-full"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h3 className="text-lg font-medium mb-4 text-gray-600">Change cover image</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="image-url" className="block text-sm font-medium text-gray-600 mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      id="image-url"
                      value={imageUrl}
                      onChange={handleImageUrlChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-600"
                      placeholder="https://example.com/image.jpg"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Recommended: wider than 1500px, less than 5MB
                    </p>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <motion.button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Save
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Mobile indicator for changing cover (always visible on small screens) */}
        <motion.div 
          className="absolute bottom-3 right-3 sm:hidden bg-white/90 px-2 py-1 rounded-md text-xs text-gray-600"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          Tap to edit cover
        </motion.div>
      </div>

      {/* WWDC Winner Box */}
      <motion.div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10 w-[90%] sm:w-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <motion.div 
          className="bg-white px-4 sm:px-8 py-3 sm:py-4 rounded-lg border border-gray-200 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-gray-600 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-pink-200 hover:shadow-lg"
          onMouseEnter={() => setShowConfetti(true)}
          onMouseLeave={() => setShowConfetti(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-xs sm:text-sm font-medium tracking-wide">Recent Good News:</span>
          <span className="font-semibold text-sm sm:text-base">WWDC'25</span>
          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          <span className="font-semibold text-sm sm:text-base">SSC Winner</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
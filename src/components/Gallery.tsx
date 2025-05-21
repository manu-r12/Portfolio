'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Photo, photos } from '@/data/GalleryData';

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const categories = ['all', ...Array.from(new Set(photos.map(photo => photo.category)))];

  // Filter photos based on active category
  const filteredPhotos = activeCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === activeCategory);

  // Show only the first 3 photos in the main view
  const previewPhotos = photos.slice(0, 3);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, delay: 0.1 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.98,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section ref={ref} id="gallery" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-24 py-12 md:py-16 lg:py-20 bg-white">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-black mb-6"
      >
        Photography
      </motion.h2>

      {/* Preview Grid - Always showing 3 photos */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
      >
        {previewPhotos.map((photo) => (
          <motion.div
            key={photo.id}
            variants={itemVariants}
            className="relative aspect-auto overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => setSelectedPhoto(photo)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* Placeholder for actual images - to be replaced with your photos */}
            <div className="relative w-full h-64">
              <Image
                src={`/api/placeholder/${photo.width}/${photo.height}`}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center px-4">
                  <p className="font-medium">{photo.alt}</p>
                  <p className="text-sm mt-1 capitalize">{photo.category}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View More Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="flex justify-center mt-6"
      >
        <button
          onClick={() => setIsGalleryOpen(true)}
          className="px-6 py-2.5 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2"
        >
          <span>View Full Gallery</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </motion.div>

      {/* Full Gallery Overlay */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 overflow-y-auto"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="min-h-screen p-4 sm:p-6 md:p-8"
              variants={contentVariants}
            >
              <div className="max-w-6xl mx-auto">
                {/* Header with close button */}
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-black">Photography Collection</h2>
                  <button
                    onClick={() => setIsGalleryOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close gallery"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeCategory === category
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative aspect-auto overflow-hidden rounded-lg cursor-pointer group"
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <div className="relative w-full h-64 md:h-72">
                        <Image
                          src={`/api/placeholder/${photo.width}/${photo.height}`}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center px-4">
                            <p className="font-medium">{photo.alt}</p>
                            <p className="text-sm mt-1 capitalize">{photo.category}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox for selected photo */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-[60] flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Image
                  src={`/api/placeholder/${selectedPhoto.width}/${selectedPhoto.height}`}
                  alt={selectedPhoto.alt}
                  width={selectedPhoto.width}
                  height={selectedPhoto.height}
                  className="max-h-[85vh] w-auto object-contain"
                />
                
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="bg-white p-4 mt-2">
                <h3 className="text-xl font-medium text-black">{selectedPhoto.alt}</h3>
                <p className="text-sm text-gray-600 mt-1 capitalize">{selectedPhoto.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
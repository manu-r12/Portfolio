'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import { Photo, photos } from '@/data/GalleryData';

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Show only the first 3 photos in the main view
  const previewPhotos = photos.slice(0, 3);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedId(photo.id);
    setSelectedPhoto(photo);
  };

  const handleClose = () => {
    setSelectedId(null);
    setSelectedPhoto(null);
  };

  return (
    <section ref={ref} id="gallery" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-24 py-12 md:py-16 lg:py-20 bg-white min-h-[500px]">
      <motion.h2 
        initial={{ opacity: 1, y: 0 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-black mb-6"
      >
        Photography
      </motion.h2>

      {/* Preview Grid - Always showing 3 photos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
      >
        {previewPhotos.map((photo) => (
          <motion.div
            key={photo.id}
            layoutId={photo.id}
            onClick={() => handlePhotoClick(photo)}
            className="cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 aspect-[4/3] relative"
          >
            <CldImage
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt="Gallery image"
              className="w-full h-full object-cover absolute top-0 left-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
                '<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="400" fill="#f3f4f6"/></svg>'
              ).toString('base64')}`}
            />
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="min-h-screen p-4 sm:p-6 md:p-8">
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

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {photos.map((photo) => (
                    <motion.div
                      key={photo.id}
                      layoutId={photo.id}
                      onClick={() => handlePhotoClick(photo)}
                      className="cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 aspect-[4/3] relative"
                    >
                      <CldImage
                        src={photo.src}
                        width={photo.width}
                        height={photo.height}
                        alt="Gallery image"
                        className="w-full h-full object-cover absolute top-0 left-0"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
                          '<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="400" fill="#f3f4f6"/></svg>'
                        ).toString('base64')}`}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox for selected photo */}
      <AnimatePresence>
        {selectedId && selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
              layoutId={selectedId}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <CldImage
                src={selectedPhoto.src}
                width={selectedPhoto.width}
                height={selectedPhoto.height}
                alt="Selected gallery image"
                className="w-full h-auto rounded-lg"
                sizes="(max-width: 1024px) 100vw, 1024px"
                quality="auto"
                loading="eager"
              />
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaFolder, FaStar, FaHistory } from 'react-icons/fa';
import { projects } from '@/data/ProjectData';

type ProjectTab = 'featured' | 'past';

interface ProjectItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  tags?: string[];
  link?: string;
  image?: string;
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState<ProjectTab>('featured');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Projects data from resume
  

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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

  return (
    <section ref={ref} className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-24 pb-12 md:pb-16 lg:pb-20 bg-white">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-black mb-6"
      >
        Projects
      </motion.h2>

      {/* Tabs */}
      <motion.div 
        className="border-b border-gray-200 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('featured')}
            className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm focus:outline-none ${
              activeTab === 'featured'
                ? 'border-black text-black'
                : 'border-transparent text-black hover:text-black'
            }`}
          >
            <FaStar className="w-5 h-5 mr-2" />
            Featured
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm focus:outline-none ${
              activeTab === 'past'
                ? 'border-black text-black'
                : 'border-transparent text-black hover:text-black'
            }`}
          >
            <FaHistory className="w-5 h-5 mr-2" />
            Past Projects
          </button>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        key={activeTab}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {projects[activeTab].map((project, index) => (
          <motion.div
            key={`${activeTab}-${index}`}
            variants={itemVariants}
            className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.01 }}
            onClick={() => project.link && window.open(project.link, '_blank')}
          >
            {/* Project Image/Video */}
            <div className="relative w-full h-48 bg-gray-200">
              {project.image ? (
                project.image.endsWith('.mp4') ? (
                  <video
                    src={project.image}
                    className="object-cover w-full h-full"
                    autoPlay
                    loop
                    muted
                    playsInline
                    ref={(el) => {
                      if (el) el.playbackRate = 2.0;
                    }}
                  />
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAn8B9p6Q2wAAAABJRU5ErkJggg=="
                  />
                )
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-black">
                  {project.icon}
                </div>
              )}
            </div>
            
            {/* Project Info */}
            <div className="p-5">
              <div className="flex items-start mb-2">
                <div className="mr-2 text-black">
                  {project.icon}
                </div>
                <h3 className="text-lg font-medium text-black">{project.title}</h3>
              </div>
              
              <p className="text-sm text-black mb-3">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags && project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-200 text-black px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Project Tag */}
              <div className="mt-4">
                <span className="inline-block bg-gray-200 rounded px-3 py-1 text-sm font-medium text-black">
                  {project.title.split(' ')[0]}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
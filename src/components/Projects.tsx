'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaFolder } from 'react-icons/fa';

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
  const projects: Record<ProjectTab, ProjectItem[]> = {
    'featured': [
      {
        title: 'Cookbook AI',
        description: 'An iOS app helping users find recipes based on available ingredients using AI image classification.',
        icon: <FaFolder className="w-6 h-6 text-gray-700" />,
        tags: ['Swift', 'SwiftUI', 'Core ML', 'Firebase'],
        link: 'https://github.com/your-username/cookbook-ai',
        image: '/project-placeholder.jpg'
      },
      {
        title: 'Drawyy',
        description: 'A collaborative web application for real-time drawing and generative art creation with live updates.',
        icon: <FaFolder className="w-6 h-6 text-gray-700" />,
        tags: ['Next.js', 'FastAPI', 'MongoDB', 'WebSocket'],
        link: 'https://github.com/your-username/drawyy',
        image: '/project-placeholder.jpg'
      }
    ],
    'past': [
      {
        title: 'OneBusAway iOS Widget',
        description: 'Modernized widget system for the OneBusAway iOS app, enhancing real-time transit data updates.',
        icon: <FaFolder className="w-6 h-6 text-gray-700" />,
        tags: ['Swift', 'SwiftUI', 'WidgetKit'],
        link: 'https://github.com/OneBusAway/onebusaway-ios',
        image: '/project-placeholder.jpg'
      },
      {
        title: 'Mood-Me Dashboard',
        description: 'Redesigned internal application feature with React.js, improving site-wide load times.',
        icon: <FaFolder className="w-6 h-6 text-gray-700" />,
        tags: ['React.js', 'Redux', 'UI Design'],
        link: '#',
        image: '/project-placeholder.jpg'
      }
    ]
  };

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
    <section ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-24 py-12 md:py-16 lg:py-20 bg-white">
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
        className="border-b border-[#fafafa] mb-6"
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
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            <span className="mr-2">⭐</span>
            Featured
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm focus:outline-none ${
              activeTab === 'past'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            <span className="mr-2">🕒</span>
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
            className="bg-white rounded-lg border border-[#fafafa] hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.01 }}
            onClick={() => project.link && window.open(project.link, '_blank')}
          >
            {/* Project Image */}
            <div className="relative w-full h-48 bg-[#fafafa]">
              {project.image ? (
                <Image
                  src="/api/placeholder/800/400"
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[#fafafa]">
                  {project.icon}
                </div>
              )}
            </div>
            
            {/* Project Info */}
            <div className="p-5">
              <div className="flex items-start mb-2">
                <div className="mr-2 text-gray-700">
                  {project.icon}
                </div>
                <h3 className="text-lg font-medium text-black">{project.title}</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags && project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[#fafafa] text-gray-700 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Project Tag */}
              <div className="mt-4">
                <span className="inline-block bg-[#fafafa] rounded px-3 py-1 text-sm font-medium text-gray-700">
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
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGlobe, FaBriefcase } from 'react-icons/fa';

type ExperienceTab = 'open-source' | 'work';

interface ExperienceData {
  title: string;
  company: string;
  period: string;
  description: string[];
  tags?: string[];
  links?: {
    github?: string;
    pullRequests?: string[];
  };
}

export default function Experience() {
  const [activeTab, setActiveTab] = useState<ExperienceTab>('open-source');

  // Experience data
  const experiences: Record<ExperienceTab, ExperienceData[]> = {
    'open-source': [
      {
        title: 'Open Source Contributor',
        company: 'OneBusAway-iOS',
        period: 'Oct 2024 - Present',
        description: [
          'Migrated a legacy UIKit-based widget to SwiftUI using WidgetKit, implementing a modern iOS 18 WidgetKit-based widget',
          'Fixed critical bugs and added support for new iOS 18 tinted and dark app icons, utilizing Apple Design Resources and Figma',
          'Invited to TestFlight testing to validate new features, providing feedback and implementing fixes to refine functionality and user experience before release',
          'Modernized the widget system to enhance real-time transit data updates and improved app usability'
        ],
        tags: ['Swift', 'SwiftUI', 'WidgetKit', 'UIKit', 'Figma'],
        links: {
          github: 'https://github.com/OneBusAway/onebusaway-ios',
          pullRequests: [
            'https://github.com/OneBusAway/onebusaway-ios/pull/753',
            'https://github.com/OneBusAway/onebusaway-ios/pull/778',
            'https://github.com/OneBusAway/onebusaway-ios/pull/776'
          ]
        }
      }
    ],
    'work': [
      {
        title: 'Software Developer Intern',
        company: 'Mood-Me',
        period: 'Nov 2023 - Feb 2024',
        description: [
          'Modernized an existing internal application feature, including a redesign of the UI using React.js',
          'Collaborated with team members to design and implement user interfaces',
          'Improved site-wide load times by reducing AI Model loading time by 5%, leading to faster web page loading',
          'Integrated Redux.js for efficient state management, improving application performance and scalability'
        ],
        tags: ['React.js', 'Redux', 'UI Design', 'Performance Optimization']
      }
    ]
  };

  // Framer Motion variants
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

  const tabVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-24 pt-12 md:pt-16 lg:pt-20 bg-white">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-black mb-6"
      >
        Experience
      </motion.h2>

      {/* Tabs */}
      <motion.div 
        className="border-b border-gray-200 mb-6"
        variants={tabVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('open-source')}
            className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm focus:outline-none ${
              activeTab === 'open-source'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            <FaGlobe className="w-5 h-5 mr-2" />
            Open Source
          </button>
          <button
            onClick={() => setActiveTab('work')}
            className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm focus:outline-none ${
              activeTab === 'work'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            <FaBriefcase className="w-5 h-5 mr-2" />
            Work Experience
          </button>
        </div>
      </motion.div>

      {/* Experience Cards */}
      <motion.div
        key={activeTab}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4"
      >
        {experiences[activeTab].map((exp, index) => (
          <motion.div
            key={`${activeTab}-${index}`}
            variants={itemVariants}
            className="bg-white p-5 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-medium text-black">{exp.title}</h3>
                <p className="text-black">{exp.company}</p>
              </div>
              <span className="text-sm text-gray-500 mt-1 sm:mt-0">{exp.period}</span>
            </div>
            
            <ul className="mt-3 space-y-1.5">
              {exp.description.map((desc, i) => (
                <li key={i} className="text-gray-600 text-sm flex">
                  <span className="mr-2">•</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
            
            {/* GitHub and PR links */}
            {exp.links && (
              <div className="mt-3 flex flex-col space-y-2">
                {exp.links.github && (
                  <Link 
                    href={exp.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm flex items-center text-black hover:underline"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub Repository
                  </Link>
                )}
                
                {exp.links.pullRequests && exp.links.pullRequests.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.links.pullRequests.map((pr, i) => (
                      <Link 
                        key={i}
                        href={pr}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center bg-gray-100 text-black px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                      >
                        <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M18.25 15.5a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75h-9a.75.75 0 000 1.5h7.19L6.22 16.72a.75.75 0 101.06 1.06L17.5 7.56v7.19c0 .414.336.75.75.75z" clipRule="evenodd" />
                        </svg>
                        PR #{i+1}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {exp.tags && (
              <div className="mt-3 flex flex-wrap gap-2">
                {exp.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 text-black px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

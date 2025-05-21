'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiSwift, SiReact, SiNextdotjs, SiExpress, SiSpringboot, 
  SiFirebase, SiAmazon, SiDocker, SiPostgresql, SiMongodb, 
  SiTensorflow, SiGit, SiPython, SiJavascript, SiTypescript, 
  SiCplusplus, SiApple, SiCoder
} from 'react-icons/si';
import { FaJava, FaChevronDown } from 'react-icons/fa';
import type { IconType } from 'react-icons';

type SkillTab = 'technology' | 'language';

interface SkillItem {
  name: string;
  icon: IconType;
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<SkillTab>('technology');
  const [isExpanded, setIsExpanded] = useState(false);

  // Skills data from resume
  const skills: Record<SkillTab, SkillItem[]> = {
    'technology': [
      { name: 'Swift UI', icon: SiApple },
      { name: 'React.js', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Express.js', icon: SiExpress },
      { name: 'Spring Boot', icon: SiSpringboot },
      { name: 'Firebase', icon: SiFirebase },
      { name: 'AWS S3', icon: SiAmazon },
      { name: 'Docker', icon: SiDocker },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'TensorFlow', icon: SiTensorflow },
      { name: 'Git', icon: SiGit },
    ],
    'language': [
      { name: 'Swift', icon: SiSwift },
      { name: 'Python', icon: SiPython },
      { name: 'Java', icon: FaJava },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'C++', icon: SiCplusplus },
    ]
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const chevronVariants = {
    expanded: { rotate: 180 },
    collapsed: { rotate: 0 }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-24 py-12 md:py-16 lg:py-20 bg-white">
      <div className="flex items-center justify-between mb-6">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-black"
      >
        Skills
      </motion.h2>
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-black transition-colors"
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={chevronVariants}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="w-4 h-4" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
      {/* Tabs */}
      <motion.div 
        className="border-b border-gray-200 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('technology')}
            className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm focus:outline-none ${
              activeTab === 'technology'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
                  <SiCoder className="w-5 h-5 mr-2" />
            Technology
          </button>
          <button
            onClick={() => setActiveTab('language')}
            className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm focus:outline-none ${
              activeTab === 'language'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
                  <SiSwift className="w-5 h-5 mr-2" />
            Language
          </button>
        </div>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        key={activeTab}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
      >
        {skills[activeTab].map((skill, index) => (
          <motion.div
            key={`${activeTab}-${index}`}
            variants={itemVariants}
                  className="bg-white p-2.5 rounded-lg border border-gray-200 hover:shadow-md transition-shadow flex items-center"
          >
                  <div className="text-gray-700 mr-2">
                    {React.createElement(skill.icon, { className: "w-4 h-4" })}
                  </div>
                  <span className="text-black text-sm">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface Achievement {
  icon: string;
  title: string;
  description: string;
  date?: string;
  link?: string;
  image?: string;
  tag?: string;
}

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Achievements data
  const achievements: Achievement[] = [
    {
      icon: '🏅',
      title: 'Winner – Apple Swift Student Challenge 2025',
      description: 'Selected by Apple for building an innovative Swift Playground that showcases creativity, technical depth, and user-focused design. Among 350 winners worldwide recognized at WWDC.',
      date: 'Apr 2025',
      link: 'https://developer.apple.com/swift-student-challenge/',
      image: '/images/ssc.jpg',
      tag: 'Apple'
    },
    {
      icon: '🛠️',
      title: 'Google Summer of Code 2025 Contributor',
      description: 'Selected by Google to contribute as an iOS Software Developer with the Open Transit Software Foundation (OneBusAway). Working under the mentorship of Aaron Brethorst, I\'m dedicating this summer to building impactful open-source transit tools and giving back to the community that shaped me.',
      date: 'Jun-Sep 2025',
      link: 'https://summerofcode.withgoogle.com/',
      image: '/images/gsoc.jpeg',
      tag: 'Google'
    }
  ];

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
        Achievements
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.01 }}
            onClick={() => achievement.link && window.open(achievement.link, '_blank')}
          >
            {/* Achievement Image */}
            <div className="relative w-full h-48 bg-gray-100">
              {achievement.image ? (
                <Image
                  src={achievement.image}
                  alt={achievement.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-4xl">
                  {achievement.icon}
                </div>
              )}
            </div>
            
            {/* Achievement Info */}
            <div className="p-5">
              <div className="flex items-start mb-2">
                <div className="mr-2 text-xl">{achievement.icon}</div>
                <h3 className="text-lg font-medium text-black">{achievement.title}</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                {achievement.description.split('**').map((part, i) => 
                  i % 2 === 0 ? part : <strong key={i}>{part}</strong>
                )}
              </p>
              
              {achievement.date && (
                <div className="text-xs text-gray-500 mt-2 mb-2">
                  {achievement.date}
                </div>
              )}
              
              {/* Achievement Tag (shown at the bottom like in your image) */}
              <div className="mt-4">
                <span className="inline-block bg-gray-100 rounded px-3 py-1 text-sm font-medium text-gray-800">
                  {achievement.tag}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
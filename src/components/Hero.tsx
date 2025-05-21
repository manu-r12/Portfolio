'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaFileDownload } from 'react-icons/fa';

interface HeroProps {
  name?: string;
  bio?: string;
  profileImageSrc?: string;
}

export default function Hero({
  name = "Manu Rajbhar",
  bio = "Hi, I'm Manu, a pre-final year Computer Science student and currently a **Google Summer of Code 2025 contributor**. I love building fun, meaningful applications and have a growing passion for robotics, which I'm excited to explore more deeply in the future. I also enjoy creating augmented reality experiences that blend creativity with technology.\nOutside of code, I find joy in hands-on, cozy hobbies like:",
  profileImageSrc = "/images/me.jpg"
}: HeroProps) {
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };
  
  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  };
  
  const staggerButtons = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const buttonVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Function to parse markdown-style bold text (**text**)
  const renderFormattedBio = (text: string) => {
    const boldPattern = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = boldPattern.exec(text)) !== null) {
      // Add text before the bold part
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      // Add the bold part
      parts.push(<strong key={match.index} className="text-black font-bold">{match[1]}</strong>);
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add any remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-24 py-8 md:py-12 lg:py-16 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center">
        {/* Left column - Text content */}
        <div className="order-2 lg:order-1">
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl font-bold mb-6 text-black hidden md:block"
          >
            Portfolio
          </motion.h1>
          
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="space-y-4 text-sm sm:text-base text-black"
          >
            <p className="leading-relaxed">
              {renderFormattedBio(bio)}
            </p>
          </motion.div>
          
          {/* Hobbies Code Block */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="mt-6 mb-6"
          >
            <div className="bg-white border border-gray-200 text-gray-800 p-4 rounded-lg overflow-x-auto shadow-sm">
              <pre className="language-swift text-sm">
let hobbies: [String] = ["Learning to cook 🥘", "Gardening 🧑🏼‍🌾", "Knitting ��"]
              </pre>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-6 flex flex-wrap gap-4"
            variants={staggerButtons}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={buttonVariant}>
              <Link 
                href="https://linkedin.com/in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50 transition-colors"
              >
                <FaLinkedin className="h-5 w-5 mr-2 text-black" />
                LinkedIn
              </Link>
            </motion.div>
            
            <motion.div variants={buttonVariant}>
              <Link 
                href="https://github.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50 transition-colors"
              >
                <FaGithub className="h-5 w-5 mr-2 text-black" />
                GitHub
              </Link>
            </motion.div>

            <motion.div variants={buttonVariant}>
              <Link 
                href="/file/ManuRajbhar.pdf" 
                download
                className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50 transition-colors"
              >
                <FaFileDownload className="h-5 w-5 mr-2 text-black" />
                Download Resume
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Right column - Profile image */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
            className="relative w-80 h-80 mx-auto lg:mx-0"
          >
            <Image
              src={profileImageSrc}
              alt={name}
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
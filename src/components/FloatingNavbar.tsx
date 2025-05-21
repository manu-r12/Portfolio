'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

interface NavLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export default function FloatingNavbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: NavLink[] = [
    {
      name: 'Home',
      href: '#home',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      )
    },
    {
      name: 'Experience',
      href: '#experience',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
        </svg>
      )
    },
    {
      name: 'Projects',
      href: '#projects',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
        </svg>
      )
    },
    {
      name: 'Contact',
      href: '#contact',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      )
    }
  ];

  // Handle scrolling to track active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide navbar on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMenuOpen(false); // Close menu when scrolling down
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
      
      // Determine active section based on scroll position
      const sections = navLinks.map(link => link.href.replace('#', ''));
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, navLinks]);

  // Handle click on nav link
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(targetId);
      setIsMenuOpen(false); // Close menu after clicking a link
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <div 
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <div className="relative p-[1px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-gradient-x">
          <nav className="relative bg-white rounded-full shadow-sm px-4 py-2.5">
            <ul className="flex items-center space-x-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-black bg-gray-50'
                        : 'text-gray-500 hover:text-black hover:bg-gray-50'
                    }`}
                  >
                    <span className="w-5 h-5">{link.icon}</span>
                    <span>{link.name}</span>
                    
                    {activeSection === link.href.replace('#', '') && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-1/2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="relative p-[1px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-gradient-x">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative bg-white rounded-full p-3 shadow-sm"
          >
            {isMenuOpen ? (
              <FaTimes className="w-5 h-5 text-gray-600" />
            ) : (
              <FaBars className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-48"
            >
              <div className="relative p-[1px] rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-gradient-x">
                <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
                  <ul className="py-2">
                    {navLinks.map((link) => (
                      <motion.li key={link.name} variants={menuItemVariants}>
                        <Link
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                            activeSection === link.href.replace('#', '')
                              ? 'text-black bg-gray-50'
                              : 'text-gray-500 hover:text-black hover:bg-gray-50'
                          }`}
                        >
                          <span className="w-5 h-5">{link.icon}</span>
                          <span>{link.name}</span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
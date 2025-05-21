"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/Hero"
import Contact from "@/components/Contact"
import Banner from "@/components/Banner"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Achievements from "@/components/Achievements"
import FloatingNavbar from "@/components/FloatingNavbar"
import Footer from "@/components/Footer"
import Experience from "@/components/Experience"
import LoadingScreen from "@/components/LoadingScreen"
import Gallery from "@/components/Gallery"

export default function Home() {
  // Control loading state
  const [isLoading, setIsLoading] = useState(true);

  // Use useEffect to handle the initial loading
  useEffect(() => {
    // Preload any necessary assets here if needed
    
    // Simulate a minimum loading time to ensure the loading screen is visible
    const timer = setTimeout(() => {
      // Set isLoading to false after the loading component signals it's done
      // This happens after the artificial delay to ensure smooth animations
    }, 2000); // Minimum 2 seconds loading time
    
    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    // This will be called by the LoadingScreen component when it's done
    setIsLoading(false);
  };

  return (
    <>
      {/* Loading screen */}
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      {/* Main content with conditional opacity */}
      <main className={`min-h-screen bg-white transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <section id="home">
          <Banner />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <Hero />
          </div>
        </section>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section id="achievements">
            <Achievements />
          </section>
          
          <section id="experience">
            <Experience />
          </section>
          
          <section id="skills">
            <Skills />
          </section>
          
          <section id="projects">
            <Projects />
          </section>

          <Gallery/>
          
          <section id="contact">
            <Contact />
          </section>
        </div>
        
        <Footer />
        <FloatingNavbar />
      </main>
    </>
  )
}
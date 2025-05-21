"use client"
import Hero from "@/components/Hero"
import Contact from "@/components/Contact"
import Banner from "@/components/Banner"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Achievements from "@/components/Achievements"
import FloatingNavbar from "@/components/FloatingNavbar"
import Footer from "@/components/Footer"
import Experience from "@/components/Experience"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Banner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section id="home">
          <Hero />
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
        <section id="contact">
          <Contact />
        </section>
      </div>
      <FloatingNavbar />
      <Footer />
    </main>
  )
}
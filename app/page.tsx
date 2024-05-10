"use client"
import React, { useEffect } from "react";
import Hero from "@/components/Hero/hero";
import Nav from "@/components/Nav/nav";
import Grid from "@/components/UI/Grid/grid";
import Experience from "@/components/Experience/experience";
import Lenis from '@studio-freight/lenis'
import About from "@/components/About/about";
import Skills from "@/components/Skills/skillSection";
import Fake from "@/components/Fake/fake";
import { getWeatherData } from "@/hooks/getWeatherData";



export default function Home() {

  async function startk() {
    console.log("Weather Data ->", await getWeatherData('Delhi'))
  }

  useEffect(() =>{
    const start = async ()  => {
      await startk()
    }
    const lenis = new Lenis()

    function raf(time: number) {

      lenis.raf(time)
      requestAnimationFrame(raf)

    }

    start()
    requestAnimationFrame(raf)
  })


  return (
    <main className="relative h-screen">
    {/* Fixed ELements */}

      <Nav/>
      <Hero/>
      <About/>
      <Experience/>
      <Skills/>
    </main>
  );
}
 
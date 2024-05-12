"use client"
import React, { useEffect } from "react";
import Hero from "@/components/Hero/hero";
import Nav from "@/components/Nav/nav";
import Grid from "@/components/UI/Grid/grid";
import Experience from "@/components/Experience/experience";
import Lenis from '@studio-freight/lenis'
import About from "@/components/About/about";
import Skills from "@/components/Skills/skillSection";
import ImageGallery from "@/components/ImageGallery/imageGallery";
import { getWeatherData } from "@/hooks/getWeatherData";
import  AnimatedCursor from "react-animated-cursor"
import CursorFollowingBlob from "@/components/Blob/cursorFollowingBlob";



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
      <CursorFollowingBlob/>
      <AnimatedCursor 
         innerSize={8}
         outerSize={55}
         innerScale={2}
         outerScale={2}
         outerAlpha={0}
         innerStyle={{
           backgroundColor: 'white'
         }}
         outerStyle={{
           border: '2px solid #0FC06B'
         }}
       />
      <Nav/>
      <Hero/>
      <About/>
      <Experience/>
      <Skills/>
    </main>
  );
}
 

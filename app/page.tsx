"use client"
import React, { useEffect } from "react";
import Hero from "@/components/Hero/hero";
import Nav from "@/components/Nav/nav";
import Grid from "@/components/UI/Grid/grid";
import Experience from "@/components/Experience/experience";
import Lenis from '@studio-freight/lenis'
import About from "@/components/About/about";
import SVG_Circle from "@/animations/SVG-Circle";



export default function Home() {

  useEffect(() =>{

    const lenis = new Lenis()

    function raf(time: number) {

      lenis.raf(time)
      requestAnimationFrame(raf)

    }

    requestAnimationFrame(raf)
  })


  return (
    <main className="relative h-screen">
    {/* Fixed ELements */}
      <Grid/>
      <Nav/>
    {/* ------------- */}

      <Hero/>
      <Experience/>
      <About/>
      <SVG_Circle/>
    </main>
  );
}
 
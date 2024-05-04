import React from "react";
import HeroBg from "@/components/Hero/hero";
import Nav from "@/components/Nav/nav";
import Grid from "@/components/Grid/grid";
import Player from "@/components/SpotifyMiniPlayer/player";


export default function Home() {
  return (
    <main className="relative h-screen ">
      <Grid/>
      <HeroBg/>
      <Nav/>
    </main>
  );
}
 
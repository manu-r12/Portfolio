"use client"
import React, { useEffect }  from "react";
import Particles from "@/animations/Particles/particles";
import styles from './hero.module.scss'
import Player from "../SpotifyMiniPlayer/player";
import Logo from "../Logo/logo";
import Image from "next/image";




export default function HeroBg() {

 
   const translateSimple = {
        initial: {
            y: "70%",
            opacity: 0
        },
        enter: {
            y: 0,
            opacity: 1,
            transition: {duration: 0.6, ease: [0.76, 0, .24, 1], delay: 0.4}
        },
        exit: {
            y: "-50%",
            opacity: 0,
            transition: {duration: 0.74, ease: [0.76, 0, 0.24, 1], delay: 0.4}
        }
    }

    const fading = {
        initial: {
            y: "15%",
            opacity: 0
        },
        enter: {
            y: 0,
            opacity: 1,
            transition: {duration: 0.6, ease: [0.76, 0, .24, 1], delay: 0.2}
        },
        exit: {
            y: "-50%",
            opacity: 0,
            transition: {duration: 0.74, ease: [0.76, 0, 0.24, 1], delay: 0.2}
        }
    }

  return (
    <div className={styles.container}>
        
     <div className={styles.introTextContainer}>
        <div className={styles.innerTextContainer}>
            <p>I'm Manu</p>
            <p>A Passionate </p>
            <p style={{color: "#0FC06B"}}>Programmer</p>
            <Image className="absolute top-[10%]" alt="Hello" src={"/icons/codebrackts.svg"} height={600} width={600}/>
        </div>
     </div>   
   
    <div className={styles.heroBackground}/>
     <Player/>
     <Logo/>
     <Particles className={styles.particlesBG}/>
    </div>
    
  );
}

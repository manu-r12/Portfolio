"use client"
import React, { useEffect }  from "react";
import Particles from "@/animations/Particles/particles";
import styles from './hero.module.scss'
import { motion } from "framer-motion";
import Player from "../SpotifyMiniPlayer/player";
import Logo from "../Logo/logo";
import { getCurrentTime } from "@/hooks/getCurrentTime";
import Blobs from "../Blob/blob";




export default function HeroBg() {

    const transitions = {duration: 1, ease: [0.76, 0, 0.24, 1]}
    
    console.log(getCurrentTime())

    const translate = {
        initial: {
            y: "70%",
            opacity: 0
        },
        enter: (i: number[]) => ({
            y: 0,
            opacity: 1,
            transition: {duration: 0.6, ease: [0.76, 0, .24, 1], delay: i[0]}
        }),
        exit: (i: number[]) => ({
            y: "-50%",
            opacity: 0,
            transition: {duration: 0.74, ease: [0.76, 0, 0.24, 1], delay: i[1]}
        })
    }

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
  
    const text1 = ["I", "am",  "Manu"];
    const text2 = ["A", "Passionate"];

    const getChar = (text : string, shouldApplyGradient=false) =>{
       let chars: JSX.Element[] = []
       text.split("").forEach((char , i) =>{
            chars.push(
                <motion.span custom={[i * 0.02, (text.length - i) * 0.01]} 
                variants={translate} initial="initial"
                className={shouldApplyGradient ? styles.myIntroSecondWord: ''} 
                animate="enter" 
                exit="exit" 
                key={char + i}>
                    {char}
                </motion.span>
            )
       })

       return chars
    }


  return (
    <div className={styles.container}>
        <Logo/>
        <div>
        <motion.div className={styles.innerContainer}>
            <div className={styles.inner}>
                <div className={styles.text}>
                <motion.p variants={translateSimple} 
                    initial="initial"
                    animate="enter" 
                    exit="exit"  
                    className={`${styles.myIntro}`}>I am Manu</motion.p>
                    <div className={styles.imageOfMyself}/>
                </div>
                <div className={styles.text}>
                <motion.p variants={translateSimple} 
                    initial="initial"
                    animate="enter" 
                    exit="exit"  
                    className={`${styles.myIntro}`}>A Passionate 
                    <span className={styles.blured}>
                        <motion.span variants={translateSimple} 
                        initial="initial"
                        animate="enter" 
                        exit="exit"  
                        className={`${styles.gradientText}`}> Programmer</motion.span>
                    </span>
                    </motion.p>
                </div>
            </div>
            <motion.div className={styles.bioText}
                 variants={fading} 
                 initial="initial"
                 animate="enter" 
                 exit="exit" 
                >
                <p className="w-[590px]  tracking-wider">
                    “when you don't create things, you become defined by your tastes rather than ability. your tastes only narrow & exclude people. so create"
                    </p>
                {/* <p>I'm interested in building iOS and Web apps, coding videogames, and training machine learning models</p> */}
            </motion.div>
        </motion.div>
     </div>
        <div className={styles.heroBackground}></div>
        <Player/>
        <Blobs type="v3"/>
        <Blobs type="v2"/>
        <Blobs type="v1"/>
        <Particles className={styles.particlesBG}/>
    </div>
    
  );
}

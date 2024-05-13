"use client"
import React, { useEffect, useState }  from "react";
import Particles from "@/animations/Particles/particles";
import styles from './hero.module.scss'
import Player from "../SpotifyMiniPlayer/player";
import Image from "next/image";
import { getCurrentTime } from "@/hooks/getCurrentTime";
import { WeatherData, getWeatherData } from "@/hooks/getWeatherData";
import Logo from "../Logo/logo";

    
export default function HeroBg() {

    const [scrollProgress, setScrollProgress] = useState(0);
    const [Weather , setWeather] = useState<WeatherData | null>(null)
    

    useEffect(() => {
        const getWeatherInfo = async () =>{
           const res = await getWeatherData('Uttarakhand');
           setWeather(res)
        }

        const updateScrollProgress = () => {
            requestAnimationFrame(() => {
                const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrolled = window.scrollY;
                const progress = (scrolled / scrollableHeight) * 100;
                setScrollProgress(progress);
            });
        };

        window.addEventListener('scroll', updateScrollProgress);

        getWeatherInfo()

        return () => window.removeEventListener('scroll', updateScrollProgress);
    }, []);

    

  return (
    <div className={styles.container}>
            <div style={{ opacity: `${1 - scrollProgress * 11.2}`}}   className={styles.locationAndTime}>
                <p>Uttarakhand, India { getCurrentTime()} | 🌤️ {Weather ? `${Weather.main.temp}℃` : 'fetching'}</p>
            </div>
            <div className={styles.introTextContainer}>
                <div className={styles.innerTextContainer}>
                    <p>I'm Manu</p>
                    <p>A Passionate </p>
                    <p style={{color: "#0FC06B", fontWeight: "700"}}>Programmer</p>

                </div>
            </div>   

            <div className={styles.heroBackground}/>
            <Player/>

            
            <div 
            style={{ transform: `translateY(${-scrollProgress * 8}px) 
                     translateX(${scrollProgress * 18}px)
                     scale(${1 + (scrollProgress * 0.07)}) rotate(${scrollProgress * 9}deg)`,
          
                }}
            className={`${styles.svgIcon1} ${styles.svgIcon}`}>
                <Image 
                fill alt="Hello" src={"/icons/codebrackts.svg"}/>
            </div>

            {/* <div 
            style={{ transform: `translateY(${-scrollProgress * 8}px) 
                     translateX(${scrollProgress * 18}px)
                     scale(${1 + (scrollProgress * 0.07)}) rotate(${scrollProgress * 9}deg)`,
          
                }}
            className={`${styles.svgIcon9} ${styles.svgIcon}`}>
                <Image 
                fill alt="Hello" src={"/icons/codebrackts.svg"}/>
            </div> */}

            <div
            style={{ transform: `scale(${1 + (scrollProgress * 0.07)}) rotate(${-scrollProgress * 2}deg)`,
          
                   }} 
            className={`${styles.svgIcon2} ${styles.svgIcon}`}>
                <Image 
                fill alt="Hello" src={"/icons/laptop.svg"}/>
            </div>

            <div 
             style={{ transform: `translateY(${-scrollProgress * 8}px) 
      
                    scale(${1 + (scrollProgress * 0.07)}) rotate(${scrollProgress * 4}deg)`,
          
                     }}
            className={`${styles.svgIcon3} ${styles.svgIcon}`}>
                <Image fill alt="Hello" src={"/icons/code-sign.svg"}/>
            </div>

            <div style={{ transform: `translateY(${scrollProgress * 30}px) rotate(${-scrollProgress * 5}deg)` }} className={`${styles.svgIcon4} ${styles.svgIcon}`}>
                <Image fill alt="Hello" src={"/icons/plant.svg"}/>
            </div>

            <div 
            style={{ transform: `translateY(${-scrollProgress * 8}px) 
                     translateX(${-scrollProgress * 8}px)
                     scale(${1 + (scrollProgress * 0.07)}) rotate(${-scrollProgress * 2}deg)`,
   
            }}
            className={`${styles.svgIcon7} ${styles.svgIcon}`}>
                <Image  fill alt="Hello" src={"/icons/coffee.svg"}/>
            </div>
            <Logo/>
            <Particles className={styles.particlesBG}/>

    </div>
    
  );
}

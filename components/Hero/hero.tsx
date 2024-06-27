"use client"
import React, { useEffect, useRef, useState }  from "react";
import Particles from "@/animations/Particles/particles";
import styles from './hero.module.scss'
import Player from "../SpotifyMiniPlayer/player";
import Image from "next/image";
import { WeatherData, getWeatherData } from "@/hooks/getWeatherData";
import Logo from "../UI/Logo/logo";
import {useInView } from "framer-motion";
import  {useDispatch, useSelector} from 'react-redux'
import {setNavbarState } from "@/redux/reducer/NavbarStateReducer";
import { getNavState } from "@/redux/reducer/NavbarStateSelector";
    
export default function HeroBg() {

    const target = useRef<HTMLDivElement>(null)
    
    const [scrollProgress, setScrollProgress] = useState(0);
    const [Weather , setWeather] = useState<WeatherData | null>(null)
    
    const isInView = useInView(target);

    const dispatch = useDispatch()
    const navState = useSelector(getNavState)

    useEffect(() =>{
        // if its true then set the nav state to be Home (hero)
            if (isInView){
                dispatch(setNavbarState("Home"))
            }
    }, [isInView])

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
        // remove the event listener 
        return () => window.removeEventListener('scroll', updateScrollProgress);
    }, []);

    

  return (
    <div id='Hero' ref={target} className={styles.container}>
            <div className={styles.introTextContainer}>
                <div className={styles.innerTextContainer}>
                    <p>I'm Manu</p>
                    <p>Welcome To</p>
                    <p style={{color: "#0FC06B", fontWeight: "700"}}>My Portfolio</p>
                </div>
            </div>   

            <div className={styles.heroBackground}/>
            <div 
            style={{ transform: `translateY(${-scrollProgress * 8}px) 
                     translateX(${scrollProgress * 18}px)
                     scale(${1 + (scrollProgress * 0.07)}) rotate(${scrollProgress * 9}deg)`,
          
                }}
            className={`${styles.svgIcon1} ${styles.svgIcon}`}>
                <Image 
                fill alt="Hello" src={"/icons/codebrackts.svg"}/>
            </div>

            <div 
             style={{ transform: `translateY(${-scrollProgress * 8}px) 
      
                    scale(${1 + (scrollProgress * 0.07)}) rotate(${scrollProgress * 4}deg)`,
          
                     }}
            className={`${styles.svgIcon3} ${styles.svgIcon}`}>
                <Image fill alt="Hello" src={"/icons/code-sign.svg"}/>
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
            <Player/>
    </div>
    
  );
}

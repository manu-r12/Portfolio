import React, { useRef } from 'react';
import { MotionValue, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import styles from './about.module.scss';
import Blobs from '../Blob/blob';
import Image from 'next/image';
import { useInView } from 'framer-motion';


const About = () => {

    const target = useRef<HTMLDivElement | null>(null)    
    const { scrollYProgress } = useScroll();

    const isInView = useInView(target, { once : true });

    const x = useTransform(scrollYProgress, [0, 1], [-510, 600]);
    const y = useTransform(scrollYProgress, [0, 1], [130, -190]);

    const getNegativeX  = () => {
        return useTransform(x, value => -value);
        
    }

    const twiceYValue = () =>{
        return useTransform(y, value => value * 2.5);
    }


    return (
        <div ref={target} className={styles.container}>
            <div className={styles.innerContainer}>

                <div className={styles.boldTitle}>
                    <motion.h1 style={{x}} >
                        A little bit
                    </motion.h1>
                    <h1 className={styles.middleTitle}>
                        About
                    </h1>
                    <motion.h1 style={{x: getNegativeX()}}>
                        Myself
                    </motion.h1>
                </div>
                
                <div className={styles.aboutMeContainer}>
                    <div className={styles.innerAboutMeContainer}>

                        <div className={styles.aboutMeText}>
                            <div className={styles.textContainer}>
                                <p>My name is <span className='text-[3rem] font-medium'>Manu Rajbhar</span>, but you can call me MR :) I am a <span className='text-[3rem] font-medium'>Software Developer</span> interested in building iOS and web apps, coding video games, and training machine learning models.</p>
                                {/* <p>I love modern Swift and my major programming languages are Swift and Typescript I have a lot of experience in SwifUI, UIKit, React.js, and Next.js, and I have been coding for a long time.</p> */}
                            </div>
                        </div>

                        <div  className={styles.imageContainer}>
                            <motion.div style={{y: twiceYValue()}} className={styles.imageBorder}>
                                <div className="h-[450px] w-[310px] relative object-fill">
                                    <Image src={"/imgs/myPicture.jpg"} fill style={{objectFit: "cover"}} alt='manu'/>
                                </div>
                            </motion.div>
                        </div>    

                    </div>

                    <div className={styles.outerAboutMeConatiner}>
                        
                        <div className={styles.textBoxContainer}>
                            {/* <div className={styles.innerTextBoxContainer}>
                                 <p>I have previous experience as a software developer intern at MoodMe. 
                                     There, I assisted in developing features for an emotion analysis application using React 
                                     and collaborated with team members to design and implement user interfaces.</p>
                                <p>Above all, I am highly passionate, 
                                    or you can say "so in love," with creating games (in Unreal Engine). 
                                    Building games out of my imagination has always been a dream.</p>
                            </div> */}

                            <div className={styles.innerTextBoxContainer}>
                                
                                <p>⭐️ In my free time , here are the things that i love doing -&gt; let hobbies: [String] = [ " learning to Cook 🥘 " , " Gardening 🧑🏼‍🌾 " , " Knittin 🧶 " ]</p>
                                <p>I'm also into snapping cool shots ✨, especially of nature 🌱. Whenever I spot something that catches my eye, I whip out my phone, fire up the camera 📸, and capture the moment.</p> 
                                <p className='underline cursor-pointer'>If you're curious, check out my shots in the gallery section. They're pretty cool.</p> 
                            </div>      

                        </div>

                    </div>
                </div>
            </div>
        <div 
        style={{
            transform: isInView ? "none" : "translateX(-200px)",
            opacity: isInView ? 1 : 0,
            transformOrigin: 0,
            transition: "all 1.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
          }}
        className={`${styles.svgIcon}`}>
            <Image fill alt="Hello" src={"/icons/smile.svg"}/>
        </div>
    
        </div>
    );
};

export default About;

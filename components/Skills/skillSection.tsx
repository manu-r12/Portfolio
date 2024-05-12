import React, { useRef } from 'react'
import styles from './skills.module.scss'
import { useInView } from 'react-intersection-observer';
import {motion} from 'framer-motion'
import { text_reveal_animation_1, text_reveal_animation_2 } from '@/animations/TextReveal/text-reveal.cofig';
import Image from 'next/image';
import Blobs from '../Blob/blob';
import { bg_image_reveal } from '@/animations/TextReveal/bg-image-reveal';

const Skills = () => {


    const skillsDetails = [
        {
        icon: "cpp.svg",
        name: "C++"
        },
        {
        icon: "swift.svg",
        name: "Swift"
        },
        {
        icon: "ts.svg",
        name: "Typscript"
        },
        {
        icon: "js.svg",
        name: "Javascript"
        },
        {
        icon: "py.svg",
        name: "Python"
        },
        {
        icon: "java.svg",
        name: "Java"
        },
    ]

    const ToolsDetails = [
        {
        icon: "xcode.svg",
        name: "XCode"
        },
        {
        icon: "vscode.svg",
        name: "VS Code"
        },
        {
            icon: "pycharm.svg",
            name: "Pycharm"
             },
             {
             icon: "figma.svg",
             name: "Figma"
             },
             {
        icon: "unreal.svg",
        name: "Unreal Engine (Game Development)"
        },
       
    ]

    const FrameworksDetails = [
        {
        icon: "swift.svg",
        name: "Swfit UI"
        },
        {
        icon: "react.svg",
        name: "React"
        },
        {
        icon: "nextjs.svg",
        name: "Next js"
        },
        
        {
        icon: "django.svg",
        name: "django"
        },
        {
        icon: "nodejs.svg",
        name: "Node js"
        },
        {
        icon: "tensorflow.svg",
        name: "Tensorflow"
        },
       
    ]

  const body = useRef<HTMLDivElement>(null);
  const { ref, inView, entry } = useInView({
    threshold: 0.75,
    triggerOnce: true
  });

  return (
    <div ref={ref} className={styles.container}>

        <div className={styles.lineMask}>
            <motion.p 
            variants={text_reveal_animation_1} 
            initial="initial" 
            animate={inView ? "enter" : ""}>
                Skills
            </motion.p>
        </div>

    <div className='w-full flex items-center justify-center mt-10 overflow-hidden'>

        <motion.div 
        variants={text_reveal_animation_2} 
        initial="initial" animate={inView ? "enter" : ""} 
        className={styles.skillsContainer}>

            <motion.div 
            variants={text_reveal_animation_2} 
            initial="initial" animate={inView ? "enter" : ""}
            className={styles.skillCard}>

                    <div className={styles.cardHeading}>
                        <div className={styles.dot1}/>
                        <p>Languages</p>
                    </div>
                    <div className={styles.langContainer}>
                        {skillsDetails.map((skill, i) =>{
                            return <div key={i} className={styles.langBox}>
                            <div className="h-5 w-5 relative object-fill">
                                <Image alt={skill.name} src={`/icons/${skill.icon}`} fill/>
                            </div>
                            <p>{skill.name}</p>
                        </div>
                        })}

                    </div>
                </motion.div>

                <motion.div 
                variants={text_reveal_animation_1} 
                initial="initial" animate={inView ? "enter" : ""}
                className={styles.skillCard}>

                    <div className={styles.cardHeading}>
                        <div className={styles.dot2}/>
                        <p>Frameworks and Libraries</p>
                    </div>
                    <div className={styles.langContainer}>
                        {FrameworksDetails.map((tool, i) =>{
                            return <div key={i} className={styles.langBox}>
                            <div className="h-5 w-5 relative object-fill">
                                <Image alt={tool.name} src={`/icons/${tool.icon}`} fill/>
                            </div>
                            <p>{tool.name}</p>
                        </div>
                        })}

                    </div>

                </motion.div>

                <motion.div 
                variants={text_reveal_animation_1} 
                initial="initial" animate={inView ? "enter" : ""}
                className={styles.skillCard}>

                    <div className={styles.cardHeading}>
                        <div className={styles.dot3}/>
                        <p>Development Tools and Softwares</p>
                    </div>
                    <div className={styles.langContainer}>
                        {ToolsDetails.map((tool, i) =>{
                            return <div key={i} className={styles.langBox}>
                            <div className="h-5 w-5 relative object-fill">
                                <Image alt={tool.name} src={`/icons/${tool.icon}`} fill/>
                            </div>
                            <p>{tool.name}</p>
                        </div>
                        })}

                    </div>

                </motion.div>

        </motion.div>
        </div>
       
        
    </div>
  )
}

export default Skills
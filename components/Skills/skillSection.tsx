import React, { useRef } from 'react'
import styles from './skills.module.scss'
import { useInView } from 'react-intersection-observer';
import {motion} from 'framer-motion'
import { text_reveal_animation_1, text_reveal_animation_2 } from '@/animations/TextReveal/text-reveal.cofig';
import Image from 'next/image';
import { FrameworksDetails, ToolsDetails, skillsDetails } from '@/database/skillsData';

const Skills = () => {
   

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

    <div className='w-full justify-center flex items-center  mt-20 '>

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
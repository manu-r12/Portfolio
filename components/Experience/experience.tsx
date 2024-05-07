"use client"
import React, { useRef } from 'react'
import styles from './experience.module.scss'
import { useInView } from 'react-intersection-observer';
import {motion} from 'framer-motion'
import Blobs from '../Blob/blob';

const Experience = () => {

  const body = useRef<HTMLDivElement>(null);
  const { ref, inView, entry } = useInView({
    threshold: 0.75,
    triggerOnce: true
  });
  const animation1 = {
    initial: {y: "100%"},
    enter: {y: "0", transition: {duration: 0.75, ease: [0.33, 1, 0.68, 1],  delay: .15 }}

  }

  const animation2 = {
    initial: {y: "100%"},
    enter: {y: "0", transition: {duration: 0.75, ease: [0.33, 1, 0.68, 1],  delay: .25 }}

  }


  return (
    <div ref={ref} className={styles.container}>
        <div className={styles.lineMask}>
            <motion.p variants={animation1} initial="initial" animate={inView ? "enter" : ""}>Experience</motion.p>
        </div>
        <div className='w-full flex items-center justify-center pl-20 pr-20 mt-10 overflow-hidden'>
          <motion.div variants={animation2} initial="initial" animate={inView ? "enter" : ""} 
          className={`${styles.workExpInfoContainer}`}>
              <div className={styles.orgNameAndYear}>
                <div>
                   <h1 className={styles.orgName}>Mood-Me</h1>
                   <p className={styles.role}>Software Developer Internship</p>

                </div>
                <div>
                  <p className={styles.workingPeriod}>Nov 2023 - Feb 2024</p>
                  <p className={styles.workingPeriod}>Remote ( Austin, TX , USA )</p>
                </div>
              </div>
             <div className={styles.description}>
               <p>Developed features for an emotion analysis application using React and collaborated with team members to design and implement user interfaces.</p>
               <p className={styles.Skills}><span className='underline'>Experience Gained</span> : React, Redux, Machine Learning, AWS</p>
             </div>
          </motion.div>
        </div>
    </div>
  )
}

export default Experience
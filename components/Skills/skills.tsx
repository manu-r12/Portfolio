import React, { useRef } from 'react'
import styles from './skills.module.scss'
import {motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer'
import { text_reveal_animation_1 } from '@/animations/TextReveal/text-reveal.cofig';
import SVG_Circle from '@/animations/SVG-Circle';

const Skills = () => {
  const body = useRef<HTMLDivElement>(null);
  const { ref, inView, entry } = useInView({
    threshold: 0.75,
    triggerOnce: true
  });


  return (
    <div ref={ref} className={styles.container}>
        <div className={styles.lineMask}>
            <motion.p variants={text_reveal_animation_1} initial="initial" animate={inView ? "enter" : ""}>Skills</motion.p>
        </div>
        <div className={styles.svgCircle}>
            <SVG_Circle/>
            <div className={styles.innerCircleText}>
                 <h1 >Always Learning,</h1>
                 <h1>Always Coding :) </h1>
            </div>
        </div>
    </div>
  )
}

export default Skills
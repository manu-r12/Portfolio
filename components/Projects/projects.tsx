import { text_reveal_animation_1 } from '@/animations/TextReveal/text-reveal.cofig'
import { useInView } from 'react-intersection-observer';
import styles from './projects.module.scss'
import {motion} from 'framer-motion'
import Image from 'next/image';
import Link from 'next/link';
import { LuGithub } from "react-icons/lu";
import { projects } from '@/database/projectsData';


const Projects = () => {

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
                    Projects
                </motion.p>
        </div>
        <div className={styles.innerContainer}>
            <div className={styles.projectsContainer}>
                {projects.map((p, i) => {
                    return  (
                <motion.div 
                variants={text_reveal_animation_1} 
                initial="initial" animate={inView ? "enter" : ""}
                 key={i} className={styles.projectsCard}>
                    <div className={styles.imageDiv}>
                        <Image src={p.img} style={{scale: "1.3"}} objectFit="cover" layout="fill" alt='recipe-book'/>
                        <Link className={styles.link} href={""}>See On Github <LuGithub/> </Link>
                    </div>
                    <div className={styles.discDiv}>
                        <p>{p.name}</p>
                        <p className={styles.discription}>{p.discripiton}</p>
                        <div className={styles.techUsed}>
                            {p.techStack.map((t, i) =>{
                                return <p key={i}>{t}</p>
                            })}
                        </div>
                    </div>
             </motion.div>
             )})}
               
            </div>
        </div>

    </div>
  )
}

export default Projects
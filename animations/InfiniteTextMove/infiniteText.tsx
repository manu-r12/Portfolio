"use client"
import { useRef, useEffect } from 'react'
import styles from './infinite.module.scss'
import gsap from 'gsap'


const InfiniteText = () => {
  
  const firstText = useRef<HTMLParagraphElement>(null); 
  const secondText = useRef<HTMLParagraphElement>(null); 

  let xPercent = 0;
  let direction = -1;


  useEffect(() =>{
    requestAnimationFrame(animation)
  }, [])


  const animation = () =>{

    if(xPercent <= -100){
        xPercent = 0;
    }

    gsap.set(firstText.current, {xPercent: xPercent})
    gsap.set(secondText.current, {xPercent: xPercent})

    xPercent += 0.05 * direction

    requestAnimationFrame(animation)
  }

    
  return (
    <div className={styles.sliderContainer}>
     <div className={styles.slider}>
        <p ref={firstText} >- Creative Developer - Love Making Games -</p>
        <p ref={secondText}>Creative Developer - Love Making Games -</p>
     </div>
    </div>
  )
}

export default InfiniteText
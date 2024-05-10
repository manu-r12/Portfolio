import React from 'react'
import styles from './grid.module.scss'
import Particles from '@/animations/Particles/particles'

const Grid = () => {
  return (
    <div className={styles.container}>
        <div className={styles.gridContainer}>
            <div className={styles.grid}></div>
            <div className={styles.grid}></div>
            <div className={styles.grid}></div>
            <div className={styles.grid}></div>
            <div className={styles.grid}></div>
            {/* <div className={styles.grid}></div> */}
            {/* <Particles className={styles.particlesBG}/> */}

        </div>
    </div>
  )
}

export default Grid
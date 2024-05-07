import React from 'react'
import styles from './grid.module.scss'

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

        </div>
    </div>
  )
}

export default Grid
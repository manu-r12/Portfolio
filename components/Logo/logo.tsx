import React from 'react'
import styles from './logo.module.scss'


const Logo = () => {
    
  const text = "Manu R - Nice to meet you today :) -"

  return (
    <div className={styles.circle}>
        <div className={styles.logo}></div>
            <div className={styles.text}>
                  <p>
                    {Array.from(text).map((char, i) => (
                        <span key={i} style={{ transform: `rotate(${i * 10.3}deg)` }}>{char}</span>
                    ))}
                </p>
            </div>
    </div>
  )
}

export default Logo
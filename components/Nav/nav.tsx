import React from 'react'
import styles from './nav.module.scss'

const Nav = () => {
  return (
    <div className={styles.container}>
        <p>Home</p>
        <p>About</p>
        <p>Work</p>
        <p>Contact</p>
    </div>
  )
}

export default Nav
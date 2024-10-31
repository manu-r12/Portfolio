import React from 'react'
import styles from './navbar.module.scss'
import { AiOutlinePlus } from "react-icons/ai";


const Navbar = () => {
  return (
    <div className={styles.container}>
        {/* Logo */}
        <div className={styles.innerContainer}>
            <div className={styles.logoBox}>
                <h1>Manu R</h1>
            </div>

        {/* Menu Icon */}
        <div className={styles.menuIcon}>
            <p><AiOutlinePlus /></p>
        </div>

        </div>
    </div>
  )
}

export default Navbar
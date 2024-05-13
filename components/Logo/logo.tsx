import React from 'react'
import styles from './logo.module.scss'
import Image from 'next/image'


const Logo = () => {
    


  return (
    <div className={styles.logo}>
        <div className='relative h-[150px] w-[150px] object-fill overflow-hidden flex items-start'>
          <Image src={"/icons/smile-logo.svg"} fill alt='logo'/>
        </div>
      

    </div>
  )
}

export default Logo
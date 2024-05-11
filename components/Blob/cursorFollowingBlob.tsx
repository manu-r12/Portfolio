import React, { useEffect, useRef } from 'react'
import styles from './blob.module.css'

const CursorFollowingBlob = () => {

 const blobRef = useRef<HTMLDivElement>(null);


 useEffect(() => {
    const blobDiv = blobRef.current;
    if (blobDiv) {

      document.body.onpointermove = event => {
        const {clientX, clientY} = event
        blobDiv.style.left = `${clientX}px`;
        blobDiv.style.top = `${clientY}px`;

      }
    }
  }, []);

  return (
    <div className={styles.container}>
        <div ref={blobRef} className={styles.blobContainer}></div>
        <div></div>
    </div>
  )
}

export default CursorFollowingBlob
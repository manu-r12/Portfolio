import React, { useEffect, useRef } from 'react'
import styles from './blob.module.css'
import { useScroll } from 'framer-motion';

const CursorFollowingBlob = () => {

  const blobRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const blobDiv = blobRef.current;
    const moveBlob = (event: PointerEvent) => {
      const { clientX, clientY } = event;
      if (blobDiv) {
        blobDiv.style.left = `${clientX}px`;
        blobDiv.style.top = `${clientY}px`;
      }
    };

    if (blobDiv) {
      document.body.addEventListener('pointermove', moveBlob);

      return () => {
        document.body.removeEventListener('pointermove', moveBlob);
      };
    }
  }, [blobRef]);

  return (
    <div className={styles.container}>
        <div ref={blobRef} className={styles.blobContainer}></div>
        {/* <div className={styles.blur}></div> */}
    </div>
  )
}

export default CursorFollowingBlob
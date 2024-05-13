// import "./styles.css";
import { motion, useScroll } from "framer-motion";
import styles from './progressBar.module.scss'

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <div  className={styles.progressBarContainer}>
      <p>Top</p>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className={styles.progressBar}
      />
      <p>Bottom</p>
    </div>
  );
}

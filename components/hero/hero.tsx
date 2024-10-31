"use client"
import styles from './hero.module.scss';
const Hero = () => {

  return (
    <section className={styles.container}>
        <div className={`${styles.hero} ${styles.heroDark}`}>
        </div>

        <div className={styles.middleContainer}>
          <div className={styles.intro}>
              <h1 className={styles.title}>
                Hi, My Name is Manu Rajbhar, I am a <span>Software Developer</span>
              </h1>

              <h2 className={styles.subTitle}>
              i'm a computer science student who loves building fun applications. I have a passion for robotics and hope to explore it more in the future. 
              I enjoy creating augmented reality applications as well. 
              </h2>

              {/* Scroll Down Indicator */}

              <p className={styles.scrollDownText}>
                Scroll Down
              </p>
          </div>
        </div>
        
    </section>
  );
};

export default Hero;

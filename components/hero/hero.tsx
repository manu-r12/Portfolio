"use client"
import styles from './hero.module.scss';

const Hero = () => {

  return (
    <div className={styles.container}>
      <section className={styles.wrapper}>
        <div className={`${styles.hero} ${styles.heroDark}`}>
        </div>
        <div className={styles.content}>
          <div className={styles.title} data-text="An awesome title">
            <h1>Hello! I am Manu Rajbhar </h1>
          </div>
          <div className={styles.caption}>
            <h2>A software developer with a passion for turning code into creativity</h2>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
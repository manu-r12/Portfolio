import React, { useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap-trial/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './about.module.scss';
import { useGSAP } from '@gsap/react';
import Blobs from '../Blob/blob';

gsap.registerPlugin(SplitText)

const About = () => {
    const boldTitle = useRef<HTMLHeadingElement>(null);
    const boldTitleLeft = useRef<HTMLSpanElement>(null);
    const boldTitleRight = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger, SplitText);

        const splitTextLeft = new SplitText(boldTitleLeft.current, {
            type: 'chars',
        });
        const splitTextRight = new SplitText(boldTitleRight.current, {
            type: 'chars',
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: boldTitle.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                toggleActions: 'play none none reverse',
            },
        });

        // BoldText
        tl.fromTo(
            boldTitleLeft.current,
            {
                xPercent: -50,
            },
            {
                xPercent: -10,
            },
            0
        );
        tl.fromTo(
            boldTitleRight.current,
            {
                xPercent: 50,
            },
            {
                xPercent: 10,
            },
            0
        );
    });

    return (
        <div className={styles.container}>
            <h2 className={styles.boldTitle} ref={boldTitle}>
                <span className={styles.boldTitleLeft} ref={boldTitleLeft}>
                    A Little Bit
                </span>
                <span>About</span>
                <span className={styles.boldTitleRight} ref={boldTitleRight}>
                    Manu
                </span>
            </h2>
        </div>
    );
};

export default About;

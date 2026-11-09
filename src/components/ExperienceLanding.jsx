import { useState, useEffect } from 'react';
import styles from './ExperienceLanding.module.scss';

const words = ['solving problems', 'distributed systems', 'agentic building', 'programming', 'coffee'];

const motifs = [
    { symbol: '{ }',       top: '8%',  left: '7%',  fontSize: '1.4rem',  duration: '8s',  delay: '0s'   },
    { symbol: '</>',       top: '15%', left: '88%', fontSize: '1.1rem',  duration: '10s', delay: '1.5s' },
    { symbol: 'const',     top: '25%', left: '3%',  fontSize: '0.9rem',  duration: '12s', delay: '0.5s' },
    { symbol: '=>',        top: '35%', left: '92%', fontSize: '1.3rem',  duration: '9s',  delay: '3s'   },
    { symbol: 'git commit',top: '45%', left: '12%', fontSize: '0.8rem',  duration: '11s', delay: '2s'   },
    { symbol: 'fn()',      top: '55%', left: '80%', fontSize: '1rem',    duration: '7s',  delay: '1s'   },
    { symbol: '[ ]',       top: '65%', left: '5%',  fontSize: '1.2rem',  duration: '13s', delay: '4s'   },
    { symbol: '&&',        top: '75%', left: '90%', fontSize: '1.1rem',  duration: '10s', delay: '0.8s' },
    { symbol: 'import',    top: '20%', left: '50%', fontSize: '0.8rem',  duration: '14s', delay: '2.5s' },
    { symbol: 'async',     top: '70%', left: '45%', fontSize: '0.9rem',  duration: '9s',  delay: '1.2s' },
    { symbol: '0x1F',      top: '40%', left: '65%', fontSize: '0.85rem', duration: '11s', delay: '3.5s' },
    { symbol: 'npm i',     top: '85%', left: '20%', fontSize: '1rem',    duration: '8s',  delay: '0.3s' },
    { symbol: '||',        top: '90%', left: '72%', fontSize: '1.3rem',  duration: '12s', delay: '2.8s' },
    { symbol: 'while',     top: '12%', left: '35%', fontSize: '0.9rem',  duration: '15s', delay: '1.8s' },
    { symbol: 'class',     top: '60%', left: '28%', fontSize: '0.85rem', duration: '10s', delay: '4.2s' },
    { symbol: ':=',        top: '80%', left: '55%', fontSize: '1.1rem',  duration: '8s',  delay: '0.7s' },
    { symbol: 'docker run',top: '30%', left: '75%', fontSize: '0.8rem',  duration: '13s', delay: '5s'   },
    { symbol: '#!/bin/sh', top: '5%',  left: '60%', fontSize: '0.75rem', duration: '16s', delay: '1s'   },
];

function ExperienceLanding() {
    const [displayText, setDisplayText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];
        let timeout;

        if (!isDeleting && displayText === currentWord) {
            timeout = setTimeout(() => setIsDeleting(true), 1500);
        } else if (isDeleting && displayText === '') {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
        } else {
            timeout = setTimeout(() => {
                setDisplayText(
                    isDeleting
                        ? currentWord.slice(0, displayText.length - 1)
                        : currentWord.slice(0, displayText.length + 1)
                );
            }, isDeleting ? 55 : 95);
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, wordIndex]);

    return (
        <section className={styles.landing}>
            {motifs.map((motif, i) => (
                <span
                    key={i}
                    className={styles.motif}
                    style={{
                        top: motif.top,
                        left: motif.left,
                        fontSize: motif.fontSize,
                        animationDuration: motif.duration,
                        animationDelay: motif.delay,
                    }}
                >
                    {motif.symbol}
                </span>
            ))}

            <div className={styles.content}>
                <p className={styles.headline}>
                    Hi! I'm Elaine, I love
                </p>
                <p className={styles.typewriterLine}>
                    <span className={styles.typewriter}>{displayText}</span>
                    <span className={styles.cursor}>|</span>
                </p>
            </div>

            <div className={styles.scrollHint}>scroll ↓</div>
        </section>
    );
}

export default ExperienceLanding;

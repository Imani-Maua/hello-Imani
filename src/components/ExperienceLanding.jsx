import { useState, useEffect } from 'react';
import styles from './ExperienceLanding.module.scss';

const words = ['solving problems', 'distributed systems', 'agentic building', 'software engineering', 'programming', 'coffee'];

const lines = [
    { top: '7%',  width: '150px', duration: '14s', delay: '0s',    type: 'LTR'  },
    { top: '14%', width: '90px',  duration: '9s',  delay: '4.5s',  type: 'RTL'  },
    { top: '22%', width: '200px', duration: '18s', delay: '1s',    type: 'Diag' },
    { top: '31%', width: '120px', duration: '11s', delay: '7s',    type: 'RTL'  },
    { top: '39%', width: '170px', duration: '15s', delay: '2s',    type: 'LTR'  },
    { top: '47%', width: '80px',  duration: '8s',  delay: '5.5s',  type: 'RTL'  },
    { top: '54%', width: '230px', duration: '20s', delay: '0.5s',  type: 'Diag' },
    { top: '63%', width: '110px', duration: '12s', delay: '3s',    type: 'LTR'  },
    { top: '71%', width: '140px', duration: '16s', delay: '8s',    type: 'RTL'  },
    { top: '79%', width: '95px',  duration: '10s', delay: '6s',    type: 'LTR'  },
    { top: '86%', width: '180px', duration: '13s', delay: '9s',    type: 'Diag' },
    { top: '93%', width: '130px', duration: '17s', delay: '2.5s',  type: 'RTL'  },
    { top: '0',   left: '5%',   height: '120px', duration: '12s', delay: '0s',   type: 'TTB' },
    { top: '0',   left: '15%',  height: '80px',  duration: '8s',  delay: '3s',   type: 'BTT' },
    { top: '0',   left: '28%',  height: '160px', duration: '16s', delay: '1.5s', type: 'TTB' },
    { top: '0',   left: '42%',  height: '100px', duration: '10s', delay: '6s',   type: 'BTT' },
    { top: '0',   left: '58%',  height: '140px', duration: '14s', delay: '0.5s', type: 'TTB' },
    { top: '0',   left: '72%',  height: '90px',  duration: '9s',  delay: '4s',   type: 'BTT' },
    { top: '0',   left: '85%',  height: '170px', duration: '17s', delay: '2s',   type: 'TTB' },
    { top: '0',   left: '95%',  height: '110px', duration: '11s', delay: '7s',   type: 'BTT' },
];

const motifs = [
    { symbol: '{ }',        top: '8%',  left: '7%',  fontSize: '1.4rem',  duration: '8s',  delay: '0s'   },
    { symbol: '</>',        top: '15%', left: '88%', fontSize: '1.1rem',  duration: '10s', delay: '1.5s' },
    { symbol: 'const',      top: '25%', left: '3%',  fontSize: '0.9rem',  duration: '12s', delay: '0.5s' },
    { symbol: '=>',         top: '35%', left: '92%', fontSize: '1.3rem',  duration: '9s',  delay: '3s'   },
    { symbol: 'git commit', top: '45%', left: '12%', fontSize: '0.8rem',  duration: '11s', delay: '2s'   },
    { symbol: 'fn()',       top: '55%', left: '80%', fontSize: '1rem',    duration: '7s',  delay: '1s'   },
    { symbol: '[ ]',        top: '65%', left: '5%',  fontSize: '1.2rem',  duration: '13s', delay: '4s'   },
    { symbol: '&&',         top: '75%', left: '90%', fontSize: '1.1rem',  duration: '10s', delay: '0.8s' },
    { symbol: 'import',     top: '20%', left: '50%', fontSize: '0.8rem',  duration: '14s', delay: '2.5s' },
    { symbol: 'async',      top: '70%', left: '45%', fontSize: '0.9rem',  duration: '9s',  delay: '1.2s' },
    { symbol: '0x1F',       top: '40%', left: '65%', fontSize: '0.85rem', duration: '11s', delay: '3.5s' },
    { symbol: 'npm i',      top: '85%', left: '20%', fontSize: '1rem',    duration: '8s',  delay: '0.3s' },
    { symbol: '||',         top: '90%', left: '72%', fontSize: '1.3rem',  duration: '12s', delay: '2.8s' },
    { symbol: 'while',      top: '12%', left: '35%', fontSize: '0.9rem',  duration: '15s', delay: '1.8s' },
    { symbol: 'class',      top: '60%', left: '28%', fontSize: '0.85rem', duration: '10s', delay: '4.2s' },
    { symbol: ':=',         top: '80%', left: '55%', fontSize: '1.1rem',  duration: '8s',  delay: '0.7s' },
    { symbol: 'docker run', top: '30%', left: '75%', fontSize: '0.8rem',  duration: '13s', delay: '5s'   },
    { symbol: '#!/bin/sh',  top: '5%',  left: '60%', fontSize: '0.75rem', duration: '16s', delay: '1s'   },
    { symbol: 'return',     top: '18%', left: '18%', fontSize: '0.9rem',  duration: '10s', delay: '3.2s' },
    { symbol: 'O(log n)',   top: '50%', left: '58%', fontSize: '0.85rem', duration: '12s', delay: '1.6s' },
    { symbol: 'SELECT *',   top: '33%', left: '42%', fontSize: '0.8rem',  duration: '14s', delay: '0.9s' },
    { symbol: 'try { }',    top: '78%', left: '35%', fontSize: '0.85rem', duration: '9s',  delay: '4.5s' },
    { symbol: 'gRPC',       top: '22%', left: '78%', fontSize: '1rem',    duration: '11s', delay: '2.1s' },
    { symbol: 'go build',   top: '88%', left: '50%', fontSize: '0.8rem',  duration: '13s', delay: '0.4s' },
    { symbol: '200 OK',     top: '48%', left: '32%', fontSize: '0.9rem',  duration: '8s',  delay: '5.5s' },
    { symbol: 'mutex',      top: '62%', left: '68%', fontSize: '0.85rem', duration: '10s', delay: '1.9s' },
    { symbol: 'POST /',     top: '10%', left: '82%', fontSize: '0.8rem',  duration: '12s', delay: '3.8s' },
    { symbol: 'interface',  top: '38%', left: '20%', fontSize: '0.8rem',  duration: '15s', delay: '2.3s' },
    { symbol: 'O(1)',       top: '72%', left: '8%',  fontSize: '1.1rem',  duration: '9s',  delay: '0.6s' },
    { symbol: 'cargo run',  top: '95%', left: '38%', fontSize: '0.75rem', duration: '11s', delay: '4.8s' },
    { symbol: '!=',         top: '28%', left: '58%', fontSize: '1.2rem',  duration: '7s',  delay: '1.4s' },
    { symbol: 'malloc()',   top: '58%', left: '48%', fontSize: '0.8rem',  duration: '13s', delay: '3.1s' },
    { symbol: 'kubectl',    top: '82%', left: '82%', fontSize: '0.8rem',  duration: '10s', delay: '0.2s' },
    { symbol: 'stderr',     top: '3%',  left: '25%', fontSize: '0.85rem', duration: '14s', delay: '5.2s' },
    { symbol: '::',         top: '52%', left: '18%', fontSize: '1.3rem',  duration: '8s',  delay: '2.7s' },
    { symbol: 'JWT',        top: '42%', left: '85%', fontSize: '0.9rem',  duration: '11s', delay: '1.1s' },
    { symbol: 'chan <-',    top: '68%', left: '58%', fontSize: '0.85rem', duration: '9s',  delay: '4.0s' },
    { symbol: 'reduce()',   top: '17%', left: '65%', fontSize: '0.8rem',  duration: '12s', delay: '3.6s' },
];

function ExperienceLanding() {
    const [wordIndex, setWordIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const pause = setTimeout(() => {
            setVisible(false);
            const swap = setTimeout(() => {
                setWordIndex((prev) => (prev + 1) % words.length);
                setVisible(true);
            }, 450);
            return () => clearTimeout(swap);
        }, 2800);

        return () => clearTimeout(pause);
    }, [wordIndex]);

    return (
        <section className={styles.landing}>
            {lines.map((line, i) => (
                <div
                    key={`line-${i}`}
                    className={`${styles.line} ${styles[`line${line.type}`]}`}
                    style={{
                        top: line.top,
                        left: line.left,
                        width: line.width || '1px',
                        height: line.height || '1px',
                        animationDuration: line.duration,
                        animationDelay: line.delay,
                    }}
                />
            ))}

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
                <p className={styles.greeting}>Hello, My name is</p>
                <h1 className={styles.name}>Maua Elaine Imani</h1>
                <p className={styles.enjoy}>
                    I enjoy{' '}
                    <span className={`${styles.word} ${visible ? styles.wordVisible : styles.wordHidden}`}>
                        {words[wordIndex]}
                    </span>
                </p>
            </div>

            <div className={styles.scrollHint}>scroll ↓</div>
        </section>
    );
}

export default ExperienceLanding;

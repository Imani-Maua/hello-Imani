import styles from './EducationSection.module.scss';

function EducationSection() {
    return (
        <section className={styles.section}>
            <p className={styles.label}>Where I Learned the Fundamentals</p>
            <div className={styles.wrapper}>
                <div className={styles.eduInfo}>
                    <h2 className={styles.university}>University of Debrecen</h2>
                    <p className={styles.degree}>BSc Computer Science</p>
                    <p className={styles.date}>
                        <span>🎓</span>
                        <span>February 2027</span>
                    </p>
                </div>
                <div className={styles.divider} />
                <div className={styles.coursework}>
                    <p className={styles.courseworkLabel}>Coursework</p>
                    <p className={styles.courseworkProse}>
                        Data Structures and Algorithms, Software Engineering, Introduction to Artificial Intelligence, Operating Systems (Linux), Object-Oriented Programming (Java), Foundations of Cybersecurity, Probability.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default EducationSection;

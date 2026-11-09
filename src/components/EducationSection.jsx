import styles from './EducationSection.module.scss';

function EducationSection() {
    return (
        <section className={styles.section}>
            <p className={styles.label}>Where I Learned the Fundamentals</p>
            <h2 className={styles.university}>University of Debrecen</h2>
            <p className={styles.degree}>BSc Computer Science</p>
            <p className={styles.date}>
                <span>🎓</span>
                <span>February 2027</span>
            </p>
        </section>
    );
}

export default EducationSection;

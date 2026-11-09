import profileImg from '../assets/profile4.jpg';
import styles from './AboutSection.module.scss';

function AboutSection() {
    return (
        <section className={styles.section}>
            <div className={styles.card}>
                <div className={styles.imageSide}>
                    <div className={styles.imageWrapper}>
                        <img src={profileImg} alt="Maua Elaine Imani" className={styles.image} />
                    </div>
                </div>
                <div className={styles.textSide}>
                    <p className={styles.aboutLabel}>About Me</p>
                    <h2 className={styles.aboutHeadline}>I love solving problems</h2>
                    <p className={styles.aboutProse}>
                        It's a fairly convenient arrangement: I get something to obsess over for the next couple of weeks or months, and someone else gets a better day because of it.
                    </p>
                    <p className={styles.aboutProse}>
                        I love building things that simplify complicated processes, remove unnecessary friction, and make people's lives easier. Tech is fun, especially when you see the difference you've made.
                    </p>
                    <p className={styles.aboutProse}>
                        Occasionally, I close my laptop and become a person. Occasionally.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;

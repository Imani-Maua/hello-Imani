import profileImg from '../assets/profile4.jpg';
import styles from './AboutSection.module.scss';

function AboutSection() {
    return (
        <section className={styles.section}>
            <div className={styles.card}>
                <div className={styles.textSide}>
                </div>
                <div className={styles.imageSide}>
                    <div className={styles.imageWrapper}>
                        <img src={profileImg} alt="Maua Elaine Imani" className={styles.image} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;

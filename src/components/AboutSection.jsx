import profileImg from '../assets/profile4.jpg';
import styles from './AboutSection.module.scss';

function AboutSection() {
    return (
        <>
            <div className={styles.divider}>
                <div className={styles.dividerLineLeft} />
                <div className={styles.dividerLineRight} />
            </div>
            <section className={styles.section}>
                <div className={styles.imageWrapper}>
                    <img src={profileImg} alt="Maua Elaine Imani" className={styles.image} />
                </div>
            </section>
        </>
    );
}

export default AboutSection;

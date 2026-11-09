import styles from './CarouselCard.module.scss';

function CarouselCard({ image, alternate, customName, desc, topic }) {
    return (
        <div className={styles.CarouselCard}>
            <div className={styles.CarouselSection}>
                <span>
                    <img
                        src={image}
                        alt={alternate}
                        className={styles.carouselPhoto}
                    />
                </span>
                <div className={styles.CarouselItems}>
                    <div className={styles.CarouselTitle}>Current Favorite...</div>
                    <div className={styles.CarouselContent}>
                        <p className={styles.CarouselTopic}>{topic}</p>
                        <p className={styles.CarouselName}>{customName}</p>
                        <p className={styles.CarouselDesc}>{desc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CarouselCard;
import { useState } from 'react';
import styles from './ExperienceCard.module.scss';

function ExperienceCard({ title, company, startDate, endDate, description}) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className={`${styles.experienceCard} ${isExpanded ? styles.expanded : ''}`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.company}>{company}</p>
                </div>
                <div className={styles.dateSection}>
                    <p className={styles.dates}>{startDate} - {endDate}</p>
                </div>
            </div>

            {isExpanded && (
                <div className={`${styles.details} ${styles.desktopOnly}`}>
                    <div className={styles.description}>
                        {Array.isArray(description) ? (
                            <ul>
                                {description.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>{description}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ExperienceCard;

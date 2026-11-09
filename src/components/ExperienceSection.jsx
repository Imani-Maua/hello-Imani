import ExperienceCard from './ExperienceCard';
import styles from './ExperienceSection.module.scss';

function ExperienceSection({
    experiences = [],
    title = "Things I've done:",
    hideTitle = false
}) {
    return (
        <section className={styles.experienceSection}>
            {!hideTitle && <h2 className={styles.sectionTitle}>{title}</h2>}
            <div className={styles.cardsContainer}>
                {experiences.length > 0 ? (
                    experiences.map((experience, index) => (
                        <ExperienceCard
                            key={index}
                            title={experience.title}
                            company={experience.company}
                            startDate={experience.startDate}
                            endDate={experience.endDate}
                            description={experience.description}
                        />
                    ))
                ) : (
                    <p className={styles.placeholder}>No experiences to show yet.</p>
                )}
            </div>
        </section>
    );
}

export default ExperienceSection;

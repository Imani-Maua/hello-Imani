import ExperienceCard from './ExperienceCard';
import styles from './ExperienceSection.module.scss';
import { workExperiences, extracurriculars } from '../data/experiences';

function ExperienceSection({
    experiences = [...workExperiences, ...extracurriculars],
    title = "Things I've done:",
    hideTitle = false
}) {
    return (
        <section className={styles.experienceSection}>
            {!hideTitle && <h2 className={styles.sectionTitle}>{title}</h2>}
            <div className={styles.cardsContainer}>
                {experiences.map((experience, index) => (
                    <ExperienceCard
                        key={index}
                        title={experience.title}
                        company={experience.company}
                        startDate={experience.startDate}
                        endDate={experience.endDate}
                        description={experience.description}
                    />
                ))}
            </div>
        </section>
    );
}

export default ExperienceSection;

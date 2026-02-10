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
                {experiences.map((exp, index) => (
                    <ExperienceCard
                        key={index}
                        title={exp.title}
                        company={exp.company}
                        type={exp.type}
                        location={exp.location}
                        startDate={exp.startDate}
                        endDate={exp.endDate}
                        duration={exp.duration}
                        description={exp.description}
                        skills={exp.skills}
                    />
                ))}
            </div>
        </section>
    );
}

export default ExperienceSection;

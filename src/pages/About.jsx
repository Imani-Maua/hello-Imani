import SidePanel from "../components/SidePanel";
import Hero from '../components/Hero';
import Favorites from '../components/Favorites';
import ExperienceSection from '../components/ExperienceSection';
import ProjectSection from '../components/ProjectSection';
import styles from './About.module.scss';

function About() {
    return (
        <div className={styles.aboutContainer}>
            <SidePanel />
            <main className={styles.mainContent}>
                <div className={styles.topSection}>
                    <div className={styles.heroWrapper}>
                        <Hero />
                    </div>
                    <div className={styles.experienceWrapper}>
                        <ExperienceSection />
                    </div>
                </div>
                <div className={styles.favoritesWrapper}>
                    <Favorites />
                </div>
                <div className={styles.projectsWrapper}>
                    <ProjectSection />
                </div>
            </main>
        </div>
    );
}

export default About;
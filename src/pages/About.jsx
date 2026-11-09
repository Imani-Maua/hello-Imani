import { useState, useEffect } from 'react';
import SidePanel from "../components/SidePanel";
import Hero from '../components/Hero';
import Favorites from '../components/Favorites';
import ExperienceSection from '../components/ExperienceSection';
import ProjectSection from '../components/ProjectSection';
import styles from './About.module.scss';

function About() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={styles.aboutContainer}>
            {!isMobile && <SidePanel />}
            <main className={styles.mainContent}>
                <div className={styles.topSection}>
                    <div className={styles.heroWrapper}>
                        <Hero />
                    </div>

                    {isMobile && (
                        <div className={styles.mobileSidePanel}>
                            <SidePanel />
                        </div>
                    )}

                    {!isMobile && (
                        <div className={styles.experienceWrapper}>
                            <ExperienceSection />
                        </div>
                    )}
                </div>

                {isMobile && (
                    <div className={styles.experienceWrapper}>
                        <ExperienceSection />
                    </div>
                )}

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
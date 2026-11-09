import ProjectSection from '../components/ProjectSection';
import styles from './Page.module.scss';

function Projects() {
  return (
    <div className={styles.pageContainer}>
      <header className={`${styles.pageHeader} ${styles.centeredHeader}`}>
        <h1>My Projects</h1>
      </header>

      <ProjectSection layout="grid" hideTitle={true} />

      <section className={styles.engagementSection}>
        <h2>Have a project in mind?</h2>
        <p>I'm always open to discussing new opportunities, collaborations, or just geeky tech stuff! Let's build something amazing together. ✨</p>
        <a href="mailto:elainemaua644@gmail.com" className={styles.contactLink}>Let's Chat! 🌸</a>
      </section>
    </div>
  );
}

export default Projects;
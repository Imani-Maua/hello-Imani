import ExperienceSection from '../components/ExperienceSection';
import { workExperiences } from '../data/experiences';
import styles from './Page.module.scss';

function Experience() {
  return (
    <div className={styles.pageContainer}>
      <header className={`${styles.pageHeader} ${styles.centeredHeader}`}>
        <h1>Work Experience</h1>
      </header>

      <ExperienceSection
        experiences={workExperiences}
        hideTitle={true}
      />
    </div>
  );
}

export default Experience;
import ExperienceSection from '../components/ExperienceSection';
import styles from './Page.module.scss';

function Experience() {
  return (
    <div className={styles.pageContainer}>
      <header className={`${styles.pageHeader} ${styles.centeredHeader}`}>
        <h1>Work Experience</h1>
      </header>

      <ExperienceSection hideTitle={true} />
    </div>
  );
}

export default Experience;
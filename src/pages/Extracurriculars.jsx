import ExperienceSection from '../components/ExperienceSection';
import styles from './Page.module.scss';

function Extracurriculars() {
  return (
    <div className={styles.pageContainer}>
      <header className={`${styles.pageHeader} ${styles.centeredHeader}`}>
        <h1>Community & Impact</h1>
      </header>

      <ExperienceSection hideTitle={true} />
    </div>
  );
}

export default Extracurriculars;
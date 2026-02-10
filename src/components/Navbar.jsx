import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.brandName}>
                maua.imani
            </div>

            <div className={styles.navigators}>
                <Link to='/experience' className={styles.navigators}>Experience</Link>
                <Link to='/projects' className={styles.navigators}>Projects</Link>
                <Link to='/extracurriculars' className={styles.navigators}>Extracurriculars</Link>
            </div>

            <div className={styles.contactCard}>
                <button>
                    Contact Me
                </button>
            </div>

        </nav>
    )
}

export default Navbar;
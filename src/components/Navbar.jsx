import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.brandName}>
                maua.imani
            </Link>

            <div className={styles.navigators}>
                <NavLink to='/experience' className={({ isActive }) => isActive ? styles.activeNavLink : styles.navLink}>Experience</NavLink>
                <NavLink to='/projects' className={({ isActive }) => isActive ? styles.activeNavLink : styles.navLink}>Projects</NavLink>
                <NavLink to='/extracurriculars' className={({ isActive }) => isActive ? styles.activeNavLink : styles.navLink}>Extracurriculars</NavLink>
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
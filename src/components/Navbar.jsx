import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.brandName} onClick={closeMenu}>
                maua.imani
            </Link>

            <div className={styles.navigators}>
                <NavLink to='/experience' className={({ isActive }) => isActive ? styles.activeNavLink : styles.navLink}>Experience</NavLink>
                <NavLink to='/projects' className={({ isActive }) => isActive ? styles.activeNavLink : styles.navLink}>Projects</NavLink>
                <NavLink to='/extracurriculars' className={({ isActive }) => isActive ? styles.activeNavLink : styles.navLink}>Extracurriculars</NavLink>
            </div>

            <div className={styles.contactCard}>
                <a href="mailto:elainemaua644@gmail.com?subject=We are looking for a software engineer&body=Hello Maua, ">
                    <button>Contact Me</button>
                </a>
            </div>

            <div className={styles.mobileMenuIcon} onClick={toggleMenu}>
                🌸
            </div>

            {isMenuOpen && (
                <div className={styles.mobileOverlay}>
                    <div className={styles.overlayContent}>
                        <div className={styles.closeIcon} onClick={toggleMenu}>✕</div>
                        <div className={styles.mobileLinks}>
                            <NavLink to='/experience' onClick={closeMenu} className={styles.navLink}>Experience</NavLink>
                            <NavLink to='/projects' onClick={closeMenu} className={styles.navLink}>Projects</NavLink>
                            <NavLink to='/extracurriculars' onClick={closeMenu} className={styles.navLink}>Extracurriculars</NavLink>
                            <a href="mailto:elainemaua644@gmail.com" className={styles.mobileContactLink} onClick={closeMenu}>
                                Contact Me
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
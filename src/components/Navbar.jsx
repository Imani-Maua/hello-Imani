import { useState } from 'react';
import { Link } from 'react-router-dom';
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
                <a href="/#about" className={styles.navLink}>About Me</a>
                <a href="/#work" className={styles.navLink}>Experience</a>
                <a href="/#projects" className={styles.navLink}>Projects</a>
                <a href="mailto:mauaelaineimani@gmail.com" className={styles.navLink}>Contact Me</a>
            </div>

            <div className={styles.mobileMenuIcon} onClick={toggleMenu}>
                🌸
            </div>

            {isMenuOpen && (
                <div className={styles.mobileOverlay}>
                    <div className={styles.overlayContent}>
                        <div className={styles.closeIcon} onClick={toggleMenu}>✕</div>
                        <div className={styles.mobileLinks}>
                            <a href="/#about" className={styles.navLink} onClick={closeMenu}>About Me</a>
                            <a href="/#work" className={styles.navLink} onClick={closeMenu}>Experience</a>
                            <a href="/#projects" className={styles.navLink} onClick={closeMenu}>Projects</a>
                            <a href="mailto:mauaelaineimani@gmail.com" className={styles.navLink} onClick={closeMenu}>Contact Me</a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;

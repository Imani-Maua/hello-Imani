import styles from './Footer.module.scss';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.copyright}>
                    © {currentYear} <strong>maua.imani</strong> | Find me on <a href="https://www.linkedin.com/in/elaine-i-maua-666207226/" target="_blank" rel="noopener noreferrer">LinkedIn</a> or <a href="https://github.com/Imani-Maua" target="_blank" rel="noopener noreferrer">GitHub</a>.
                </div>
            </div>
        </footer>
    );
}

export default Footer;

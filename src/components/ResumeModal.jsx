import styles from './ResumeModal.module.scss';

function ResumeModal({ isOpen, onClose, resumeLink }) {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>Resume Access</h2>
                    <button className={styles.closeButton} onClick={onClose}>&times;</button>
                </div>
                <div className={styles.modalBody}>
                    <p>My resume is available upon request. Click below and you’ll be prompted to request access via Google Drive.</p>
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
                    <a
                        href={resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.requestButton}
                        onClick={onClose}
                    >
                        Request Access
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ResumeModal;

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './PreviewBar.module.scss';

function PreviewBar() {
    const { isAuthed } = useAuth();
    const navigate = useNavigate();

    if (!isAuthed) return null;

    return (
        <div className={styles.bar}>
            <span className={styles.label}>Previewing as visitor</span>
            <button className={styles.btn} onClick={() => navigate('/admin')}>Edit</button>
        </div>
    );
}

export default PreviewBar;

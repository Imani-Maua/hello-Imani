import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDraft } from '../context/DraftContext';
import { authedRequest } from '../services/api';
import styles from './PreviewBar.module.scss';

function PreviewBar() {
    const { isAuthed } = useAuth();
    const { hasDraft, push } = useDraft();
    const navigate = useNavigate();
    const [pushing, setPushing] = useState(false);

    if (!isAuthed) return null;

    async function handlePush() {
        setPushing(true);
        try {
            await push(authedRequest);
            window.location.reload();
        } catch (e) {
            console.error(e);
            alert('Push failed. Please try again.');
        } finally {
            setPushing(false);
        }
    }

    return (
        <div className={styles.bar}>
            <span className={styles.label}>Previewing as visitor</span>
            {hasDraft && (
                <button className={styles.pushBtn} onClick={handlePush} disabled={pushing}>
                    {pushing ? 'Pushing…' : 'Push Changes'}
                </button>
            )}
            <button className={styles.btn} onClick={() => navigate('/admin')}>Edit</button>
        </div>
    );
}

export default PreviewBar;

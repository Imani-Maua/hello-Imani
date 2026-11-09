import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.scss';

function Login() {
    const [searchParams] = useSearchParams();
    const key = searchParams.get('key');
    const navigate = useNavigate();
    const { login, isAuthed } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!key) { navigate('/'); return null; }
    if (isAuthed) { navigate('/admin'); return null; }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password, key);
            navigate('/admin');
        } catch {
            setError('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.page}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Welcome back</h1>
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.field}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>
                <button type="submit" className={styles.submit} disabled={loading}>
                    {loading ? 'Logging in…' : 'Log in'}
                </button>
            </form>
        </div>
    );
}

export default Login;

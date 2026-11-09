import { createContext, useContext, useState } from 'react';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('harvest_token'));
    const [candidateId, setCandidateId] = useState(() => {
        const id = localStorage.getItem('harvest_candidate_id');
        return id ? parseInt(id) : null;
    });

    async function login(email, password, key) {
        const url = `${BASE}/auth/login${key ? `?key=${encodeURIComponent(key)}` : ''}`;
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) throw new Error('Invalid credentials');
        const data = await res.json();
        localStorage.setItem('harvest_token', data.access_token);
        setToken(data.access_token);

        const meRes = await fetch(`${BASE}/auth/me`, {
            headers: { Authorization: `Bearer ${data.access_token}` },
        });
        if (meRes.ok) {
            const me = await meRes.json();
            localStorage.setItem('harvest_candidate_id', me.id);
            setCandidateId(me.id);
        }
        return data;
    }

    function logout() {
        localStorage.removeItem('harvest_token');
        localStorage.removeItem('harvest_candidate_id');
        setToken(null);
        setCandidateId(null);
    }

    return (
        <AuthContext.Provider value={{ token, candidateId, isAuthed: !!token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

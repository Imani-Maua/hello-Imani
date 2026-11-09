const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const getToken = () => localStorage.getItem('harvest_token');

export async function publicGet(path) {
    const res = await fetch(`${BASE}${path}`);
    if (!res.ok) throw new Error(res.status);
    return res.json();
}

export async function authedRequest(method, path, body) {
    const res = await fetch(`${BASE}${path}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
        ...(body !== undefined && { body: JSON.stringify(body) }),
    });
    if (!res.ok) throw new Error(res.status);
    if (res.status === 204) return null;
    return res.json();
}

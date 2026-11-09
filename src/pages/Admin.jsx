import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authedRequest } from '../services/api';
import styles from './Admin.module.scss';

const toArr = str => str.split(',').map(s => s.trim()).filter(Boolean);
const fromArr = arr => (arr || []).join(', ');
const n = val => (val === '' || val === undefined) ? null : val;

const BLANK_EXP = { company: '', title: '', location: '', work_type: '', employment_type: '', start_date: '', end_date: '', is_current: false, description: '', achievements: '', technologies: '' };
const BLANK_PROJ = { name: '', description: '', url: '', repo_url: '', start_date: '', end_date: '', technologies: '', highlights: '' };
const BLANK_SKILL = { name: '', category: 'other', proficiency: '', years_experience: '' };
const BLANK_LINK = { link_type: 'github', label: '', url: '' };

function Admin() {
    const { isAuthed, candidateId, logout } = useAuth();
    const navigate = useNavigate();
    const [tab, setTab] = useState('profile');

    const [profile, setProfile] = useState(null);
    const [profileForm, setProfileForm] = useState({ firstname: '', lastname: '', email: '', phone: '', location: '', headline: '', summary: '' });

    const [experiences, setExperiences] = useState([]);
    const [expForm, setExpForm] = useState(BLANK_EXP);
    const [editingExp, setEditingExp] = useState(null);

    const [projects, setProjects] = useState([]);
    const [projForm, setProjForm] = useState(BLANK_PROJ);
    const [editingProj, setEditingProj] = useState(null);

    const [skills, setSkills] = useState([]);
    const [skillForm, setSkillForm] = useState(BLANK_SKILL);

    const [links, setLinks] = useState([]);
    const [linkForm, setLinkForm] = useState(BLANK_LINK);

    if (!isAuthed) { navigate('/'); return null; }

    useEffect(() => {
        if (!candidateId) return;
        if (tab === 'profile') loadProfile();
        if (tab === 'experiences') loadExperiences();
        if (tab === 'projects') loadProjects();
        if (tab === 'skills') loadSkills();
        if (tab === 'links') loadLinks();
    }, [tab, candidateId]);

    // --- Profile ---
    async function loadProfile() {
        try {
            const data = await authedRequest('GET', `/candidates/${candidateId}`);
            setProfile(data);
            setProfileForm({ firstname: data.firstname || '', lastname: data.lastname || '', email: data.email || '', phone: data.phone || '', location: data.location || '', headline: data.headline || '', summary: data.summary || '' });
        } catch (e) { console.error(e); }
    }
    async function saveProfile(e) {
        e.preventDefault();
        try {
            const body = { ...profileForm, phone: n(profileForm.phone), location: n(profileForm.location), headline: n(profileForm.headline), summary: n(profileForm.summary) };
            await authedRequest('PATCH', `/candidates/${candidateId}`, body);
            alert('Profile saved!');
        } catch (e) { console.error(e); }
    }

    // --- Work Experiences ---
    async function loadExperiences() {
        try { setExperiences(await authedRequest('GET', `/candidates/${candidateId}/work-experiences`)); }
        catch (e) { console.error(e); }
    }
    async function saveExperience(e) {
        e.preventDefault();
        const body = { company: expForm.company, title: expForm.title, location: n(expForm.location), work_type: n(expForm.work_type), employment_type: n(expForm.employment_type), start_date: n(expForm.start_date), end_date: expForm.is_current ? null : n(expForm.end_date), is_current: expForm.is_current, description: n(expForm.description), achievements: toArr(expForm.achievements), technologies: toArr(expForm.technologies) };
        try {
            if (editingExp) await authedRequest('PATCH', `/candidates/${candidateId}/work-experiences/${editingExp}`, body);
            else await authedRequest('POST', `/candidates/${candidateId}/work-experiences`, body);
            setExpForm(BLANK_EXP); setEditingExp(null); loadExperiences();
        } catch (e) { console.error(e); }
    }
    function startEditExp(exp) {
        setEditingExp(exp.id);
        setExpForm({ company: exp.company || '', title: exp.title || '', location: exp.location || '', work_type: exp.work_type || '', employment_type: exp.employment_type || '', start_date: exp.start_date || '', end_date: exp.end_date || '', is_current: exp.is_current || false, description: exp.description || '', achievements: fromArr(exp.achievements), technologies: fromArr(exp.technologies) });
    }
    async function deleteExperience(id) {
        if (!confirm('Delete this experience?')) return;
        try { await authedRequest('DELETE', `/candidates/${candidateId}/work-experiences/${id}`); loadExperiences(); }
        catch (e) { console.error(e); }
    }

    // --- Projects ---
    async function loadProjects() {
        try { setProjects(await authedRequest('GET', `/candidates/${candidateId}/projects`)); }
        catch (e) { console.error(e); }
    }
    async function saveProject(e) {
        e.preventDefault();
        const body = { name: projForm.name, description: n(projForm.description), url: n(projForm.url), repo_url: n(projForm.repo_url), start_date: n(projForm.start_date), end_date: n(projForm.end_date), technologies: toArr(projForm.technologies), highlights: toArr(projForm.highlights) };
        try {
            if (editingProj) await authedRequest('PATCH', `/candidates/${candidateId}/projects/${editingProj}`, body);
            else await authedRequest('POST', `/candidates/${candidateId}/projects`, body);
            setProjForm(BLANK_PROJ); setEditingProj(null); loadProjects();
        } catch (e) { console.error(e); }
    }
    function startEditProj(proj) {
        setEditingProj(proj.id);
        setProjForm({ name: proj.name || '', description: proj.description || '', url: proj.url || '', repo_url: proj.repo_url || '', start_date: proj.start_date || '', end_date: proj.end_date || '', technologies: fromArr(proj.technologies), highlights: fromArr(proj.highlights) });
    }
    async function deleteProject(id) {
        if (!confirm('Delete this project?')) return;
        try { await authedRequest('DELETE', `/candidates/${candidateId}/projects/${id}`); loadProjects(); }
        catch (e) { console.error(e); }
    }

    // --- Skills ---
    async function loadSkills() {
        try { setSkills(await authedRequest('GET', `/candidates/${candidateId}/skills`)); }
        catch (e) { console.error(e); }
    }
    async function saveSkill(e) {
        e.preventDefault();
        const body = { name: skillForm.name, category: skillForm.category, proficiency: n(skillForm.proficiency), years_experience: skillForm.years_experience ? parseInt(skillForm.years_experience) : null };
        try { await authedRequest('POST', `/candidates/${candidateId}/skills`, body); setSkillForm(BLANK_SKILL); loadSkills(); }
        catch (e) { console.error(e); }
    }
    async function deleteSkill(id) {
        if (!confirm('Delete this skill?')) return;
        try { await authedRequest('DELETE', `/candidates/${candidateId}/skills/${id}`); loadSkills(); }
        catch (e) { console.error(e); }
    }

    // --- Links ---
    async function loadLinks() {
        try { setLinks(await authedRequest('GET', `/candidates/${candidateId}/links`)); }
        catch (e) { console.error(e); }
    }
    async function saveLink(e) {
        e.preventDefault();
        try { await authedRequest('POST', `/candidates/${candidateId}/links`, linkForm); setLinkForm(BLANK_LINK); loadLinks(); }
        catch (e) { console.error(e); }
    }
    async function deleteLink(id) {
        if (!confirm('Delete this link?')) return;
        try { await authedRequest('DELETE', `/candidates/${candidateId}/links/${id}`); loadLinks(); }
        catch (e) { console.error(e); }
    }

    const tabs = ['profile', 'experiences', 'projects', 'skills', 'links'];

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1 className={styles.heading}>Dashboard</h1>
                <button className={styles.logout} onClick={() => { logout(); navigate('/'); }}>Log out</button>
            </header>

            <nav className={styles.tabs}>
                {tabs.map(t => (
                    <button key={t} className={`${styles.tab} ${tab === t ? styles.activeTab : ''}`} onClick={() => setTab(t)}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                ))}
            </nav>

            <div className={styles.content}>

                {/* PROFILE */}
                {tab === 'profile' && (
                    <form className={styles.form} onSubmit={saveProfile}>
                        <p className={styles.formTitle}>Profile</p>
                        <div className={styles.row}>
                            <div className={styles.field}><label>First name</label><input value={profileForm.firstname} onChange={e => setProfileForm(f => ({ ...f, firstname: e.target.value }))} /></div>
                            <div className={styles.field}><label>Last name</label><input value={profileForm.lastname} onChange={e => setProfileForm(f => ({ ...f, lastname: e.target.value }))} /></div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.field}><label>Email</label><input type="email" value={profileForm.email} onChange={e => setProfileForm(f => ({ ...f, email: e.target.value }))} /></div>
                            <div className={styles.field}><label>Phone</label><input value={profileForm.phone} onChange={e => setProfileForm(f => ({ ...f, phone: e.target.value }))} /></div>
                        </div>
                        <div className={styles.field}><label>Location</label><input value={profileForm.location} onChange={e => setProfileForm(f => ({ ...f, location: e.target.value }))} /></div>
                        <div className={styles.field}><label>Headline</label><input value={profileForm.headline} onChange={e => setProfileForm(f => ({ ...f, headline: e.target.value }))} /></div>
                        <div className={styles.field}><label>Summary</label><textarea value={profileForm.summary} onChange={e => setProfileForm(f => ({ ...f, summary: e.target.value }))} /></div>
                        <div className={styles.formActions}><button type="submit" className={styles.btnPrimary}>Save profile</button></div>
                    </form>
                )}

                {/* EXPERIENCES */}
                {tab === 'experiences' && (
                    <>
                        <form className={styles.form} onSubmit={saveExperience}>
                            <p className={styles.formTitle}>{editingExp ? 'Edit experience' : 'Add experience'}</p>
                            <div className={styles.row}>
                                <div className={styles.field}><label>Company *</label><input required value={expForm.company} onChange={e => setExpForm(f => ({ ...f, company: e.target.value }))} /></div>
                                <div className={styles.field}><label>Title *</label><input required value={expForm.title} onChange={e => setExpForm(f => ({ ...f, title: e.target.value }))} /></div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label>Work arrangement</label>
                                    <select value={expForm.work_type} onChange={e => setExpForm(f => ({ ...f, work_type: e.target.value }))}>
                                        <option value=''>— select —</option>
                                        <option value='Hybrid'>Hybrid</option>
                                        <option value='InPerson'>In Person</option>
                                        <option value='Remote'>Remote</option>
                                    </select>
                                </div>
                                <div className={styles.field}>
                                    <label>Employment type</label>
                                    <select value={expForm.employment_type} onChange={e => setExpForm(f => ({ ...f, employment_type: e.target.value }))}>
                                        <option value=''>— select —</option>
                                        <option value='FullTime'>Full Time</option>
                                        <option value='PartTime'>Part Time</option>
                                        <option value='Internship'>Internship</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.field}><label>Location</label><input value={expForm.location} onChange={e => setExpForm(f => ({ ...f, location: e.target.value }))} /></div>
                                <div className={styles.field}><label>Start date</label><input type="date" value={expForm.start_date} onChange={e => setExpForm(f => ({ ...f, start_date: e.target.value }))} /></div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.field}><label>End date</label><input type="date" value={expForm.end_date} onChange={e => setExpForm(f => ({ ...f, end_date: e.target.value }))} disabled={expForm.is_current} /></div>
                                <div className={styles.field} style={{ justifyContent: 'flex-end' }}>
                                    <label className={styles.checkField}><input type="checkbox" checked={expForm.is_current} onChange={e => setExpForm(f => ({ ...f, is_current: e.target.checked, end_date: '' }))} /> Current role</label>
                                </div>
                            </div>
                            <div className={styles.field}><label>Description</label><textarea value={expForm.description} onChange={e => setExpForm(f => ({ ...f, description: e.target.value }))} /></div>
                            <div className={styles.field}><label>Achievements</label><textarea value={expForm.achievements} onChange={e => setExpForm(f => ({ ...f, achievements: e.target.value }))} /><span className={styles.hint}>Comma-separated</span></div>
                            <div className={styles.field}><label>Technologies</label><input value={expForm.technologies} onChange={e => setExpForm(f => ({ ...f, technologies: e.target.value }))} /><span className={styles.hint}>Comma-separated</span></div>
                            <div className={styles.formActions}>
                                <button type="submit" className={styles.btnPrimary}>{editingExp ? 'Save changes' : 'Add experience'}</button>
                                {editingExp && <button type="button" className={styles.btnSecondary} onClick={() => { setExpForm(BLANK_EXP); setEditingExp(null); }}>Cancel</button>}
                            </div>
                        </form>
                        <h2 className={styles.sectionTitle}>All experiences</h2>
                        <div className={styles.list}>
                            {experiences.length === 0 && <p className={styles.empty}>No experiences yet.</p>}
                            {experiences.map(exp => (
                                <div key={exp.id} className={styles.listItem}>
                                    <div className={styles.listItemInfo}>
                                        <strong>{exp.title} @ {exp.company}</strong>
                                        <span>{exp.location} · {exp.start_date} – {exp.is_current ? 'Present' : exp.end_date}</span>
                                    </div>
                                    <div className={styles.listItemActions}>
                                        <button className={styles.btnEdit} onClick={() => startEditExp(exp)}>Edit</button>
                                        <button className={styles.btnDelete} onClick={() => deleteExperience(exp.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* PROJECTS */}
                {tab === 'projects' && (
                    <>
                        <form className={styles.form} onSubmit={saveProject}>
                            <p className={styles.formTitle}>{editingProj ? 'Edit project' : 'Add project'}</p>
                            <div className={styles.field}><label>Name *</label><input required value={projForm.name} onChange={e => setProjForm(f => ({ ...f, name: e.target.value }))} /></div>
                            <div className={styles.field}><label>Description</label><textarea value={projForm.description} onChange={e => setProjForm(f => ({ ...f, description: e.target.value }))} /></div>
                            <div className={styles.row}>
                                <div className={styles.field}><label>Live URL</label><input type="url" value={projForm.url} onChange={e => setProjForm(f => ({ ...f, url: e.target.value }))} /></div>
                                <div className={styles.field}><label>Repo URL</label><input type="url" value={projForm.repo_url} onChange={e => setProjForm(f => ({ ...f, repo_url: e.target.value }))} /></div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.field}><label>Start date</label><input type="date" value={projForm.start_date} onChange={e => setProjForm(f => ({ ...f, start_date: e.target.value }))} /></div>
                                <div className={styles.field}><label>End date</label><input type="date" value={projForm.end_date} onChange={e => setProjForm(f => ({ ...f, end_date: e.target.value }))} /></div>
                            </div>
                            <div className={styles.field}><label>Technologies</label><input value={projForm.technologies} onChange={e => setProjForm(f => ({ ...f, technologies: e.target.value }))} /><span className={styles.hint}>Comma-separated</span></div>
                            <div className={styles.field}><label>Highlights</label><textarea value={projForm.highlights} onChange={e => setProjForm(f => ({ ...f, highlights: e.target.value }))} /><span className={styles.hint}>Comma-separated</span></div>
                            <div className={styles.formActions}>
                                <button type="submit" className={styles.btnPrimary}>{editingProj ? 'Save changes' : 'Add project'}</button>
                                {editingProj && <button type="button" className={styles.btnSecondary} onClick={() => { setProjForm(BLANK_PROJ); setEditingProj(null); }}>Cancel</button>}
                            </div>
                        </form>
                        <h2 className={styles.sectionTitle}>All projects</h2>
                        <div className={styles.list}>
                            {projects.length === 0 && <p className={styles.empty}>No projects yet.</p>}
                            {projects.map(proj => (
                                <div key={proj.id} className={styles.listItem}>
                                    <div className={styles.listItemInfo}>
                                        <strong>{proj.name}</strong>
                                        <span>{proj.description}</span>
                                    </div>
                                    <div className={styles.listItemActions}>
                                        <button className={styles.btnEdit} onClick={() => startEditProj(proj)}>Edit</button>
                                        <button className={styles.btnDelete} onClick={() => deleteProject(proj.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* SKILLS */}
                {tab === 'skills' && (
                    <>
                        <form className={styles.form} onSubmit={saveSkill}>
                            <p className={styles.formTitle}>Add skill</p>
                            <div className={styles.row}>
                                <div className={styles.field}><label>Name *</label><input required value={skillForm.name} onChange={e => setSkillForm(f => ({ ...f, name: e.target.value }))} /></div>
                                <div className={styles.field}><label>Category</label>
                                    <select value={skillForm.category} onChange={e => setSkillForm(f => ({ ...f, category: e.target.value }))}>
                                        {['language', 'framework', 'tool', 'platform', 'soft', 'domain', 'other'].map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.field}><label>Proficiency</label>
                                    <select value={skillForm.proficiency} onChange={e => setSkillForm(f => ({ ...f, proficiency: e.target.value }))}>
                                        <option value="">— select —</option>
                                        {['beginner', 'intermediate', 'advanced', 'expert'].map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </div>
                                <div className={styles.field}><label>Years experience</label><input type="number" min="0" value={skillForm.years_experience} onChange={e => setSkillForm(f => ({ ...f, years_experience: e.target.value }))} /></div>
                            </div>
                            <div className={styles.formActions}><button type="submit" className={styles.btnPrimary}>Add skill</button></div>
                        </form>
                        <h2 className={styles.sectionTitle}>All skills</h2>
                        <div className={styles.list}>
                            {skills.length === 0 && <p className={styles.empty}>No skills yet.</p>}
                            {skills.map(skill => (
                                <div key={skill.id} className={styles.listItem}>
                                    <div className={styles.listItemInfo}>
                                        <strong>{skill.name}</strong>
                                        <span>{skill.category}{skill.proficiency ? ` · ${skill.proficiency}` : ''}{skill.years_experience ? ` · ${skill.years_experience}y` : ''}</span>
                                    </div>
                                    <div className={styles.listItemActions}>
                                        <button className={styles.btnDelete} onClick={() => deleteSkill(skill.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* LINKS */}
                {tab === 'links' && (
                    <>
                        <form className={styles.form} onSubmit={saveLink}>
                            <p className={styles.formTitle}>Add link</p>
                            <div className={styles.row}>
                                <div className={styles.field}><label>Type</label>
                                    <select value={linkForm.link_type} onChange={e => setLinkForm(f => ({ ...f, link_type: e.target.value }))}>
                                        {['portfolio', 'github', 'linkedin', 'blog', 'publication', 'other'].map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div className={styles.field}><label>Label</label><input value={linkForm.label} onChange={e => setLinkForm(f => ({ ...f, label: e.target.value }))} placeholder="e.g. GitHub" /></div>
                            </div>
                            <div className={styles.field}><label>URL *</label><input required type="url" value={linkForm.url} onChange={e => setLinkForm(f => ({ ...f, url: e.target.value }))} /></div>
                            <div className={styles.formActions}><button type="submit" className={styles.btnPrimary}>Add link</button></div>
                        </form>
                        <h2 className={styles.sectionTitle}>All links</h2>
                        <div className={styles.list}>
                            {links.length === 0 && <p className={styles.empty}>No links yet.</p>}
                            {links.map(link => (
                                <div key={link.id} className={styles.listItem}>
                                    <div className={styles.listItemInfo}>
                                        <strong>{link.label || link.link_type}</strong>
                                        <span>{link.url}</span>
                                    </div>
                                    <div className={styles.listItemActions}>
                                        <button className={styles.btnDelete} onClick={() => deleteLink(link.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className={styles.previewPill}>
                <span className={styles.previewPillLabel}>Editing as admin</span>
                <button className={styles.previewPillBtn} onClick={() => navigate('/')}>Preview</button>
            </div>
        </div>
    );
}

export default Admin;

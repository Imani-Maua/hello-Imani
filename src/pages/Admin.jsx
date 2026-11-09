import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDraft } from '../context/DraftContext';
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
    const { state: draft, seed, add, updateItem, removeItem, stageObj, push, hasDraft } = useDraft();
    const [pushing, setPushing] = useState(false);
    const [activeForm, setActiveForm] = useState(null);

    const [profileForm, setProfileForm] = useState({ firstname: '', lastname: '', email: '', phone: '', location: '', headline: '', summary: '' });

    const [expForm, setExpForm] = useState(BLANK_EXP);
    const [editingExp, setEditingExp] = useState(null);

    const [projForm, setProjForm] = useState(BLANK_PROJ);
    const [editingProj, setEditingProj] = useState(null);

    const [skillForm, setSkillForm] = useState(BLANK_SKILL);
    const [linkForm, setLinkForm] = useState(BLANK_LINK);

    useEffect(() => {
        if (!isAuthed) navigate('/');
    }, [isAuthed]);

    useEffect(() => {
        if (!candidateId) return;
        loadProfile();
        loadExperiences();
        loadProjects();
        loadSkills();
        loadLinks();
    }, [candidateId]);

    if (!isAuthed) return null;

    // --- Profile ---
    async function loadProfile() {
        if (draft.entities.profile !== undefined) {
            const p = draft.entities.profile;
            setProfileForm({ firstname: p.firstname || '', lastname: p.lastname || '', email: p.email || '', phone: p.phone || '', location: p.location || '', headline: p.headline || '', summary: p.summary || '' });
            return;
        }
        try {
            const data = await authedRequest('GET', `/candidates/${candidateId}`);
            seed('profile', data);
            setProfileForm({ firstname: data.firstname || '', lastname: data.lastname || '', email: data.email || '', phone: data.phone || '', location: data.location || '', headline: data.headline || '', summary: data.summary || '' });
        } catch (e) { console.error(e); }
    }
    function saveProfile(e) {
        e.preventDefault();
        const body = { ...profileForm, phone: n(profileForm.phone), location: n(profileForm.location), headline: n(profileForm.headline), summary: n(profileForm.summary) };
        stageObj('profile', body, `/candidates/${candidateId}`);
    }

    // --- Work Experiences ---
    async function loadExperiences() {
        if (draft.entities.experiences !== undefined) return;
        try {
            const data = await authedRequest('GET', `/candidates/${candidateId}/work-experiences`);
            seed('experiences', data);
        } catch (e) { console.error(e); }
    }
    function saveExperience(e) {
        e.preventDefault();
        const body = { company: expForm.company, title: expForm.title, location: n(expForm.location), work_type: n(expForm.work_type), employment_type: n(expForm.employment_type), start_date: n(expForm.start_date), end_date: expForm.is_current ? null : n(expForm.end_date), is_current: expForm.is_current, description: n(expForm.description), achievements: toArr(expForm.achievements), technologies: toArr(expForm.technologies) };
        if (editingExp) {
            updateItem('experiences', editingExp, body, `/candidates/${candidateId}/work-experiences/${editingExp}`);
        } else {
            add('experiences', body, `/candidates/${candidateId}/work-experiences`);
        }
        setExpForm(BLANK_EXP); setEditingExp(null); setActiveForm(null);
    }
    function startEditExp(exp) {
        setEditingExp(exp.id);
        setActiveForm('exp');
        setExpForm({ company: exp.company || '', title: exp.title || '', location: exp.location || '', work_type: exp.work_type || '', employment_type: exp.employment_type || '', start_date: exp.start_date || '', end_date: exp.end_date || '', is_current: exp.is_current || false, description: exp.description || '', achievements: fromArr(exp.achievements), technologies: fromArr(exp.technologies) });
    }
    function cancelExp() { setExpForm(BLANK_EXP); setEditingExp(null); setActiveForm(null); }
    function deleteExperience(id) {
        if (!confirm('Delete this experience?')) return;
        removeItem('experiences', id, `/candidates/${candidateId}/work-experiences/${id}`);
    }

    // --- Projects ---
    async function loadProjects() {
        if (draft.entities.projects !== undefined) return;
        try {
            const data = await authedRequest('GET', `/candidates/${candidateId}/projects`);
            seed('projects', data);
        } catch (e) { console.error(e); }
    }
    function saveProject(e) {
        e.preventDefault();
        const body = { name: projForm.name, description: n(projForm.description), url: n(projForm.url), repo_url: n(projForm.repo_url), start_date: n(projForm.start_date), end_date: n(projForm.end_date), technologies: toArr(projForm.technologies), highlights: toArr(projForm.highlights) };
        if (editingProj) {
            updateItem('projects', editingProj, body, `/candidates/${candidateId}/projects/${editingProj}`);
        } else {
            add('projects', body, `/candidates/${candidateId}/projects`);
        }
        setProjForm(BLANK_PROJ); setEditingProj(null); setActiveForm(null);
    }
    function startEditProj(proj) {
        setEditingProj(proj.id);
        setActiveForm('proj');
        setProjForm({ name: proj.name || '', description: proj.description || '', url: proj.url || '', repo_url: proj.repo_url || '', start_date: proj.start_date || '', end_date: proj.end_date || '', technologies: fromArr(proj.technologies), highlights: fromArr(proj.highlights) });
    }
    function cancelProj() { setProjForm(BLANK_PROJ); setEditingProj(null); setActiveForm(null); }
    function deleteProject(id) {
        if (!confirm('Delete this project?')) return;
        removeItem('projects', id, `/candidates/${candidateId}/projects/${id}`);
    }

    // --- Skills ---
    async function loadSkills() {
        if (draft.entities.skills !== undefined) return;
        try {
            const data = await authedRequest('GET', `/candidates/${candidateId}/skills`);
            seed('skills', data);
        } catch (e) { console.error(e); }
    }
    function saveSkill(e) {
        e.preventDefault();
        const body = { name: skillForm.name, category: skillForm.category, proficiency: n(skillForm.proficiency), years_experience: skillForm.years_experience ? parseInt(skillForm.years_experience) : null };
        add('skills', body, `/candidates/${candidateId}/skills`);
        setSkillForm(BLANK_SKILL); setActiveForm(null);
    }
    function deleteSkill(id) {
        if (!confirm('Delete this skill?')) return;
        removeItem('skills', id, `/candidates/${candidateId}/skills/${id}`);
    }

    // --- Links ---
    async function loadLinks() {
        if (draft.entities.links !== undefined) return;
        try {
            const data = await authedRequest('GET', `/candidates/${candidateId}/links`);
            seed('links', data);
        } catch (e) { console.error(e); }
    }
    function saveLink(e) {
        e.preventDefault();
        add('links', linkForm, `/candidates/${candidateId}/links`);
        setLinkForm(BLANK_LINK); setActiveForm(null);
    }
    function deleteLink(id) {
        if (!confirm('Delete this link?')) return;
        removeItem('links', id, `/candidates/${candidateId}/links/${id}`);
    }

    // --- Push ---
    async function handlePush() {
        setPushing(true);
        try {
            await push(authedRequest);
            navigate('/');
        } catch (e) {
            console.error(e);
            alert('Push failed. Please try again.');
        } finally {
            setPushing(false);
        }
    }

    const expList = draft.entities.experiences;
    const projList = draft.entities.projects;
    const skillList = draft.entities.skills;
    const linkList = draft.entities.links;

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1 className={styles.heading}>Dashboard</h1>
                <button className={styles.logout} onClick={() => { logout(); navigate('/'); }}>Log out</button>
            </header>

            <div className={styles.layout}>

                {/* SIDEBAR */}
                <aside className={styles.sidebar}>
                    <h2 className={styles.sectionTitle}>Profile</h2>
                    <form className={styles.form} onSubmit={saveProfile}>
                        <div className={styles.field}><label>First name</label><input value={profileForm.firstname} onChange={e => setProfileForm(f => ({ ...f, firstname: e.target.value }))} /></div>
                        <div className={styles.field}><label>Last name</label><input value={profileForm.lastname} onChange={e => setProfileForm(f => ({ ...f, lastname: e.target.value }))} /></div>
                        <div className={styles.field}><label>Email</label><input type="email" value={profileForm.email} onChange={e => setProfileForm(f => ({ ...f, email: e.target.value }))} /></div>
                        <div className={styles.field}><label>Phone</label><input value={profileForm.phone} onChange={e => setProfileForm(f => ({ ...f, phone: e.target.value }))} /></div>
                        <div className={styles.field}><label>Location</label><input value={profileForm.location} onChange={e => setProfileForm(f => ({ ...f, location: e.target.value }))} /></div>
                        <div className={styles.field}><label>Headline</label><input value={profileForm.headline} onChange={e => setProfileForm(f => ({ ...f, headline: e.target.value }))} /></div>
                        <div className={styles.field}><label>Summary</label><textarea value={profileForm.summary} onChange={e => setProfileForm(f => ({ ...f, summary: e.target.value }))} /></div>
                        <div className={styles.formActions}><button type="submit" className={styles.btnPrimary}>Stage profile</button></div>
                    </form>
                </aside>

                {/* MAIN CONTENT */}
                <div className={styles.mainContent}>

                {/* EXPERIENCES */}
                <div className={styles.adminSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Experiences</h2>
                        {activeForm !== 'exp' && !editingExp && (
                            <button className={styles.btnAdd} onClick={() => setActiveForm('exp')}>+ Add Experience</button>
                        )}
                    </div>
                    {(activeForm === 'exp' || editingExp) && (
                        <form className={styles.form} onSubmit={saveExperience}>
                            <p className={styles.formTitle}>{editingExp ? 'Edit experience' : 'New experience'}</p>
                            <div className={styles.row}>
                                <div className={styles.field}><label>Company *</label><input required value={expForm.company} onChange={e => setExpForm(f => ({ ...f, company: e.target.value }))} /></div>
                                <div className={styles.field}><label>Title *</label><input required value={expForm.title} onChange={e => setExpForm(f => ({ ...f, title: e.target.value }))} /></div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label>Work arrangement</label>
                                    <select value={expForm.work_type} onChange={e => setExpForm(f => ({ ...f, work_type: e.target.value }))}>
                                        <option value=''>— select —</option>
                                        <option value='hybrid'>Hybrid</option>
                                        <option value='in_person'>In Person</option>
                                        <option value='remote'>Remote</option>
                                    </select>
                                </div>
                                <div className={styles.field}>
                                    <label>Employment type</label>
                                    <select value={expForm.employment_type} onChange={e => setExpForm(f => ({ ...f, employment_type: e.target.value }))}>
                                        <option value=''>— select —</option>
                                        <option value='full_time'>Full Time</option>
                                        <option value='part_time'>Part Time</option>
                                        <option value='internship'>Internship</option>
                                        <option value='fellowship'>Fellowship</option>
                                        <option value='research'>Research</option>
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
                                <button type="button" className={styles.btnSecondary} onClick={cancelExp}>Cancel</button>
                            </div>
                        </form>
                    )}
                    <div className={styles.list}>
                        {expList === undefined && <p className={styles.empty}>Loading…</p>}
                        {expList !== undefined && expList.length === 0 && <p className={styles.empty}>No experiences yet.</p>}
                        {(expList || []).map(exp => (
                            <div key={exp.id} className={styles.listItem}>
                                <div className={styles.listItemInfo}>
                                    <strong>{exp.title} @ {exp.company}{exp._new ? ' · unsaved' : ''}</strong>
                                    <span>{exp.location} · {exp.start_date} – {exp.is_current ? 'Present' : exp.end_date}</span>
                                </div>
                                <div className={styles.listItemActions}>
                                    <button className={styles.btnEdit} onClick={() => startEditExp(exp)}>Edit</button>
                                    <button className={styles.btnDelete} onClick={() => deleteExperience(exp.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PROJECTS */}
                <div className={styles.adminSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Projects</h2>
                        {activeForm !== 'proj' && !editingProj && (
                            <button className={styles.btnAdd} onClick={() => setActiveForm('proj')}>+ Add Project</button>
                        )}
                    </div>
                    {(activeForm === 'proj' || editingProj) && (
                        <form className={styles.form} onSubmit={saveProject}>
                            <p className={styles.formTitle}>{editingProj ? 'Edit project' : 'New project'}</p>
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
                                <button type="button" className={styles.btnSecondary} onClick={cancelProj}>Cancel</button>
                            </div>
                        </form>
                    )}
                    <div className={styles.list}>
                        {projList === undefined && <p className={styles.empty}>Loading…</p>}
                        {projList !== undefined && projList.length === 0 && <p className={styles.empty}>No projects yet.</p>}
                        {(projList || []).map(proj => (
                            <div key={proj.id} className={styles.listItem}>
                                <div className={styles.listItemInfo}>
                                    <strong>{proj.name}{proj._new ? ' · unsaved' : ''}</strong>
                                    <span>{proj.description}</span>
                                </div>
                                <div className={styles.listItemActions}>
                                    <button className={styles.btnEdit} onClick={() => startEditProj(proj)}>Edit</button>
                                    <button className={styles.btnDelete} onClick={() => deleteProject(proj.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SKILLS */}
                <div className={styles.adminSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Skills</h2>
                        {activeForm !== 'skill' && (
                            <button className={styles.btnAdd} onClick={() => setActiveForm('skill')}>+ Add Skill</button>
                        )}
                    </div>
                    {activeForm === 'skill' && (
                        <form className={styles.form} onSubmit={saveSkill}>
                            <p className={styles.formTitle}>New skill</p>
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
                            <div className={styles.formActions}>
                                <button type="submit" className={styles.btnPrimary}>Add skill</button>
                                <button type="button" className={styles.btnSecondary} onClick={() => { setSkillForm(BLANK_SKILL); setActiveForm(null); }}>Cancel</button>
                            </div>
                        </form>
                    )}
                    <div className={styles.list}>
                        {skillList === undefined && <p className={styles.empty}>Loading…</p>}
                        {skillList !== undefined && skillList.length === 0 && <p className={styles.empty}>No skills yet.</p>}
                        {(skillList || []).map(skill => (
                            <div key={skill.id} className={styles.listItem}>
                                <div className={styles.listItemInfo}>
                                    <strong>{skill.name}{skill._new ? ' · unsaved' : ''}</strong>
                                    <span>{skill.category}{skill.proficiency ? ` · ${skill.proficiency}` : ''}{skill.years_experience ? ` · ${skill.years_experience}y` : ''}</span>
                                </div>
                                <div className={styles.listItemActions}>
                                    <button className={styles.btnDelete} onClick={() => deleteSkill(skill.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* LINKS */}
                <div className={styles.adminSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Links</h2>
                        {activeForm !== 'link' && (
                            <button className={styles.btnAdd} onClick={() => setActiveForm('link')}>+ Add Link</button>
                        )}
                    </div>
                    {activeForm === 'link' && (
                        <form className={styles.form} onSubmit={saveLink}>
                            <p className={styles.formTitle}>New link</p>
                            <div className={styles.row}>
                                <div className={styles.field}><label>Type</label>
                                    <select value={linkForm.link_type} onChange={e => setLinkForm(f => ({ ...f, link_type: e.target.value }))}>
                                        {['portfolio', 'github', 'linkedin', 'blog', 'publication', 'other'].map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div className={styles.field}><label>Label</label><input value={linkForm.label} onChange={e => setLinkForm(f => ({ ...f, label: e.target.value }))} placeholder="e.g. GitHub" /></div>
                            </div>
                            <div className={styles.field}><label>URL *</label><input required type="url" value={linkForm.url} onChange={e => setLinkForm(f => ({ ...f, url: e.target.value }))} /></div>
                            <div className={styles.formActions}>
                                <button type="submit" className={styles.btnPrimary}>Add link</button>
                                <button type="button" className={styles.btnSecondary} onClick={() => { setLinkForm(BLANK_LINK); setActiveForm(null); }}>Cancel</button>
                            </div>
                        </form>
                    )}
                    <div className={styles.list}>
                        {linkList === undefined && <p className={styles.empty}>Loading…</p>}
                        {linkList !== undefined && linkList.length === 0 && <p className={styles.empty}>No links yet.</p>}
                        {(linkList || []).map(link => (
                            <div key={link.id} className={styles.listItem}>
                                <div className={styles.listItemInfo}>
                                    <strong>{link.label || link.link_type}{link._new ? ' · unsaved' : ''}</strong>
                                    <span>{link.url}</span>
                                </div>
                                <div className={styles.listItemActions}>
                                    <button className={styles.btnDelete} onClick={() => deleteLink(link.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                </div>{/* end mainContent */}
            </div>{/* end layout */}

            <div className={styles.previewPill}>
                <span className={styles.previewPillLabel}>Editing as admin</span>
                {hasDraft && (
                    <button className={styles.previewPillBtn} onClick={handlePush} disabled={pushing}>
                        {pushing ? 'Pushing…' : 'Push Changes'}
                    </button>
                )}
                <button className={styles.previewPillSecBtn} onClick={() => navigate('/')}>Preview</button>
            </div>
        </div>
    );
}

export default Admin;

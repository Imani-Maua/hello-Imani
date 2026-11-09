import { useState, useEffect } from 'react';
import styles from './ProjectsSection.module.scss';
import { publicGet } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useDraft } from '../context/DraftContext';

const CANDIDATE_ID = 1;

function ProjectsSection() {
    const { isAuthed } = useAuth();
    const { state: draft } = useDraft();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (isAuthed && draft.entities.projects !== undefined) {
            setProjects(draft.entities.projects);
        } else {
            publicGet(`/candidates/${CANDIDATE_ID}/projects`)
                .then(setProjects)
                .catch(() => {});
        }
    }, [isAuthed, draft.entities.projects]);

    if (!projects.length) return null;

    return (
        <section className={styles.section}>
            <p className={styles.label}>Problems I've Solved</p>
            <div className={styles.grid}>
                {projects.map((proj) => (
                    <div key={proj.id} className={styles.card}>
                        <p className={styles.name}>{proj.name}</p>
                        {(proj.url || proj.repo_url) && (
                            <div className={styles.links}>
                                {proj.url && (
                                    <a href={proj.url} target="_blank" rel="noopener noreferrer" className={styles.link}>live</a>
                                )}
                                {proj.repo_url && (
                                    <a href={proj.repo_url} target="_blank" rel="noopener noreferrer" className={styles.link}>repo</a>
                                )}
                            </div>
                        )}
                        {proj.technologies?.length > 0 && (
                            <p className={styles.tech}>
                                <em>{proj.technologies.join(', ')}</em>
                            </p>
                        )}
                        {proj.description && (
                            <p className={styles.description}>{proj.description}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProjectsSection;

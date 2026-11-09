import { useState, useEffect } from 'react';
import styles from './WorkSection.module.scss';
import { publicGet } from '../services/api';

const CANDIDATE_ID = 1;

const WORK_TYPE_LABEL = { hybrid: 'Hybrid', in_person: 'In Person', remote: 'Remote' };
const EMPLOYMENT_TYPE_LABEL = { full_time: 'Full Time', part_time: 'Part Time', internship: 'Internship', fellowship: 'Fellowship', research: 'Research' };

function formatDate(iso) {
    if (!iso) return null;
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

function WorkSection() {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        publicGet(`/candidates/${CANDIDATE_ID}/work-experiences`)
            .then(data => {
                const sorted = [...data].sort((a, b) => {
                    const aDate = a.start_date ? new Date(a.start_date) : new Date(0);
                    const bDate = b.start_date ? new Date(b.start_date) : new Date(0);
                    return bDate - aDate;
                });
                setExperiences(sorted);
            })
            .catch(() => {});
    }, []);

    if (!experiences.length) return null;

    return (
        <section className={styles.section}>
            <p className={styles.label}>Where I Have Grown</p>
            <div className={styles.list}>
                {experiences.map((exp) => {
                    const start = formatDate(exp.start_date);
                    const end = exp.is_current ? 'Present' : formatDate(exp.end_date);
                    const dateRange = [start, end].filter(Boolean).join(' – ');

                    return (
                        <div key={exp.id} className={styles.card}>
                            <p className={styles.headline}>
                                {exp.title}
                                {exp.company && <span className={styles.dot}> • </span>}
                                {exp.company && <span>{exp.company}</span>}
                                {exp.work_type && <span className={styles.dot}> • </span>}
                                {exp.work_type && <span>{WORK_TYPE_LABEL[exp.work_type] ?? exp.work_type}</span>}
                            </p>
                            <p className={styles.meta}>
                                {exp.employment_type && <span>{EMPLOYMENT_TYPE_LABEL[exp.employment_type] ?? exp.employment_type}</span>}
                                {exp.employment_type && dateRange && <span className={styles.pipe}> | </span>}
                                {dateRange && <span>{dateRange}</span>}
                            </p>
                            {exp.technologies?.length > 0 && (
                                <p className={styles.tech}>
                                    <em>{exp.technologies.join(', ')}</em>
                                </p>
                            )}
                            {exp.achievements?.length > 0 && (
                                <ul className={styles.achievements}>
                                    {exp.achievements.map((a, i) => (
                                        <li key={i}>{a.replaceAll(';', ',')}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default WorkSection;

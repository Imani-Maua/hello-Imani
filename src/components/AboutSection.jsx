import { useState, useEffect } from 'react';
import profileImg from '../assets/profile4.jpg';
import styles from './AboutSection.module.scss';
import { publicGet } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useDraft } from '../context/DraftContext';

const CANDIDATE_ID = 1;
const EMAIL = 'mauaelaineimani@gmail.com';

function AboutSection() {
    const { isAuthed } = useAuth();
    const { state: draft } = useDraft();
    const [links, setLinks] = useState([]);

    useEffect(() => {
        if (isAuthed && draft.entities.links !== undefined) {
            setLinks(draft.entities.links);
        } else {
            publicGet(`/candidates/${CANDIDATE_ID}/links`)
                .then(setLinks)
                .catch(() => {});
        }
    }, [isAuthed, draft.entities.links]);

    const github = links.find(l => l.link_type === 'github');
    const linkedin = links.find(l => l.link_type === 'linkedin');

    return (
        <section className={styles.section}>
            <div className={styles.card}>
                <div className={styles.imageSide}>
                    <div className={styles.imageWrapper}>
                        <img src={profileImg} alt="Maua Elaine Imani" className={styles.image} />
                    </div>
                </div>
                <div className={styles.textSide}>
                    <p className={styles.aboutLabel}>About Me</p>
                    <h2 className={styles.aboutHeadline}>I love solving problems</h2>
                    <p className={styles.aboutProse}>
                        It's a fairly convenient arrangement: I get something to obsess over for the next couple of weeks or months, and someone else gets a better day because of it.
                    </p>
                    <p className={styles.aboutProse}>
                        I love building things that simplify complicated processes, remove unnecessary friction, and make people's lives easier. Tech is fun, especially when you see the difference you've made.
                    </p>
                    <p className={styles.aboutProse}>
                        Occasionally, I close my laptop and become a person. Occasionally.
                    </p>
                    <div className={styles.links}>
                        {linkedin && <a href={linkedin.url} target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>}
                        {github && <a href={github.url} target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>}
                        <a href={`mailto:${EMAIL}`} className={styles.link}>Email</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;

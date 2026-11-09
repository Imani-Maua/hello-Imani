import { useState } from "react";
import styles from './SidePanel.module.scss';

function SidePanel() {
    const [isEduOpen, setIsEduOpen] = useState(true);
    const [isSkillsOpen, setIsSkillsOpen] = useState(true);
    const [isMathOpen, setIsMathOpen] = useState(false);
    const [isCSOpen, setIsCSOpen] = useState(false);
    const [isStackOpen, setIsStackOpen] = useState(false);

    return (
        <div className={styles.sidebar}>
            {/* Education Section */}
            <div className={styles.section}>
                <div className={styles.sectionHeader} onClick={() => setIsEduOpen(!isEduOpen)}>
                    <div className={styles.headerTitle}>
                        <span>📚</span><span><strong>Education</strong></span>
                    </div>
                    <span className={styles.arrow}>{isEduOpen ? '▼' : '▶'}</span>
                </div>
                {isEduOpen && (
                    <div className={styles.content}>
                        <p>University of Debrecen</p>
                        <p>BSc. Computer Science</p>
                        <p>🎓 <strong>Graduating: Feb 2027</strong></p>
                    </div>
                )}
            </div>

            {/* Technical Skills Section */}
            <div className={styles.section}>
                <div className={styles.sectionHeader} onClick={() => setIsSkillsOpen(!isSkillsOpen)}>
                    <div className={styles.headerTitle}>
                        <span>💻</span><span><strong>Technical Skills</strong></span>
                    </div>
                    <span className={styles.arrow}>{isSkillsOpen ? '▼' : '▶'}</span>
                </div>
                {isSkillsOpen && (
                    <div className={styles.content}>
                        <div className={styles.contentInfo}>
                            <p><strong>Languages:</strong></p>
                            <p>Python, Java, R, C, C++, Swift, JavaScript, TypeScript, HTML/CSS</p>
                        </div>

                        <div className={styles.contentInfo}>
                            <strong>Frameworks:</strong>
                            <p>FastAPI, React Native, React, Vite, Node.js, Flask, Django, SwiftUI</p>
                        </div>

                        <div className={styles.contentInfo}>
                            <strong>Databases:</strong>
                            <p>PostgreSQL, OracleSQL, SQLAlchemy, MongoDB, Prisma, SQLite</p>
                        </div>
                        <div className={styles.contentInfo}>
                            <strong>Tools:</strong>
                            <p>Linux, REST APIs, Git/GitHub, Docker, Jupyter Notebook, AWS, WebAPIs, MATLAB, Google Colab, RPC APIs, Websocket APIs, Postman</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Academic Stack Section */}
            <div className={styles.section}>
                <div className={styles.sectionHeader} onClick={() => setIsStackOpen(!isStackOpen)}>
                    <div className={styles.headerTitle}>
                        <span>📖</span><span><strong>Academic Stack</strong></span>
                    </div>
                    <span className={styles.arrow}>{isStackOpen ? '▼' : '▶'}</span>
                </div>

                {isStackOpen && (
                    <>
                        <div className={styles.subSection}
                            onClick={() => setIsMathOpen(!isMathOpen)}
                        >
                            <span>{isMathOpen ? '▼' : '▶'}</span>
                            <span>Maths & Statistics</span>
                        </div>
                        {isMathOpen && (
                            <ul className={styles.classList}>
                                <li>Computer Aided Math and Visualization</li>
                                <li>Discrete Mathematics</li>
                                <li>Calculus II</li>
                                <li>Calculus III</li>
                                <li>Applied Mathematics</li>
                                <li>Applied Statistics</li>
                            </ul>
                        )}

                        <div className={styles.subSection}
                            onClick={() => setIsCSOpen(!isCSOpen)}
                        >
                            <span>{isCSOpen ? '▼' : '▶'}</span>
                            <span> Informatics & CS</span>
                        </div>
                        {isCSOpen && (
                            <ul className={styles.classList}>
                                <li>Logic In Computer Science</li>
                                <li>Introduction to Programming</li>
                                <li>Theory of Computation</li>
                                <li>Operating Systems</li>
                                <li>Data Structures and Algorithms</li>
                                <li>Database Systems</li>
                                <li>High Level Programming Languages</li>
                                <li>Object Oriented Programming</li>
                                <li>Network Architecture and Protocols</li>
                                <li>Web Technologies</li>
                                <li>Foundations of Computer Security</li>
                                <li>Foundations of Artificial Intelligence</li>
                                <li>Software Engineering</li>
                                <li>Web Application Development</li>
                                <li>Software Development Methodologies</li>
                                <li>Blockchain Technology</li>
                            </ul>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default SidePanel;
import { useState } from "react";
import styles from './SidePanel.module.css';

function SidePanel() {
    const [isMathOpen, setIsMathOpen] = useState(false);
    const [isCSOpen, setIsCSOpen] = useState(false);

    return (
        <aside className={styles.sidebar}>
            <div className={styles.section}>
                <span>📚</span><h3>Education</h3>
                <div className={styles.content}>
                    <p>University of Debrecen</p>
                    <p>BSc Computer Science</p>
                    <span>🎓</span><p>Graduating Feb 2027</p>
                </div>
            </div>

            <div className={styles.section}>
                <span>💻</span><h3>Technical Skills</h3>
                <div className={styles.content}>
                    <div className={styles.contentInfo}>
                        <strong>Languages:</strong>
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
            </div>

            <div className={styles.section}>
                <span>📖</span><h3>Academic Stack</h3>
                <div className={styles.subSection}
                onClick={() => setIsMathOpen(!isMathOpen)}
                >
                    <span>{isMathOpen ? '▼': '▶'}</span>
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
                    <span>{isCSOpen? '▼': '▶'}</span>
                    <span> Informatics & CS</span>
                    <div>{isCSOpen &&(
                    <ul>
                        <li>Logic In Computer Science</li>
                        <li>Introduction to Programming</li>
                        <li>Theory of Computation</li>
                        <li>Operating Systems</li>
                        <li>Data Structures and Algorithms</li>
                        <li>Database Systems</li>
                        <li>High Level Programming Languages</li>
                        <li>Object Oriented Programming</li>
                        <li>Network Architecture and Protoclis</li>
                        <li>Web Technliogies</li>
                        <li>Foundations of Computer Security</li>
                        <li>Foundations of Artificial Intelligence</li>
                        <li>Software Engineering</li>
                        <li>Web Application Development</li>
                        <li>Software Development Methodliogies</li>
                        <li>Blockchain Technology</li>
                    </ul>
                )}
                    </div>
                </div>

            </div>

        </aside>
    );
}

export default SidePanel;
import { useState } from 'react';
import styles from './Hero.module.scss';
import profile4 from '../assets/profile4.jpg';
import ResumeModal from './ResumeModal';

function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const resumeLink = "https://docs.google.com/document/d/1L64Avr4_JXRvWG8bMgjid4cKJeq2nVTdTCJkNvOzwUU/edit?tab=t.0";

    return (
        <section className={styles.hero}>
            <div className={styles.heroHeading}>
                <div className={styles.profilePhotoContainer}>
                    <img src={profile4}
                        alt="Maua Imani"
                        className={styles.profilePhoto} />
                    <p className={styles.academicInfoMobile}>🧠 Learn • ☕ Coffee • 💻 Code • 🛠️ Build • 🔁 Repeat</p>
                </div>
                <div className={styles.heroDesc}>
                    <h1 className={styles.name}>Maua Imani</h1>
                    <p className={styles.tagline}>Software Engineer</p>
                    <p className={styles.academicInfo}>🧠 Learn • ☕ Coffee • 💻 Code • 🛠️ Build • 🔁 Repeat</p>

                </div>
            </div>

            <div className={styles.socials}>
                <a
                    href="https://www.linkedin.com/in/elaine-i-maua-666207226/"
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.socialButton}

                >LinkedIn
                </a>


                <a
                    href="https://github.com/Imani-Maua"
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.socialButton}

                > GitHub
                </a>

                <div
                    onClick={() => setIsModalOpen(true)}
                    className={styles.socialButton}
                    style={{ cursor: 'pointer' }}
                >
                    Request CV
                </div>

                <a
                    href="mailto:elainemaua644@gmail.com"
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.socialButton}

                > Email Me
                </a>
            </div>




            <div className={styles.intro}>

                <p>I build software that makes life easier so we focus on the fun stuff 🐾</p>
                <p>Solving problems is fun.🐾 Tech is fun!🐾 and I love fun!🐾</p>
                <p>Right now, I'm training SlotMeIn, leveraging ML algorithms and constraint optimization to intelligently schedule employee shifts. I'm using predictive models and pattern recognition to turn scheduling nightmares into data-driven allocation. You see? Fun!</p>
                <p>I'm passionate about being an engineer who builds scalable, distributed systems that solve real problems and ship value for users!</p>
                <p>Tech is for women too! I'm actively working to inspire younger women and girls to get into SWE, AI, systems design - all of it, like they absolutely should! 💅🏾✨ </p>
                <div className={styles.techStack}>
                    <p>Right now I'm doing a lot of:</p>
                    <ul>
                        <li>Fintech research</li>
                        <li>Full-stack engineering</li>
                        <li>Machine learning and AI</li>
                        <li>Computer Security</li>
                        <li>Human-centered design</li>
                        <li>Distributed Systems</li>
                    </ul>
                </div>


            </div>

            <ResumeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                resumeLink={resumeLink}
            />
        </section>
    )
}

export default Hero;
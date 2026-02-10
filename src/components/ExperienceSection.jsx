import ExperienceCard from './ExperienceCard';
import styles from './ExperienceSection.module.scss';

function ExperienceSection() {
    const experiences = [
        {
            title: "Peer Lead",
            company: "AkiraChix",
            startDate: "Feb 2024",
            endDate: "Present",
            description: "Served as a mentor to high school graduates interested in pursuing careers in technology, providing guidance on computer science fundamentals, academic pathways, and career development through online workshops and bootcamps focused on building confidence, problem-solving skills, and readiness for university-level computer science."
        },
        {
            title: "Software Engineering Intern",
            company: "AkiraChix",
            startDate: "Dec 2023",
            endDate: "Jul 2024",
            description: [
                "Built and maintained backend services for AfyaLink, a digital health platform delivering real-time immunization alerts and outbreak notifications to underserved communities.",
                "Designed and implemented RESTful APIs using FastAPI, applying Pydantic models for request validation and data integrity.",
                "Integrated backend services with relational databases, ensuring reliable data persistence and efficient query handling.",
                "Collaborated in a cross-functional, 4-person engineering team, contributing to feature design, implementation, and testing.",
                "Participated in code reviews and iterative development, strengthening system reliability and maintainability in a production environment."
            ]

        },
        {
            title: "Club Coordinator",
            company: "Google Developer Student Clubs - UniDeb",
            startDate: "Sep 2023",
            endDate: "Present",
            description: "Led and coordinated technical workshops, hackathons, and community events for students interested in Google technologies and software development. Fostered a collaborative learning environment and connected students with industry professionals and resources."

        },
        {
            title: "Teaching Assistant",
            company: "University of Debrecen",
            startDate: "Sep 2024",
            endDate: "Dec 2024",
            description: [
                "Supported 50+ undergraduate students in understanding core Operating Systems concepts, including process scheduling, memory management, and file systems.",
                "Guided students in debugging C programs using tools such as gdb, valgrind, and Linux system calls.",
                "Reinforced practical understanding of OS internals through hands-on labs and one-on-one technical support.",
                "Helped bridge theory and practice, improving students' confidence in low-level systems programming."
            ]
        }
    ];

    return (
        <section className={styles.experienceSection}>
            <h2 className={styles.sectionTitle}>Things I've done:</h2>
            <div className={styles.cardsContainer}>
                {experiences.map((exp, index) => (
                    <ExperienceCard
                        key={index}
                        title={exp.title}
                        company={exp.company}
                        type={exp.type}
                        location={exp.location}
                        startDate={exp.startDate}
                        endDate={exp.endDate}
                        duration={exp.duration}
                        description={exp.description}
                        skills={exp.skills}
                    />
                ))}
            </div>
        </section>
    );
}

export default ExperienceSection;

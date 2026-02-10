import ProjectCard from './ProjectCard';
import styles from './ProjectSection.module.scss';


function ProjectSection() {
    const projects = [
        {
            title: 'SlotMeIn',
            stack: 'FastAPI (Python), PostgreSQL, SQLAlchemy, JWT',
            start: 'July 2025',
            end: 'Present',
            desc: 'A FastAPI-based scheduling engine that intelligently allocates employee shifts while respecting labor regulations and availability. It utilizes a constraint-satisfaction approach to ensure fair staffing and compliant shift assignments.',
            github: 'https://github.com/Imani-Maua/SlotMeIn',
            live: ''
        },
        {
            title: 'TopShelf (backend)',
            stack: 'Node.js (Express), Prisma, MongoDB, Jest, Docker',
            start: 'Nov 2025',
            end: 'Jan 2026',
            desc: 'A robust Express.js API designed to automate commission-based bonus calculations for retail and restaurant environments. It features a scalable calculation engine and comprehensive audit logs for transparent payout reporting.',
            github: 'https://github.com/Imani-Maua/TopShelf-backend',
            live: ''
        },
        {
            title: 'Topshelf (frontend)',
            stack: 'React 19, Vite, Recharts, Vitest, Docker',
            start: 'Nov 2025',
            end: 'Jan 2026',
            desc: 'A modern React dashboard providing real-time performance analytics and automated sales bonus visualizations. It replaces manual Excel workflows with a production-ready interface, reducing payout processing time by 50%.',
            github: 'https://github.com/Imani-Maua/TopShelf-frontend',
            live: ''
        },
        {
            title: 'HeyImani Portfolio',
            stack: 'React (HTML, SCSS, JavaScript)',
            start: 'Jan 2026',
            end: 'Present',
            desc: 'A responsive portfolio site showcasing my software engineering projects, technical skills, and creative personality.',
            github: 'https://github.com/Imani-Maua/HeyImani',
            live: ''
        }
    ];

    return (
        <section className={styles.projectSection}>
            <h2 className={styles.sectionTitle}>Things I've built:</h2>
            <div className={styles.projectsGrid}>
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        {...project}
                    />
                ))}
            </div>
        </section>
    );
}

export default ProjectSection;
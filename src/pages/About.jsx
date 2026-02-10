import SidePanel from "../components/SidePanel";
import Hero from '../components/Hero';
import Favorites from '../components/Favorites';
import ExperienceSection from '../components/ExperienceSection';

function About() {
    return (
        <div style={{ display: "flex" }}>
            <SidePanel />
            <div style={{ flex: 1 }}>
                <Hero />
                <Favorites />
            </div>
            <ExperienceSection />
        </div>
    );
}

export default About;
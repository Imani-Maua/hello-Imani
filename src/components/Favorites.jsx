import { useState } from 'react';
import styles from './Favorites.module.scss';
import CarouselCard from './CarouselCard';
import CROPP from '../assets/CROPP.png';
import Capuccino from '../assets/Capuccino.png';
import Denimkittens from '../assets/Denimkittens.png';
import Dijon from '../assets/Dijon.png';
import LincolnLawyer from '../assets/LincolnLawyer.png';
import MicCheque from '../assets/MicCheque.png';
import Olivia from '../assets/Olivia.png';
import poke from '../assets/poke.png';
import Como from '../assets/Como.png';


function Favorites() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const favorites = [
        {
            image: Capuccino,
            alternate: "Double shot cappuccino",
            topic: "Coffee Order",
            customName: "Double Shot Cappuccino",
            desc: "2 brown sugars. Non-negotiable. ☕"
        },
        {
            image: Dijon,
            alternate: "Dijon album cover",
            topic: "Music Album",
            customName: "Absolutely - Dijon",
            desc: "No-skip album. Every track hits. On repeat while coding! 🎵"
        },
        {
            image: Olivia,
            alternate: "Olivia Dean",
            topic: "Karaoke Song",
            customName: "Man I Need - Olivia Dean",
            desc: "On repeat lately - smooth, soulful, and impossible not to sing along to. 🎤"
        },
        {
            image: poke,
            alternate: "Poke bowl",
            topic: "Quick meal",
            customName: "Poke Bowls",
            desc: "Recently tried a Truffle Aioli Sauce? Chef's kiss 👩🏾‍🍳"
        },
        {
            image: LincolnLawyer,
            alternate: "The Lincoln Lawyer show",
            topic: "TV Show",
            customName: "The Lincoln Lawyer",
            desc: "Rewatching as I wait for the new season! 📺🎬"
        },
        {
            image: Denimkittens,
            alternate: "Kitten heels",
            topic: "Fashion Piece",
            customName: "Kitten Heels",
            desc: "Sign me up for a good stiletto pair that doesn't hurt my back!"
        },
        {
            image: MicCheque,
            alternate: "MicCheque",
            topic: "Podcast",
            customName: "MicCheque Podcast",
            desc: "A good 1-2 hours of effortless laughter, good vibes, and reminders of home!"
        },
        {
            image: Como,
            alternate: "Lake Como",
            topic: "Travel Destination",
            customName: "Lake Como, Italy",
            desc: "Boat rides, gelato, cobble stones and pretending I live there!"
        }
    ];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % favorites.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + favorites.length) % favorites.length);
    };

    return (
        <section className={styles.favoritesSection}>


            <div className={styles.carouselContainer}>
                <button
                    onClick={prevSlide}
                    className={styles.navButton}
                    aria-label="Previous favorite"
                >
                    ←
                </button>

                <CarouselCard
                    image={favorites[currentIndex].image}
                    alternate={favorites[currentIndex].alternate}
                    topic={favorites[currentIndex].topic}
                    customName={favorites[currentIndex].customName}
                    desc={favorites[currentIndex].desc}
                />

                <button
                    onClick={nextSlide}
                    className={styles.navButton}
                    aria-label="Next favorite"
                >
                    →
                </button>
            </div>

            <div className={styles.dots}>
                {favorites.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            <p className={styles.counter}>
                {currentIndex + 1} / {favorites.length}
            </p>
        </section>
    );
}

export default Favorites;

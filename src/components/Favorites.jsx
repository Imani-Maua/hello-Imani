import { useState, useEffect } from 'react';
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
    const [isPaused, setIsPaused] = useState(false);
    const [touchStart, setTouchStart] = useState(null);

    const favorites = [
        {
            image: Capuccino,
            alternate: "Double cappuccino",
            topic: "Coffee Order",
            customName: "2x Cappuccino",
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
        },
        {
            image: CROPP,
            alternate: "CROPP",
            topic: "Clothing Store",
            customName: "CROPP TOWN",
            desc: "A window shopping trip that always somehow turns into a shopping spree"
        }
    ];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % favorites.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + favorites.length) % favorites.length);
    };

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            nextSlide();
        }, 4000);
        return () => clearInterval(timer);
    }, [currentIndex, isPaused]);

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
        setIsPaused(true);
    };

    const handleTouchMove = (e) => {
        if (!touchStart) return;
        const currentTouch = e.targetTouches[0].clientX;
        const diff = touchStart - currentTouch;

        if (diff > 50) {
            nextSlide();
            setTouchStart(null);
        } else if (diff < -50) {
            prevSlide();
            setTouchStart(null);
        }
    };

    const handleTouchEnd = () => {
        setTouchStart(null);
        setIsPaused(false);
    };

    return (
        <section className={styles.favoritesSection}>
            <h2 className={styles.favoritesTitle}>Things I like:</h2>
            <div
                className={styles.carouselContainer}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <button
                    className={`${styles.navButton} ${styles.prevButton}`}
                    onClick={prevSlide}
                    aria-label="Previous slide"
                >
                    ‹
                </button>

                <div
                    className={styles.carouselTrack}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {favorites.map((item, index) => (
                        <div key={index} className={styles.carouselSlide}>
                            <CarouselCard
                                image={item.image}
                                alternate={item.alternate}
                                topic={item.topic}
                                customName={item.customName}
                                desc={item.desc}
                            />
                        </div>
                    ))}
                </div>

                <button
                    className={`${styles.navButton} ${styles.nextButton}`}
                    onClick={nextSlide}
                    aria-label="Next slide"
                >
                    ›
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

           
        </section>
    );
}

export default Favorites;

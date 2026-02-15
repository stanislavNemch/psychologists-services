import styles from "./HomePage.module.css";
import heroImage from "../../assets/hero_img.webp";
import { GoArrowUpRight } from "react-icons/go";
import { FaCheck, FaUser, FaQuestion } from "react-icons/fa";
import clsx from "clsx";

const HomePage = () => {
    return (
        <section className={styles.heroSection}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    The road to the{" "}
                    <span className={styles.italicAccent}>depths</span> of the
                    human soul
                </h1>
                <p className={styles.description}>
                    We help you to reveal your potential, overcome challenges
                    and find a guide in your own life with the help of our
                    experienced psychologists.
                </p>
                <button className={styles.ctaButton} type="button">
                    Get started
                    <GoArrowUpRight size={20} />
                </button>
            </div>

            <div className={styles.imageContainer}>
                <img
                    src={heroImage}
                    alt="Psychologist session"
                    className={styles.heroImage}
                />

                {/* Floating Elements (Decorations) */}

                {/* Users Icon - Top Right */}
                <div className={clsx(styles.floatingElement, styles.usersIcon)}>
                    <FaUser size={20} />
                </div>

                {/* Question Icon - Left Middle */}
                <div
                    className={clsx(
                        styles.floatingElement,
                        styles.questionIcon,
                    )}
                >
                    <FaQuestion size={20} />
                </div>

                {/* Experience Badge - Bottom Left */}
                <div
                    className={clsx(
                        styles.floatingElement,
                        styles.experienceBadge,
                    )}
                >
                    <div className={styles.checkIconWrapper}>
                        <FaCheck size={30} />
                    </div>
                    <div className={styles.textWrapper}>
                        <span className={styles.experienceText}>
                            Experienced psychologists
                        </span>
                        <div className={styles.experienceCount}>15,000</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomePage;

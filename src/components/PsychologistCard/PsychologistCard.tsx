import { useState } from "react";
import type { Psychologist } from "../../types/psychologist";
import styles from "./PsychologistCard.module.css";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa"; // Assuming react-icons are installed
import { useAuth } from "../../hooks/useAuth";
import clsx from "clsx";

interface PsychologistCardProps {
    psychologist: Psychologist;
    // onToggleFavorite: (id: string) => void;
    // isFavorite: boolean;
}

const PsychologistCard: React.FC<PsychologistCardProps> = ({
    psychologist,
}) => {
    const { currentUser } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false); // Local state for now, will move to global/context later

    const handleFavoriteClick = () => {
        if (!currentUser) {
            alert("Please log in to add to favorites"); // Or open login modal
            return;
        }
        setIsFavorite(!isFavorite);
        // onToggleFavorite(psychologist.id);
    };

    return (
        <div className={styles.card}>
            <div className={styles.avatarWrapper}>
                <img
                    src={psychologist.avatar_url}
                    alt={psychologist.name}
                    className={styles.avatar}
                />
                <div className={styles.onlineStatus} />
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.titleGroup}>
                        <span className={styles.role}>Psychologist</span>
                        <h3 className={styles.name}>{psychologist.name}</h3>
                    </div>

                    <div className={styles.metaInfo}>
                        <div className={styles.rating}>
                            <FaStar className={styles.starIcon} size={16} />
                            <span>Rating: {psychologist.rating}</span>
                        </div>
                        <div className={styles.price}>
                            Price / 1 hour:{" "}
                            <span className={styles.priceValue}>
                                {psychologist.price_per_hour}$
                            </span>
                        </div>
                        <button
                            className={clsx(styles.favoriteButton, {
                                [styles.favoriteActive]: isFavorite,
                            })}
                            onClick={handleFavoriteClick}
                        >
                            {isFavorite ? (
                                <FaHeart size={26} />
                            ) : (
                                <FaRegHeart size={26} />
                            )}
                        </button>
                    </div>
                </div>

                <div className={styles.attributesList}>
                    <div className={styles.attributeTag}>
                        Experience:{" "}
                        <span className={styles.attributeValue}>
                            {psychologist.experience}
                        </span>
                    </div>
                    <div className={styles.attributeTag}>
                        License:{" "}
                        <span className={styles.attributeValue}>
                            {psychologist.license}
                        </span>
                    </div>
                    <div className={styles.attributeTag}>
                        Specialization:{" "}
                        <span className={styles.attributeValue}>
                            {psychologist.specialization}
                        </span>
                    </div>
                    <div className={styles.attributeTag}>
                        Initial_consultation:{" "}
                        <span className={styles.attributeValue}>
                            {psychologist.initial_consultation}
                        </span>
                    </div>
                </div>

                <p className={styles.description}>{psychologist.about}</p>

                <button className={styles.readMoreButton}>Read more</button>
            </div>
        </div>
    );
};

export default PsychologistCard;

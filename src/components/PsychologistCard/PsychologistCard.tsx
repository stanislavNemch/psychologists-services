import { useState } from "react";
import type { Psychologist } from "../../types/psychologist";
import styles from "./PsychologistCard.module.css";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import clsx from "clsx";
import Modal from "../Modal/Modal";
import AppointmentForm from "../AppointmentForm/AppointmentForm";

interface PsychologistCardProps {
    psychologist: Psychologist;
    onToggleFavorite: () => void;
    isFavorite: boolean;
}

const PsychologistCard: React.FC<PsychologistCardProps> = ({
    psychologist,
    onToggleFavorite,
    isFavorite,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

    return (
        <>
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
                                onClick={onToggleFavorite}
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

                    {!isExpanded && (
                        <button
                            className={styles.readMoreButton}
                            onClick={() => setIsExpanded(true)}
                        >
                            Read more
                        </button>
                    )}

                    {isExpanded && (
                        <div className={styles.expandedContent}>
                            <ul className={styles.reviewsList}>
                                {psychologist.reviews.map((review, index) => (
                                    <li
                                        key={index}
                                        className={styles.reviewItem}
                                    >
                                        <div className={styles.reviewerAvatar}>
                                            {review.reviewer
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                        <div className={styles.reviewContent}>
                                            <h4 className={styles.reviewerName}>
                                                {review.reviewer}
                                            </h4>
                                            <div
                                                className={styles.reviewRating}
                                            >
                                                <FaStar
                                                    className={styles.starIcon}
                                                    size={16}
                                                />
                                                <span>{review.rating}</span>
                                            </div>
                                            <p className={styles.reviewComment}>
                                                {review.comment}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={styles.appointmentButton}
                                onClick={() => setIsAppointmentModalOpen(true)}
                            >
                                Make an appointment
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Modal
                isOpen={isAppointmentModalOpen}
                onClose={() => setIsAppointmentModalOpen(false)}
            >
                <AppointmentForm
                    psychologist={psychologist}
                    onClose={() => setIsAppointmentModalOpen(false)}
                />
            </Modal>
        </>
    );
};

export default PsychologistCard;

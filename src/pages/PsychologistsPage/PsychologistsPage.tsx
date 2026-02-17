import { useEffect, useState, useMemo } from "react";
import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebase";
import type { Psychologist } from "../../types/psychologist";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";
import Filters from "../../components/Filters/Filters";
import styles from "./PsychologistsPage.module.css";
import { useFavorites } from "../../hooks/useFavorites";
import { useAuth } from "../../hooks/useAuth";

const PsychologistsPage = () => {
    const [allPsychologists, setAllPsychologists] = useState<Psychologist[]>(
        [],
    );
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("Show all");
    const [visibleCount, setVisibleCount] = useState(3);

    const { favorites, toggleFavorite } = useFavorites();
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchPsychologists = async () => {
            setLoading(true);
            try {
                // Fetch directly from root as confirmed by user
                const rootRef = ref(database, "/");
                const rootSnapshot = await get(rootRef);

                if (rootSnapshot.exists()) {
                    const data = rootSnapshot.val();
                    // Normalize data: filter items that look like psychologists
                    const list: Psychologist[] = Object.keys(data)
                        .map((key) => ({
                            id: key,
                            ...data[key],
                        }))
                        .filter((item) => item.name && item.price_per_hour);

                    setAllPsychologists(list);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPsychologists();
    }, []);

    const filteredPsychologists = useMemo(() => {
        let sortedList = [...allPsychologists];

        switch (filter) {
            case "A to Z":
                sortedList.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Z to A":
                sortedList.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "Less than 10$":
                sortedList = sortedList.filter((p) => p.price_per_hour < 10);
                break;
            case "Greater than 10$":
                sortedList = sortedList.filter((p) => p.price_per_hour > 10);
                break;
            case "Popular":
                sortedList.sort((a, b) => b.rating - a.rating);
                break;
            case "Not popular":
                sortedList.sort((a, b) => a.rating - b.rating);
                break;
            case "Show all":
            default:
                // No specific sorting or filtering
                break;
        }
        return sortedList;
    }, [allPsychologists, filter]);

    const visiblePsychologists = filteredPsychologists.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 3);
    };

    const handleFavoriteToggle = (id: string) => {
        if (!currentUser) {
            alert("Please log in to add to favorites"); // Could be better with a modal trigger
            return;
        }
        toggleFavorite(id);
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <Filters onFilterChange={setFilter} />

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className={styles.list}>
                        {visiblePsychologists.map((psychologist) => (
                            <PsychologistCard
                                key={psychologist.id}
                                psychologist={psychologist}
                                isFavorite={favorites.includes(psychologist.id)}
                                onToggleFavorite={() =>
                                    handleFavoriteToggle(psychologist.id)
                                }
                            />
                        ))}
                    </div>
                )}

                {visibleCount < filteredPsychologists.length && (
                    <button
                        className={styles.loadMoreButton}
                        onClick={handleLoadMore}
                    >
                        Load more
                    </button>
                )}
            </div>
        </section>
    );
};

export default PsychologistsPage;

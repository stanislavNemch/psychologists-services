import { useEffect, useState, useMemo } from "react";
import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebase";
import type { Psychologist } from "../../types/psychologist";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";
import Filters from "../../components/Filters/Filters";
import styles from "./FavoritesPage.module.css";
import { useFavorites } from "../../hooks/useFavorites";
import { useAuth } from "../../hooks/useAuth";

const FavoritesPage = () => {
    const [allPsychologists, setAllPsychologists] = useState<Psychologist[]>(
        [],
    );
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("Show all");
    // const [visibleCount, setVisibleCount] = useState(3); // Pagination might not be needed for favorites, but good to have if list is long

    const { favorites, toggleFavorite, loadingFavorites } = useFavorites();
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchPsychologists = async () => {
            setLoading(true);
            try {
                const rootRef = ref(database, "/");
                const rootSnapshot = await get(rootRef);

                if (rootSnapshot.exists()) {
                    const data = rootSnapshot.val();
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

    // Filter only favorites first
    const favoritePsychologists = useMemo(() => {
        if (!favorites || favorites.length === 0) return [];
        return allPsychologists.filter((p) => favorites.includes(p.id));
    }, [allPsychologists, favorites]);

    // Apply sorting filters to the favorites list
    const displayedPsychologists = useMemo(() => {
        let sortedList = [...favoritePsychologists];

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
                break;
        }
        return sortedList;
    }, [favoritePsychologists, filter]);

    // If user is not logged in or favorites loading
    if (loading || loadingFavorites) {
        return (
            <div className={styles.section}>
                <p>Loading...</p>
            </div>
        );
    }

    if (!currentUser) {
        return (
            <div className={styles.section}>
                <p>Please log in to view favorites.</p>
            </div>
        );
    }

    if (favoritePsychologists.length === 0) {
        return (
            <section className={styles.section}>
                <div className={styles.container}>
                    <p>No favorites added yet.</p>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <Filters onFilterChange={setFilter} />

                <div className={styles.list}>
                    {displayedPsychologists.map((psychologist) => (
                        <PsychologistCard
                            key={psychologist.id}
                            psychologist={psychologist}
                            isFavorite={true} // They are in this list so they are favorites
                            onToggleFavorite={() =>
                                toggleFavorite(psychologist.id)
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FavoritesPage;

import { useEffect, useState, useMemo } from "react";
import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebase";
import type { Psychologist } from "../../types/psychologist";
import PsychologistCard from "../../components/PsychologistCard";
import Filters from "../../components/Filters";
import styles from "./FavoritesPage.module.css";
import { useFavorites } from "../../hooks/useFavorites";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../../components/Loader";
import { usePsychologistFilter } from "../../hooks/usePsychologistFilter";

const FavoritesPage = () => {
    const [allPsychologists, setAllPsychologists] = useState<Psychologist[]>(
        [],
    );
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("Show all");
    const [visibleCount, setVisibleCount] = useState(3);

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

    // Apply sorting filters to the favorites list using custom hook
    const filteredFavorites = usePsychologistFilter(
        favoritePsychologists,
        filter,
    );

    const visiblePsychologists = filteredFavorites.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 3);
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <Filters onFilterChange={setFilter} />

                {loading || loadingFavorites ? (
                    <Loader />
                ) : !currentUser ? (
                    <p>Please log in to view favorites.</p>
                ) : favoritePsychologists.length === 0 ? (
                    <p>No favorites added yet.</p>
                ) : (
                    <div className={styles.list}>
                        {visiblePsychologists.map((psychologist) => (
                            <PsychologistCard
                                key={psychologist.id}
                                psychologist={psychologist}
                                isFavorite={true}
                                onToggleFavorite={() =>
                                    toggleFavorite(psychologist.id)
                                }
                            />
                        ))}
                    </div>
                )}

                {visibleCount < filteredFavorites.length && (
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

export default FavoritesPage;

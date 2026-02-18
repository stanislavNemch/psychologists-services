import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebase";
import { DB_ROOT } from "../../firebase/constants";
import type { Psychologist } from "../../types/psychologist";
import PsychologistCard from "../../components/PsychologistCard";
import Filters from "../../components/Filters";
import styles from "./PsychologistsPage.module.css";
import { useFavorites } from "../../hooks/useFavorites";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../../components/Loader";
import { usePsychologistFilter } from "../../hooks/usePsychologistFilter";

const PsychologistsPage = () => {
    const [allPsychologists, setAllPsychologists] = useState<Psychologist[]>(
        [],
    );
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("Show all");
    const [visibleCount, setVisibleCount] = useState(3);

    const { favorites, toggleFavorite } = useFavorites();
    const { currentUser } = useAuth();

    // Use custom hook for filtering
    const filteredPsychologists = usePsychologistFilter(
        allPsychologists,
        filter,
    );

    useEffect(() => {
        const fetchPsychologists = async () => {
            setLoading(true);
            try {
                // Fetch from isolated app path
                const rootRef = ref(database, `${DB_ROOT}/psychologists`);
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
            } finally {
                setLoading(false);
            }
        };

        fetchPsychologists();
    }, []);

    const visiblePsychologists = filteredPsychologists.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 3);
    };

    const handleFavoriteToggle = (id: string) => {
        if (!currentUser) {
            toast.error("Please log in to add to favorites");
            return;
        }
        toggleFavorite(id);
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <Filters onFilterChange={setFilter} />
                {loading ? (
                    <Loader />
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

import { useEffect, useState } from "react";
import { ref, onValue, set, remove } from "firebase/database";
import { database } from "../firebase/firebase";
import { useAuth } from "./useAuth";

export const useFavorites = () => {
    const { currentUser } = useAuth();
    const [favorites, setFavorites] = useState<string[]>([]); // Array of psychologist IDs
    const [loadingFavorites, setLoadingFavorites] = useState(true);

    useEffect(() => {
        if (!currentUser) {
            setFavorites([]);
            setLoadingFavorites(false);
            return;
        }

        const favoritesRef = ref(
            database,
            `users/${currentUser.uid}/favorites`,
        );

        // Real-time listener
        const unsubscribe = onValue(
            favoritesRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    // We store as object { [id]: true }, so keys are IDs
                    setFavorites(Object.keys(data));
                } else {
                    setFavorites([]);
                }
                setLoadingFavorites(false);
            },
            (error) => {
                console.error("Error fetching favorites:", error);
                setLoadingFavorites(false);
            },
        );

        return () => unsubscribe();
    }, [currentUser]);

    const toggleFavorite = async (psychologistId: string) => {
        if (!currentUser) {
            return; // Should be handled by UI
        }

        const favoriteRef = ref(
            database,
            `users/${currentUser.uid}/favorites/${psychologistId}`,
        );

        if (favorites.includes(psychologistId)) {
            await remove(favoriteRef);
        } else {
            await set(favoriteRef, true);
        }
    };

    return { favorites, toggleFavorite, loadingFavorites };
};

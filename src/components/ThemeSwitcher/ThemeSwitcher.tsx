import { useState, useEffect } from "react";
import { FaPalette, FaCheck } from "react-icons/fa";
import styles from "./ThemeSwitcher.module.css";
import clsx from "clsx";

type Theme = "green" | "blue" | "orange" | "dark";

const themes: { id: Theme; color: string }[] = [
    { id: "green", color: "#54be96" },
    { id: "blue", color: "#3470ff" },
    { id: "orange", color: "#f39c12" },
    { id: "dark", color: "#1e1e1e" }, // Dark theme representative color
];

const ThemeSwitcher = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState<Theme>("green");

    useEffect(() => {
        const savedTheme = localStorage.getItem("app-theme") as Theme;
        if (savedTheme) {
            setCurrentTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
        }
    }, []);

    const handleThemeChange = (theme: Theme) => {
        setCurrentTheme(theme);
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("app-theme", theme);
        setIsOpen(false);
    };

    return (
        <div className={styles.container}>
            <div className={clsx(styles.options, { [styles.open]: isOpen })}>
                {themes.map((theme) => (
                    <button
                        key={theme.id}
                        className={clsx(styles.optionButton, {
                            [styles.active]: currentTheme === theme.id,
                        })}
                        style={{ backgroundColor: theme.color }}
                        onClick={() => handleThemeChange(theme.id)}
                        aria-label={`Switch to ${theme.id} theme`}
                    >
                        {currentTheme === theme.id && (
                            <FaCheck size={12} color="#fff" />
                        )}
                    </button>
                ))}
            </div>
            <button
                className={styles.mainButton}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Toggle theme switcher"
            >
                <FaPalette size={20} />
            </button>
        </div>
    );
};

export default ThemeSwitcher;

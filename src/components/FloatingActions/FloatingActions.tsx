import ThemeSwitcher from "../ThemeSwitcher";
import ScrollToTop from "../ScrollToTop";
import styles from "./FloatingActions.module.css";

const FloatingActions = () => {
    return (
        <div className={styles.container}>
            <ThemeSwitcher />
            <ScrollToTop />
        </div>
    );
};

export default FloatingActions;

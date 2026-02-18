import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
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

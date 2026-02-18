import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import styles from "./Header.module.css";
import { useAuth } from "../../hooks/useAuth";
import Modal from "../Modal";
import RegistrationForm from "../RegistrationForm";
import LoginForm from "../LoginForm";
import { FaUser } from "react-icons/fa";
import { useModal } from "../../hooks/useModal";

const Header = () => {
    const { currentUser, logOut } = useAuth();
    const loginModal = useModal();
    const registerModal = useModal();

    // Helper to determine active link class
    const buildLinkClass = ({ isActive }: { isActive: boolean }) => {
        return clsx(styles.navLink, isActive && styles.navLinkActive);
    };

    return (
        <>
            <header className={styles.header}>
                <Link to="/" className={styles.logo}>
                    psychologists.<span>services</span>
                </Link>
                <nav className={styles.nav}>
                    <NavLink to="/" className={buildLinkClass}>
                        Home
                    </NavLink>
                    <NavLink to="/psychologists" className={buildLinkClass}>
                        Psychologists
                    </NavLink>
                    {currentUser && (
                        <NavLink to="/favorites" className={buildLinkClass}>
                            Favorites
                        </NavLink>
                    )}
                </nav>

                <div className={styles.authContainer}>
                    {!currentUser ? (
                        <>
                            <button
                                className={styles.loginButton}
                                onClick={loginModal.open}
                            >
                                Log In
                            </button>
                            <button
                                className={styles.registerButton}
                                onClick={registerModal.open}
                            >
                                Registration
                            </button>
                        </>
                    ) : (
                        <div className={styles.userContainer}>
                            <div className={styles.userInfo}>
                                <div className={styles.userAvatar}>
                                    <FaUser size={20} />
                                </div>
                                <span className={styles.userName}>
                                    {currentUser.displayName}
                                </span>
                            </div>
                            <button
                                className={styles.logoutButton}
                                onClick={logOut}
                            >
                                Log out
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <Modal isOpen={loginModal.isOpen} onClose={loginModal.close}>
                <LoginForm onClose={loginModal.close} />
            </Modal>

            <Modal isOpen={registerModal.isOpen} onClose={registerModal.close}>
                <RegistrationForm onClose={registerModal.close} />
            </Modal>
        </>
    );
};

export default Header;

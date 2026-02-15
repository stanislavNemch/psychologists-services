import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import styles from "./Header.module.css";
import { useAuth } from "../../hooks/useAuth";
import Modal from "../Modal/Modal";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import LoginForm from "../LoginForm/LoginForm";
import { FaUser } from "react-icons/fa";

const Header = () => {
    const { currentUser, logOut } = useAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

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
                    <NavLink to="/teachers" className={buildLinkClass}>
                        Teachers
                    </NavLink>
                </nav>

                <div className={styles.authContainer}>
                    {!currentUser ? (
                        <>
                            <button
                                className={styles.loginButton}
                                onClick={() => setIsLoginModalOpen(true)}
                            >
                                Log In
                            </button>
                            <button
                                className={styles.registerButton}
                                onClick={() => setIsRegisterModalOpen(true)}
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

            <Modal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            >
                <LoginForm onClose={() => setIsLoginModalOpen(false)} />
            </Modal>

            <Modal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
            >
                <RegistrationForm
                    onClose={() => setIsRegisterModalOpen(false)}
                />
            </Modal>
        </>
    );
};

export default Header;

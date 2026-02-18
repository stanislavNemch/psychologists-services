import Header from "../Header";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import FloatingActions from "../FloatingActions";

import styles from "./Layout.module.css";

const Layout = () => {
    return (
        <div className={styles.container}>
            <Header />
            <main>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
            <FloatingActions />
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default Layout;

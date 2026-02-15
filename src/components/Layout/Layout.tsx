import Header from "../Header/Header";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 16px" }}>
            <Header />
            <main>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    );
};

export default Layout;

import Header from "../Header/Header";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
    return (
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 16px" }}>
            <Header />
            <main>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default Layout;

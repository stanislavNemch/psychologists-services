import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
// import TeachersPage from "./pages/TeachersPage";
// import FavoritesPage from "./pages/FavoritesPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route
                    path="psychologists"
                    element={<div>Psychologists Page</div>}
                />
                <Route path="favorites" element={<div>Favorites Page</div>} />
                <Route path="*" element={<div>Not Found</div>} />
            </Route>
        </Routes>
    );
}

export default App;

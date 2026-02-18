import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage/HomePage";
import PsychologistsPage from "./pages/PsychologistsPage/PsychologistsPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="psychologists" element={<PsychologistsPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="*" element={<div>Not Found</div>} />
            </Route>
        </Routes>
    );
}

export default App;

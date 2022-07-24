import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import OffersPage from "./pages/OffersPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Offers" element={<OffersPage />} />
      <Route path="/Profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

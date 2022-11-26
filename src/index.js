import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./pages/Homepage/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/index";
import RegisterPage from "./pages/Register/index";
import OffersPage from "./pages/Offers/OffersPage";
import OffersPage2 from "./pages/Offers/OffersPage2";
import NotFoundPage from "./pages/NotFound/index";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/Profile/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Authentication/Login" element={<LoginPage />} />
      <Route path="/Authentication/Register" element={<RegisterPage />} />
      <Route path="/Offers" element={<OffersPage />} />
      <Route path="/Offers2" element={<OffersPage2 />} />
      <Route path="/Account/Profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

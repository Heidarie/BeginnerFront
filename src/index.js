import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./pages/Homepage/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/index";
import RegisterPage from "./pages/Register/index";
import OffersPage from "./pages/Offers";
import NotFoundPage from "./pages/NotFound/index";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/Profile/index";
import Feed from "./pages/Feed";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Register" element={<RegisterPage />} />
      <Route path="/Offers" element={<OffersPage />} />
      <Route path="/Feed" element={<Feed />} />
      <Route path="/Account/User/:id" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

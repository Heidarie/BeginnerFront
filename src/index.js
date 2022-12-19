import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./pages/Homepage/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/index";
import RegisterPage from "./pages/Register/index";
import OffersPage from "./pages/Offers/index.desktop";
import OfferPage from "./pages/Offer";
import NotFoundPage from "./pages/NotFound/index";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/Profile/index";
import EditProfile from "./pages/Profile/editProfile";
import Feed from "./pages/Feed";
import Modal from "./components/Modal";
import CreateOffer from "./pages/CreateOffer/index";
import Applications from "./pages/Applications/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Register" element={<RegisterPage />} />
      <Route path="/Offers" element={<OffersPage />} />
      <Route path="/Offers/Offer/:publicUrl" element={<OfferPage />} />
      <Route path="/Feed" element={<Feed />} />
      <Route path="/Account/User/:id" element={<ProfilePage />} />
      <Route path="/Account/User/Edit/:id" element={<EditProfile />} />
      <Route path="/Modal" element={<Modal />} />
      <Route path="/CreateOffer" element={<CreateOffer />} />
      <Route path="/Applications" element={<Applications />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

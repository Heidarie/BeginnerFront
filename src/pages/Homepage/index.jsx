import { useState, useEffect } from "react";
import Feed from "../Feed/index.jsx";
import FeedMobile from "../Feed/index.mobile.jsx";
import Offers from "../Offers/index.jsx";
import OffersMobile from "../Offers/index.mobile.jsx";
// import { classNames } from "../../utils";
const HomePage = () => {
  const [primary, setPrimary] = useState(1);

  const handleMobile = () => {
    if (window.innerWidth < 768) setPrimary(1);
  };

  useEffect(() => {
    window.addEventListener("resize", handleMobile);
  });
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-full grid md:grid-cols-2 ">
        <div onMouseOver={() => setPrimary(1)}>
          {primary === 1 ? (
            <div className="ease-out duration-300 hidden md:block md:w-9/12 absolute h-screen max-h-screen overflow-y-auto left-0 rounded-lg">
              <Feed />
            </div>
          ) : (
            <div className="ease-in duration-200 h-screen max-h-screen flex-col md:w-3/12 absolute left-0 opacity-50 rounded-lg">
              <FeedMobile />
            </div>
          )}
        </div>
        <div onMouseOver={() => setPrimary(2)}>
          {primary === 2 ? (
            <div className="ease-out duration-300 block md:w-9/12 absolute h-screen max-h-screen overflow-y-auto right-0 rounded-lg top-0">
              <Offers />
            </div>
          ) : (
            <div className="ease-in duration-200 h-screen max-h-screen flex-col md:w-3/12 absolute right-0 opacity-50 rounded-lg top-0">
              <OffersMobile />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;

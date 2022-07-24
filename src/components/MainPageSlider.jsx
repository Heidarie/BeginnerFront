import React, { useState, useEffect } from "react";
import Feed from "./Feed";
import OffersPage from "../pages/OffersPage";

const MainPageSlider = () => {
  const [primary, setPrimary] = useState(1);
  const handleMobile = () => {
    if (window.innerWidth < 768) setPrimary(1);
  };

  useEffect(() => {
    window.addEventListener("resize", handleMobile);
  });
  return (
    <div className="w-full h-full mx-auto text-center flex justify-center">
      <div className="max-w-full mx-auto grid md:grid-cols-2 gap-8">
        <div onMouseOver={() => setPrimary(1)}>
          {primary === 1 ? (
            <div className="w-full md:w-10/12 h-screen shadow-xl absolute left-0 p-4  hover:scale-100 duration-500 bg-yellow-300">
              <Feed />
            </div>
          ) : (
            <div className="hidden md:flex absolute h-screen left-0 w-0 sm:w-2/12 opacity-50 shadow-xl p-4 rounded-lg hover:scale-100 duration-500 bg-red-300">
              <Feed />
            </div>
          )}
        </div>
        <div onMouseOver={() => setPrimary(2)}>
          {primary === 2 ? (
            <div className="hidden md:flex w-full md:w-10/12 h-screen shadow-xl absolute right-0 rounded-lg hover:scale-100 duration-500 bg-white">
              <OffersPage />
            </div>
          ) : (
            <div className="hidden md:flex absolute h-screen right-0 w-0 sm:w-2/12 opacity-30 shadow-xl p-4  rounded-lg hover:scale-100 duration-500 bg-black overflow-clip">
              <OffersPage />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default MainPageSlider;

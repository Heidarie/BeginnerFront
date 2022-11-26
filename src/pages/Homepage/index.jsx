import { useState, useEffect } from "react";
import Feed from "../Feed/index";
import OffersPage2 from "../Offers/OffersPage2";
import { classNames } from "../../utils";
const HomePage = () => {
  const [primary, setPrimary] = useState(true);

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
          <div
            className={classNames(
              primary === 1
                ? "w-full md:w-10/12 absolute h-screen max-h-screen overflow-y-auto left-0 p-4 hover:scale-100 duration-500 bg-white"
                : "w-0 sm:w-2/12 absolute h-screen md:flex max-h-screen overflow-y-auto left-0 p-4 hover:scale-100 duration-500 bg-white opacity-50",
              ""
            )}
          >
            <Feed />
          </div>
        </div>
        <div onMouseOver={() => setPrimary(2)}>
          <div
            className={classNames(
              primary === 2
                ? "hidden md:flex w-full md:w-10/12 h-screen max-h-screen top-0 overflow-y-auto shadow-xl absolute right-0 rounded-lg hover:scale-100 duration-500 bg-white"
                : "hidden md:flex absolute h-screen right-0 w-0 sm:w-2/12 opacity-10 shadow-xl p-4 rounded-lg hover:scale-100 duration-500 bg-black overflow-clip",
              ""
            )}
          >
            <OffersPage2 />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;

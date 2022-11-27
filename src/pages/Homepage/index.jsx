import { useState, useEffect } from "react";
import Feed from "../Feed/index";
import OffersPage from "../Offers/OffersPage";
import { classNames } from "../../utils";
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
          <div
            className={classNames(
              primary === 1
                ? "hidden md:block md:w-9/12 absolute h-screen max-h-screen overflow-y-auto left-0 rounded-lg duration-500"
                : "flex-col md:w-3/12 absolute left-0 opacity-50 rounded-lg duration-500",
              "h-screen max-h-screen"
            )}
          >
            <Feed />
          </div>
        </div>
        <div onMouseOver={() => setPrimary(2)}>
          <div
            className={classNames(
              primary === 2
                ? "block md:w-9/12 absolute h-screen max-h-screen overflow-y-auto right-0 rounded-lg duration-500 top-0"
                : "flex-col md:w-3/12 absolute right-0 opacity-100 md:opacity-50 rounded-lg duration-500 top-0",
              "h-screen max-h-screen"
            )}
          >
            <OffersPage />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;

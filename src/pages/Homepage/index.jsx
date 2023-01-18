import { useState, useEffect } from "react";
import Feed from "../Feed/index.jsx";
import Offers from "../Offers/index";

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
      <div className="max-w-full grid md:grid-cols-2">
        <div onMouseOver={() => setPrimary(1)}>
          {primary === 1 ? (
            <div className="ease-in duration-500 lg:block xl:w-9/12 md:w-8/12 max-h-screen absolute overflow-auto left-0 rounded-lg">
              <Feed flag={true} />
            </div>
          ) : (
            <div className="ease-out duration-300 h-screen absolute overflow-hidden flex-col xl:w-3/12 md:w-4/12 left-0 opacity-0 hidden md:opacity-50 md:block rounded-lg top-0">
              <Feed flag={false} />
            </div>
          )}
        </div>
        <div onMouseOver={() => setPrimary(2)}>
          {primary === 2 ? (
            <div className="ease-in duration-500 xl:w-9/12 md:w-8/12 max-h-screen absolute overflow-auto right-0 rounded-lg top-0">
              <Offers flag={true} />
            </div>
          ) : (
            <div className="ease-out duration-300 h-screen absolute overflow-hidden flex-col xl:w-3/12 md:w-4/12 right-0 w-full opacity-100 md:opacity-50 rounded-lg top-0">
              <Offers flag={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;

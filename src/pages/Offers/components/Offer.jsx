import React from "react";
import { classNames } from "../../../utils/classNames";
import ScrollContainer from "react-indiana-drag-scroll";
import { Link, useLocation } from "react-router-dom";

const Offer = React.forwardRef((props, ref) => {
  const {
    companyName,
    city,
    level,
    profession,
    logoPath,
    salaryFrom,
    salaryTo,
    requirements,
    premium,
    publicUrl,
    title,
  } = props?.offer;
  let locationRoute = useLocation();
  let url = `/Offers/Offer/${publicUrl}`;
  if (!locationRoute.pathname) {
    url = `/Offer/${publicUrl}`;
  }
  return (
    <div
      ref={ref}
      className={classNames(
        premium
          ? "col-span-1 md:col-span-2 border-4 border-blue-200"
          : "col-span-1",
        `group w-full shadow-md  rounded-xl bg-white drop-shadow-2xl`
      )}
    >
      <div className="w-full bg-white rounded-md shadow-md"></div>
      <div className="w-full">
        <div className="text-right w-full -ml-2">
          <h3 className="text-[#00df9a] text-lg 2xl:text-2xl font-extrabold">
            {city}
          </h3>
        </div>
        <div className="grid grid-cols-6 xl:mb-4 md:grid-cols-1 my-4 justify-start md:justify-items-center items-center">
          <div className="col-span-1 w-full justify-center items-center">
            <div className="flex h-12 w-12 md:h-16 md:w-16 xl:h-24 xl:w-24 justify-start text-center md:justify-center items-center mx-auto">
              <img
                src={logoPath}
                key={`${logoPath}`}
                alt="ProfilePhoto"
                className="w-fit h-fit"
              />
            </div>
            <p className="ml-2 md:ml-0 mt-1 text-center text-md text-semibold text-black xl:text-2xl">
              {companyName}
            </p>
          </div>
          <div className="ml-2 -mt-5 md:m-0 2xl:mt-4 col-span-5 md:col-span-1 md:w-full p-1">
            <h2 className="font-bold text-black text-lg sm:text-md md:text-center xl:text-xl 2xl:text-2xl break-words lg:min-h-[6rem]">
              {title}
            </h2>
            <h2 className="font-semibold text-black text-lg sm:text-md md:text-center xl:text-xl 2xl:text-2xl">
              {profession}
            </h2>
            <h2 className="font-semibold text-md md:text-center text-black -mt-2 xl:mt-0 2xl:text-xl">
              {level}
            </h2>
          </div>
        </div>
        <div className="h-[13rem] md:h-[12rem]">
          <ScrollContainer
            horizontal="true"
            nativeMobileScroll="true"
            className="flex justify-start scroll-container bg-[#00df9881]"
          >
            <ul className="flex">
              {requirements &&
                requirements?.map((requirement, id) => {
                  return (
                    <li
                      className="outline-offset-2 outline-white p-3 text-sm xl:text-xl 2xl:text-2xl font-semibold text-black truncate"
                      key={requirement + id}
                    >
                      {requirement}
                    </li>
                  );
                })}
            </ul>
          </ScrollContainer>

          {/* <ScrollContainer className="hidden group-hover:block scroll-container h-[6rem] md:h-[10rem]">
            <div className="flex text-2xl flex-nowrap justify-start text-start  text-black p-2 -mt-2">
              {info}
            </div>
          </ScrollContainer> */}
        </div>
      </div>
      <div className="col-span-1 fixed inset-x-0 bottom-0 text-center mt-4 mb-2">
        <p className="w-full text-4xl md:text-2xl  font-extrabold text-gray-700 mb-2 mx-auto">
          {salaryFrom} - {salaryTo}
        </p>
        <button
          type="button"
          className="focus:outline-none text-white hover:text-black bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5"
        >
          <Link to={`${url}`}>Wyświetl ofertę</Link>
        </button>
      </div>
    </div>
  );
});

export default Offer;

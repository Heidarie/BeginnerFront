import React from "react";
import { classNames } from "../../../utils/classNames";
import ScrollContainer from "react-indiana-drag-scroll";
import { FaCameraRetro } from "react-icons/fa";
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
        premium ? "col-span-1 border-4 border-blue-200" : "col-span-1",
        `group flex flex-col justify-betweenoverflow-clip items-center rounded-xl bg-white drop-shadow-2xl`
      )}
    >
      <div className="w-full">
        <div className="text-right w-full -ml-2">
          <h3 className="text-[#00df9a] text-lg font-extrabold -mb-4">
            {city}
          </h3>
        </div>
        <div className="p-2 grid grid-cols-6 mb-2 justify-start items-center">
          <div className="col-span-1">
            <div className="justify-start text-center items-center">
              <img
                src={logoPath}
                key={`${logoPath}`}
                alt="ProfilePhoto"
                className="w-fit h-fit"
              />
            </div>
            <p className="mt-1 text-center text-md text-semibold text-black">
              {companyName}
            </p>
          </div>
          <div className="ml-2 -mt-5 col-span-5">
            <h2 className="font-bold text-lg text-black -mt-2 break-words">
              {title}
            </h2>
            <h2 className="font-semibold text-lg text-black">{profession}</h2>
            <h2 className="font-semibold text-md text-black -mt-2">{level}</h2>
          </div>
        </div>
        <div className="h-[12rem]">
          <ScrollContainer
            horizontal="true"
            nativeMobileScroll="true"
            className={classNames(
              requirements?.length < 6 ? "justify-center" : "justify-start",
              `group-hover:hidden scroll-container bg-[#00df9881] flex justify-start`
            )}
          >
            <ul className="flex">
              {requirements &&
                requirements?.map((requirement, id) => {
                  return (
                    <li
                      className="outline-offset-2 outline-white p-3 text-sm font-semibold text-black"
                      key={requirement + id}
                    >
                      {requirement}
                    </li>
                  );
                })}
            </ul>
          </ScrollContainer>
        </div>
      </div>
      <div className="col-span-1 fixed inset-x-0 bottom-0 text-center mt-4 mb-2">
        <p className="text-4xl font-extrabold text-gray-700 m-2">
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

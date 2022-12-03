import React from "react";
import { classNames } from "../../../utils/classNames";
import ScrollContainer from "react-indiana-drag-scroll";

const Offer = ({
  company,
  location,
  level,
  profession,
  from,
  to,
  benefits,
  info,
  premium,
}) => {
  return (
    <div
      className={classNames(
        premium ? "col-span-1 border-4 border-blue-200" : "col-span-1",
        `group flex flex-col justify-betweenoverflow-clip items-center rounded-xl bg-white drop-shadow-2xl`
      )}
    >
      <div className="w-full">
        <div className="text-right w-full -ml-2">
          <h3 className="text-[#00df9a] text-lg font-extrabold">{location}</h3>
        </div>
        <div className="p-2 grid grid-cols-6 mb-2 justify-start items-center">
          <div className="col-span-1">
            <div className="min-h-12 min-w-12 justify-start text-center  items-center">
              <img
                className="block"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="profileIcon"
              />
            </div>
            <p className="mt-1 text-center text-md text-semibold text-black">
              {company}
            </p>
          </div>
          <div className="ml-2 -mt-5col-span-5">
            <h2 className="font-bold text-xl text-black">{profession}</h2>
            <h2 className="font-semibold text-md text-black -mt-2">{level}</h2>
          </div>
        </div>
        <div className="h-[12rem] ">
          <ScrollContainer
            horizontal="true"
            nativeMobileScroll="true"
            className={classNames(
              benefits.length < 6 ? "justify-center" : "justify-start",
              `group-hover:hidden scroll-container bg-[#00df9881] flex justify-start`
            )}
          >
            <ul className="flex">
              {benefits &&
                benefits.map((benefit) => {
                  return (
                    <li
                      className="outline-offset-2 outline-white p-3 text-sm font-semibold text-black"
                      key={benefit}
                    >
                      {benefit}
                    </li>
                  );
                })}
            </ul>
          </ScrollContainer>

          <ScrollContainer className="hidden group-hover:block scroll-container h-[6rem]">
            <div className="flex text-2xl flex-nowrap justify-start text-start text-black p-2 -mt-2">
              {info}
            </div>
          </ScrollContainer>
        </div>
      </div>
      <div className="col-span-1 fixed inset-x-0 bottom-0 text-center mt-4 mb-2">
        <p className="text-4xl font-extrabold text-gray-700 m-2">
          {from} - {to}
        </p>
        <button
          type="button"
          className="focus:outline-none text-white hover:text-black bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5"
        >
          Wyświetl ofertę
        </button>
      </div>
    </div>
  );
};

export default Offer;

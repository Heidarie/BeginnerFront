import React from "react";
import { classNames } from "../../../utils/classNames";
import ScrollContainer from "react-indiana-drag-scroll";

const Offer3 = ({
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
        premium
          ? "col-span-1 md:col-span-2 border-4 border-blue-200"
          : "col-span-1",
        `group flex flex-col justify-between 2xl:block lg:justify-center overflow-clip items-center rounded-md bg-white  drop-shadow-2xl`
      )}
    >
      <div className="h-5/6 w-full">
        <div className="text-right w-full -ml-2">
          <h3 className="text-[#00df9a] text-lg 2xl:text-4xl font-extrabold">
            {location}
          </h3>
        </div>
        <div class="p-2 grid grid-cols-6 xl:mb-4 md:grid-cols-1 mb-2 justify-start md:justify-items-center items-center">
          <div className="col-span-1">
            <div className="min-h-12 min-w-12 xl:h-36 xl:w-36 justify-start text-center md:justify-center items-center">
              <img
                className="block"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="profileIcon"
              />
            </div>
            <p class="mt-1 text-center text-md text-semibold text-black xl:text-3xl">
              {company}
            </p>
          </div>
          <div class="ml-2 -mt-5 md:m-0 2xl:mt-4 col-span-5 md:col-span-1 md:w-full">
            <h2 class="font-bold text-xl sm:text-lg md:text-center  text-black 2xl:text-4xl">
              {profession}
            </h2>
            <h2 class="font-semibold text-md md:text-center text-black -mt-2 xl:mt-0 2xl:text-3xl">
              {level}
            </h2>
          </div>
        </div>
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
                    className="outline-offset-2 outline-white p-2 text-sm xl:text-xl 2xl:text-2xl font-semibold text-black"
                    key={benefit}
                  >
                    {benefit}
                  </li>
                );
              })}
          </ul>
        </ScrollContainer>

        <ScrollContainer className="hidden group-hover:block scroll-container max-h-[10rem]">
          <div className="flex text-2xl flex-nowrap justify-start text-start  text-black p-2">
            {info}
          </div>
        </ScrollContainer>
      </div>
      <div className="col-span-1 h-1/6 bottom-0 text-center  mb-2">
        <p className="text-4xl font-extrabold text-gray-700">
          {from} - {to}
        </p>
        <button
          type="button"
          className="focus:outline-none text-white hover:text-black bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5"
        >
          Aplikuj
        </button>
      </div>
    </div>
  );
};

export default Offer3;

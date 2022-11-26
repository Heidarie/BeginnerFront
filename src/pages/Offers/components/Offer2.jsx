import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { classNames } from "../../../utils/classNames";

const Offer2 = ({
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
          ? "col-span-1 md:col-span-2 border-8 border-yellow-300"
          : "col-span-1",
        `group w-full relative items-center m-6 rounded-3xl bg-gray-100 shadow-xl border-2`
      )}
    >
      <div className="group-hover:hidden">
        <div className="flex justify-center -mt-12 -mb-5">
          <img
            className="block h-24"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
            alt="Workflow"
          />
        </div>
        <div className="flex-row text-center justify-center p-2 text-black">
          <h1 className="text-lg lg:block w-auto font-bold mt-4">{company}</h1>
          <p>{location}</p>
        </div>
        <div className="flex-row text-center justify-center  border-t-8 border-[#00df9a] text-gray-700">
          <h1 className="bg-[#00df9a] -mt-2">{level}</h1>
          <h1 className="text-2xl lg:block w-auto font-bold text-black mb-2">
            {profession}
          </h1>
        </div>
        <div className="flex justify-center mb-3">
          <ScrollContainer className="scroll-container ">
            <ul className="flex flex-nowrap  content-between gap-3 w-[100%] mx-4 over">
              {benefits &&
                benefits.map((benefit) => {
                  return (
                    <li
                      className="bg-[#00df9a] shadow-xl p-2 text-sm font-bold rounded-lg text-black"
                      key={benefit}
                    >
                      {benefit}
                    </li>
                  );
                })}
            </ul>
          </ScrollContainer>
        </div>
        <div className="absolute bottom-0 w-[100%] text-center">
          <p className="text-4xl font-extrabold  md:text-5xl md:grid-cols-3 lg:text-6xl text-black capitalize  group-hover:text-gray-300">
            {from} - {to}
          </p>
          <button
            type="button"
            className="focus:outline-none text-white hover:text-black bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Aplikuj
          </button>
        </div>
      </div>
      <div className="hidden group-hover:block">
        <div className="flex justify-center -mt-12 ">
          <img
            className="block h-24"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
            alt="Workflow"
          />
        </div>
        <ScrollContainer className="hidden md:visible scroll-container">
          <div className="flex flex-nowrap justify-start text-start text-black max-h-[14rem] p-2">
            {info}
          </div>
        </ScrollContainer>
        <div className="absolute bottom-0 w-[100%] text-center">
          <h1 className="mx-2 text-center text-2xl text-black capitalize ">
            {from} - {to}
          </h1>
          <button
            type="button"
            className="focus:outline-none text-white hover:text-black bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Aplikuj
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offer2;

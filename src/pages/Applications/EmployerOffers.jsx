import React, { useState } from "react";
import Applicants from "./Applicants";
import { classNames } from "../../utils";

const EmployerOffers = ({ offerDetails }) => {
  const [visible, setVisible] = useState(false);
  console.log(offerDetails);
  const premium = false;

  return (
    <div className="flex flex-col items-center text-center justify-center">
      <div className="relative  rounded-lg bg-white text-left shadow-xl sm:w-full sm:max-w-7xl mt-[2rem] top-16">
        <div
          onClick={() => setVisible(!visible)}
          className={classNames(
            offerDetails.premium
              ? "col-span-1 border-4 border-blue-200"
              : "col-span-1",
            `group flex flex-col justify-betweenoverflow-clip items-center rounded-xl bg-white drop-shadow-2xl`
          )}
        >
          <div className="w-full">
            <div className="text-right w-full -ml-2">
              <h3 className="text-[#00df9a] text-lg font-extrabold -mb-4">
                {offerDetails.jobType}
              </h3>
            </div>
            <div className="p-2 grid grid-cols-6 mb-2 justify-start items-center">
              <div className="col-span-1">
                <div className="justify-start text-center items-center">
                  <img
                    className="block h-[7rem] w-[7rem] m-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                </div>
              </div>
              <div className="ml-2 -mt-5 col-span-5">
                <h2 className="font-bold text-lg text-black -mt-2 break-words">
                  {offerDetails.title}
                </h2>
                <h2 className="font-semibold text-lg text-black">
                  {offerDetails.profession}
                </h2>
                <h2 className="font-semibold text-md text-black -mt-2">
                  {offerDetails.level}
                </h2>
              </div>
            </div>
          </div>
        </div>
        {visible && <Applicants />}
      </div>
    </div>
  );
};

export default EmployerOffers;

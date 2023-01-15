import React, { useState } from "react";
import Applicants from "./Applicants";
import { classNames } from "../../utils";

const EmployerOffers = ({ offerDetails }) => {
  const [visible, setVisible] = useState(false);
  console.log(offerDetails);
  const premium = false;
  const test = {
    title: "TYTUŁ oferty",
    city: "Włocławek",
    salaryFrom: 100,
    salaryTo: 100,
    profession: "Python",
    occupation: "Backend Developer",
    level: "Intern",
    publicUrl: "TYTUŁ-oferty-MaciejCompany",
    isActive: true,
    participants: 1,
    daysLeft: 29,
  };
  return (
    <div className="flex flex-col items-center text-center justify-center">
      <div className="relative rounded-lg bg-white text-left shadow-xl sm:w-full sm:max-w-7xl mt-[2rem] top-16">
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
            <div className="grid grid-cols-6 m-auto justify-start p-4 items-center">
              <div className="col-span-1">
                <div className="justify-start text-center items-center">
                  <img
                    className="block h-[7rem] w-[7rem] m-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                </div>
              </div>
              <div className="ml-2 m-auto col-span-4">
                <h2 className="font-bold text-2xl text-black break-words">
                  Tytuł: {offerDetails.title}
                </h2>
                <h2 className="font-semibold text-lg text-black break-words">
                  Widełki: {offerDetails.salaryFrom} - {offerDetails.salaryTo}
                </h2>
                <h2 className="font-semibold text-lg text-black">
                  Zawód/Główny język: {offerDetails.occupation}/
                  {offerDetails.profession}
                </h2>
                <h2 className="font-semibold text-md text-black">
                  Lokalizacja: {offerDetails.city}
                </h2>
                <h2 className="font-semibold text-md text-black">
                  Poziom: {offerDetails.level}
                </h2>
              </div>
              <div className="col-span-1">
                <div className="justify-end text-center items-center">
                  <h2 className="font-bold text-lg text-green-500">
                    Oferta: {offerDetails.isActive ? "Aktywna" : "Zakończona"}
                  </h2>
                </div>
                <div className="justify-end text-center items-center">
                  <h2 className="font-semibold text-md text-black">
                    Dni pozostałe do zamknięcia oferty: {offerDetails.daysLeft}
                  </h2>
                </div>
                <div className="justify-end text-center items-center">
                  <h2 className="font-semibold text-md text-black">
                    Akutalnie zaaplikowało:
                    {offerDetails.participants}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        {visible && <Applicants publicUrl={offerDetails.publicUrl} />}
      </div>
    </div>
  );
};

export default EmployerOffers;

import React, { useState, useEffect } from "react";
import { ImLocation } from "react-icons/im";
import { MdOutlinePeopleAlt, MdOutlineHomeWork } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";
import Toast from "../../components/Toast";
import DataService from "../../components/data.service";
import EmployeeService from "../../components/employee.service";

const OfferPage = () => {
  let { publicUrl } = useParams();
  const [offer, setOffer] = useState(undefined);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [happyFlow, setHappyFlow] = useState(false);

  const getOfferDetails = (publicUrl) => {
    setLoading(true);
    if (publicUrl) {
      DataService.getOfferDetails(publicUrl).then((res) => {
        setOffer(res.data);
        setLoading(false);
      });
    } else {
      setLoading(false);
      setError(true);
    }
  };

  const apply = async (publicUrl) => {
    setLoading(true);
    if (publicUrl) {
      let { status, response } = await EmployeeService.applyOffer(publicUrl);
      if (status === 200) {
        setLoading(false);
        setHappyFlow(true);
      } else {
        setLoading(false);
        setError(true);
        setErrorMessage(response.data.message);
        setTimeout(() => {
          setErrorMessage("");
          setError(false);
        }, 3000);
      }
    }
  };

  useEffect(() => {
    getOfferDetails(publicUrl);
  }, [publicUrl]);
  console.log(offer);
  return (
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 mt-14">
      {offer && (
        <div className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl mt-8 sm:w-full sm:max-w-5xl ">
          <div className="bg-gray-100 px-2 py-2 sm:p-4 text-gray-700">
            Aplikujących {offer?.participants}
            <div className="overflow-hidden bg-white shadow sm:rounded-lg sm:max-w-6xl sm:w-full">
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6 break-words">
                <div className="mt-1 text-sm text-gray-900 sm:col-span-1 my-auto text-center">
                  {offer.employer.companyImagePath ? (
                    <img
                      src={offer.employer.companyImagePath}
                      key={`${offer.employer.companyImagePath}`}
                      alt="ProfilePhoto"
                      className="w-fit h-fit max-h-[150px] max-w-[150px] m-auto"
                    />
                  ) : (
                    <img
                      className="w-fit h-fit max-h-[150px] max-w-[150px] m-auto"
                      //src={offer?.employer?.companyImagePath}
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt={offer?.employer?.companyPublicUrl}
                    />
                  )}
                  <p className="text-lg sm:text-md font-semibold text-gray-700">
                    {offer?.employer?.companyName}
                  </p>
                  <div className="flex text-xl bg-[#00df9a] rounded-2xl max-w-[10rem] mx-auto font-semibold text-black mt-2">
                    <MdOutlineHomeWork className="m-auto h-8 w-8" />
                    <p className="max-w-[7rem] text-start m-auto -ml-4">
                      {offer?.jobType}
                    </p>
                  </div>
                </div>
                <div className="text-sm col-span-3 text-center sm:text-left max-w-full my-auto font-medium text-gray-700">
                  <p className="font-medium text-2xl leading-6 text-gray-900 capitalize break-words mt-5">
                    {offer?.title}
                  </p>
                  <div className="mt-5 max-w-full ">
                    <p className="text-xl font-bold w-fit text-white p-2 rounded-lg bg-[#00df9a] m-auto sm:m-0">
                      {offer?.development} / {offer?.profession}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="col-span-1 flex p-5 md:p-0 md:grid md:grid-rows-3 shadow-2xl bg-gray-100 gap-4 text-center overflow-hidden">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-2 sm:px-6">
                    <div className="text-sm m-auto font-medium text-gray-700">
                      <ImLocation className="w-8 h-8 m-auto" />
                    </div>
                    <div className="text-lg text-gray-900 text-center sm:col-span-2 sm:text-left my-auto justify-start break-words">
                      {offer?.city}
                      <p className="text-gray-700">
                        {offer?.offerDetails?.street}
                      </p>
                      <p className="text-gray-700">
                        {offer?.offerDetails?.postalCode}
                      </p>
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm m-auto font-medium text-gray-700">
                      <MdOutlinePeopleAlt className="w-8 h-8 m-auto" />
                    </div>
                    <div className="text-lg text-gray-900 text-center sm:col-span-2 sm:text-left my-auto justify-start">
                      {offer?.offerDetails?.companySize}
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm m-auto font-medium text-gray-700">
                      <FaMoneyBill className="w-8 h-8 m-auto" />
                    </div>
                    <div className="text-lg justify-center font-semibold text-[#00df9a] text-center sm:col-span-2 sm:text-left sm:my-auto sm:justify-start">
                      {offer?.salaryFrom} - {offer?.salaryTo} PLN
                    </div>
                  </div>
                </div>
                <div className="col-span-3 border-t border-gray-200">
                  <div>
                    <div className="bg-gray-50 my-auto sm:grid sm:grid-rows-2 sm:px-6">
                      <div className="text-sm p-2 sm:p-0 text-left my-auto font-medium text-gray-700">
                        Opis
                      </div>
                      <div className="p-2 mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 break-words">
                        {offer?.offerDetails?.description}
                      </div>
                    </div>
                    <div className="bg-gray-50 sm:grid sm:grid-rows-2 sm:px-6">
                      <div className="text-sm p-2 sm:p-0 text-left my-auto font-medium text-gray-700">
                        Wymagania
                      </div>
                      <div className="text-sm text-gray-900 sm:col-span-2 my-auto">
                        <ScrollContainer
                          horizontal="true"
                          nativeMobileScroll="true"
                          className="scroll-container flex justify-start scroll-container bg-[#00df9a]"
                        >
                          <ul className="flex">
                            {offer?.offerDetails?.requirements &&
                              offer?.offerDetails?.requirements?.map(
                                (requirement, id) => {
                                  return (
                                    <li
                                      className="outline-offset-2 outline-white p-3 text-sm xl:text-xl 2xl:text-2xl font-semibold text-black"
                                      key={requirement + id}
                                    >
                                      {requirement}
                                    </li>
                                  );
                                }
                              )}
                          </ul>
                        </ScrollContainer>
                      </div>
                    </div>
                    <div className="bg-gray-50 my-auto sm:grid sm:grid-rows-2 sm:px-6">
                      <div className="text-sm p-2 sm:p-0 text-left my-auto font-medium text-gray-700">
                        Języki
                      </div>
                      <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <ScrollContainer
                          horizontal="true"
                          nativeMobileScroll="true"
                          className="scroll-container flex justify-start scroll-container bg-[#00df9a]"
                        >
                          <ul className="flex">
                            {offer?.offerDetails?.languages &&
                              offer?.offerDetails?.languages?.map(
                                (language) => {
                                  return (
                                    <li
                                      className="outline-offset-2 outline-white p-3 text-sm xl:text-xl 2xl:text-2xl font-semibold text-black"
                                      key={language}
                                    >
                                      {language}
                                    </li>
                                  );
                                }
                              )}
                          </ul>
                        </ScrollContainer>
                      </div>
                    </div>
                    <div className="bg-gray-50 my-auto sm:grid sm:grid-rows-2 sm:px-6">
                      <div className="text-sm p-2 sm:p-0 text-left my-auto font-medium text-gray-700">
                        Obowiązki
                      </div>
                      <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <ScrollContainer className="scroll-container flex justify-start scroll-container bg-[#00df9a]">
                          <ul className="flex">
                            {offer?.offerDetails?.duties &&
                              offer?.offerDetails?.duties?.map((duty) => {
                                return (
                                  <li
                                    className="outline-offset-2 outline-white p-3 text-sm xl:text-xl 2xl:text-2xl font-semibold text-black"
                                    key={duty}
                                  >
                                    {duty}
                                  </li>
                                );
                              })}
                          </ul>
                        </ScrollContainer>
                      </div>
                    </div>
                    <div className="bg-gray-50 my-auto sm:grid sm:grid-rows-2 sm:px-6">
                      <div className="text-sm p-2 sm:p-0 text-left my-auto font-medium text-gray-700">
                        Benefity
                      </div>
                      <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <ScrollContainer
                          horizontal="true"
                          nativeMobileScroll="true"
                          className="scroll-container flex justify-start scroll-container bg-[#00df9a]"
                        >
                          <ul className="flex">
                            {offer?.offerDetails?.benefits &&
                              offer?.offerDetails?.benefits?.map((benefit) => {
                                return (
                                  <li
                                    className="outline-offset-2 outline-white p-3 text-sm xl:text-xl 2xl:text-2xl font-semibold text-black"
                                    key={benefit}
                                  >
                                    {benefit}
                                  </li>
                                );
                              })}
                          </ul>
                        </ScrollContainer>
                      </div>
                    </div>
                    <div className="bg-gray-100 shadow-2xl px-4 py-5 sm:gap-4 sm:px-6">
                      <div className="col-span-1 bottom-0 text-center m-auto">
                        {offer.canApply && !happyFlow ? (
                          <button
                            type="button"
                            onClick={() => {
                              apply(publicUrl);
                            }}
                            className="focus:outline-none text-white hover:text-black bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5"
                          >
                            APLIKUJ
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="focus:outline-none cursor-not-allowed text-white bg-gray-700  font-medium text-sm px-5 py-2.5"
                          >
                            Nie można aplikować
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && (
        <Toast
          text={
            errorMessage === "" || errorMessage === undefined
              ? "Wystąpił nieoczekiwany błąd"
              : errorMessage
          }
          icon="ERROR"
        />
      )}
      {loading && <Toast text="Ładowanie oferty" icon="LOADING" />}
      {happyFlow && (
        <Toast text="Udało się aplikować na ofertę!" icon="HAPPY" />
      )}
    </div>
  );
};

export default OfferPage;

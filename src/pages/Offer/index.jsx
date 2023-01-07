import React, { useState, useEffect } from "react";
import { ImLocation } from "react-icons/im";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";
import { useParams } from "react-router-dom";
import UserService from "../../components/user.service";
import ScrollContainer from "react-indiana-drag-scroll";
import Toast from "../../components/Toast";

const OfferPage = () => {
  let { publicUrl } = useParams();
  const [offer, setOffer] = useState(undefined);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [happyFlow, setHappyFlow] = useState(false);

  const getOfferDetails = (publicUrl) => {
    setLoading(true);
    if (publicUrl) {
      UserService.getOfferDetails(publicUrl).then((res) => {
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
      let res = await UserService.applyOffer(publicUrl);
      console.log(res);
      if (res.status === 200) {
        setLoading(false);
        setHappyFlow(true);
      } else {
        setLoading(false);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    }
  };

  useEffect(() => {
    getOfferDetails(publicUrl);
  }, [publicUrl]);

  return (
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 mt-14">
      {offer && (
        <div className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl mt-8 sm:w-full sm:max-w-5xl ">
          <div className="bg-gray-100 px-2 py-2 sm:p-4 text-gray-500">
            Participants {offer?.participants}
            <div className="overflow-hidden  bg-white shadow sm:rounded-lg sm:max-w-6xl sm:w-full">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6 break-words">
                  <dt className="mt-1 text-sm text-gray-900 sm:col-span-1 my-auto text-center">
                    <img
                      className="w-fit h-fit max-h-[150px] max-w-[150px] m-auto"
                      //src={offer?.employer?.companyImagePath}
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt={offer?.employer?.companyPublicUrl}
                    />
                    <p className="text-2xl font-semibold text-gray-500 py-2">
                      {offer?.employer?.companyName}
                    </p>
                    <p className="text-xl font-semibold text-gray-500">
                      {offer?.jobType}
                    </p>
                  </dt>
                  <dd className="text-sm col-span-3 text-center sm:text-left max-w-full my-auto font-medium text-gray-500 m-auto">
                    <p className="font-medium text-2xl leading-6 text-gray-900  capitalize break-words">
                      {offer?.title}
                    </p>
                    <div className="mt-1 max-w-full py-1">
                      <p className="text-2xl font-bold w-fit text-white p-2 rounded-lg bg-[#00df9a] py-1 m-auto sm:m-0">
                        Profession {offer?.profession}
                      </p>
                    </div>
                  </dd>
                </div>
              </dl>
              <div className="grid grid-cols-3 px-4 py-5 sm:px-6 text-center overflow-hidden ">
                <div className="bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm m-auto font-medium text-gray-500">
                    <ImLocation className="w-8 h-8 m-auto" />
                  </dt>
                  <dd className="text-lg text-gray-900 text-center sm:col-span-2 sm:text-left my-auto justify-start break-words">
                    {offer?.city}
                    <p className="text-gray-500">
                      {offer?.offerDetails?.street}
                    </p>
                    <p className="text-gray-700">
                      {offer?.offerDetails?.postalCode}
                    </p>
                  </dd>
                </div>
                <div className="bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm m-auto font-medium text-gray-500">
                    <MdOutlinePeopleAlt className="w-8 h-8 m-auto" />
                  </dt>
                  <dd className="text-lg text-gray-900 text-center sm:col-span-2 sm:text-left my-auto justify-start">
                    {offer?.offerDetails?.companySize}
                  </dd>
                </div>
                <div className="bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm m-auto font-medium text-gray-500">
                    <FaMoneyBill className="w-8 h-8 m-auto" />
                  </dt>
                  <dd className="text-lg justify-center font-semibold text-[#00df9a] text-center sm:col-span-2 sm:text-left sm:my-auto sm:justify-start">
                    {offer?.salaryFrom} - {offer?.salaryTo} PLN
                  </dd>
                </div>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
                    <dt className="text-sm text-left my-auto font-medium text-gray-500">
                      Requirements
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ScrollContainer
                        horizontal="true"
                        nativeMobileScroll="true"
                        className="scroll-container flex justify-start scroll-container bg-[#00df9881]"
                      >
                        <ul className="flex">
                          {offer?.offerDetails?.requirements &&
                            offer?.offerDetails?.requirements?.map(
                              (requirement) => {
                                return (
                                  <li
                                    className="outline-offset-2 outline-white p-3 text-sm xl:text-xl 2xl:text-2xl font-semibold text-black"
                                    key={requirement}
                                  >
                                    {requirement}
                                  </li>
                                );
                              }
                            )}
                        </ul>
                      </ScrollContainer>
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
                    <dt className="text-sm text-left my-auto font-medium text-gray-500">
                      Languages
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ScrollContainer
                        horizontal="true"
                        nativeMobileScroll="true"
                        className="scroll-container flex justify-start scroll-container bg-[#00df9881]"
                      >
                        <ul className="flex">
                          {offer?.offerDetails?.languages &&
                            offer?.offerDetails?.languages?.map((language) => {
                              return (
                                <li
                                  className="outline-offset-2 outline-white p-3 text-sm xl:text-xl 2xl:text-2xl font-semibold text-black"
                                  key={language}
                                >
                                  {language}
                                </li>
                              );
                            })}
                        </ul>
                      </ScrollContainer>
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
                    <dt className="text-sm text-left my-auto font-medium text-gray-500">
                      Duties
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ScrollContainer className="scroll-container flex justify-start scroll-container bg-[#00df9881]">
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
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm text-left my-auto font-medium text-gray-500">
                      Opis
                    </dt>
                    <dd className="p-2 mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 break-words">
                      {offer?.offerDetails?.description}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:gap-4 sm:px-6">
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
                </dl>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && (
        <Toast text="Wystąpił bład przy aplikowaniu na ofertę" icon="ERROR" />
      )}
      {loading && <Toast text="Ładowanie oferty" icon="LOADING" />}
      {happyFlow && (
        <Toast text="Udało się aplikować na ofertę!" icon="HAPPY" />
      )}
    </div>
  );
};

export default OfferPage;

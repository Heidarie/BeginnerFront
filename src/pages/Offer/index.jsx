import React, { useState, useEffect } from "react";
import { FiPaperclip } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";
import { useParams } from "react-router-dom";
import UserService from "../../components/user.service";
import ScrollContainer from "react-indiana-drag-scroll";

const OfferPage = () => {
  let { publicUrl } = useParams();
  const [offer, setOffer] = useState(undefined);
  const [buttonState, setButtonState] = useState("");

  const getOfferDetails = (publicUrl) => {
    if (publicUrl) {
      UserService.getOfferDetails(publicUrl).then((res) => {
        setOffer(res.data);
      });
    }
  };

  const apply = async (publicUrl) => {
    if (publicUrl) {
      setButtonState("Aplikowanie...");
      const res = await UserService.applyOffer(publicUrl);
      console.log(res);
      if (res.status === 200) {
        setButtonState("Zaaplikowano");
      } else {
        setButtonState("Wystąpił błąd");
        await new Promise((resolve) => {
          return setTimeout(resolve, 2000);
        });
        setButtonState("");
      }
    }
  };

  useEffect(() => {
    getOfferDetails(publicUrl);
  }, [publicUrl]);
  console.log(offer);
  return (
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 mt-14">
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
                  <GrLocation className="w-8 h-8 m-auto" />
                </dt>
                <dd className="text-lg text-gray-900 text-center sm:col-span-2 sm:text-left my-auto justify-start break-words">
                  {offer?.city}
                  <p className="text-gray-500">{offer?.offerDetails?.street}</p>
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
                          offer?.offerDetails?.requirements.map(
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
                          offer?.offerDetails?.languages.map((language) => {
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
                          offer?.offerDetails?.duties.map((duty) => {
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
                    {buttonState === "" && (
                      <button
                        type="button"
                        onClick={() => {
                          apply(publicUrl);
                        }}
                        className="focus:outline-none text-white hover:text-black bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5"
                      >
                        APLIKUJ
                      </button>
                    )}
                    {buttonState === "Wystąpił błąd" && (
                      <button
                        type="button"
                        className="focus:outline-none text-white hover:text-black bg-red-600 focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5"
                      >
                        Wystąpił błąd
                      </button>
                    )}
                    {buttonState === "Zaaplikowano" && (
                      <button
                        type="button"
                        className="focus:outline-none disabled text-white hover:text-black bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5"
                      >
                        Zaaplikowano
                      </button>
                    )}
                    {buttonState === "Aplikowanie..." && (
                      <button
                        type="button"
                        className="focus:outline-none disabled  font-medium text-sm px-5 py-2.5"
                      >
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#00df9a]"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferPage;

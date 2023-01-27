import React, { useState, useEffect } from "react";
import { FiPaperclip } from "react-icons/fi";
import { ImCheckmark, ImCross } from "react-icons/im";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import Toast from "../../components/Toast";
import EmployerService from "../../components/employer.service";

const Applicants = ({ publicUrl, hasCv }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [solidApplicants, setSolidApplicants] = useState([]);

  const getOfferApplicants = async () => {
    setLoading(true);
    const { status, data, response } = await EmployerService.getApplicants(
      publicUrl
    );
    if (status === 200 || status === 201) {
      setLoading(false);
      setApplicants(data);
      setSolidApplicants(data);
    } else {
      setLoading(false);
      setError(true);
      setErrorMessage(response?.data?.message);
      setTimeout(() => {
        setErrorMessage("");
        setError(false);
      }, 3000);
    }
  };

  const stopOffer = async () => {
    setLoading(true);
    const { status, data, response } = await EmployerService.getApplicants(
      publicUrl
    );
    if (status === 200 || status === 201) {
      setLoading(false);
      setApplicants(data);
      setSolidApplicants(data);
    } else {
      setLoading(false);
      setError(true);
      setErrorMessage(response?.data?.message);
      setTimeout(() => {
        setErrorMessage("");
        setError(false);
      }, 3000);
    }
  };

  const filterOfferApplicants = () => {
    if (hasCv === true) {
      const newApplicants = applicants?.filter(
        (applicant) => applicant.hasResumee === hasCv
      );
      setApplicants(newApplicants);
    } else {
      setApplicants(solidApplicants);
    }
  };

  const handleApplicant = async (
    offerPublicUrl,
    employeePublicUrl,
    resultFlag
  ) => {
    //1-Accept 2-Decline
    setLoading(true);
    const { status, response } = await EmployerService.postApplicantResult(
      offerPublicUrl,
      employeePublicUrl,
      resultFlag
    );
    if (status === 200 || status === 201) {
      setLoading(false);
      if (resultFlag === 1) {
        const newApplicants = applicants?.map((applicant) => {
          if (applicant.publicUrl === employeePublicUrl) {
            return { ...applicant, isAccepted: true };
          } else {
            return applicant;
          }
        });
        setApplicants(newApplicants);
      } else {
        setApplicants(
          applicants?.filter(
            (applicant) => applicant.publicUrl !== employeePublicUrl
          )
        );
      }
    } else {
      setLoading(false);
      setError(true);
      setErrorMessage(response?.data?.message);
      setTimeout(() => {
        setErrorMessage("");
        setError(false);
      }, 3000);
    }
  };
  const downloadResumee = async (publicUrl, applicationid, fileName) => {
    setLoading(true);
    const { data, status, response } = await EmployerService.getUserResumee(
      publicUrl,
      applicationid
    );
    if (status === 200 || status === 201) {
      setLoading(false);
      const fileURL = window.URL.createObjectURL(new Blob([data]), {
        type: "application/octet-stream",
      });
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", `${fileName}.pdf`);
      document.body.appendChild(link);
      link.click();
    } else {
      setLoading(false);
      setError(true);
      setErrorMessage(response?.data?.message);
      setTimeout(() => {
        setErrorMessage("");
        setError(false);
      }, 3000);
    }
  };
  useEffect(() => {
    getOfferApplicants();
  }, []);

  useEffect(() => {
    filterOfferApplicants(hasCv);
  }, [hasCv]);

  return (
    <>
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper w-full max-h-fit max-w-lg sm:max-w-7xl"
      >
        {applicants?.map((applicant) => (
          <SwiperSlide
            key={applicant.applicationId}
            className="text-center justify-center flex"
          >
            <div className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl my-4 w-full max-w-5xl ">
              <div className="bg-gray-100 px-2 py-2 p-4 ">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg max-w-6xl w-full">
                  <div className="grid grid-cols-3 px-4 py-5 sm:px-6">
                    <div className="col-span-2">
                      <img
                        src={applicant.imagePath}
                        key={`${applicant?.imagePath}`}
                        alt="ProfilePhoto"
                        className="inline-block h-12 w-12 m-auto rounded-full ring-2 ring-[#00df9a] "
                      />
                      <Link to={`/Account/User/${applicant?.publicUrl}`}>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          {applicant?.name} {applicant?.surname}
                        </h3>
                      </Link>

                      <p className="mt-1 max-w-2xl text-sm text-gray-700">
                        Dane szczegółowe dotyczące aplikanta.
                      </p>
                    </div>

                    {applicant?.isAccepted ? (
                      <div className="col-span-1 text-end text-green-500 text-2xl font-extrabold">
                        <h2>Został zaakceptowany</h2>
                      </div>
                    ) : (
                      <div className="col-span-1 text-end">
                        <button
                          onClick={() =>
                            handleApplicant(publicUrl, applicant?.publicUrl, 1)
                          }
                          type="button"
                          className="flex focus:outline-none min-w-[9rem] max-w-[9rem] m-auto text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                          <ImCheckmark className="my-auto mr-3" />
                          Akceptuj
                        </button>

                        <button
                          onClick={() =>
                            handleApplicant(publicUrl, applicant?.publicUrl, 2)
                          }
                          type="button"
                          className="flex focus:outline-none min-w-[9rem] max-w-[9rem] m-auto text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                          <ImCross className="my-auto mr-3" />
                          Odrzuć
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-700">
                          Imię i nazwisko
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <Link to={`/Account/User/${applicant.publicUrl}`}>
                            {applicant?.name} {applicant?.surname}
                          </Link>
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-700">
                          Zawód
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {applicant?.occupation === null ||
                          applicant?.occupation === undefined
                            ? "Brak podanego zawodu"
                            : applicant?.occupation}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-700">
                          Email
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {applicant?.email === null ||
                          applicant?.email === undefined
                            ? "Brak podanego maila"
                            : applicant?.email}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-700">
                          Edukacja
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {applicant?.latestEducation === null ||
                          applicant?.latestEducation === undefined
                            ? "Brak podanego wykształcenia"
                            : applicant?.latestEducation}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-700">
                          Wykształcenie
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {applicant?.latestExperience === null ||
                          applicant?.latestExperience === undefined
                            ? "Brak podanego doświadczenia"
                            : applicant?.latestExperience}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-700">
                          Opis
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {applicant?.description === null ||
                          applicant?.description === undefined
                            ? "Brak podanego opisu"
                            : applicant?.description}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-700 my-auto">
                          Załączniki
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                            {applicant?.hasResumee ? (
                              <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm ">
                                <div className="flex w-0 flex-1 items-center">
                                  <FiPaperclip
                                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span className="ml-2 w-0 flex-1 truncate">
                                    {applicant?.name}.{applicant?.surname}.pdf
                                  </span>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <p
                                    onClick={() =>
                                      downloadResumee(
                                        applicant?.publicUrl,
                                        applicant?.applicationId,
                                        `${applicant?.name}.${applicant?.surname}`
                                      )
                                    }
                                    className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                                  >
                                    Download
                                  </p>
                                </div>
                              </li>
                            ) : (
                              <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                Brak załączników
                              </li>
                            )}
                          </ul>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
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
      {loading && <Toast text="Ładowanie twoich ofert." icon="LOADING" />}
    </>
  );
};

export default Applicants;

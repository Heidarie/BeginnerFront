import React, { useRef, useState, useEffect } from "react";
import { FiPaperclip } from "react-icons/fi";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import Toast from "../../components/Toast";
import EmployerService from "../../components/employer.service";
import { FaCameraRetro } from "react-icons/fa";

const Applicants = ({ publicUrl }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [happyFlow, setHappyFlow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [applicants, setApplicants] = useState([]);

  const getEmployerOffers = () => {
    setLoading(true);
    EmployerService.getApplicants(publicUrl).then((res) => {
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        setLoading(false);
        setApplicants(res.data);
      } else {
        setLoading(false);
        setError(true);
        setErrorMessage(res.response.data.message);
        setTimeout(() => {
          setErrorMessage("");
          setError(false);
        }, 3000);
      }
    });
  };

  useEffect(() => {
    getEmployerOffers();
  }, []);

  console.log(applicants);
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
        {applicants.map((applicant) => (
          <SwiperSlide
            key={applicant.applicationId}
            className="text-center justify-center flex"
          >
            <div className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl my-4 w-full max-w-5xl ">
              <div className="bg-gray-100 px-2 py-2 p-4 ">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg max-w-6xl w-full">
                  <div className="px-4 py-5 sm:px-6">
                    {applicant?.imagePath &&
                    !applicant?.imagePath.includes("no_image") ? (
                      <img
                        src={applicant.imagePath}
                        key={`${applicant?.imagePath}`}
                        alt="ProfilePhoto"
                        className="inline-block h-12 w-12 m-auto rounded-full ring-2 ring-[#00df9a] "
                      />
                    ) : (
                      <FaCameraRetro className="inline-block h-12 w-12 m-auto rounded-full ring-2 ring-[#00df9a] " />
                    )}
                    <Link to={`/Account/User/${applicant?.publicUrl}`}>
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        {applicant?.name} {applicant?.surname}
                      </h3>
                    </Link>

                    <p className="mt-1 max-w-2xl text-sm text-gray-700">
                      Dane szczegółowe dotyczące aplikanta.
                    </p>
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
                      {/* <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-700">
                          Zawód
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          Backend Developer
                        </dd>
                      </div> */}
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-700">
                          Email
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {applicant?.email}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-700">
                          Edukacja
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {applicant?.latestEducation !== null
                            ? applicant.latestEducation
                            : "Brak wykształcenia"}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-700">
                          Wykształcenie
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {applicant?.latestExperience}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-700">
                          Opis
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          Fugiat ipsum ipsum deserunt culpa aute sint do nostrud
                          anim incididunt cillum culpa consequat. Excepteur qui
                          ipsum aliquip consequat sint. Sit id mollit nulla
                          mollit nostrud in ea officia proident. Irure nostrud
                          pariatur mollit ad adipisicing reprehenderit deserunt
                          qui eu.
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-700 my-auto">
                          Załączniki
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                            {applicant?.hasResume ? (
                              <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                <div className="flex w-0 flex-1 items-center">
                                  <FiPaperclip
                                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span className="ml-2 w-0 flex-1 truncate">
                                    resume_back_end_developer.pdf
                                  </span>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <a
                                    href="#a"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Download
                                  </a>
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
      {happyFlow && <Toast text="Udało się utworzyć ofertę!" icon="HAPPY" />}
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

import React, { useState, useEffect } from "react";
import Toast from "../../../components/Toast";
import { Link, useParams } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import EditProfile from "./editProfile";
import CreateOffer from "../../CreateOffer/index";
import DataService from "../../../components/data.service";

const EmployerProfile = () => {
  let { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editProfile, setEditProfile] = useState(false);
  const [createOffer, setCreateOffer] = useState(false);
  const [employer, setEmployer] = useState(undefined);

  const hideModal = () => {
    setEditProfile(false);
    setCreateOffer(false);
  };

  const getEmployer = async (id) => {
    setLoading(true);
    if (id) {
      let { status, data, response } = await DataService.getEmployerProfile(id);
      if (status === 200) {
        setEmployer(data);
        setLoading(false);
      } else {
        setLoading(false);
        setError(true);
        setErrorMessage(response?.message);
        setTimeout(() => {
          setErrorMessage("");
          setError(false);
        }, 3000);
      }
    }
  };

  useEffect(() => {
    getEmployer(id);
  }, [id]);

  return (
    <div>
      <div className="mx-auto mt-20 max-w-fit md:max-w-8xl">
        <div className="grid grid-cols-6 max-w-8xl rounded-lg border border-gray-200/80 bg-white p-6">
          <div className="col-span-1">
            <img
              className="max-w-40 max-h-40 rounded-md object-cover"
              src={employer?.image}
              alt="User"
            />
            <div
              className="absolute -right-3 h-5 w-5 top-2 rounded-full border-4 border-white bg-green-400 visible"
              title="User is online"
            ></div>
          </div>

          <div className="col-span-3 px-6">
            <div className="flex h-8 flex-row">
              <h2 className="text-lg font-semibold">{employer?.companyName}</h2>

              <svg
                className="my-auto ml-2 h-5 fill-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
              </svg>
            </div>

            <div className="flex flex-row">
              <div className="flex flex-row">
                <svg
                  className="mr-2 h-4 w-4 fill-gray-500/80"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,14.25 12,22 12,22C12,22 5,14.25 5,9A7,7 0 0,1 12,2M12,4A5,5 0 0,0 7,9C7,10 7,12 12,18.71C17,12 17,10 17,9A5,5 0 0,0 12,4Z" />
                </svg>

                <div className="text-xs text-gray-400/80 hover:text-gray-400">
                  {employer?.city !== null &&
                  employer?.employerPersonalData?.street !== null
                    ? `${employer?.employerPersonalData?.street}, ${employer?.city}, ${employer?.employerPersonalData?.postalCode}`
                    : "MIASTO"}
                </div>
              </div>
            </div>

            <div className="flex max-w-md md:block md:max-w-2xl">
              <h4 className="text-md text-gray-400/80 hover:text-gray-400">
                {employer?.employerPersonalData?.description}
              </h4>
            </div>
          </div>

          <div className="col-span-2 ">
            <div className="grid grid-cols-1 space-x-3 text-end justify-end">
              {employer?.isLoggedInUserAccount ? (
                <div className="col-span-1 text-end">
                  <button
                    onClick={() => setCreateOffer(true)}
                    className="flex focus:outline-none min-w-[9rem] max-w-[9rem] m-auto text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    <HiOutlinePlus className="w-5 h-5 m-auto mr-2" />
                    Stwórz ofertę
                  </button>
                  {createOffer && <CreateOffer hideModal={hideModal} />}
                  <button
                    onClick={() => setEditProfile(true)}
                    className="flex focus:outline-none min-w-[9rem] max-w-[9rem] m-auto text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg  dark:bg-yellow-400 dark:hover:bg-yellow-400 dark:focus:ring-yellow-500"
                  >
                    <MdOutlineModeEditOutline className="w-5 h-5 m-auto text-black mr-2" />
                    Edytuj profil
                  </button>
                  {editProfile && (
                    <EditProfile
                      hideModal={hideModal}
                      editProfileData={employer}
                    />
                  )}
                </div>
              ) : (
                <button className="flex rounded-md bg-blue-500 py-2 px-4 text-white transition-all duration-150 ease-in-out hover:bg-blue-600">
                  <HiOutlinePlus className="w-5 h-5 m-auto mr-2" />
                  Follow
                </button>
              )}
            </div>
          </div>
        </div>
        <div className=" mt-2 flex items-center justify-center text-center space-x-5 max-w-8xl">
          <span className="flex h-20 w-40 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
            <div className="flex flex-row items-center justify-center">
              <RiFileList3Line className="h-6 w-6 mr-3 fill-gray-500/95" />
              <span className="font-bold text-gray-600">
                {employer?.offersNumber}
              </span>
            </div>

            <Link to="/Applications">
              <div className="mt-2 text-sm text-gray-400">Oferty</div>
            </Link>
          </span>

          <span className="flex h-20 w-40 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
            <div className="flex flex-row items-center justify-center">
              <svg
                className="mr-3 fill-gray-500/95"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M2.5 19.6L3.8 20.2V11.2L1.4 17C1 18.1 1.5 19.2 2.5 19.6M15.2 4.8L20.2 16.8L12.9 19.8L7.9 7.9V7.8L15.2 4.8M15.3 2.8C15 2.8 14.8 2.8 14.5 2.9L7.1 6C6.4 6.3 5.9 7 5.9 7.8C5.9 8 5.9 8.3 6 8.6L11 20.5C11.3 21.3 12 21.7 12.8 21.7C13.1 21.7 13.3 21.7 13.6 21.6L21 18.5C22 18.1 22.5 16.9 22.1 15.9L17.1 4C16.8 3.2 16 2.8 15.3 2.8M10.5 9.9C9.9 9.9 9.5 9.5 9.5 8.9S9.9 7.9 10.5 7.9C11.1 7.9 11.5 8.4 11.5 8.9S11.1 9.9 10.5 9.9M5.9 19.8C5.9 20.9 6.8 21.8 7.9 21.8H9.3L5.9 13.5V19.8Z" />
              </svg>

              <span className="font-bold text-gray-600"> 45 </span>
            </div>

            <div className="mt-2 text-sm text-gray-400">Projects</div>
          </span>

          <span className="flex h-20 w-40 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
            <div className="flex flex-row items-center justify-center">
              <svg
                className="mr-3 fill-gray-500/95"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M5.68,19.74C7.16,20.95 9,21.75 11,21.95V19.93C9.54,19.75 8.21,19.17 7.1,18.31M13,19.93V21.95C15,21.75 16.84,20.95 18.32,19.74L16.89,18.31C15.79,19.17 14.46,19.75 13,19.93M18.31,16.9L19.74,18.33C20.95,16.85 21.75,15 21.95,13H19.93C19.75,14.46 19.17,15.79 18.31,16.9M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12M4.07,13H2.05C2.25,15 3.05,16.84 4.26,18.32L5.69,16.89C4.83,15.79 4.25,14.46 4.07,13M5.69,7.1L4.26,5.68C3.05,7.16 2.25,9 2.05,11H4.07C4.25,9.54 4.83,8.21 5.69,7.1M19.93,11H21.95C21.75,9 20.95,7.16 19.74,5.68L18.31,7.1C19.17,8.21 19.75,9.54 19.93,11M18.32,4.26C16.84,3.05 15,2.25 13,2.05V4.07C14.46,4.25 15.79,4.83 16.9,5.69M11,4.07V2.05C9,2.25 7.16,3.05 5.68,4.26L7.1,5.69C8.21,4.83 9.54,4.25 11,4.07Z" />
              </svg>

              <span className="font-bold text-gray-600"> 120K </span>
            </div>

            <div className="mt-2 text-sm text-gray-400">Downloads</div>
          </span>
        </div>
        {/* <div className="flex flex-col">
          <h2 className="my-2 text-2xl font-bold">STATYSTKI</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                <BiMessageDetail className="h-6 w-6 text-blue-400" />
              </div>

              <div className="ml-4">
                <h2 className="font-semibold">574 New Messages</h2>
                <p className="mt-2 text-sm text-gray-700">
                  Last message 4 days ago
                </p>
              </div>
            </div>

            <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              <div className="ml-4">
                <h2 className="font-semibold">1823 Users</h2>
                <p className="mt-2 text-sm text-gray-700">
                  Last checked 3 days ago
                </p>
              </div>
            </div>
            <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-red-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              <div className="ml-4">
                <h2 className="font-semibold">548 Posts</h2>
                <p className="mt-2 text-sm text-gray-700">
                  Last authored 1 day ago
                </p>
              </div>
            </div>
            <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>

              <div className="ml-4">
                <h2 className="font-semibold">129 Comments</h2>
                <p className="mt-2 text-sm text-gray-700">
                  Last commented 8 days ago
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {loading && <Toast text="Ładowanie" icon="LOADING" />}
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
    </div>
  );
};

export default EmployerProfile;

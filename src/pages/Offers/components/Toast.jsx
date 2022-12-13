import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Toast = ({ text, icon }) => {
  return (
    <div
      id="toast-default"
      className="absolute left-5 bottom-5 z-10 flex items-center p-4 w-full max-w-fit text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-blue-500 rounded-lg">
        {icon === "LOADING" && (
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
            <span className="sr-only">{`...${text}`}</span>
          </div>
        )}
        {icon === "ERROR" && (
          <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-orange-500 bg-red-700 rounded-lg ">
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Warning icon</span>
          </div>
        )}
        {icon === "HAPPY" && (
          <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg ">
            <img
              src="https://www.svgrepo.com/show/406848/party-popper.svg"
              className="w-8 h-8"
              alt="Party Popper SVG Vector"
              title="Party Popper SVG Vector"
            ></img>
            <span className="sr-only">Warning icon</span>
          </div>
        )}
      </div>
      <div className="ml-3 text-sm md:text-xl font-normal">{text}</div>
    </div>
  );
};

export default Toast;

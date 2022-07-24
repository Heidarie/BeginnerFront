import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-full w-full bg-white flex items-center md:h-screen ">
      <div className="container flex flex-col gap-4 md:flex-row md:max-w-full lg:max-w-full lg:grid-cols-2 lg:mx-5 lg:col-span-2 items-center  px-5 mt-5 text-gray-700">
        <div className="w-full">
          <div className="text-7xl text-green-500 font-dark font-extrabold mb-8">
            <p>404</p>
          </div>
          <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
            Przepraszamy, ale nie mogliśmy znaleźć strony, której szukasz.
          </p>
          <Link
            to="/"
            className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-black active:bg-[#00df9a] hover:bg-[#00df9a]"
          >
            Na początek?
          </Link>
        </div>
        <div>
          <img
            className="w-full"
            src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
            alt="Page not found"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;

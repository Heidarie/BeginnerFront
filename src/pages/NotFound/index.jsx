import React from "react";
import { Link } from "react-router-dom";

const NotFound = ({ message, code }) => {
  return (
    <div className="flex h-screen w-screen justify-center items-center bg-gray-100">
      <div className="m-auto">
        <div className="container flex flex-col gap-4">
          <div className="w-full">
            <div className="text-7xl text-green-500 font-dark font-extrabold mb-8">
              {code ? <p>{code}</p> : <p>404</p>}
            </div>
            {message ? (
              <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
                {message}
              </p>
            ) : (
              <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
                Przepraszamy, ale nie mogliśmy znaleźć strony, której szukasz.
              </p>
            )}
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
    </div>
  );
};

export default NotFound;

import { useState } from "react";
import RegisterEmployee from "./registerEmployee";
import RegisterEmployer from "./registerEmployer";
import Footer from "../../components/Footer";
import loginBg from "../../assets/loginBg.png";

function Register() {
  const [view, setView] = useState("basic");
  return (
    <div className="bg-white dark:bg-gray-900 text-white">
      <div className="flex justify-center h-screen w-full">
        <div className="w-screen bg-cover lg:block lg:w-full">
          <div
            className="block lg:flex items-center bg-cover w-full h-100% lg:h-screen justify-center px-20 bg-gray-900 bg-opacity-40"
            style={{ backgroundImage: `url(${loginBg})` }}
          >
            <div className="flex items-center justify-center w-full max-w-md px-6 mx-auto lg:w-2/6">
              <div className="flex-1">
                <div className="flex justify-between mb-4 bg-gray-800 rounded-2xl">
                  <button
                    className="m-2 text-2xl text-white bg-gray-800 rounded-lg px-3 p-1"
                    onClick={() => setView("basic")}
                    style={{ color: view === "basic" ? "#00df9a" : "" }}
                  >
                    Employee
                  </button>
                  <button
                    className="m-2 text-2xl text-white bg-gray-800 rounded-lg px-3 p-1 "
                    onClick={() => setView("advanced")}
                    style={{ color: view === "advanced" ? "#00df9a" : "" }}
                  >
                    Employer
                  </button>
                </div>
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                    Beginner.
                  </h2>

                  <p className="mt-3 text-gray-500 dark:text-gray-300">
                    Sign up to create account.
                  </p>
                </div>
                {view === "basic" ? <RegisterEmployee /> : <RegisterEmployer />}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Register;

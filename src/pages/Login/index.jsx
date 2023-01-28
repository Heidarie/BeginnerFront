import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../../assets/loginBg.png";
import Footer from "../../components/Footer";
import CustomInput from "../../components/form/CustomInput";
import CustomLoginInput from "../../components/form/CustomLoginInput";
import { Form, Formik, Field } from "formik";
import AuthService from "../../components/auth.service";
import Toast from "../../components/Toast";
import DataService from "../../components/data.service";

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSubmit = async (values, actions) => {
    setLoading(true);
    let { status, data, response } = await AuthService.login(values);
    if (status === 200) {
      setLoading(false);
      navigate(data.returnUrl);
      window.location.reload();
    } else {
      setLoading(false);
      setError(true);
      setErrorMessage(response?.data?.message);
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 3000);
    }
  };
  useEffect(() => {
    setIsLoggedIn(DataService.checkCookieAuthState("AuthState"));
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="bg-white dark:bg-gray-900 text-white">
      <div className="flex justify-center h-screen w-full">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{ backgroundImage: `url(${loginBg})` }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="m-auto text-4xl font-extrabold text-white uppercase">
                Beginner.
              </h2>

              <h2 className="m-auto text-white font-extrabold text-6xl">
                The journey{" "}
                <span className="underline decoration-[10px] underline-offset-[6px] decoration-solid decoration-[#00df9a]">
                  begins...
                </span>
              </h2>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                Beginner.
              </h2>

              <p className="mt-3 text-gray-700 dark:text-gray-300">
                Zaloguj się do swojego konta.
              </p>
            </div>

            <div className="mt-8">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  isPersistent: false,
                }}
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div>
                      <CustomInput
                        textColor="text-gray-200"
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="example@example.com"
                      />
                    </div>

                    <div className="mt-6">
                      <CustomLoginInput
                        label="Hasło"
                        forgotPassword="true"
                        name="password"
                        type="password"
                        placeholder="Wprowadź hasło"
                      />
                    </div>

                    <div className="flex items-center mt-2 -mb-2">
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium text-gray-400"
                      >
                        Nie wylogowywuj mnie
                      </label>
                      <Field
                        type="checkbox"
                        name="isPersistent"
                        className="mx-2 h-4 w-4 border-gray-300 text-[#00df9a] focus:ring-[#00df9a]"
                      />
                    </div>

                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting || error}
                        className="w-full px-4 py-2 text-xl tracking-wide text-white transition-colors duration-200 transform bg-[#00df9a] rounded-md hover:bg-green-500 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                      >
                        Zaloguj się
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>

              <p className="mt-6 text-sm text-center text-gray-400">
                Nie posiadasz jeszcze konta?{" "}
                <Link
                  to="/Register"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Zarejestruj się
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
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
      <Footer />
    </div>
  );
};

export default Login;

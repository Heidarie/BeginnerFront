import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../../assets/loginBg.png";
import Footer from "../../components/Footer";
import CustomInput from "../../components/form/CustomInput";
import CustomLoginInput from "../../components/form/CustomLoginInput";
import { Form, Formik } from "formik";
import AuthService from "../../components/auth.service";
import Toast from "../../components/Toast";

const Login = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    setLoading(true)
    let res = await AuthService.login(values);
    if (res.status === 200) {
      setLoading(false)
      navigate({ pathname: res.request.response });
      window.location.reload();
    } else {
      setError(true);
      setLoading(false)
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };
  return (
    <div className="bg-white dark:bg-gray-900 text-white">
      <div className="flex justify-center h-screen w-full">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{ backgroundImage: `url(${loginBg})` }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">Beginner.</h2>

              <p className="max-w-xl mt-3 text-gray-300">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                autem ipsa, nulla laboriosam dolores, repellendus perferendis
                libero suscipit nam temporibus molestiae
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                Beginner.
              </h2>

              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Sign in to access your account.
              </p>
            </div>

            <div className="mt-8">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div>
                      <CustomInput
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
        <Toast text="Niepoprawny login lub hasło" icon="ERROR" />
      )}
      <Footer />
    </div>
  );
};

export default Login;

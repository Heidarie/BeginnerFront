import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../components/auth.service";
import CustomInput from "../../components/form/CustomInput";
import LoadingPage from "../../components/LoadingPage";
import Toast from "../../components/Toast";

const PasswordRecovery = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [happyFlow, setHappyFlow] = useState(false);

  const onSubmit = async (values) => {
    const { email } = values;
    let response = await AuthService.sendResetPasswordMail(email);
    if (response?.status === 200 || response?.status === 204) {
      setLoading(false);
      setHappyFlow(response?.message);
      setTimeout(() => {
        setHappyFlow(false);
        navigate("/Login");
      }, 2000);
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

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-gray-100">
      <div className="m-auto">
        {loading && (
          <LoadingPage start="Trwa" decorated="resetowanie" end="hasła..." />
        )}
        {happyFlow === false ? (
          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <h2 className="m-auto text-gray-600 font-extrabold text-6xl mb-6">
                  Resetowanie hasła
                </h2>
                <div className="max-w-[20rem] m-auto">
                  <CustomInput
                    textColor="text-gray-800"
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="example@example.com"
                  />
                </div>

                <div className="mt-6 m-auto w-fit">
                  <button
                    type="submit"
                    disabled={isSubmitting || error}
                    className="w-full px-4 py-2 text-xl tracking-wide text-white transition-colors duration-200 transform bg-[#00df9a] rounded-md hover:bg-green-500 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    Zresetuj hasło
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div>
            <div className="m-auto w-[10rem] h-[10rem] rounded-lg mb-4">
              <img
                src="https://www.svgrepo.com/show/406848/party-popper.svg"
                className="m-auto w-[10rem] h-[10rem]"
                alt="Party Popper SVG Vector"
                title="Party Popper SVG Vector"
              ></img>
              <span className="sr-only">Warning icon</span>
            </div>
            <h2 className="m-auto text-gray-600 font-extrabold text-6xl">
              Hasło zostało{" "}
              <span className="underline decoration-[#da0202]">
                zresetowane!
              </span>
            </h2>
            <h2 className="m-auto mt-5 text-center text-gray-600 font-extrabold text-4xl">
              Sprawdź maila
            </h2>
          </div>
        )}
      </div>
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

export default PasswordRecovery;

import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../components/auth.service";
import CustomInput from "../../components/form/CustomInput";
import LoadingPage from "../../components/LoadingPage";
import Toast from "../../components/Toast";
import { resetPasswordSchema } from "./schema";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [happyFlow, setHappyFlow] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") || undefined;
  const mail = params.get("mail") || undefined;

  const onSubmit = async (values) => {
    const { confirmPassword } = values;
    setLoading(true);
    let response = await AuthService.setNewPassword(
      token,
      mail,
      confirmPassword
    );
    console.log(response);
    if (response?.status === 200 || response?.status === 204) {
      setLoading(false);
      setHappyFlow(response?.message);
      setTimeout(() => {
        setHappyFlow(false);
        navigate("/Login");
      }, 3000);
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
    if (!token && !mail) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-gray-100">
      <div className="m-auto">
        {loading ? (
          <LoadingPage
            start="Trwa"
            decorated="tworzenie nowego"
            end="hasła..."
          />
        ) : happyFlow === false && token && mail ? (
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            onSubmit={onSubmit}
            validationSchema={resetPasswordSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <h2 className="m-auto text-gray-600 font-extrabold text-6xl mb-6">
                  Utwórz nowe hasło
                </h2>
                <div className="max-w-[20rem] m-auto mb-5">
                  <CustomInput
                    textColor="text-gray-800"
                    label="Hasło"
                    name="password"
                    type="password"
                    placeholder="Hasło"
                  />
                </div>
                <div className="max-w-[20rem] m-auto">
                  <CustomInput
                    textColor="text-gray-800"
                    label="Potwierdź hasło"
                    name="confirmPassword"
                    type="password"
                    placeholder="Potwierdź hasło"
                  />
                </div>

                <div className="mt-6 m-auto w-fit">
                  <button
                    type="submit"
                    disabled={isSubmitting || error}
                    className="w-full px-4 py-2 text-xl tracking-wide text-white transition-colors duration-200 transform bg-[#00df9a] rounded-md hover:bg-green-500 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    Utwórz nowe hasło
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : happyFlow !== false ? (
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
            <h2 className="m-auto text-gray-600 font-extrabold text-6xl text-center">
              Nowe hasło zostało{" "}
              <span className="underline decoration-[#da0202]">utworzone!</span>
            </h2>
          </div>
        ) : (
          <div>
            <h2 className="m-auto text-gray-600 font-extrabold text-6xl text-center">
              Niestety ale{" "}
              <span className="underline decoration-[#da0202]">nie można</span>{" "}
              zmienić hasła.{" :("}
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

export default ResetPassword;

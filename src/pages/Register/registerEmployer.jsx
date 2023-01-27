import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { advancedSchema } from "./schema";
import CustomInput from "../../components/form/CustomInput";
import CustomSelect from "../../components/form/CustomSelect";
import CustomNumber from "../../components/form/CustomNumber";
import AuthService from "../../components/auth.service";
import Toast from "../../components/Toast";

const RegisterEmployer = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    setLoading(true);
    let { status, response } = await AuthService.register(
      "/Authentication/RegisterEmployer",
      values
    );
    if (status === 201) {
      setLoading(false);
      navigate({ pathname: "/Login" });
      window.location.reload();
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
    <div className="flex-1">
      <div className="mt-8">
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            companyName: "",
            regionCode: "",
          }}
          validationSchema={advancedSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <CustomInput
                className="my-2"
                textColor="text-gray-200"
                label="Email"
                name="email"
                type="email"
                placeholder="example@example.com"
              />
              <CustomInput
                className="my-2"
                textColor="text-gray-200"
                label="Hasło"
                name="password"
                type="password"
                placeholder="Wprowadź hasło"
              />
              <CustomInput
                className="my-2"
                textColor="text-gray-200"
                label="Potwierdź hasło"
                name="confirmPassword"
                type="password"
                placeholder="Powtórz hasło"
              />
              <CustomNumber
                label="Numer telefonu"
                name="phoneNumber"
                type="number"
                placeholder="48 123 456 789"
              />
              <CustomInput
                className="my-2"
                textColor="text-gray-200"
                label="Nazwa firmy"
                name="companyName"
                type="text"
                placeholder="Nazwa firmy"
              />
              <CustomInput
                className="my-2"
                textColor="text-gray-200"
                label="Miasto"
                name="city"
                type="text"
                placeholder="Miasto"
              />
              <CustomSelect
                label="Województwo"
                name="regionCode"
                placeholder="Wybierz województwo"
                type="number"
              >
                <option value="" disabled>
                  Wybierz województwo
                </option>
                <option value="0">Wielkopolskie</option>
                <option value="1">Lubelskie</option>
                <option value="2">Mazowieckie</option>
                <option value="3">Warmińsko-mazurskie</option>
                <option value="4">Dolnośląskie</option>
                <option value="5">Śląskie</option>
                <option value="6">Małopolskie</option>
                <option value="7">Zachodniopomorskie</option>
                <option value="8">Pomorskie</option>
                <option value="9">Lubuskie</option>
                <option value="10">Kujawsko-pomorskie</option>
                <option value="11">Podlaskie</option>
                <option value="12">Świętokrzyskie</option>
                <option value="13">Łódzkie</option>
                <option value="14">Opolskie</option>
                <option value="15">Podkarpackie</option>
              </CustomSelect>
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || error}
                  className="w-full px-4 py-2 text-xl tracking-wide text-white transition-colors duration-200 transform bg-[#00df9a] rounded-md hover:bg-green-500 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Zarejestruj się
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <p className="mt-6 text-sm text-center text-gray-400 mb-5">
          Posiadasz już konto?{" "}
          <Link
            to="/Login"
            className="text-blue-500 focus:outline-none focus:underline hover:underline"
          >
            Zaloguj się
          </Link>
          .
        </p>
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
      {loading && <Toast text="Próba tworzenia konta" icon="LOADING" />}
    </div>
  );
};

export default RegisterEmployer;

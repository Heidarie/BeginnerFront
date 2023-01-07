import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { advancedSchema } from "./schema";
import CustomInput from "../../components/form/CustomInput";
import CustomNumber from "../../components/form/CustomNumber";
import AuthService from "../../components/auth.service";
import Toast from "../../components/Toast";

const RegisterEmployer = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
<<<<<<< HEAD
    setLoading(true);
=======
    setLoading(true)
>>>>>>> 2c5e776aa43c4403be2cf7cb931d9b91481cf16c
    let res = await AuthService.register(
      "/Authentication/RegisterEmployer",
      values
    );
    console.log(res);
    if (res.status === 201) {
<<<<<<< HEAD
      setLoading(false);
      navigate({ pathname: "/Login" });
      window.location.reload();
    } else {
      setLoading(false);
      setError(true);
=======
      setLoading(false)
      navigate({ pathname: "/Login" });
      window.location.reload();
    } else {
      setLoading(false)
      setError(res.response.data.message);
>>>>>>> 2c5e776aa43c4403be2cf7cb931d9b91481cf16c
      setTimeout(() => {
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
          }}
          validationSchema={advancedSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <CustomInput
                label="Email"
                name="email"
                type="email"
                placeholder="example@example.com"
              />
              <CustomInput
                label="Hasło"
                name="password"
                type="password"
                placeholder="Wprowadź hasło"
              />
              <CustomInput
                label="Potwierdź hasło"
                name="confirmPassword"
                type="password"
                placeholder="Powtórz hasło"
              />
              <CustomNumber
                label="Numer telefonu"
                name="phoneNumber"
                type="number"
                placeholder="48 504 544 755"
              />
              <CustomInput
                label="Nazwa firmy"
                name="companyName"
                type="text"
                placeholder="Nazwa firmy"
              />
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
        <Toast text="Wystąpił bład przy aplikowaniu na ofertę" icon="ERROR" />
      )}
      {loading && <Toast text="Próba tworzenia konta" icon="LOADING" />}
    </div>
  );
};

export default RegisterEmployer;

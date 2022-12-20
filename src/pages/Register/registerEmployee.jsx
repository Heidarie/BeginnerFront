import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { basicSchema } from "./schema";
import CustomSelect from "../../components/form/CustomSelect";
import CustomInput from "../../components/form/CustomInput";
import CustomNumber from "../../components/form/CustomNumber";
import AuthService from "../../components/auth.service";
import Toast from "../../components/Toast";

const RegisterEmployee = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    setLoading(true)
    let res = await AuthService.register("/Authentication/Register", values);
    if (res.status === 201) {
      setLoading(false)
      navigate({ pathname: "/Login" });
      window.location.reload();
    } else {
      setLoading(false)
      setError(true)
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
            name: "",
            surname: "",
            profession: "",
          }}
          validationSchema={basicSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <CustomInput
                label="Email adress"
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
                label="Imię"
                name="name"
                type="text"
                placeholder="Imię"
              />
              <CustomInput
                label="Nazwisko"
                name="surname"
                type="text"
                placeholder="Nazwisko"
              />
              <CustomSelect
                label="Typ pracownika"
                name="profession"
                placeholder="Wybierz zawód"
              >
                <option value="">Wybierz zawód</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Product Manager</option>
                <option value="other">Other</option>
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
        <Toast text="Wystąpił bład przy aplikowaniu na ofertę" icon="ERROR" />
      )}
    </div>
  );
};

export default RegisterEmployee;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { basicSchema } from "./schema";
import CustomSelect from "./components/CustomSelect";
import CustomInput from "./components/CustomInput";
import CustomNumber from "./components/CustomNumber";
import AuthService from "../../components/auth.service";
import Toast from "../../components/Toast";

const RegisterEmployee = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    setLoading(true);
    let res = await AuthService.register("/Authentication/Register", values);
    if (res.status === 201) {
      setLoading(false);
      navigate({ pathname: "/Login" });
      window.location.reload();
    } else {
      setLoading(false);
      setError(true);
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
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
              <CustomInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
              />
              <CustomNumber
                label="Phone Number"
                name="phoneNumber"
                type="number"
                placeholder="Phone number"
              />
              <CustomInput
                label="Name"
                name="name"
                type="text"
                placeholder="Name"
              />
              <CustomInput
                label="Surname"
                name="surname"
                type="text"
                placeholder="Surname"
              />
              <CustomSelect
                label="Typ pracownika"
                name="profession"
                placeholder="Please select a job"
              >
                <option value="">Please select a job type</option>
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
          Already have an account?{" "}
          <Link
            to="/Login"
            className="text-blue-500 focus:outline-none focus:underline hover:underline"
          >
            Sign in
          </Link>
          .
        </p>
      </div>
      {error && (
        <Toast text="Wystąpił błąd przy tworzeniu konta" icon="ERROR" />
      )}
      {loading && <Toast text="Ładowanie oferty" icon="LOADING" />}
    </div>
  );
};

export default RegisterEmployee;

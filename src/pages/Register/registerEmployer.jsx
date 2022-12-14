import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { advancedSchema } from "./schema";
import CustomInput from "./components/CustomInput";
import CustomNumber from "./components/CustomNumber";
import AuthService from "../../components/auth.service";
import Toast from "../Offers/components/Toast";

const RegisterEmployer = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    let res = await AuthService.register(
      "/Authentication/RegisterEmployer",
      values
    );
    console.log(res);
    if (res.status === 201) {
      navigate({ pathname: "/Login" });
      window.location.reload();
    } else {
      setError(res.response.data.message);
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
                label="Company name"
                name="companyName"
                type="text"
                placeholder="Company name"
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
        <Toast text="Wystąpił bład przy aplikowaniu na ofertę" icon="ERROR" />
      )}
    </div>
  );
};

export default RegisterEmployer;

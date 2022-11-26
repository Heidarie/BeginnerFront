import React from "react";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import { advancedSchema } from "./schema";
import CustomInput from "./components/CustomInput";
import CustomNumber from "./components/CustomNumber";
import axios from "axios";

const onSubmit = async (values, actions) => {
  const headers = {
    "Content-Type": "application/json",
  };
  axios
    .post(`https://localhost:7064/Authentication/RegisterEmployer`, values, {
      headers,
    })
    .then((res) => {
      console.log(res);
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  actions.resetForm();
};

const Register = () => {
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
                placeholder="Enter your email"
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
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 text-xl tracking-wide text-white transition-colors duration-200 transform bg-[#00df9a] rounded-md hover:bg-green-500 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Sign up
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <p className="mt-6 text-sm text-center text-gray-400 mb-5">
          Already have an account?{" "}
          <Link
            to="/Authentication/Login"
            className="text-blue-500 focus:outline-none focus:underline hover:underline"
          >
            Sign in
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;

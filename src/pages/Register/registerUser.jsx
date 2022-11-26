import React from "react";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import { basicSchema } from "./schema";
import CustomSelect from "./components/CustomSelect";
import CustomInput from "./components/CustomInput";
import CustomNumber from "./components/CustomNumber";
// import axios from "axios";

const onSubmit = async (values, actions) => {
  console.log(values);
  console.log(actions);
  // axios.post(`/Authentication/Register`, { values }).then((res) => {
  //   console.log(res);
  //   console.log(res.data);
  // });
  await fetch("https://localhost:7064/Auth/Register", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "no-cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: JSON.stringify(values),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
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
                label="Job Type"
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

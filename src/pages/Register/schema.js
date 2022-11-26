import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const basicSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  phoneNumber: yup
    .string()
    .max(15, "Phone number can be max 15 characters long")
    .required("Required"),
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters long")
    .required("Required"),
  surname: yup
    .string()
    .min(3, "Surname must be at least 3 characters long")
    .required("Required"),
  profession: yup
    .string()
    .oneOf(["designer", "developer", "manager", "other"], "Invalid Job Type")
    .required("Required"),
});

export const advancedSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  phoneNumber: yup
    .string()
    .max(15, "Phone number can be max 15 characters long")
    .required("Required"),
  companyName: yup
    .string()
    .min(2, "CompanyName must be at least 2 characters long")
    .required("Required"),
});

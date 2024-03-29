import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const basicSchema = yup.object().shape({
  email: yup
    .string()
    .email("Wprowadź poprawny email")
    .required("Email jest wymagany"),
  password: yup
    .string()
    .min(8, "Hasło musi posiadać conajmniej 8 znaków")
    .matches(passwordRules, { message: "Stwórz mocniejsze hasło" })
    .required("Hasło jest wymagane"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Hasła muszą się zgadzać")
    .required("Potwierdź hasło"),
  phoneNumber: yup
    .string()
    .max(15, "Numer telefonu może mieć maksymalnie 15 znaków")
    .required("Numer telefonu jest wymagany"),
  name: yup
    .string()
    .min(3, "Imię musi posiadać conajmniej 3 znaki")
    .required("Imię jest wymagane")
    .matches(/^[\s\p{L}]+$/u, "Imię może składać się tylko z liter"),
  surname: yup
    .string()
    .min(3, "Nazwisko musi posiadać conajmniej 3 znaki")
    .required("Nazwisko jest wymagane")
    .matches(/^[\s\p{L}]+$/u, "Nazwisko może składać się tylko z liter"),
  city: yup
    .string()
    .min(2, "Miasto musi posiadać conajmniej 2 znaki")
    .required("Miasto jest wymagane")
    .matches(/^[\s\p{L}]+$/u, "Miasto może składać się tylko z liter"),
});

export const advancedSchema = yup.object().shape({
  email: yup
    .string()
    .email("Wprowadź poprawny email")
    .required("Email jest wymagany"),
  password: yup
    .string()
    .min(8, "Hasło musi posiadać conajmniej 8 znaków")
    .matches(passwordRules, { message: "Stwórz mocniejsze hasło" })
    .required("Hasło jest wymagane"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Hasła muszę się zgadzać")
    .required("Potwierdź hasło"),
  phoneNumber: yup
    .string()
    .max(15, "Numer telefonu może mieć maksymalnie 15 znaków")
    .required("Numer telefonu jest wymagany"),
  companyName: yup
    .string()
    .min(2, "Nazwa firmy musi posiadać conajmniej 2 znaki")
    .required("Nazwa firmy jest wymagana"),
  city: yup
    .string()
    .min(2, "Miasto musi posiadać conajmniej 2 znaki")
    .required("Miasto jest wymagane")
    .matches(/^[\s\p{L}]+$/u, "Miasto może składać się tylko z liter"),
});

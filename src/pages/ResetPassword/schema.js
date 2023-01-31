import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Hasło musi posiadać conajmniej 8 znaków")
    .matches(passwordRules, { message: "Stwórz mocniejsze hasło" })
    .required("Hasło jest wymagane"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Hasła muszą się zgadzać")
    .required("Potwierdź hasło"),
});

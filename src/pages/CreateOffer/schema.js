import * as yup from "yup";

export const createOfferSchema = yup.object().shape({
  title: yup.string().required("Tytuł jest wymagany"),
  salaryFrom: yup
    .number()
    .min(1, "Płaca minimalna nie może być mniejsza niż 1 zł")
    .required("Płaca minimalna jest wymagana"),
  salaryTo: yup
    .number()
    .moreThan(yup.ref("salaryFrom"), "Musi być większa od płacy minimalnej"),
  city: yup.string().required("Miasto jest wymagane"),
  regionCode: yup.string().required("Wojewódźtwo jest wymagane"),
  postalCode: yup
    .string()
    .max(6, "Kod pocztowy może posiadać maksymalnie 6 znaków")
    .required("Kod pocztowy jest wymagany"),
  street: yup
    .string()
    .min(3, "Ulica musi posiadać conajmniej 3 znaki")
    .required("Ulica jest wymagane"),
  description: yup
    .string()
    .min(10, "Opis musi posiadać conajmniej 10 znaków")
    .required("Opis jest wymagany"),
  companySize: yup
    .number()
    .min(1, "Wielkość firmy nie może być mniejsza niż 1 osoba")
    .required("Wielkość firmy jest wymagana"),
});

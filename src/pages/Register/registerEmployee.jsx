import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { basicSchema } from "./schema";
import CustomSelect from "../../components/form/CustomSelect";
import CustomInput from "../../components/form/CustomInput";
import CustomNumber from "../../components/form/CustomNumber";
import AuthService from "../../components/auth.service";
import Toast from "../../components/Toast";
import Select from "react-select";
import DataService from "../../components/data.service";

const RegisterEmployee = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [filtersData, setFiltersData] = useState([]);
  const [occupation, setOccupation] = useState(null);
  const [profession, setProfession] = useState([]);
  const navigate = useNavigate();

  async function loadFilters() {
    setLoading(true);
    let { status, data, response } = await DataService.getFilters(
      "category=occupation"
    );
    if (status === 200) {
      const occupationFilter = data?.occupationFilter.map((obj) => ({
        ...obj,
        label: obj.value,
      }));
      const newObject = { occupationFilter };
      setLoading(false);
      setFiltersData(newObject);
    } else {
      setLoading(false);
      setError(true);
      setErrorMessage(response?.message);
      setTimeout(() => {
        setErrorMessage("");
        setError(false);
      }, 3000);
    }
  }

  async function loadProfession(value) {
    setLoading(true);
    const occupationId = value.id;
    let { status, data } = await DataService.getFilters(
      `category=profession&occupationIds=${occupationId}`
    );
    if (status === 200) {
      const professionFilter = data?.professionFilter.map((obj) => ({
        ...obj,
        label: obj.value,
      }));
      setFiltersData({ ...filtersData, professionFilter: professionFilter });
      setLoading(false);
    } else {
      setLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }

  const onSubmit = async (values, actions) => {
    const newValues = {
      ...values,
      occupation: occupation.id,
      profession: profession.id,
      regionCode: parseInt(values.regionCode),
    };
    setLoading(true);
    let { status } = await AuthService.register(
      "/Authentication/Register",
      newValues
    );
    if (status === 201) {
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

  useEffect(() => {
    loadFilters();
  }, []);

  useEffect(() => {
    if (occupation) {
      loadProfession(occupation);
    } else {
      delete filtersData?.professionFilter;
      setProfession([]);
    }
  }, [occupation]);

  return (
    <div className="flex-1">
      <div className="mt-8">
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: 0,
            name: "",
            surname: "",
            profession: "",
            city: "",
            regionCode: 0,
          }}
          validationSchema={basicSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <CustomInput
                className="my-2"
                textColor="text-gray-200"
                label="Email"
                name="email"
                type="email"
                placeholder="example@example.com"
              />
              <CustomInput
                className="my-2"
                textColor="text-gray-200"
                label="Hasło"
                name="password"
                type="password"
                placeholder="Wprowadź hasło"
              />
              <CustomInput
                textColor="text-gray-200"
                label="Potwierdź hasło"
                name="confirmPassword"
                type="password"
                placeholder="Powtórz hasło"
              />
              <CustomNumber
                label="Numer telefonu"
                id="phoneNumber"
                name="phoneNumber"
                type="number"
                placeholder="48 123 456 789"
              />
              <CustomInput
                className="my-2"
                textColor="text-gray-200"
                label="Imię"
                name="name"
                type="text"
                placeholder="Imię"
              />
              <CustomInput
                className="my-2"
                textColor="text-gray-200"
                label="Nazwisko"
                name="surname"
                type="text"
                placeholder="Nazwisko"
              />
              <CustomInput
                className="my-2"
                textColor="text-gray-200"
                label="Miasto"
                name="city"
                type="text"
                placeholder="Miasto"
              />
              <CustomSelect
                label="Województwo"
                name="regionCode"
                placeholder="Wybierz województwo"
                type="number"
              >
                <option value="" disabled>
                  Wybierz województwo
                </option>
                <option value="0">Wielkopolskie</option>
                <option value="1">Lubelskie</option>
                <option value="2">Mazowieckie</option>
                <option value="3">Warmińsko-mazurskie</option>
                <option value="4">Dolnośląskie</option>
                <option value="5">Śląskie</option>
                <option value="6">Małopolskie</option>
                <option value="7">Zachodniopomorskie</option>
                <option value="8">Pomorskie</option>
                <option value="9">Lubuskie</option>
                <option value="10">Kujawsko-pomorskie</option>
                <option value="11">Podlaskie</option>
                <option value="12">Świętokrzyskie</option>
                <option value="13">Łódzkie</option>
                <option value="14">Opolskie</option>
                <option value="15">Podkarpackie</option>
              </CustomSelect>
              <label className="block text-sm font-medium text-gray-200">
                Główny zawód
              </label>
              <Select
                onChange={setOccupation}
                value={occupation}
                options={filtersData?.occupationFilter}
                isClearable={true}
                placeholder="Wybierz zawód"
                name="occupation"
                className="basic-single text-black mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <label className="block text-sm font-medium text-gray-200">
                Główny język
              </label>
              {occupation !== null ? (
                <Select
                  onChange={setProfession}
                  value={profession}
                  options={filtersData?.professionFilter}
                  placeholder="Wybierz język"
                  isClearable={true}
                  name="occupation"
                  className="basic-single text-black mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              ) : (
                <Select
                  isDisabled={true}
                  onChange={setProfession}
                  value={profession}
                  options={filtersData?.professionFilter}
                  placeholder="Wybierz język"
                  isClearable={true}
                  name="occupation"
                  className="basic-single text-black mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              )}
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
        <Toast
          text={
            errorMessage === "" || errorMessage === undefined
              ? "Wystąpił nieoczekiwany błąd"
              : errorMessage
          }
          icon="ERROR"
        />
      )}
      {loading && <Toast text="Ładowanie" icon="LOADING" />}
    </div>
  );
};

export default RegisterEmployee;

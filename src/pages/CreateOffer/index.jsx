import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import CustomInput from "../Profile/EmployeeProfile/components/CustomInput";
import CustomSelect from "../../components/form/CustomSelect";
import CustomTextArea from "../Profile/EmployeeProfile/components/CustomTextArea";
import { Form, Formik } from "formik";
import CreatableSelect from "react-select/creatable";
import Toast from "../../components/Toast";

const CreateOffer = ({ hideModal }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // const [gradDateStart, setGradDateStart] = useState(new Date());
  // const [gradDateEnd, setGradDateEnd] = useState(new Date());
  // const [expDateStart, setExpDateStart] = useState(new Date());
  // const [expDateEnd, setExpDateEnd] = useState(new Date());
  const [skills, setSkills] = useState([]);
  const [dutiesList, setDutiesList] = useState([]);
  const [languagesList, setLanguagesList] = useState([]);
  const [requirementsList, setRequirementsList] = useState([]);
  const [benefitsList, setBenefitsList] = useState([]);
  // const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    setError(false);
    setLoading(true);

    const updateValues = {
      title: values.title,
      salaryFrom: values.salaryFrom,
      salaryTo: values.salaryTo,
      isPremium: values.isPremium,
      city: values.city,
      profession: values.profession,
      jobType: values.jobType,
      offerDetails: {
        postalCode: values.postalCode,
        street: values.street,
        description: values.description,
        companySize: values.description,
        duties: dutiesList?.map((object) => object.value),
        languages: languagesList?.map((object) => object.value),
        requirements: requirementsList?.map((object) => object.value),
        benefits: benefitsList?.map((object) => object.value),
      },
    };
    console.log(updateValues);
  };
  return (
    <Modal hideModal={hideModal} className="sm:max-w-6xl p-4">
      <Formik
        initialValues={{
          title: "",
          description: "",
          salaryFrom: 0,
          salaryTo: 0,
          isPremium: false,
          city: "",
          profession: "",
          jobType: "",
          postalCode: "",
          street: "",
          companySize: 0,
          duties: [],
          languages: [],
          requirements: [],
          benefits: [],
        }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Górna sekcja oferty
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Te informacje będą wyświetlane publiczne, więc uważaj co
                      udostępniasz.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="shadow-md sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                      <CustomInput
                        className="col-span-6"
                        label="Tytuł"
                        name="title"
                        type="text"
                        placeholder="Tytuł oferty"
                      />
                      <CustomTextArea
                        className="mt-1"
                        label="Opis"
                        name="description"
                        type="text"
                        placeholder="Opis oferty"
                      />
                      <div className="grid grid-cols-6 gap-6">
                        <CustomInput
                          className="col-span-3"
                          label="Wodząca technologia"
                          name="profession"
                          type="text"
                          placeholder="Np. Javascript"
                        />
                        <CustomSelect
                          className="col-span-3 bg-white"
                          label="Rodzaj pracy"
                          name="jobType"
                          placeholder="Wybierz rodzaj pracy"
                        >
                          <option value="">Wybierz tryb pracy</option>
                          <option value="LOCAL">LOKALNIE</option>
                          <option value="REMOTE">ZDALNIE</option>
                          <option value="LOCAL/REMOTE">LOKALNIE&ZDALNIE</option>
                        </CustomSelect>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200" />
              </div>
            </div>

            <div className="mt-10 sm:mt-0">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Dane lokalizacyjne oferty
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Użyj adresu lokalizacji oferty.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="overflow-hidden shadow-md sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <CustomInput
                          className="col-span-3"
                          label="Ulica"
                          name="street"
                          type="text"
                          placeholder="Ulica"
                        />
                        <CustomInput
                          className="col-span-3"
                          label="Miasto"
                          name="city"
                          type="text"
                          placeholder="Miasto"
                        />
                        <CustomInput
                          className="col-span-3"
                          label="Kod pocztowy"
                          name="postalCode"
                          type="text"
                          placeholder="Kod pocztowy"
                        />
                        <CustomInput
                          className="col-span-3"
                          label="Wielkość firmy"
                          name="companySize"
                          type="number"
                          placeholder="Liczba pracowników np. 34"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200" />
              </div>
            </div>

            <div className="mt-10 sm:mt-0">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Obowiązki
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Zakres obowiązków wymaganych od przyszłego pracownika na
                      tym stanowisku.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="shadow-md sm:rounded-md overflow-visible">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                          <label className="block text-sm font-medium text-gray-700">
                            Obowiązki
                          </label>
                          <CreatableSelect
                            placeholder="np. Praca od 8-16"
                            onChange={setDutiesList}
                            value={dutiesList}
                            isMulti
                            name="Skills"
                            className="mt-1 p-2 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 sm:mt-0">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Inne technologie
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Znajomość innych technologii mile widzianych na tym
                      stanowisku.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="shadow-md sm:rounded-md overflow-visible">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                          <label className="block text-sm font-medium text-gray-700">
                            Języki
                          </label>
                          <CreatableSelect
                            placeholder="np. C#"
                            onChange={setLanguagesList}
                            value={languagesList}
                            isMulti
                            name="Certificates"
                            className="mt-1 p-2 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 sm:mt-0">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Wymagania
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Wymagania od przyszłego pracownika na tym stanowisku.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="shadow-md sm:rounded-md overflow-visible">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                          <label className="block text-sm font-medium text-gray-700">
                            Wymagania
                          </label>
                          <CreatableSelect
                            placeholder="np. Umiejętność pracy w Azure "
                            onChange={setRequirementsList}
                            value={requirementsList}
                            isMulti
                            name="Certificates"
                            className="mt-1 p-2 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 sm:mt-0">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Benefity
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Benefity jakie udostępniasz przyszłemu pracownikowi.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="shadow-md sm:rounded-md overflow-visible">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                          <label className="block text-sm font-medium text-gray-700">
                            Benefity
                          </label>
                          <CreatableSelect
                            placeholder="np. Możliwość pracy z domu"
                            onChange={setBenefitsList}
                            value={benefitsList}
                            isMulti
                            name="Certificates"
                            className="mt-1 p-2 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200" />
              </div>
            </div>
            <div className="sm:mt-0">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="p-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Wynagrodzenie
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Widełki wynagrodzenia.
                    </p>
                  </div>
                </div>
                <div className="md:col-span-2 md:mt-0">
                  <div className="shadow-md sm:rounded-md overflow-visible">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                          <div className="grid grid-cols-6 gap-6">
                            <CustomInput
                              className="col-span-3"
                              label="Od"
                              name="salaryFrom"
                              type="number"
                            />
                            <CustomInput
                              className="col-span-3"
                              label="Do"
                              name="salaryTo"
                              type="number"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200" />
              </div>
            </div>
            <CustomInput
              className="w-fit"
              label="Płatna oferta?"
              name="isPremium"
              type="checkbox"
            />
            {loading || error ? (
              <div className="mt-2 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="sumbit"
                  disabled={true}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Zapisz
                </button>
                <button
                  type="button"
                  disabled={true}
                  onClick={() => hideModal(true)}
                  className="disabled mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Anuluj
                </button>
              </div>
            ) : (
              <div className="mt-2 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="sumbit"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Zapisz
                </button>
                <button
                  type="button"
                  onClick={() => hideModal(true)}
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Anuluj
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
      {loading && <Toast text="Ładowanie" icon="LOADING" />}
      {error && <Toast text={errorMessage} icon="ERROR" />}
    </Modal>
  );
};

export default CreateOffer;

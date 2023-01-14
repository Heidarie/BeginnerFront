import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import CustomInput from "../Profile/EmployeeProfile/components/CustomInput";
import CustomSelect from "../../components/form/CustomSelect";
import CustomTextArea from "../Profile/EmployeeProfile/components/CustomTextArea";
import { Form, Formik } from "formik";
import CreatableSelect from "react-select/creatable";
import Toast from "../../components/Toast";
import EmployerService from "../../components/employer.service";
import Select from "react-select";
import DataService from "../../components/data.service";

const CreateOffer = ({ hideModal }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [filtersData, setFiltersData] = useState([]);
  const [occupation, setOccupation] = useState(null);
  const [profession, setProfession] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [level, setLevel] = useState([]);
  const [dutiesList, setDutiesList] = useState([]);
  const [languagesList, setLanguagesList] = useState([]);
  const [requirementsList, setRequirementsList] = useState([]);
  const [benefitsList, setBenefitsList] = useState([]);
  const [happyFlow, setHappyFlow] = useState(false);

  // const navigate = useNavigate();

  async function loadFilters() {
    setLoading(true);
    let res = await DataService.getFilters("category=occupation,jobtype,level");
    if (res.status === 200) {
      const occupationFilter = res.data.occupationFilter.map((obj) => ({
        ...obj,
        label: obj.value,
      }));
      const levelFilter = res.data.levelFilter.map((obj) => ({
        ...obj,
        label: obj.value,
      }));
      const jobTypeFilter = res.data.jobTypeFilter.map((obj) => ({
        ...obj,
        label: obj.value,
      }));
      const newObject = { occupationFilter, levelFilter, jobTypeFilter };
      setLoading(false);
      setFiltersData(newObject);
    } else {
      setLoading(false);
      setError(true);
      setErrorMessage(res.response.data.message);
      setTimeout(() => {
        setErrorMessage("");
        setError(false);
      }, 3000);
    }
  }

  async function loadProfession(value) {
    setLoading(true);
    const occupationId = value.id;
    let res = await DataService.getFilters(
      `category=profession&occupationIds=${occupationId}`
    );
    if (res.status === 200) {
      const professionFilter = res.data.professionFilter.map((obj) => ({
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
    setError(false);
    setLoading(true);

    const updateValues = {
      title: values.title,
      salaryFrom: values.salaryFrom,
      salaryTo: values.salaryTo,
      isPremium: values.isPremium,
      city: values.city,
      regionCode: parseInt(values.regionCode),
      occupationId: occupation?.id,
      professionId: profession?.id,
      jobType: jobType?.id,
      jobLevel: level?.id,
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

    let res = await EmployerService.createOffer(updateValues);
    console.log(res);
    if (res.status === 201) {
      setLoading(false);
      setHappyFlow(true);
      setTimeout(() => {
        setHappyFlow(false);
        hideModal(true);
      }, 3000);
    } else {
      setLoading(false);
      setError(true);
      setErrorMessage(res.response.data.message);
      setTimeout(() => {
        setErrorMessage("");
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
    <Modal hideModal={hideModal} className="sm:max-w-5xl p-4">
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
          regionCode: 0,
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
                  <div className="shadow-md sm:overflow-visible sm:rounded-md">
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
                        <div className="col-span-3 bg-white">
                          <label className="block text-sm font-medium text-gray-700">
                            Poziom oferty
                          </label>
                          <Select
                            onChange={setLevel}
                            value={level}
                            options={filtersData?.levelFilter}
                            isClearable={true}
                            placeholder="Wybierz technologię"
                            name="jobLevel"
                            className="basic-single text-black mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-3 bg-white">
                          <label className="block text-sm font-medium text-gray-700">
                            Typ pracy
                          </label>
                          <Select
                            onChange={setJobType}
                            value={jobType}
                            options={filtersData?.jobTypeFilter}
                            isClearable={true}
                            placeholder="Wybierz technologię"
                            name="jobLevel"
                            className="basic-single text-black mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-3 bg-white">
                          <label className="block text-sm font-medium text-gray-700">
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
                        </div>
                        <div className="col-span-3 bg-white">
                          <label className="block text-sm font-medium text-gray-700">
                            Wodząca technologia
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
                  <div className="overflow-visible shadow-md sm:rounded-md">
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
                        <CustomSelect
                          className="col-span-6 sm:col-span-3"
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
                            className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                            className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                            className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                            className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
      {happyFlow && <Toast text="Udało się utworzyć ofertę!" icon="HAPPY" />}
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
    </Modal>
  );
};

export default CreateOffer;

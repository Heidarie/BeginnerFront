import React, { useState, useEffect } from "react";
import Modal from "../../../components/Modal";
import CustomInput from "./components/CustomInput";
import CustomTextArea from "./components/CustomTextArea";
import CustomFile from "./components/CustomFile";
import { Form, Formik } from "formik";
import CreatableSelect from "react-select/creatable";
import EmployeeService from "../../../components/employee.service";
import Toast from "../../../components/Toast";
import Select from "react-select";
import DataService from "../../../components/data.service";
import CustomSelect from "../../../components/form/CustomSelect";
import { regions } from "../../../assets/regions";

const EditProfile = ({ hideModal, editProfileData }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [filtersData, setFiltersData] = useState([]);
  const [occupation, setOccupation] = useState([]);
  const [profession, setProfession] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedResumee, setSelectedResumee] = useState(null);

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
      const occupationPrev =
        occupationFilter.find(
          (obj) => obj.label === editProfileData.occupation
        ) || [];
      setOccupation(occupationPrev);
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
    let { status, data, response } = await DataService.getFilters(
      `category=profession&occupationIds=${occupationId}`
    );
    if (status === 200 && data.professionFilter) {
      const professionFilter = data.professionFilter.map((obj) => ({
        ...obj,
        label: obj.value,
      }));
      setFiltersData({ ...filtersData, professionFilter: professionFilter });
      const professionPrev =
        professionFilter.find(
          (obj) => obj.label === editProfileData.profession
        ) || [];
      setProfession(professionPrev);
      setLoading(false);
    } else {
      if (response) {
        setLoading(false);
        setError(true);
        setErrorMessage(response?.message);
        setTimeout(() => {
          setErrorMessage("");
          setError(false);
        }, 3000);
      }
    }
  }

  const onSubmit = async (values, actions) => {
    setError(false);
    setLoading(true);
    const updateValues = {
      Name: values.Name,
      Surname: values.Surname,
      Occupation: occupation?.id,
      Profession: profession?.id,
      City: values.City,
      Image: selectedImage,
      Resumee: selectedResumee,
      RegionCode: values.RegionCode,
      "PersonalDataModel.Description": values.Description,
      "PersonalDataModel.Certificates": certificates?.map(
        (object) => object.value
      ),
      "PersonalDataModel.Skills": skills?.map((object) => object.value),
    };

    let { status, response } = await EmployeeService.updateUserData(
      updateValues
    );
    if (status === 200) {
      setLoading(false);
      window.location.reload();
      hideModal(true);
    } else {
      setLoading(false);
      setError(true);
      setErrorMessage(response?.message);
      setTimeout(() => {
        setErrorMessage("");
        setError(false);
      }, 3000);
    }
  };
  const setPreviousData = async () => {
    const prevSkills = [
      ...(editProfileData.personalDataModel.skills.map((skillName) => {
        return { label: skillName, value: skillName };
      }) || []),
    ];
    const prevCertificates = [
      ...(editProfileData.personalDataModel.certificates.map(
        (certificateName) => {
          return { label: certificateName, value: certificateName };
        }
      ) || []),
    ];
    setSkills(prevSkills);
    setCertificates(prevCertificates);
  };

  useEffect(() => {
    loadFilters();
    setPreviousData();
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
    <Modal hideModal={hideModal} className="sm:max-w-4xl p-4">
      <Formik
        initialValues={{
          Name: editProfileData?.name || "",
          Surname: editProfileData?.surname || "",
          Description: editProfileData?.personalDataModel?.description || "",
          Image: "",
          Resume: "",
          RegionCode:
            regions.find((region) => region.name === editProfileData?.region)
              ?.value || 0,
          City: editProfileData?.city || "",
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
                      Profil
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
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Zdjęcie
                        </label>
                        <div className="mt-1 flex items-center">
                          <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100 mr-5">
                            {selectedImage ? (
                              <img
                                src={URL.createObjectURL(selectedImage)}
                                alt={selectedImage.name}
                                className="m-auto h-fit w-fit"
                              />
                            ) : (
                              <svg
                                className="h-full w-full m-auto text-gray-300"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            )}
                          </span>

                          <CustomFile
                            name="Image"
                            type="file"
                            accept=".jpeg, .jpg"
                            onChange={(event) => {
                              setSelectedImage(event.target.files[0]);
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          CV
                        </label>
                        <div className="mt-1 flex items-center">
                          <CustomFile
                            name="Resumee"
                            type="file"
                            accept=".pdf"
                            onChange={(event) => {
                              setSelectedResumee(event.target.files[0]);
                            }}
                          />
                        </div>
                      </div>

                      <CustomTextArea
                        className="mt-1"
                        label="Opis"
                        name="Description"
                        type="text"
                        placeholder="Krótki opis"
                      />
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
                      Dane osobiste
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Użyj adresu na który przychodzi poczta.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="overflow-visible shadow-md sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <CustomInput
                          className="col-span-6 sm:col-span-3"
                          label="Imię"
                          name="Name"
                          type="text"
                          placeholder="Imię"
                        />
                        <CustomInput
                          className="col-span-6 sm:col-span-3"
                          label="Nazwisko"
                          name="Surname"
                          type="text"
                          placeholder="Nazwisko"
                        />
                        <CustomInput
                          className="col-span-6 sm:col-span-3"
                          label="Miasto"
                          name="City"
                          type="text"
                          placeholder="Miasto"
                        />
                        <CustomSelect
                          className="col-span-6 sm:col-span-3"
                          label="Województwo"
                          name="RegionCode"
                          placeholder="Wybierz województwo"
                          type="number"
                        >
                          <option value="" disabled>
                            Wybierz województwo
                          </option>
                          {regions.map((region) => (
                            <option value={region.value} key={region.value}>
                              {region.name}
                            </option>
                          ))}
                        </CustomSelect>
                        <div className="col-span-6 sm:col-span-3">
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
                            className="basic-single text-black mt-1 block rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
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
                              className="basic-single text-black mt-1 block col-span-6 sm:col-span-3 rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                      Umiejętności
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Umiejętności jakie posiadasz.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="shadow-md sm:rounded-md overflow-visible">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                          <label className="block text-sm font-medium text-gray-700">
                            Umiejętności
                          </label>
                          <CreatableSelect
                            placeholder="np. C#"
                            onChange={setSkills}
                            value={skills}
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
                      Certyfikaty
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Certyfikaty jakie uzyskałeś.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="shadow-md sm:rounded-md overflow-visible">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                          <label className="block text-sm font-medium text-gray-700">
                            Certyfikaty
                          </label>
                          <CreatableSelect
                            placeholder="np. AWS Certificate"
                            onChange={setCertificates}
                            value={certificates}
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

            {/* <div className="mt-10 sm:mt-0">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Notifications
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Decide which communications you'd like to receive and how.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="overflow-visible shadow-md sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                      <fieldset>
                        <legend className="sr-only">By Email</legend>
                        <div
                          className="text-base font-medium text-gray-900"
                          aria-hidden="true"
                        >
                          By Email
                        </div>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="comments"
                                name="comments"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="comments"
                                className="font-medium text-gray-700"
                              >
                                Comments
                              </label>
                              <p className="text-gray-700">
                                Get notified when someones posts a comment on a
                                posting.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="candidates"
                                name="candidates"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="candidates"
                                className="font-medium text-gray-700"
                              >
                                Candidates
                              </label>
                              <p className="text-gray-700">
                                Get notified when a candidate applies for a job.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="offers"
                                name="offers"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="offers"
                                className="font-medium text-gray-700"
                              >
                                Offers
                              </label>
                              <p className="text-gray-700">
                                Get notified when a candidate accepts or rejects
                                an offer.
                              </p>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset>
                        <legend className="contents text-base font-medium text-gray-900">
                          Push Notifications
                        </legend>
                        <p className="text-sm text-gray-700">
                          These are delivered via SMS to your mobile phone.
                        </p>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-center">
                            <input
                              id="push-everything"
                              name="push-notifications"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="push-everything"
                              className="ml-3 block text-sm font-medium text-gray-700"
                            >
                              Everything
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="push-email"
                              name="push-notifications"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="push-email"
                              className="ml-3 block text-sm font-medium text-gray-700"
                            >
                              Same as email
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="push-nothing"
                              name="push-notifications"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="push-nothing"
                              className="ml-3 block text-sm font-medium text-gray-700"
                            >
                              No push notifications
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6"></div>
                  </div>
                </div>
              </div>
            </div> */}
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
            {loading || error ? (
              <div className="mt-2 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="sumbit"
                  className="disabled inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Zapisz
                </button>
                <button
                  type="button"
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
    </Modal>
  );
};

export default EditProfile;

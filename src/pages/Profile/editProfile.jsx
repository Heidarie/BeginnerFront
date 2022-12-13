import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import CustomInput from "./components/CustomInput";
import CustomTextArea from "./components/CustomTextArea";
import CustomFile from "./components/CustomFile";
import { Form, Formik } from "formik";
import DatePicker from "react-date-picker";
import CreatableSelect from "react-select/creatable";
import Toast from "../Offers/components/Toast";
import UserService from "../../components/user.service";

const EditProfile = ({ hideModal }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gradDateStart, setGradDateStart] = useState(new Date());
  const [gradDateEnd, setGradDateEnd] = useState(new Date());
  const [expDateStart, setExpDateStart] = useState(new Date());
  const [expDateEnd, setExpDateEnd] = useState(new Date());
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    setError(false);
    setLoading(true);

    const updateValues = {
      Name: values.Name,
      Surname: values.Surname,
      Profession: values.Profession,
      Image: values.Image,
      Resumee: values.Resumee,
      "PersonalDataModel.Description": values.Description,
      "PersonalDataModel.Certificates": certificates?.map(
        (object) => object.value
      ),
      "PersonalDataModel.Skills": skills?.map((object) => object.value),
    };
    console.log(updateValues);

    const res = await UserService.updateUserData(updateValues);
    if (res.response.status === 200) {
      setLoading(false);
      console.log("res", res);
    } else {
      setLoading(false);
      setError(true);
      await new Promise((resolve) => {
        return setTimeout(resolve, 2000);
      });
      setError(false);
    }
  };
  return (
    <Modal hideModal={hideModal}>
      <Formik
        initialValues={{
          Name: "",
          Surname: "",
          Profession: "",
          Description: "",
          Image: "",
          Resume: "",
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
                            <svg
                              className="h-full w-full text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>

                          <CustomFile
                            name="Image"
                            type="file"
                            accept=".jpeg, .png, .jpg"
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
                  <div className="overflow-hidden shadow-md sm:rounded-md">
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
                          className="col-span-6 sm:col-span-6"
                          label="Profesja"
                          name="Profession"
                          type="text"
                          placeholder="AWS Developer"
                        />
                        {/* // <CustomInput
                        //   className="col-span-6 sm:col-span-3"
                        //   label="Kraj"
                        //   name="country"
                        //   type="text"
                        //   placeholder="Polska"
                        // />
                        // <CustomInput
                        //   className="col-span-6"
                        //   label="Adres"
                        //   name="address"
                        //   type="text"
                        //   placeholder="Kujawska 12/24"
                        // />
                        // <CustomInput
                        //   className="col-span-6 sm:col-span-6 lg:col-span-2"
                        //   label="Miasto"
                        //   name="city"
                        //   type="text"
                        //   placeholder="Warszawa"
                        // />
                        // <CustomInput
                        //   className="col-span-6 sm:col-span-6 lg:col-span-2"
                        //   label="Województwo"
                        //   name="state"
                        //   type="text"
                        //   placeholder="Kujawsko-Pomorskie"
                        // />
                        // <CustomInput
                        //   className="col-span-6 sm:col-span-6 lg:col-span-2"
                        //   label="Kod Pocztowy"
                        //   name="postalCode"
                        //   type="text"
                        //   placeholder="12-345"
                        // /> */}
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

            <div className="mt-10 sm:mt-0">
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
                  <div className="overflow-hidden shadow-md sm:rounded-md">
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
                              <p className="text-gray-500">
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
                              <p className="text-gray-500">
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
                              <p className="text-gray-500">
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
                        <p className="text-sm text-gray-500">
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
            </div>
            {loading && <Toast text="Ładowanie" icon="LOADING" />}

            {error && (
              <Toast
                text="Wystąpił bład przy aktualizacji danych"
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

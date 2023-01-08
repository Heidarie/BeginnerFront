import React, { useState } from "react";
import Modal from "../../../components/Modal";
import CustomInput from "./components/CustomInput";
import { Form, Formik } from "formik";
import DatePicker from "react-date-picker";
import Toast from "../../../components/Toast";

const EditExperience = ({ hideModal, experience, setExp, expList }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expDateFrom, setExpDateFrom] = useState(
    experience?.dateFrom || new Date()
  );
  const [expDateTo, setExpDateTo] = useState(experience?.dateTo || new Date());

  const onSubmit = async (values, actions) => {
    setError(false);
    setLoading(true);

    const updateValues = {
      dateFrom: expDateFrom,
      dateTo: expDateTo,
      position: values.position,
      employerName: values.employerName,
      description: values.description,
    };

    var newList = expList.filter((item) => item !== experience);
    console.log(newList);
    newList.push(updateValues);
    setExp(newList);

    setLoading(false);
    hideModal(true);
  };
  return (
    <Modal hideModal={hideModal} className="sm:max-w-4xl p-4">
      <Formik
        initialValues={{
          employerName: experience?.employerName || "",
          position: experience?.position || "",
          description: experience?.description || "",
        }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mt-10 sm:mt-0">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Doświadczenie
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Prace w których pracowałeś.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="shadow-md sm:rounded-md overflow-visible">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <CustomInput
                          className="col-span-3"
                          label="Nazwa firmy"
                          name="employerName"
                          type="text"
                          placeholder="np. Wyższa szkoła Bankowa w Poznaniu"
                        />
                        <CustomInput
                          className="col-span-3"
                          label="Tytuł"
                          name="position"
                          type="text"
                          placeholder="np. Wyższa szkoła Bankowa w Poznaniu"
                        />
                        <CustomInput
                          className="col-span-6"
                          label="Opis"
                          name="description"
                          type="text"
                          placeholder="Np. Inżynieryjskie"
                        />
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Data rozpoczęcia
                          </label>
                          <DatePicker
                            name="dateStartJob"
                            type="text"
                            onChange={setExpDateFrom}
                            value={expDateFrom}
                            className="mt-1 p-2 block w-full rounded-md text-black bg-gray-50 border-gray-300 shadow-sm focus:border-[#00df9a] focus:ring-[#00df9a] sm:text-sm"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Data zakończenia
                          </label>
                          <DatePicker
                            name="dateEndJob"
                            type="text"
                            onChange={setExpDateTo}
                            value={expDateTo}
                            className="mt-1 p-2 block w-full rounded-md text-black bg-gray-50 border-gray-300 shadow-sm focus:border-[#00df9a] focus:ring-[#00df9a] sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
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

export default EditExperience;

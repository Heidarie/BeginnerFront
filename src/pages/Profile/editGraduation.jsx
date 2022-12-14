import React, { useState } from "react";
import Modal from "../../components/Modal";
import CustomInput from "./components/CustomInput";
import { Form, Formik } from "formik";
import DatePicker from "react-date-picker";
import Toast from "../Offers/components/Toast";

const EditExperience = ({ hideModal, graduation, setGrad, gradList }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gradDateFrom, setGradDateFrom] = useState(
    graduation?.dateFrom || new Date()
  );
  const [gradDateTo, setGradDateTo] = useState(
    graduation?.dateTo || new Date()
  );

  const onSubmit = async (values, actions) => {
    setError(false);
    setLoading(true);

    const updateValues = {
      dateFrom: gradDateFrom,
      dateTo: gradDateTo,
      schoolName: values.schoolName,
      title: values.title,
      type: values.type,
    };

    var newList = gradList.filter((item) => item !== graduation);
    console.log(newList);
    newList.push(updateValues);
    setGrad(newList);

    setLoading(false);
    hideModal(true);
  };
  return (
    <Modal hideModal={hideModal}>
      <Formik
        initialValues={{
          schoolName: graduation?.schoolName || "",
          title: graduation?.title || "",
          type: graduation?.type || "",
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
                          className="col-span-6"
                          label="Nazwa uczelni"
                          name="schoolName"
                          type="text"
                          placeholder="np. Wyższa szkoła Bankowa w Poznaniu"
                        />
                        <CustomInput
                          className="col-span-3"
                          label="Kierunek studiów"
                          name="type"
                          type="text"
                          placeholder="Np. Inżynieryjskie"
                        />
                        <CustomInput
                          className="col-span-3"
                          label="Tytuł"
                          name="title"
                          type="text"
                          placeholder="np. Wyższa szkoła Bankowa w Poznaniu"
                        />
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Data rozpoczęcia
                          </label>
                          <DatePicker
                            name="dateStartJob"
                            type="text"
                            onChange={setGradDateFrom}
                            value={gradDateFrom}
                            className="mt-1 p-2 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Data zakończenia
                          </label>
                          <DatePicker
                            name="dateEndJob"
                            type="text"
                            onChange={setGradDateTo}
                            value={gradDateTo}
                            className="mt-1 p-2 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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

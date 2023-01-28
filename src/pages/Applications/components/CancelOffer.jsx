import React, { useState } from "react";
import Modal from "../../../components/Modal";
import { Field, Form, Formik } from "formik";
import EmployerService from "../../../components/employer.service";
import Toast from "../../../components/Toast";
import CustomSelect from "../../../components/form/CustomSelect";
import { regions } from "../../../assets/regions";
import { IoWarning } from "react-icons/io5";

const CancelOffer = ({ hideModal, offerPublicUrl }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values, actions) => {
    setError(false);
    setLoading(true);
    let { status, response } = await EmployerService.deleteOffer(
      offerPublicUrl,
      values.notifyApplicants
    );
    if (status === 200 || status === 201) {
      setLoading(false);
      hideModal(true);
      window.location.reload();
    } else {
      setLoading(false);
      setError(true);
      setErrorMessage(response?.data?.message);
      setTimeout(() => {
        setErrorMessage("");
        setError(false);
        hideModal(true);
      }, 3000);
    }
  };

  return (
    <Modal hideModal={hideModal} className="sm:max-w-2xl p-4">
      <Formik
        initialValues={{
          notifyApplicants: false,
        }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-700 ">
                  <IoWarning className="m-auto h-10 w-10 mb-[0.4rem] text-white" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h2
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    Zakończyć rekrutację?
                  </h2>
                  <div className="mt-2">
                    <p className="text-lg text-black">
                      Czy jesteś pewien, że chcesz zakończyć rekrutację?
                      <br /> Wszystkie publiczne dane dotyczące ogłoszenia
                      zostaną usunięte, ale nadal będzie można wyświetlić
                      aplikantów w celu weryfikacji.
                    </p>
                  </div>
                  <div className="flex items-center mx-auto mt-5 text-end">
                    <label
                      htmlFor="push-everything"
                      className="block text-medium text-black"
                    >
                      Powiadomić aplikantów o zakończeniu rekrutacji?
                    </label>
                    <Field
                      type="checkbox"
                      name="notifyApplicants"
                      className="mx-2 h-4 w-4 border-gray-300 text-[#00df9a] focus:ring-[#00df9a]"
                    />
                  </div>
                </div>
              </div>
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
            {loading || error ? (
              <div className="mt-2 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="sumbit"
                  disabled={true}
                  className="disabled inline-flex w-full justify-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Zakończ ofertę
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
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Zakończ ofertę
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

export default CancelOffer;

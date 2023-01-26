import React, { useState, useEffect } from "react";
import DataService from "../../components/data.service";
import EmployerService from "../../components/employer.service";
import Toast from "../../components/Toast";
import EmployerOffers from "./EmployerOffers";

const Applications = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(undefined);
  const [employerOffers, setEmployerOffers] = useState([]);

  const getEmployerOffers = async () => {
    setLoading(true);
    const { status, response, data } =
      await EmployerService.getEmployerOffers();
    if (status === 200 || status === 201) {
      setLoading(false);
      setEmployerOffers(data);
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
  const handleUserData = async () => {
    const { data } = await DataService.getUserData();
    setUser(data);
    if (data.role === "Employer") {
      getEmployerOffers();
    }
  };

  useEffect(() => {
    handleUserData();
  }, []);

  return (
    <div>
      {employerOffers.length !== 0 ? (
        employerOffers.map((offer) => (
          <EmployerOffers key={offer.publicUrl} offerDetails={offer} />
        ))
      ) : user?.role === "Employer" ? (
        <div className="flex h-screen justify-center items-center bg-gray-100">
          <div className="m-auto p-4">
            <h2 className="m-auto text-gray-600 font-extrabold text-6xl">
              Niestety, ale nie posiadasz żadnych ofert na swoim koncie.
            </h2>
          </div>
        </div>
      ) : (
        <div className="flex h-screen justify-center items-center bg-gray-100">
          <div className="m-auto p-4">
            <h2 className="m-auto text-gray-600 font-extrabold text-6xl">
              Niestety, ale tylko pracodawca może wystawić ofertę.
            </h2>
          </div>
        </div>
      )}

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
      {loading && <Toast text="Ładowanie twoich ofert." icon="LOADING" />}
    </div>
  );
};

export default Applications;

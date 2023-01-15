import React, { useState, useEffect } from "react";
import EmployerService from "../../components/employer.service";
import Toast from "../../components/Toast";
import EmployerOffers from "./EmployerOffers";

const Applications = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [employerOffers, setEmployerOffers] = useState([]);

  const getEmployerOffers = () => {
    setLoading(true);
    EmployerService.getEmployerOffers().then((res) => {
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        setLoading(false);
        setEmployerOffers(res.data);
      } else {
        setLoading(false);
        setError(true);
        setErrorMessage(res.response.data.message);
        setTimeout(() => {
          setErrorMessage("");
          setError(false);
        }, 3000);
      }
    });
  };

  useEffect(() => {
    getEmployerOffers();
  }, []);
  return (
    <div>
      {employerOffers.length !== 0 ? (
        employerOffers.map((offer) => (
          <EmployerOffers key={offer} offerDetails={offer} />
        ))
      ) : (
        <div className="flex h-screen justify-center items-center bg-gray-100">
          <div className="m-auto p-4">
            <h2 className="m-auto text-gray-600 font-extrabold text-6xl">
              Niestety, ale nie posiadasz żadnych ofert na swoim koncie.
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

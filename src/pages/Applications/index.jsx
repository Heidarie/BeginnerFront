import React, { useState, useEffect } from "react";
import EmployerService from "../../components/employer.service";
import Toast from "../../components/Toast";
import EmployerOffers from "./EmployerOffers";

const Applications = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);
  // const [employerOffers, setEmployerOffers] = useState();
  const employerOffers = [
    {
      jobType: "jobType",
      title: "offerTitle",
      profession: "profession",
      premium: true,
    },
    {
      jobType: "jobType",
      title: "offerTitle",
      profession: "profession",
      premium: false,
    },
  ];
  // const getEmployerOffers = (publicUrl) => {
  //   setLoading(true);
  //   if (publicUrl) {
  //     EmployerService.getEmployerOffers().then((res) => {
  //       setEmployerOffers(res.data);
  //       setLoading(false);
  //     });
  //   } else {
  //     setLoading(false);
  //     setError(true);
  //   }
  // };

  // useEffect(() => {
  //   // getEmployerOffers();
  // }, []);
  return (
    <div>
      {employerOffers.map((offer) => (
        <EmployerOffers key={offer} offerDetails={offer} />
      ))}
      {error && <Toast text={errorMessage} icon="ERROR" />}
      {loading && <Toast text="Ładowanie twoich ofert." icon="LOADING" />}
    </div>
  );
};

export default Applications;

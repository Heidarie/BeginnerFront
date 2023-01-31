import React, { useState, useEffect } from "react";
import AuthService from "../../components/auth.service";
import LoadingPage from "../../components/LoadingPage";
import Toast from "../../components/Toast";

const ConfirmAccount = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") || undefined;
  const mail = params.get("mail") || undefined;

  const ConfirmUserAccount = async (token, mail) => {
    setLoading(true);
    let { status, request, response } = await AuthService.confirmAccount(
      token,
      mail
    );
    if (status === 200) {
      setLoading(false);
      window.location.reload();
      window.location.replace(request.response);
    } else {
      setLoading(false);
      setError(true);
      setErrorMessage(response?.data?.message);
      setTimeout(() => {
        setErrorMessage("");
        setError(false);
      }, 3000);
    }
  };
  useEffect(() => {
    if (token && mail) {
      ConfirmUserAccount(token, mail);
    }
  }, [token, mail]);

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="m-auto">
        {loading ? (
          <LoadingPage start="Trwa" decorated="potwierdzanie" end="konta..." />
        ) : (
          <LoadingPage
            start="Konto zostało"
            decorated="potwierdzone!"
            colorClass={"decoration-[#da0202]"}
          />
        )}
      </div>
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
    </div>
  );
};

export default ConfirmAccount;

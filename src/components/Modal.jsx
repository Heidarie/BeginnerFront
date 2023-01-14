import React, { useEffect } from "react";
import { useRef } from "react";

const Modal = ({ hideModal, className, children }) => {
  const closeModal = (e) => {
    if (e.target === divRef.current) {
      hideModal(true);
    }
  };
  useEffect(() => {
    document.body.addEventListener("click", closeModal, true);
    return () => {
      document.body.removeEventListener("click", closeModal, true);
    };
  }, []);

  const divRef = useRef(null);

  return (
    <>
      <div
        className="relative z-10 "
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 mt-14"
            ref={divRef}
          >
            <div
              className={`relative transform overflow-visible rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full ${className}`}
            >
              <div className="bg-white ">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

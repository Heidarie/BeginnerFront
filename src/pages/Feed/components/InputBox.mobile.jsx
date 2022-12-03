import React, { useState, useEffect } from "react";
import { RiImageAddFill } from "react-icons/ri";
import AuthService from "../../../components/auth.service";

const InputBoxMobile = () => {
  const [user, setUser] = useState(undefined);

  // const inputRef = useRef(null);

  // const sendPost = (e) => {
  //   e.preventDefault();
  // };
  const setUserData = () => {
    setUser(AuthService.getCurrentUser());
  };

  useEffect(() => {
    setUserData();
  }, []);
  return (
    <div className="flex items-center justify-center drop-shadow-2xl mt-[6rem]">
      <div className="border p-5 shadow-md w-full bg-white">
        <div className="flex w-full items-center justify-between border-b pb-3">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]"></div>
            <div className="grid-rows-2 grid-flow-col text-lg font-bold text-slate-700">
              CUSTOM INPUT formik
              <div className="flex items-center space-x-8">
                <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
                  Kategoria
                </button>
              </div>
            </div>
          </div>
          <div className="grid-cols-1 items-center text-center">
            <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
              <RiImageAddFill className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-2">
          <div className="grid-cols-1 w-full text-center items-center">
            <textarea
              type="text"
              className="bg-gray-200 rounded-2xl w-full p-4 overflow-hidden"
              placeholder={`Co masz na myśli, ${user?.name}?`}
            />
            <button className="rounded-2xl border bg-neutral-100 px-2 py-2 text-md font-semibold">
              Opublikuj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputBoxMobile;

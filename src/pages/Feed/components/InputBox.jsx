import React, { useRef } from "react";
import { RiImageAddFill } from "react-icons/ri";
const InputBox = ({ name }) => {
  const inputRef = useRef(null);

  const sendPost = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex items-center justify-center md:my-5 drop-shadow-2xl">
      <div className="md:rounded-xl border p-5 shadow-md w-full md:w-10/12 xl:w-6/12 bg-white">
        <div className="flex w-full items-center justify-between border-b pb-3">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]"></div>
            <div className="grid-rows-2 grid-flow-col text-lg font-bold text-slate-700">
              Joe Smith
              <div className="flex items-center space-x-8">
                <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
                  Kategoria
                </button>
              </div>
            </div>
          </div>
          <div className="grid-cols-1 md:flex items-center text-center md:space-x-8">
            <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
              <RiImageAddFill className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-2 md:mt-4 md:mb-6">
          <div className="grid-cols-1 md:flex w-full text-center items-center md:justify-between md:space-x-8">
            <textarea
              type="text"
              className="bg-gray-200 rounded-2xl w-full p-4 overflow-hidden"
              placeholder={`Co masz na myśli, ${name}?`}
            />
            <button className="rounded-2xl border bg-neutral-100 px-2 py-2 md:px-4 md:py-4 text-md font-semibold">
              Opublikuj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputBox;

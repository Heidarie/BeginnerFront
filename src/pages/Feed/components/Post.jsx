import React, { useState } from "react";
import { IoMdCheckboxOutline, IoMdCheckbox } from "react-icons/io";
import { IoChatboxEllipsesSharp } from "react-icons/io5";

const Post = ({
  name,
  title,
  description,
  postImage,
  image,
  category,
  timestamp,
}) => {
  const [liked, setLiked] = useState(false);
  return (
    <div className="flex items-center justify-center my-5">
      <div className="rounded-xl border p-5 shadow-md w-11/12 md:w-10/12 xl:w-6/12 bg-white">
        <div className="flex w-full items-center justify-between border-b pb-3">
          <div className="flex items-center space-x-3">
            <div
              className="h-8 w-8 rounded-full bg-slate-400"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
            <div className="text-lg font-bold text-slate-700">{name}</div>
          </div>
          <div className="grid-cols-1 md:flex items-center text-center md:space-x-8">
            <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
              {category}
            </button>
            <div className="text-xs text-neutral-500">
              <p>{timestamp}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 mb-6">
          <div className="mb-3 text-xl font-bold">{title}</div>
          <div className="text-sm text-neutral-600 mb-2">{description}</div>
          <div
            className="flex items-center bg-cover object-fill max-h-[20rem] md:max-h-[40rem] h-screen justify-center px-20 bg-gray-900 bg-opacity-40"
            style={{ backgroundImage: `url(${postImage})` }}
          ></div>
        </div>

        <div>
          <div className="flex items-center justify-between text-slate-500">
            <div className="flex space-x-4 md:space-x-8">
              <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                <IoChatboxEllipsesSharp
                  className="h-6 w-6"
                  aria-hidden="true"
                />
                <span>125</span>
              </div>
              <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                <div onClick={() => setLiked(!liked)}>
                  {!liked ? (
                    <IoMdCheckboxOutline
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <IoMdCheckbox className="h-6 w-6" aria-hidden="true" />
                  )}
                </div>
                <span>4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

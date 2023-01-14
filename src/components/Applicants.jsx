import React from "react";
import { FiPaperclip } from "react-icons/fi";

const Applicants = () => {
  return (
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 mt-14">
      <div className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl mt-8 sm:w-full sm:max-w-5xl ">
        <div className="bg-gray-100 px-2 py-2 sm:p-4 ">
          <div className="overflow-hidden bg-white shadow sm:rounded-lg sm:max-w-6xl sm:w-full">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Applicant Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-700">
                Personal details and application.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-700">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    Margot Foster
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-700">
                    Application for
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    Backend Developer
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-700">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    margotfoster@example.com
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-700">
                    Salary expectation
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    $120,000
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-700">About</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                    incididunt cillum culpa consequat. Excepteur qui ipsum
                    aliquip consequat sint. Sit id mollit nulla mollit nostrud
                    in ea officia proident. Irure nostrud pariatur mollit ad
                    adipisicing reprehenderit deserunt qui eu.
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-700">
                    Attachments
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                      <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                        <div className="flex w-0 flex-1 items-center">
                          <FiPaperclip
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="ml-2 w-0 flex-1 truncate">
                            resume_back_end_developer.pdf
                          </span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <a
                            href="#a"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Download
                          </a>
                        </div>
                      </li>
                      <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                        <div className="flex w-0 flex-1 items-center">
                          <FiPaperclip
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="ml-2 w-0 flex-1 truncate">
                            coverletter_back_end_developer.pdf
                          </span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <a
                            href="#a"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Download
                          </a>
                        </div>
                      </li>
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applicants;

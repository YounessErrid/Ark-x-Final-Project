import React, { useState } from "react";

const AgencyProfile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [editDescription, setEditDescription] = useState(false);

  const handleEditEditPrfile = () => {
    setEditProfile(!editProfile);
  };
  const handleEditDescription = () => {
    setEditDescription(!editDescription);
  };

  const submitprofileChange = () => {};
  const submitDescriptionChange = () => {};

  return (
    <section class="relative pt-40 pb-24">
      <img
        src="https://pagedone.io/asset/uploads/1705473378.png"
        alt="cover-image"
        class="w-full absolute top-0 left-0 z-0 h-60"
      />

      <div className="absolute top-2 right-2">
        <button
          class="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
          onClick={handleEditEditPrfile}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </span>
          <span class="hidden md:inline-block">Edit</span>
        </button>
      </div>

      <div class="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div class="flex items-center justify-center sm:justify-start relative z-10 mb-5">
            <div className="relative">
                <img
                    src="https://pagedone.io/asset/uploads/1705471668.png"
                    alt="user-avatar-image"
                    class="border-4 border-solid border-white rounded-full"
                />

<div className="absolute top-0 right-2">
        <button
          class="text-slate-800 hover:text-blue-600 text-sm font-medium px-4 py-2 inline-flex space-x-1 items-center"
          onClick={handleEditEditPrfile}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </span>
        </button>
      </div>

            </div>
        </div>
        <div class="">
          <div class="bg-white p-6 rounded-lg shadow-md w-full mx-auto relative mb-7">
            {!editProfile ? (
              <div className="profile">
                <h3 class="font-manrope font-bold text-4xl text-gray-900 mb-4">
                  Agency Name
                </h3>
                <div class="space-y-2">
                  <p class="font-normal text-base leading-7 text-gray-500">
                    Address Address Address Address
                  </p>
                  <p class="font-normal text-base leading-7 text-gray-500">
                    email@example.com
                  </p>
                  <p class="font-normal text-base leading-7 text-gray-500">
                    +212-347-6888
                  </p>
                </div>
                <div className="absolute top-2 right-2">
                  <button
                    class="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                    onClick={handleEditEditPrfile}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </span>
                    <span class="hidden md:inline-block">Edit</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <form class="">
                  <div class="flex flex-wrap rounded-lg p-3 dark:bg-gray-600">
                    <h2 class="text-xl text-gray-600 dark:text-gray-300 pb-2">
                      Account settings:
                    </h2>

                    <div class="flex flex-col gap-2 w-full border-gray-400">
                      <div>
                        <label class="text-gray-600 dark:text-gray-400">
                          Agency Name
                        </label>
                        <input
                          class="w-full py-3 border bg-white border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                          type="text"
                        />
                      </div>

                      <div>
                        <label class="text-gray-600 dark:text-gray-400">
                          Email
                        </label>
                        <input
                          class="w-full py-3 border bg-white border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                          type="text"
                        />
                      </div>
                      <div>
                        <label class="text-gray-600 dark:text-gray-400">
                          Phone
                        </label>
                        <input
                          class="w-full py-3 border bg-white border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                          type="tel"
                        />
                      </div>

                      <div class="flex justify-end">
                        <button
                          class="py-1.5 px-3 m-1 text-center bg-gray-400 border rounded-md text-white  hover:bg-gray-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                          onClick={() => {
                            setEditProfile(!editProfile);
                          }}
                        >
                          Cencel change
                        </button>
                        <button
                          class="py-1.5 px-3 m-1 text-center bg-blue-400 border rounded-md text-white  hover:bg-blue-300 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                          type="submit"
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md w-full mx-auto relative mb-7">
            {!editDescription ? (
              <div className="description">
                <h3 class="font-manrope font-bold text-4xl text-gray-900 mb-4">
                  description
                </h3>
                <div class="space-y-2">
                  <p class="font-normal text-base leading-7 text-gray-500">
                    your agency description
                  </p>
                </div>
                <div className="absolute top-2 right-2">
                  <button
                    class="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                    onClick={handleEditDescription}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </span>
                    <span class="hidden md:inline-block">Edit</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <form class="">
                  <div class="flex flex-wrap rounded-lg p-3 dark:bg-gray-600">
                    <h2 class="text-xl text-gray-600 dark:text-gray-300 pb-2">
                      Description:
                    </h2>

                    <div class="flex flex-col gap-2 w-full border-gray-400">
                      <div>
                        <textarea
                          class="w-full py-3 border bg-white border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                          name="bio"
                        ></textarea>
                      </div>
                      <div class="flex justify-end">
                        <button
                          class="py-1.5 px-3 m-1 text-center bg-gray-400 border rounded-md text-white  hover:bg-gray-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                          onClick={() => {
                            setEditDescription(!editDescription);
                          }}
                        >
                          Cencel change
                        </button>
                        <button
                          class="py-1.5 px-3 m-1 text-center bg-blue-400 border rounded-md text-white  hover:bg-blue-300 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                          type="submit"
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgencyProfile;

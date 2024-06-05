import React, { useEffect } from "react";
import mariagePhoto from "../../../assets/mariage.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAgency } from "../../../features/agenciesSlice";

const Portfolio = () => {
  const { id } = useParams();
  const { loading, error, agency } = useSelector((state) => state.agencies);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAgency(id));
  }, [])
  console.log(agency.agencyName);
  return (
    <div className="bg-white min-h-screen flex justify-center">
      <section className="p-5 h-full">
        <div className="container grid grid-cols-12 gap-6">
          {/* profile */}
          <div className="border-n30 col-span-12 rounded-xl border px-6 py-8 lg:col-span-4 min-h-screen">
            <div className="flex flex-col items-center justify-center">
              <div className="relative max-md:overflow-hidden">
                <div className="avatar">
                  <div className="w-32 mask mask-hexagon">
                    <img
                      src={`http://localhost:3000/${agency.profile_image}`}
                      alt="Profile"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 pt-6">
                <h4 className="heading-4">{agency.agencyName}</h4>
              </div>
              <p className="text-n300 pt-3 text-center text-sm">
                {agency.address}
              </p>
              <div className="w-full pt-8 sm:px-12">
                <a
                  className="relative block w-full rounded-full bg-n700 px-6 py-3 text-sm font-semibold text-white bg-black"
                  href="/chat"
                >
                  <div className="relative z-20 flex items-center justify-center gap-3">
                    <span className="text-xl">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 256 256"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.42,29.84l85.62,40.55,40.55,85.62A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14L118.42,148.9l47.24-47.25a8,8,0,0,0-11.31-11.31L107.1,137.58,24,98.22l.14,0L216,40Z" />
                      </svg>
                    </span>
                    <span>Get in touch</span>
                  </div>
                </a>
              </div>
            </div>

            {/* about agency */}
            <div className="flex flex-col items-start justify-start gap-3 pt-8">
              <p className="text-lg font-semibold text-gray-800">SERVICES</p>
              <div className="text-gray-600 flex flex-wrap gap-2">
                <p className="bg-blue-50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                  <span>Handyman</span>
                </p>
                <p className="bg-blue-50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                  <span>Cleaning</span>
                </p>
                <p className="bg-blue-50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                  <span>Plumber</span>
                </p>
                <p className="bg-blue-50 rounded-xl px-3 py-2 font-medium">
                  +3
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start justify-start gap-3 pt-8">
              <p className="text-lg font-semibold text-gray-800">ABOUT</p>
              <p className="text-gray-600">
                Welcome to Servibe where convenience meets quality. Discover a
                seamless platform connecting you with trusted service providers
                effortlessly.
              </p>
            </div>

            <div className="flex flex-col items-start justify-start gap-3 pt-8">
              <p className="text-lg font-semibold text-gray-800">LINKS</p>
              <div className="flex items-center justify-start gap-3">
                {/*  */}
                <a
                  className="border-gray-700 hover:border-blue-300 hover:bg-blue-300 flex cursor-pointer items-center justify-center rounded-full border p-2.5 duration-500 hover:text-white"
                  href="#"
                >
                  <span className="!leading-none">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 256 256"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z" />
                    </svg>
                  </span>
                </a>

                <a
                  className="border-gray-700 hover:border-blue-300 hover:bg-blue-300 flex cursor-pointer items-center justify-center rounded-full border p-2.5 duration-500 hover:text-white"
                  href="#"
                >
                  <span className="!leading-none">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 256 256"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z" />
                    </svg>
                  </span>
                </a>

                <a
                  className="border-gray-700 hover:border-blue-300 hover:bg-blue-300 flex cursor-pointer items-center justify-center rounded-full border p-2.5 duration-500 hover:text-white"
                  href="#"
                >
                  <span className="!leading-none">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 256 256"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
                    </svg>
                  </span>
                </a>

                <a
                  className="border-gray-700 hover:border-blue-300 hover:bg-blue-300 flex cursor-pointer items-center justify-center rounded-full border p-2.5 duration-500 hover:text-white"
                  href="#"
                >
                  <span className="!leading-none">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 256 256"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M160,80a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H168A8,8,0,0,1,160,80Zm-24,78a42,42,0,0,1-42,42H32a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H90a38,38,0,0,1,25.65,66A42,42,0,0,1,136,158ZM40,116H90a22,22,0,0,0,0-44H40Zm80,42a26,26,0,0,0-26-26H40v52H94A26,26,0,0,0,120,158Zm128-6a8,8,0,0,1-8,8H169a32,32,0,0,0,56.59,11.2,8,8,0,0,1,12.8,9.61A48,48,0,1,1,248,152Zm-17-8a32,32,0,0,0-62,0Z" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* service */}
          <div className="border-n30 col-span-12 rounded-xl border p-4 sm:p-8 lg:col-span-8">
            <h3 className="text-2xl font-bold text-gray-900">
              Elevating Cleanliness Standards with Professional Cleaning
              Services
            </h3>
            <p className="text-gray-700 pt-3 font-medium">
              Elevate cleanliness standards with our professional cleaning
              services. Experience spotless spaces and impeccable results every
              time you book with us.
            </p>
            <h4 className="text-xl font-bold text-gray-900 pt-10">Services</h4>
            <div className="flex flex-col gap-4 pt-6">
              <ul className="flex flex-col gap-y-5 ">
                {/* Card 1 */}
                <li className="flex flex-col sm:flex-row items-start gap-6  rounded-lg p-4 shadow-md">
                  <div className="w-full sm:w-60 h-auto sm:h-full flex-shrink-0">
                    <img
                      src={mariagePhoto}
                      alt="Headless UI"
                      className="w-full h-full rounded-lg shadow-md object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between w-full h-full">
                    <div className="flex-grow">
                      <h3 className="text-slate-900 font-semibold">
                        <span className="block text-sm leading-6 text-indigo-500">
                          Headless UI
                        </span>
                        Completely unstyled, fully accessible UI components
                      </h3>
                      <p className="text-slate-600 mt-2">
                        Completely unstyled, fully accessible UI components,
                        designed to integrate beautifully with Tailwind CSS.
                      </p>
                    </div>
                    <div className="flex mt-4 justify-end">
                      <a
                        className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 mr-2"
                        href="#"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </li>

                {/* Card 2 */}
                <li className="flex flex-col sm:flex-row items-start gap-6  rounded-lg p-4 shadow-md">
                  <div className="w-full sm:w-60 h-auto sm:h-full flex-shrink-0">
                    <img
                      src={mariagePhoto}
                      alt="Headless UI"
                      className="w-full h-full rounded-lg shadow-md object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between w-full h-full">
                    <div className="flex-grow">
                      <h3 className="text-slate-900 font-semibold">
                        <span className="block text-sm leading-6 text-indigo-500">
                          Headless UI
                        </span>
                        Completely unstyled, fully accessible UI components
                      </h3>
                      <p className="text-slate-600 mt-2">
                        Completely unstyled, fully accessible UI components,
                        designed to integrate beautifully with Tailwind CSS.
                      </p>
                    </div>
                    <div className="flex mt-4 justify-end">
                      <a
                        className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 mr-2"
                        href="#"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </li>

                {/* Card 3 */}
                <li className="flex flex-col sm:flex-row items-start gap-6  rounded-lg p-4 shadow-md">
                  <div className="w-full sm:w-60 h-auto sm:h-full flex-shrink-0">
                    <img
                      src={mariagePhoto}
                      alt="Headless UI"
                      className="w-full h-full rounded-lg shadow-md object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between w-full h-full">
                    <div className="flex-grow">
                      <h3 className="text-slate-900 font-semibold">
                        <span className="block text-sm leading-6 text-indigo-500">
                          Headless UI
                        </span>
                        Completely unstyled, fully accessible UI components
                      </h3>
                      <p className="text-slate-600 mt-2">
                        Completely unstyled, fully accessible UI components,
                        designed to integrate beautifully with Tailwind CSS.
                      </p>
                    </div>
                    <div className="flex mt-4 justify-end">
                      <a
                        className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 mr-2"
                        href="#"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;

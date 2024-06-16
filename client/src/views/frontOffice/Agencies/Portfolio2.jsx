import React, { useEffect } from "react";
import mariagePhoto from "../../../assets/mariage.jpeg";
import { BiCheckCircle } from "react-icons/bi"; // Assuming you have this imported for the icons
import { useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import ServiceCards from "./ServiceCards";
import AddService from "./AddService";

const Portfolio = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    // <!-- component -->
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow p-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 lg:gap-8">
          <div className="post pr-6 pt-6 lg:p-1 rounded-md">
            <div className="bg-white p-8 rounded-lg shadow-md w-full mb-4">
              <div className="relative">
                <img
                  src={mariagePhoto}
                  alt="Banner Profile"
                  className="w-full rounded-t-lg"
                />
                <img
                  src={mariagePhoto}
                  alt="Profile Picture"
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white"
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-2 pt-6 mt-7">
                <h2 className="text-2xl font-bold text-gray-900">
                  Agency Name
                </h2>
                <p className="text-lg text-gray-600">Casablanca, Morocco</p>
              </div>
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
                  seamless platform connecting you with trusted service
                  providers effortlessly.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 p-4 bg-white mt-3  " id="posted">

            <div className=" flex justify-end">
            <Link to="/portfolio/service">
              <button
                className="h-10 text-white flex justify-center items-center gap-2 bg-black px-3 rounded-md mb-4"
              >
                <CiCirclePlus className="h-6 w-6" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Service
                </span>
              </button>
            </Link>
            </div>
            {/* cards */}
            <Routes>
            <Route path="/" element={<ServiceCards/>} />
            <Route path="/service" element={<AddService/>} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;

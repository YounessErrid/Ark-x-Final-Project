import React, { useEffect, useState } from "react";
import mariagePhoto from "../../../assets/mariage.jpeg";
import { BiCheckCircle } from "react-icons/bi"; // Assuming you have this imported for the icons
import { IoIosArrowDropleft } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import ServiceCards from "./ServiceCards";
import AddService from "./AddService";
import { fetchAgencyPortfolio } from "../../../features/porfolioServiceSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateServie from "./UpdateService";
import { Spinner } from "../../../components/Spinner";
import { fetchAgency } from "../../../features/agenciesSlice";
import { FaEnvelope, FaPhone, FaTimes } from "react-icons/fa";

const Portfolio = () => {
  const [addServiceMode, setAddServiceMode] = useState(false);
  const [showGetInTouch, setShowGetInTouch] = useState(false);

  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { portfolioServices, loading } = useSelector((state) => state.portfolioservice);
  const { agencyName, addresse, description, logo, cover, service } = useSelector((state) => state.portfolioservice.portfolioServices);
  const { agency } = useSelector((state) => state.agencies);
  const { isAuthenticated } = useSelector((state) => state.user);
  const uniqueTitles = new Set();


  useEffect(() => {
    dispatch(fetchAgencyPortfolio(id));
  }, [dispatch, navigate]);

  const handleAddServiceMode = () => {
    setAddServiceMode(!addServiceMode);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleGetInTouchClick = () => {
    setShowGetInTouch(!showGetInTouch);
    dispatch(fetchAgency(id));
  };

 

  if(!portfolioServices) return null

  return (
    // <!-- component -->
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow p-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 lg:gap-8">
          <div className="post pr-6 pt-6 lg:p-1 rounded-md relative">
            <div className="flex justify-end pr-8">
              <Link to={`/agency/profile/${id}`}>
                <button className=" rounded-full text-black hover:text-gray-500 font-extrabold">
                  <div className="flex gap-3 justify-center items-center">
                    <span>
                      <svg
                        className="w-8 h-8"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                        />
                      </svg>
                    </span>
                  </div>
                </button>
              </Link>
            </div>
            <div className="bg-white p-8 pt-0 rounded-lg shadow-md w-full mb-4 ">
              <div className="relative">
                <img
                  src={cover ?`http://localhost:3000/${cover}` : 'https://via.placeholder.com/800x400'}
                  alt="Banner Profile"
                  className="w-full rounded-t-lg h-48 object-cover"
                />
                <img
                  src={logo ?`http://localhost:3000/${logo}` : 'https://i.pravatar.cc/2'}
                  alt="Profile Picture"
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white"
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-2 pt-6 mt-7">
                <h2 className="text-2xl font-bold text-gray-900">
                  {agencyName}
                </h2>
                <p className="text-lg text-gray-600">
                  {addresse}
                </p>
              </div>
              <div className="w-full pt-8 sm:px-12">
              <button
                  className="relative block w-full rounded-full bg-n700 px-6 py-3 text-sm font-semibold text-white bg-black"
                  onClick={handleGetInTouchClick}
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
                </button>
              </div>
              <div className="flex flex-col items-start justify-start gap-3 pt-8">
                <p className="text-lg font-semibold text-gray-800">SERVICES</p>
                <div className="text-gray-600 flex flex-wrap gap-2">
                  {service && service.map(
                    (serv, index) => {
                     
                      if (!uniqueTitles.has(serv?.title)) {
                        uniqueTitles.add(serv?.title);
                        return (
                          <p
                            key={serv?._id}
                            className="bg-blue-50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium"
                          >
                            <span>{serv?.title}</span>
                          </p>
                        );
                      }
                      return null;
                    }
                  )}
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-3 pt-8">
                <p className="text-lg font-semibold text-gray-800">ABOUT</p>
                <p className="text-gray-600">
                  {description}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 p-4 bg-white mt-3  " id="posted">
            {!addServiceMode ? (
              <div className=" flex justify-end">
                <Link to={`/portfolio/${id}/service`}>
                  <button
                    className="h-10 text-white flex justify-center items-center gap-2 bg-black hover:bg-gray-800 px-3 rounded-md mb-4"
                    onClick={handleAddServiceMode}
                  >
                    <CiCirclePlus className="h-6 w-6" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Service
                    </span>
                  </button>
                </Link>
              </div>
            ) : (
              <div className=" flex justify-start">
                <Link to={`/portfolio/${id}`}>
                  <button
                    className="h-10 text-white flex justify-center items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 rounded-md mb-4"
                    onClick={handleAddServiceMode}
                  >
                    <IoIosArrowDropleft className="h-6 w-6 text-black" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap text-black">
                      Go Back
                    </span>
                  </button>
                </Link>
              </div>
            )}

            {/* cards */}
            <ToastContainer />

            <Routes>
              <Route path="/" element={<ServiceCards handleAddServiceMode={handleAddServiceMode} />} />
              <Route
                path="/service"
                element={
                  <AddService handleAddServiceMode={handleAddServiceMode} />
                }
              />
              <Route
                path="/update/:serviceId"
                element={
                  <UpdateServie handleAddServiceMode={handleAddServiceMode} />
                }
              />
            </Routes>
          </div>
        </div>
      </main>
      {showGetInTouch ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Contact Information
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex items-center my-4 text-gray-700 text-lg leading-relaxed">
                    <FaEnvelope className="mr-3 text-blue-500" />
                    <span className="mr-4">
                      <strong>Email:</strong>
                    </span>
                    <span>
                    {agency && agency.email}
                    </span>
                  </div>
                  <div className="flex items-center my-4 text-gray-700 text-lg leading-relaxed">
                    <FaPhone className="mr-3 text-green-500" />
                    <span className="mr-4">
                      <strong>Phone:</strong>
                    </span>
                    <span>{agency && agency.phone}</span>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowGetInTouch(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default Portfolio;

import React, { useEffect, useState } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchPortfolioService, likePortfolioService, removeLikePortfolioService } from "../../../features/porfolioServiceSlice";
import DOMPurify from "dompurify";
// import 'react-quill/dist/quill.snow.css'
// import './style.css';
import { FaHeart, FaRegHeart } from "react-icons/fa"; 
import { fetchAgency } from "../../../features/agenciesSlice";
import { FaEnvelope, FaPhone, FaTimes } from "react-icons/fa";

const ServiceDetails = () => {
  const [showGetInTouch, setShowGetInTouch] = useState(false);


  const dispatch = useDispatch();
  const { portfolioService } = useSelector((state) => state.portfolioservice);
  const { user } = useSelector((state) => state.user);
  const { portfolioServiceId, agencyId } = useParams();
  const { agency } = useSelector((state) => state.agencies);

  useEffect(() => {
    dispatch(fetchPortfolioService(portfolioServiceId));
  }, [dispatch]);


  const handleGetInTouchClick = () => {
    setShowGetInTouch(!showGetInTouch);
    const id = agencyId
    dispatch(fetchAgency(id));
  };
  // useEffect(() => {
  //   console.log(portfolioService);
  // }, [portfolioService]);

  const cleanDescription = DOMPurify.sanitize(
    portfolioService?.description || "",
    {
      USE_PROFILES: { html: true },
    }
  );

  const handleLikeButton = (userId, portfolioServiceId) => {
   

    const liked = portfolioService.likes.includes(userId)

    if(liked){
      return dispatch(removeLikePortfolioService({userId, portfolioServiceId}))
    }
    dispatch(likePortfolioService({userId, portfolioServiceId}))

  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  

  return (
    <div className="font-sans bg-white p-4">
      <div className="grid items-start grid-cols-1 lg:grid-cols-4 gap-x-12 max-w-6xl mx-auto">
        {/* Image Section */}
        {user?.role === "agency" && (
          <div className=" flex justify-start lg:col-span-4">
            <Link to={`/portfolio/${user?.agencyId}`}>
              <button
                className="h-10 text-white flex justify-center items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 rounded-md mb-4"
                // onClick={handleAddServiceMode}
              >
                <IoIosArrowDropleft className="h-6 w-6 text-black" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap text-black">
                  Go Back
                </span>
              </button>
            </Link>
          </div>
        )}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <div className="bg-gray-300 p-12 rounded-xl h-full flex items-center justify-center">
            <img
              src={`http://localhost:3000/${portfolioService?.thumbnail}`}
              alt="Service Image"
              className="object-cover h-full w-full rounded"
              style={{ maxHeight: "300px", width: "auto" }}
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <h2 className="mt-4 sm:mt-0 text-3xl font-semibold text-black">
            {portfolioService?.name}
          </h2>
          <div className="flex items-center space-x-2 mt-4">
          <button
                  className="flex justify-center items-center gap-2 px-2 hover:bg-gray-100 rounded-full p-1"
                  onClick={() => handleLikeButton(user?.id, portfolioService._id)}
                >
                  {portfolioService.likes?.includes(user?.id) ? (<FaHeart className="w-5 h-5 text-red-600" />) : (<FaRegHeart className="text-gray-600 w-5 h-5" />)}
                  
                  <span>{portfolioService?.likes?.length} Likes</span>
                  
                </button>
          </div>
          <p className="text-gray-600 mt-4">
            {portfolioService?.shortDescription}
          </p>

          {/* Agency Info */}
          <div className="flex items-center p-4 rounded-lg shadow-sm mt-4">
            <img
              src={`http://localhost:3000/${portfolioService?.logo}`}
              alt="Agency"
              className="w-20 h-20 rounded-full mr-4"
            />
            <div className="flex flex-col space-y-3">
              <h2 className="text-xl font-bold text-black">
                {portfolioService?.agencyName}
              </h2>
              <p className="text-gray-400">{portfolioService?.addresse}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
          <button
                  className="relative block rounded-full bg-n700 px-6 py-3 text-sm font-semibold text-white bg-black"
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
        </div>

        {/* Description */}
        <div className="mt-8 lg:col-span-4">
          <h3 className="text-xl font-semibold text-black">
            About this service
          </h3>

          <div
            className="text-sm text-black mt-8"
            dangerouslySetInnerHTML={{ __html: cleanDescription }}
          ></div>
        </div>
      </div>

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

export default ServiceDetails;

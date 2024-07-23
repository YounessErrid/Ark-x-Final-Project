import React, { useEffect } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchPortfolioService } from "../../../features/porfolioServiceSlice";
import DOMPurify from "dompurify";
// import 'react-quill/dist/quill.snow.css'
// import './style.css';

const ServiceDetails = () => {
  const dipsatch = useDispatch();
  const { portfolioService } = useSelector((state) => state.portfolioservice);
  const { user } = useSelector((state) => state.user);
  const { portfolioServiceId } = useParams();

  useEffect(() => {
    dipsatch(fetchPortfolioService(portfolioServiceId));
  }, [dipsatch]);

  useEffect(() => {
    console.log(portfolioService);
  }, [portfolioService]);

  const cleanDescription = DOMPurify.sanitize(
    portfolioService?.description || "",
    {
      USE_PROFILES: { html: true },
    }
  );

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
            <button className="flex justify-center items-center gap-2  hover:bg-gray-50 rounded-full p-1">
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>42 Likes</span>
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
              type="button"
              className="min-w-[200px] px-4 py-3 bg-primary  text-white text-sm font-semibold rounded"
            >
              Get in touch
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
    </div>
  );
};

export default ServiceDetails;

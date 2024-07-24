import React, { useEffect } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchPortfolioService, likePortfolioService, removeLikePortfolioService } from "../../../features/porfolioServiceSlice";
import DOMPurify from "dompurify";
// import 'react-quill/dist/quill.snow.css'
// import './style.css';
import { FaHeart, FaRegHeart } from "react-icons/fa"; 

const ServiceDetails = () => {
  const dispatch = useDispatch();
  const { portfolioService } = useSelector((state) => state.portfolioservice);
  const { user } = useSelector((state) => state.user);
  const { portfolioServiceId } = useParams();

  useEffect(() => {
    dispatch(fetchPortfolioService(portfolioServiceId));
  }, [dispatch]);

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

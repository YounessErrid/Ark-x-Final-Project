import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import { likePortfolioServices, removeLikePortfolioServices } from "../../../features/porfolioServiceSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa"; 

const ServiceCardsView = () => {
  const [isOpenId, setIsOpenId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const { portfolioServices } = useSelector((state) => state.portfolioservice.portfolioServices);  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const {user} = useSelector(
    (state) => state.user
  );
  const toggleMenu = (id) => {
    setIsOpenId((prevId) => (prevId === id ? null : id));
  };

  const handleCloseDropMenu = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpenId((prev) => prev == null);
    }
  };

  const cardPerPage = 6;

  const totalPages = portfolioServices ?Math.ceil(portfolioServices.length/ cardPerPage) : 0

  const startIndex = currentPage * cardPerPage
  const endIndex = startIndex + cardPerPage

  const currentCards = portfolioServices ? portfolioServices.slice(startIndex, endIndex) : []

  const handlePageChange = (data)=>{
    
    setCurrentPage(data.selected)
  }

  const handleLikeButton = (userId, portfolioServiceId) => {
    const portfolioService = currentCards.find(card => card._id == portfolioServiceId)

    if(!portfolioService) {
      return null
    }

    const liked = portfolioService.likes.includes(userId)

    if(liked){
      return dispatch(removeLikePortfolioServices({userId, portfolioServiceId}))
    }
    dispatch(likePortfolioServices({userId, portfolioServiceId}))

  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseDropMenu);

    return () => {
      document.addEventListener("mousedown", handleCloseDropMenu);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Example of a card */}
      {currentCards && currentCards.map((serv) => (
        <div
          key={serv?._id}
          className="bg-white p-8 rounded-lg shadow-md relative"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-slate-900 font-bold">{serv?.name}</h3>
              <div className="text-slate-600 mt-2">
                <p>{serv?.shortDescription}</p>
              </div>
              <span className="block mt-2 text-sm leading-6 text-indigo-500">
                {serv?.service?.title}
              </span>
            </div>
            <div className="text-gray-500 cursor-pointer absolute top-2 right-2">
             
            </div>
          </div>
          <div className="mb-4 overflow-hidden">
            <Link to={`/service-details/${serv?._id}`}>
            <img
              src={`http://localhost:3000/${serv?.thumbnail}`}
              alt="Post Image"
              className="w-full h-48 object-cover rounded-md cursor-pointer transform transition duration-500 hover:scale-110 "
            />
            </Link>
          </div>
          <div className="flex items-center justify-between text-gray-500">
            <div className="flex items-center space-x-2">
            <button
                  className="flex justify-center items-center gap-2 px-2 hover:bg-gray-100 rounded-full p-1"
                  onClick={() => handleLikeButton(user?.id, serv._id)}
                >
                  {serv.likes?.includes(user?.id) ? (<FaHeart className="w-5 h-5 text-red-600" />) : (<FaRegHeart className="text-gray-600 w-5 h-5" />)}
                  
                  <span>{serv?.likes?.length} Likes</span>
                  
                </button>
            </div>
            <Link to={`/service-details/${serv?._id}`}>
              <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-100 rounded-full p-1">
                <span>View details</span>
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 fill-current"
                >
                  <title />
                  <g data-name="Layer 2" id="Layer_2">
                    <path d="M1,16A15,15,0,1,1,16,31,15,15,0,0,1,1,16Zm28,0A13,13,0,1,0,16,29,13,13,0,0,0,29,16Z" />
                    <path d="M12.13,21.59,17.71,16l-5.58-5.59a1,1,0,0,1,0-1.41h0a1,1,0,0,1,1.41,0l6.36,6.36a.91.91,0,0,1,0,1.28L13.54,23a1,1,0,0,1-1.41,0h0A1,1,0,0,1,12.13,21.59Z" />
                  </g>
                </svg>
              </button>
            </Link>
          </div>
        </div>
      ))}
      <div className=" lg:col-span-2 mt-4 ">
      { portfolioServices && portfolioServices.length !== 0 && <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={totalPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageChange}
                  containerClassName={"pagination"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                  activeLinkClassName={"page-link-active"}
                />}

      </div>
    </div>
  );
};

export default ServiceCardsView;

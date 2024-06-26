import React, { useEffect, useRef, useState } from "react";
import mariagePhoto from "../../../assets/mariage.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { deletePortfolioService, fetchAgencyPortfolio } from "../../../features/porfolioServiceSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DOMPurify from 'dompurify';
import UpdateServie from "./UpdateService";


const ServiceCards = () => {
  const [isOpenId, setIsOpenId] = useState(null);
  const { portfolioServices } = useSelector((state) => state.portfolioservice);
  const menuRef = useRef(null)
  const dispatch = useDispatch()
  const {id} = useParams()
  const toggleMenu = (id) => {
    setIsOpenId(prevId => prevId === id ? null : id);
  };

  const handleCloseDropMenu = (e) =>{
    if(menuRef.current && !menuRef.current.contains(e.target)){
      setIsOpenId(prev => prev == null)
    }
  }

  const handleDeleteService = async (id) =>{
    try {
      await dispatch(deletePortfolioService(id)).unwrap()
      toast.success('Portfolio servie deleted successfully')
    } catch (error) {
      toast.success(`Error: ${error.message}`)
    }
  }

  const handleRanderHtml =(dirtyHtmlString)=>{
    let clean = DOMPurify.sanitize(dirtyHtmlString, {USE_PROFILES: {html: true}});
    return  <div
    dangerouslySetInnerHTML={{ __html: clean.split(" ").slice(0, 12).join(" ") }}
  />
  }

  useEffect(()=>{
    document.addEventListener("mousedown" , handleCloseDropMenu)

    return ()=>{
      document.addEventListener("mousedown" , handleCloseDropMenu)
    } 
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Example of a card */}
      {portfolioServices.portfolioId?.portfolioServices.map((serv) => (
        <div
          key={serv._id}
          className="bg-white p-8 rounded-lg shadow-md relative"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-slate-900 font-bold">{serv.name}</h3>
              <p className="text-slate-600 mt-2">
                
                {
                  handleRanderHtml(serv.description)
                }
              </p>
              <span className="block mt-2 text-sm leading-6 text-indigo-500">
                {serv.service.title}
              </span>
            </div>
            <div className="text-gray-500 cursor-pointer absolute top-2 right-2">
            <div className="relative inline-block text-left">
      <button
        type="button"
        className="hover:bg-gray-50 rounded-full p-1"
        onClick={() => toggleMenu(serv._id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="7" r="1" />
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="17" r="1" />
        </svg>
      </button>

      {isOpenId === serv._id && (
        <div
          className="absolute -mt-2 right-3 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          
        >
          <div className="" ref={menuRef}>
            <Link
              to={`/portfolio/${id}/update/${serv._id}`}
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100 rounded-md"
              
            >
              Edit
            </Link>
            
            <div
              
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100 rounded-md"
              onClick={() => handleDeleteService(serv._id)}
            >
              Delete
            </div>
          </div>
        </div>
      )}
    </div>
            </div>
          </div>
          <div className="mb-4">
            <img
              src={`http://localhost:3000/${serv.thumbnail}`}
              alt="Post Image"
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
          <div className="flex items-center justify-between text-gray-500">
            <div className="flex items-center space-x-2">
              <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                <svg
                  className="w-5 h-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>42 Likes</span>
              </button>
            </div>
            <Link to={'/'}>
              <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
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
    </div>
  );
};

export default ServiceCards;

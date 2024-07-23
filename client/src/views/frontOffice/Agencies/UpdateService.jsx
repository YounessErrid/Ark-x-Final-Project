import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import "react-quill/dist/quill.snow.css";
import ImageLoader from "./ImageLoader";
import { CiCirclePlus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { createPorfolioService, fetchAgencyPortfolio, updatePortfolioService } from "../../../features/porfolioServiceSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { fetchServices } from "../../../features/servicesSlice";

const UpdateServie = ({ handleAddServiceMode }) => {
  const [serviceName, setSrviceName] = useState("");
  const [seviceCatgory, setServiceCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, serviceId } = useParams();
  const { services } = useSelector((state) => state.services);
  const { portfolioServices } = useSelector((state) => state.portfolioservice.portfolioServices);
  useEffect(() => {
    if (portfolioServices) {
      const updatedService = portfolioServices?.find(
        (serv) => serv._id === serviceId
      );
      if (updatedService) {
        setSrviceName(updatedService.name);
        setServiceCategory(updatedService.service?._id || '');
        setThumbnail(updatedService.thumbnail);
        setDescription(updatedService.description) 
        setShortDescription(updatedService.shortDescription) 
      }
    }
  }, [id, portfolioServices, serviceId]);

  const handleDescription = (text) => {
    setDescription(text);
    
  };
  const handleShortDescriptionChange = (e) => {
    setShortDescription(e.target.value);
  };

  const handleTileChang = (e) => {
    const serviceName = e.target.value;
    // console.log(serviceName);
    setSrviceName(serviceName);
  };

  const handleThumbnailChange = (file) => {
    setThumbnail(file);
    // console.log('this is file', file);
  };

  const handleCategoryChange = (e) => {
    // console.log(e.target.value);
    setServiceCategory(e.target.value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (serviceName || thumbnail || description) {
      formData.append("name", serviceName);
      formData.append("description", description);
      formData.append("shortDescription", shortDescription);
      formData.append("service", seviceCatgory);
      formData.append("thumbnail", thumbnail);
      try {
        await dispatch(updatePortfolioService({formData, serviceId})).unwrap();
        await dispatch(fetchAgencyPortfolio(id))
        toast.success("Portfolio updated successfully");
        setTimeout(() => {
          navigate(`/portfolio/${id}`);
          handleAddServiceMode();
        }, 1500);
      } catch (error) {
        console.log(error);
        toast.error(`Error: ${error.error}`);
      }
    }
    // toast.error(`Error: All the feilds required`)
  };
  useEffect(() => {
    dispatch(fetchServices());
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div className="4xl:large-container grid grid-cols-12 gap-4 rounded-2xl bg-white p-4 max-4xl:mx-4 sm:gap-6 sm:p-10 shadow-md">
      <div className="col-span-12">
        <p className="pb-3 font-medium text-n100">Add Service Name*</p>
        <input
          type="text"
          onChange={handleTileChang}
          name="serviceName"
          value={serviceName}
          placeholder="Service"
          className="w-full bg-white rounded-xl border border-b50 bg-n10 p-3 outline-none placeholder:text-n800"
        />
      </div>
      <div className="col-span-12">
        <p className="pb-3 font-medium text-n100">Service Category*</p>
        <select
          type="text"
          placeholder="Service Category"
          className="w-full bg-white rounded-xl border border-b50 p-3 outline-none pr-8"
          onChange={handleCategoryChange}
          value={seviceCatgory}
        >
          <option value="">Select an option</option>
          {services &&
            services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.title}
              </option>
            ))}
        </select>
      </div>
      <div className="col-span-12 mb-6">
        <ImageLoader thumbnail={thumbnail} onFileUpload={handleThumbnailChange} />
      </div>
       {/* short Description */}
       <div className="mt-8 col-span-12">
        <p className="pb-3 font-medium text-n100">Summary Description*</p>
        <textarea
          type="text"
          onChange={handleShortDescriptionChange}
          name="shortDescription"
          value={shortDescription}
          placeholder="Short description..."
          className="w-full bg-white rounded-xl border border-b50 bg-n10 p-3 outline-none placeholder:text-n800"
        />
      </div>
      {/* Description */}
      <div className="mt-8 col-span-12 mb-6">
        <p className="pb-3 font-medium text-n100">Service Description*</p>
        <Editor
        description={description}
          onChange={handleDescription}
          placeholder="Type your service description here..."
        />
      </div>
      <div className=" mt-16 sm:mt-10 col-span-12 flex justify-end">
        <button
          className="h-10 text-white flex justify-center items-center gap-2 bg-black px-3 rounded-md mb-4"
          onClick={handleSubmit}
        >
          <span>Save Service</span>
        </button>
      </div>
    </div>
  );
};

export default UpdateServie;

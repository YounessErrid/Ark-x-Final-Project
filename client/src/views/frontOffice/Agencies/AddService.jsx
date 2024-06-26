import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import "react-quill/dist/quill.snow.css";
import ImageLoader from "./ImageLoader";
import { CiCirclePlus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { createPorfolioService } from "../../../features/porfolioServiceSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from 'dompurify';
import { fetchServices } from "../../../features/servicesSlice";


const AddService = ({handleAddServiceMode}) => {
  const [serviceName, setSrviceName] = useState("")
  const [seviceCatgory, setServiceCategory] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [description, setDescription] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams()
  const {services} = useSelector(state => state.services)

  const handleDescription = (text)=>{
    setDescription(text)
    console.log(text);
  }

  const handleTileChang = (e)=>{
    const serviceName = e.target.value
    // console.log(serviceName);
    setSrviceName(serviceName)
  }

  const handleThumbnailChange = (file)=>{
    setThumbnail(file)
    // console.log('this is file', file);
  }

  const handleCategoryChange =(e)=>{
    console.log(e.target.value);
    setServiceCategory(e.target.value)
  }

  const handleSubmit = async ()=>{
    const formData = new FormData()
    if (serviceName || thumbnail || description) {
      formData.append('name', serviceName)
      formData.append('description', description)
      formData.append('service', seviceCatgory)
      formData.append('thumbnail', thumbnail)
      try {
        await dispatch(createPorfolioService(formData)).unwrap()
        toast.success("Portfolio added successfully")
        setTimeout(()=>{
          navigate(`/portfolio/${id}`)
          handleAddServiceMode()
        }, 1500)
      } catch (error) {
        console.log(error);
        toast.error(`Error: ${error.error}`)
      }
    }
    // toast.error(`Error: All the feilds required`)
  }
  useEffect(()=>{
    dispatch(fetchServices())
  },[])

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
        >
          <option value="">Select an option</option>
          {
            services && services.map(service => (
              <option key={service._id} value={service._id}>{service.title}</option>
            ))
          }
        </select>
      </div>
      <div className="col-span-12 mb-6">
        <ImageLoader onFileUpload={handleThumbnailChange} />
      </div>
      {/* Description */}
      <div className="mt-8 col-span-12 mb-6">
        <p className="pb-3 font-medium text-n100">Service Description*</p>
        <Editor onChange={handleDescription} placeholder="Type your service description here..." />
      </div>
      <div className=" mt-16 sm:mt-10 col-span-12 flex justify-end">
        <button className="h-10 text-white flex justify-center items-center gap-2 bg-black px-3 rounded-md mb-4" onClick={handleSubmit}>
          <span>Save Service</span>
        </button>
      </div>
    </div>
  );
};

export default AddService;

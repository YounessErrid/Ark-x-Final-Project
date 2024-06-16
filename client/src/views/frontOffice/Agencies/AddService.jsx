import React, { useState } from "react";
import Editor from "./Editor";
import "react-quill/dist/quill.snow.css";
import ImageLoader from "./ImageLoader";
import { CiCirclePlus } from "react-icons/ci";
const AddService = () => {
  return (
    <div className="4xl:large-container grid grid-cols-12 gap-4 rounded-2xl bg-white p-4 max-4xl:mx-4 sm:gap-6 sm:p-10 shadow-md">
      <div className="col-span-12">
        <p className="pb-3 font-medium text-n100">Add Service Name*</p>
        <input
          type="text"
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
>
  <option value="hello">hello</option>
  <option value="hello">hello</option>
  <option value="hello">hello</option>
  <option value="hello">hello</option>
</select>


      </div>
      <div className="col-span-12 mb-6">
        <ImageLoader />
      </div>
      {/* Description */}
      <div className="mt-8 col-span-12 mb-6">
        <p className="pb-3 font-medium text-n100">Service Description*</p>
        <Editor placeholder="Type your service description here..." />
      </div>
      <div className=" mt-16 sm:mt-10 col-span-12 flex justify-end">
        <button
                className="h-10 text-white flex justify-center items-center gap-2 bg-black px-3 rounded-md mb-4"
              >
                
                <span>
                  Save Service
                </span>
              </button>
      </div>
    </div>
  );
};

export default AddService;

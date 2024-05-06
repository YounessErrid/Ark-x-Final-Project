// import React, { useState } from "react";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { FiUpload } from 'react-icons/fi';

// const Setting = () => {
//   const { isAuthenticated, error, user } = useSelector((state) => state.user);
//   // State variables to hold user data
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [profileImage, setProfileImage] = useState(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const schema = z.object({
//     fullname: z.string().min(4),
//     phone: z.string().min(10).max(10),
//     email: z.string().email(),
//     password: z.string().min(8),
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(schema),
//   });
//   const onSubmit = (data) => {};
//   const handleDrop = (e) => {
//     // e.preventDefault();
//     const droppedFile = e.dataTransfer.files[0];
//     setProfileImage(droppedFile);
//   };

//   // Function to handle file selection
//   const handleFileInputChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setProfileImage(selectedFile);
//   };

//   // Function to handle file input change
//   // const handleImageChange = (e) => {
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => {
//   //       setProfileImage(reader.result);
//   //     };
//   //     reader.readAsDataURL(file);
//   //   }
//   // };

//   return (
//     <div className="container w-full h-full">
//       <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
//         <div className="w-full">
//           <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
//             <div className="g-0">
//               <div className=" md:px-0 ">
//                 <div className="md:mx-6 md:p-12">
//                   <form onSubmit={handleSubmit(onSubmit)}>
//                     {error && <p className="text-red-400">{error}</p>}
//                     <p className="mb-8 text-xl">Update your Information</p>
//                     {profileImage && (
//                       <img
//                         src={profileImage}
//                         alt="Profile"
//                         className="mt-2 w-20 h-20 justify-center content-center rounded-full shadow-md"
//                       />
//                     )}
//                     {/* FullName input */}
//                     <div className="mb-8">
//                       <label
//                         htmlFor="username"
//                         className="block text-base font-normal text-gray-700 dark:text-gray-200"
//                       >
//                         FullName
//                       </label>
//                       <input
//                         type="text"
//                         id="username"
//                         placeholder="John Doe"
//                         {...register("fullname")}
//                         className="mt-1 w-full h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
//                       />
//                       {errors.fullname && (
//                         <p className="text-red-400">
//                           {errors.fullname.message}
//                         </p>
//                       )}
//                     </div>
//                     {/* Phone input */}
//                     <div className="mb-8">
//                       <label
//                         htmlFor="userPhone"
//                         className="block text-base font-normal text-gray-700 dark:text-gray-200"
//                       >
//                         Phone
//                       </label>
//                       <input
//                         type="text"
//                         id="userPhone"
//                         placeholder="123-456-7890"
//                         {...register("phone")}
//                         className="mt-1 w-full h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
//                       />
//                       {errors.phone && (
//                         <p className="text-red-400">{errors.phone.message}</p>
//                       )}
//                     </div>
//                     {/* Profile image input */}
//                     {/* <div className="mb-8">
//                       <label
//                         htmlFor="profileImage"
//                         className="block text-base font-normal text-gray-700 dark:text-gray-200"
//                       >
//                         Profile Image
//                       </label>
//                       <input
//                         type="file"
//                         id="profileImage"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="file-input file-input-bordered w-full"
//                       /> </div> */}
//                     <div className="min-h-screen flex justify-center items-center bg-gray-200">
//                       <div
//                         className="w-64 h-64 flex flex-col items-center justify-center border-4 border-dashed border-gray-400 rounded-lg"
//                         onDrop={handleDrop}
//                         onDragOver={(e) => e.preventDefault()}
//                       >
//                         <input
//                           type="file"
//                           className="hidden"
//                           onChange={handleFileInputChange}
//                           accept=".png, .jpg, .jpeg"
//                         />
//                         {profileImage ? (
//                           <div className="text-center">
//                             <FiUpload className="text-4xl mx-auto mb-4" />
//                             <p className="text-gray-600">{file.name}</p>
//                           </div>
//                         ) : (
//                           <div className="text-center">
//                             <FiUpload className="text-4xl mx-auto mb-4" />
//                             <p className="text-gray-600">
//                               Drag & drop your file here or click to browse
//                             </p>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div className="mb-12 pb-1 pt-1 text-center">
//                       <button className="btn btn-block bg-primary text-whiteDirty border-0">
//                         Update
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Setting;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiUpload } from 'react-icons/fi';

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  useEffect(() => {}, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const handleDrop = (e) => {
    // e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setProfileImage(droppedFile);
  };
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setProfileImage(selectedFile);
  };

  const submitHandler = (data) => {
    const { name, email, password } = data;
  };

  return (
    <section className="container mx-auto px-5 py-10">
      <div className="w-full max-w-sm mx-auto">
        {/* <ProfilePicture avatar={profileData?.avatar} /> */}
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="name"
              className="text-[#5a7184] font-semibold block"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                minLength: {
                  value: 1,
                  message: "Name length must be at least 1 character",
                },
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
              placeholder="Enter name"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.name ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.name?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="email"
              className="text-[#5a7184] font-semibold block"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Enter a valid email",
                },
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
              placeholder="Enter email"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.email ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.email?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="mb-8">
            <label
              htmlFor="profileImage"
              className="block text-base font-normal text-gray-700 dark:text-gray-200"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
            />{" "}
          </div>{" "}
        
          <button
            type="submit"
            // disabled={!isValid || profileIsLoading || updateProfileIsLoading}
            className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProfilePage;

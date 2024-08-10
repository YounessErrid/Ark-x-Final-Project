import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/userSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Setting from "./Setting";

const UpdateUser = () => {
  const user = useSelector((state) => state.user.user);
  const [profileImage, setProfileImage] = useState(
    user?.profile
      ? `http://localhost:3000/${user?.profile}`
      : "https://placehold.co/600x400"
  );
  const [selectedfile, setSelectedfile] = useState();
  const id = user?.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const schema = z.object({
    fullname: z.string().min(4),
  });

  useEffect(() => {}, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: user?.fullname,
    },
  });

  // const handleImageChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   if (selectedFile) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setProfileImage(e.target.result);
  //     };
  //     reader.readAsDataURL(selectedFile);
  //   }
  // };
  const handleImageChange = (e) => {
    setSelectedfile(e.target.files[0]);
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onSubmit = ({ fullname }) => {
    // console.log(selectedfile);
    // const formData = toFormData({fullname, selectedfile})
    // formData.append("fullname", fullname);
    // formData.append("profileImage", selectedfile);
    dispatch(updateUser({ id, userCredentials: { fullname, selectedfile } }));
    user?.role == "admin" ? navigate("/dashboard") : navigate('/');
  };
  return (
    <>
      <Setting />
      <section className="container mx-auto px-5 py-10">
        <div className="flex flex-col w-full max-w-sm mx-auto">
          <div className="avatar justify-center">
            <div className="w-24 h-24 rounded-full">
              <img src={profileImage} alt="Profile" />
            </div>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-8">
              <label
                htmlFor="username"
                className="block text-base font-normal text-gray-700 dark:text-gray-200"
              >
                FullName
              </label>
              <input
                type="text"
                id="username"
                placeholder="John Doe"
                {...register("fullname")}
                className="mt-1 w-full h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
              />
              {errors.fullname && (
                <p className="text-red-400">{errors.fullname.message}</p>
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
                id="profile_image"
                onChange={handleImageChange}
                className="file-input file-input-bordered w-full"
              />
            </div>
            <button
              // type="submit"
              onClick={handleSubmit(onSubmit)}
              className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Update
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateUser;

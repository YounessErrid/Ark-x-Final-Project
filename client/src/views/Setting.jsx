import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Setting = () => {
  const {  isAuthenticated, error , user} = useSelector((state) => state.user);
  // State variables to hold user data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = z.object({
    fullname: z.string().min(4),
    phone: z.string().min(10).max(10),
    email: z.string().email(),
    password: z.string().min(8),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit =  (data) => {

    dispatch(registerUser(data));
    isAuthenticated && navigate("/login");
  };


  // Function to handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    // <section className="gradient-form h-full bg-gray-300 dark:bg-neutral-700">
      <div className="container w-full m-auto h-full p-10">
        <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {error && <p className="text-red-400">{error}</p>}
                      <p className="mb-8 text-xl">Continue to your account</p>
                      {/* FullName input */}
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
                          <p className="text-red-400">
                            {errors.fullname.message}
                          </p>
                        )}
                      </div>
                      {/* Email input */}
                      {/* <div className="mb-8">
                        <label
                          htmlFor="userEmail"
                          className="block text-base font-normal text-gray-700 dark:text-gray-200"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="userEmail"
                          placeholder="john@rhcp.com"
                          {...register("email")}
                          className="mt-1 w-full h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
                        />
                        {errors.email && (
                          <p className="text-red-400">{errors.email.message}</p>
                        )}
                      </div> */}
                      {/* Phone input */}
                      <div className="mb-8">
                        <label
                          htmlFor="userPhone"
                          className="block text-base font-normal text-gray-700 dark:text-gray-200"
                        >
                          Phone
                        </label>
                        <input
                          type="text"
                          id="userPhone"
                          placeholder="123-456-7890"
                          {...register("phone")}
                          className="mt-1 w-full h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
                        />
                        {errors.phone && (
                          <p className="text-red-400">{errors.phone.message}</p>
                        )}
                      </div>
                      {/* Password input */}
                      <div className="mb-8">
                        <label
                          htmlFor="UserPassword"
                          className="block text-base font-normal text-gray-700 dark:text-gray-200"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="UserPassword"
                          placeholder="••••••••"
                          {...register("password")}
                          className="mt-1 w-full h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                        {errors.password && (
                          <p className="text-red-400">
                            {errors.password.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button className="btn btn-block bg-primary text-whiteDirty border-0">
                          Register
                        </button>
                        <a href="#!">Forgot password?</a>
                      </div>

                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 me-2">
                          You have an account?
                          <Link className="font-semibold underline" to="/login">
                            Login
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </section>
  );
};

export default Setting;

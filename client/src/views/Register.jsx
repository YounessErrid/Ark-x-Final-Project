import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.svg";
import loginSvg from "../assets/Login.svg";
import { registerUser } from "../features/userSlice";

const Register = () => {
  const { error } = useSelector((state) => state.user);
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
    const {error} =  dispatch(registerUser(data));
    if (!error) {
      navigate("/login");}
  };

  return (
    <section className="gradient-form h-full bg-gray-300 dark:bg-neutral-700">
      <div className="container w-full m-auto h-full p-10">
        <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img
                        className="mx-auto w-20 inline"
                        src={logo}
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        uEvent
                      </h4>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                      <div className="mb-8">
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
                      </div>
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
                        {error && <p className="text-red-400">{error}</p>}
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
                <div className="items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg hidden lg:block lg:rounded-bl-none">
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <img className=" m-auto" src={loginSvg} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

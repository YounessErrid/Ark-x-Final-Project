import React from "react";
import { Link } from "react-router-dom";
import { forgetPassword } from "../features/userSlice";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.svg";
import loginSvg from "../assets/Login.svg";

const ForgetPassword = () => {
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const schema = z.object({
    email: z.string().email(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (email) => {
    dispatch(forgetPassword({ email }));
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
                    <form action="submit" onSubmit={handleSubmit(onSubmit)}>
                      <p className="mb-8 font-medium text-xl">
                        Reset Your Account Password
                      </p>
                      <div className="mb-8">
                        <label
                          htmlFor="UserEmail"
                          className="block text-base font-normal text-gray-700 dark:text-gray-200"
                        >
                          Please enter your email for your account
                        </label>
                        <input
                          type="text"
                          id="UserEmail"
                          name="email"
                          placeholder="john@rhcp.com"
                          {...register("email")}
                          className="mt-1 w-full  h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
                        />
                        {errors.email && (
                          <p className="text-red-400">{errors.email.message}</p>
                        )}
                      </div>
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button className="btn btn-block bg-primary text-whiteDirty border-0">
                          Login
                        </button>
                        {error && <p className="text-red-400">{error}</p>}
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

export default ForgetPassword;

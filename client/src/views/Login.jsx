import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/userSlice";
import loginSvg from "../assets/Login.svg";
import logo from "../assets/logo.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const schema = z.object({
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
  const onSubmit = (e) => {
    // e.preventDefault();
    const user = { email, password };
    dispatch(loginUser(user));
  };
  return (
    <section class="gradient-form h-full bg-gray-300 dark:bg-neutral-700">
      <div class="container w-full m-auto h-full p-10">
        <div class="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div class="w-full">
            <div class="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div class="g-0 lg:flex lg:flex-wrap">
                <div class="px-4 md:px-0 lg:w-6/12">
                  <div class="md:mx-6 md:p-12">
                    <div class="text-center">
                      <img class="mx-auto w-20 inline" src={logo} alt="logo" />
                      <h4 class="mb-12 mt-1 pb-1 text-xl font-semibold">
                        uEvent
                      </h4>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <p class="mb-8 font-medium text-xl">
                        Continue to your account
                      </p>
                      <div className="mb-8">
                        <label
                          htmlFor="UserEmail"
                          class="block text-base font-normal text-gray-700 dark:text-gray-200"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          id="UserEmail"
                          placeholder="john@rhcp.com"
                          {...register("email")}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1 w-full h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                        {errors.email && (
                          <p className="text-red-400">{errors.email.message}</p>
                        )}
                      </div>
                      <div className="mb-8">
                        <label
                          htmlFor="UserPassword"
                          class="block text-base font-normal text-gray-700 dark:text-gray-200"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="UserPassword"
                          placeholder="••••••••"
                          {...register("password")}
                          onChange={(e) => setPassword(e.target.value)}
                          className="mt-1 w-full h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                        {errors.password && (
                          <p className="text-red-400">{errors.password.message}</p>
                        )}
                      </div>
                      <div class="mb-12 pb-1 pt-1 text-center">
                        <button
                          class="mb-3 inline-block w-full h-12 rounded border text-neutral-900 border-blue-500 px-6 pb-2 pt-2.5 text-base font-semibold uppercase leading-normal dark:text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                          type="submit"
                          data-twe-ripple-init
                          data-twe-ripple-color="light"
                        >
                          Log in
                        </button>
                        <a href="#!">Forgot password?</a>
                      </div>
                      <div class="flex items-center justify-between pb-6">
                        <p class="mb-0 me-2">Don't have an account?</p>
                        <button
                          type="button"
                          class="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950"
                          data-twe-ripple-init
                          data-twe-ripple-color="light"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg hidden lg:block lg:rounded-bl-none">
                  <div class="px-4 py-6 text-white md:mx-6 md:p-12">
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

export default Login;

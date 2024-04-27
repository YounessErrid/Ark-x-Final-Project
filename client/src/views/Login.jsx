import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/userSlice";
import loginSvg from "../assets/Login.svg";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, user, error, loading } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
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
    const newUser = { email, password };
    dispatch(loginUser(newUser));
    console.log(user);
    if (user.role == "admin") {
      navigate("/dashboard");
    }
  };
  useEffect(() => {}, [isAuthenticated, navigate]);

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
                      <p class="mb-8 font-medium text-xl">
                        Continue to your account
                      </p>
                      <div className="mb-8">
                        <label
                          htmlFor="UserEmail"
                          className="block text-base font-normal text-gray-700 dark:text-gray-200"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          id="UserEmail"
                          placeholder="john@rhcp.com"
                          {...register("email")}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1 w-full h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
                        />
                        {errors.email && (
                          <p className="text-red-400">{errors.email.message}</p>
                        )}
                      </div>
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
                          onChange={(e) => setPassword(e.target.value)}
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
                          Login
                        </button>
                        {error && <p className="text-red-400">{error}</p>}
                        <a href="#!">Forgot password?</a>
                      </div>

                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <button
                          type="submit"
                          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950"
                          data-twe-ripple-init
                          data-twe-ripple-color="light"
                        >
                          Register
                        </button>
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

export default Login;

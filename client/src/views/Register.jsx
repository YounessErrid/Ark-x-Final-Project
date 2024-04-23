import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/userSlice";

const Register = () => {
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");
  const dispatch = useDispatch();
  const schema = z.object({
    FullName: z
    .string({ required_error: "FullName is required" })
    .trim()
    .min(3, {
      message: "FullName must be at least 3 chars",
    })
    .max(255, { message: "FullName must not be more than 255 chars long" }),
    Email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, {
      message: "Email must be at least 3 chars",
    })
    .max(255, { message: "Email must not be more than 255 chars long" }),
    Phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(3, {
      message: "Phone number must be at least 10 chars",
    })
    .max(255, { message: "Phone number must not be more than 20 chars long" }),
    password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(3, {
      message: "Password must be at least 6 chars",
    })
    .max(255, { message: "Password must not be more than 1024 chars long" }),
});
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(schema),
});

const onSubmit = (data) => {
  const { FullName, Email, Phone, Password } = data;
  dispatch(registerUser(user));
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
                      <imcdg class="mx-auto w-20 inline" src={logo} alt="logo" />
                      <h4 class="mb-12 mt-1 pb-1 text-xl font-semibold">
                        uEvent
                      </h4>
                    </div>
                    <form>
                      <p class="mb-8 text-xl">Continue to your account</p>
                      <div class="relative mb-8" data-twe-input-wrapper-init>
                        <input
                          type="text"
                          class="peer block min-h-[auto] w-full rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                          id="exampleFormControlInput1"
                          placeholder="Username"
                        />
                        <label
                          for="exampleFormControlInput1"
                          class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                        >
                          FullName
                        </label>
                      </div>
                      <div class="relative mb-8" data-twe-input-wrapper-init>
                        <input
                          type="password"
                          class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                          id="exampleFormControlInput11"
                          placeholder="Password"
                        />
                        <label
                          for="exampleFormControlInput11"
                          class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                        >
                          Email
                        </label>
                      </div>
                      <div class="relative mb-8" data-twe-input-wrapper-init>
                        <input
                          type="password"
                          class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                          id="exampleFormControlInput11"
                          placeholder="Password"
                        />
                        <label
                          for="exampleFormControlInput11"
                          class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                        >
                          Phone
                        </label>
                      </div>
                      <div class="relative mb-8" data-twe-input-wrapper-init>
                        <input
                          type="password"
                          class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                          id="exampleFormControlInput11"
                          placeholder="Password"
                        />
                        <label
                          for="exampleFormControlInput11"
                          class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                        >
                          Password
                        </label>
                      </div>
                      <div class="mb-12 pb-1 pt-1 text-center">
                        <button
                          class="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong bg-gradient-to-r from-cyal to-pink"
                          type="button"
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

export default Register;

// MultiStepForm.js
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { registerAgency, checkAgencyEmail } from "../features/userSlice";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const steps = [
  { number: 1, description: "Basic Infos" },
  { number: 2, description: "Agency Details" },
  { number: 3, description: "Account Details" },
];

const basicInfoSchema = z.object({
  fullname: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
});

const agencyInfoSchema = z.object({
  agencyName: z.string().min(1, "Agency Name is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(5, "Zip Code must be at least 5 characters"),
});

const accountDetailsSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const schemas = [basicInfoSchema, agencyInfoSchema, accountDetailsSchema];

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agencyName: "",
    street: "",
    city: "",
    zipCode: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schemas[currentStep]),
    defaultValues: formData,
  });

  const onSubmit = async (data) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);

    if (currentStep === 0) {
      // Check if email already exists
      try {
        await dispatch(checkAgencyEmail({ email: data.email })).unwrap();
        setCurrentStep(currentStep + 1);
      } catch (err) {
        // Error is already handled by the slice
      }
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const { street, city, zipCode } = updatedFormData;
      const addresse = `${street}, ${city}, ${zipCode}`;
      const finalFormData = { ...updatedFormData, addresse };
      try {
        const res = await dispatch(registerAgency(finalFormData)).unwrap();
        toast.success("Agency created successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        console.log(err);
        console.log(error);
      }
    }
  };

  const handleEmailChange = async (e) => {
    const email = e.target.value;
    setValue("email", email);
    if (email) {
      try {
        await dispatch(checkAgencyEmail({ email })).unwrap();
      } catch (err) {
        // Error is already handled by the slice
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow min-h-[600px]">
        <div className="text-center">
          <Link to={"/"}>
            <img className="mx-auto w-20 inline" src={logo} alt="logo" />
            <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">uEvent</h4>
          </Link>
        </div>

        <ul className="relative flex flex-row gap-x-2 mb-11">
          {steps.map((step, index) => (
            <li
              key={index}
              className="flex items-center gap-x-2 shrink basis-0 flex-1 group"
              onClick={() => setCurrentStep(index)}
              style={{ cursor: "pointer" }}
            >
              <div className="min-w-7 min-h-7 inline-flex justify-center items-center text-xs align-middle">
                <span
                  className={`size-7 flex justify-center items-center flex-shrink-0 ${
                    currentStep >= index
                      ? index === 0 && error
                        ? "bg-red-600"
                        : "bg-primary"
                      : "bg-gray-800"
                  } font-medium text-white rounded-full`}
                >
                  {step.number}
                </span>
                <span
                  className={`ms-2 block text-sm font-medium ${
                    currentStep >= index
                      ? index === 0 && error
                        ? "text-red-600"
                        : "text-primary"
                      : "text-gray-800"
                  }`}
                >
                  {step.description}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-full h-px flex-1 ${
                    currentStep > index ? "bg-primary" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 0 && (
            <div>
              <div className="mb-8">
                <label
                  className="block text-base font-normal text-gray-700 mb-2"
                  htmlFor="fullname"
                >
                  Full Name
                </label>
                <input
                  className="w-full h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
                  type="text"
                  id="fullname"
                  name="fullname"
                  {...register("fullname")}
                  placeholder="Full Name"
                />
                {errors.fullname && (
                  <p className="text-red-500 text-sm">
                    {errors.fullname.message}
                  </p>
                )}
              </div>
              <div className="mb-8">
                <label
                  className="block text-base font-normal text-gray-700 mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
                  type="email"
                  id="email"
                  name="email"
                  {...register("email")}
                  placeholder="Email"
                  onChange={handleEmailChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <div className="mb-8">
                <label
                  className="block text-base font-normal text-gray-700 mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="w-full h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
                  type="text"
                  id="phone"
                  name="phone"
                  {...register("phone")}
                  placeholder="Phone"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
              <div className="flex float-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#f9ab77] text-white rounded-md hover:bg-secondary"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <div className="mb-8">
                <label
                  className="block text-base font-normal text-gray-700 mb-2"
                  htmlFor="agencyName"
                >
                  Agency Name
                </label>
                <input
                  className="w-full h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
                  type="text"
                  id="agencyName"
                  name="agencyName"
                  {...register("agencyName")}
                  placeholder="Agency Name"
                />
                {errors.agencyName && (
                  <p className="text-red-500 text-sm">
                    {errors.agencyName.message}
                  </p>
                )}
              </div>
              <div className="mb-8">
                <label
                  className="block text-base font-normal text-gray-700 mb-2"
                  htmlFor="street"
                >
                  Street
                </label>
                <input
                  className="w-full h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
                  type="text"
                  id="street"
                  name="street"
                  {...register("street")}
                  placeholder="Street"
                />
                {errors.street && (
                  <p className="text-red-500 text-sm">
                    {errors.street.message}
                  </p>
                )}
              </div>
              <div className="flex gap-4 mb-8">
                <div className="w-1/2">
                  <label
                    className="block text-base font-normal text-gray-700 mb-2"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <input
                    className="w-full h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
                    type="text"
                    id="city"
                    name="city"
                    {...register("city")}
                    placeholder="City"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <label
                    className="block text-base font-normal text-gray-700 mb-2"
                    htmlFor="zipCode"
                  >
                    Zip Code
                  </label>
                  <input
                    className="w-full h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    {...register("zipCode")}
                    placeholder="Zip Code"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex float-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#f9ab77] text-white rounded-md hover:bg-secondary"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <div className="mb-8">
                <label
                  className="block text-base font-normal text-gray-700 mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
                  type="password"
                  id="password"
                  name="password"
                  {...register("password")}
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="mb-8">
                <label
                  className="block text-base font-normal text-gray-700 mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  className="w-full h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  {...register("confirmPassword")}
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className="flex float-end">
                <button
                  type="submit"
                  className={`px-6 py-2 bg-[#f9ab77] text-white rounded-md ${
                    errors.confirmPassword
                      ? "cursor-not-allowed bg-gray-400"
                      : "hover:bg-secondary"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </form>

        {currentStep > 0 && (
          <div className="flex text-center mt-4">
            <button
              type="button"
              className="py-2 px-6 bg-gray-200 text-gray-700 rounded-md"
              onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
            >
              Back
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default MultiStepForm;

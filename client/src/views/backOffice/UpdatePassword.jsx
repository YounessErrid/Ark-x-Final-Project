import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../features/userSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Setting from "./Setting";

const UpdatePassword = () => {
  const { user, error } = useSelector((state) => state.user);
  const id = user.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const schema = z.object({
    oldPassword: z.string().min(8),
    newPassword: z.string().min(8),
  });

  useEffect(() => {}, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = async ({ oldPassword, newPassword }) => {
    try {
      await dispatch(
        changePassword({ id, userCredentials: { oldPassword, newPassword } })
      ).unwrap();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Setting />
      <section className="container mx-auto px-5 py-10">
        <div className="flex flex-col w-full max-w-sm mx-auto">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-8">
              <label
                htmlFor="oldPassword"
                className="block text-base font-normal text-gray-700 dark:text-gray-200"
              >
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                placeholder="••••••••"
                {...register("oldPassword")}
                className="mt-1 w-full h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
              />
              {errors.oldPassword && (
                <p className="text-red-400">{errors.oldPassword.message}</p>
              )}
            </div>
            <div className="mb-8">
              <label
                htmlFor="newPassword"
                className="block text-base font-normal text-gray-700 dark:text-gray-200"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                placeholder="••••••••"
                {...register("newPassword")}
                className="mt-1 w-full h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
              />
              {errors.newPassword && (
                <p className="text-red-400">{errors.newPassword.message}</p>
              )}
            </div>
            <button
              // type="submit"
              onClick={handleSubmit(onSubmit)}
              className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Update
            </button>
            {error && <p className="text-red-400">{error}</p>}
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdatePassword;

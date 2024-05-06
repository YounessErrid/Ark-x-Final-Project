import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Agencies } from "./Agencies";
import { Services } from "./Services";
import { Sidebar } from "../../components/Sidebar";
import Subscriptions from "./Subscriptions";
import Payments from "./Payments";
import { ToastContainer } from "react-toastify";
import { Clients } from "./Clients";
import { Status } from "./Status";
import { useSelector } from "react-redux";
import { Admins } from "./Admins";
import Setting from "../Setting";

export const Dashboard = () => {
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <div className=" bg-lightBlue" data-theme="light">
      <label
        className="btn btn-circle swap swap-rotate lg:hidden ms-4 mt-4"
        htmlFor="my-drawer-2"
      >
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" id="my-drawer-checkbox" />

        {/* hamburger icon */}
        <svg
          className="swap-off fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>

        {/* close icon */}
        <svg
          className="swap-on fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
      </label>
      <div className="flex">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center  mx-12 my-8">
            {/* Page content here */}
            <div className="flex justify-between items-center w-full">
              <h1 className="font-bold text-2xl">
                Hello {user?.fullname || "unknown"},👋🏼
              </h1>
              <div className="avatar online">
                <div className="w-10 rounded-full">
                  <img
                    src={`http://localhost:3000/${user?.profile}` ||"https://placehold.co/600x400"}
                    alt="Profile"
                  />
                </div>
                
              </div>
            </div>
            <Routes>
              <Route path="/" element={<Status />} />
              <Route path="/settings" element={<Setting />} />
              <Route path="/agencies" element={<Agencies />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/services" element={<Services />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/admins" element={<Admins />} />
            </Routes>
          </div>
          <Sidebar />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

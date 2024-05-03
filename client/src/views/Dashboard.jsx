import React from "react";
import { Route, Routes } from "react-router-dom";
import { Agencies } from "./Agencies";
import { Services } from "./backOffice/Services";
import { Sidebar } from "../components/Sidebar";
import Subscriptions from "./Subscriptions";
import Payments from "./Payments";
import Login from "./Login";
import { ToastContainer } from "react-toastify";
import Setting from "./Setting";

export const Dashboard = () => {
  return (
    <div className="flex bg-lightBlue" data-theme="light">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center  mx-12 my-8">
          {/* Page content here */}
          <Routes>
            <Route path="/agencies" element={<Agencies />} />
            <Route path="/services" element={<Services />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/setting" element={<Setting />}></Route>
          </Routes>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <Sidebar />
      </div>
      <ToastContainer />
    </div>
  );
};

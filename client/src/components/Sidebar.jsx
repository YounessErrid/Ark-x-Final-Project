import React from "react";
// import logo from '../assets/logo-Uevent.svg'
import   Logo from '../assets/logouevent.svg';

export const Sidebar = () => {
  return (
    <>
    <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 bg-whiteDirty content-start text-base-content">
          {/* Sidebar content here */}
          <img src={Logo} className="my-10" alt="React Logo" />
          <li>
            <a>Agencies</a>
          </li>
          <li>
            <a>Subscriptions</a>
          </li>
          <li>
            <a>Payments</a>
          </li>
        </ul>
      </div></>

  );
};

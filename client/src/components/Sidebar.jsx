import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logouevent.svg";
import { BiBuildingHouse, BiCategory, BiDollarCircle, BiSelectMultiple, BiUser } from "react-icons/bi";

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
          <li className="text-textGray text-lg w-full ">
            <Link
              className="hover:bg-primary hover:text-whiteDirty"
              to={"/dashboard/agencies"}
            >
              <BiBuildingHouse />
              Agencies
            </Link>
          </li>
          <li className="text-textGray text-lg w-full ">
            <Link
              className="hover:bg-primary hover:text-whiteDirty"
              to={"/dashboard/clients"}
            >
              <BiUser />
              Clients
            </Link>
          </li>
          <li className="text-textGray text-lg w-full ">
            <Link
              className="hover:bg-primary hover:text-whiteDirty"
              to={"/dashboard/services"}
            >
              <BiCategory />
              Services
            </Link>
          </li>
          <li className="text-textGray text-lg w-full ">
            <Link
              className="hover:bg-primary hover:text-whiteDirty"
              to={"/dashboard/subscriptions"}
            >
              <BiSelectMultiple />
              Subscriptions
            </Link>
          </li>
          <li className="text-textGray text-lg w-full ">
            <Link
              className="hover:bg-primary hover:text-whiteDirty"
              to={"/dashboard/payments"}
            >
              <BiDollarCircle />
              Payments
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

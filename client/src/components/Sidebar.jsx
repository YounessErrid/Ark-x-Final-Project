import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logouevent.svg";
import {
  BiBuildingHouse,
  BiCategory,
  BiDollarCircle,
  BiSelectMultiple,
  BiUser,
  BiLogOut,
  BiCog,
} from "react-icons/bi";
import { logoutUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const Sidebar = () => {
  const imageApi = "http://localhost:3000/";
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-whiteDirty content-start text-base-content">
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
          <li className="text-textGray text-lg w-full">
            <Link
              className="hover:bg-primary hover:text-whiteDirty"
              to={"/dashboard/payments"}
            >
              <BiDollarCircle />
              Payments
            </Link>
          </li>
          <li className="text-textGray text-lg w-full">
            <Link
              className="hover:bg-primary hover:text-whiteDirty"
              to={"/dashboard/setting"}
            >
              <BiCog />
              Setting
            </Link>
          </li>

          <li className="text-textGray text-lg fixed bottom-8">
            <a
              className="hover:bg-primary hover:text-whiteDirty"
              onClick={handleLogout}
            >
              <BiLogOut />
              Log Out
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

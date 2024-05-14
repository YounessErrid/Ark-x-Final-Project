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
  BiSolidDashboard,
  BiSolidGroup,
} from "react-icons/bi";
import { logoutUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const Sidebar = () => {
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
          <label
            className="btn btn-circle swap swap-rotate lg:hidden"
            htmlFor="my-drawer-2"
          >
            {/* this hidden checkbox controls the state */}
            {/* <input type="checkbox" id="my-drawer-checkbox" /> */}

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
          <img src={Logo} className="my-10" alt="React Logo" />
          <li className="text-textGray text-lg w-full ">
            <Link
              className="hover:bg-primary hover:text-whiteDirty"
              to={"/dashboard/"}
            >
              <BiSolidDashboard />
              Dashboard
            </Link>
          </li>
          <li className="text-textGray text-lg w-full pt-2 mt-2 border-t-2">
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
          <li className="text-textGray text-lg w-full pb-2 border-b-2">
            <Link
              className="hover:bg-primary hover:text-whiteDirty"
              to={"/dashboard/payments"}
            >
              <BiDollarCircle />
              Payments
            </Link>
          </li>
          {/* <li className="text-textGray text-lg w-full ">
          {user.role === 'superadmin' && (disabled="disabled")} 
            <Link
              className="hover:bg-primary hover:text-whiteDirty"
              to={"/dashboard/admins"}
            >
              <BiSolidGroup />
              Admins
            </Link>
          </li> */}
            {user.role === "superadmin" && (
          <li className="text-textGray text-lg w-full">
              <Link
                className="hover:bg-primary hover:text-whiteDirty"
                to={"/dashboard/admins"}
                disabled
              >
                <BiSolidGroup /> Admins
              </Link>
          </li>
            )}

          <div className="fixed bottom-2 w-full border-t-2">
            <li className="text-textGray text-lg ">
              <Link
                className="hover:bg-primary hover:text-whiteDirty"
                to={"/dashboard/updateuser"}
              >
                <BiCog />
                Setting
              </Link>
            </li>

            <li className="text-textGray text-lg ">
              <a
                className="hover:bg-primary hover:text-whiteDirty"
                onClick={handleLogout}
              >
                <BiLogOut />
                Logout
              </a>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
};

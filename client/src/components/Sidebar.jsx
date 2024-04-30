import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logouevent.svg";
import {
  BiBuildingHouse,
  BiCategory,
  BiDollarCircle,
  BiSelectMultiple,
  BiUser,
} from "react-icons/bi";
import { logoutUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const Sidebar = () => {
  const { user } = useSelector(
    (state) => state.user
  );
  console.log(user)
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
          <li className="text-textGray text-lg w-full ">
            <Link
              className="hover:bg-primary hover:text-whiteDirty"
              to={"/dashboard/payments"}
            >
              <BiDollarCircle />
              Payments
            </Link>
          </li>
          <li className="text-textGray text-lg w-full fixed bottom-8">
            <div className="dropdown dropdown-top">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <div>Zakaria</div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

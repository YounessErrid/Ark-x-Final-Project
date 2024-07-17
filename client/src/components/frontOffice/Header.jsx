import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown"; // Import the profile dropdown
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenuChange = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="sticky top-0 z-50 bg-whiteDirty">
      <div className=" px-4 md:px-0 container mx-auto navbar items-center justify-between font-medium">
        <div className=" hidden md:flex flex-none ">
          <img src={Logo} className="w-10 inline" alt="React Logo" />
          <h4 className="text-xl font-semibold">uEvent</h4>
        </div>
        <div className=" hidden md:flex flex-1 justify-center">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/agenciespage">Agencies</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to={`/portfolio/${user?.agencyId}`}>Portfolio</Link>
            </li>
            {/* <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2 rounded-t-none"></ul>
              </details>
            </li> */}
          </ul>
        </div>

        <div className="block md:hidden">
          {openMenu === false ? (
            <AiOutlineMenu
              onClick={handleOpenMenuChange}
              color="black"
              size={30}
              className="cursor-pointer"
            />
          ) : null}
        </div>

        <div
          className={`fixed top-0 left-0 h-full w-[60%] border-r border-r-gray-900 bg-black transition-transform transform ${
            openMenu ? `translate-x-0` : `-translate-x-full`
          } duration-700 ease-in-out flex flex-col items-start`}
        >
          <AiOutlineClose
            onClick={handleOpenMenuChange}
            color="white"
            size={30}
            className="cursor-pointer absolute right-3 top-3"
          />
          <img src={Logo} className="w-10 inline py-6 " alt="React Logo" />
          <ul className="uppercase ">
            <li className="px-4 py-2 border-b border-gray-600 hover:text-primary cursor-pointer " onClick={handleOpenMenuChange}>
              <Link to="/">Home</Link>
            </li>
            <li className="px-4 py-2 border-b border-gray-600 hover:text-primary cursor-pointer " onClick={handleOpenMenuChange}>
              <Link to="/agenciespage">Agencies</Link>
            </li>
            <li className="px-4 py-2 border-b border-gray-600 hover:text-primary cursor-pointer " onClick={handleOpenMenuChange}>
              <Link to="/contact">Contact</Link>
            </li>
            <li className="px-4 py-2 border-b border-gray-600 hover:text-primary cursor-pointer " onClick={handleOpenMenuChange}>
              <Link to={`/portfolio/${user?.agencyId}`}>Portfolio</Link>
            </li>
          </ul>
        </div>

        <div className="flex-none">
          {isAuthenticated ? (
            <ProfileDropdown />
          ) : (
            <>
              <button className="text-primary">
                <Link to="/login">SIGN IN</Link>
              </button>
              <button className="btn bg-primary hover:bg-primary border-none rounded text-white ms-4">
                <Link to="/register">GET STARTED</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

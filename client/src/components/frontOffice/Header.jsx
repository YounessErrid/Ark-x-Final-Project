import React, { useState } from "react";
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
      <div className="container mx-auto navbar items-center justify-between font-medium">
        <div className="hidden md:flex flex-none items-center">
          <img src={Logo} className="w-10 inline" alt="React Logo" />
          <h4 className="text-xl font-semibold ml-2">uEvent</h4>
        </div>
        <div className="hidden md:flex flex-1 justify-center">
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
          </ul>
        </div>

        <div className="block md:hidden">
          {openMenu ? (
            <AiOutlineClose
              onClick={handleOpenMenuChange}
              color="black"
              size={30}
              className="cursor-pointer"
            />
          ) : (
            <AiOutlineMenu
              onClick={handleOpenMenuChange}
              color="black"
              size={30}
              className="cursor-pointer"
            />
          )}
        </div>

        <nav
          className={`fixed top-0 left-0 h-full w-[60%] border-r border-r-gray-900 bg-black transition-transform transform ${
            openMenu ? `translate-x-0` : `-translate-x-full`
          } duration-700 ease-in-out`}
        >
          <div className="flex items-center justify-between p-4">
            <h1 className="text-4xl text-[#148412] font-bold">uEvent</h1>
            <AiOutlineClose
              onClick={handleOpenMenuChange}
              color="white"
              size={30}
              className="cursor-pointer"
            />
          </div>
          <ul className="uppercase">
            <li className="px-4 py-2 border-b border-gray-600 hover:text-[#148412] cursor-pointer">
              <Link to="/" onClick={handleOpenMenuChange}>
                Home
              </Link>
            </li>
            <li className="px-4 py-2 border-b border-gray-600 hover:text-[#148412] cursor-pointer">
              <Link to="/agenciespage" onClick={handleOpenMenuChange}>
                Agencies
              </Link>
            </li>
            <li className="px-4 py-2 border-b border-gray-600 hover:text-[#148412] cursor-pointer">
              <Link to="/contact" onClick={handleOpenMenuChange}>
                Contact
              </Link>
            </li>
            <li className="px-4 py-2 border-b border-gray-600 hover:text-[#148412] cursor-pointer">
              <Link to={`/portfolio/${user?.agencyId}`} onClick={handleOpenMenuChange}>
                Portfolio
              </Link>
            </li>
            <li className="px-4 py-2 border-b border-gray-600 hover:text-[#148412] cursor-pointer">
              {isAuthenticated ? (
                <ProfileDropdown />
              ) : (
                <>
                  <Link to="/login" onClick={handleOpenMenuChange}>SIGN IN</Link>
                  <Link to="/register" onClick={handleOpenMenuChange} className="block mt-2">GET STARTED</Link>
                </>
              )}
            </li>
          </ul>
        </nav>

        <div className="hidden md:flex flex-none">
          {isAuthenticated ? (
            <ProfileDropdown />
          ) : (
            <>
              <button className="text-primary">
                <Link to="/login">SIGN IN</Link>
              </button>
              <button className="btn bg-primary hover:bg-primary border-none rounded text-white ml-4">
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

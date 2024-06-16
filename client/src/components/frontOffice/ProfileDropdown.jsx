import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {logoutUser} from '../../features/userSlice'

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch()

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleLogout = () =>{
    dispatch(logoutUser())
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);



  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="block h-10 w-10 rounded-full overflow-hidden focus:outline-none"
        onClick={toggleDropdown}
      >
        <img
          className="h-full w-full object-cover"
          src="https://eu.ui-avatars.com/api/?name=John&size=1000"
          alt="avatar"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl">
          <Link to="/profile">
            <button className="w-full text-left transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-blue-200 hover:text-white">
              Profile
            </button>
          </Link>
          <div className="py-2">
            <hr />
          </div>
          <Link >
            <button className="w-full text-left transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-blue-200 hover:text-white"
            onClick={handleLogout}
            >
              Logout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

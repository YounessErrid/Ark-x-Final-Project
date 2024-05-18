import React from "react";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="sticky top-0 z-50 bg-whiteDirty">
    <div className="  container mx-auto navbar items-center justify-between font-medium">
      <div className="flex-none">
        <img src={Logo} className="w-10 inline" alt="React Logo" />
        <h4 className="text-xl font-semibold">uEvent</h4>
      </div>
      <div className="flex-1 justify-center">
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
            <details>
              <summary>Parent</summary>
              <ul className="p-2 rounded-t-none"></ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="flex-none">
        <button className="text-primary "><Link to="/login">SIGN IN</Link></button>
        <button className="btn bg-primary hover:bg-primary border-none rounded text-white ms-4"><Link to="/register">GET STARTED</Link></button>
      </div>
    </div>
    </div>
  );
};

export default Header;

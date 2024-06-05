import React from "react";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="sticky px-12 top-0 z-50 bg-whiteDirty">
      <div className="container mx-auto navbar items-center justify-between font-medium">
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
            {/* <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2 rounded-t-none"></ul>
              </details>
            </li> */}
          </ul>
        </div>
        <div className="flex-none">
          <button className="text-primary ">
            <Link to="/login">SIGN IN</Link>
          </button>
          <button className="btn bg-primary hover:bg-primary border-none rounded text-white ms-4">
            <Link to="/register">GET STARTED</Link>
          </button>
        </div>
      </div>
    </div>
    // <div className="navbar sticky top-0 z-50 bg-whiteDirty">
    //   <div className="navbar-start">
    //     <div className="dropdown">
    //       <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           className="h-5 w-5"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           stroke="currentColor"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M4 6h16M4 12h8m-8 6h16"
    //           />
    //         </svg>
    //       </div>
    //       <ul
    //         tabIndex={0}
    //         className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
    //       >
    //         <li>
    //           <a>Item 1</a>
    //         </li>
    //         <li>
    //           <a>Parent</a>
    //           <ul className="p-2">
    //             <li>
    //               <a>Submenu 1</a>
    //             </li>
    //             <li>
    //               <a>Submenu 2</a>
    //             </li>
    //           </ul>
    //         </li>
    //         <li>
    //           <a>Item 3</a>
    //         </li>
    //       </ul>
    //     </div>
    //     <a className="btn btn-ghost text-xl">daisyUI</a>
    //   </div>
    //   <div className="navbar-center hidden lg:flex">
    //     <ul className="menu menu-horizontal px-1">
    //       <li>
    //         <a>Item 1</a>
    //       </li>
    //       <li>
    //         <details>
    //           <summary>Parent</summary>
    //           <ul className="p-2">
    //             <li>
    //               <a>Submenu 1</a>
    //             </li>
    //             <li>
    //               <a>Submenu 2</a>
    //             </li>
    //           </ul>
    //         </details>
    //       </li>
    //       <li>
    //         <a>Item 3</a>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="navbar-end">
    //     {/* <div className="flex-none"> */}
    //       <button className="text-primary ">
    //         <Link to="/login">SIGN IN</Link>
    //       </button>
    //       <button className="btn bg-primary hover:bg-primary border-none rounded text-white ms-4">
    //         <Link to="/register">GET STARTED</Link>
    //       </button>
    //     {/* </div> */}
    //   </div>
    // </div>
  );
};

export default Header;

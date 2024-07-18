import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { checkSession } from "../features/userSlice";
import { Spinner } from "../components/Spinner";

const ProtectedAgency = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  // After data is loaded, check for authentication
  const isAgency = isAuthenticated && user?.role === "agency";
  const isAgencyHasAccess = user?.hasAccess;

  // console.log("isAgencyHasAccess", isAgencyHasAccess);
  // console.log("isAgency", isAgency);

  // useEffect(()=>{
  //   console.log("user11", user);

  // }, [user])
  
  return isAgency ? (
    isAgencyHasAccess ? (
      <Outlet />
    ) : (
      <Navigate to="/subscription" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedAgency;

// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, Outlet } from 'react-router-dom';
// import { checkSession } from '../features/userSlice'; // Ensure this action sets user roles correctly in your state
// import Spinner from '../components/Spinner';

// const ProtectedRoute = ({ allowedRoles }) => {
//   const { isAuthenticated, user, loading } = useSelector((state) => state.user);
//   const [dataLoaded, setDataLoaded] = useState(false);

//   useEffect(() => {
//     if (!loading) {
//       setTimeout(() => {
//         setDataLoaded(true);
//       }, 1000);
//     }
//   }, [loading]);

//   if (!dataLoaded) {
//     return <Spinner />;
//   }

//   if (!isAuthenticated) {
//     // Redirect to login if not authenticated
//     return <Navigate to="/login" replace />;
//   }

//   // Check if the user's role is included in the allowed roles for this route
//   const roleIsAllowed = allowedRoles.includes(user?.role);

//   if (!roleIsAllowed) {
//     // Redirect to an unauthorized access page if the user's role is not allowed
//     return <Navigate to="/unauthorized" replace />;
//   }

//   // If authenticated and authorized, render the children components
//   return <Outlet />;
// };

// export default ProtectedRoute;

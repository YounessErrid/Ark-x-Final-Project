import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { checkSession } from '../features/userSlice';
import { Spinner } from '../components/Spinner';

const Protected = () => {

  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const [dataLoaded, setDataLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch checkSession action on component mount
    dispatch(checkSession());
  }, [dispatch]);

  useEffect(() => {
    // Set dataLoaded to true when loading is false
    if (!loading) {
      setTimeout(() => {
        setDataLoaded(true);
      }, 1000);
    }
  }, [loading]);

  // Return loading spinner if loading is true and data is not loaded yet
  if (!dataLoaded) {
    return <Spinner loaded={dataLoaded} />;
  }

  // After data is loaded, check for authentication
  // return isAuthenticated && user?.role === 'admin' ? <Outlet /> : <Navigate to="/login" />;
  const isAdminOrSuperAdmin = isAuthenticated && (user?.role === 'admin' || user?.role === 'superadmin');
  return isAdminOrSuperAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;



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


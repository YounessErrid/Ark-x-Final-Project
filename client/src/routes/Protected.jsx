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

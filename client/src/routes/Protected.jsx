import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';



const Protected = () => {

  const {isAuthenticated, user} = useSelector((state) => state.user);



  return isAuthenticated && user.role === 'admin' ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;

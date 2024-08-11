import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { checkSession } from "../features/userSlice";
import { Spinner } from "../components/Spinner";

const ProtectedClient = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  // After data is loaded, check for authentication
  const isClient = isAuthenticated;

  return isClient ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedClient;

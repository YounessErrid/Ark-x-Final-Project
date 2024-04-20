import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const Protected = () => {
  const [access, setAccess] = useState({
    auth: true,
  });

  // const access = useContext(authentication)

  return access.auth ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;

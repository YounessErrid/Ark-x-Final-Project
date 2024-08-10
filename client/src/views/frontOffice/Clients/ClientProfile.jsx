import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import UpdateUser from "../../backOffice/UpdateUser";
import UpdatePassword from "../../backOffice/UpdatePassword";

const clientProfile = () => {
  return (
    <>
   
        <Routes>
          <Route path="/update-user" element={<UpdateUser />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          {/* <Route path="*" element={<div>Select an option from the menu</div>} /> */}

        </Routes>
        </>
  );
};

export default clientProfile;

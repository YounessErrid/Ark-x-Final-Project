import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/userSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);

  // useEffect(()=>{
  //   console.log("user", user);
  // }, [user])
  return (
    <ul class="flex menu flex-row">
      <li class="flex-1 mr-2">
        <Link
          to={
            user.role === "admin" 
              ? `/dashboard/updateuser`
              : `/client/profile/update-user`
          }
          class="text-center block hover:bg-primary rounded py-2 px-4 hover:text-whiteDirty text-textGray"
          href="#"
        >
          User
        </Link>
      </li>
      <li class="flex-1 mr-2">
        <Link
        to={
          user.role === "admin"
            ? "/dashboard/updatepassword"
            : `/client/profile/update-password`
        }
         
          class="text-center block hover:bg-primary rounded py-2 px-4 hover:text-whiteDirty text-textGray"
          href="#"
        >
          Password
        </Link>
      </li>
    </ul>
    // <ul class="flex">
    //   <li class="mr-1">
    //     <Link
    //       to={"/dashboard/updateuser"}
    //       class="bg-white inline-block py-2 px-4 text-textGray font-semibold"
    //       href="#"
    //     >
    //       User
    //     </Link>
    //   </li>
    //   <li class="mr-1">
    //     <Link
    //       to={"/dashboard/updatepassword"}
    //       class="bg-white inline-block py-2 px-4 text-textGray font-semibold"
    //       href="#"
    //     >
    //       Password
    //     </Link>
    //   </li>
    // </ul>
  );
};

export default ProfilePage;

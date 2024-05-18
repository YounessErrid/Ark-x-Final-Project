import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/userSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  // const user = useSelector((state) => state.user.user);
  // const [profileImage, setProfileImage] = useState(
  //   user?.profile
  //     ? `http://localhost:3000/${user.profile}`
  //     : "https://placehold.co/600x400"
  // );
  // const [selectedfile, setSelectedfile] = useState();
  // const id = user.id;
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const schema = z.object({
  //   fullname: z.string().min(4),
  // });

  // useEffect(() => {}, []);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isValid },
  // } = useForm({
  //   resolver: zodResolver(schema),
  //   defaultValues: {
  //     fullname: user.fullname,
  //   },
  // });

  // // const handleImageChange = (e) => {
  // //   const selectedFile = e.target.files[0];
  // //   if (selectedFile) {
  // //     const reader = new FileReader();
  // //     reader.onload = (e) => {
  // //       setProfileImage(e.target.result);
  // //     };
  // //     reader.readAsDataURL(selectedFile);
  // //   }
  // // };
  // const handleImageChange = (e) => {
  //   setSelectedfile(e.target.files[0]);
  //   console.log(e.target.files[0]);
  //   if (e.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setProfileImage(e.target.result);
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  // const onSubmit = ({ fullname }) => {
  //   console.log(selectedfile);
  //   // const formData = toFormData({fullname, selectedfile})
  //   // formData.append("fullname", fullname);
  //   // formData.append("profileImage", selectedfile);
  //   dispatch(updateUser({ id, userCredentials: { fullname, selectedfile } }));
  //   navigate("/dashboard");
  // };

  return (
    <ul class="flex menu flex-row">
      <li class="flex-1 mr-2">
        <Link
          to={"/dashboard/updateuser"}
          class="text-center block hover:bg-primary rounded py-2 px-4 hover:text-whiteDirty text-textGray"
          href="#"
        >
          User
        </Link>
      </li>
      <li class="flex-1 mr-2">
        <Link
          to={"/dashboard/updatepassword"}
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

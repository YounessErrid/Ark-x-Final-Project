import React, { useEffect, useState } from "react";
import { AgGridTable } from "../../components/ReactAgGrid";
import { ToastContainer } from "react-toastify";
import { Spinner } from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  createAdmin,
  deleteAdmin,
  fetchAdmins,
  updateAdmin,
} from "../../features/adminsSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BiEdit, BiSolidTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const adminSchema = z.object({
  fullname: z.string().min(4),
  email: z.string().email(),
  password: z.string(), // Make password optional
});
export const Admins = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if(user.role !== "superadmin"){
      navigate("/dashboard");
    }
  },[user, navigate])

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(adminSchema),
  });

  const { admins, error, loading } = useSelector(
    (state) => state.admins
  );
  const dispatch = useDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);

  const [emailError, SetEmailError] = useState(null);
  const [formData, setFormData] = useState(null);

  const onSubmit = (data) => {
    // Remove password field if it's empty
    if (formData) {
      if (!data.password) {
        delete data.password;
      }
      // If formData is available, it means it's an update action
      dispatch(updateAdmin({ _id: formData._id, ...data })).then((result) => {
        // Check if the action was fulfilled
        if (result.meta.requestStatus === "fulfilled") {
          // Do something if dispatch was successful
          closeModal();
        }
      });
    } else {
      // Otherwise, it's a create action
      dispatch(createAdmin(data)).then((result) => {
        // Check if the action was fulfilled
        if (result.meta.requestStatus === "fulfilled") {
          // Do something if dispatch was successful
          closeModal();
        }
      });
    }
  };

  const openUpdateModal = (data) => {
    setFormData({ ...data }); // Set form data for update
    document.getElementById("add_admin").showModal();
  };
  const closeModal = () => {
    const modal = document.getElementById("add_admin");
    setFormData(null); // Reset form data
    SetEmailError(null);
    reset(); // Reset form fields
    modal.close();
  };

  const [colDefs, setColDefs] = useState([
    { field: "email", filter: true, floatingFilter: true },
    { field: "fullname", filter: true, floatingFilter: true },
    { field: "role" },
    {
      field: "createdAt",
      cellRenderer: (params) => {
        // Format date using JavaScript's Date object methods
        const formattedDate = new Date(params.value).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }
        );
        return formattedDate;
      },
      // flex: 2,
      // filter: true,
      // floatingFilter: true,
    },
    {
      field: "updatedAt",
      cellRenderer: (params) => {
        // Format date using JavaScript's Date object methods
        const formattedDate = new Date(params.value).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }
        );
        return formattedDate;
      },
      // flex: 2,
      filter: true,
    },
    {
      field: "Actions",
      cellRenderer: (params) => {
        const handleUpdateClick = () => {
          openUpdateModal(params.data);
        };

        const handleDeleteClick = () => {
          console.log("Delete clicked for row data:", params.data);
          dispatch(deleteAdmin(params.data._id));
        };

        return (
          <div className="flex text-xl gap-2 text-primary">
            {/* <span > */}
            <a
              className="cursor-pointer mt-3"
              onClick={() => handleUpdateClick()}
            >
              <BiEdit />
            </a>
            {/* </span> */}
            {/* <span className="cursor-pointer"> */}
            <a
              className="cursor-pointer mt-3"
              onClick={() => handleDeleteClick()}
            >
              <BiSolidTrash />
            </a>
            {/* </span> */}
          </div>
        );
      },
      // flex: 1,
    },
  ]);

  useEffect(() => {
    if (error) SetEmailError(error);
    dispatch(fetchAdmins());
    setDataLoaded(true);

    if (formData) {
      setValue("fullname", formData.fullname || ""); // Set title field value
      setValue("email", formData.email || "");
      setValue("password", formData.password || "");
    }
  }, [dispatch, formData]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-6">
          <div>
            <h1 className="font-bold text-2xl">All Admins</h1>
            <p className="text-green-500">Active Admins</p>
          </div>
        </div>

        <div className="">
          <button
            onClick={() => document.getElementById("add_admin").showModal()}
            className="btn bg-primary text-whiteDirty hover:bg-whiteDirty hover:text-textGray"
          >
            Add Admin
          </button>
          <dialog id="add_admin" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Admins</h3>
              <p className="py-4">
                Create new Admin by filling the following details
              </p>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-8">
                  {emailError && <p className="text-red-400">{emailError}</p>}
                  <label
                    htmlFor="adminName"
                    className="block text-base font-normal text-gray-700 dark:text-gray-200"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    id="adminName"
                    placeholder="John Doe"
                    defaultValue={formData?.fullname}
                    {...register("fullname")}
                    className="mt-1 w-full  h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
                  />
                  {errors.fullname && (
                    <p className="text-red-400">{errors.fullname.message}</p>
                  )}
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="adminEmail"
                    className="block text-base font-normal text-gray-700 dark:text-gray-200"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="adminEmail"
                    placeholder="john@rhcp.com"
                    defaultValue={formData?.email}
                    {...register("email")}
                    className="mt-1 w-full  h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
                  />
                  {errors.email && (
                    <p className="text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="adminPassword"
                    className="block text-base font-normal text-gray-700 dark:text-gray-200"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="adminPassword"
                    placeholder="••••••••"
                    {...register("password")}
                    className="mt-1 w-full  h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
                  />
                  {errors.password && (
                    <p className="text-red-400">{errors.password.message}</p>
                  )}
                </div>
              </form>
              <div className="modal-action">
                <button
                  className="btn bg-success me-4"
                  onClick={handleSubmit(onSubmit)}
                >
                  Save
                </button>

                {/* if there is a button in form, it will close the modal */}
                <button type="button" className="btn" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </dialog>
          {/* end add modal */}
        </div>
      </div>
      {loading && !dataLoaded && <Spinner />}
      {admins && (
        <>
          {/* Pass loaded=true to indicate data has been loaded */}
          <Spinner loaded={true} />
          <AgGridTable data={admins} columnsDef={colDefs} />
        </>
      )}
      <ToastContainer />
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  deleteService,
  createService,
  updateService,
} from "../../features/servicesSlice";
import { AgGridTable } from "../../components/ReactAgGrid";
import { Spinner } from "../../components/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiEdit, BiSolidTrash } from "react-icons/bi";

const serviceSchema = z.object({
  title: z.string().min(3).max(30),
  description: z.string().min(8).max(200),
});

export const Services = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(serviceSchema),
  });
  // get service state
  const { services, error, loading, status } = useSelector(
    (state) => state.services
  );

  const [titleError, SetTitleError] = useState(null);

  const [formData, setFormData] = useState(null);

  const dispatch = useDispatch();

  const closeModal = () => {
    const modal = document.getElementById("add_service");
    setFormData(null); // Reset form data
    SetTitleError(null);
    reset(); // Reset form fields
    modal.close();
  };

  const openUpdateModal = (data) => {
    setFormData({ ...data }); // Set form data for update
    document.getElementById("add_service").showModal();
  };

  const onSubmit = (data) => {
    if (formData) {
      // If formData is available, it means it's an update action
      dispatch(updateService({ _id: formData._id, ...data })).then((result) => {
        // Check if the action was fulfilled
        if (result.meta.requestStatus === "fulfilled") {
          // Do something if dispatch was successful
          closeModal();
        }
      });
    } else {
      // Otherwise, it's a create action
      dispatch(createService(data)).then((result) => {
        // Check if the action was fulfilled
        if (result.meta.requestStatus === "fulfilled") {
          // Do something if dispatch was successful
          closeModal();
        }
      }).then(()=> dispatch(fetchServices()));
    }
  };

  const [dataLoaded, setDataLoaded] = useState(false);

  const [colDefs, setColDefs] = useState([
    { field: "title", flex: 2,sort: 'asc', filter: true, floatingFilter: true },
    { field: "description", flex: 4, filter: true, floatingFilter: true },
    {
      field: "Actions",
      cellRenderer: (params) => {
        const handleUpdateClick = () => {
          openUpdateModal(params.data);
        };

        const handleDeleteClick = () => {
          console.log("Delete clicked for row data:", params.data);
          dispatch(deleteService(params.data._id));
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
      flex: 1,
    },
  ]);

  useEffect(() => {
    dispatch(fetchServices());
    setDataLoaded(true);
  }, [dispatch]); // This only runs once when the component mounts
  
  useEffect(() => {
    if (formData) {
      setValue("title", formData.title || ""); // Set title field value
      setValue("description", formData.description || "");
    }
  }, [formData, setValue]); // This runs when formData changes
  
  // Handle errors separately
  useEffect(() => {
    if (error) SetTitleError(error);
  }, [error]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-6">
          <div>
            <h1 className="font-bold text-2xl">All Services</h1>
            <p className="text-green-500">Active Services</p>
          </div>
        </div>

        <div className="">
          <button
            onClick={() => document.getElementById("add_service").showModal()}
            className="btn bg-primary text-whiteDirty hover:bg-whiteDirty hover:text-textGray"
          >
            Add Service
          </button>
          <dialog
            id="add_service"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Services</h3>
              <p className="py-4">
                Create new Service by filling the following details
              </p>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-8">
                  {/* {titleError && <p className="text-red-400">{titleError}</p>} */}
                  <label
                    htmlFor="serviceTitle"
                    className="block text-base font-normal text-gray-700 dark:text-gray-200"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="serviceTitle"
                    placeholder="Photography etc..."
                    // defaultValue={formData?.title}
                    {...register("title")}
                    className="mt-1 w-full  h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
                  />
                  {errors.title && (
                    <p className="text-red-400">{errors.title.message}</p>
                  )}
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="serviceDesc"
                    className="block text-base font-normal text-gray-700 dark:text-gray-200"
                  >
                    Description
                  </label>
                  <textarea
                    maxLength={200}
                    rows={3}
                    type="text"
                    id="serviceDesc"
                    placeholder="lorem Ipsum dolor sit amet, consectetur adipiscing elit"
                    {...register("description")}
                    className="mt-1 w-full  h-12 p-2 rounded-md border-gray-200 shadow-sm sm:text-sm bg-lightBlue"
                  />
                  {errors.description && (
                    <p className="text-red-400">{errors.description.message}</p>
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
      {services && (
        <>
          {/* Pass loaded=true to indicate data has been loaded */}
          <Spinner loaded={true} />
          <AgGridTable data={services} columnsDef={colDefs} />
        </>
      )}
      <ToastContainer />
    </div>
  );
};

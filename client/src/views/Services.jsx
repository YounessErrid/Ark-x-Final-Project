import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices, deleteService } from "../features/servicesSlice";
import { TanstackTable } from "../components/TanstackTable";
import { Spinner } from "../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Services = () => {
  const { services, error, loading, status } = useSelector(
    (state) => state.services
  );
  const dispatch = useDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);
  console.log("success",status);
  const columns = [{ title: "Title" }, { description: "Description" }];

  useEffect(() => {
    dispatch(fetchServices());
    if (status === true) {
      toast.success("The Service Deleted Successfully");
    } else if(status === false) {
      toast.error('The Service Dosn\'t Deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    setDataLoaded(true);
  }, [dispatch, status]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Hello Evano,👋🏼</h1>
      </div>
      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-6">
          <div>
            <h1 className="font-bold text-2xl">All Services</h1>
            <p className="text-green-500">Active Services</p>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>

        <div className="">
          <button className="btn bg-primary text-whiteDirty hover:bg-whiteDirty hover:text-textGray">
            Add Service
          </button>
        </div>
      </div>
      {loading && !dataLoaded && <Spinner />}
      {error && error}
      {services && (
        <>
          {/* Pass loaded=true to indicate data has been loaded */}
          <Spinner loaded={true} />
          <TanstackTable
            data={services}
            columnsDef={columns}
            deleteCallback={(id) => {
              dispatch(deleteService(id));
            }}
          />
        </>
      )}
      <ToastContainer />
    </div>
  );
};

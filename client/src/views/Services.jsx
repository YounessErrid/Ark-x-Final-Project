import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../features/servicesSlice";
import { TanstackTable } from "../components/TanstackTable";
import { Spinner } from "../components/Spinner";

export const Services = () => {
  const { services, error, loading } = useSelector((state) => state.services);
  const dispatch = useDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchServices()).then(() => {
      // After fetching services, set dataLoaded to true
      setDataLoaded(true);
    });
  }, [dispatch]);

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
          
          <button className="btn bg-primary text-whiteDirty hover:bg-whiteDirty hover:text-textGray">Add Service</button>
        </div>
      </div>
      {loading && !dataLoaded && <Spinner />}
      {error && error}
      {services && (
        <>
          {/* Pass loaded=true to indicate data has been loaded */}
          <Spinner loaded={true} />
          <TanstackTable data={services} />
        </>
      )}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAgencies, deleteAgency } from "../../features/agenciesSlice";
import { TanstackTable } from "../../components/TanstackTable";
import { Spinner } from "../../components/Spinner";
import { AgGridTable } from "../../components/ReactAgGrid";
import { BiSolidTrash } from "react-icons/bi";

export const Agencies = () => {
  const { agencies, error, loading, status } = useSelector(
    (state) => state.agencies
  );
  const dispatch = useDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);

  const [colDefs, setColDefs] = useState([
    { field: "email", flex: 2, filter: true, floatingFilter: true },
    { field: "agencyName", flex: 2, filter: true, floatingFilter: true },
    { field: "fullname", flex: 2, filter: true, floatingFilter: true },
    { field: "Actions",
      cellRenderer: (params) => {
        const handleDeleteClick = () => {
          console.log("Delete clicked for row data:", params.data);
          dispatch(deleteAgency(params.data._id));
        };

        return (
          <div className="flex text-xl gap-2 text-primary">
            {/* <span className="cursor-pointer"> */}
              <a className="cursor-pointer mt-3" onClick={() => handleDeleteClick()}>
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
    dispatch(fetchAgencies());
    console.log(agencies);
    setDataLoaded(true);
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Hello Evano,👋🏼</h1>
        
      </div>

      <div className="stats shadow w-full my-8">
        <div className="stat ">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Agencies</div>
          <div className="stat-value">31K</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">New Account</div>
          <div className="stat-value">4,200</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">New Registers</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
      <h1 className="font-bold text-2xl">All Agencies</h1>
      <p className="text-green-500">Active Members</p>
      {loading && <Spinner />}
      {/* {error && error} */}
      {agencies && (
        <>
          {/* Pass loaded=true to indicate data has been loaded */}
          <Spinner loaded={true} />
          <AgGridTable data={agencies} columnsDef={colDefs} />
        </>
      )}
    </div>
  );
};

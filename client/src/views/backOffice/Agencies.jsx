import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAgencies, deleteAgency } from "../../features/agenciesSlice";
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
    {
      field: "Actions",
      cellRenderer: (params) => {
        const handleDeleteClick = () => {
          console.log("Delete clicked for row data:", params.data);
          dispatch(deleteAgency(params.data._id));
        };

        return (
          <div className="flex text-xl gap-2 text-primary">
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
    dispatch(fetchAgencies());
    setDataLoaded(true);
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Hello Evano,👋🏼</h1>
      </div>

      {/* <h1 className="font-bold text-2xl">All Agencies</h1>
      <p className="text-green-500">Active Members</p> */}

      <div className="flex gap-6 mt-8">
        <div>
        <h1 className="font-bold text-2xl">All Agencies</h1>
        <p className="text-green-500">Active Members</p>
        </div>
      </div>
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

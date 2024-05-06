import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchClients, deleteClient } from "../../features/clientsSlice";
import { Spinner } from "../../components/Spinner";
import { AgGridTable } from "../../components/ReactAgGrid";
import { BiSolidTrash } from "react-icons/bi";

export const Clients = () => {
  const { clients, error, loading } = useSelector((state) => state.clients);
  const dispatch = useDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);

  const [colDefs, setColDefs] = useState([
    { field: "fullname", flex: 2,sort: 'asc', filter: true, floatingFilter: true },
    { field: "email", flex: 2, filter: true, floatingFilter: true },
    { field: "phone", flex: 2, filter: true, floatingFilter: true },
    {
      field: "Actions",
      cellRenderer: (params) => {
        const handleDeleteClick = () => {
          console.log("Delete clicked for row data:", params.data);
          dispatch(deleteClient(params.data._id));
        };

        return (
          <div className="flex text-xl gap-2 text-primary">
            <a className="cursor-pointer mt-3" onClick={handleDeleteClick}>
              <BiSolidTrash />
            </a>
          </div>
        );
      },
      flex: 1,
    },
  ]);

  useEffect(() => {
    dispatch(fetchClients());
    setDataLoaded(true);
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="flex gap-6 mt-8">
          <div>
            <h1 className="font-bold text-2xl">All Clients</h1>
            <p className="text-green-500">Active Services</p>
          </div>
        </div>

      {loading && <Spinner />}
      {clients && (
        <>
          <Spinner loaded={true} />
          <AgGridTable data={clients} columnsDef={colDefs} />
        </>
      )}
    </div>
  );
};

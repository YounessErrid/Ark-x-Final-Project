import React, { useEffect, useState } from "react";
import { fetchSubscriptions } from "../../features/subscriptionsSlice";
import { Spinner } from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { AgGridTable } from "../../components/ReactAgGrid";
import { BiSolidTrash } from "react-icons/bi";
import { ToastContainer } from "react-toastify";

const Subscriptions = () => {
  const { subscriptions, error, loading } = useSelector(
    (state) => state.subscriptions
  );
  const dispatch = useDispatch();

  const [colDefs, setColDefs] = useState([
    {
      field: "email",
      flex: 2,
    },
    {
      field: "activationDate",
      sort: 'asc',
      cellRenderer: (params) => {
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
      flex: 2,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "expirationDate",
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
      flex: 2,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "activated",
      cellRenderer: (params) => {
        if (params.value === true) {
          return (
            <div className="badge badge-success items-center gap-2 text-whiteDirty">
              Active
            </div>
          );
        } else {
          return (
            <div className="badge badge-error gap-2 text-whiteDirty">
              Inactive
            </div>
          );
        }
      },
      flex: 2,
      filter: true,
    },
    // {
    //   field: "Actions",
    //   cellRenderer: (params) => {
    //     const handleDeleteClick = () => {
    //       console.log("Delete clicked for row data:", params.data);
    //       // dispatch(deleteClient(params.data._id));
    //     };

    //     return (
    //       <div className="flex text-xl gap-2 text-primary">
    //         <a className="cursor-pointer mt-3" onClick={handleDeleteClick}>
    //           <BiSolidTrash />
    //         </a>
    //       </div>
    //     );
    //   },
    //   flex: 1,
    // },
  ]);

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchSubscriptions());
    setDataLoaded(true);
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-6">
          <div>
            <h1 className="font-bold text-2xl">All Subscriptions</h1>
            <p className="text-green-500">Active Subscriptions</p>
          </div>
        </div>
      </div>
      {loading && !dataLoaded && <Spinner />}
      {/* {error && error} */}
      {subscriptions && (
        <>
          {/* Pass loaded=true to indicate data has been loaded */}
          <Spinner loaded={true} />
          <AgGridTable data={subscriptions} columnsDef={colDefs} />
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Subscriptions;

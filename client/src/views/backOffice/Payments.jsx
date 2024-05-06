import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../components/Spinner";
import { fetchPayments, deletePayment } from "../../features/paymentsSlice";
import { AgGridTable } from "../../components/ReactAgGrid";
import { BiSolidTrash } from "react-icons/bi";

const Payments = () => {
  const { payments, error, loading } = useSelector((state) => state.payments);
  const [dataLoaded, setDataLoaded] = useState(false);
  const dispatch = useDispatch();

  const [colDefs, setColDefs] = useState([
    {
      field: "date",
      sort: 'asc',
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
      field: "amount",
      valueFormatter: (params) => {
        // Convert the value to a formatted string with DH currency symbol
        return new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "MAD", // MAD is the currency code for Moroccan Dirham (DH)
        }).format(params.value);
      },
      flex: 2,
      filter: true,
      floatingFilter: true,
    },
    // {
    //   field: "Actions",
    //   cellRenderer: (params) => {
    //     const handleDeleteClick = () => {
    //       console.log("Delete clicked for row data:", params.data);
    //       dispatch(deletePayment(params.data._id));
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

  useEffect(() => {
    dispatch(fetchPayments());
    setDataLoaded(true);
  }, [dispatch]);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-6">
          <div>
            <h1 className="font-bold text-2xl">All Payments</h1>
            <p className="text-green-500">Active Payments</p>
          </div>
        </div>
      </div>
      {loading && !dataLoaded && <Spinner />}
      {/* {error && error} */}
      {payments && (
        <>
          {/* Pass loaded=true to indicate data has been loaded */}
          <Spinner loaded={true} />
          <AgGridTable data={payments} columnsDef={colDefs} />
        </>
      )}
    </div>
  );
};

export default Payments;

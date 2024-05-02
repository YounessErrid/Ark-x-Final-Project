import React, { useEffect, useState } from "react";
import {
  BiEdit,
  BiSolidDownArrow,
  BiSolidTrash,
  BiSolidUpArrow,
} from "react-icons/bi";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";

const columnHelper = createColumnHelper();

export const TanstackTable = ({ data, columnsDef, deleteCallback, updateCallback }) => {
  
  const [filterValue, setFilterValue] = useState("");

  const handleDelete = (id) => {
    deleteCallback(id);
  };
  const handleUpdate = (data) => {
    updateCallback(data);
  };

  const [columns, setColumns] = useState([]);
  const [sorting, setSorting] = useState([]);
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  useEffect(() => {
    const mappedColumns = columnsDef.map((def) =>
      columnHelper.accessor(Object.keys(def)[0], {
        header: Object.values(def)[0], // Use the displayed name as the header
        cell: (info) => info.row.original[Object.keys(def)[0]], // Use the corresponding data field for cell rendering
      })
    );

    setColumns(mappedColumns);
  }, [data, columnsDef]);

  // Add an action column with three points icon for delete or update
  columns.push(
    columnHelper.accessor("action", {
      header: "Action",
      cell: (info) => (
        <div className="flex text-xl gap-2 text-primary">
            <span className="cursor-pointer">
              <a onClick={() => handleUpdate(info.row.original)}><BiEdit /></a>
            </span>
          <span className="cursor-pointer">
              <a onClick={() => handleDelete(info.row.original._id)}><BiSolidTrash /></a>
            </span>
        </div>
      ),
    })
  );

  return (
    <div className="py-6 overflow-x-auto max-h-">
      {data.length === 0 ? (
        // Display a message when no data is found
        <p className="text-center text-gray-500">No data found</p>
      ) : (
        <table className="table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <span className="flex">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {
                        {
                          asc: <BiSolidUpArrow />,
                          desc: <BiSolidDownArrow />,
                        }[header.column.getIsSorted() ?? null]
                      }
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      )}
      <div className="join flex justify-between items-center">
        <div className="flex gap-x-4 items-center">
          <p className="text-textGray">The number of displyed rows.</p>
          <select
            className="select "
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-x-1.5">
          <button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            className="join-item btn bg-whiteDirty hover:bg-primary hover:text-whiteDirty btn-xs"
          >
            First
          </button>

          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="join-item btn bg-whiteDirty hover:bg-primary hover:text-whiteDirty btn-xs"
          >
            {"<"}
          </button>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="join-item btn bg-whiteDirty hover:bg-primary hover:text-whiteDirty btn-xs "
          >
            {">"}
          </button>

          <button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            className="join-item btn bg-whiteDirty hover:bg-primary hover:text-whiteDirty btn-xs"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

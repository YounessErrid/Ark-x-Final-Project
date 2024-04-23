import React, { useEffect, useState } from "react";
import {
  BiDotsVerticalRounded,
  BiSolidDownArrow,
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

const columnHelper = createColumnHelper();

export const TanstackTable = ({ data }) => {
  const generateColumnsFromData = (data) => {
    if (!data || data.length === 0) {
      return []; // Return an empty array if data is empty or not provided
    }

    const sampleRow = data[0]; // Take the first row as a sample to generate columns

    const columns = Object.keys(sampleRow).map((key) => {
      return columnHelper.accessor(key, {
        header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter of the key for header
        cell: (info) => info.getValue(), // Use the value directly for cell rendering
        // footer: (info) => info.column.id,
      });
    });

    return columns;
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
    setColumns(generateColumnsFromData(data));
  }, [data]);

  // Add an action column with three points icon for delete or update
  columns.push(
    columnHelper.accessor("action", {
      header: "Action",
      cell: (info) => (
        <div className="dropdown dropdown-left dropdown-end">
          <div tabIndex={0} role="button">
            <BiDotsVerticalRounded className="text-xl" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Delete</a>
            </li>
            <li>
              <a>Update</a>
            </li>
          </ul>
        </div>
      ),
    })
  );

  return (
    <div className="py-6 overflow-x-auto">
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
                      { asc: <BiSolidUpArrow />, desc: <BiSolidDownArrow /> }[
                        header.column.getIsSorted() ?? null
                      ]
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

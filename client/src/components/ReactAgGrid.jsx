import React from "react";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

export const AgGridTable = ({ data, columnsDef }) => {
  
  return (
    <div>
      <div
        className="ag-theme-quartz pt-8" // applying the grid theme
        // the grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={data}
          columnDefs={columnsDef}
          // defaultColDef={defaultColDef}
          pagination={true}
          paginationAutoPageSize={true}
          rowSelection="single"
        />
      </div>
    </div>
  );
};

import { useState } from "react";
import { useEffect } from "react";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { fetchCustomer } from "../customerAPI";

function CustomerList() {
  const [customerlist, setCustomerlist] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    { field: "firstname", filter: true, sortable: true },
    { field: "lastname", filter: true, sortable: true },
    { field: "streetaddress", filter: true, sortable: true },
    { field: "postcode", filter: true, sortable: true },
    { field: "city", filter: true, sortable: true },
    { field: "email", filter: true, sortable: true },
    { field: "phone", filter: true, sortable: true },
  ]);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    fetchCustomer()
      .then((data) => {
        setCustomerlist(data._embedded.customers);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div
        className="ag-theme-material"
        style={{ width: "100vw", height: "100vh" }}
      >
        <AgGridReact
          rowData={customerlist}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
    </>
  );
}

export default CustomerList;

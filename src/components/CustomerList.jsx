import { useState } from "react";
import { useEffect } from "react";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

import { fetchCustomer, deleteCustomer } from "../customerAPI";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";

function CustomerList() {
  const [customerlist, setCustomerlist] = useState([]);

  const [open, setOpen] = useState(false);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "Action",
      cellRenderer: (params) => (
        <AddTraining handleFetch={handleFetch} data={params.data} />
      ),
      width: 190,
    },
    {
      cellRenderer: (params) => (
        <EditCustomer handleFetch={handleFetch} data={params.data} />
      ),
      width: 120,
    },
    {
      cellRenderer: (params) => (
        <Button
          color="error"
          size="small"
          onClick={() => handleDelete(params.data._links.self.href)}
        >
          Delete
        </Button>
      ),
      width: 120,
    },
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

  const handleDelete = (url) => {
    if (
      window.confirm(
        "Are you sure you want to delete this customer? You cannot undo this action."
      )
    ) {
      deleteCustomer(url)
        .then(() => {
          handleFetch();
          setOpen(true);
        })

        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <AddCustomer handleFetch={handleFetch} />

      <div
        className="ag-theme-material"
        style={{
          width: "90vw",
          height: "100vh",
          margin: "20px auto",
          borderRadius: "10px",
          boxShadow: " 0 8px 16px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
        }}
      >
        <AgGridReact
          rowData={customerlist}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Customer deleted"
      />
    </>
  );
}

export default CustomerList;

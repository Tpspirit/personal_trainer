import { useState } from "react";
import { useEffect } from "react";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

import dayjs from "dayjs";

import { fetchTraining, deleteTraining } from "../API";

function TrainingList() {
  const [open, setOpen] = useState(false);

  const [traininglist, setTraininglist] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
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
    },
    {
      field: "date",
      filter: true,
      sortable: true,
      valueFormatter: (param) => {
        return dayjs(param.value).format("DD.MM.YYYY HH:mm");
      },
    },
    { field: "duration", filter: true, sortable: true },
    { field: "activity", filter: true, sortable: true },
    {
      field: "customer",
      headerName: "Customer",
      filter: true,
      sortable: true,
      valueGetter: (params) =>
        `${params.data.customer.firstname} ${params.data.customer.lastname}`,
    },
  ]);

  // Fetch training data
  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    fetchTraining()
      .then((data) => {
        const fetchCustomer = data._embedded.trainings.map((training) =>
          fetch(training._links.customer.href)
            .then((response) => response.json())
            .then((data) => {
              // Add the customer field with data to the training object
              return { ...training, customer: data };
            })
            .catch((err) => {
              console.error(err);
            })
        );

        // Wait for all customer data fetches to complete
        return Promise.all(fetchCustomer);
      })
      .then((finalTrainings) => {
        // Update the state with a final training, including customer data
        setTraininglist(finalTrainings);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = (url) => {
    if (
      window.confirm(
        "Are you sure you want to delete this training? You cannot undo this action."
      )
    ) {
      deleteTraining(url)
        .then(() => {
          handleFetch();
          setOpen(true);
        })

        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <div
        className="ag-theme-material"
        style={{
          width: "92vw",
          height: "100vh",
          margin: "20px auto",
          borderRadius: "10px",
          boxShadow: " 0 8px 16px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
        }}
      >
        <AgGridReact
          rowData={traininglist}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Training deleted"
      />
    </>
  );
}

export default TrainingList;

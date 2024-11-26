import { useState } from "react";
import { useEffect } from "react";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import dayjs from "dayjs";

import { fetchTraining } from "../customerAPI";

function TrainingList() {
  const [traininglist, setTraininglist] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
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

  return (
    <>
      <div
        className="ag-theme-material"
        style={{ width: "100vw", height: "100vh" }}
      >
        <AgGridReact
          rowData={traininglist}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
    </>
  );
}

export default TrainingList;

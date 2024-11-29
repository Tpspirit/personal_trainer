import { useEffect, useState } from "react";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import _ from "lodash";

import { fetchTraining } from "../API";

function Statistics() {
  const [chartData, setChartData] = useState([]);

  const [traininglist, setTraininglist] = useState([]);

  //   Fetch the training data
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
        console.log(finalTrainings);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    // Group traininglist by activity and calculate duration
    const data = _(traininglist)
      .groupBy("activity")
      .map((trainings, activity) => ({
        activity,
        totalMinutes: _.sumBy(trainings, "duration"),
      }))
      .value(); // Extract result and convert it to JavaScript array

    setChartData(data);
  }, [traininglist]);

  return (
    <div
      style={{
        width: "92vw",
        height: "70vh",
        margin: "20px auto",
        borderRadius: "10px",
        boxShadow: " 0 8px 16px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
      }}
    >
      <h2 style={{ margin: "30px" }}>Statistics</h2>
      <BarChart
        width={1200}
        height={400}
        data={chartData} // This must be a non-empty array
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="activity" />
        <YAxis
          label={{
            value: "Duration (min)", // Add label
            angle: -90, // Rotates the text vertically
            position: "insideLeft", // Positions the label to the left of the chart
            style: { textAnchor: "middle", fontSize: "14px" },
          }}
        />
        <Tooltip />
        <Bar dataKey="totalMinutes" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default Statistics;

import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";

import { fetchTraining } from "../API";

function CalendarTraining() {
  const [events, setEvents] = useState([]);

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
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //  Set up the Calendar
  const localizer = dateFnsLocalizer({
    format: (date) => dayjs(date).format("ddd"), // Format function using dayjs
    parse: (value, formatStr) => dayjs(value, formatStr).toDate(), // Parse function using dayjs
    startOfWeek: () => dayjs().startOf("week").toDate(), // Start of the week
    getDay: (date) => dayjs(date).day(), // Day of the week
    locales: {}, // Add locale settings here if needed
  });

  useEffect(() => {
    // Convert training data into calendar events

    const calendarEvents = traininglist.map((training) => ({
      // Format the event title (hour and minute only)
      title: `${training.activity} (${training.customer.firstname} ${training.customer.lastname})`, // Event title
      start: dayjs(training.date).toDate(), // Convert ISO string to Date object
      end: dayjs(training.date).add(training.duration, "minute").toDate(), // Add duration to start date
      allDay: false, // Ensure events are displayed in time slots
    }));

    setEvents(calendarEvents);
  }, [traininglist]); // Re-run whenever `trainings` changes

  return (
    <div
      style={{
        width: "92vw",
        height: "100vh",
        margin: "20px auto",
        borderRadius: "10px",
        boxShadow: " 0 8px 16px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Calendar
        localizer={localizer}
        events={events} // Calendar events data
        startAccessor="start" // Field for event start time
        endAccessor="end" // Field for event end time
        style={{ height: 600 }} // Set calendar height
        defaultView="week" // Set the default view to "Week"
        views={["month", "week", "day"]} // Allow "Month", "Week", and "Day" views
        step={30}
        timeslots={2}
        toolbar // Show navigation and view options toolbar
        formats={{
          timeGutterFormat: (date) => dayjs(date).format("HH:mm"), // Fix time gutter labels
          eventTimeRangeFormat: ({ start, end }) =>
            `${dayjs(start).format("HH:mm")} - ${dayjs(end).format("HH:mm")}`, // Display start-end time in the title
        }}
      />
    </div>
  );
}

export default CalendarTraining;

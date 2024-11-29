import * as React from "react";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import CalendarTraining from "./components/CalendarTraining";
import Statistics from "./components/Statistics";

function App() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Container maxWidth="xl">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Personal Trainer</Typography>
          </Toolbar>
        </AppBar>
        {/* Tab Menu */}
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="CUSTOMER" value="1" />
            <Tab label="TRAININGS" value="2" />
            <Tab label="CALENDAR" value="3" />
            <Tab label="STATISTICS" value="4" />
          </TabList>
          {/* // Customer List */}
          <TabPanel value="1">
            <CustomerList />
          </TabPanel>
          {/* // Trainings List */}
          <TabPanel value="2">
            <TrainingList />
          </TabPanel>
          {/* Calendar */}
          <TabPanel value="3">
            <CalendarTraining />
          </TabPanel>
          {/* Statistic */}
          <TabPanel value="4">
            <Statistics />
          </TabPanel>
        </TabContext>
        <CssBaseline />
      </Container>
    </div>

    // Trainnings List
  );
}

export default App;

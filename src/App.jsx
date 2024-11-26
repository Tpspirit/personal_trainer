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
          </TabList>
          <TabPanel value="1">
            {/* // Customer List */}
            <CustomerList />
          </TabPanel>
          <TabPanel value="2">
            {/* // Trainings List */}
            <TrainingList />
          </TabPanel>
        </TabContext>
        <CssBaseline />
      </Container>
    </div>

    // Trainnings List
  );
}

export default App;

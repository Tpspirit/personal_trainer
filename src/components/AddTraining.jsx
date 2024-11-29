import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { saveTraining } from "../API";

import dayjs from "dayjs";

export default function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: "",
    duration: "",
    activity: "",
    customer: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setTraining({ ...training, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // update date to format ISO-8601
    // Add date and customer href to training object
    const updatedTraining = {
      ...training,
      customer: props.data._links.customer.href,
    };
    console.log(training.date);
    saveTraining(updatedTraining)
      .then(() => {
        props.handleFetch();
        handleClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>New Training</DialogTitle>
        <DialogContent sx={{ overflow: "visible" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              onChange={(e) =>
                setTraining({ ...training, date: dayjs(e).toISOString() })
              }
            />
          </LocalizationProvider>
          <TextField
            margin="dense"
            id="name"
            name="duration"
            label="Duration"
            value={training.duration}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="name"
            name="activity"
            label="Activity"
            value={training.activity}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

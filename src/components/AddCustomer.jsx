import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { saveCustomer } from "../API";

export default function AddCustomer(props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    saveCustomer(customer)
      .then(() => {
        props.handleFetch();
        handleClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Customer
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
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            name="firstname"
            label="Firstname"
            value={customer.firstname}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="name"
            name="lastname"
            label="Lastname"
            value={customer.lastname}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="name"
            name="streetaddress"
            label="Street Address"
            value={customer.streetaddress}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="name"
            name="postcode"
            label="Postcode"
            value={customer.postcode}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="name"
            name="city"
            label="City"
            value={customer.city}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="name"
            name="email"
            label="Email"
            value={customer.email}
            onChange={handleChange}
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="name"
            name="phone"
            label="Phone"
            value={customer.phone}
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

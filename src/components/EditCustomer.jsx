import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { updateCustomer } from "../customerAPI";

export default function EditCar(props) {
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
    console.log(props.data);
    setCustomer({
      firstname: props.data.firstname,
      lastname: props.data.lastname,
      streetaddress: props.data.streetaddress,
      postcode: props.data.postcode,
      city: props.data.city,
      email: props.data.email,
      phone: props.data.phone,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateCustomer(props.data._links.customer.href, customer)
      .then(() => {
        props.handleFetch();
        handleClose();
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
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
        <DialogTitle>Update Customer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            name="firstname"
            label="Firstname"
            value={customer.firstname}
            onChange={handleChange}
            type="email"
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
            type="email"
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
            type="email"
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
            type="email"
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
            type="email"
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
            type="email"
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

import React, { useState } from "react";
import { Box, Button, Chip, Grid, MenuItem, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";

import app from "../../firebase";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addEvent } from "../../redux/eventApiCalls";

export const EventCreateImpl = () => {
  const [type, settype] = useState("");
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [sizeForm, setSizeForm] = useState(6);

  const [event_nameError, setevent_nameError] = useState(false);
  const [descriptionError, setdescriptionError] = useState(false);
  const [event_locationError, setevent_locationError] = useState(false);
  const [event_dateError, setevent_dateError] = useState(false);
  const [event_timeError, setevent_timeError] = useState(false);
  const [priceError, setpriceError] = useState(false);

  const [event_nameMessageError, setevent_nameMessageError] = useState("");
  const [descriptionMessageError, setdescriptionMessageError] = useState("");
  const [emailMessageError, setEmailMessageError] = useState("");
  const [event_locationMessageError, setevent_locationMessageError] =
    useState("");
  const [event_dateMessageError, setevent_dateMessageError] = useState("");
  const [event_timeMessageError, setevent_timeMessageError] = useState("");
  const [priceMessageError, setpriceMessageError] = useState("");

  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.currentUser.user_id);
  const navigate = useNavigate();
  console.log(token);
  console.log(userId);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(inputs);
    const data = new FormData(e.currentTarget);

    let formData = {
      event_name: data.get("event_name"),
      description: data.get("description"),
      user_id: userId,
      event_location: data.get("event_location"),
      event_date: data.get("event_date"),
      event_time: data.get("event_time"),
      price: data.get("price"),
      // birthday: data.get("birthday"),
    };

    if (!data.get("event_name")) {
      setevent_nameError(true);
      setevent_nameMessageError("First Name can't be empty!");
    } else if (!data.get("description")) {
      setdescriptionError(true);
      setdescriptionMessageError("Last Name can't be empty!");
    } else if (!data.get("event_location")) {
      setevent_locationError(true);
      setevent_locationMessageError("Event  location can't be empty!");
    } else if (!data.get("event_date")) {
      setevent_dateError(true);
      setevent_dateMessageError("Event date can't be empty!");
    } else if (!data.get("event_time")) {
      setevent_timeError(true);
      setevent_timeMessageError("Event time can't be empty!");
    } else if (!data.get("price")) {
      setpriceError(true);
      setpriceMessageError("Price can't be empty!");
    } else {
      const status = await addEvent(formData, token);

      if (status) {
        Swal.fire({
          title: "Success!",
          text: "Event added success!",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#378cbb",
          // showConfirmButton: false,
          // timer: 2000,
        });
        navigate("/user");
        // e.target.event_name = "";
        // e.target.description = "";
        // e.target.email = "";
        // e.target.event_location = "";
        // e.target.event_date = "";
        // e.target.event_time = "";
        // e.target.price = "";
        // e.target.mobileNumber = "";
        // e.target.password = "";
        // e.target.confirmPassword = "";
        // e.target.birthday = "";
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Event added unsuccess!",
        });
      }
    }

    console.log(formData);
  };

  return (
    <Grid container direction="column">
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={6}>
          <Typography variant="h3">Create Event</Typography>
        </Grid>
        <Button variant="contained" href="/event" startIcon={<ArrowBackIcon />}>
          Back
        </Button>
      </Grid>
      <Box
        sx={{
          my: 1,
          mx: 4,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleClick}
          className="productForm"
          sx={{ m: 5 }}
        >
          {/* <div className="productFormLeft"> */}
          <Grid container spacing={4}>
            {/* <Grid item md={10}> */}
            <Grid container spacing={4}>
              <Grid item md={sizeForm}>
                <TextField
                  error={event_nameError}
                  // defaultValue={employeeNo}
                  // variant="standard"
                  // disabled
                  margin="normal"
                  required
                  fullWidth
                  id="event_name"
                  label="Event Name"
                  name="event_name"
                  autoComplete="event_name"
                  autoFocus
                  helperText={event_nameMessageError}
                  onClick={(e) => {
                    setevent_nameError(false);
                    setevent_nameMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>
              <Grid item md={sizeForm}>
                <TextField
                  error={descriptionError}
                  // defaultValue={product.fullname}
                  // variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="description"
                  autoFocus
                  helperText={descriptionMessageError}
                  onChange={(e) => {
                    setdescriptionError(false);
                    setdescriptionMessageError("");
                    // handleChange();
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>
              <Grid item md={sizeForm}>
                <TextField
                  error={priceError}
                  // defaultValue={product.price}
                  // variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  autoComplete="price"
                  type="number"
                  autoFocus
                  helperText={priceMessageError}
                  onChange={(e) => {
                    setpriceError(false);
                    setpriceMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}>
                <TextField
                  error={event_locationError}
                  // defaultValue={product.id}
                  // variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="event_location"
                  label="Event Location"
                  name="event_location"
                  autoComplete="event_location"
                  autoFocus
                  helperText={event_locationMessageError}
                  onChange={(e) => {
                    setevent_locationError(false);
                    setevent_locationMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}>
                <TextField
                  error={event_dateError}
                  // defaultValue={product.id}
                  // variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="event_date"
                  label="Event Date"
                  name="event_date"
                  autoComplete="event_date"
                  type="date"
                  autoFocus
                  helperText={event_dateMessageError}
                  onChange={(e) => {
                    setevent_dateError(false);
                    setevent_dateMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}>
                <TextField
                  error={event_timeError}
                  // defaultValue={product.id}
                  // variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="event_time"
                  label="Event Time"
                  name="event_time"
                  autoComplete="event_time"
                  type="time"
                  autoFocus
                  helperText={event_timeMessageError}
                  onChange={(e) => {
                    setevent_timeError(false);
                    setevent_timeMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}></Grid>
              <Grid
                item
                md={12}
                container
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  size="large"
                  color="blue"
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

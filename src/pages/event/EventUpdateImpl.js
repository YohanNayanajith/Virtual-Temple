import React from "react";
import "../user/UserUpdateImpl.css";
import { Link, useLocation } from "react-router-dom";
import Charts from "../../components/charts/Charts";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import { Button } from "@mui/material";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { getUsers, updateNormalUser } from "../../redux/userApiCalls";
import { updateEvent } from "../../redux/eventApiCalls";

export const EventUpdateImpl = () => {
  const location = useLocation();
  // const productId = location.pathname.split("/")[3];
  const eventId = window.location.pathname.split("/")[2];
  // console.log(productId);
  const [pStats, setPStats] = useState([]);
  const [show, setShow] = useState(false);
  const [trigger, setTrigger] = useState("success");
  const [formSaveData, setFormSaveData] = useState([]);

  const [event_nameError, setevent_nameError] = useState(false);
  const [descriptionError, setdescriptionError] = useState(false);
  const [priceError, setpriceError] = useState(false);
  const [event_dateError, setevent_dateError] = useState(false);
  const [event_timeError, setevent_timeError] = useState(false);
  const [event_locationError, setevent_locationError] = useState(false);

  const [event_nameMessageError, setevent_nameMessageError] = useState("");
  const [descriptionMessageError, setdescriptionMessageError] = useState("");
  const [priceMessageError, setpriceMessageError] = useState("");
  const [event_dateMessageError, setevent_dateMessageError] = useState("");
  const [event_timeMessageError, setevent_timeMessageError] = useState("");
  const [event_locationMessageError, setevent_locationMessageError] = useState("");

  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.currentUser.user_id);

  const currentUser = useSelector((state) =>
    state.event.events.data.find((user) => user.event_id == eventId)
  );
  console.log(currentUser);

  React.useEffect(() => {
    const getDataFromDB = async () => {
      const result = await getUsers(dispatch, token);
      if (result) {
        console.log("Get user data success");
      } else {
        console.log("Get user data unsuccess");
      }
    };
    getDataFromDB();
  }, [trigger]);
  // const otherUsers = useSelector((state) => state.user.otherUsers.data);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    let data = [
      { name: MONTHS[0], Sales: 15 },
      { name: MONTHS[1], Sales: 20 },
      { name: MONTHS[2], Sales: 65 },
      { name: MONTHS[3], Sales: 45 },
      { name: MONTHS[4], Sales: 20 },
      { name: MONTHS[5], Sales: 74 },
    ];
    setPStats(data);
  }, [MONTHS]);

  const updateProductSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formNewData = {
      event_id: eventId,
      user_id: userId,
      event_name: formData.get("event_name")
        ? formData.get("event_name")
        : currentUser.event_name,
      description: formData.get("description")
        ? formData.get("description")
        : currentUser.description,
      price: formData.get("price") ? formData.get("price") : currentUser.price,
      event_location: formData.get("event_location")
        ? formData.get("event_location")
        : currentUser.event_location,
      event_date: formData.get("event_date")
        ? formData.get("event_date")
        : currentUser.event_date,
      event_time: formData.get("event_time")
        ? formData.get("event_time")
        : currentUser.event_location,

      // img: product.img,
    };

    console.log(formNewData);

    const result = await updateEvent(
      formNewData,
      dispatch,
      token
    );

    setTrigger(trigger + "su");
    // console.log(result);
    if (result) {
      console.log("Success");
      Swal.fire({
        icon: "success",
        title: "Successfully Updated!",
      });
    } else {
      console.log("Unsuccess");
      Swal.fire({
        icon: "error",
        title: "Update Unsuccess!",
      });
    }
  };

  return (
    <div>
      <div className="productTitleContainer">
        <h1 className="addTitle">Event Detail Edit</h1>
        <div>
          <Button
            variant="contained"
            href="/event"
            style={{ marginRight: 10 }}
            color="warning"
            // endIcon={<AddIcon />}
          >
            Back
          </Button>
          {/* <Link to="/createUser"> */}
          {/* <button className="color-contained-button">Create</button> */}
          <Button
            variant="contained"
            href="/createEvent"
            // color="secondary"
            // endIcon={<AddIcon />}
          >
            Create
          </Button>
          {/* </Link> */}
        </div>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Charts data={pStats} dataKey1="Sales" title="User Registration" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={currentUser.user_img} alt="" className="productInfoImg" />
            <span className="productName">Event Details</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Event ID:</span>
              <span className="productInfoValue">{eventId}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Event Name:</span>
              <span className="productInfoValue">{currentUser.event_name}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Event Date:</span>
              <span className="productInfoValue">{currentUser.event_date}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Location:</span>
              <span className="productInfoValue">{currentUser.event_location}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <h2 className="h3Title">Update Event</h2>
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
          {/* <form className="productForm" onSubmit={updateProduct}> */}

          <Box
            component="form"
            noValidate
            onSubmit={updateProductSubmit}
            className="productForm"
            // sx={{ m: 5 }}
          >
            {/* <div className="productFormLeft"> */}
            <Grid container spacing={4}>
              <Grid item md={10}>
                <Grid container spacing={2}>
                  <Grid item md={4}>
                    <TextField
                      error={event_nameError}
                      defaultValue={currentUser.event_name}
                      variant="standard"
                      margin="normal"
                      // required
                      fullWidth
                      id="event_name"
                      label="Event Name"
                      name="event_name"
                      autoComplete="event_name"
                      autoFocus
                      helperText={event_nameMessageError}
                      onChange={() => {
                        setevent_nameError(false);
                        setevent_nameMessageError("");
                      }}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      error={descriptionError}
                      defaultValue={currentUser.description}
                      variant="standard"
                      margin="normal"
                      // required
                      fullWidth
                      id="description"
                      label="Description"
                      name="description"
                      autoComplete="description"
                      autoFocus
                      helperText={descriptionMessageError}
                      onChange={() => {
                        setdescriptionError(false);
                        setdescriptionMessageError("");
                      }}
                    />
                  </Grid>
                  {/* <Grid item md={4}>
                    <TextField
                      error={categoryError}
                      defaultValue={currentUser.category}
                      variant="standard"
                      margin="normal"
                      select
                      // required
                      fullWidth
                      id="category"
                      label="Category"
                      name="category"
                      autoComplete="category"
                      autoFocus
                      helperText={categoryMessageError}
                      onChange={() => {
                        setCategoryError(false);
                        setCategoryMessageError("");
                      }}
                    >
                      {categoryData.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid> */}
                  {/* <Grid item md={4}>
                    <TextField
                      error={messureError}
                      defaultValue={currentUser.contact}
                      variant="standard"
                      margin="normal"
                      select
                      // required
                      fullWidth
                      id="messure"
                      label="UOM"
                      name="messure"
                      autoComplete="messure"
                      autoFocus
                      helperText={messureMessageError}
                      onChange={() => {
                        setMessureError(false);
                        setMessureMessageError("");
                      }}
                    >
                      {uomData.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid> */}
                  <Grid item md={4}>
                    <TextField
                      error={priceError}
                      defaultValue={currentUser.price}
                      variant="standard"
                      margin="normal"
                      // required
                      type="number"
                      fullWidth
                      id="price"
                      label="Price"
                      name="price"
                      autoComplete="price"
                      autoFocus
                      helperText={priceMessageError}
                      onChange={() => {
                        setpriceError(false);
                        setpriceMessageError("");
                      }}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      error={event_dateError}
                      defaultValue={currentUser.event_date}
                      variant="standard"
                      margin="normal"
                      // required
                      type="date"
                      fullWidth
                      id="event_date"
                      label="event_date"
                      name="Event Date"
                      autoComplete="event_date"
                      autoFocus
                      helperText={event_dateMessageError}
                      onChange={() => {
                        setevent_dateError(false);
                        setevent_dateMessageError("");
                      }}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      error={event_timeError}
                      defaultValue={currentUser.event_time}
                      variant="standard"
                      margin="normal"
                      // required
                      type="time"
                      fullWidth
                      id="event_time"
                      label="event_time"
                      name="Event Time"
                      autoComplete="event_time"
                      autoFocus
                      helperText={event_timeMessageError}
                      onChange={() => {
                        setevent_timeError(false);
                        setevent_timeMessageError("");
                      }}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      error={event_locationError}
                      defaultValue={currentUser.event_location}
                      variant="standard"
                      margin="normal"
                      // required
                      fullWidth
                      id="event_location"
                      label="event_location"
                      name="Event Location"
                      autoComplete="event_location"
                      autoFocus
                      helperText={event_locationMessageError}
                      onChange={() => {
                        setevent_locationError(false);
                        setevent_locationMessageError("");
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={2}>
                <div className="productFormRight">
                  {/* <div className="productUpload">
                    <img
                      src={currentUser.user_img}
                      alt=""
                      className="productUploadImg"
                    />
                    <label for="file">
                      <Publish />
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="img"
                      style={{ display: "none" }}
                    />
                  </div> */}
                  <Button
                    variant="contained"
                    type="submit"
                    // color="secondary"
                    // endIcon={<AddIcon />}
                  >
                    Update
                  </Button>
                </div>
              </Grid>
            </Grid>
            {/* </form> */}
          </Box>
        </Box>
      </div>
    </div>
  );
};

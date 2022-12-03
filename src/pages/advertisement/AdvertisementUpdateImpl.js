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
import { getAdvertisement, updateAdvertisement } from "../../redux/advertisementApiCalls";

export const AdvertisementUpdateImpl = () => {
  const location = useLocation();
  // const productId = location.pathname.split("/")[3];
  const advertisementId = window.location.pathname.split("/")[2];
  // console.log(productId);
  const [pStats, setPStats] = useState([]);
  const [show, setShow] = useState(false);
  const [trigger, setTrigger] = useState("success");
  const [formSaveData, setFormSaveData] = useState([]);

  const [descriptionError, setdescriptionError] = useState(false);
  const [urlError, seturlError] = useState(false);

  const [descriptionMessageError, setdescriptionMessageError] = useState("");
  const [urlMessageError, seturlMessageError] = useState("");

  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.currentUser.user_id);

  const currentUser = useSelector((state) =>
    state.advertisement.advertisements.find(
      (user) => user.advertisement_id == advertisementId
    )
  );
  console.log(currentUser);

  React.useEffect(() => {
    const getDataFromDB = async () => {
      const result = await getAdvertisement(dispatch, token);
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
      advertisement_id: advertisementId,
      image_url: currentUser.image_url,
      description: formData.get("description")
        ? formData.get("description")
        : currentUser.description,
      url: formData.get("url") ? formData.get("url") : currentUser.url,
    };

    console.log(formNewData);

    const result = await updateAdvertisement(formNewData, dispatch, token);

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
        <h1 className="addTitle">Advertisement Detail Edit</h1>
        <div>
          <Button
            variant="contained"
            href="/advertisement"
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
            href="/createAdvertisement"
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
          <Charts data={pStats} dataKey1="Sales" title="Advertisement Registration" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={currentUser.image_url} alt="" className="productInfoImg" />
            <span className="productName">Advertisement Details</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Advertisement ID:</span>
              <span className="productInfoValue">{advertisementId}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Advertisement Description:</span>
              <span className="productInfoValue">{currentUser.description}</span>
            </div>
            {/* <div className="productInfoItem">
              <span className="productInfoKey">Event Date:</span>
              <span className="productInfoValue">{currentUser.event_date}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Location:</span>
              <span className="productInfoValue">
                {currentUser.event_location}
              </span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="productBottom">
        <h2 className="h3Title">Update Advertisement</h2>
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
                      error={urlError}
                      defaultValue={currentUser.url}
                      variant="standard"
                      margin="normal"
                      // required
                      type="text"
                      fullWidth
                      id="url"
                      label="Url"
                      name="url"
                      autoComplete="url"
                      autoFocus
                      helperText={urlMessageError}
                      onChange={() => {
                        seturlError(false);
                        seturlMessageError("");
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

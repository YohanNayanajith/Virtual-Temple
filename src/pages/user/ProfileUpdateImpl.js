import React from "react";
import "./UserUpdateImpl.css";
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
import {
    getAdminUser,
  getAdminUsers,
  getUsers,
  updateAdminNormalUser,
  updateNormalUser,
} from "../../redux/userApiCalls";

export const ProfileUpdateImpl = () => {
  const location = useLocation();
  // console.log(productId);
  const [pStats, setPStats] = useState([]);
  const [show, setShow] = useState(false);
  const [triggerAdmin, setTriggerAdmin] = useState("success");
  const [formSaveData, setFormSaveData] = useState([]);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [firstNameMessageError, setFirstNameMessageError] = useState("");
  const [lastNameMessageError, setLastNameMessageError] = useState("");
  const [contactMessageError, setContactMessageError] = useState("");
  const [emailMessageError, setEmailMessageError] = useState("");

  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);

  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser);

  React.useEffect(() => {
    const getDataFromDBAdmin = async () => {
      const result = await getAdminUser(dispatch, token, currentUser.user_id);
      if (result) {
        console.log("Get user data success");
      } else {
        console.log("Get user data unsuccess");
      }
    };
    getDataFromDBAdmin();
  }, [triggerAdmin]);
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
      user_id: currentUser.user_id,
      first_name: formData.get("first_name")
        ? formData.get("first_name")
        : currentUser.first_name,
      last_name: formData.get("last_name")
        ? formData.get("last_name")
        : currentUser.last_name,
      contact: formData.get("contact")
        ? formData.get("contact")
        : currentUser.contact,
      email: formData.get("email") ? formData.get("email") : currentUser.email,
      address: currentUser.address,
      birthday: currentUser.birthday,
      district: currentUser.district,
      status: currentUser.status,
      town: currentUser.town,
      user_img: currentUser.user_img,
      zipcode: currentUser.zipcode,
      role_id: currentUser.role_id,
      // img: product.img,
    };

    console.log(formNewData);

    const result = await updateAdminNormalUser(
      currentUser.user_id,
      formNewData,
      dispatch,
      token
    );
    // console.log(result);
    if (result) {
      setTriggerAdmin(triggerAdmin + "yk");
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
        <h1 className="addTitle">User Detail Edit</h1>
        <div>
          <Button
            variant="contained"
            href="/profile"
            style={{ marginRight: 10 }}
            color="warning"
            // endIcon={<AddIcon />}
          >
            Back
          </Button>
          {/* <Link to="/createUser"> */}
          {/* <button className="color-contained-button">Create</button> */}

          {/* </Link> */}
        </div>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          {/* <Charts data={pStats} dataKey1="Sales" title="User Registration" /> */}
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={currentUser.user_img} alt="" className="productInfoImg" />
            <span className="productName">User Details</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">User ID:</span>
              <span className="productInfoValue">{currentUser.user_id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">First Name:</span>
              <span className="productInfoValue">{currentUser.first_name}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Last Name:</span>
              <span className="productInfoValue">{currentUser.last_name}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Email:</span>
              <span className="productInfoValue">{currentUser.email}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <h2 className="h3Title">Update User</h2>
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
                      error={firstNameError}
                      defaultValue={currentUser.first_name}
                      variant="standard"
                      margin="normal"
                      // required
                      fullWidth
                      id="first_name"
                      label="First Name"
                      name="first_name"
                      autoComplete="first_name"
                      autoFocus
                      helperText={firstNameMessageError}
                      onChange={() => {
                        setFirstNameError(false);
                        setFirstNameMessageError("");
                      }}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      error={lastNameError}
                      defaultValue={currentUser.last_name}
                      variant="standard"
                      margin="normal"
                      // required
                      fullWidth
                      id="last_name"
                      label="Last Name"
                      name="last_name"
                      autoComplete="last_name"
                      autoFocus
                      helperText={lastNameMessageError}
                      onChange={() => {
                        setLastNameError(false);
                        setLastNameMessageError("");
                      }}
                    />
                  </Grid>

                  <Grid item md={4}>
                    <TextField
                      error={contactError}
                      defaultValue={currentUser.contact}
                      variant="standard"
                      margin="normal"
                      // required
                      fullWidth
                      id="contact"
                      label="Contact Number"
                      name="contact"
                      autoComplete="contact"
                      autoFocus
                      helperText={contactMessageError}
                      onChange={() => {
                        setContactError(false);
                        setContactMessageError("");
                      }}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      error={emailError}
                      defaultValue={currentUser.email}
                      variant="standard"
                      margin="normal"
                      // required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      helperText={emailMessageError}
                      onChange={() => {
                        setEmailError(false);
                        setEmailMessageError("");
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

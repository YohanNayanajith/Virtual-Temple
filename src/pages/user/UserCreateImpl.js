import React, { useState } from "react";
import { Box, Button, Chip, Grid, MenuItem, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export const UserCreateImpl = () => {
  const [type, settype] = useState(true);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [allShow, setAllShow] = useState(false);
  const [show, setShow] = useState(false);
  const [sizeForm, setSizeForm] = useState(6);
  const [current_date, setCurrent_Date] = useState("");
  const [employeeNo, setEmployeeNo] = useState(
    "EMP" + Math.floor(Math.random() * 100000 + 1001)
  );

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [userImageError, setUserImageError] = useState(false);
  const [townError, setTownError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [zipcodeError, setZipcodeError] = useState(false);
  const [districtError, setDistrictError] = useState(false);

  const [firstNameMessageError, setFirstNameMessageError] = useState("");
  const [lastNameMessageError, setLastNameMessageError] = useState("");
  const [emailMessageError, setEmailMessageError] = useState("");
  const [mobileNumberMessageError, setMobileNumberMessageError] = useState("");
  // const [townMessageError, setTownMessageError] = useState("");
  // const [townMessageError, setTownMessageError] = useState("");

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(inputs);
    // alert("Click submit");
  };
  return (
    <Grid container xs={12} direction="column">
      <Grid container xs={12} direction="row" justifyContent="space-between">
        <Grid item xs={6}>
          <Typography variant="h3">Create User</Typography>
        </Grid>
        <Button
          variant="contained"
          href="#text-buttons"
          bgColor="secondary"
          startIcon={<ArrowBackIcon />}
        >
          Create
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
                  // error={firstNameError}
                  // defaultValue={employeeNo}
                  // variant="standard"
                  // disabled
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="firstName"
                  autoFocus
                  // helperText={firstNameMessageError}
                  onClick={(e) => {
                    // setFirstNameError(false);
                    // setFirstNameMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>
              <Grid item md={sizeForm}>
                <TextField
                  // error={lastNameError}
                  // defaultValue={product.fullname}
                  // variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lastName"
                  autoFocus
                  // helperText={lastNameMessageError}
                  onChange={(e) => {
                    // setLastNameError(false);
                    // setLastNameMessageError("");
                    // handleChange();
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>
              <Grid item md={sizeForm}>
                <TextField
                  // error={emailError}
                  // defaultValue={product.email}
                  // variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  // helperText={emailMessageError}
                  onChange={(e) => {
                    // setEmailError(false);
                    // setEmailMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>
              {/* <Grid item md={sizeForm}>
              <TextField
                error={usertypeError}
                // defaultValue={product.id}
                // variant="standard"
                value={type}
                margin="normal"
                required
                select
                fullWidth
                id="roleName"
                label="User Type"
                name="roleName"
                autoComplete="roleName"
                autoFocus
                helperText={usertypeMessageError}
                onChange={(event) => {
                  setUsertypeError(false);
                  setUsertypeMessageError("");
                  settype(event.target.value);
                  // handleCat();
                }}
              >
                {typeData.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> */}

              <Grid item md={sizeForm}>
                <TextField
                  // error={townError}
                  // defaultValue={product.id}
                  // variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="town"
                  label="Town"
                  name="town"
                  autoComplete="town"
                  autoFocus
                  // helperText={usernameMessageError}
                  onChange={(e) => {
                    // setUsernameError(false);
                    // setUsernameMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}>
                <TextField
                  // error={townError}
                  // defaultValue={product.id}
                  // variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  autoFocus
                  // helperText={usernameMessageError}
                  onChange={(e) => {
                    // setUsernameError(false);
                    // setUsernameMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}>
                <TextField
                  // error={townError}
                  // defaultValue={product.id}
                  // variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="zipCode"
                  label="zipCode"
                  name="Zip Code"
                  autoComplete="zipCode"
                  autoFocus
                  // helperText={usernameMessageError}
                  onChange={(e) => {
                    // setUsernameError(false);
                    // setUsernameMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}>
                <TextField
                  // error={townError}
                  // defaultValue={product.id}
                  // variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="district"
                  label="district"
                  name="District"
                  autoComplete="district"
                  autoFocus
                  // helperText={usernameMessageError}
                  onChange={(e) => {
                    // setUsernameError(false);
                    // setUsernameMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}>
                <TextField
                  // error={usernameError}
                  // defaultValue={product.id}
                  // variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="mobileNumber"
                  label="Mobile Number"
                  name="mobileNumber"
                  autoComplete="mobileNumber"
                  autoFocus
                  // helperText={mobileNumberMessageError}
                  onChange={(e) => {
                    // setMobileNumberError(false);
                    // setMobileNumberMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}>
                <TextField
                  // error={townError}
                  // defaultValue={product.id}
                  // variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="password"
                  name="Password"
                  autoComplete="password"
                  type="password"
                  autoFocus
                  // helperText={usernameMessageError}
                  onChange={(e) => {
                    // setUsernameError(false);
                    // setUsernameMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}>
                <TextField
                  // error={townError}
                  // defaultValue={product.id}
                  // variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="confirmPassword"
                  label="confirmPassword"
                  name="Confirm Password"
                  autoComplete="confirmPassword"
                  type="password"
                  autoFocus
                  // helperText={usernameMessageError}
                  onChange={(e) => {
                    // setUsernameError(false);
                    // setUsernameMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}>
                <TextField
                  // error={imageError}
                  // defaultValue={null}
                  // variant="standard"
                  type="file"
                  margin="normal"
                  required
                  fullWidth
                  id="file"
                  label="Image"
                  name="file"
                  autoComplete="file"
                  autoFocus
                  // helperText={imageMessageError}
                  onChange={(e) => {
                    // setImageError(false);
                    // setImageMessageError("");
                    setFile(e.target.files[0]);
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
                <Button type="submit" variant="contained" endIcon={<SendIcon />} size="large" color="blue" fontColor="white">
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

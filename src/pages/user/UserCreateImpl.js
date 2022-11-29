import React, { useState } from "react";
import { Box, Button, Chip, Grid, MenuItem, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import Swal from "sweetalert2";
import { adminRegister, normalUserRegister } from "../../redux/userApiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const typeData = [
  {
    value: "R001",
    label: "Admin",
  },
  {
    value: "R002",
    label: "Normal User",
  },
];

export const UserCreateImpl = () => {
  const [type, settype] = useState("");
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
  const [townError, setTownError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [zipcodeError, setZipcodeError] = useState(false);
  const [districtError, setDistrictError] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [birthdayError, setBirthdayError] = useState(false);

  const [statusError, setStatusError] = useState(false);
  const [userImageError, setUserImageError] = useState(false);

  const [firstNameMessageError, setFirstNameMessageError] = useState("");
  const [lastNameMessageError, setLastNameMessageError] = useState("");
  const [emailMessageError, setEmailMessageError] = useState("");
  const [townMessageError, setTownMessageError] = useState("");
  const [addressMessageError, setAddressMessageError] = useState("");
  const [zipcodeMessageError, setZipcodeMessageError] = useState("");
  const [districtMessageError, setDistrictMessageError] = useState("");
  const [mobileNumberMessageError, setMobileNumberMessageError] = useState("");
  const [passwordMessageError, setPasswordMessageError] = useState("");
  const [confirmPasswordMessageError, setConfirmPasswordMessageError] =
    useState("");
  const [birthdayMessageError, setBirthdayMessageError] = useState("");

  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

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
      first_name: data.get("firstName"),
      last_name: data.get("lastName"),
      status: true,
      // user_img: data.get("file"),
      town: data.get("town"),
      address: data.get("address"),
      zipcode: data.get("zipCode"),
      district: data.get("district"),
      contact: data.get("mobileNumber"),
      email: data.get("email"),
      password: data.get("password"),
      // birthday: data.get("birthday"),
    };

    if (!data.get("firstName")) {
      setFirstNameError(true);
      setFirstNameMessageError("First Name can't be empty!");
    } else if (!data.get("lastName")) {
      setLastNameError(true);
      setLastNameMessageError("Last Name can't be empty!");
    } else if (!data.get("town")) {
      setTownError(true);
      setTownMessageError("Town can't be empty!");
    } else if (!data.get("address")) {
      setAddressError(true);
      setAddressMessageError("Address can't be empty!");
    } else if (!data.get("zipCode")) {
      setZipcodeError(true);
      setZipcodeMessageError("Zipcode can't be empty!");
    } else if (!data.get("district")) {
      setDistrictError(true);
      setDistrictMessageError("District can't be empty!");
    } else if (!data.get("mobileNumber")) {
      setMobileNumberError(true);
      setMobileNumberMessageError("Mobile Number can't be empty!");
    } else if (!data.get("email")) {
      setEmailError(true);
      setEmailMessageError("Email can't be empty!");
    } else if (!data.get("password")) {
      setPasswordError(true);
      setPasswordMessageError("Password can't be empty!");
    } else if (!data.get("confirmPassword")) {
      setConfirmPasswordError(true);
      setConfirmPasswordMessageError("Confirm password can't be empty!");
    } else if (!(data.get("password") === data.get("confirmPassword"))) {
      setConfirmPasswordError(true);
      setConfirmPasswordMessageError(
        "Password and confirm password should be same!"
      );
    } else {
      //image upload part
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const prevProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log("Upload is " + prevProgress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Image added unsuccess!",
          });
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            let userData = {
              ...formData,
                user_img: downloadURL,
                birthday: data.get("birthday"),
            };
            let status;
            if (data.get("roleName") === "R001") {
              console.log("Admin user");
              status = callAdmin(userData);
              console.log(status);
            } else {
              console.log("Non admin user");
              status = callNormalUser(userData);
              console.log(status);
            }

            if (status) {
              Swal.fire({
                title: "Success!",
                text: "User added success!",
                icon: "success",
                confirmButtonText: "Ok",
                confirmButtonColor: "#378cbb",
                // showConfirmButton: false,
                // timer: 2000,
              });
              navigate("/user");
              // e.target.firstName = "";
              // e.target.lastName = "";
              // e.target.email = "";
              // e.target.town = "";
              // e.target.address = "";
              // e.target.zipcode = "";
              // e.target.district = "";
              // e.target.mobileNumber = "";
              // e.target.password = "";
              // e.target.confirmPassword = "";
              // e.target.birthday = "";
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "User added unsuccess!",
              });
            }
          });
        }
      );
    }
    console.log(formData);
  };

  const callAdmin = async (userData)=>{
    const status = await adminRegister(userData, token);
    return status;
  }
  const callNormalUser = async (userData)=>{
    const status = await normalUserRegister(userData, token);
    return status;
  }

  return (
    <Grid container direction="column">
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={6}>
          <Typography variant="h3">Create User</Typography>
        </Grid>
        <Button
          variant="contained"
          href="/user"
          startIcon={<ArrowBackIcon />}
        >
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
                  error={firstNameError}
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
                  helperText={firstNameMessageError}
                  onClick={(e) => {
                    setFirstNameError(false);
                    setFirstNameMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>
              <Grid item md={sizeForm}>
                <TextField
                  error={lastNameError}
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
                  helperText={lastNameMessageError}
                  onChange={(e) => {
                    setLastNameError(false);
                    setLastNameMessageError("");
                    // handleChange();
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>
              <Grid item md={sizeForm}>
                <TextField
                  error={emailError}
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
                  helperText={emailMessageError}
                  onChange={(e) => {
                    setEmailError(false);
                    setEmailMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}>
                <TextField
                  error={townError}
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
                  helperText={townMessageError}
                  onChange={(e) => {
                    setTownError(false);
                    setTownMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}>
                <TextField
                  error={addressError}
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
                  helperText={addressMessageError}
                  onChange={(e) => {
                    setAddressError(false);
                    setAddressMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}>
                <TextField
                  error={zipcodeError}
                  // defaultValue={product.id}
                  // variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="zipCode"
                  label="ZipCode"
                  name="zipCode"
                  autoComplete="zipCode"
                  autoFocus
                  helperText={zipcodeMessageError}
                  onChange={(e) => {
                    setZipcodeError(false);
                    setZipcodeMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}>
                <TextField
                  error={districtError}
                  // defaultValue={product.id}
                  // variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="district"
                  label="District"
                  name="district"
                  autoComplete="district"
                  autoFocus
                  helperText={districtMessageError}
                  onChange={(e) => {
                    setDistrictError(false);
                    setDistrictMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}>
                <TextField
                  error={mobileNumberError}
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
                  helperText={mobileNumberMessageError}
                  onChange={(e) => {
                    setMobileNumberError(false);
                    setMobileNumberMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}>
                <TextField
                  error={passwordError}
                  // defaultValue={product.id}
                  // variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="password"
                  type="password"
                  autoFocus
                  helperText={passwordMessageError}
                  onChange={(e) => {
                    setPasswordError(false);
                    setPasswordMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}>
                <TextField
                  error={confirmPasswordError}
                  // defaultValue={product.id}
                  // variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  autoComplete="confirmPassword"
                  type="password"
                  autoFocus
                  helperText={confirmPasswordMessageError}
                  onChange={(e) => {
                    setConfirmPasswordError(false);
                    setConfirmPasswordMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}>
                <TextField
                  error={birthdayError}
                  // defaultValue={product.id}
                  // variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="birthday"
                  label="Birthday"
                  name="birthday"
                  autoComplete="birthday"
                  type="date"
                  autoFocus
                  helperText={birthdayMessageError}
                  onChange={(e) => {
                    setBirthdayError(false);
                    setBirthdayMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}>
                <TextField
                  // error={usertypeError}
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
                  // helperText={usertypeMessageError}
                  onChange={(event) => {
                    // setUsertypeError(false);
                    // setUsertypeMessageError("");
                    settype(event.target.value);
                    console.log(event.target.value);
                    // handleCat();
                  }}
                >
                  {typeData.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
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

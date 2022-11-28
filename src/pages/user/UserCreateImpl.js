import React, { useState } from "react";
import { Box, Button, Chip, Grid, MenuItem, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

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

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);
  //   let formData = {
  //     title: data.get("title"),
  //     description: data.get("description"),
  //     category: data.get("category"),
  //     uom: data.get("messure"),
  //     minQuantity: data.get("minQuantity"),
  //     maxQuantity: data.get("maxQuantity"),
  //     file: data.get("file"),
  //   };
  //   if (!formData.title) {
  //     setTitleError(true);
  //     setTitleMessageError("Title can't be empty!");
  //   } else if (!formData.description) {
  //     setDescriptionError(true);
  //     setDescriptionMessageError("Description can't be empty!");
  //   } else if (!formData.category) {
  //     setCategoryError(true);
  //     setCategoryMessageError("Category can't be empty!");
  //   } else if (!formData.uom) {
  //     setMessureError(true);
  //     setMessureMessageError("UOM can't be empty!");
  //   } else if (!formData.minQuantity) {
  //     setMinimumLevelError(true);
  //     setMinimumLevelMessageError("Minimum level can't be empty!");
  //   } else if (!formData.maxQuantity) {
  //     setQuantityError(true);
  //     setQuantityMessageError("Maximum level can't be empty!");
  //   } else if (!file) {
  //     setImageError(true);
  //     setImageMessageError("Image can't be empty!");
  //   } else if(parseInt(formData.minQuantity) >= parseInt(formData.maxQuantity)){
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'Maximum level should be greater than minimum level!'
  //     })
  //   }else {
  //     const fileName = new Date().getTime() + file.name;
  //     const storage = getStorage(app);
  //     const storageRef = ref(storage, fileName);
  //     const uploadTask = uploadBytesResumable(storageRef, file);

  //     // Register three observers:
  //     // 1. 'state_changed' observer, called any time the state changes
  //     // 2. Error observer, called on failure
  //     // 3. Completion observer, called on successful completion
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         // Observe state change events such as progress, pause, and resume
  //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //         setAfterClicked(true);
  //         const prevProgress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

  //         console.log("Upload is " + prevProgress + "% done");
  //         switch (snapshot.state) {
  //           case "paused":
  //             console.log("Upload is paused");
  //             break;
  //           case "running":
  //             console.log("Upload is running");
  //             break;
  //           default:
  //         }
  //       },
  //       (error) => {
  //         // Handle unsuccessful uploads
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Oops...',
  //           text: 'Image added unsuccess!'
  //         })
  //       },
  //       () => {
  //         // Handle successful uploads on complete
  //         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           const product = {
  //             ...inputs,
  //             img: downloadURL,
  //             // categories: [...cat, "all"],
  //             category: category,
  //             uom: UOM,
  //             isApprove: userType === "ROLE_PURCHASING_STAFF" ? false : true,
  //           };
  //           const productStatus = addProduct(product, dispatch);
  //           console.log(productStatus.PromiseResult);
  //           if (productStatus) {
  //             setAfterClicked(false);
  //             setProgress(0);
  //             setAllShow(true);
  //             Swal.fire({
  //               title: "Success!",
  //               text: "Product added success!",
  //               icon: "success",
  //               confirmButtonText: 'Ok',
  //               confirmButtonColor: '#378cbb',
  //               // showConfirmButton: false,
  //               // timer: 2000,
  //             }).then((result) => {
  //               setInputs({});
  //               setCategory("");
  //               setFile(null);
  //               setUOM("");
  //               // if (result.isConfirmed) {
  //               //   Swal.fire('Saved!', '', 'success')
  //               // }
  //               // window.location.href = "http://localhost:3000/purchaseStaff/productList";
  //             })
  //             // return (
  //             //   <Stack sx={{ width: "100%" }} spacing={2}>
  //             //     <Alert severity="success">
  //             //       Product added success!
  //             //     </Alert>
  //             //   </Stack>
  //             // );
  //           } else {
  //             return (
  //               Swal.fire({
  //                 icon: 'error',
  //                 title: 'Oops...',
  //                 text: 'Product added unsuccess!'
  //               })
  //               // <Stack sx={{ width: "100%" }} spacing={2}>
  //               //   <Alert severity="warning">Product added unsuccess!</Alert>
  //               // </Stack>
  //             );
  //           }
  //         });
  //       }
  //     );
  //   }
  // };

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

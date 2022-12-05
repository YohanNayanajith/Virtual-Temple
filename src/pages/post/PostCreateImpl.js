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
import { useNavigate } from "react-router-dom";
import { addPost } from "../../redux/postApiCalls";
import Select from "@mui/material/Select";

const typeData = [
  {
    value: "url",
    label: "Url",
  },
  {
    value: "image",
    label: "Image",
  },
];

export const PostCreateImpl = () => {
  const [type, settype] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [dropdownValue1, setDropdownValue1] = useState(true);
  const [dropdownValue2, setDropdownValue2] = useState(true);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [sizeForm, setSizeForm] = useState(6);

  const [descriptionError, setdescriptionError] = useState(false);
  const [urlError, setUrlError] = useState(false);

  const [descriptionMessageError, setdescriptionMessageError] = useState("");
  const [urlMessageError, setUrlMessageError] = useState("");

  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.currentUser.user_id);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(inputs);
    console.log(selectValue);
    const data = new FormData(e.currentTarget);

    let formData = {
      user_id: userId,
      description: data.get("description"),
    };

    if (!data.get("description")) {
      setdescriptionError(true);
      setdescriptionMessageError("Description Name can't be empty!");
    } else if (!(selectValue == "image")) {
      console.log(data.get("url"));
      let userData = {
        ...formData,
        posts: [data.get("url")],
      };
      console.log("Url select");
      let status = callNormalUser(userData);
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
        navigate("/post");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User added unsuccess!",
        });
      }
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
              posts: [downloadURL],
            };
            let status = callNormalUser(userData);
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
              navigate("/post");
              // e.target.description = "";
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

  const callNormalUser = async (userData) => {
    const status = await addPost(userData, token);
    return status;
  };

  const handleChangeSelectValue = (event) => {
    setSelectValue(event.target.value);
    if (event.target.value == "image") {
      setDropdownValue2(true);
      setDropdownValue1(false);
    } else {
      setDropdownValue1(true);
      setDropdownValue2(false);
    }
  };

  return (
    <Grid container direction="column">
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={6}>
          <Typography variant="h3">Create Post</Typography>
        </Grid>
        <Button variant="contained" href="/post" startIcon={<ArrowBackIcon />}>
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
                  error={descriptionError}
                  // defaultValue={employeeNo}
                  // variant="standard"
                  // disabled
                  margin="normal"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="description"
                  autoFocus
                  helperText={descriptionMessageError}
                  onClick={(e) => {
                    setdescriptionError(false);
                    setdescriptionMessageError("");
                    setInputs((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={sizeForm}>
                <TextField
                  // error={categoryError}
                  // defaultValue={currentUser.category}
                  // variant="standard"
                  margin="normal"
                  select
                  // required
                  fullWidth
                  id="category"
                  label="Category"
                  name="category"
                  autoComplete="category"
                  autoFocus
                  // helperText={categoryMessageError}
                  onChange={handleChangeSelectValue}
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
                  error={urlError}
                  // defaultValue={employeeNo}
                  // variant="standard"
                  // disabled
                  disabled={dropdownValue2}
                  margin="normal"
                  required
                  fullWidth
                  id="url"
                  label="Url"
                  name="url"
                  autoComplete="url"
                  autoFocus
                  helperText={urlMessageError}
                  onClick={(e) => {
                    setUrlError(false);
                    setUrlMessageError("");
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
                  disabled={dropdownValue1}
                  type="file"
                  margin="normal"
                  required
                  fullWidth
                  id="file"
                  label="Image"
                  name="file"
                  autoComplete="file"
                  autoFocus
                  InputLabelProps={{
                    shrink: true,
                  }}
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

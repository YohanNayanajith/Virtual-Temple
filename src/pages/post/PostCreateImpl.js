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
import { addPost } from "../../redux/postApiCalls";

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

export const PostCreateImpl = () => {
  const [type, settype] = useState("");
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [sizeForm, setSizeForm] = useState(6);

  const [descriptionError, setdescriptionError] = useState(false);

  const [descriptionMessageError, setdescriptionMessageError] = useState("");

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
    const data = new FormData(e.currentTarget);

    let formData = {
      user_id: userId,
      description: data.get("description"),
    };

    if (!data.get("description")) {
      setdescriptionError(true);
      setdescriptionMessageError("First Name can't be empty!");
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
              navigate("/user");
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
                  label="First Name"
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

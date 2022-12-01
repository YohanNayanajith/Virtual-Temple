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
import { getPost, updatePost } from "../../redux/postApiCalls";

export const PostUpdateImpl = () => {
  const location = useLocation();
  // const productId = location.pathname.split("/")[3];
  const postId = window.location.pathname.split("/")[2];
  // console.log(productId);
  const [pStats, setPStats] = useState([]);
  const [show, setShow] = useState(false);
  const [trigger, setTrigger] = useState("success");
  const [formSaveData, setFormSaveData] = useState([]);

  const [descriptionError, setdescriptionError] = useState(false);

  const [descriptionMessageError, setdescriptionMessageError] = useState("");

  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);

  const currentUser = useSelector((state) =>
    state.post.posts.data.find((post) => post.post_id == postId)
  );
  console.log(currentUser);

  React.useEffect(() => {
    const getDataFromDB = async () => {
      const result = await getPost(dispatch, token);
      if (result) {
        console.log("Get post data success");
      } else {
        console.log("Get post data unsuccess");
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
      // user_id: currentUser.user_id,
      description: formData.get("description")
        ? formData.get("first_name")
        : currentUser.description,
      
      // img: product.img,
    };

    console.log(formNewData);

    const result = await updatePost(
      postId,
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
        <h1 className="addTitle">Post Detail Edit</h1>
        <div>
          <Button
            variant="contained"
            href="/post"
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
            href="/createPost"
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
            <span className="productName">Post Details</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Post ID:</span>
              <span className="productInfoValue">{postId}</span>
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

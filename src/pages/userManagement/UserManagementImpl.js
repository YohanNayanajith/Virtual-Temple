import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Grid, MenuItem, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";

import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { getOnePermission, updatePermission } from "../../redux/permissionApiCalls";

export const UserManagementImpl = () => {
  const [sizeForm, setSizeForm] = useState(6);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const permission = useSelector((state) => state.permission.permissions);
  const userId = window.location.pathname.split("/")[2];
  console.log(userId);
  console.log(permission);
  const [checked, setChecked] = React.useState({
    adminUser: [permission.view_users, permission.update_users, permission.create_users, permission.delete_users],
    event: [permission.view_events, permission.update_events, permission.create_events, permission.delete_events],
    advertisement: [permission.view_advertisement, permission.update_advertisement, permission.create_advertisement, permission.delete_advertisement],
    post: [permission.view_posts, permission.update_posts, permission.create_posts, permission.delete_posts],
  });

  useEffect(()=>{
    const getPermissionData = async ()=>{
        //  "5b907c90-52d9-11ed-98e7-131b43a672d5"
        const result = await getOnePermission(dispatch,token,userId);
        if(result){
            console.log("get permission");
        }else{
            console.log("no permission");
        }
    }
    getPermissionData();
  },[]);

  //   Admin User
  const handleChange1 = (event) => {
    setChecked({
      ...checked,
      adminUser: [
        event.target.checked,
        event.target.checked,
        event.target.checked,
        event.target.checked,
      ],
    });
  };

  const handleChange2 = (event) => {
    setChecked({
      ...checked,
      adminUser: [
        event.target.checked,
        checked.adminUser[1],
        checked.adminUser[2],
        checked.adminUser[3],
      ],
    });
  };

  const handleChange3 = (event) => {
    setChecked({
      ...checked,
      adminUser: [
        checked.adminUser[0],
        event.target.checked,
        checked.adminUser[2],
        checked.adminUser[3],
      ],
    });
  };

  const handleChange4 = (event) => {
    setChecked({
      ...checked,
      adminUser: [
        checked.adminUser[0],
        checked.adminUser[1],
        event.target.checked,
        checked.adminUser[3],
      ],
    });
  };

  const handleChange5 = (event) => {
    setChecked({
      ...checked,
      adminUser: [
        checked.adminUser[0],
        checked.adminUser[1],
        checked.adminUser[2],
        event.target.checked,
      ],
    });
  };

  //Events
  const handleChangeEvent1 = (event) => {
    setChecked({
      ...checked,
      event: [
        event.target.checked,
        event.target.checked,
        event.target.checked,
        event.target.checked,
      ],
    });
  };

  const handleChangeEvent2 = (event) => {
    setChecked({
      ...checked,
      event: [
        event.target.checked,
        checked.event[1],
        checked.event[2],
        checked.event[3],
      ],
    });
  };

  const handleChangeEvent3 = (event) => {
    setChecked({
      ...checked,
      event: [
        checked.event[0],
        event.target.checked,
        checked.event[2],
        checked.event[3],
      ],
    });
  };

  const handleChangeEvent4 = (event) => {
    setChecked({
      ...checked,
      event: [
        checked.event[0],
        checked.event[1],
        event.target.checked,
        checked.event[3],
      ],
    });
  };

  const handleChangeEvent5 = (event) => {
    setChecked({
      ...checked,
      event: [
        checked.event[0],
        checked.event[1],
        checked.event[2],
        event.target.checked,
      ],
    });
  };

  //   advertisement
  const handleChangeAdvertisement1 = (event) => {
    setChecked({
      ...checked,
      advertisement: [
        event.target.checked,
        event.target.checked,
        event.target.checked,
        event.target.checked,
      ],
    });
  };

  const handleChangeAdvertisement2 = (event) => {
    setChecked({
      ...checked,
      advertisement: [
        event.target.checked,
        checked.advertisement[1],
        checked.advertisement[2],
        checked.advertisement[3],
      ],
    });
  };

  const handleChangeAdvertisement3 = (event) => {
    setChecked({
      ...checked,
      advertisement: [
        checked.advertisement[0],
        event.target.checked,
        checked.advertisement[2],
        checked.advertisement[3],
      ],
    });
  };

  const handleChangeAdvertisement4 = (event) => {
    setChecked({
      ...checked,
      advertisement: [
        checked.advertisement[0],
        checked.advertisement[1],
        event.target.checked,
        checked.advertisement[3],
      ],
    });
  };

  const handleChangeAdvertisement5 = (event) => {
    setChecked({
      ...checked,
      advertisement: [
        checked.advertisement[0],
        checked.advertisement[1],
        checked.advertisement[2],
        event.target.checked,
      ],
    });
  };

  //   posts
  const handleChangePost1 = (event) => {
    setChecked({
      ...checked,
      post: [
        event.target.checked,
        event.target.checked,
        event.target.checked,
        event.target.checked,
      ],
    });
  };

  const handleChangePost2 = (event) => {
    setChecked({
      ...checked,
      post: [
        event.target.checked,
        checked.post[1],
        checked.post[2],
        checked.post[3],
      ],
    });
  };

  const handleChangePost3 = (event) => {
    setChecked({
      ...checked,
      post: [
        checked.post[0],
        event.target.checked,
        checked.post[2],
        checked.post[3],
      ],
    });
  };

  const handleChangePost4 = (event) => {
    setChecked({
      ...checked,
      post: [
        checked.post[0],
        checked.post[1],
        event.target.checked,
        checked.post[3],
      ],
    });
  };

  const handleChangePost5 = (event) => {
    setChecked({
      ...checked,
      post: [
        checked.post[0],
        checked.post[1],
        checked.post[2],
        event.target.checked,
      ],
    });
  };

  const childrenAdminUser = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel
        label="View"
        control={
          <Checkbox checked={checked.adminUser[0]} onChange={handleChange2} />
        }
      />
      <FormControlLabel
        label="Update"
        control={
          <Checkbox checked={checked.adminUser[1]} onChange={handleChange3} />
        }
      />
      <FormControlLabel
        label="Create"
        control={
          <Checkbox checked={checked.adminUser[2]} onChange={handleChange4} />
        }
      />
      <FormControlLabel
        label="Delete"
        control={
          <Checkbox checked={checked.adminUser[3]} onChange={handleChange5} />
        }
      />
    </Box>
  );

  const childrenEvents = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel
        label="View"
        control={
          <Checkbox checked={checked.event[0]} onChange={handleChangeEvent2} />
        }
      />
      <FormControlLabel
        label="Update"
        control={
          <Checkbox checked={checked.event[1]} onChange={handleChangeEvent3} />
        }
      />
      <FormControlLabel
        label="Create"
        control={
          <Checkbox checked={checked.event[2]} onChange={handleChangeEvent4} />
        }
      />
      <FormControlLabel
        label="Delete"
        control={
          <Checkbox checked={checked.event[3]} onChange={handleChangeEvent5} />
        }
      />
    </Box>
  );

  const childrenAdvertisement = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel
        label="View"
        control={
          <Checkbox
            checked={checked.advertisement[0]}
            onChange={handleChangeAdvertisement2}
          />
        }
      />
      <FormControlLabel
        label="Update"
        control={
          <Checkbox
            checked={checked.advertisement[1]}
            onChange={handleChangeAdvertisement3}
          />
        }
      />
      <FormControlLabel
        label="Create"
        control={
          <Checkbox
            checked={checked.advertisement[2]}
            onChange={handleChangeAdvertisement4}
          />
        }
      />
      <FormControlLabel
        label="Delete"
        control={
          <Checkbox
            checked={checked.advertisement[3]}
            onChange={handleChangeAdvertisement5}
          />
        }
      />
    </Box>
  );

  const childrenPost = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel
        label="View"
        control={
          <Checkbox checked={checked.post[0]} onChange={handleChangePost2} />
        }
      />
      <FormControlLabel
        label="Update"
        control={
          <Checkbox checked={checked.post[1]} onChange={handleChangePost3} />
        }
      />
      <FormControlLabel
        label="Create"
        control={
          <Checkbox checked={checked.post[2]} onChange={handleChangePost4} />
        }
      />
      <FormControlLabel
        label="Delete"
        control={
          <Checkbox checked={checked.post[3]} onChange={handleChangePost5} />
        }
      />
    </Box>
  );

  const handleClick = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    let formData = {
      user_id: userId,
      user_role_name: "",
      description: "",
      view_users: checked.adminUser[0],
      create_users: checked.adminUser[2],
      update_users: checked.adminUser[1],
      delete_users: checked.adminUser[3],
      view_events: checked.event[0],
      update_events: checked.event[1],
      create_events: checked.event[2],
      delete_events: checked.event[3],
      view_advertisement: checked.advertisement[0],
      create_advertisement: checked.advertisement[2],
      delete_advertisement: checked.advertisement[3],
      update_advertisement: checked.advertisement[1],
      view_posts: checked.post[0],
      update_posts: checked.post[1],
      delete_posts: checked.post[3],
      create_posts: checked.post[2],
    };
    console.log(formData);

    const resultUpdate = await updatePermission(formData,dispatch,token);
    if(resultUpdate){
        console.log("Set");
    }else{
        console.log("Unset");
    }
  };

  return (
    <Grid container direction="column">
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={6}>
          <Typography variant="h3">User Permission</Typography>
        </Grid>
        <Button variant="contained" href="/user" startIcon={<ArrowBackIcon />}>
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
                <FormControlLabel
                  label="Admin User"
                  control={
                    <Checkbox
                      checked={
                        checked.adminUser[0] &&
                        checked.adminUser[1] &&
                        checked.adminUser[2] &&
                        checked.adminUser[3]
                      }
                      indeterminate={
                        checked.adminUser[0] !== checked.adminUser[1]
                      }
                      onChange={handleChange1}
                    />
                  }
                />
                {childrenAdminUser}
              </Grid>
              <Grid item md={sizeForm}>
                <FormControlLabel
                  label="Events"
                  control={
                    <Checkbox
                      checked={
                        checked.event[0] &&
                        checked.event[1] &&
                        checked.event[2] &&
                        checked.event[3]
                      }
                      indeterminate={checked.event[0] !== checked.event[1]}
                      onChange={handleChangeEvent1}
                    />
                  }
                />
                {childrenEvents}
              </Grid>

              <Grid item md={sizeForm}>
                <FormControlLabel
                  label="Advertisement"
                  control={
                    <Checkbox
                      checked={
                        checked.advertisement[0] && checked.advertisement[1]
                      }
                      indeterminate={
                        checked.advertisement[0] !== checked.advertisement[1]
                      }
                      onChange={handleChangeAdvertisement1}
                    />
                  }
                />
                {childrenAdvertisement}
              </Grid>
              <Grid item md={sizeForm}>
                <FormControlLabel
                  label="Post"
                  control={
                    <Checkbox
                      checked={checked.post[0] && checked.post[1]}
                      indeterminate={checked.post[0] !== checked.post[1]}
                      onChange={handleChangePost1}
                    />
                  }
                />
                {childrenPost}
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
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

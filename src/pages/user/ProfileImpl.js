import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";

export const ProfileImpl = () => {
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.currentUser);

  return (
    <Grid container direction="column">
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={6}>
          <Typography variant="h3">Create Post</Typography>
        </Grid>
      </Grid>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          alt="User Image"
          src={user.user_img}
          sx={{ width: 220, height: 220 }}
        />
      </Stack>
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
        <Box component="form" noValidate className="productForm" sx={{ m: 5 }}>
          {/* <div className="productFormLeft"> */}
          <Grid container spacing={4}>
            {/* <Grid item md={10}> */}
            <Grid container spacing={4}>
              <Grid item md={6}>
                <TextField
                  defaultValue={user.first_name ? user.first_name : "No Value"}
                  variant="standard"
                  disabled
                  margin="normal"
                  fullWidth
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  defaultValue={user.last_name ? user.last_name : "No Value"}
                  variant="standard"
                  disabled
                  margin="normal"
                  fullWidth
                  label="Last Name"
                  autoFocus
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  defaultValue={user.town ? user.town : "No Value"}
                  variant="standard"
                  disabled
                  margin="normal"
                  fullWidth
                  label="Town"
                  autoFocus
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  defaultValue={user.address ? user.address : "No Value"}
                  variant="standard"
                  disabled
                  margin="normal"
                  fullWidth
                  label="Address"
                  autoFocus
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  defaultValue={user.zipcode ? user.zipcode : "No Value"}
                  variant="standard"
                  disabled
                  margin="normal"
                  fullWidth
                  label="ZipCode"
                  autoFocus
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  defaultValue={user.district ? user.district : "No Value"}
                  variant="standard"
                  disabled
                  margin="normal"
                  fullWidth
                  label="District"
                  autoFocus
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  defaultValue={user.contact ? user.contact : "No Value"}
                  variant="standard"
                  disabled
                  margin="normal"
                  fullWidth
                  label="Contact"
                  autoFocus
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  defaultValue={user.email ? user.email : "No Value"}
                  variant="standard"
                  disabled
                  margin="normal"
                  fullWidth
                  label="Email"
                  autoFocus
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  defaultValue={user.birthday ? user.birthday : "No Value"}
                  variant="standard"
                  disabled
                  margin="normal"
                  fullWidth
                  label="Birthday"
                  autoFocus
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

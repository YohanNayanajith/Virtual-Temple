import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Badge,
  Button,
  Chip,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import SlideBar from "./SlideBar";
import MainHeaderMenu from "./MainHeaderMenu";
import NotificationMenu from "./NotificationMenu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function MainHeader(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabValue, setTabValue] = useState(props.value);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const userToken = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const checkUserExist = () => {
  //     if (!user) {
  //       navigate("/login");
  //     }
  //   };
  //   checkUserExist();
  // }, []);
  if(userToken === null){
    // navigate("/");
    window.location.href = "/";
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <AppBar component="nav" sx={{ backgroundColor: "#fff" }}>
          <Toolbar style={{ position: "relative" }}>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              //   sx={{ mr: 2, display: { sm: "none" }, color: "#000" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            ></Typography>
            {/* <Box
              id="nav-container-list"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <MainTab value={tabValue} />
            </Box> */}
            <IconButton onClick={() => navigate("/profile")}>
            {/* <IconButton> */}
              <Avatar alt="Profile Picture" src={user.user_img} />
            </IconButton>
            {/* <NotificationMenu /> */}
            <MainHeaderMenu />
          </Toolbar>
        </AppBar>
        <SlideBar
          open={mobileOpen}
          onClose={handleDrawerToggle}
          tabValue={tabValue}
        />
      </Box>
    </ThemeProvider>
  );
}

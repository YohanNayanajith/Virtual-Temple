import React from "react";
import MainHeader from "../../components/MainHeader";
import { Grid } from "@mui/material";
import { UserManagementImpl } from "./UserManagementImpl";
import {
  getOnePermission,
  updatePermission,
} from "../../redux/permissionApiCalls";
import { useDispatch, useSelector } from "react-redux";

export const UserManagement = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const userId = window.location.pathname.split("/")[2];
  // React.useEffect(() => {
  //   const getPermissionsDataFromDB = async () => {
  //     const result = await getOnePermission(dispatch, token, userId);
  //     if (result) {
  //       console.log("get permission");
  //     } else {
  //       console.log("no permission");
  //     }
  //   };
  //   getPermissionsDataFromDB();
  // }, [dispatch, token, userId]);
  const result = getOnePermission(dispatch, token, userId);
  if (result) {
    console.log("get permission");
  } else {
    console.log("no permission");
  }
  return (
    <React.Fragment>
      <MainHeader value={0} />
      <Grid container spacing={2} sx={{ pt: "100px", px: 5 }}>
        <Grid item xs={12}>
          <UserManagementImpl />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

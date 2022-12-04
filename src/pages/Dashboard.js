import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import "./common.css";
import MainHeader from "../components/MainHeader";
import { DashboardImpl } from "./DashboardImpl";
import { addPermission, getOnePermission } from "../redux/permissionApiCalls";
import { useDispatch, useSelector } from "react-redux";

export const Dashboard = () => {
  
  const token = useSelector((state) => state.user.token);
  const permissionState = useSelector(
    (state) => state.permissionData.permissionsData
  );
  const dispatch = useDispatch();

  if(token === null){
    // navigate("/");
    window.location.href = "/";
  }
  const userId = useSelector((state) => state.user.currentUser.user_id);

  useEffect(() => {
    const getPermissionData = async () => {
      const result = await getOnePermission(dispatch, token, userId);
      if (result) {
        console.log(permissionState);
        if (permissionState === null) {
          const Permission = {
            user_id: userId,
            user_role_name: "",
            description: "",
          };
          const resultPermission = addPermission(Permission, token);
          if (resultPermission) {
            console.log("Set permission");
          } else {
            console.log("Cant set permission");
          }
        } else {
          console.log("get permission");
        }
      } else {
        console.log("no permission");
      }
    };
    getPermissionData();
  }, []);

  return (
    <React.Fragment>
      <MainHeader value={0} />
      <Grid container spacing={2} sx={{ pt: "100px", px: 5 }}>
        <Grid item xs={12}>
          <DashboardImpl />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

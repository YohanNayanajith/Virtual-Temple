import React from "react";
import { Grid } from "@mui/material";
import "./common.css";
import MainHeader from "../components/MainHeader";
import { DashboardImpl } from "./DashboardImpl";

export const Dashboard = () => {
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

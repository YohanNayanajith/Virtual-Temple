import React from 'react'
import { Grid } from "@mui/material";

import MainHeader from '../components/MainHeader'

export const Dashboard = () => {
  return (
    <React.Fragment>
      <MainHeader value={0} />
      <Grid container spacing={2} sx={{ pt: "100px", px: 5 }}>
        {/* <Grid item xs={12}>
          <DashboardTabs />
        </Grid> */}
        {/* <Grid item xs={2}>
          <Advertisement />
        </Grid> */}
      </Grid>
    </React.Fragment>
  )
}

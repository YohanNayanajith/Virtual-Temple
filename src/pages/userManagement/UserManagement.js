import React from 'react'
import MainHeader from '../../components/MainHeader'
import { Grid } from "@mui/material";
import { UserManagementImpl } from './UserManagementImpl';

export const UserManagement = () => {
  return (
    <React.Fragment>
      <MainHeader value={0} />
      <Grid container spacing={2} sx={{ pt: "100px", px: 5 }}>
        <Grid item xs={12}>
          <UserManagementImpl />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

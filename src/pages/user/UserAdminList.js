import React from 'react'
import MainHeader from '../../components/MainHeader'
import { Grid } from "@mui/material";
import { UserAdminListImpl } from './UserAdminListImpl';

export const UserAdminList = () => {
  return (
    <React.Fragment>
      <MainHeader value={0} />
      <Grid container spacing={2} sx={{ pt: "100px", px: 5 }}>
        <Grid item xs={12}>
          <UserAdminListImpl />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

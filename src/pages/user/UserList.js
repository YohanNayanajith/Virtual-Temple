import React from 'react'
import { Grid } from "@mui/material";
import MainHeader from '../../components/MainHeader';
import { UserListImpl } from './UserListImpl';

export const UserList = () => {
  return (
    <React.Fragment>
      <MainHeader value={0} />
      <Grid container spacing={2} sx={{ pt: "100px", px: 5 }}>
        <Grid item xs={12}>
          <UserListImpl />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}


import React from 'react'
import MainHeader from '../../components/MainHeader'
import { Grid } from "@mui/material";
import { EventCreateImpl } from './EventCreateImpl';

export const EventCreate = () => {
  return (
    <React.Fragment>
      <MainHeader value={0} />
      <Grid container spacing={2} sx={{ pt: "100px", px: 5 }}>
        <Grid item xs={12}>
          <EventCreateImpl />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

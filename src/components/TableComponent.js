import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import PropTypes from "prop-types";

const CustomToolbar = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarFilterButton ref={setFilterButtonEl} />
  </GridToolbarContainer>
);

CustomToolbar.propTypes = {
  setFilterButtonEl: PropTypes.func.isRequired,
};

export const TableComponent = ({ rows, columns }) => {
  const [filterButtonEl, setFilterButtonEl] = React.useState(null);
  return (
    <DataGrid
      disableSelectionOnClick
      checkboxSelection
      autoHeight
      // components={{
      //   Toolbar: CustomToolbar,
      // }}
      getRowId={(rows) => rows.id}
      pageSize={7}
      componentsProps={{
        panel: {
          anchorEl: filterButtonEl,
        },
        toolbar: {
          setFilterButtonEl,
        },
      }}
      rows={rows}
      columns={columns}
    />
  );
};

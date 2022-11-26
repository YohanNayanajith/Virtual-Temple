import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import PropTypes from "prop-types";
import { Box, Button, Chip, Grid } from "@mui/material";

const CustomToolbar = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarFilterButton ref={setFilterButtonEl} />
  </GridToolbarContainer>
);

CustomToolbar.propTypes = {
  setFilterButtonEl: PropTypes.func.isRequired,
};

export const UserListImpl = () => {
  //     const user = useSelector((state) => state.user.currentUser);
  //   const orderIsAccept = useSelector((state) =>
  //     state.order.orders.filter(
  //       (x) => (x.status == "Accept" || x.status == "Completed") && x.isAccept && x.userId == user.id
  //     )
  //   );

  //   const token = useSelector((state) => state.user.token);
  //   const otherUsers = useSelector((state) => state.user.otherUsers);
  //   const [deleteTrigger, setDeleteTrigger] = React.useState("");
  //   const [rows, setRows] = React.useState([]);

  //   const dispatch = useDispatch();

  //   React.useEffect(() => {
  //     const getOrderData = async () => {
  //       let rowData = [];
  //       orderIsAccept.map((item) => {
  //         rowData.push({
  //           id: item.id,
  //           //   status: item.status,
  //           col1: item.productName,
  //           col2: item.productCategory,
  //           col3: item.quantity,
  //           col4: item.totalPrice,
  //           col5: item.expireDate,
  //           col6: item.sellerName,
  //           col7: item.sellerContact,
  //           col8: item.status,
  //         });
  //       });
  //       setRows(rowData);
  //     };
  //     getOrderData();
  //   }, []);
  const [filterButtonEl, setFilterButtonEl] = React.useState(null);
  const rows = [
    {
      id: 1,
      col1: "Mango",
      col2: "Category 1",
      col3: 152,
      col4: 1000,
    },
    {
      id: 2,
      col1: "Mango",
      col2: "Category 1",
      col3: 152,
      col4: 1000,
    },
    {
      id: 3,
      col1: "Mango",
      col2: "Category 1",
      col3: 152,
      col4: 1000,
    },
  ];

  const columns = [
    { field: "col1", headerName: "Product", width: 180 },
    { field: "col2", headerName: "Category", width: 180 },
    { field: "col3", headerName: "Total Amount(kg)", width: 180 },
    { field: "col4", headerName: "Total Cost(Rs)", width: 180 },
    // {
    //   field: "col8",
    //   headerName: "Status",
    //   width: 180,
    //   renderCell: (params) => {
    //     return (
    //       <React.Fragment>
    //         {params.row.col8 === "Accept" && (
    //           <Chip label="Completed" color="error" variant="outlined" />
    //         )}
    //       </React.Fragment>
    //     );
    //   },
    // },
  ];
  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        bgcolor: "#FFF",
      }}
    >
      <DataGrid
        // disableSelectionOnClick
        // components={{
        //   Toolbar: CustomToolbar,
        // }}
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
    </Box>
  );
};

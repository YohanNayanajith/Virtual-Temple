import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import PropTypes from "prop-types";
import { Box, Button, Chip, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/userApiCalls";

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
  const otherUsers = useSelector((state) => state.user.otherUsers.data);
  //   const [deleteTrigger, setDeleteTrigger] = React.useState("");
  const [rows, setRows] = React.useState([]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    const getDataFromDB = async () => {
      const result = await getUsers(dispatch);
      if (result) {
        console.log("Get user data success");
      } else {
        console.log("Get user data unsuccess");
      }
    };
    getDataFromDB();
  }, []);

  React.useEffect(() => {
    const getNormalUserData = async () => {
      let rowData = [];
      otherUsers.map((item) => {
        if (item.status) {
          rowData.push({
            id: item.user_id,
            col1: item.first_name,
            col2: item.last_name,
            col3: item.district,
            col4: item.user_img,
            col5: item.town,
            col6: item.address,
            col7: item.contact,
            col8: item.email,
          });
        }
      });
      setRows(rowData);
    };
    getNormalUserData();
  }, []);
  const [filterButtonEl, setFilterButtonEl] = React.useState(null);
  // const rows = [
  //   {
  //     id: 1,
  //     col1: "Mango",
  //     col2: "Category 1",
  //     col3: 152,
  //     col4: 1000,
  //   },
  //   {
  //     id: 2,
  //     col1: "Mango",
  //     col2: "Category 1",
  //     col3: 152,
  //     col4: 1000,
  //   },
  //   {
  //     id: 3,
  //     col1: "Mango",
  //     col2: "Category 1",
  //     col3: 152,
  //     col4: 1000,
  //   },
  // ];

  const deleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#378cbb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        alert(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const columns = [
    {
      field: "col1",
      headerName: "First Name",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.col4} alt="" />
            {params.row.col1 + params.row.col2}
          </div>
        );
      },
    },
    { field: "col8", headerName: "Email", width: 180 },
    { field: "col6", headerName: "Address", width: 180 },
    { field: "col7", headerName: "Contact", width: 180 },
    { field: "col5", headerName: "Town", width: 180 },
    { field: "col3", headerName: "District", width: 180 },
    { field: "col8", headerName: "Email", width: 180 },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            {/* params.row.isCancel */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton aria-label="edit" size="large" color="success">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" size="large" color="error">
                <DeleteIcon onClick={() => deleteItem(params.row.id)} />
              </IconButton>
            </Stack>
          </>
        );
      },
    },
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
      <Grid container xs={12} direction="row" justifyContent="space-between">
        <Grid item xs={6}></Grid>
        <Button
          variant="contained"
          href="/createUser"
          bgColor="secondary"
          endIcon={<AddIcon />}
        >
          Create
        </Button>
        {/* <Button variant="contained">Contained1</Button> */}
      </Grid>

      <div style={{ marginTop: "20px" }}>
        <DataGrid
          disableSelectionOnClick
          checkboxSelection
          autoHeight
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
      </div>
    </Box>
  );
};

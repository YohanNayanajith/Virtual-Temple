import React from "react";

import { Box, Button, Chip, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { TableComponent } from "../../components/TableComponent";
import { useNavigate } from "react-router";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { getAdminUsers } from "../../redux/userApiCalls";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const UserAdminListImpl = () => {
  const token = useSelector((state) => state.user.token);
  const adminUsers = useSelector((state) => state.user.adminUsers.data);
  //   const [deleteTrigger, setDeleteTrigger] = React.useState("");
  const [rows, setRows] = React.useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const getDataFromDB = async () => {
      const result = await getAdminUsers(dispatch, token);
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
      adminUsers.map(
        (item) => {
          // if (item.status) {
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
            col9: item.status,
          });
        }
        // }
      );
      setRows(rowData);
    };
    getNormalUserData();
  }, []);

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

  const updateItem = (id) => {
    console.log(id);
    navigate(`/updateAdminUser/${id}`);
  };
  const updatePermission = (id) => {
    console.log(id);
    navigate(`/userManagement/${id}`);
  };

  const changeItem = (id) => {
    console.log(id);
    //API call
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#378cbb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        alert(id);
        Swal.fire("Change!", "User activation changed.", "success");
      }
    });
  };

  const columns = [
    { field: "id", headerName: "Admin Id", width: 300 },
    {
      field: "col1",
      headerName: "Full Name",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.col4} alt="" />
            {params.row.col1 +" "+ params.row.col2}
          </div>
        );
      },
    },
    { field: "col8", headerName: "Email", width: 180 },
    { field: "col6", headerName: "Address", width: 180 },
    { field: "col7", headerName: "Contact", width: 180 },
    { field: "col5", headerName: "Town", width: 180 },
    { field: "col3", headerName: "District", width: 180 },
    {
      field: "col9",
      headerName: "User Status",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            {/* params.row.isCancel */}
            <Stack direction="row" alignItems="center" spacing={1}>
              {params.row.col9 ? (
                <IconButton
                  aria-label="edit"
                  size="large"
                  color="success"
                  onClick={() => changeItem(params.row.id)}
                >
                  <CheckIcon />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="delete"
                  size="large"
                  color="error"
                  onClick={() => changeItem(params.row.id)}
                >
                  <ClearIcon />
                </IconButton>
              )}
            </Stack>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {/* params.row.isCancel */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                aria-label="edit"
                size="large"
                color="success"
                onClick={() => updateItem(params.row.id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="edit"
                size="large"
                color="success"
                onClick={() => updatePermission(params.row.id)}
              >
                <AdminPanelSettingsIcon />
              </IconButton>
              {/* <IconButton aria-label="delete" size="large" color="error" onClick={() => deleteItem(params.row.id)}>
                <DeleteIcon />
              </IconButton> */}
            </Stack>
          </>
        );
      },
    },
  ];
  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        bgcolor: "#FFF",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <div>
          <h2>Admin Users</h2>
        </div>
        <div>
          <Button
            variant="contained"
            href="/createUser"
            // color="secondary"
            endIcon={<AddIcon />}
          >
            Create
          </Button>
        </div>

        {/* <Button variant="contained">Contained1</Button> */}
      </Grid>

      <div style={{ marginTop: "20px" }}>
        <TableComponent rows={rows} columns={columns} />
      </div>
    </Box>
  );
};

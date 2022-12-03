import React, { useState } from "react";

import { Box, Button, Chip, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { TableComponent } from "../../components/TableComponent";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { getEvent } from "../../redux/eventApiCalls";
import LinearProgress from "@mui/material/LinearProgress";
import { removeEvents } from "../../redux/eventRedux";

export const EventListImpl = () => {
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.user.token);
  const events = useSelector((state) => state.event.events);
  //   const [deleteTrigger, setDeleteTrigger] = React.useState("");
  const [rows, setRows] = React.useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const getDataFromDB = async () => {
      dispatch(removeEvents());
      const result = await getEvent(dispatch, token);
      if (result) {
        console.log("Get user data success");
        setLoading(false);
      } else {
        console.log("Get user data unsuccess");
      }
    };
    getDataFromDB();
  }, [loading]);

  React.useEffect(() => {
    const getNormalUserData = async () => {
      let rowData = [];
      events.map(
        (item) => {
          // if (item.status) {
          rowData.push({
            id: item.event_id,
            col1: item.event_name,
            col2: item.event_create_date,
            col3: item.description,
            col4: item.price,
            col5: item.user_id,
            col6: item.event_location,
            col7: item.event_date,
            col8: item.event_time,
            col9: item.status,
            col10: item.event_image,
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
    navigate(`/updateEvent/${id}`);
  };

  const wishBirthday = (data) => {
    console.log(data);
    window.location.href = `https://api.whatsapp.com/send/?phone=${data.col7}`;
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
    { field: "id", headerName: "Event Id", width: 300 },
    {
      field: "col1",
      headerName: "Event Name",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.col10} alt="" />
            {params.row.col1}
          </div>
        );
      },
    },
    { field: "col3", headerName: "Description", width: 180 },
    { field: "col6", headerName: "Location", width: 180 },
    { field: "col7", headerName: "Date", width: 180 },
    { field: "col8", headerName: "Time", width: 180 },
    {
      field: "col9",
      headerName: "Event Status",
      width: 150,
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
      {loading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <div>
              <h2>Events</h2>
            </div>
            <div>
              <Button
                variant="contained"
                href="/createEvent"
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
        </div>
      )}
    </Box>
  );
};

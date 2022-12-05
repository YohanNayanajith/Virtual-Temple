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
import { deletePost, getPost } from "../../redux/postApiCalls";
import LinearProgress from "@mui/material/LinearProgress";
import { removePosts } from "../../redux/postRedux";

export const PostListImpl = () => {
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState("s");
  const [deleteTrigger, setDeleteTrigger] = useState("s");
  const token = useSelector((state) => state.user.token);
  const posts = useSelector((state) => state.post.posts);
  const permissionsData = useSelector(
    (state) => state.permissionData.permissionsData
  );
  //   const [deleteTrigger, setDeleteTrigger] = React.useState("");
  const [rows, setRows] = React.useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const getDataFromDB = async () => {
      dispatch(removePosts());
      const result = await getPost(dispatch, token);
      if (result) {
        console.log("Get post data success");
        setTrigger(trigger + "s");
        setLoading(false);
      } else {
        console.log("Get post data unsuccess");
      }
    };
    getDataFromDB();
  }, [loading, deleteTrigger]);

  React.useEffect(() => {
    const getNormalUserData = async () => {
      let rowData = [];
      posts.map(
        (item) => {
          // if (item.status) {
          rowData.push({
            id: item.post_id,
            col1: item.first_name,
            col2: item.last_name,
            col3: item.description,
            col4: item.created_date,
            col5: item.user_id,
            col7: item.post_url,
          });
        }
        // }
      );
      setRows(rowData);
    };
    getNormalUserData();
  }, [trigger, dispatch, deleteTrigger]);

  const deleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#378cbb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const status = await deletePost(id, dispatch, token);
        if (status) {
          setDeleteTrigger(deleteTrigger + "z");
          Swal.fire("Deleted!", "Your post has been deleted.", "success");
        } else {
          Swal.fire(
            "Can't Delete!",
            "Your post has not been deleted.",
            "error"
          );
        }
      }
    });
  };

  const updateItem = (id) => {
    console.log(id);
    navigate(`/updatePost/${id}`);
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
    { field: "id", headerName: "Post Id", width: 300 },
    {
      field: "col1",
      headerName: "Publish Username",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* <img className="productListImg" src={params.row.col10} alt="" /> */}
            {params.row.col1 + " " + params.row.col2}
          </div>
        );
      },
    },
    { field: "col3", headerName: "Description", width: 180 },
    { field: "col4", headerName: "Create Date", width: 180 },
    { field: "col7", headerName: "Post URL", width: 180 },
    // {
    //   field: "col9",
    //   headerName: "Event Status",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         {/* params.row.isCancel */}
    //         <Stack direction="row" alignItems="center" spacing={1}>
    //           {params.row.col9 ? (
    //             <IconButton
    //               aria-label="edit"
    //               size="large"
    //               color="success"
    //               onClick={() => changeItem(params.row.id)}
    //             >
    //               <CheckIcon />
    //             </IconButton>
    //           ) : (
    //             <IconButton
    //               aria-label="delete"
    //               size="large"
    //               color="error"
    //               onClick={() => changeItem(params.row.id)}
    //             >
    //               <ClearIcon />
    //             </IconButton>
    //           )}
    //         </Stack>
    //       </>
    //     );
    //   },
    // },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {/* params.row.isCancel */}
            <Stack direction="row" alignItems="center" spacing={1}>
              {permissionsData.update_posts ? (
                <IconButton
                  aria-label="edit"
                  size="large"
                  color="success"
                  onClick={() => updateItem(params.row.id)}
                >
                  <EditIcon />
                </IconButton>
              ) : (
                <></>
              )}

              {permissionsData.delete_posts ? (
                <IconButton
                  aria-label="delete"
                  size="large"
                  color="error"
                  onClick={() => deleteItem(params.row.id)}
                >
                  <DeleteIcon />
                </IconButton>
              ) : (
                <></>
              )}
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
              <h2>Posts</h2>
            </div>
            <div>
              {permissionsData.create_posts ? (
                <Button
                  variant="contained"
                  href="/createPost"
                  // color="secondary"
                  endIcon={<AddIcon />}
                >
                  Create
                </Button>
              ) : (
                <></>
              )}
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

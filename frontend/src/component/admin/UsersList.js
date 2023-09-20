import React, { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
// import { errorMonitor } from 'nodemailer/lib/xoauth2';

const UsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, users } = useSelector((state) => state.allUsers);
  //   console.log(`Users:-${JSON.stringify(users)}`);
  const navigate = useNavigate();
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    // dispatch(deleteProduct(id));
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
    // dispatch(getAdminProduct());
  }, [dispatch, error, alert, deleteError, isDeleted, message]);

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      minWidth: 200,
      flex: 0.8,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      //   type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      //   type: "number",
      minWidth: 270,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "action",
      flex: 0.3,
      headerName: "Action",
      minWidth: 150,
      type: "number",
      sorted: false,
      renderCell: (params) => {
        return (
          <>
            <p
              onClick={() => {
                navigate(
                  `/admin/user/update/${params.getValue(params.id, "id")}`
                );
              }}
            >
              <EditIcon />
            </p>
            {/* <a href='/admin/user/update/${params.getValue(params.id, "id")}'>
             <EditIcon />
            </a> */}
            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((Item) => {
      rows.push({
        id: Item._id,
        role: Item.role,
        email: Item.email,
        name: Item.name,
      });
    });

  return (
    <>
      <MetaData title="ALL USERS - Admin"></MetaData>
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading"> ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default UsersList;

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
// import { clearErrors } from "../../actions/productAction";
import "./ProductList.css";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
// import { errorMonitor } from 'nodemailer/lib/xoauth2';

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, orders } = useSelector((state) => state.allOrders);
  const navigate = useNavigate();
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
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
      alert.success("Order deleted successfully..");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAllOrders());
  }, [dispatch, error, alert, deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 250, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
                navigate(`/admin/order/${params.getValue(params.id, "id")}`);
              }}
            >
              <EditIcon />
            </p>
            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
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

  orders &&
    orders.forEach((Item) => {
      rows.push({
        id: Item._id,
        itemsQty: Item.orderItems.length,
        amount: Item.totalPrice,
        status: Item.orderStatus,
      });
    });

  return (
    <>
      <MetaData title="ALL ORDERS - Admin"></MetaData>
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading"> ALL ORDERS</h1>

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

export default OrderList;

import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
// import { Typography } from '@material-ui/core'
import { Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
Chart.register(CategoryScale);

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  // console.log(`orders:-${JSON.stringify(orders)}`);
  // console.log(`Total orders:-${orders.length}`);

  let FinalPrice = 0;

  {
    orders &&
      orders.forEach((item) => {
        FinalPrice += item.totalPrice;
      });
  }

  let outOfStock = 0;
  let stockavailable = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      } else {
        stockavailable += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, FinalPrice],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#680084"],
        hoverBackgroundColor: ["#485000", "#35014F"],
        data: [outOfStock, stockavailable],
      },
    ],
  };
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboardContainer">
        <h1>Dashboard</h1>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> Rs.{FinalPrice.toFixed(2)}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <a href="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </a>
            <a href="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </a>
            <a href="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </a>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

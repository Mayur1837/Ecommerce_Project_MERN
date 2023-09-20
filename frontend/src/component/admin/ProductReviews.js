import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { DataGrid } from "@material-ui/data-grid";
import {
  clearErrors,
  getAllReviews,
  DeleteReviews,
} from "../../actions/productAction";
import "./ProductReviews.css";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import StarIcon from "@mui/icons-material/Star";
// import { errorMonitor } from 'nodemailer/lib/xoauth2';

const ProductReviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  console.log(`reviews:-${JSON.stringify(reviews)}`);

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    // dispatch(deleteProduct(id));
    dispatch(DeleteReviews(productId, reviewId));
  };

  const productsReviewsSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(getAllReviews(productId));
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
      alert.success("Review deleted successfully..");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, alert, deleteError, isDeleted, navigate]);

  const columns = [
    {
      field: "id",
      headerName: "REVIEW ID",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
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
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
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

  reviews &&
    reviews.forEach((Item) => {
      rows.push({
        id: Item._id,
        rating: Item.rating,
        comment: Item.comment,
        user: Item.name,
      });
    });

  return (
    <>
      <MetaData title="ALL REVIEWS - Admin"></MetaData>
      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productsReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
            <div>
              <StarIcon />
              <input
                type="text"
                placeholder="ProductId"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productNoReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;

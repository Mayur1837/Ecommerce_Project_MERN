import React from "react";
import ProfilPng from "../../images/Profile.png";
import Reactstars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };

  // console.log(`review:- ${JSON.stringify(review)}`);
  // console.log(review.comment);

  // const options = {
  //   value: review.rating,
  //   readOnly: true,
  //   precision: 0.5,
  // };
  return (
    <div className="reviewCard">
      <img src={ProfilPng} alt="User" />
      <p>{review.name}</p>
      <Reactstars {...options}></Reactstars>
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;

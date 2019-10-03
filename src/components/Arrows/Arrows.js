import React from "react";

export const RightArrow = props => {
  return (
    <div
      className="nextArrow"
      onClick={props.goToNextSlide}
      data-direction="next"
    >
      <i className="fa fa-arrow-right fa-2x" aria-hidden="true"></i>
    </div>
  );
};

export const LeftArrow = props => {
  return (
    <div
      className="backArrow"
      onClick={props.goToPrevSlide}
      data-direction="prev"
    >
      <i className="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
    </div>
  );
};

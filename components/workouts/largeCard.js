import React, { Fragment } from "react";
import Link from "next/link";

export const LargeCard = (props) => {
  const { exercise } = props;
  const height = "550px";
  return (
    <Fragment>
      <div className="large-card-container">
        <img
          key={exercise.unid}
          top={true}
          className="large-card__img"
          src={`${exercise.image[0].url}`}
        />
      </div>
      <style jsx>
        {`
          .large-card-container {
            max-height: ${height};
            overflow: hidden;
          }
          .large-card__img {
            width: 100%;
            left: 0;
            top: 0;
            z-index: -1;
          }
        `}
      </style>
    </Fragment>
  );
};

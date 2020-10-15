import React, { Fragment } from "react";
import Link from "next/link";
import { Video } from "./video";
export const LargeCard = (props) => {
  const { exercise } = props;
  let extention = null;
  if (exercise.video != null) {
    extention = exercise.video.url.split(".")[
      exercise.video.url.split(".").length - 1
    ];
  }

  console.log("ex", extention);
  const height = "550px";
  return (
    <Fragment>
      {exercise.video === null && "Sorry there is no demo"}
      {extention === "gif" && (
        <div className="large-card-container">
          <img
            key={exercise.unid}
            top={true}
            className="large-card__img"
            src={`${exercise.video.url}`}
          />
        </div>
      )}
      {extention === "mp4" && (
        <div className="large-card-container">
          <Video src={exercise.video.url} />
        </div>
      )}

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
          @media (min-width: 992px) {
            border-radius: 5px;
          }
        `}
      </style>
    </Fragment>
  );
};

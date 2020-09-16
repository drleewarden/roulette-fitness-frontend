import React, { Fragment } from "react";
import { renderComponent } from "recompose";
export const Video = (props) => {
  const { path } = props;

  return (
    <Fragment>
      <video
        autoPlay
        muted
        loop
        className="full"
        controls="false"
        width="100%"
        height="auto"
        controls
      >
        <source src={path} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <style jsx>
        {`
          .full {
            width: 100%;
            border: none;
          }
        `}
      </style>
    </Fragment>
  );
};

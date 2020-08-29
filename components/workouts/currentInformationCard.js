import React, { Fragment } from "react";
import Link from "next/link";

export const CurrentInfoCard = (props) => {
  const { exercise } = props;
  return (
    <Fragment>
      <div
        style={{
          padding: "20px",
          border: "1px solid grey",
          float: "right",
        }}
      >
        <h3>Title: {exercise.title}</h3>
        <p>Description: {exercise.description}</p>
        <Link
          style={{
            margin: "auto",
          }}
          as={`/restaurants/${exercise.unid}`}
          href={`/restaurants?id=${exercise.unid}`}
        >
          <a className="btn btn-primary mx-auto w-100">View More</a>
        </Link>
      </div>
    </Fragment>
  );
};

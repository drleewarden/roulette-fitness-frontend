/* components/RestaurantList/index.js */
import React, { Fragment } from "react";

import gql from "graphql-tag";
import Link from "next/link";

import { graphql } from "react-apollo";
// import Title from "./restaurants"
import {
  Button,
  Card,
  CardBody,
  CardColumns,
  CardImg,
  CardSubtitle,
} from "reactstrap";
import { CardText, CardTitle, Col, Row } from "reactstrap";

export const Exercise = (props) => {
  const { exercise, active } = props;
  console.log("test", active);
  return (
    <Fragment>
      {!active && (
        <div className="card-wrapper h-100 col-6 col-md-6 col-lg-6">
          <Card style={{ margin: "0 0px 20px", border: 0 }} key={exercise.unid}>
            <div className="card-image-container">
              <CardImg
                top={true}
                style={{ maxHeight: 350 }}
                src={`${exercise.image[0].url}`}
              />
            </div>

            <CardBody style={{ border: "1px solid grey" }}>
              {/* <Title>dsfadfd</Title> */}
              <CardTitle>{exercise.title}</CardTitle>
              <Link
                style={{ margin: "auto" }}
                as={`/restaurants/${exercise.unid}`}
                href={`/restaurants?id=${exercise.unid}`}
              >
                <a className="btn btn-primary mx-auto w-100">View More</a>
              </Link>
            </CardBody>
          </Card>
        </div>
      )}

      <style jsx>
        {`
          .card-active {
            display: none;
          }
        `}
      </style>
    </Fragment>
  );
};

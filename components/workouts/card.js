/* components/RestaurantList/index.js */
import React, { Fragment } from "react";
import { TriangleRightIcon } from "@primer/octicons-react";
import gql from "graphql-tag";
import Link from "next/link";
import { CardButton, DisplayNone } from "./workout.style";

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
  const mediaQueryCheck = (x) => {
    if (x.matches) {
      // If media query matches

      return true;
    } else {
      return false;
    }
  };

  var x = window.matchMedia("(max-width: 997px)");

  mediaQueryCheck(x); // Call listener function at run time
  x.addListener(mediaQueryCheck); // Attach listener function on state changes
  console.log(mediaQueryCheck(x));
  const showDetails = () => {
    debugger;
    alert(exercise.description);
  };
  const desktopVersion = () => {
    return (
      <div className="card-wrapper h-100 col-6 col-md-6 col-lg-4">
        <DisplayNone>dsfadfd</DisplayNone>
        <Card
          style={{
            margin: "0 0px 20px",
            border: 0,
          }}
          key={exercise.unid}
        >
          <div className="card-image-container">
            <CardImg
              top={true}
              style={{ maxHeight: 350, borderRadius: "1rem" }}
              src={`${exercise.image[0].url}`}
            />
          </div>

          <CardBody
            style={{
              textAlign: "left",
              padding: "0.7rem 1.25rem",
              margin: "1rem 0",
              position: "absolute",
              bottom: "0",
              width: "100",
              background: "rgba(255, 255, 255, 0.7)",
            }}
          >
            <CardTitle>{exercise.title}</CardTitle>
            <Link
              style={{ margin: "auto" }}
              as={`/restaurants/${exercise.unid}`}
              href={`/restaurants?id=${exercise.unid}`}
            >
              <button
                className="blank-btn btn btn-danger mx-auto"
                onClick={() => showDetails()}
              >
                <a className="">
                  More Details <TriangleRightIcon size={15} />{" "}
                </a>
              </button>
            </Link>
          </CardBody>
        </Card>
      </div>
    );
  };
  const mobileVersion = () => {
    if (!active) {
      return (
        <div className="card-wrapper h-100 col-6 col-md-6 col-lg-6">
          <Card
            style={{
              margin: "0 0px 20px",
              border: 0,
            }}
            key={exercise.unid}
          >
            <div className="card-image-container">
              <CardImg
                top={true}
                style={{ maxHeight: 350, borderRadius: "1rem" }}
                src={`${exercise.image[0].url}`}
              />
            </div>

            <CardBody
              style={{
                textAlign: "left",
                padding: "0.7rem 1.25rem",
                margin: "1rem 0",
                position: "absolute",
                bottom: "0",
                width: "100",
                background: "rgba(255, 255, 255, 0.7)",
              }}
            >
              <CardTitle>{exercise.title}</CardTitle>
              <Link
                style={{ margin: "auto" }}
                as={`/restaurants/${exercise.unid}`}
                href={`/restaurants?id=${exercise.unid}`}
              >
                <CardButton
                  className="blank-btn btn btn-danger mx-auto"
                  onClick={() => showDetails()}
                >
                  <a className="">
                    More Details <TriangleRightIcon size={15} />{" "}
                  </a>
                </CardButton>
              </Link>
            </CardBody>
          </Card>
        </div>
      );
    }
  };

  return (
    <Fragment>
      {!mediaQueryCheck(x) && desktopVersion()}
      {mediaQueryCheck(x) && mobileVersion()}
      <style jsx>
        {`
          .card-wrapper .btn-primary {
            color: #fff;
            background-color: #ff6500 !important;
            border-color: none;
          }
          .card-wrapper {
            max-width: 400px;
          }
          .card-active {
            display: none;
          }
          .card-body {
            padding: 0.7rem 1.25rem;
            margin: 1rem 0;
            position: absolute;
            bottom: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.7);
          }
          .card-img-top {
            border-radious: 1rem;
          }
        `}
      </style>
    </Fragment>
  );
};

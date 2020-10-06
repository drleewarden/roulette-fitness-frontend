import React, { Fragment } from "react";
import { InfoCardStyle, Title1 } from "../LayoutStyles.style";

export const InfoCard = (props) => {
  return (
    <Fragment>
      <InfoCardStyle>
        <Title1>Get access to endless workouts on Roulette Fitness.</Title1>
        <p>
          Each unique workout is built on-demand from a collection of hundreds
          of challenging exercies. Test your fitness - can you reach fifty
          exercises in one session? Beat the clock now.
        </p>
      </InfoCardStyle>
    </Fragment>
  );
};

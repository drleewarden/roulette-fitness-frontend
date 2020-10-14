/* components/RestaurantList/index.js */
import React, { Fragment } from "react";
import { Jumbotron } from "reactstrap";
import { ThumbnailCard, TextTiny, CardH4 } from "./LayoutStyles.style";
export const Thumbnail = (props) => {
  return (
    <ThumbnailCard>
      <img width="100" src={props.img} />
      <CardH4>
        {props.title}
        <div>
          <span class="badge badge-warning">
            {props.type && <TextTiny>{props.type}</TextTiny>}
          </span>
          <span class="badge badge-secondary">
            {props.equipment && <TextTiny>{props.equipment}</TextTiny>}
          </span>
        </div>
      </CardH4>
    </ThumbnailCard>
  );
};

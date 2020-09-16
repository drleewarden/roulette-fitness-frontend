/* /pages/index.js */

import RestaurantList from "../components/RestaurantList";
import React, { Fragment } from "react";
import defaultPage from "../hocs/defaultPage";
import { Video } from "../components/workouts/video";
import {
  Alert,
  Button,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
} from "reactstrap";

// import '../assets/styles/app.scss'

class Index extends React.Component {
  constructor(props) {
    super(props);
    //query state will be passed to RestaurantList for the filter query
    this.state = {
      query: "",
    };
  }
  onChange(e) {
    //set the state = to the input typed in the search Input Component
    //this.state.query gets passed into RestaurantList to filter the results
    this.setState({ query: e.target.value.toLowerCase() });
  }
  render() {
    return (
      <div className="container-fluid">
        <Row>
          <div
            style={{ position: "absolute" }}
            className="search-container col"
          >
            <h1 className="title">Roulette Fitness</h1>
            <div className="search">
              <InputGroup>
                <InputGroupAddon addonType="append"> Search </InputGroupAddon>
                <Input onChange={this.onChange.bind(this)} />
              </InputGroup>
            </div>

            <RestaurantList search={this.state.query} />
          </div>
          <Video path="https://roulette-fitness.s3.ap-southeast-2.amazonaws.com/video_29a6fc3fd8.mp4" />
        </Row>
        <style jsx>
          {`
            h1.title {
              font-size: 4rem;
              font-family: "Montserrat", sans-serif;
            }
            .search-container {
              position: absolute !important;
            }
            .search {
              margin: 20px;
              width: 500px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default defaultPage(Index);

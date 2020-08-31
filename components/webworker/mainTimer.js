import React, { Component } from "react";
import * as workerTimers from "worker-timers";
import { Progress } from "reactstrap";

// import ReactCountdownClock from "react-countdown-clock";
// import worker from "./worker.js";
// import WebWorker from "./worker-setup";
// import registerServiceWorker from "./registerServiceWorker";

class MainTimer extends Component {
  constructor(props) {
    super(props);
    this.ms = 0;
    this.s = 0;
    this.m = 0;
    this.state = {
      count: 0,
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      rounds: 0,
      cluster: 0,
      percentage: 0,
    };
    this.init();
  }
  calculations(count) {
    if (this.state.seconds === 60) {
      this.setState({
        percentage: calculatePercent(this.state.minutes + 1, 60),
        minutes: this.state.minutes + 1,
      });
    }
    this.setState({
      milliseconds: Math.floor(count % 1000),
      seconds: (Math.floor(count / 10) % 60) + 1,
      percentage: this.calculatePercent((Math.floor(count / 10) % 60) + 1, 60),
    });

    if (this.state.minutes === 9) {
      this.setState({
        rounds: this.state.rounds + 1,
      });
    }
  }

  init() {
    const intervalId = workerTimers.setInterval(() => {
      // do something many times
      this.setState({
        count: this.state.count + 1,
      });
      this.calculations(this.state.count);
    }, 100);
  }

  calculatePercent(percent, num) {
    return (percent / 100) * num;
  }

  componentDidMount = () => {
    // this.worker = new WebWorker(worker);
  };

  render() {
    return (
      <div className="App-bottom">
        <section className="App-left">
          progress: {this.state.percentage}
          <Progress value={this.state.percentage} />
          <h2>
            seconds: {this.state.seconds}, minutes:
            {this.state.minutes}
          </h2>
          <p className="text-center">Total User Count: {this.state.count}</p>
          {/* <button className="btn-direct" onClick={this.fetchUsers}>
            Fetch Users Directly
          </button> */}
        </section>
      </div>
    );
  }
}

export default MainTimer;

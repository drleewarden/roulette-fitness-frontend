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
    this.intervalId = null;
    this.state = {
      count: 0,
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      rounds: 0,
      cluster: 0,
      percentage: 0,
      workout: false,
      rest: false,
      startBtn: true,
    };
    this.init();
  }

  rest(){
    this.reset()
    workerTimers.clearInterval(this.intervalId);
    debugger
    this.intervalId = workerTimers.setInterval(() => {
      // do something many times
      this.setState({
        count: this.state.count + 1,
      });
      if(this.state.rest){
        this.setState({
          percentage: this.calculatePercent(Math.floor(this.state.count / 10), 20),
        })
      } 
      if(this.state.count === 200){
        this.setState({
          workout: true,
          rest: false
        });
        this.rest();
        this.start();
      }
    }, 100);

    
  };
    
  reset(){
    this.setState({
      count: 0,
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
    });
  }

  calculations(count) {
    if (this.state.seconds === 10) {
      this.setState({
        workout: false,
        rest: true
      });
      this.reset()
      this.rest()
    }
    this.setState({
      milliseconds: Math.floor(count % 1000),
      seconds: (Math.floor(count / 10) % 60) + 1,
    });
    this.setState({
      percentage: this.calculatePercent(Math.floor(count / 10), 60),
    });

    if (this.state.minutes === 9) {
      this.setState({
        rounds: this.state.rounds + 1,
      });
    }
  }

  init() {}

  pause = () => {
    this.setState({
      startBtn: true,
    });
    workerTimers.clearInterval(this.intervalId);
  };

  start = () => {
    debugger;
    if (this.intervalId !== null ){
      workerTimers.clearInterval(this.intervalId);
    }

    this.intervalId = workerTimers.setInterval(() => {
      // do something many times
      this.setState({
        count: this.state.count + 1,
        startBtn: false,
        workout: true,
        rest: false
        
      });
      this.calculations(this.state.count);
    }, 100);
  };

  calculatePercent(percent, num) {
    return percent*100/num;
  }

  componentDidMount = () => {
    // this.worker = new WebWorker(worker);
  };

  render() {
    return (
      <div className="App-bottom">
        <section className="App-left">
          {this.state.startBtn && (
            <button onClick={() => this.start()}>start</button>
          )}
          {!this.state.startBtn && (
            <button onClick={() => this.pause()}>pause</button>
          )}
          
          progress: {this.state.percentage}
          {
            this.state.rest&&
            <Progress  color="danger" value={this.state.percentage} />
          }
          {
            this.state.workout&&
            <Progress value={this.state.percentage} />
          }          <h2>
            seconds: {this.state.seconds}, minutes:
            {this.state.minutes}
          </h2>
          <p className="text-center">Total User Count: {this.state.count}</p>
        </section>
      </div>
    );
  }
}

export default MainTimer;

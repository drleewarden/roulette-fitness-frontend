import React, { Component, Fragment } from "react";
import * as workerTimers from "worker-timers";
import {
  Progress,
  Jumbotron,
  Button,
  Collapse,
  Card,
  CardBody,
} from "reactstrap";
import { Exercise } from "../workouts/card";
import { LargeCard } from "../workouts/largeCard";
import { PlayIcon, XCircleIcon, triangleRight } from "@primer/octicons-react";
import { beep1, beep2 } from "../../assets/sounds/beep";
import { CardTitle } from "../workouts/workout.style";
import styles from "./timer.js";
import { Thumbnail } from "../thumbnail";

class MainTimer extends Component {
  constructor(props) {
    super(props);
    const { exercises } = props;
    this.randomList = exercises.exerciseList.sort(this.randomOrder);
    const firstCluster = this.randomList.slice(0, 3);
    // console.log(exercises);
    this.intervalId = null;
    this.buttonSize = null;
    this.state = {
      isOpen: false,
      count: 0,
      exerciseNumber: 0,
      exerciseClusterNumber: 0,
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      rounds: 0,
      cluster: 0,
      exercises: this.randomList,
      clusterArray: firstCluster,
      percentage: 0,
      workout: false,
      rest: false,
      startBtn: true,
      test: 0,
    };
    this.init(); //start
  }
  // rest period of 20 seconds
  rest() {
    this.beep();
    this.reset();
    workerTimers.clearInterval(this.intervalId);
    this.intervalId = workerTimers.setInterval(() => {
      // do something many times
      this.setState({
        count: this.state.count + 1,
      });
      if (this.state.rest) {
        this.setState({
          percentage: this.calculatePercent(
            Math.floor(this.state.count / 10),
            20
          ),
        });
      }
      if (this.state.count === 200) {
        this.setState({
          workout: true,
          rest: false,
        });
        this.rest();
        this.start();
      }
    }, 100);
  }
  // reset state of the timer
  reset() {
    this.setState({
      count: 0,
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
    });
  }

  calculations(count) {
    if (this.state.seconds === 45) {
      this.setState({
        workout: false,
        rest: true,
        exerciseClusterNumber: this.state.exerciseClusterNumber + 1,
        exerciseNumber: this.state.exerciseNumber + 1,
      });

      this.reset();
      this.rest();
    }

    if (this.state.exerciseClusterNumber === 3) {
      this.setState({
        exerciseClusterNumber: 0,
        rounds: this.state.rounds + 1,
      });
      this.progressionOfNewCluster();
    }

    this.setState({
      milliseconds: Math.floor(count % 1000),
      seconds: (Math.floor(count / 10) % 60) + 1,
    });

    this.setState({
      percentage: this.calculatePercent(Math.floor(count / 10), 45),
    });
  }
  // change button size
  checkWidowSize(x) {
    if (x.matches) {
      // If media query matches
      this.buttonSize = 65;
    } else {
      this.buttonSize = 100;
    }
  }

  init() {
    const screenWidth = window.matchMedia("(max-width: 678px)");
    this.checkWidowSize(screenWidth); // Call listener function at run time
    screenWidth.addListener(this.checkWidowSize); // Attach listener function on state changes
  }

  randomOrder(a, b) {
    return 0.5 - Math.random();
  }
  // pause interval
  pause = () => {
    this.setState({
      startBtn: true,
    });
    workerTimers.clearInterval(this.intervalId);
  };

  clusters(start, end) {
    this.setState({
      clusterArray: this.state.exercises.slice(start, end),
    });
  }

  progressionOfNewCluster() {
    if (this.state.rounds <= 2) {
      console.log("less the 3 was hit ");
      this.setState({ test: 1 });
      this.clusters(0, 3);
    }

    if (this.state.rounds > 2 && this.state.rounds <= 5) {
      console.log("more the 3 was hit ");
      this.setState({ test: 2 });
      this.clusters(3, 6);
    }

    if (this.state.rounds > 5 && this.state.rounds <= 8) {
      this.setState({ test: 3 });
      this.clusters(6, 9);
    }

    if (this.state.rounds > 8 && this.state.rounds <= 11) {
      this.setState({ test: 4 });
      this.clusters(9, 12);
    }
  }
  start = () => {
    //rest
    if (this.intervalId !== null) {
      workerTimers.clearInterval(this.intervalId);
    }
    // create clusters
    // cluster 1

    this.beepRest();
    this.intervalId = workerTimers.setInterval(() => {
      // do something many times
      this.setState({
        count: this.state.count + 1,
        startBtn: false,
        workout: true,
        rest: false,
      });
      this.calculations(this.state.count);
    }, 100);
  };
  beepRest() {
    const snd = beep2();
    snd.play();
  }
  beep() {
    const beep = beep1();
    beep.play();
  }
  activateExerciseImage() {
    if (this.state.exercises) {
      console.log("cluster array", this.state);
      if (
        this.state.clusterArray[this.state.exerciseClusterNumber] != undefined
      ) {
        return (
          <LargeCard
            exercise={this.state.clusterArray[this.state.exerciseClusterNumber]}
            key={this.state.clusterArray[this.state.exerciseClusterNumber].unid}
          />
        );
      }
    }
  }
  calculatePercent(percent, num) {
    return (percent * 100) / num;
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  clusterCards() {
    if (!this.state.clusterArray) {
      return;
    }
    return this.state.clusterArray.map((exercise, ind) => {
      console.log("current:", this.state.exerciseClusterNumber);

      return (
        <Exercise
          inde={ind}
          active={this.state.exerciseClusterNumber === ind ? true : false}
          exercise={exercise}
          key={exercise.unid}
        />
      );
    });
  }
  render() {
    console.log("xxx", this.randomList);
    return (
      <Fragment>
        <div className="App-calendar">
          <section className="App-timer">
            <CardTitle>
              {this.state.exercises[this.state.exerciseClusterNumber].title}
            </CardTitle>
          </section>
          <section>{this.activateExerciseImage()}</section>
          {this.state.workout && (
            <Progress
              className="progress-bar-wrapper"
              value={this.state.percentage}
            />
          )}{" "}
          {this.state.rest && (
            <Progress color="danger" value={this.state.percentage} />
          )}
          {this.state.startBtn && (
            <button className="blank-btn" onClick={() => this.start()}>
              <PlayIcon size={this.buttonSize} />
            </button>
          )}
          {!this.state.startBtn && (
            <button className="blank-btn" onClick={() => this.pause()}>
              <XCircleIcon size={this.buttonSize} />
            </button>
          )}
          <section className="mt-2">
            <div className={"cluster row containerX"}>
              {this.clusterCards()}
            </div>
            {/* <Stopwatch timer={this.state.seconds} exercises={this.exercises} /> */}
          </section>
          <h2>exercise: {this.state.exerciseNumber}</h2>
          <div>
            <Button
              color="secondary"
              onClick={this.toggle}
              style={{ marginBottom: "1rem" }}
            >
              {this.state.isOpen ? "Hide your" : "View your"} workout
            </Button>
          </div>
          <Collapse isOpen={this.state.isOpen}>
            <Jumbotron>
              <div className="Thumbnail__wrapper">
                {this.randomList.map((exercise) => {
                  return (
                    <Fragment>
                      {exercise.image.length > 0 && (
                        <Thumbnail
                          img={exercise.image[0].url}
                          title={exercise.title}
                          equipment={exercise.equipment}
                          type={exercise.type}
                        />
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </Jumbotron>
          </Collapse>
        </div>

        <style jsx>
          {`
            .progress-bar-wrapper {
              height: 500px;
            }

            .App-calendar {
              text-align: center;
              position: absolute;
              text-align: center;
              margin: 0 auto;
              width: 100%;
            }
            .App-timer {
              position: absolute;
              text-align: center;
              margin: 0 auto;
              width: 100%;
              background-color: rgba(255, 255, 255, 0.6);
            }
            .progress-bar {
              background-color: #ff5722;
            }
            .progress {
              border-radius: 0px;
            }

            .blank-btn {
              color: #2c2c2c;
              background: white;
              border-radius: 100px;
              border: 0;
              padding: 0;
              margin-top: -50px;
            }

            h1 {
              font-family: "EB Garamond", serif;
            }

            .w-33 {
              width: 33%;
              padding: 15px;
            }

            .floating-text {
              padding: 0;
              border: 0;
              position: relative;
              background: rgba(0, 0, 0, 0.5);
              display: flex;
              color: white;
            }
            .cluster {
              display: flex;
              justify-content: center;
              padding-top: 25px;
            }
            .big {
              font-size: 100px;
            }
            body {
              font-family: "EB Garamond", serif;
            }
            .timer.container {
              text-align: center;
            }
            .notActive {
              color: red;
            }

            .activity {
              color: green;
            }
            @media (min-width: 992px) {
              .Thumbnail__wrapper {
                display: flex;
                flex-wrap: wrap;
              }
              .blank-btn {
                background: rgba(255, 255, 255, 0.5);
                position: absolute;
                top: 200px;
                left: auto;
                margin: 0 -50px;
              }
              .App-calendar {
                position: relative;
                text-align: center;
                margin: 0 auto;
                width: 80%;
              }
            }
            .card-body {
              padding: 0.7rem 1.25rem;
              margin: 1rem 0;
              position: absolute;
              bottom: 0;
              width: 100%;
              background: rgba(255, 255, 255, 0.7);
            }
          `}
        </style>
      </Fragment>
    );
  }
}

export default MainTimer;

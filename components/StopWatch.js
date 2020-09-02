import React, { Fragment, useContext } from "react";
import { store } from "../components/store";
import WorkoutList from "../components/workouts/";
import { LargeCard } from "../components/workouts/largeCard";
import { CurrentInfoCard } from "../components/workouts/currentInformationCard";
import { Exercise } from "../components/workouts/card";
const LocalState = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  // dispatch({type: 'ACTIVE_TIME', payload:'sdfdsdsfds'})
  console.log("shit", globalState);
  return "";
};
class Stopwatch extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      secondsElapsed: 0,
      oneMinTimer: 0,
      threeMinTimer: 0,
      exercises: this.props.exercises,
      timer: this.props.timer,
      cluster: [],
    };
    this.activityState = "activity";
    this.text = "work out time, lets do this";
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.activateExercise = this.activateExercise.bind(this);
    this.cluster = 0;
    this.exerciseCluster = [];
    this.activeExercise = {};

    // dispatch state to store
  }

  getSeconds() {
    return ("0" + (this.state.secondsElapsed % 60)).slice(-2);
  }
  getMinutes() {
    return Math.floor(this.state.secondsElapsed / 60);
  }
  times = (x) => (f) => {
    if (x > 0) {
      f();
      times(x - 1)(f);
    }
  };
  activateExerciseImage() {
    if (this.state.exercises) {
      this.activeExercise = this.state.exercises.slice(0, 1);
      let time = this.getMinutes();
      return (
        <LargeCard
          exercise={this.state.exercises[this.getMinutes()]}
          key={this.state.exercises[this.getMinutes()].unid}
        />
      );
    }
  }
  activateExercise() {
    console.log("console", this.state.exercises);
    if (this.state.exercises) {
      this.activeExercise = this.state.exercises.slice(0, 1);
      let time = this.getMinutes();
      return (
        <CurrentInfoCard
          exercise={this.state.exercises[this.getMinutes()]}
          key={this.state.exercises[this.getMinutes()].unid}
        />
      );
    }
  }
  start() {
    const that = this;

    this.incrementer = setInterval(function () {
      if (that.getSeconds() >= 40) {
        that.activityState = "notActive";
        that.text = "rest for 20 seconds";
      }

      if (that.getSeconds() < 40) {
        that.activityState = "activity";
        that.text = "work out time, lets do this";
      }

      // CLUSTER
      that.setState({ cluster: that.state.exercises.slice(1, 4) });
      that.setState({ oneMinTimer: that.getSeconds() });
      this.exerciseCluster = that.state.exercises.slice(1, 4);

      if (that.getMinutes() === 9) {
        that.cluster = that.state.secondsElapsed + 1;
        this.exerciseCluster = that.exercises.slice(3, 6);
        that.setState({ cluster: that.state.exercises.slice(3, 6) });
      }
      if (that.getMinutes() === 18) {
        that.cluster = that.state.secondsElapsed + 1;
      }
      if (that.getMinutes() === 27) {
        that.cluster = that.state.secondsElapsed + 1;
      }
      if (that.getMinutes() === 36) {
        that.cluster = that.state.secondsElapsed + 1;
      }

      that.setState({ secondsElapsed: that.state.secondsElapsed + 1 });
    }, 1000);
  }

  stop() {
    clearInterval(this.incrementer);
  }

  render() {
    console.log("cluster", this.state.cluster);
    return (
      <Fragment>
        <section className="timer">
          <LocalState />
    <h1>test: {this.state.timer}</h1>
          <div className="floating-text">
            <div className="w-33">
              <h1>
                {this.state.oneMinTimer}
                cluster: <em>{this.cluster}</em>
              </h1>
              <h2>{this.text}</h2>
              <button className="btn btn-success" onClick={this.start}>
                Start Workout
              </button>
              <button className="btn btn-danger" onClick={this.stop}>
                Stop Workout
              </button>
            </div>
            <div className="w-33">
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "10rem",
                }}
                className={this.activityState + " big"}
              >
                {this.getMinutes()}:{this.getSeconds()}
              </h1>
            </div>
            <div
              className="w-33"
              style={{
                clear: "both",
                display: "block",
              }}
            >
              {this.activateExercise()}
            </div>
          </div>
          {this.activateExerciseImage()}
        </section>
        <div className="cluster container">
          {this.state.cluster.map((exercise) => {
            return <Exercise exercise={exercise} key={exercise.unid} />;
          })}
        </div>
        {this.state.cluster.length === 0 && (
          <WorkoutList timer={this.getMinutes()} />
        )}

        <style jsx>
          {`
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
          `}
        </style>
      </Fragment>
    );
  }
}
export default Stopwatch;

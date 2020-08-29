import React, { useState, Fragment } from "react";
import { renderComponent } from "recompose";
// import "stopwatchthread";
class WebWorkerTimer extends React.Component {
  // index.html\
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      milSec: 0,
      sec: 0,
      min: 0,
    };
    this.m = 0;
    this.s = 0;
    this.ms = 0;
    // this.worker = new Worker("web-worker.js");
    this.rAFCallback = this.rAFCallback.bind(this);
    this.ToggleStartStop = this.ToggleStartStop.bind(this);
    this.onPageLoaded = this.onPageLoaded.bind(this);
    this.count = 0;
    this.rAF_ID;
    this.pause = false;
    // webworker
    this.g_workerThread = new Worker("stopwatchthread.js");
    this.g_threadStarted = false;
  }
  componentDidMount() {
    this.onPageLoaded();
  }
  startClock = () => {
    this.rAF_ID = requestAnimationFrame(this.rAFCallback);
  };
  pause = () => {
    this.pause = true;
  };
  ToggleStartStop = () => {
    var button = document.getElementById("StartStopButton");
    debugger;
    this.g_threadStarted = !this.g_threadStarted;
    if (this.g_threadStarted) {
      this.g_workerThread.postMessage({
        msg: "start",
        yieldms: document.getElementById("YieldMS").value,
      });
      button.innerHTML = "Stop";
    } else {
      this.g_workerThread.postMessage({ msg: "stop" });
      button.innerHTML = "Start";
    }
  };
  onPageLoaded = () => {
    //if web workers are supported, set them up
    if (typeof Worker !== "undefined") {
      //create the worker thread
      debugger;

      //handle messages from worker thread
      this.g_workerThread.onmessage = function (event) {
        debugger;
        if (event.data.time0 != null) {
          var time2 = new Date().getTime();
          var time1 = event.data.time1;
          var time0 = event.data.time0;
          debugger;
        } else {
          debugger;
          console.log("else", event.data);
        }
      };

      //handle errors from worker thread
      this.g_workerThread.onerror = function (e) {
        alert(
          "Error in thread: Line " +
            e.lineno +
            " in " +
            e.filename +
            ": " +
            e.message
        );
      };

      //post a reset message to start things off
      this.g_workerThread.postMessage("reset");
    } else {
      alert(
        "Your browser doesn't support web workers.  You might try chrome (recomended) or firefox instead."
      );
    }
  };

  ResetTimer = () => {
    g_workerThread.postMessage({ msg: "reset" });
  };

  render() {
    return (
      <>
        <button id="StartStopButton" onClick={this.ToggleStartStop}>
          start
        </button>
        <div id="YieldMS"></div>
        <p id="timer">
          <h2>
            {this.m}:{this.s}:{this.ms}
          </h2>
        </p>

        <button onClick={this.startClock}>start</button>
        <button onClick={this.pause}>pause</button>

        <p id="message">Your message here</p>
      </>
    );
  }

  /* ---- */

  // script.js

  rAFCallback = (callback) => {
    if (this.pause) {
      debugger;
      return;
    } else {
      let count = callback;
      this.setState({ min: Math.floor(count / 60000) % 60 });

      this.ms = Math.floor(count % 1000);
      this.s = Math.floor(count / 1000) % 60;
      this.m = Math.floor(count / 60000) % 60;
      // console.log(this.ms, this.s, this.m);

      this.setState({ min: this.m });
      console.log(this.state);
      if (this.state.m === 1) {
        this.setState({ sec: this.s });
        this.setState({ min: 0 });
      }
      //   $("#timer").text(m + ":" + s + ":" + ms);
      this.rAF_ID = requestAnimationFrame(this.rAFCallback);
    }
  };

  // request animation frame on render

  hangTheBrowser() {
    this.worker.postMessage("hang the browser");
  }

  /* ---- */

  // worker.js
}
export default WebWorkerTimer;

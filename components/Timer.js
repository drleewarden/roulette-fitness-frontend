import React, { useState, Fragment } from "react";

export default function Timer(props) {
  const {
    workoutType,
  } = props


const [time, setTime] = useState(0);

 let test;
  function getSeconds() {
    return ('0' + time  % 60).slice(-2)
  }
  function getMinutes () {
    return Math.floor(time / 60)
  }
  const start =()=> {
   
    test = setInterval(function() {
      setTime(time + 1)
      console.log(time)
    },1000)

  }
  function stop() {
    clearInterval()
  }
  function Time(){
    return <div>
      <h1>{getMinutes()}:{getSeconds()}</h1>
      </div>
  }

  return (
    <Fragment>
      <h1>start timer</h1>
      <button onClick={start}>Start Workout</button>
      <button onClick={stop}>Stop Workout</button>
      <Time/>
    </Fragment>
    
  )
}
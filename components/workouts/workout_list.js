/* components/RestaurantList/index.js */
import React, {
  useContext,
  Fragment,
  useEffect,
  useState,
  createContext,
} from "react";
import Stopwatch from "../StopWatch";
import MainTimer from "../webworker/mainTimer";

export const GetWorkout = (exerciseList) => {
  return (
    <Fragment>
      <MainTimer exercises={exerciseList} />
      {/* <Stopwatch exercises={exerciseList} /> */}
    </Fragment>
  );
};

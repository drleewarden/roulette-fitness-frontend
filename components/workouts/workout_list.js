/* components/RestaurantList/index.js */
import React, {useContext, Fragment, useEffect, useState, createContext} from "react";
import Stopwatch from "../StopWatch";

export const GetWorkout =(exerciseList)=>{
 
  return (
    <Fragment>
        <Stopwatch exercises={exerciseList} />
    </Fragment>
  )
}
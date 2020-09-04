import React, { useState, Fragment, useContext } from "react";
import { store } from "./store";
export default function TimeHandler(props) {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  dispatch({ type: "ACTIVE_TIME", payload: "sdfdsdsfds" });
  console.log("shit", globalState);
  return "";
  const { time, cluster, round } = props;
  return (
    <Fragment>
      <h1>Timer:{time}</h1>
      <h1>cluster:</h1>
      <h1>Round:</h1>
    </Fragment>
  );
}

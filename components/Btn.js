import React, { useState, Fragment } from "react";

export default function Btn() {
  const [buttonText, setButtonText] = useState(1);

  function handleClick() {
    return setButtonText(buttonText+1);
  }

  return <button onClick={handleClick}>ksdjfodsj {buttonText}</button>;
}
import React from "react";
import "./button.css";

const Button = (props) => {
  return (
    <button
      className="button"
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;

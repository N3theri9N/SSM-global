import React from "react";
import classes from "./SquareButton.module.css";

const SquareButton: React.FC<{
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  text: string,
}> = ({ onClick, text}) => {
  return <button className={classes.squareBtn} onClick={onClick}>{text}</button>
}

export default SquareButton;
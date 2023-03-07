import React from "react";
import classes from "./FilterButton.module.css";

const FilterButton: React.FC<{ standard: string; text: string; onClick: React.MouseEventHandler<HTMLButtonElement> }> = ({ standard, text, onClick: ClickHandler }) => {
  return (
    <button className={classes.filterBtn} onClick={ClickHandler}>
      {text}
    </button>
  );
};

export default FilterButton;

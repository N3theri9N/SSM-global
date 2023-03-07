import React from "react";
import classes from "./FilterButton.module.css";

const FilterButton: React.FC<{
  text: string;
  active: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ text, active, onClick: ClickHandler }) => {
  const classNameActive: string = active ? classes.active : "";
  return (
    <button className={`${classes.filterBtn} ${classNameActive}`} onClick={ClickHandler}>
      {text}
    </button>
  );
};

export default FilterButton;

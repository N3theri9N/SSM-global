import { MouseEventHandler } from "react";
import { IceAndFire } from "../types/IceandfireTypes";
import classes from "./IceandfireItem.module.css";

const IceandfireItem: React.FC<{ 
  item: IceAndFire; 
  delButtonClick: Function 
}> = ({ item, delButtonClick }) => {
  return (
    <div className={classes.item}>
      <div>이름 : {item.name}</div>
      <div>별칭 : {item.aliases.join(", ")}</div>
      <div>제목 : {item.titles}</div>
      <div>책 : {item.books}</div>
      <div>TV 시리즈 : {item.tvSeries}</div>
      <div>
        <button onClick={() => delButtonClick(item.index)}>삭제</button>
      </div>
    </div>
  );
};

export default IceandfireItem;

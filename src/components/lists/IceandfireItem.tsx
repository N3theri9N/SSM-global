import { IceAndFire } from "../types/IceandfireTypes";
import SquareButton from "../UI/SquareButton";
import classes from "./IceandfireItem.module.css";

const IceandfireItem: React.FC<{
  item: IceAndFire;
  delButtonClick: Function;
}> = ({ item, delButtonClick }) => {
  return (
    <div className={classes.item}>
      <div className={classes.info}>
        <div><b>이름</b> : <b>{item.name}</b></div>
        <div><b>별칭</b> : {item.aliases.join(", ")}</div>
        <div><b>제목</b> : {item.titles}</div>
        <div><b>책</b> : {item.books} , <b>TV 시리즈</b> : {item.tvSeries} </div>
      </div>
      <div className={classes.delSection}>
        <SquareButton onClick={() => delButtonClick(item.index)} text="삭제" />
      </div>
    </div>
  );
};

export default IceandfireItem;

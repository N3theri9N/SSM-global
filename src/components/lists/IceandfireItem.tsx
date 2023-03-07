import { IceAndFire } from "../types/IceandfireTypes";
import classes from "./IceandfireItem.module.css";

const IceandfireItem:React.FC<{item: IceAndFire}> = ({item}) => {
  return (
  <div className={classes.item}>
    <div>이름 : {item.name }</div>
    <div>별칭 : {item.aliases.join(", ")}</div>
    <div>제목 : {item.titles}</div>
    <div>책 : {item.books.filter((i) => i).length}</div>
    <div>TV 시리즈 : {item.tvSeries.filter((i) => i).length}</div>
  </div>)
} 

export default IceandfireItem;
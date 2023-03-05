import classes from "./Filter.module.css";

const Filter: React.FC = () => {
  return <div className={classes.filterSection}>
    <div className={classes.filterBtn}>생존인물만</div>
    <div className={classes.filterBtn}>여자</div>
    <div className={classes.filterBtn}>tvSeries 없음</div>
    <div className={classes.filterBtn}>초기화</div>
  </div>;
};

export default Filter;

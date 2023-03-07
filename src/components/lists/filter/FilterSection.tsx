import classes from "./FilterSection.module.css";
import FilterButton from "../../UI/FilterButton";

const FilterSection: React.FC = () => {

  // <div className={classes.filterBtn}>생존인물만</div>
  // <div className={classes.filterBtn}>여자</div>
  // <div className={classes.filterBtn}>tvSeries 없음</div>
  // <div className={classes.filterBtn}>초기화</div>
  const filterData = [
    {
      key: "female",
      text: "여자",
      clicked: false,
      onClick : () => {
        console.log("female");
      }
    },
    {
      key: "alive",
      text: "생존인물만",
      clicked: false,
      onClick : () => {
        console.log("female");
      }
    },    
    {
      key: "noTvseries",
      text: "tv시리즈 없음",
      clicked: false,
      onClick : () => {
        console.log("noTvseries");
      }
    },    
    {
      key: "reset",
      text: "초기화",
      onClick : () => {
        console.log("reset");
      }
    }
  ]
  return (
    <div className={classes.filterSection}>
      {filterData.map((item) => <FilterButton key={item.key} standard={item.key} onClick={item.onClick} text={item.text} /> )}
    </div>
  );
};

export default FilterSection;

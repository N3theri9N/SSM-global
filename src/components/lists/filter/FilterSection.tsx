import { Strainer, FilterDataType } from "../../types/IceandfireTypes";
import React, { useState } from "react";
import classes from "./FilterSection.module.css";
import FilterButton from "../../UI/FilterButton";

const initialFilterData: FilterDataType[] = [
  {
    text: "여자",
    active: false,
    value: { key: "gender", cond: "Female" },
  },
  {
    text: "생존인물만",
    active: false,
    value: { key: "died", cond: "" },
  },
  {
    text: "tv시리즈 없음",
    value: { key: "tvSeries", cond: 0 },
    active: false,
  },
];

// 초깃값을 참조하지 않고 값 그대로를 반영하기 위해 사용합니다.
const deepestCopy = (data : object[]) => {
  return JSON.parse(JSON.stringify(data));
}

const FilterSection: React.FC<{ 
  setStrainer: React.Dispatch<React.SetStateAction<Strainer[]>>,
  resetBlacklist: Function, 
}> = ({ setStrainer, resetBlacklist }) => {
  const [filterData, setFilterData] = useState<FilterDataType[]>(deepestCopy(initialFilterData));

  // 각 필터링 버튼토글 핸들러.
  const toggleFilterHandler = (idx: number) => {
    const newFilterData = [...filterData];
    newFilterData[idx].active = !filterData[idx].active;
    setFilterData(newFilterData);
    setStrainer(filterData.filter((i) => i.active).map((i) => i.value));
  };

  // 초기화 버튼 핸들러.
  const resetButtonHandler = () => {
    setFilterData(deepestCopy(initialFilterData));
    setStrainer([]);
    resetBlacklist();
  };

  return (
    <div className={classes.filterSection}>
      {filterData.map((item, idx) => (
        <FilterButton key={idx} onClick={() => toggleFilterHandler(idx)} text={item.text} active={item.active} />
      ))}
      <FilterButton onClick={resetButtonHandler} active={false} text="초기화" />
    </div>
  );
};

export default FilterSection;

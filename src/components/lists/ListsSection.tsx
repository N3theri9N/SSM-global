import { useState } from "react";
import useIceandfireApi from "../../hook/use-iceandfire-api";
import { useLocation } from "react-router-dom";
import IceandfireItem from "./IceandfireItem";
import FilterSection from "./filter/FilterSection";

import { Strainer } from "../types/IceandfireTypes";

const ListsSection: React.FC = () => {
  const location = useLocation();
  const searchParams: URLSearchParams = new URLSearchParams(location.search);
  const initialPage: number = parseInt(searchParams.get("page") || "1") || 1;

  const { series, isEndPage } = useIceandfireApi(initialPage);
  const [ strainer, setStrainer ] = useState<Strainer[]>([]);
  const [ blacklist, setBlacklist ] = useState<number[]>([]);

  // 다이나믹 필터링 함수입니다. 각 값마다 strainer ( 거름망 ) 에 들어간 
  // 모든 조건을 충족하는지 확인합니다.
  const dynamicFilterController = (item: any) => {
    for(const layer of strainer){
      const { key:key, cond:cond } = layer;
      if(item[key] != cond){
        return false;
      }
    }
    return true;
  }

  const addBlackListHandler = (index: number) => {
    const newBlacklist:number[] = new Array(...blacklist);
    newBlacklist.push(index);
    setBlacklist(newBlacklist);
  }

  console.log(series);

  const resetBlacklist = () => {
    setBlacklist([]);
  }

  return (
    <div>
      <FilterSection setStrainer={setStrainer} resetBlacklist={resetBlacklist} />
      {series.length > 0 &&
        series
          .filter(i => blacklist.includes(i.index) === false)
          .filter(dynamicFilterController)
          .map((value, index) => {
            return <IceandfireItem item={value} key={index} delButtonClick={addBlackListHandler} />;
          })}
    </div>
  );
};

export default ListsSection;

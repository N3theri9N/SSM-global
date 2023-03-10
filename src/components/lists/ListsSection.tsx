import { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import useIceandfireApi from "../../hook/use-iceandfire-api";

import IceandfireItem from "./IceandfireItem";
import FilterSection from "./filter/FilterSection";
import LoadingSection from "./loadingSection/LoadingSection";
import classes from "./ListsSection.module.css";

import { Strainer, IceAndFire } from "../types/IceandfireTypes";

const ListsSection: React.FC = () => {
  const location = useLocation();
  const searchParams: URLSearchParams = new URLSearchParams(location.search);
  const initialPage: number = parseInt(searchParams.get("page") || "1") || 1;

  const { series, isEndPage } = useIceandfireApi(initialPage);
  const [strainer, setStrainer] = useState<Strainer[]>([]);
  const [blacklist, setBlacklist] = useState<number[]>([]);

  const addBlackListHandler = useCallback((index: number):void => {
    const newBlacklist: number[] = new Array(...blacklist);
    newBlacklist.push(index);
    setBlacklist(newBlacklist);
  }, []);

  const resetBlacklist = useCallback(():void => {
    setBlacklist([]);
  }, []);

  // 다이나믹 필터링 함수입니다. 각 값마다 strainer ( 거름망 ) 에 들어간
  // 모든 조건을 충족하는지 확인합니다.
  const dynamicFilterController = (item: IceAndFire):boolean => {
    type ObjectKey = keyof typeof item;
    for (const layer of strainer) {
      const { key: key, cond: cond } = layer;
      const idxKey = key as ObjectKey;
      if ( !item[idxKey] || item[idxKey] != cond) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className={classes.listSection}>
      <FilterSection setStrainer={setStrainer} resetBlacklist={resetBlacklist} />
      {series.length > 0 &&
        series
          .filter((i) => blacklist.includes(i.index) === false)
          .filter(dynamicFilterController)
          .map((value, index) => {
            return <IceandfireItem item={value} key={index} delButtonClick={addBlackListHandler} />;
          })}
      <LoadingSection isEnd={isEndPage} />
    </div>
  );
};

export default ListsSection;

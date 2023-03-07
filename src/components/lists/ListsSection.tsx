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
  const [ strainer, setStrainer ] = useState<Strainer[]>([{key: "gender", cond:"Male"}])

  console.log(isEndPage);

  const dynamicFilterController = (item: any) => {
    for(const layer of strainer){
      const { key:key, cond:cond } = layer;
      if(item[key] != cond){
        return false;
      }
    }
    return true;
  }
    
//   data.filter( i => { for(cond of filterCond){
//     const key = Object.keys(cond)[0];
//     const tar = cond[key];
//     console.log(key, tar);
//     if(i[key] != tar ){
//         return false
//     }
// } return true;
//       });

  return (
    <div>
      <FilterSection />
      {series.length > 0 &&
        series
          // .filter(dynamicFilterController)
          .map((value, index) => {
            return <IceandfireItem item={value} key={index} />;
          })}
    </div>
  );
};

export default ListsSection;

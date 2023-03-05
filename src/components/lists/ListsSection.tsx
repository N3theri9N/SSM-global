import { useState, useEffect } from "react";
import classes from "./ListsSection.module.css";

type IceAndFire = {
  name: string;
  aliases: string[];
  titles: string[];
  books: string[];
  tvSeries: string[];
};

const ListsSection: React.FC = () => {
  const [series, setSeries] = useState<IceAndFire[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://www.anapioficeandfire.com/api/characters?page=1&pageSize=10");
      if (response.ok) {
        const data = await response.json();
        setSeries(data);
      } else {
        console.error("fetchError");
      }
    })();
  }, []);
  console.log(series)

  return (
    <div>
      {series.length > 0 &&
        series.map((value, index) => {
          return <div className={classes.item} key={index}>
            <div>{value.name}</div>
            <div>{value.aliases.join(", ")}</div>
            <div>{value.titles}</div>
            <div>책 : {value.books.length}</div>
            <div>TV 시리즈 : {value.tvSeries.length}</div>
          </div>;
        })}
    </div>
  );
};

export default ListsSection;

import { useState, useCallback, useEffect } from "react";
import { IceAndFire } from "../components/types/IceandfireTypes";

const useIceandfireApi = (
  initialPage: number = 1
): {
  isEndPage: boolean;
  series: IceAndFire[];
} => {
  const [page, setPage] = useState<number>(initialPage);
  const [series, setSeries] = useState<IceAndFire[]>([]);
  
  let isLoading: boolean = false;
  const isEndPage = page > 10;

  useEffect(() => {
    let target: HTMLElement | null;
    let observer: IntersectionObserver;

    const IOCallback = (entries: IntersectionObserverEntry[]) => {
      if(entries[0].isIntersecting) {
        setPage((prevPage) => { 
          sendGetRequest(page);
          return prevPage + 1;
        });
      }
    }

    if (document && !isEndPage && !isEndPage) {
      observer = new IntersectionObserver( IOCallback, { threshold: 0.5 });
      target = document.getElementById("Loading");
      target && observer.observe(target);
    } 
    return () => {
      target && observer.disconnect();
    };
  }, [document, isLoading, isEndPage]);

  const sendGetRequest = useCallback(async (queryPage = 1) => {
    isLoading = true;
    const response : void|Response = await fetch(`https://www.anapioficeandfire.com/api/characters?pageSize=10&page=${queryPage}`);
  
    if(!response.ok){
      console.error("something happened!");
      return;
    }

    const responseData = await response.json();
    const processedData = responseData.map((item: any) => {
      // 지원자 각주 : 이 구간은 응답 데이터를 각 컴포넌트에 사용하기 알맞게 가공합니다.
      // 1. 응답데이터에 key로 할당할 index 값이 없습니다. url 맨 뒤의 숫자를 index로 사용합니다.
      //  https://www.anapioficeandfire.com/api/characters/1
      // 2. books 와 tvSeries 는 length 로 변환합니다.

      const index = parseInt(item.url.split("/").slice(-1)[0]);
      return {
        ...item,
        index,
        books: item.books.filter((i: string) => i).length,
        tvSeries: item.tvSeries.filter((i: string) => i).length,
      };
    });
    setSeries((prevData) => [...prevData, ...processedData]);
    isLoading = false;
  }, []);

  return { isEndPage, series };
};

export default useIceandfireApi;

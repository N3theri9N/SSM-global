import { useState, useCallback, useEffect } from "react";
import { IceAndFire } from "../components/types/IceandfireTypes";

const useIceandfireApi = (
  initialPage: number = 1
): {
  isLoading: boolean;
  isEndPage: boolean;
  series: IceAndFire[];
  sendGetRequest: () => void;
} => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(initialPage);
  const [series, setSeries] = useState<IceAndFire[]>([]);
  const isEndPage = page > 10;

  useEffect(() => {
    
    let target: HTMLElement | null;
    let observer: IntersectionObserver;
    if (document && !isEndPage) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isLoading) {
            setPage((prevPage) => {
              sendGetRequest(page);
              return prevPage+1;
            });
          }
        },
        { threshold: 0.5 }
      );

      target = document.getElementById("Loading");
      target && observer.observe(target);
    }
    return () => {
      target && observer.disconnect();
    };
  }, [isLoading, isEndPage]);

  const sendGetRequest = useCallback(async (queryPage = 1) => {
    setIsLoading(true);
    const response = await fetch(`https://www.anapioficeandfire.com/api/characters?pageSize=10&page=${queryPage}`);
    const responseData = await response.json();
    const processedData = responseData.map((item:any) => {
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
    setSeries((prevData) =>
      [...prevData, ...processedData]
    );
    setIsLoading(false);
  }, []);

  return { isLoading, isEndPage, series, sendGetRequest };
};

export default useIceandfireApi;

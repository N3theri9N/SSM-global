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
  const isEndPage = page >= 10;

  useEffect(() => {
    let target: HTMLElement | null;
    let observer: IntersectionObserver;
    if (document && !isEndPage) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isLoading) {
            setPage((prevPage) => {
              sendGetRequest(prevPage);
              const newPage = Math.min(prevPage + 1, 10);
              return newPage;
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

  // 콜백함수를 실행하는가? 아니면 return 을 넣는가?
  // 콜백을 써야 좋겠다. isLoading 은 화면에 렌더링이 완료 된 후에 처리해야하는데,
  // 데이터 결과를 return 한다면 isLoading 을 바꾼후에 렌더링만 가능해질거같다.

  const sendGetRequest = useCallback(async (queryPage = 1) => {
    setIsLoading(true);
    const response = await fetch(`https://www.anapioficeandfire.com/api/characters?pageSize=10&page=${queryPage}`);
    const responseData = await response.json();
    const processedData = responseData.map((item:any) => {

      // 응답 데이터를 사용하기 알맞게 가공합니다. 
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

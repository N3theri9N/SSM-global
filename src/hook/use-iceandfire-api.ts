import { useState, useCallback, useEffect } from "react";
import { IceAndFire } from "../components/types/IceandfireTypes";

// type stateData = {
//   series: IceAndFire[];
//   isLoading: boolean;
// }

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

  const sendGetRequest = useCallback(async (queryPage = 1) => {
    setIsLoading(true);
    const response = await fetch(`https://www.anapioficeandfire.com/api/characters?page=${queryPage}&pageSize=10`);
    // if(response.ok === false){
    //   throw Error("");
    // }
    const responseData = await response.json();
    // 콜백함수를 실행하는가? 아니면 return 을 넣는가?
    // 콜백을 써야 좋겠다. isLoading 은 화면에 렌더링이 완료 된 후에 처리해야하는데,
    // 데이터 결과를 return 한다면 isLoading 을 바꾼후에 렌더링만 가능해질거같다.
    setSeries((prevData) => [...prevData, ...responseData]);
    setIsLoading(false);
  }, []);

  // sendGetRequest();
  return { isLoading, isEndPage, series, sendGetRequest };
};

export default useIceandfireApi;

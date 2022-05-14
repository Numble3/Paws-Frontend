import VideoList from "components/custom/video-list";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ICONS } from "lib/assets";
import { VideoListType, VideoParams } from "types/video";
import { useQuery, useInfiniteQuery } from "react-query";
import NoResult from "components/custom/no-result";

// type VideoProps = {
//   [key: number]: VideoListType[];
// };

interface Props {
  noResult: { title: string; content: string };
  videoCnt?: number;
  query?: any;
  fetchFunc: (params: any) => Promise<any>;
}

function InfiniteScroll({
  noResult = {
    title: "검색 결과 없음",
    content: "아직 등록된 동영상이 없어요",
  },
  query = { page: 1, size: 10 },
  fetchFunc,
}: Props) {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [datas, setDatas] = useState<VideoProps>({});

  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["video", query],
    () => fetchFunc(query),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.hasNext;
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  // const getMoreItem = () => {
  //   // infinite query 안되면 다시 쓰기...
  //   setIsLoaded(true);

  //   if (hasNextPage) {
  //     fetchNextPage();
  //   }

  //   setDatas((prev) => {
  //     const newData = { ...prev };
  //     const key = Object.keys(prev).length;
  //     newData[key] = dummy; //dummy or data.contents
  //     return newData;
  //   });

  //   setIsLoaded(false);
  // };

  const onIntersect = (
    [entry]: any,
    observer: { unobserve: (arg0: any) => void; observe: (arg0: any) => void }
  ) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      // getMoreItem();
      if (hasNextPage) {
        fetchNextPage();
      }
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <>
      {data?.pages[0].contents.length === 0 ? (
        <NoResult {...noResult} />
      ) : (
        <section style={{ display: "grid", gap: "20px" }}>
          {data?.pages &&
            data?.pages.map((videoList, i) => {
              return <VideoList key={i} datas={videoList.contents} />;
            })}
          <div ref={setTarget} id="loading">
            {isLoading && (
              <div>
                <Image src={ICONS.LOADING} width={25} height={25} />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default InfiniteScroll;

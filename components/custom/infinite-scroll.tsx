import VideoList from "components/custom/video-list";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ICONS } from "lib/assets";
import { VideoListType, VideoParams } from "types/video";
import { useQuery, useInfiniteQuery } from "react-query";
import NoResult from "components/search/noResult";

type VideoProps = {
  [key: number]: VideoListType[];
};

const dummy: VideoListType[] = [
  {
    createdAt: "2022-11-11 16-50-10",
    like: 0,
    nickname: "다희네 우당탕탕 3묘",
    thumbnailPath: "/images/temp.png",
    title: "발로 꼬리 밟아서 화난 고양이 장수",
    videoId: 1,
    view: 380,
  },
  {
    createdAt: "2022-11-11 16-50-10",
    like: 0,
    nickname: "다희네 우당탕탕 3묘",
    thumbnailPath: "/images/temp.png",
    title: "발로 꼬리 밟아서 화난 고양이 장수",
    videoId: 2,
    view: 380,
  },
  {
    createdAt: "2022-11-11 16-50-10",
    like: 0,
    nickname: "다희네 우당탕탕 3묘",
    thumbnailPath: "/images/temp.png",
    title: "발로 꼬리 밟아서 화난 고양이 장수",
    videoId: 3,
    view: 380,
  },
  {
    createdAt: "2022-11-11 16-50-10",
    like: 0,
    nickname: "다희네 우당탕탕 3묘",
    thumbnailPath: "/images/temp.png",
    title: "발로 꼬리 밟아서 화난 고양이 장수",
    videoId: 4,
    view: 380,
  },
  {
    createdAt: "2022-11-11 16-50-10",
    like: 0,
    nickname: "다희네 우당탕탕 3묘",
    thumbnailPath: "/images/temp.png",
    title: "발로 꼬리 밟아서 화난 고양이 장수",
    videoId: 5,
    view: 380,
  },
];

interface Props {
  videoCnt?: number;
  query?: VideoParams;
  fetchFunc: (params: VideoParams) => Promise<any>;
}

function InfiniteScroll({ query = { page: 1, size: 10 }, fetchFunc }: Props) {
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

  console.log(data?.pages[0].contents.length);
  return (
    <section style={{ display: "grid", gap: "20px" }}>
      {data?.pages &&
        (data?.pages[0].contents.length === 0 ? (
          <NoResult />
        ) : (
          data?.pages.map((videoList, i) => {
            return <VideoList key={i} datas={videoList.contents} />;
          })
        ))}
      <div ref={setTarget} id="loading">
        {isLoading && (
          <div>
            <Image src={ICONS.LOADING} width={25} height={25} />
          </div>
        )}
      </div>
    </section>
  );
}

export default InfiniteScroll;

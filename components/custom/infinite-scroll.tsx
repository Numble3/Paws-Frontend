import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ICONS } from "lib/assets";
import Video from "./video";
import { VideoListType, VideoListWithLikes } from "types/video";
import NoResult from "./no-result";

interface Props {
  noResult: { title: string; content: string };
  videoCnt?: number;
  query?: any;
  fetchFunc: <T>(params: any) => Promise<T>;
  selectedCategory: any;
}

function InfiniteScroll({
  noResult = {
    title: "검색 결과 없음",
    content: "아직 등록된 동영상이 없어요",
  },
  query = { page: 0, size: 10 },
  fetchFunc,
  selectedCategory,
}: Props) {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoListData, setVideoListData] = useState<any>([]);
  const [likeVideos, setLikeVideos] = useState<number[]>([]);

  let page = query.page;
  let hasNext = true;

  const getMoreItem = async () => {
    setIsLoaded(true);
    await fetchFunc<VideoListWithLikes>({ ...query, page }).then((res) => {
      hasNext = res.hasNext;
      setLikeVideos(res.likeVideoIds);

      setVideoListData((prev: VideoListType[]) => {
        const newData = prev.concat(res.contents);

        return newData;
      });
    });
    page++;
    setIsLoaded(false);
  };

  const onIntersect = async (
    [entry]: any,
    observer: { unobserve: (arg0: any) => void; observe: (arg0: any) => void }
  ) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      if (!hasNext) {
        return;
      }
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    setVideoListData([]);
    query = { ...query, sort: selectedCategory };
  }, [selectedCategory]);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, selectedCategory]);

  return (
    <section style={{ display: "grid", gap: "20px" }}>
      {videoListData && videoListData.length !== 0
        ? videoListData.map((value: VideoListType, index: any) => {
            return <Video key={index} data={value} likeVideos={likeVideos} />;
          })
        : !isLoaded && <NoResult {...noResult} />}
      <div ref={setTarget} id="loading">
        {isLoaded && (
          <div>
            <Image src={ICONS.LOADING} width={25} height={25} />
          </div>
        )}
      </div>
    </section>
  );
}

export default InfiniteScroll;

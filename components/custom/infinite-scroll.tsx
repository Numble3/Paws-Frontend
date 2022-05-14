import VideoList from "components/custom/video-list";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ICONS } from "lib/assets";
import { useInfiniteQuery } from "react-query";
import NoResult from "components/custom/no-result";

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
  query = { page: 0, size: 10 },
  fetchFunc,
}: Props) {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  const fetchList = async ({ query, page }) => {
    const newQuery = { ...query, page };
    const response = await fetchFunc(newQuery);
    return {
      contents: response.contents,
      query: { ...query, page: page + 1 },
      hasNext: response.hasNext,
      nextId: page + 1,
    };
  };

  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["video", query],
      ({ pageParam = { query, page: 0 } }) =>
        fetchList({
          query: pageParam.query,
          page: pageParam.page,
        }),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.hasNext) {
            return {
              query: query,
              page: lastPage.nextId,
            };
          } else {
            return undefined;
          }
        },
        refetchOnWindowFocus: false,
      }
    );

  const onIntersect = (
    [entry]: any,
    observer: { unobserve: (arg0: any) => void; observe: (arg0: any) => void }
  ) => {
    if (entry.isIntersecting && !isFetchingNextPage) {
      observer.unobserve(entry.target);
      fetchNextPage();
      console.log("here");

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
            {isFetchingNextPage && (
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

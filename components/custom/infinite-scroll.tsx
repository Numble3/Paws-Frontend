import VideoList from "components/custom/video-list";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ICONS } from "lib/assets";
type VideoProps = {
  [key: number]: number[]; // 추후 number[]을 video type[]으로 수정. + common.ts로 보내기
};

interface Props {
  videoCnt?: number;
}

function InfiniteScroll({ videoCnt = 10 }: Props) {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<VideoProps>({});

  const getMoreItem = async () => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setData((prev) => {
      const newData = { ...prev };
      const key = Object.keys(prev).length;
      const range = [...Array(videoCnt)].map((v, i) => key * 10 + i); // range를 데이터 배열로 바꾼다.
      newData[key] = range;
      return newData;
    });

    setIsLoaded(false);
  };

  const onIntersect = async (
    [entry]: any,
    observer: { unobserve: (arg0: any) => void; observe: (arg0: any) => void }
  ) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
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
    <section style={{ display: "grid", gap: "20px" }}>
      {Object.keys(data).map((key, i) => {
        // 추후 data[i]를 video List에 전달
        return <VideoList key={i} videoCnt={videoCnt} />;
      })}
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

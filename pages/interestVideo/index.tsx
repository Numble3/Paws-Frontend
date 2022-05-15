import React, { useState } from "react";
import { NextPageWithLayout } from "types/common";
import style from "styles/interest/interested.module.css";
import { categories } from "lib/variables";
import InterestBox from "components/custom/interest-box";
import { useQuery } from "react-query";
import { getAllLikeVideosAPI } from "apis/like";
import NoResult from "components/custom/no-result";
import { Loading } from "components/custom";

const TITLE = "관심 영상 없음";
const CONTENTS = `관심 영상이 없어요 :( 
  마음에 드는 영상을 저장해 보세요`;

const InterestVideo: NextPageWithLayout = () => {
  const [noResult, setNoResult] = useState(true);
  const { isLoading, data } = useQuery("likesAll", getAllLikeVideosAPI, {
    onSuccess: (data) => {
      Object.keys(data.likes).map((v) => {
        if (data.likes[v].getLikeVideoDtos.length !== 0) {
          setNoResult(false);
          return;
        }
      });
    },
  });

  console.log("likesAll : ", data);
  if (isLoading) return <Loading />;
  return noResult ? (
    <NoResult title={TITLE} content={CONTENTS} />
  ) : (
    <div className={style.wrapper}>
      {Object.keys(data.likes).map((v, i) => {
        return (
          <InterestBox
            key={i}
            datas={data.likes[v].getLikeVideoDtos}
            label={v}
          />
        );
      })}
    </div>
  );
};

InterestVideo.header = { title: "관심 영상" };
export default InterestVideo;

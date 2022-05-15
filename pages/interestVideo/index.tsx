import React from "react";
import { NextPageWithLayout } from "types/common";
import style from "styles/interest/interested.module.css";
import { categories } from "lib/variables";
import InterestBox from "components/custom/interest-box";
import { useQuery } from "react-query";
import NoResult from "components/custom/no-result";
import { QUERY_KEY } from "lib/query-key";

const TITLE = "관심 영상 없음";
const CONTENTS = `관심 영상이 없어요 :( 
  마음에 드는 영상을 저장해 보세요`;

const InterestVideo: NextPageWithLayout = () => {
  const { data } = useQuery(QUERY_KEY.likesAll.key, QUERY_KEY.likesAll.api);

  console.log("likesAll : ", data);
  const flag = true;
  return flag ? (
    <NoResult title={TITLE} content={CONTENTS} />
  ) : (
    <div className={style.wrapper}>
      {categories.map((v) => {
        if (v.value)
          return <InterestBox key={v.value} value={v.value} label={v.label} />;
      })}
    </div>
  );
};

InterestVideo.header = { title: "관심 영상" };
export default InterestVideo;

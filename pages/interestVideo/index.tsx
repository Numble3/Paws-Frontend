import React from "react";
import { NextPageWithLayout } from "types/common";
import style from "styles/interest/interested.module.css";
import { categories } from "lib/variables";
import InterestBox from "components/custom/interest-box";

const InterestVideo: NextPageWithLayout = () => {
  return (
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

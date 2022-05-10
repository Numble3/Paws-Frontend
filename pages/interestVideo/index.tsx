import React from "react";
import { NextPageWithLayout } from "types/common";
import style from "styles/interest/interested.module.css";
import Thumbnail from "components/search/thumbnail";
import { categories } from "lib/variables";
import Link from "next/link";

const InterestVideo: NextPageWithLayout = () => {
  return (
    <div className={style.wrapper}>
      {categories.map((v) => {
        if (v.value)
          return (
            <Link key={v.value} href={`interestVideo/${v.value}`}>
              <article  className={style.box}>
                <div className={style["img-container"]}>
                  <div className={style.img}>
                    <Thumbnail noInfo={true} />
                  </div>
                  <div className={style.img}>
                    <Thumbnail noInfo={true} />
                  </div>
                  <div className={style.img}>
                    <Thumbnail noInfo={true} />
                  </div>
                </div>
                <div className={style.title}>{v.label}</div>
                <div className={style.info}>
                  <span>동영상 38개</span>
                  <span className={style.space}>•</span>
                  <span>3일 전</span>
                </div>
              </article>
            </Link>
          );
      })}
    </div>
  );
};

InterestVideo.header = { title: "관심 영상" };
export default InterestVideo;

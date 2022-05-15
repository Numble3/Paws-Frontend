import React, { useState } from "react";
import { NextPageWithLayout } from "types/common";
import style from "styles/interest/interested.module.css";
import InterestBox from "components/custom/interest-box";
import { useQuery } from "react-query";
import NoResult from "components/custom/no-result";
import { Loading } from "components/custom";
import { QUERY_KEY } from "lib/query-key";
import Router from "next/router";
import { useDispatch } from "react-redux";
import modalSlice from 'reducers/modal';

const TITLE = "관심 영상 없음";
const CONTENTS = `관심 영상이 없어요 :( 
  마음에 드는 영상을 저장해 보세요`;

const InterestVideo: NextPageWithLayout = () => {
  const [noResult, setNoResult] = useState(true);
  const dispatch = useDispatch();
  const { isLoading, data } = useQuery(
    QUERY_KEY.likesAll.key,
    QUERY_KEY.likesAll.api,
    {
      retry:2,
      onSuccess: (data) => {
        Object.keys(data.likes).map((v) => {
          if (data.likes[v].getLikeVideoDtos.length !== 0) {
            setNoResult(false);
            return;
          }
        });
      },
      onError: () => {
        const email = sessionStorage.getItem("email");
        if (!email) {
          Router.replace("/");
          dispatch(modalSlice.actions.isError({ isError: true }));
          dispatch(modalSlice.actions.open({}));
          dispatch(modalSlice.actions.setErrorMessage({errorMessage: "로그인이 필요합니다."}));
          setTimeout(() => {
            dispatch(modalSlice.actions.close({}));
          }, 3000);
          
        }
      },
    }
  );

  console.log("likesAll : ", data);
  if (isLoading) return <Loading />;
  return noResult ? (
    <NoResult title={TITLE} content={CONTENTS} />
  ) : (
    <div className={style.wrapper}>
      {Object.keys(data.likes).map((v, i) => {
        return (
          data.likes[v].getLikeVideoDtos.length !== 0 && (
            <InterestBox
              key={i}
              datas={data.likes[v].getLikeVideoDtos}
              label={v}
            />
          )
        );
      })}
    </div>
  );
};

InterestVideo.header = { title: "관심 영상" };
export default InterestVideo;

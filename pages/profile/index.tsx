import { getUserInfoAPI } from "apis/auth";
import client from 'apis/client';
import { VideoList } from "components/custom";
import VideoEditBox from "components/custom/video-edit-box";
import useModal from "hooks/use-modal";
import { ICONS } from "lib/assets";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import style from "styles/profile.module.css";
import { NextPageWithLayout } from "types/common";
interface User{
  email: string;
  profile: string;
  nickanme: string;
}
const ProfilePage: NextPageWithLayout = () => {
  const [isOpen, onClose, setIsOpen] = useModal("edit");

  const { data: user } = useQuery("user", getUserInfoAPI, {
    retry: false,
    onError: () => {
      Router.replace("/login");
      console.error("에러발생");
    },
  });

   console.log("query data: ", user);
  
  const isError = true;

  // useEffect(() => {
  //   //user 정보가 없으면 로그인 페이지로 이동
  //   if (isError) {
  //     Router.replace("/login");
  //   }
  // }, []);


  const onEditHandler = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  }, []);
  
  return (
    <div className={style.wrapper}>
      <section className={style["profile-section"]}>
        {/* {user.profile ? (
          <Image src={user.profile} width={72} height={72} />
        ) : (
          <Image src={ICONS.PAW} width={72} height={72} />
        )} */}
        <Image src={ICONS.PAW} width={72} height={72} />
        {/* <div className={style.nickname}>{user.nickname}</div>
        <div className={style.email}>{user.email}</div> */}
          <div className={style.nickname}>test</div>
        <div className={style.email}>test</div>
        <Link href="profile/edit">
          <button className={style.button}>프로필 수정</button>
        </Link>
      </section>
      <section className={style["video-section"]}>
        <div className={style["title-container"]}>
          <span className={style.title}>업로드한 비디오</span>
          <span>
            <Link href={"profile/my-upload"}>
              <a>
                <Image src={ICONS.ARROW_RIGHT} width={12} height={12} />
              </a>
            </Link>
          </span>
        </div>
        <VideoList
          videoCnt={6}
          noInfo={true}
          noDot={false}
          onEdit={onEditHandler}
        />
      </section>
      {isOpen && <VideoEditBox onClose={onClose} />}
    </div>
  );
};

ProfilePage.header = { title: "마이 페이지" };
ProfilePage.back = { color: "gray" };


export default ProfilePage;

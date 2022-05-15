import { getUsaerDetailAPI, getUserVideosAPI } from "apis/accounts";
import { Loading, VideoList } from "components/custom";
import VideoEditBox from "components/custom/video-edit-box";
import useModal from "hooks/use-modal";
import { ICONS } from "lib/assets";
import { QUERY_KEY } from "lib/query-key";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import style from "styles/profile.module.css";
import { NextPageWithLayout } from "types/common";

const ProfilePage: NextPageWithLayout = () => {
  const [isOpen, onClose, setIsOpen] = useModal("edit");
  const [isLoading, setIsLoading] = useState(true);

  const { data } = useQuery(
    QUERY_KEY.userDetail.key,
    QUERY_KEY.userDetail.api,
    {
      retry: false,
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: () => {
        setTimeout(() => {
          Router.replace("/login");
        }, 1000);
        console.error("에러발생");
      },
    }
  );
  const { data: videoData } = useQuery("videos", getUserVideosAPI);
  console.log("videoData", videoData);

  const onEditHandler = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  }, []);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const user = data.accountDto;
  const videoList = data.videoDtos;
  console.log("user : ", user);
  console.log("videoList : ", videoList);

  return (
    <div className={style.wrapper}>
      <section className={style["profile-section"]}>
        {user.profile ? (
          <img src={user.profile} style={{ width: "72px", height: "72px" }} />
        ) : (
          <Image src={ICONS.PAW} width={72} height={72} />
        )}
        {/* <Image src={ICONS.PAW} width={72} height={72} /> */}
        <div className={style.nickname}>{user.nickname}</div>
        <div className={style.email}>{user.email}</div>
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
          datas={videoList}
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

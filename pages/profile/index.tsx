import { getUserInfoAPI } from 'apis/auth';
import { VideoList } from "components/custom";
import VideoEditBox from "components/custom/video-edit-box";
import useModal from "hooks/use-modal";
import { ICONS } from "lib/assets";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useQuery } from 'react-query';
import style from "styles/profile.module.css";
import { NextPageWithLayout } from "types/common";

const ProfilePage: NextPageWithLayout = () => {
  const [isOpen, onClose, setIsOpen] = useModal("edit");
  const userInfo = false;
  /* 벡엔드연동 시 user 정보를 받아옴 */

  

  useEffect(() => {
    //user 정보가 없으면 로그인 페이지로 이동
    if (!userInfo) {
      Router.replace("/login");
    }
  }, []);

  const onEditHandler = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  }, []);
  return (
    <div className={style.wrapper}>
      <section className={style["profile-section"]}>
        <Image src={ICONS.PAW} width={72} height={72} />
        <div className={style.nickname}>고양이가 세상을 구한다</div>
        <div className={style.email}>sampleEmail@naver.com</div>
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

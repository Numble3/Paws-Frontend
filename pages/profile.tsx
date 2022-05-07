import { ICONS } from 'lib/assets';
import Image from "next/image";
import Router from "next/router";
import { useEffect } from "react";
import style from "styles/profile.module.css";

const ProfilePage = () => {
  /* 벡엔드연동 시 user 정보를 받아옴 */
  const userInfo = true;

  useEffect(() => {
    //user 정보가 없으면 로그인 페이지로 이동
    if (!userInfo) {
      Router.replace("/login");
    }
  }, [userInfo]);

  return (
    <div className={style.wrapper}>
      <section className={style.profile_section}>
        <Image src={ICONS.PAW} width={72} height={72} />
        <div className={style.nickname}>고양이가 세상을 구한다</div>
        <div className={style.email}>sampleEmail@naver.com</div>
        <button className={style.button}>프로필 수정</button>
      </section>
      <section className={style.video_section}>
        <div className={style.title_container}>
          <span className={style.title}>업로드한 비디오</span>
          <span>
          <Image src={ICONS.ARROW_RIGHT} width={12} height={12} />
          </span>
        </div>
        <div className={style.video_container}>
            <div className={style.video}>video</div>
            <div className={style.video}>video</div>
            <div className={style.video}>video</div>
            <div className={style.video}>video</div>
            <div className={style.video}>video</div>
            <div className={style.video}>video</div>
          </div>
      </section>
    </div>
  );
};

ProfilePage.header = { title: "마이 페이지" };

export default ProfilePage;

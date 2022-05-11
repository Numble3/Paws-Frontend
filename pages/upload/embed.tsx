import styles from "styles/upload/embed.module.css";
import PreviewImage from "components/upload/previewImage";
import VideoCategory from "components/upload/videoCategory";
import VideoTitle from "components/upload/videoTitle";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { CautionIcon } from "components/icons";
import { ICONS } from "lib/assets";

const Embed = () => {
  const URL = "https://www.youtube.com/oembed?url=";
  const [canUpload, setCanUpload] = useState(false);
  const checkURL = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const res = await axios.get(URL + e.target.value);
      if (res.data) {
        setCanUpload(true);
      }
    } catch (e) {
      setCanUpload(false);
    }
  };
  return (
    <section className={styles.wrap}>
      <div className={styles.link}>
        <p className={styles.title}>영상 임베드 링크</p>
        {!canUpload && (
          <p className={styles.false_link}>올바르지 않은 링크 주소입니다.</p>
        )}
        <input
          className={`${styles.text_input} ${
            canUpload ? styles.text_input__success : styles.text_input__fail
          }`}
          placeholder="링크 주소를 입력해주세요"
          onChange={(e) => checkURL(e)}
        />
        <div className={styles.input_icon}>
          {canUpload ? (
            <Image src={ICONS.SUCCESS} width={20} height={20} />
          ) : (
            <CautionIcon width={20} height={20} fill="#e95733" />
          )}
        </div>
      </div>
      <div className="border-gray"></div>
      <PreviewImage />
      <div className="border-gray"></div>
      <VideoTitle />
      <div className="border-gray"></div>
      <div className={styles.description}>
        <p className={styles.title}>설명</p>
        <textarea placeholder="설명 내용을 입력해주세요" />
      </div>
      <div className="border-gray"></div>
      <VideoCategory />
    </section>
  );
};

export default Embed;
Embed.header = { title: "임베드 영상 업로드" };

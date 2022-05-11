import styles from "styles/upload/embed.module.css";
import PreviewImage from "components/upload/previewImage";
import VideoCategory from "components/upload/videoCategory";
import VideoTitle from "components/upload/videoTitle";
import { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";
import { CustomInput } from "components/custom";

const Embed = () => {
  const URL = "https://www.youtube.com/oembed?url=";
  const [canUpload, setCanUpload] = useState({
    isError: false,
    message: "올바르지 않은 링크 주소입니다.",
  });
  const [linkSuccess, setLinkSuccess] = useState(false);
  const [link, setLink] = useState("");
  const checkURL = async (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    try {
      const res = await axios.get(URL + e.target.value);
      if (res.data) {
        setCanUpload({ ...canUpload, isError: false });
        setLinkSuccess(true);
      }
    } catch (e) {
      setCanUpload({ ...canUpload, isError: true });
      setLinkSuccess(false);
    }
  };
  useEffect(() => {
    if (link === "") {
      setCanUpload({ ...canUpload, isError: false });
      setLinkSuccess(false);
    }
  }, [link]);
  return (
    <section className={styles.wrap}>
      <span className={styles.complete}>완료</span>
      <div className={styles.link}>
        <p className={styles.title}>영상 임베드 링크</p>
        <CustomInput
          isSuccess={linkSuccess}
          error={canUpload}
          inputType={"text"}
          placeHolderMessage={"링크 주소를 입력해주세요"}
          onChange={checkURL}
        />
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

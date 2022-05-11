import styles from "styles/upload/embed.module.css";
import PreviewImage from "components/upload/previewImage";
import VideoCategory from "components/upload/videoCategory";
import { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";
import { CustomInput } from "components/custom";

const Embed = () => {
  const URL = "https://www.youtube.com/oembed?url=";
  //link
  const [linkError, setLinkError] = useState({
    isError: false,
    message: "올바르지 않은 링크 주소입니다.",
  });
  const [linkSuccess, setLinkSuccess] = useState(false);
  const [link, setLink] = useState("");
  //title
  const [titleError, setTitleError] = useState({
    isError: false,
    message: "제목을 입력해주세요.",
  });
  const [title, setTitle] = useState("");
  const checkURL = async (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    try {
      const res = await axios.get(URL + e.target.value);
      if (res.data) {
        setLinkError({ ...linkError, isError: false });
        setLinkSuccess(true);
      }
    } catch (e) {
      setLinkError({ ...linkError, isError: true });
      setLinkSuccess(false);
    }
  };
  useEffect(() => {
    if (link === "") {
      setLinkError({ ...linkError, isError: false });
      setLinkSuccess(false);
    }
  }, [link]);
  const postEmbed = () => {
    //To do: post embed
  };
  return (
    <form className={styles.wrap}>
      <header className={styles.complete}>
        <span onClick={postEmbed}>완료</span>
      </header>
      <div>
        <p className={styles.title}>영상 임베드 링크</p>
        <CustomInput
          isSuccess={linkSuccess}
          error={linkError}
          inputType={"text"}
          placeHolderMessage={"링크 주소를 입력해주세요"}
          onChange={checkURL}
        />
      </div>
      <div className="border-gray"></div>
      <PreviewImage />
      <div className="border-gray"></div>
      <div className={styles.video_name}>
        <p className={styles.title}>영상 제목</p>
        <CustomInput
          error={titleError}
          inputType={"text"}
          placeHolderMessage={"영상 제목을 입력해주세요"}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="border-gray"></div>
      <div className={styles.description}>
        <p className={styles.title}>설명</p>
        <textarea placeholder="설명 내용을 입력해주세요" />
      </div>
      <div className="border-gray"></div>
      <VideoCategory />
    </form>
  );
};

export default Embed;
Embed.header = { title: "임베드 영상 업로드" };

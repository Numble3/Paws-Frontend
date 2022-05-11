import styles from "styles/upload/direct.module.css";
import PreviewImage from "components/upload/previewImage";
import PreviewVideo from "components/upload/previewVideo";
import VideoCategory from "components/upload/videoCategory";
import { CustomInput } from "components/custom";
import { useState } from "react";

const Direct = () => {
  //title
  const [titleError, setTitleError] = useState({
    isError: false,
    message: "제목을 입력해주세요.",
  });
  const postDirect = () => {
    //To do: post direct
  };
  const [title, setTitle] = useState("");
  return (
    <form className={styles.wrap}>
      <header className={styles.complete}>
        <span onClick={postDirect}>완료</span>
      </header>
      <PreviewVideo />
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
      <VideoCategory />
    </form>
  );
};

export default Direct;
Direct.header = { title: "직접 영상 업로드" };

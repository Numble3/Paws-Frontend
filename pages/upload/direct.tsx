import styles from "styles/upload/direct.module.css";
import PreviewImage from "components/upload/previewImage";
import PreviewVideo from "components/upload/previewVideo";
import VideoCategory from "components/upload/videoCategory";
import { CustomInput } from "components/custom";
import { useState } from "react";
import { NextPageWithLayout } from "types/common";

const Direct: NextPageWithLayout = () => {
  //title
  const [titleError, setTitleError] = useState({
    isError: false,
    message: "제목을 입력해주세요.",
  });
  const [selectedCategory, setSelectedCategory] = useState("");
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
      <VideoCategory
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </form>
  );
};

Direct.header = { title: "직접 영상 업로드" };
Direct.back = { color: "gray" };
export default Direct;

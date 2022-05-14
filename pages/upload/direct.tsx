import styles from "styles/upload/direct.module.css";
import PreviewImage from "components/upload/previewImage";
import PreviewVideo from "components/upload/previewVideo";
import VideoCategory from "components/upload/videoCategory";
import { CustomInput } from "components/custom";
import { useState } from "react";
import CustomTextArea from "components/custom/textarea";
import { NextPageWithLayout } from "types/common";

const Direct: NextPageWithLayout = () => {
  //title
  const [titleError, setTitleError] = useState({
    isError: false,
    message: "제목을 입력해주세요.",
  });
  //title
  const [titleInfo, setTitleInfo] = useState({
    titleError: { isError: false, message: "제목을 입력해주세요." },
    title: "",
  });
  //video
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoError, setVideoError] = useState(false);
  //image
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState(false);
  //category
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [descriptionInfo, setDescriptionInfo] = useState({
    descriptionError: { isError: false, message: "설명을 입력해주세요." },
    description: "",
  });

  const postDirect = () => {
    //To do: post direct
  };
  const [title, setTitle] = useState("");
  return (
    <form className={styles.wrap}>
      <header className={`${styles.complete} ${styles.complete__orange}`}>
        <span onClick={postDirect}>완료</span>
      </header>
      <PreviewVideo isError={videoError} setImageFile={setVideoFile} />
      <div className="border-gray"></div>
      <PreviewImage isError={imageError} setImageFile={setImageFile} />
      <div className="border-gray"></div>
      <div className={styles.video_name}>
        <p className={styles.title}>영상 제목</p>
        <CustomInput
          error={titleInfo.titleError}
          inputType={"text"}
          placeHolderMessage={"영상 제목을 입력해주세요"}
          onChange={(e) => {
            const newTitle = e.target.value;
            setTitleInfo({ ...titleInfo, title: newTitle });
          }}
        />
      </div>
      <div className="border-gray"></div>
      <div className={styles.description}>
        <p className={styles.title}>설명</p>
        <CustomTextArea
          height={120}
          error={descriptionInfo.descriptionError}
          maxLength={300}
          placeHolderMessage="설명 내용을 입력해주세요 (최대 300자)"
          onChange={(e) =>
            setDescriptionInfo((prev) => {
              return {
                ...prev,
                description: e.target.value,
              };
            })
          }
        />
      </div>
      <VideoCategory
        isError={categoryError}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </form>
  );
};

Direct.header = { title: "직접 영상 업로드" };
Direct.back = { color: "gray" };
export default Direct;

import styles from "styles/upload/direct.module.css";
import PreviewImage from "components/upload/previewImage";
import PreviewVideo from "components/upload/previewVideo";
import VideoCategory from "components/upload/videoCategory";
import { CustomInput, Loading } from "components/custom";
import { useState } from "react";
import CustomTextArea from "components/custom/textarea";
import { NextPageWithLayout } from "types/common";
import { useRouter } from "next/router";
import { createEmbedVideo, imageResize, videoTransform } from "apis/upload";

const Direct: NextPageWithLayout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //title
  const [titleInfo, setTitleInfo] = useState({
    titleError: { isError: false, message: "제목을 입력해주세요." },
    title: "",
  });
  //video
  const [videoFile, setVideoFile] = useState<Blob | string>("");
  const [videoError, setVideoError] = useState(false);
  //image
  const [imageFile, setImageFile] = useState<Blob | string>("");
  const [imageError, setImageError] = useState(false);
  //category
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [descriptionInfo, setDescriptionInfo] = useState({
    descriptionError: { isError: false, message: "설명을 입력해주세요." },
    description: "",
  });

  const postDirect = async () => {
    if (titleInfo.title === "") {
      setTitleInfo((prev) => {
        return {
          ...prev,
          titleError: { ...prev.titleError, isError: true },
        };
      });
    }
    if (videoFile === null) {
      setImageError(true);
    }
    if (imageFile === null) {
      setImageError(true);
    }
    if (descriptionInfo.description === "") {
      setDescriptionInfo((prev) => {
        return {
          ...prev,
          descriptionError: { ...prev.descriptionError, isError: true },
        };
      });
    }
    if (selectedCategory === "") {
      setCategoryError(true);
    }

    if (
      titleInfo.title === "" ||
      videoFile === null ||
      imageFile === null ||
      descriptionInfo.description === "" ||
      selectedCategory === ""
    )
      return;
    setLoading(true);

    let imageSrc = "";
    const image = new FormData();
    image.append("file", imageFile);
    image.append("height", "180");
    image.append("width", "320");
    image.append("type", "thumbnail");
    await imageResize(image)
      .then((response) => {
        imageSrc = response.url;
      })
      .catch((e) => {
        //error message
        setLoading(false);
        router.replace("/");
      });

    let videoSrc = "";
    let duration = 0;
    const video = new FormData();
    video.append("file", videoFile);
    await videoTransform(video)
      .then((response) => {
        videoSrc = response.url;
        duration = response.duration;
      })
      .catch((e) => {
        //error message
        setLoading(false);
        router.replace("/");
      });

    const data = {
      category: selectedCategory,
      content: descriptionInfo.description,
      thumbnailUrl: imageSrc,
      title: titleInfo.title,
      type: "VIDEO",
      videoDuration: duration,
      videoUrl: videoSrc,
    };

    await createEmbedVideo(data)
      .then((res) => {
        router.replace("/profile/my-upload");
        //To Do: 성공 메세지 훅
      })
      .catch(() => {
        //To Do: 실패 메세지 훅
      });
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form className={styles.wrap}>
          <header className={`${styles.complete} ${styles.complete__orange}`}>
            <span onClick={postDirect}>완료</span>
          </header>
          <PreviewVideo isError={videoError} setVideoFile={setVideoFile} />
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
          <div className="border-gray"></div>
          <VideoCategory
            isError={categoryError}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </form>
      )}
    </>
  );
};

Direct.header = { title: "직접 영상 업로드" };
Direct.back = { color: "gray" };
export default Direct;

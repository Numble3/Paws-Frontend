import styles from "styles/upload/embed.module.css";
import PreviewImage from "components/upload/previewImage";
import VideoCategory from "components/upload/videoCategory";
import { ChangeEvent, useState, useEffect } from "react";
import { CustomInput } from "components/custom";
import {
  createEmbedVideo,
  checkEmbedLink,
  imageResize,
  videoTransform,
} from "apis/upload";
import CustomTextArea from "components/custom/textarea";
import { NextPageWithLayout } from "types/common";

const Embed: NextPageWithLayout = () => {
  console.log(
    //test
    createEmbedVideo({
      category: "",
      content: "",
      embeddedUrl: "",
      thumbnailUrl: "",
      title: "",
      type: "EMBEDDED",
      videoDuration: 0,
      videoUrl: "",
    })
  );
  const [loading, setLoading] = useState(false);
  //link
  const [linkInfo, setLinkInfo] = useState({
    linkError: { isError: false, message: "임베드 불가능한 링크 주소입니다." },
    isSuccess: false,
    link: "",
  });
  useEffect(() => {}, [linkInfo.link]);
  //title
  const [titleInfo, setTitleInfo] = useState({
    titleError: { isError: false, message: "제목을 입력해주세요." },
    title: "",
  });
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
  const checkURL = async (e: ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    let newLinkInfo;
    if (link === "") {
      newLinkInfo = {
        link,
        isSuccess: false,
        linkError: { ...linkInfo.linkError, isError: false },
      };
      setLinkInfo(newLinkInfo);
      return;
    }

    setLoading(true);
    setLinkInfo({
      link,
      isSuccess: false,
      linkError: { isError: true, message: "링크를 확인하는 중입니다..." },
    });
    const result = await checkEmbedLink(link);
    if (result) {
      newLinkInfo = {
        link,
        isSuccess: true,
        linkError: { ...linkInfo.linkError, isError: false },
      };
    } else {
      newLinkInfo = {
        link,
        isSuccess: false,
        linkError: {
          isError: true,
          message: "임베드 불가능한 링크 주소입니다.",
        },
      };
    }
    setLoading(false);
    setLinkInfo(newLinkInfo);
  };

  const postEmbed = async () => {
    //입력 체크
    if (loading) return;
    if (linkInfo.link === "") {
      setLinkInfo((prev) => {
        return {
          ...prev,
          linkError: { message: "링크 주소를 입력해주세요.", isError: true },
        };
      });
    }
    if (titleInfo.title === "") {
      setTitleInfo((prev) => {
        return {
          ...prev,
          titleError: { ...prev.titleError, isError: true },
        };
      });
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
      linkInfo.link === "" ||
      titleInfo.title === "" ||
      imageFile === null ||
      descriptionInfo.description === "" ||
      selectedCategory === ""
    )
      return;
    //1. 이미지 폼 데이터 넣어서 image size 변환 => image src get
    // const ImageSrc = imageResize() ...
    //2. 변환된 image src를 data에 넣음
    const data = {
      category: selectedCategory,
      content: descriptionInfo.description,
      embeddedUrl: linkInfo.link,
      thumbnailUrl: imageFile,
      title: titleInfo.title,
      type: "EMBEDDED",
      videoDuration: 0,
      videoUrl: "",
    };
    console.log(data);
    // 3. createEmbedVideo(data)
  };

  return (
    <form className={styles.wrap}>
      <header className={`${styles.complete} ${styles.complete__orange}`}>
        <span onClick={postEmbed}>완료</span>
      </header>
      <div>
        <p className={styles.title}>영상 임베드 링크</p>
        <CustomInput
          isSuccess={linkInfo.isSuccess}
          error={linkInfo.linkError}
          inputType={"text"}
          placeHolderMessage={"링크 주소를 입력해주세요"}
          onChange={checkURL}
        />
      </div>
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
  );
};

Embed.header = { title: "임베드 영상 업로드" };
Embed.back = { color: "gray" };
export default Embed;

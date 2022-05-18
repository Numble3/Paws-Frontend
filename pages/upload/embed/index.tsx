import styles from "styles/upload/embed.module.css";
import PreviewImage from "components/upload/previewImage";
import VideoCategory from "components/upload/videoCategory";
import { ChangeEvent, useState, useEffect } from "react";
import { CustomInput, Loading } from "components/custom";
import { updateVideo, createVideo, imageResize } from "apis/upload";
import CustomTextArea from "components/custom/textarea";
import { useRouter } from "next/router";
import { VideoType } from "types/video";

const initialData = {
  videoId: "",
  title: "",
  videoUrl: "",
  thumbnailUrl: "",
  type: "임베딩 영상",
  videoDuration: 0,
  category: "",
  content: "",
};

const Embed = ({ data = initialData }: { data: VideoType }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  //link
  //const [linkLoading, setLinkLoading] = useState(false);
  const [linkInfo, setLinkInfo] = useState({
    linkError: { isError: false, message: "임베드 불가능한 링크 주소입니다." },
    isSuccess: false,
    link: data.videoUrl,
  });
  useEffect(() => {}, [linkInfo.link]);
  //title
  const [titleInfo, setTitleInfo] = useState({
    titleError: { isError: false, message: "제목을 입력해주세요." },
    title: data.title,
  });
  //image
  const [imageFile, setImageFile] = useState<Blob | string>("");
  const [imageError, setImageError] = useState(false);
  //category
  const [selectedCategory, setSelectedCategory] = useState(data.category);
  const [categoryError, setCategoryError] = useState(false);
  const [descriptionInfo, setDescriptionInfo] = useState({
    descriptionError: { isError: false, message: "설명을 입력해주세요." },
    description: data.content,
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

    newLinkInfo = {
      link,
      isSuccess: true,
      linkError: { ...linkInfo.linkError, isError: false },
    };
    setLinkInfo(newLinkInfo);
  };

  const postEmbed = async () => {
    //입력 체크
    //if (linkLoading) return;
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

    setLoading(true);
    let imageSrc = "";
    if (data.thumbnailUrl !== "" && imageFile === "") {
      imageSrc = data.thumbnailUrl;
    } else {
      const image = new FormData();
      image.append("file", imageFile);
      image.append("height", "180");
      image.append("width", "320");
      image.append("type", "thumbnail");

      let checkTransform = true;

      await imageResize(image)
        .then((response) => {
          imageSrc = response.url;
        })
        .catch((e) => {
          //error message
          checkTransform = false;
        });

      if (!checkTransform) {
        setLoading(false);
        return;
      }
    }

    const postData = {
      category: selectedCategory,
      content: descriptionInfo.description,
      thumbnailUrl: imageSrc,
      title: titleInfo.title,
      type: "EMBEDDED",
      videoDuration: 0,
      videoUrl: linkInfo.link,
    };

    if (data.videoId === "") {
      await createVideo(postData)
        .then((res) => {
          router.replace("/profile/my-upload");
        })
        .catch(() => {
          //To Do: 실패 메세지 훅
        });
    } else {
      await updateVideo(postData, data.videoId)
        .then((res) => {
          router.replace("/profile/my-upload");
        })
        .catch(() => {
          //To Do: 실패 메세지 훅
        });
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
              placeHolderMessage={"유튜브 영상 주소를 입력해주세요"}
              onChange={checkURL}
              value={linkInfo.link}
            />
          </div>
          <div className="border-gray"></div>
          <PreviewImage
            isError={imageError}
            setImageFile={setImageFile}
            value={data.thumbnailUrl}
          />
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
              value={titleInfo.title}
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
              value={descriptionInfo.description}
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

Embed.header = { title: "임베드 영상 업로드" };
Embed.back = { color: "gray" };
export default Embed;

import { useState } from "react";
import styles from "styles/upload/embed.module.css";
import { ICONS, IMAGES } from "lib/assets";
import Image from "next/image";

const Embed = () => {
  const category = [
    "강아지",
    "고양이",
    "토끼",
    "햄스터",
    "새",
    "도마뱀",
    "기타",
  ];
  const [imageSrc, setImageSrc] = useState("");
  const [isImageUpload, setIsImageUpload] = useState(false);
  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result as string);
        resolve();
      };
    });
  };

  return (
    <>
      <section className={styles.link}>
        <p className={styles.title}>영상 임베드 링크</p>
        <input />
      </section>
      <section className={styles.thumbnail}>
        <p className={styles.title}>썸네일 이미지</p>
        <div className={styles.preview}>
          {imageSrc ? (
            <img src={imageSrc} alt="preview-img" />
          ) : (
            <div>회색 배경</div>
          )}
        </div>
        <div className={styles.image__icon_row}>
          <input
            type="file"
            name="imageFile"
            onChange={(e) => {
              encodeFileToBase64(e.target.files[0] as File);
            }}
          />
          <label htmlFor="imageFile"></label>
          <div className={styles.trash}></div>
          <div className={styles.image_loading}>
            {isImageUpload ? (
              <div>녹색아이콘</div>
            ) : (
              <div>회색 체크 아이콘</div>
            )}
          </div>
        </div>
      </section>
      <section className={styles.video_name}>
        <p className={styles.title}>영상 제목</p>
        <input />
      </section>
      <section className={styles.description}>
        <p className={styles.title}>설명</p>
        <textarea />
      </section>
      <section className={styles.category}>
        <p className={styles.title}>
          카테고리 <span>중복 선택 불가</span>
        </p>
        <ul>
          {category.map((name) => (
            <li>{name}</li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Embed;

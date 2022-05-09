import { useState } from "react";
import styles from "styles/upload/embed.module.css";
import { ICONS, IMAGES } from "lib/assets";
import Image from "next/image";
import Border from "components/border";

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
    <section className={styles.wrap}>
      <div className={styles.link}>
        <p className={styles.title}>영상 임베드 링크</p>
        <input
          className={styles.text_input}
          placeholder="링크 주소를 입력해주세요"
        />
      </div>
      <Border />
      <div className={styles.thumbnail}>
        <p className={styles.title}>썸네일 이미지</p>
        <div>
          <div className={styles.preview_row}>
            <div className={styles.preview}>
              {imageSrc ? (
                <img src={imageSrc} alt="preview-img" />
              ) : (
                <div>
                  <div>
                    <Image src={ICONS.GALLERY} width={25} height={25} />
                  </div>
                  <span>이미지를 업로드 해주세요!</span>
                </div>
              )}
            </div>
            <span>최대 용량 : 10mb</span>
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
                <div className={styles.image_success}>
                  <Image src={ICONS.SUCCESS} width={25} height={25} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Border />
      <div className={styles.video_name}>
        <p className={styles.title}>영상 제목</p>
        <input
          className={styles.text_input}
          placeholder="영상 제목을 입력해주세요"
        />
      </div>
      <Border />
      <div className={styles.description}>
        <p className={styles.title}>설명</p>
        <textarea placeholder="설명 내용을 입력해주세요" />
      </div>
      <Border />
      <div className={styles.category}>
        <p className={styles.title}>
          카테고리 <span>중복 선택 불가</span>
        </p>
        <ul>
          {category.map((name) => (
            <li>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Embed;

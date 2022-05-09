import { useState } from "react";
import styles from "styles/upload/embed.module.css";
import { ICONS } from "lib/assets";
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
  const [selectedCategory, setSelectedCategory] = useState("");
  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        console.log(imageSrc);
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
      <div className="border-gray"></div>
      <div className={styles.thumbnail}>
        <p className={styles.title}>썸네일 이미지</p>
        <div>
          <div className={styles.preview_row}>
            <div
              className={`${styles.preview} ${
                !imageSrc && styles.preview__align_items
              }`}
            >
              <div>
                {imageSrc ? (
                  <div className={styles.preview__image}>
                    <Image src={imageSrc} layout="fill" alt="preview-img" />
                  </div>
                ) : (
                  <>
                    <div className={styles.no_image__icon}>
                      <Image src={ICONS.GALLERY} layout="fill" />
                    </div>
                    <span className={styles.no_image__text}>
                      이미지를 업로드 해주세요!
                    </span>
                  </>
                )}
              </div>
            </div>
            <div>
              <span>최대 용량 : 10mb</span>
              {imageSrc && (
                <span className={styles.upload_complete}>업로드 완료!</span>
              )}
            </div>
          </div>
          <div className={styles.image__icon_row}>
            <input
              type="file"
              id="imageFile"
              onChange={(e) => {
                encodeFileToBase64(e.target.files[0] as File);
              }}
            />
            <label className={styles.upload_btn} htmlFor="imageFile">
              <div>
                <Image src={ICONS.IMAGE_UPLOAD} width={25} height={25} />
              </div>
            </label>
            <div className={styles.trash} onClick={() => setImageSrc("")}>
              <div>
                <Image src={ICONS.TRASH} width={25} height={25} />
              </div>
            </div>
            <div className={styles.image_loading}>
              {imageSrc ? (
                <div className={styles.image_success}>
                  <Image src={ICONS.SUCCESS} width={25} height={25} />
                </div>
              ) : (
                <div className={styles.no_image}>
                  <Image src={ICONS.SUCCESS} width={25} height={25} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="border-gray"></div>
      <div className={styles.video_name}>
        <p className={styles.title}>영상 제목</p>
        <input
          className={styles.text_input}
          placeholder="영상 제목을 입력해주세요"
        />
      </div>
      <div className="border-gray"></div>
      <div className={styles.description}>
        <p className={styles.title}>설명</p>
        <textarea placeholder="설명 내용을 입력해주세요" />
      </div>
      <div className="border-gray"></div>
      <div className={styles.category}>
        <p className={styles.title}>
          카테고리 <span>중복 선택 불가</span>
        </p>
        <ul>
          {category.map((name) => (
            <li
              className={
                selectedCategory === name
                  ? styles.category__selected
                  : styles.category__not_selected
              }
              onClick={() => setSelectedCategory(name)}
              key={name}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Embed;

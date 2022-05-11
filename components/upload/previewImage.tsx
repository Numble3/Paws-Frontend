import { useState, useRef } from "react";
import styles from "styles/upload/preview.module.css";
import Image from "next/image";
import { ICONS } from "lib/assets";
import { CautionIcon } from "components/icons";

const PreviewImage = () => {
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>();
  const [canUpload, setCanUpload] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const encodeFileToBase64 = (fileBlob: File) => {
    if (fileBlob.size > 10 * 1024 * 1024) {
      setImageSrc("");
      setCanUpload(false);
      // return;
    } else {
      setCanUpload(true);
    }
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  return (
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
                <div
                  className={`${styles.preview__image} ${
                    !canUpload && styles.preview__opacity
                  }`}
                >
                  <Image src={imageSrc} layout="fill" alt="preview-img" />
                </div>
              ) : (
                <>
                  <div className={styles.no_image__icon}>
                    <Image src={ICONS.GALLERY} priority={true} layout="fill" />
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
            {imageSrc && canUpload && (
              <span className={styles.upload_complete}>업로드 완료!</span>
            )}
            {!canUpload && (
              <span className={styles.upload_incomplete}>
                파일 용량이 너무 커요
              </span>
            )}
          </div>
        </div>
        <div className={styles.image__icon_row}>
          <input
            type="file"
            id="imageFile"
            accept="image/*"
            ref={inputRef}
            onChange={(e) => {
              if (e.target.files) encodeFileToBase64(e.target.files[0]);
            }}
          />
          <label className={styles.upload_btn} htmlFor="imageFile">
            <div>
              <Image src={ICONS.IMAGE_UPLOAD} width={25} height={25} />
            </div>
          </label>
          <div
            className={styles.trash}
            onClick={() => {
              if (inputRef.current) inputRef.current.value = "";
              setImageSrc("");
              setCanUpload(true);
            }}
          >
            <div>
              <Image src={ICONS.TRASH} width={25} height={25} />
            </div>
          </div>
          <div className={styles.image_loading}>
            {imageSrc && canUpload ? (
              <div className={styles.image_success}>
                <Image src={ICONS.SUCCESS} width={25} height={25} />
              </div>
            ) : !imageSrc && canUpload ? (
              <div className={styles.no_image}>
                <Image src={ICONS.SUCCESS} width={25} height={25} />
              </div>
            ) : (
              <div className={styles.image_success}>
                <CautionIcon width={20} height={20} fill="#e95733" />{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewImage;

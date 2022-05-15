import { useState, useRef, Dispatch, SetStateAction } from "react";
import styles from "styles/upload/preview.module.css";
import Image from "next/image";
import { ICONS } from "lib/assets";
import { CautionIcon } from "components/icons";

interface VideoType {
  setVideoFile: Dispatch<SetStateAction<Blob | string>>;
  isError?: boolean;
}
const PreviewVideo = ({ setVideoFile, isError = false }: VideoType) => {
  const [videoSrc, setVideoSrc] = useState<string | null>("");
  const [canUpload, setCanUpload] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const encodeFileToBase64 = (fileBlob: Blob) => {
    if (fileBlob.size > 100 * 1024 * 1024) {
      setVideoSrc("");
      setCanUpload(false);
      // return;
    } else {
      setCanUpload(true);
    }
    setVideoFile(fileBlob);
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setVideoSrc(reader.result as string);
        resolve();
      };
    });
  };

  return (
    <div className={styles.thumbnail}>
      <p className={styles.title}>영상 업로드</p>
      {isError && (
        <span className={styles.error}>비디오를 업로드 해주세요.</span>
      )}
      <div>
        <div className={styles.preview_row}>
          <div
            className={`${styles.preview} ${
              !videoSrc && styles.preview__align_items
            }`}
          >
            <div>
              {videoSrc ? (
                <div
                  className={`${styles.preview__image} ${
                    !canUpload && styles.preview__opacity
                  }`}
                >
                  <video
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  >
                    <source src={videoSrc} type="video/mp4" />
                    Sorry, your browser doesn't support embedded videos.
                  </video>
                </div>
              ) : (
                <>
                  <div className={styles.no_image__icon}>
                    <Image src={ICONS.VIDEO} priority={true} layout="fill" />
                  </div>
                  <span className={styles.no_image__text}>
                    비디오를 업로드 해주세요!
                  </span>
                </>
              )}
            </div>
          </div>
          <div>
            <span>최대 용량 : 100mb</span>
            {videoSrc && canUpload && (
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
            id="videoFile"
            ref={inputRef}
            accept="video/mp4"
            onChange={(e) => {
              if (e.target.files) encodeFileToBase64(e.target.files[0]);
            }}
          />
          <label className={styles.upload_btn} htmlFor="videoFile">
            <div>
              <Image src={ICONS.IMAGE_UPLOAD} width={25} height={25} />
            </div>
          </label>
          <div
            className={styles.trash}
            onClick={() => {
              if (inputRef.current) inputRef.current.value = "";
              setVideoSrc("");
              setCanUpload(true);
            }}
          >
            <div>
              <Image src={ICONS.TRASH} width={25} height={25} />
            </div>
          </div>
          <div className={styles.image_loading}>
            {videoSrc && canUpload ? (
              <div className={styles.image_success}>
                <Image src={ICONS.SUCCESS} width={25} height={25} />
              </div>
            ) : !videoSrc && canUpload ? (
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

export default PreviewVideo;

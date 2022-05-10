import { useState } from "react";
import styles from "styles/upload/preview.module.css";
import Image from "next/image";
import { ICONS } from "lib/assets";

const PreviewVideo = () => {
  const [videoSrc, setVideoSrc] = useState("");

  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setVideoSrc(reader.result);
        resolve();
      };
    });
  };

  return (
    <div className={styles.thumbnail}>
      <p className={styles.title}>영상 업로드</p>
      <div>
        <div className={styles.preview_row}>
          <div
            className={`${styles.preview} ${
              !videoSrc && styles.preview__align_items
            }`}
          >
            <div>
              {videoSrc ? (
                <div className={styles.preview__image}>
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
                    <Image src={ICONS.VIDEO} layout="fill" />
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
            {videoSrc && (
              <span className={styles.upload_complete}>업로드 완료!</span>
            )}
          </div>
        </div>
        <div className={styles.image__icon_row}>
          <input
            type="file"
            id="videoFile"
            onChange={(e) => {
              encodeFileToBase64(e.target.files[0] as File);
            }}
          />
          <label className={styles.upload_btn} htmlFor="videoFile">
            <div>
              <Image src={ICONS.IMAGE_UPLOAD} width={25} height={25} />
            </div>
          </label>
          <div className={styles.trash} onClick={() => setVideoSrc("")}>
            <div>
              <Image src={ICONS.TRASH} width={25} height={25} />
            </div>
          </div>
          <div className={styles.image_loading}>
            {videoSrc ? (
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
  );
};

export default PreviewVideo;

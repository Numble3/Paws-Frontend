import styles from "styles/upload/videoTitle.module.css";

const VideoTitle = () => {
  return (
    <div className={styles.video_name}>
      <p className={styles.title}>영상 제목</p>
      <input
        className={styles.text_input}
        placeholder="영상 제목을 입력해주세요"
      />
    </div>
  );
};

export default VideoTitle;

import styles from "styles/upload/embed.module.css";
import PreviewImage from "components/upload/previewImage";
import VideoCategory from "components/upload/videoCategory";
import VideoTitle from "components/upload/videoTitle";

const Embed = () => {
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
      <PreviewImage />
      <div className="border-gray"></div>
      <VideoTitle />
      <div className="border-gray"></div>
      <div className={styles.description}>
        <p className={styles.title}>설명</p>
        <textarea placeholder="설명 내용을 입력해주세요" />
      </div>
      <div className="border-gray"></div>
      <VideoCategory />
    </section>
  );
};

export default Embed;
Embed.header = { title: "임베드 영상 업로드" };

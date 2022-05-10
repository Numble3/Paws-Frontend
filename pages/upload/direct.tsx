import styles from "styles/upload/direct.module.css";
import { ICONS, IMAGES } from "lib/assets";
import Image from "next/image";
import PreviewImage from "components/upload/previewImage";
import PreviewVideo from "components/upload/previewVideo";
import VideoCategory from "components/upload/videoCategory";
import VideoTitle from "components/upload/videoTitle";

const Direct = () => {
  return (
    <section className={styles.wrap}>
      <PreviewVideo />
      <div className="border-gray"></div>
      <PreviewImage />
      <div className="border-gray"></div>
      <VideoTitle />
      <div className="border-gray"></div>
      <VideoCategory />
    </section>
  );
};

export default Direct;
Direct.header = { title: "직접 영상 업로드" };

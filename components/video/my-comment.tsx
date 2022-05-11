import { ICONS } from "lib/assets";
import Image from "next/image";
import { memo, useState } from "react";
import styles from "styles/video.module.css";

interface Props {}

const VideoMyComment = (props: Props) => {
  const [comment, setComment] = useState("");

  return (
    <footer className={styles["my-comment"]}>
      <div className={styles["my-comment-profile"]} />
      <div className={styles["my-input"]}>
        <input
          placeholder="댓글을 남겨보세요"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className={styles["send-button"]}>
          <Image src={ICONS.MSG_SEND} layout="fixed" width={20} height={20} />
        </button>
      </div>
    </footer>
  );
};

export default memo(VideoMyComment);

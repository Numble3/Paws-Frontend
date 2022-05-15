import { ICONS } from "lib/assets";
import Image from "next/image";
import { memo, useState, useRef } from "react";
import styles from "styles/video.module.css";
import { postComments } from "apis/comments";
import { useRouter } from "next/router";

interface Props {
  videoId: string;
}

const VideoMyComment = ({ videoId }: Props) => {
  const [comment, setComment] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { pid } = router.query;
  if (!videoId) videoId = pid as string;
  const handleClick = () => {
    postComments(videoId, comment);
    if (inputRef.current) inputRef.current.value = "";
    router.reload();
  };

  return (
    <footer className={styles["my-comment"]}>
      <div className={styles["my-comment-profile"]} />
      <div className={styles["my-input"]}>
        <input
          placeholder="댓글을 남겨보세요"
          ref={inputRef}
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={() => handleClick()} className={styles["send-button"]}>
          <Image src={ICONS.MSG_SEND} layout="fixed" width={20} height={20} />
        </button>
      </div>
    </footer>
  );
};

export default memo(VideoMyComment);

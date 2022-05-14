import { LikeIcon } from "components/icons";
import { useState } from "react";
import styles from "styles/video.module.css";
import { useRouter } from "next/router";
import { likeComment } from "apis/comments";

interface Props {
  profilePath?: string;
  nickname: string;
  createAt: string;
  like: string;
  commentId?: number;
  content: string;
  category: string;
}

/** 동영상 댓글 */
const VideoComment = ({
  profilePath,
  content,
  like,
  createAt,
  commentId,
  nickname,
  category,
}: Props) => {
  //TODO: 각 댓글마다 좋아요 관리하기
  const [active, setActive] = useState(false);
  const router = useRouter();
  const { pid } = router.query;
  const handleClick = async () => {
    setActive(!active);
    //pid랑
    await likeComment(pid as string, category).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className={styles.comment}>
      <section>
        <div className={styles["comment-profile"]} />
      </section>
      <section>
        <div className={styles["comment-info"]}>
          <span>{nickname}</span>
          <span>{createAt}</span>
          <span>{like}</span>
        </div>
        <p className={styles["comment-text"]}>{content}</p>
      </section>
      <aside className={styles["comment-like"]} onClick={handleClick}>
        <LikeIcon isActive={active} svgProps={{ width: 12, height: 12 }} />
      </aside>
    </div>
  );
};

export default VideoComment;

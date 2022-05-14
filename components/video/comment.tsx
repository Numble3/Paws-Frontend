import { LikeIcon } from "components/icons";
import styles from "styles/video.module.css";

interface Props {
  profilePath?: string;
  nickname: string;
  createAt: string;
  like: string;
  commentId?: number;
  content: string;
}

/** 동영상 댓글 */
const VideoComment = ({
  profilePath,
  content,
  like,
  createAt,
  commentId,
  nickname,
}: Props) => {
  //TODO: 각 댓글마다 좋아요 관리하기
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
      <aside className={styles["comment-like"]}>
        <LikeIcon isActive={false} svgProps={{ width: 12, height: 12 }} />
      </aside>
    </div>
  );
};

export default VideoComment;

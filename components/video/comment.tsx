import { LikeIcon } from "components/icons";
import styles from "styles/video.module.css";

interface Props {
  // profile: string;
  name: string;
  timeline: string;
  totalLike: string;
  comment: string;
  // isLike: boolean;
}

/** 동영상 댓글 */
const VideoComment = ({
  // profile,
  comment,
  // isLike,
  name,
  timeline,
  totalLike,
}: Props) => {
  //TODO: 각 댓글마다 좋아요 관리하기
  return (
    <div className={styles.comment}>
      <section>
        <div className={styles["comment-profile"]} />
      </section>
      <section>
        <div className={styles["comment-info"]}>
          <span>{name}</span>
          <span>{timeline}</span>
          <span>{totalLike}</span>
        </div>
        <p className={styles["comment-text"]}>{comment}</p>
      </section>
      <aside className={styles["comment-like"]}>
        <LikeIcon isActive={false} svgProps={{ width: 12, height: 12 }} />
      </aside>
    </div>
  );
};

export default VideoComment;

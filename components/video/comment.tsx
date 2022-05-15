import { LikeIcon } from "components/icons";
import { useEffect, useState } from "react";
import styles from "styles/video.module.css";
import { useRouter } from "next/router";
import { likeComment, dislikeComment } from "apis/comments";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers";
import likeSlice from "reducers/like";

interface Props {
  profilePath?: string;
  nickname: string;
  createAt: string;
  like: string;
  commentId: string;
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
  const router = useRouter();
  const { pid } = router.query;
  const { commentLike } = useSelector((state: RootState) => state.like);
  const [active, setActive] = useState(() => {
    if (commentLike[pid as string])
      return commentLike[pid as string][commentId];
    else return false;
  });
  useEffect(() => {}, []);
  const dispatch = useDispatch();
  const handleClick = async () => {
    setActive(!active);
    //좋아요, 좋아요 취소 순서 헷갈림
    if (!active) {
      await likeComment(pid as string, commentId as string).then((res) => {
        //console.log(res);
      });
      dispatch(
        likeSlice.actions.commentActive({ videoId: pid as string, commentId })
      );
    } else {
      await dislikeComment(pid as string, commentId as string).then((res) => {
        //console.log(res);
      });
      dispatch(
        likeSlice.actions.commentInactive({ videoId: pid as string, commentId })
      );
    }
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

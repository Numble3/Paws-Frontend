import { ICONS } from "lib/assets";
import Image from "next/image";
import { useCallback, useState } from "react";
import styles from "styles/video.module.css";
import VideoInfoButton from "./info-button";
import { addLikeVideo, deleteLikeVideo } from "apis/interest";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import likeSlice from "reducers/like";
import "dayjs/locale/ko";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers";

dayjs.locale("ko");
dayjs.extend(relativeTime);
interface Props {
  category: string;
  nickname: string;
  like: number;
  view: number;
  title: string;
  content: string;
  createdAt: string;
  videoId: string;
}

const VideoDescription = ({
  category,
  nickname,
  title,
  view,
  createdAt,
  content,
  like,
  videoId,
}: Props) => {
  const [showDetail, setShowDetail] = useState(false);
  const dispatch = useDispatch();
  const { videoLike } = useSelector((state: RootState) => state.like);
  const [heartActive, setHeartActive] = useState(videoLike[videoId]);

  const onToggleHeart = useCallback(async () => {
    setHeartActive((p) => !p);

    if (!heartActive) {
      await addLikeVideo(videoId, category).then((res) => {
        //      console.log(res);
      });
      dispatch(likeSlice.actions.active(videoId));
    } else {
      await deleteLikeVideo(videoId).then((res) => {
        //      console.log(res);
      });
      dispatch(likeSlice.actions.inactive(videoId));
    }
  }, []);

  return (
    <section>
      <article className={styles.header}>
        <div className={styles.profile} />
        <h4>{nickname}</h4>
      </article>

      <article className={styles.info}>
        <div className={styles["info-detail"]}>
          <h2>{title}</h2>
          <aside
            className={`${styles["detail-info"]} ${
              showDetail ? styles["show-detail"] : ""
            }`}
          >
            {content}
          </aside>
          <div>
            <VideoInfoButton iconPath={ICONS.WATCH} text={view.toString()} />
            <VideoInfoButton
              iconPath={ICONS.TIME}
              text={dayjs(createdAt).fromNow()}
            />
            <VideoInfoButton
              text={like.toString()}
              isHeartActive={heartActive}
              onClickHeart={onToggleHeart}
            />
          </div>
        </div>
        <div
          className={`${styles.arrow} ${showDetail ? styles.show : ""}`}
          onClick={() => setShowDetail((p) => !p)}
        >
          <Image src={ICONS.DOWN_ARROW} layout="fill" />
        </div>
      </article>
    </section>
  );
};

export default VideoDescription;
function useAppDispatch() {
  throw new Error("Function not implemented.");
}

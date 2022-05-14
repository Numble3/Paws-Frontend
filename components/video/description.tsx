import { ICONS } from "lib/assets";
import Image from "next/image";
import { useCallback, useState } from "react";
import styles from "styles/video.module.css";
import VideoInfoButton from "./info-button";

interface Props {
  nickname: string;
  like: number;
  view: number;
  title: string;
  content: string;
  createdAt: string;
}

const VideoDescription = ({
  nickname,
  title,
  view,
  createdAt,
  content,
  like,
}: Props) => {
  const [showDetail, setShowDetail] = useState(false);
  const [heartActive, setHeartActive] = useState(false);

  const onToggleHeart = useCallback(() => {
    //TODO: 동영상 좋아요 api 연동
    setHeartActive((p) => !p);
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
              text={createdAt.split(" ")[0]}
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

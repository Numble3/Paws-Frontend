import { ICONS } from "lib/assets";
import Image from "next/image";
import { useCallback, useState } from "react";
import styles from "styles/video.module.css";
import VideoInfoButton from "./info-button";

interface Props {}

const VideoDescription = (props: Props) => {
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
        <h4>{`다희네우당탕3묘`}</h4>
      </article>

      <article className={styles.info}>
        <div className={styles["info-detail"]}>
          <h2>{`[우당탕 3묘] 발로 꼬리 밟아서 화난 고양이 장수`}</h2>
          <aside
            className={`${styles["detail-info"]} ${
              showDetail ? styles["show-detail"] : ""
            }`}
          >
            {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo ipsam nobis incidunt veniam a asperiores, suscipit esse ipsum? Ratione necessitatibus dolore ipsa nobis, reiciendis numquam iure et voluptas ut esse?`}
          </aside>
          <div>
            <VideoInfoButton iconPath={ICONS.WATCH} text={`1348만 회`} />
            <VideoInfoButton iconPath={ICONS.TIME} text={`4년 전`} />
            <VideoInfoButton
              text={`38만`}
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

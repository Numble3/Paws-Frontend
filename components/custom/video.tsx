import { HeartIcon, DotIcon } from "components/icons";
import Link from "next/link";
import styles from "styles/custom/video-list.module.css";
import Image from "next/image";
import { CSSProperties, MouseEvent } from "react";
import { VideoListType } from "types/video";

interface Props {
  data: VideoListType;
  noDot?: boolean;
  noInfo?: boolean;
  onEdit?: (e: MouseEvent) => void;
  style?: CSSProperties;
}

const Video = ({
  data,
  noDot = true,
  noInfo = false,
  onEdit,
  style,
}: Props) => {
  return (
    <Link key={data.videoId} href={`/video/${data.videoId}`}>
      <div className={styles["video-container"]}>
        <div>
          <Image
            src={`${data.thumbnailPath}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        {!noDot && (
          <div onClick={onEdit} className={styles["dot-icon"]}>
            <DotIcon />
          </div>
        )}
        {!noInfo && (
          <aside className={styles["video-desc"]}>
            <article>
              <h4 className={styles.title}>{data.title}</h4>
              {/* profile Image */}
              <div className={styles.info}>
                <div className={styles.profile} />
                <span>{data.nickname}</span>
                {/* To Do: 날짜 형식 바꾸기 */}
                <span>{data.createdAt.split(" ")[0]}</span>
                <span>조회수 {data.view}회</span>
              </div>
            </article>
            <article>
              <HeartIcon isLike={true} />
              <span>{data.like}</span>
            </article>
          </aside>
        )}
      </div>
    </Link>
  );
};

export default Video;

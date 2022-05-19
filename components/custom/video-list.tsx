import { HeartIcon, DotIcon } from "components/icons";
import Link from "next/link";
import styles from "styles/custom/video-list.module.css";
import Image from "next/image";
import { CSSProperties, MouseEvent } from "react";
import { VideoListType } from "types/video";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.locale("ko");
dayjs.extend(relativeTime);

interface Props<T> {
  datas: T[];
  noDot?: boolean;
  noInfo?: boolean;
  onEdit?: (e: MouseEvent) => void;
  style?: CSSProperties;
}

//TODO: Check Backend type
const VideoList = <T extends VideoListType>({
  datas,
  noDot = true,
  noInfo = false,
  onEdit,
  style,
}: Props<T>) => {
  return (
    <section className={styles.videos} style={style}>
      {datas.map((video) => (
        <Link key={video.videoId} href={`/video/${video.videoId}`}>
          <div className={styles["video-container"]}>
            <div>
              <Image
                src={`/${video.thumbnailPath}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            {!noDot && (
              <div
                id={String(video.videoId)}
                onClick={onEdit}
                className={styles["dot-icon"]}
              >
                <DotIcon id={String(video.videoId)} />
              </div>
            )}
            {!noInfo && (
              <aside className={styles["video-desc"]}>
                <article>
                  <h4 className={styles.title}>{video.title}</h4>
                  {/* profile Image */}
                  <div className={styles.info}>
                    <div className={styles.profile} />
                    <span>{video.nickname}</span>
                    {/* To Do: 날짜 형식 바꾸기 */}
                    <span>{dayjs(video.createdAt).fromNow()}</span>
                    <span>조회수 {video.view}회</span>
                  </div>
                </article>
                <article>
                  <HeartIcon isLike={true} />
                  <span>{video.like}</span>
                </article>
              </aside>
            )}
          </div>
        </Link>
      ))}
    </section>
  );
};

export default VideoList;

import { HeartIcon, DotIcon } from "components/icons";
import Link from "next/link";
import styles from "styles/custom/video-list.module.css";
import Image from "next/image";
import { CSSProperties, MouseEvent, useState } from "react";
import { VideoListType } from "types/video";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useSelector } from "react-redux";
import { RootState } from "reducers";
import { addLikeVideo } from "apis/interest";

dayjs.locale("ko");
dayjs.extend(relativeTime);
interface Props {
  data: VideoListType;
  noDot?: boolean;
  noInfo?: boolean;
  onEdit?: (e: MouseEvent) => void;
  style?: CSSProperties;
}

const Video = ({ data, noDot = true, noInfo = false, onEdit }: Props) => {
  const { videoLike } = useSelector((state: RootState) => state.like);
  const [heartActive, setHeartActive] = useState<boolean>(
    videoLike[data.videoId]
  );

  // const handleToggleLike = async () => {
  //   if (!heartActive) {
  //     await addLikeVideo(String(data.videoId), data.category).then((res) => {});
  //     dispatch(likeSlice.actions.active(videoId));
  //   } else {
  //     await deleteLikeVideo(videoId).then((res) => {});
  //     dispatch(likeSlice.actions.inactive(videoId));
  //   }
  // }

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
                <Image
                  className={styles.profile}
                  src={data.profileUrl}
                  width={12}
                  height={12}
                />
                <span>{data.nickname}</span>
                {/* To Do: 날짜 형식 바꾸기 */}
                <span>{dayjs(data.createdAt).fromNow()}</span>
                <span>조회수 {data.view}회</span>
              </div>
            </article>
            <article>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  //TODO: 좋아요 이벤트 추가하기
                }}
              >
                <HeartIcon
                  isLike={
                    videoLike[data.videoId] ? !videoLike[data.videoId] : true
                  }
                />
              </div>
              <span>{data.like}</span>
            </article>
          </aside>
        )}
      </div>
    </Link>
  );
};

export default Video;

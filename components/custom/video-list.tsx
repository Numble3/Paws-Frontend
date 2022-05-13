import { HeartIcon, DotIcon } from "components/icons";
import Link from "next/link";
import styles from "styles/custom/video-list.module.css";
import Image from "next/image";
import { CSSProperties, MouseEvent } from "react";
import { VideoListType } from "types/video";

interface Props {
  datas: VideoListType[];
  noDot?: boolean;
  noInfo?: boolean;
  onEdit?: (e: MouseEvent) => void;
  style?: CSSProperties;
}
const dummy: VideoListType[] = [
  {
    createdAt: "2022-11-11 16-50-10",
    like: 0,
    nickname: "다희네 우당탕탕 3묘",
    thumbnailPath: "/images/temp.png",
    title: "발로 꼬리 밟아서 화난 고양이 장수",
    videoId: 1,
    view: 380,
  },
  {
    createdAt: "2022-11-11 16-50-10",
    like: 0,
    nickname: "다희네 우당탕탕 3묘",
    thumbnailPath: "/images/temp.png",
    title: "발로 꼬리 밟아서 화난 고양이 장수",
    videoId: 2,
    view: 380,
  },
  {
    createdAt: "2022-11-11 16-50-10",
    like: 0,
    nickname: "다희네 우당탕탕 3묘",
    thumbnailPath: "/images/temp.png",
    title: "발로 꼬리 밟아서 화난 고양이 장수",
    videoId: 3,
    view: 380,
  },
  {
    createdAt: "2022-11-11 16-50-10",
    like: 0,
    nickname: "다희네 우당탕탕 3묘",
    thumbnailPath: "/images/temp.png",
    title: "발로 꼬리 밟아서 화난 고양이 장수",
    videoId: 4,
    view: 380,
  },
  {
    createdAt: "2022-11-11 16-50-10",
    like: 0,
    nickname: "다희네 우당탕탕 3묘",
    thumbnailPath: "/images/temp.png",
    title: "발로 꼬리 밟아서 화난 고양이 장수",
    videoId: 5,
    view: 380,
  },
];

const VideoList = ({
  datas = dummy,
  noDot = true,
  noInfo = false,
  onEdit,
  style,
}: Props) => {
  return (
    <section className={styles.videos} style={style}>
      {datas.map((video) => (
        <Link key={video.videoId} href={`/video/${video.videoId}`}>
          <div className={styles["video-container"]}>
            <div>
              <Image
                src={`${video.thumbnailPath}`}
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
                  <h4 className={styles.title}>{video.title}</h4>
                  {/* profile Image */}
                  <div className={styles.info}>
                    <div className={styles.profile} />
                    <span>{video.nickname}</span>
                    {/* To Do: 날짜 형식 바꾸기 */}
                    <span>{video.createdAt}`</span>
                    <span>조회수`${video.view}` 회</span>
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

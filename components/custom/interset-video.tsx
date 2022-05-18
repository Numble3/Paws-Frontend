import Link from "next/link";
import boxStyle from "styles/interest/interested.module.css";
import style from "styles/interest/category.module.css";
import Image from "next/image";
import { HeartIcon } from 'components/icons';
import { LikeVideoList, VideoListType } from 'types/video';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.locale("ko");
dayjs.extend(relativeTime);

/* videoId, title, 업로더 닉네임, */
interface Props {
  videoData: LikeVideoList
}

const InterestVideo = ({videoData}:Props) => {
  return (
    <Link href={`/video/${videoData.videoId}`}>
      <article className={style.box}>
        <div className={style.img}>
          <Image src={videoData.thumbnailPath} layout="fill" objectFit="cover" />
        </div>
        <section className={style["text-container"]}>
          <div className={style["sub-title"]}>{videoData.title}</div>
          <div className={boxStyle.info}>
            <span>{videoData.nickname}</span>
          </div>
          <div className={boxStyle.info}>
            <span>{dayjs(videoData.createdAt).fromNow()}</span>
            <span className={boxStyle.space}>•</span>
            <span>{videoData.view}</span>
          </div>
        </section>
        <div className={style.icon}>
          <HeartIcon width={10} height={10} isLike={false} />
        </div>
      </article>
    </Link>
  );
};

export default InterestVideo;

import Link from "next/link";
import style from "styles/interest/interested.module.css";
import VideoList from "./video-list";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { categories } from 'lib/variables';
dayjs.locale("ko");
dayjs.extend(relativeTime);

interface Props {
  datas: any;
  label: string;
}
const InterestBox = ({ datas, label }: Props) => {
  const [{ value }] = categories.filter(
    (v) => v.label === label
  );
  const list = datas.slice(0, 3).map((v: any) => {
    return v.getVideoDto;
  });
  return datas.length !== 0 ? (
    <Link href={`interestVideo/${value}`}>
      <article className={style.box}>
        <VideoList datas={list} noInfo={true} />
        <div className={style.title}>{label}</div>
        <div className={style.info}>
          <span>동영상 {datas.length}개</span>
          <span className={style.space}>•</span>
          <span>{dayjs(datas[0].createdAt).fromNow()}</span>
        </div>
      </article>
    </Link>
  ) : (
    <></>
  );
};

export default InterestBox;

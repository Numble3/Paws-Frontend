import { IMAGES } from "lib/assets";
import Link from "next/link";
import style from "styles/interest/interested.module.css";
import VideoList from "./video-list";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Image from 'next/image';
dayjs.locale("ko");
dayjs.extend(relativeTime);

interface Props {
  datas: any;
  label: string;
}
const InterestBox = ({ datas, label }: Props) => {
  console.log("Idatas", datas);
  const list = datas.slice(0, 3).map((v) => {
    return v.getVideoDto;
  });

  return datas.length !== 0 ? (
    <Link href={`interestVideo/${label}`}>
      <article className={style.box}>
        <section>
          <div>
            <Image
              src={`${list[0].thumbnailPath}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </section>
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

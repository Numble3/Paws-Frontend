import Link from "next/link";
import boxStyle from "styles/interest/interested.module.css";
import style from "styles/interest/category.module.css";
import Image from "next/image";
import { HeartIcon } from 'components/icons';

const InterestVideo = () => {
  return (
    <Link href={`/video/${123}`}>
      <article className={style.box}>
        <div className={style.img}>
          <Image src={`/images/temp.png`} layout="fill" objectFit="cover" />
        </div>
        <section className={style["text-container"]}>
          <div className={style["sub-title"]}>영상제목</div>
          <div className={boxStyle.info}>
            <span>영상 작성자</span>
          </div>
          <div className={boxStyle.info}>
            <span>동영상 38개</span>
            <span className={boxStyle.space}>•</span>
            <span>3일 전</span>
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

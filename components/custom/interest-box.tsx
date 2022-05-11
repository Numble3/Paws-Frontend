import Link from 'next/link';
import style from "styles/interest/interested.module.css";
import VideoList from './video-list';
interface Props{
  label:string;
  value:string;
}
const InterestBox = ({value, label}:Props) => {
  return (
    <Link key={value} href={`interestVideo/${value}`}>
      <article className={style.box}>
        <VideoList videoCnt={3} noInfo={true} />
        <div className={style.title}>{label}</div>
        <div className={style.info}>
          <span>동영상 38개</span>
          <span className={style.space}>•</span>
          <span>3일 전</span>
        </div>
      </article>
    </Link>
  );
};

export default InterestBox;

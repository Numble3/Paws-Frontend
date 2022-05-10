import { HeartIcon, DotIcon } from "components/icons";
import Link from "next/link";
import styles from "styles/custom/video-list.module.css";
import Image from "next/image";

interface Props {
  noDot?: boolean;
  noInfo?: boolean;
  onEdit?: () => void;
}

const VideoList = ({ noDot = true, noInfo = false, onEdit }: Props) => {
  return (
    <section className={styles.videos}>
      {Array.from(Array(10).keys()).map((v) => (
        <Link key={v} passHref href={`/video/${123}`}>
          <div className={styles["video-container"]}>
            {/* TODO: div -> fetch video thumbnail */}
            <div>
              <Image src={`/images/temp.png`} layout="fill" objectFit="cover" />
            </div>
            {!noDot && (
              <div onClick={onEdit} className={styles.icon_test}>
                <DotIcon />
              </div>
            )}
            {!noInfo && (
              <aside className={styles["video-desc"]}>
                <article>
                  <h4
                    className={styles.title}
                  >{`발로 꼬리 밟아서 화난 고양이 장수`}</h4>
                  {/* profile Image */}
                  <div className={styles.info}>
                    <div className={styles.profile} />
                    <span>{`다희네우당탕3묘`}</span>
                    <span>{`4년 전`}</span>
                    <span>조회수{`1348`}만 회</span>
                  </div>
                </article>
                <article>
                  <HeartIcon isLike={true} />
                  <span>38만</span>
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

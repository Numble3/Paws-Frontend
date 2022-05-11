import { CustomSelectBox } from "components/custom";
import { IMAGES } from "lib/assets";
import Image from "next/image";
import styles from "styles/video.module.css";
import VideoComment from "./comment";

const dummy = [
  {
    id: 1,
    name: "박성훈",
    timeline: "2년 전",
    totalLike: "좋아요 2.1천개",
    comment:
      "유튜브는 핵전쟁을 대비한 미래인류를 위한 타임캡슐에 이 영상을 첫 번째로 넣어라",
  },
  {
    id: 2,
    name: "박성훈",
    timeline: "2년 전",
    totalLike: "좋아요 2.1천개",
    comment:
      "유튜브는 핵전쟁을 대비한 미래인류를 위한 타임캡슐에 이 영상을 첫 번째로 넣어라",
  },
  {
    id: 3,
    name: "박성훈",
    timeline: "2년 전",
    totalLike: "좋아요 2.1천개",
    comment:
      "유튜브는 핵전쟁을 대비한 미래인류를 위한 타임캡슐에 이 영상을 첫 번째로 넣어라",
  },
  {
    id: 4,
    name: "박성훈",
    timeline: "2년 전",
    totalLike: "좋아요 2.1천개",
    comment:
      "유튜브는 핵전쟁을 대비한 미래인류를 위한 타임캡슐에 이 영상을 첫 번째로 넣어라",
  },
];

const dummy2: typeof dummy = [];

interface Props {}

const VideoCommentsList = (props: Props) => {
  return (
    <section className={styles["comments-list"]}>
      <article className={styles["comments-header"]}>
        <h2>댓글</h2>
        <span>1.4만</span>
      </article>
      <article className={styles["comments-filter"]}>
        <CustomSelectBox />
      </article>
      {dummy2.length !== 0 ? (
        dummy2.map(({ comment, id, name, timeline, totalLike }) => (
          <VideoComment key={id} {...{ comment, name, timeline, totalLike }} />
        ))
      ) : (
        <article className={styles.empty}>
          <Image src={IMAGES.MESSAGE} width={20} height={20} />
          <p>첫 번째 댓글을 남겨주세요!</p>
        </article>
      )}
    </section>
  );
};

export default VideoCommentsList;

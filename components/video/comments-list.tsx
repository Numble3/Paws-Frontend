import { getComments } from "apis/comments";
import { CustomSelectBox } from "components/custom";
import { ICONS, IMAGES } from "lib/assets";
import Image from "next/image";
import { useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import styles from "styles/video.module.css";
import { CommentParams } from "types/comment";
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

interface Props {
  videoId: number;
}

const VideoCommentsList = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("LATEST");
  const query: CommentParams = {
    sort: selectedCategory,
    videoId: props.videoId,
    page: 0,
    size: 10,
  };
  console.log(props.videoId);
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(["comment", query], () => getComments(query), {
      getNextPageParam: (lastPage) => {
        console.log(lastPage);
        if (lastPage.hasNext) {
          return {
            page: lastPage.contents.length,
          };
        } else {
          return undefined;
        }
      },
      refetchOnWindowFocus: false,
    });

  return (
    <section className={styles["comments-list"]}>
      <article className={styles["comments-header"]}>
        <h2>댓글</h2>
        <span>1.4만</span>
      </article>
      <article className={styles["comments-filter"]}>
        <CustomSelectBox setSelectedCategory={setSelectedCategory} />
      </article>
      {isFetchingNextPage ? (
        <div>
          <Image src={ICONS.LOADING} width={25} height={25} />
        </div>
      ) : data?.pages[0].length !== 0 ? (
        data?.pages.map((comments) =>
          comments.contents.map(
            ({ profilePath, content, like, createAt, commentId, nickname }) => (
              <VideoComment
                key={commentId}
                {...{
                  profilePath,
                  content,
                  like,
                  createAt,
                  commentId,
                  nickname,
                }}
              />
            )
          )
        )
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

import { getComments } from "apis/comments";
import { CustomSelectBox } from "components/custom";
import { ICONS, IMAGES } from "lib/assets";
import Image from "next/image";
import { useEffect, useState } from "react";
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

interface Props {
  videoId: number;
}

const VideoCommentsList = (props: Props) => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("LATEST");
  const query: CommentParams = {
    sort: selectedCategory,
    videoId: props.videoId,
    page: 0,
    size: 10,
  };
  const fetchList = async ({ query, page }) => {
    const newQuery = { ...query, page };
    const response = await getComments(newQuery);
    return {
      contents: response.contents,
      query: { ...query, page: page + 1 },
      hasNext: response.hasNext,
      nextId: page + 1,
    };
  };

  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["video", query],
      ({ pageParam = { query, page: 0 } }) =>
        fetchList({
          query: pageParam.query,
          page: pageParam.page,
        }),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.hasNext) {
            return {
              query: query,
              page: lastPage.nextId,
            };
          } else {
            return undefined;
          }
        },
        refetchOnWindowFocus: false,
      }
    );

  const onIntersect = (
    [entry]: any,
    observer: { unobserve: (arg0: any) => void; observe: (arg0: any) => void }
  ) => {
    if (entry.isIntersecting && !isFetchingNextPage) {
      observer.unobserve(entry.target);
      fetchNextPage();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <section className={styles["comments-list"]}>
      <article className={styles["comments-header"]}>
        <h2>댓글</h2>
        <span>1.4만</span>
      </article>
      <article className={styles["comments-filter"]}>
        <CustomSelectBox setSelectedCategory={setSelectedCategory} />
      </article>
      {data?.pages[0].contents.length === 0 ? (
        <article className={styles.empty}>
          <Image src={IMAGES.MESSAGE} width={20} height={20} />
          <p>첫 번째 댓글을 남겨주세요!</p>
        </article>
      ) : (
        <>
          {data?.pages.map((comments) =>
            comments.contents.map(
              ({
                profilePath,
                content,
                like,
                createAt,
                commentId,
                nickname,
              }: {
                profilePath?: string;
                nickname: string;
                createAt: string;
                like: string;
                commentId?: number;
                content: string;
              }) => (
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
          )}
          <div ref={setTarget} id="loading">
            {isFetchingNextPage && (
              <div>
                <Image src={ICONS.LOADING} width={25} height={25} />
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default VideoCommentsList;

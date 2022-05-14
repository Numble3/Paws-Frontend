import { getComments } from "apis/comments";
import { CustomSelectBox } from "components/custom";
import { ICONS, IMAGES } from "lib/assets";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import styles from "styles/video.module.css";
import { CommentParams } from "types/comment";
import VideoComment from "./comment";

interface Props {
  videoId: number;
}

const VideoCommentsList = ({ videoId }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("LATEST");
  const [data, setData] = useState([]);
  const query: CommentParams = {
    sort: selectedCategory,
    videoId: videoId,
    page: 0,
    size: 10,
  };
  useEffect(() => {
    getComments(query).then((res) => {
      setData(res.contents);
    });
  }, []);
  return (
    <section className={styles["comments-list"]}>
      <article className={styles["comments-header"]}>
        <h2>댓글</h2>
        <span>1.4만</span>
      </article>
      <article className={styles["comments-filter"]}>
        <CustomSelectBox setSelectedCategory={setSelectedCategory} />
      </article>
      {data.length === 0 ? (
        <article className={styles.empty}>
          <Image src={IMAGES.MESSAGE} width={20} height={20} />
          <p>첫 번째 댓글을 남겨주세요!</p>
        </article>
      ) : (
        <>
          {data.map(
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
          )}
        </>
      )}
    </section>
  );
};

export default VideoCommentsList;

import { getComments } from "apis/comments";
import { CustomSelectBox } from "components/custom";
import { ICONS, IMAGES } from "lib/assets";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "styles/video.module.css";
import { CommentParams } from "types/comment";
import VideoComment from "./comment";
import { useRouter } from "next/router";

interface Props {
  videoId: string;
}

type CommentType = {
  profilePath?: string;
  nickname: string;
  createAt: string;
  like: string;
  commentId?: number;
  content: string;
};
const VideoCommentsList = ({ videoId }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("LATEST");
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const router = useRouter();
  const { pid: id } = router.query;
  let temp;
  if (videoId) temp = videoId;
  else {
    if (id) temp = id as string;
  }
  const query: CommentParams = {
    sort: selectedCategory,
    videoId: temp as string,
    page: 0,
    size: 10,
  };

  let page = query.page;
  let hasNext = true;
  const getMoreItem = async () => {
    setIsLoaded(true);
    await getComments({ ...query, page: page }).then((res) => {
      hasNext = res.hasNext;
      setData((prev) => {
        const newData = prev.concat(res.contents);
        return newData;
      });
    });
    page++;
    setIsLoaded(false);
  };

  const onIntersect = async (
    [entry]: any,
    observer: { unobserve: (arg0: any) => void; observe: (arg0: any) => void }
  ) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      if (!hasNext) {
        return;
      }
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
      {data.length === 0 ? (
        <article className={styles.empty}>
          <Image src={IMAGES.MESSAGE} width={20} height={20} />
          <p>첫 번째 댓글을 남겨주세요!</p>
        </article>
      ) : (
        <>
          {data.map((value: CommentType, index) => (
            <VideoComment key={index} {...value} />
          ))}
        </>
      )}
      <div ref={setTarget} id="loading">
        {isLoaded && (
          <div>
            <Image src={ICONS.LOADING} width={25} height={25} />
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoCommentsList;

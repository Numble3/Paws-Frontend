import { useRouter } from "next/router";
import { NextPageWithLayout } from "types/common";
import style from "styles/interest/category.module.css";
import Istyle from "styles/interest/interested.module.css";
import { categories } from "lib/variables";
import InterestVideo from "components/custom/interset-video";
import { InView, useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { getLikeVideosAPI } from "apis/like";
import { Loading } from "components/custom";
import { LikeVideoList } from "types/video";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useEffect } from "react";
import { useCheck } from "hooks/use-check";
dayjs.locale("ko");
dayjs.extend(relativeTime);

const InterestedCategory: NextPageWithLayout = () => {
  const router = useRouter();
  const { checkModal } = useCheck();

  const [ref, inView] = useInView();

  const CATEGORY = router.query.category as string;

  const [{ label }] = categories.filter(
    (v) => v.value === router.query.category
  );

  const { data, isLoading, fetchNextPage } = useInfiniteQuery<LikeVideoList[]>(
    ["likes", CATEGORY],
    ({ pageParam = 0 }) => getLikeVideosAPI(CATEGORY, pageParam, 6),
    {
      getNextPageParam: (lastPage) => {
        if (!!lastPage?.[lastPage.length - 1])
          return lastPage?.[lastPage.length - 1];
        return undefined;
      },
    }
  );

  useEffect(() => {
    checkModal();
  }, []);

  useEffect(() => {
    if (inView) {
      console.log("inView가 true");
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) return <Loading />;

  const videoList = data?.pages
    .flat()
    .filter((v) => v && typeof v !== "number");
  const isLastData = data && data.pages[data.pages.length - 1]?.length <= 6;
  const readToLoad = !isLastData && !isLoading;

  // console.log("isLastData", isLastData);
  // console.log("reaToLoad : ", readToLoad);

  return (
    <div className={style.wrapper}>
      <header className={style.header}>
        <div className={style.title}>
          <h1>{label}</h1>
          <div className={Istyle.info}>
            <span>동영상 {videoList?.length}개</span>
            <span className={Istyle.space}>•</span>
            <span>{dayjs(videoList![0].createdAt).fromNow()}</span>
          </div>
        </div>
      </header>
      <section className={style.contents}>
        {videoList?.map((v: LikeVideoList, i: number) => (
          <InterestVideo key={i} videoData={v} />
        ))}

        <div
          ref={readToLoad ? ref : undefined}
          style={{ height: 10, backgroundColor: "transparent" }}
        />
      </section>
    </div>
  );
};

InterestedCategory.back = { color: "gray" };
export default InterestedCategory;

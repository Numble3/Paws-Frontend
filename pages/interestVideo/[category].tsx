import { useRouter } from "next/router";
import { NextPageWithLayout } from "types/common";
import style from "styles/interest/category.module.css";
import Istyle from "styles/interest/interested.module.css";
import { categories } from "lib/variables";
import InterestVideo from "components/custom/interset-video";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { getLikeVideosAPI } from "apis/like";
import { Loading } from "components/custom";
import { LikeVideoList, VideoListType } from "types/video";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useDispatch } from "react-redux";
import modalSlice from "reducers/modal";
import { useEffect } from "react";
import { get } from "immer/dist/internal";
dayjs.locale("ko");
dayjs.extend(relativeTime);

const InterestedCategory: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const CATEGORY = router.query.category as string;

  const [{ label }] = categories.filter(
    (v) => v.value === router.query.category
  );

  const { data, isLoading, fetchNextPage } = useInfiniteQuery<LikeVideoList[]>(
    ["likes", CATEGORY],
    ({ pageParam = 0 }) => getLikeVideosAPI(CATEGORY, pageParam, 5),
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.[lastPage.length - 1]?.videoId;
      },
    }
  );

  // const { data, isLoading } = useQuery(
  //   "test",
  //   () => {
  //     return getLikeVideosAPI({
  //       category: router.query.category as string,
  //       size: 5,
  //     });
  //   },
  //   {
  //     retry: 2,
  //   }
  // );
  // useEffect(() => {
  //   checkModal();
  // }, []);

  if (isLoading) return <Loading />;
  const videoList = data?.pages.flat();

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
      </section>
    </div>
  );
};

InterestedCategory.back = { color: "gray" };
export default InterestedCategory;

import { useRouter } from "next/router";
import { NextPageWithLayout } from "types/common";
import style from "styles/interest/category.module.css";
import Istyle from "styles/interest/interested.module.css";
import { categories } from "lib/variables";
import InterestVideo from "components/custom/interset-video";
import { useQuery } from "react-query";
import { getLikeVideosAPI } from "apis/like";
import { Loading } from "components/custom";
import { VideoListType } from "types/video";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useDispatch } from "react-redux";
import modalSlice from "reducers/modal";
import { useEffect } from "react";
dayjs.locale("ko");
dayjs.extend(relativeTime);
type likesType = {
  createdAt: string;
  getVideoDto: VideoListType;
};

const InterestedCategory: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [{ label }] = categories.filter(
    (v) => v.value === router.query.category
  );

  const { data, isLoading } = useQuery(
    "test",
    () => {
      return getLikeVideosAPI({
        category: router.query.category as string,
        size: 5,
      });
    },
    {
      retry: 2,
    }
  );
  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (!email) {
      router.replace("/");
      dispatch(modalSlice.actions.isError({ isError: true }));
      dispatch(modalSlice.actions.open({}));
      dispatch(
        modalSlice.actions.setErrorMessage({
          errorMessage: "로그인이 필요합니다.",
        })
      );
      setTimeout(() => {
        dispatch(modalSlice.actions.close({}));
      }, 3000);
    }
  }, []);

  if (isLoading) return <Loading />;
  const videoList = data.likes;

  return (
    <div className={style.wrapper}>
      <header className={style.header}>
        <div className={style.title}>
          <h1>{label}</h1>
          <div className={Istyle.info}>
            <span>동영상 {videoList.length}개</span>
            <span className={Istyle.space}>•</span>
            <span>{dayjs(videoList[0].createdAt).fromNow()}</span>
          </div>
        </div>
      </header>
      <section className={style.contents}>
        {videoList.map((v: likesType, i: number) => (
          <InterestVideo key={i} videoData={v.getVideoDto} />
        ))}
      </section>
    </div>
  );
};

InterestedCategory.back = { color: "gray" };
export default InterestedCategory;

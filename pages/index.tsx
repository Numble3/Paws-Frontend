import { NextPageWithLayout } from "types/common";
import { HomeCategory } from "components/home";
import { todayRanking } from "apis/get-video";
import { Loading, VideoList } from "components/custom";
import { useQuery } from "react-query";
import { useState } from "react";
import NoResult from "components/custom/no-result";

const noPopularResult = {
  title: "인기 영상 없음",
  content: "일일 인기 동영상이 없어요",
};

const Home: NextPageWithLayout = () => {
  const [category, setCategory] = useState<{
    label: string;
    value: string | undefined;
  }>({ label: "전체", value: undefined });
  const { isLoading, data } = useQuery(["ranking", category], () =>
    todayRanking(category)
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <HomeCategory setCategory={setCategory} />
      <div className="layout-p">
        <h3 id="sub-title">일일 인기 동영상</h3>
        <div style={{ marginTop: "64px" }}>
          {data.length !== 0 ? (
            <VideoList datas={data} />
          ) : (
            <NoResult {...noPopularResult} />
          )}{" "}
        </div>
      </div>
    </>
  );
};

Home.header = true;
export default Home;

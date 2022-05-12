import { NextPageWithLayout } from "types/common";
import { HomeCategory } from "components/home";
import { Loading, VideoList } from "components/custom";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <HomeCategory />
      <div className="layout-p">
        <h3 id="sub-title">주간 인기 동영상</h3>
        <VideoList style={{ marginTop: "64px" }} />
      </div>
      <Loading />
    </>
  );
};

Home.header = true;
export default Home;

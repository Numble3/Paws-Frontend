import { NextPageWithLayout } from "types/common";
import { HomeCategory, HomeVideos } from "components/home";

const Home: NextPageWithLayout = () => {
  return (
    <div className="layout-p">
      <h3 id="sub-title">주간 인기 동영상</h3>
      <HomeCategory />
      <HomeVideos />
    </div>
  );
};

Home.header = { title: "메인 페이지" };
export default Home;

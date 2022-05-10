import { NextPageWithLayout } from "types/common";
import subTitle from "styles/search/index.module.css";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <p>주간 인기 동영상</p>
    </>
  );
};

Home.header = { title: "메인 페이지" };
export default Home;

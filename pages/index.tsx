import type { NextPage } from "next";
import Tab from "components/layout/nav";
import { NextPageWithLayout } from "types/common";

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <main>
        <h1>Paws</h1>
      </main>
    </div>
  );
};

Home.header = { title: "메인 페이지" };
export default Home;

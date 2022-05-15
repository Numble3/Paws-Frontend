import { NextPageWithLayout } from "types/common";
import styles from "styles/error.module.css";
import Image from "next/image";
import { IMAGES } from "lib/assets";

const ErrorPage: NextPageWithLayout = () => {
  return (
    <main className={styles.error}>
      <Image src={IMAGES.DESKTOP} layout="fixed" width={120} height={98} />
      <h2>페이지 로드 불가</h2>
      <p>
        페이지를 로드할 수 없어요 :(
        <br />
        해당 페이지는 브라우저 환경을 지원하지 않아요.
        <br />
        모바일 환경에서 이용해주세요!
      </p>
    </main>
  );
};

ErrorPage.noNav = true;
ErrorPage.back = { color: "gray" };
export default ErrorPage;

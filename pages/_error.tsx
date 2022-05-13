import { IMAGES } from "lib/assets";
import Image from "next/image";
import styles from "styles/error.module.css";
import { NextPageWithLayout } from "types/common";

const ErrorPage: NextPageWithLayout = () => {
  return (
    <main className={styles.error}>
      <Image src={IMAGES.ERROR} layout="fixed" width={120} height={98} />
      <h2>404 ERROR</h2>
      <p>
        페이지를 찾을 수 없어요 :(
        <br />
        존재하지 않거나, 이용할 수 없는 페이지에요.
        <br />
        입력하신 주소가 정확한지 확인해주세요!
      </p>
    </main>
  );
};

ErrorPage.back = { color: "gray" };
ErrorPage.noNav = true;
export default ErrorPage;

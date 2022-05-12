import { useRouter } from "next/router";
import { NextPageWithLayout } from "types/common";
import style from "styles/interest/category.module.css";
import Istyle from "styles/interest/interested.module.css";
import { categories } from "lib/variables";
import BackIcon from "components/icons/back";
import InterestVideo from "components/custom/interset-video";

const InterestedCategory: NextPageWithLayout = () => {
  const router = useRouter();
  const [{ label }] = categories.filter(
    (v) => v.value === router.query.category
  );
  console.log(router);
  return (
    <div className={style.wrapper}>
      <header className={style.header}>
      <div className={style.back}>
        <BackIcon isGray={true} />
      </div>
        <div className={style.title}>
          <h1>{label}</h1>
          <div className={Istyle.info}>
            <span>동영상 38개</span>
            <span className={Istyle.space}>•</span>
            <span>3일 전</span>
          </div>
        </div>
      </header>
      <section className={style.contents}>
        <InterestVideo />
        <InterestVideo />
        <InterestVideo />
        <InterestVideo />
        <InterestVideo />
        <InterestVideo />
        <InterestVideo />
        <InterestVideo />
        <InterestVideo />
      </section>
    </div>
  );
};

export default InterestedCategory;

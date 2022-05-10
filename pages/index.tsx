import { NextPageWithLayout } from "types/common";
import styles from "styles/main.module.css";
import { HeartIcon } from "components/icons";
import { categories } from "lib/variables";
import { CustomCheckBox } from "components/custom";
import { useRouter } from "next/router";

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const { category } = router.query;

  console.log("router", router);

  const onCategoryClick = (value: string | undefined) => {
    router.replace({ query: value ? { category: value } : "" });
  };

  return (
    <div className="layout-p">
      <h3 id="sub-title">주간 인기 동영상</h3>
      <section className={styles.categories}>
        {categories.map((v, i) => (
          <CustomCheckBox
            key={i}
            text={v.label}
            isActive={category === v.value}
            onClick={() => onCategoryClick(v.value)}
          />
        ))}
      </section>
      <section className={styles.videos}>
        {Array.from(Array(10).keys()).map((v) => (
          <div className={styles["video-container"]} key={v}>
            {/* TODO: div -> fetch video thumbnail */}
            <aside className={styles["video-desc"]}>
              <article>
                <h4
                  className={styles.title}
                >{`발로 꼬리 밟아서 화난 고양이 장수`}</h4>
                {/* profile Image */}
                <div className={styles.info}>
                  <div className={styles.profile} />
                  <span>{`다희네우당탕3묘`}</span>
                  <span>{`4년 전`}</span>
                  <span>조회수{`1348`}만 회</span>
                </div>
              </article>
              <article>
                <HeartIcon isLike={true} />
                <span>38만</span>
              </article>
            </aside>
          </div>
        ))}
      </section>
    </div>
  );
};

Home.header = { title: "메인 페이지" };
export default Home;

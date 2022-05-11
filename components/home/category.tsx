import { CustomCheckBox } from "components/custom";
import { categories } from "lib/variables";
import { useRouter } from "next/router";
import styles from "styles/main.module.css";

const HomeCategory = () => {
  const router = useRouter();
  const { category } = router.query;

  const onCategoryClick = (value: string | undefined) => {
    router.replace({ query: value ? { category: value } : "" });
  };

  return (
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
  );
};

export default HomeCategory;

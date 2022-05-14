import { CustomCheckBox } from "components/custom";
import { categories } from "lib/variables";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import styles from "styles/main.module.css";

interface Props {
  setCategory: Dispatch<
    SetStateAction<{ label: string; value: string | undefined }>
  >;
}
const HomeCategory = ({ setCategory }: Props) => {
  const router = useRouter();
  const { category } = router.query;

  const onCategoryClick = ({
    label,
    value,
  }: {
    label: string;
    value: string | undefined;
  }) => {
    setCategory({ label, value });
    router.replace({ query: value ? { category: value } : "" });
  };

  return (
    <section className={styles.categories}>
      {categories.map((v, i) => (
        <CustomCheckBox
          key={i}
          text={v.label}
          isActive={category === v.value}
          onClick={() => onCategoryClick({ label: v.label, value: v.value })}
        />
      ))}
    </section>
  );
};

export default HomeCategory;

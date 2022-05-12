import { HeaderArrow } from "components/icons";
import { useRouter } from "next/router";
import { useCallback } from "react";
import styles from "styles/layout.module.css";
import { LayoutBackArrow } from "types/common";

const LayoutBack = ({ color }: LayoutBackArrow) => {
  const router = useRouter();
  const handleBack = useCallback(() => router.back(), [router]);

  return (
    <aside onClick={handleBack} className={styles.back}>
      <HeaderArrow isWhite={color === "white"} />
    </aside>
  );
};

export default LayoutBack;

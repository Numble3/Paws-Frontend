import styles from "styles/layout.module.css";
import { LayoutHeader } from "types/common";

export default function Header({ title, isBack }: LayoutHeader) {
  //TODO: isBack attach
  return <header className={styles.header}>{title}</header>;
}

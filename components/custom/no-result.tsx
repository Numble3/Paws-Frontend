import styles from "styles/search/noResult.module.css";

interface Props {
  title: string;
  content: string;
}
export default function NoResult({ title, content }: Props) {
  return (
    <div className={styles.wrapper}>
      <h3>{title}</h3>
      <pre>{content}</pre>
    </div>
  );
}

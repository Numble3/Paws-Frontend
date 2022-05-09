import styles from "styles/search/noResult.module.css";

export default function NoResult() {
  return (
    <div className={styles.wrapper}>
      <h3>검색 결과 없음</h3>
      <p>해당 키워드와 관련된 검색결과가 없어요.</p>
      <p>다른 검색어로 다시 시도해보세요!</p>
    </div>
  );
}

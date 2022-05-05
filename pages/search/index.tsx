import Image from "next/image";
import { ICONS, IMAGES } from "lib/assets";
import Header from "components/layout/header";
import styles from "styles/search/index.module.css";
import Link from "next/link";

const Search = () => {
  return (
    <>
      <Header title="검색 및 카테고리" />
      <div className={styles.wrap}>
        <p className={styles.title}>검색어로 찾기</p>
        <div className={styles.search_container}>
          <div>
            <Image src={ICONS.SEARCH} width={11.73} height={12} />
          </div>
          <input className={styles.input} placeholder="검색어를 입력해주세요" />
        </div>
        <div className={styles.border}></div>
        <p className={styles.title}>카테고리로 찾기</p>
        <div className={styles.cate_container}>
          <Link href="/search/whole">
            <a>
              <div className={`${styles.cate} ${styles.cate_whole}`}>
                <span className={styles.cate_name}>전체</span>
              </div>
            </a>
          </Link>
          <Link href="/search/dog">
            <a>
              <div className={`${styles.cate} ${styles.cate_dog}`}>
                <div>
                  <Image width={80} height={60} src={IMAGES.DOG} />
                </div>
                <span className={styles.cate_name}>강아지</span>
              </div>
            </a>
          </Link>
          <Link href="/search/cat">
            <a>
              <div className={`${styles.cate} ${styles.cate_cat}`}>
                <div>
                  <Image width={55} height={70} src={IMAGES.CAT} />
                </div>
                <span className={styles.cate_name}>고양이</span>
              </div>
            </a>
          </Link>
          <Link href="/search/lizard">
            <a>
              <div className={`${styles.cate} ${styles.cate_lizard}`}>
                <div>
                  <Image width={90} height={60} src={IMAGES.LIZARD} />
                </div>
                <span className={styles.cate_name}>도마뱀</span>
              </div>
            </a>
          </Link>
          <Link href="/search/bird">
            <a>
              <div className={`${styles.cate} ${styles.cate_bird}`}>
                <div>
                  <Image width={60} height={70} src={IMAGES.BIRD} />
                </div>
                <span className={styles.cate_name}>새</span>
              </div>
            </a>
          </Link>
          <Link href="/search/rabbit">
            <a>
              <div className={`${styles.cate} ${styles.cate_rabbit}`}>
                <div>
                  <Image width={65} height={80} src={IMAGES.RABBIT} />
                </div>
                <span className={styles.cate_name}>토끼</span>
              </div>
            </a>
          </Link>
          <Link href="/search/hamster">
            <a>
              <div className={`${styles.cate} ${styles.cate_hamster}`}>
                <div>
                  <Image width={60} height={60} src={IMAGES.HAMSTER} />
                </div>
                <span className={styles.cate_name}>햄스터</span>
              </div>
            </a>
          </Link>
          <Link href="/search/etc">
            <a>
              <div className={`${styles.cate} ${styles.cate_whole}`}>
                <span className={styles.cate_name}>기타</span>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Search;

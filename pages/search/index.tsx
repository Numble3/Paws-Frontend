import Image from "next/image";
import { ICONS, IMAGES } from "lib/assets";
import styles from "styles/search/index.module.css";
import Link from "next/link";
import Router from "next/router";
import { KeyboardEvent, useRef, useState } from "react";
import { NextPageWithLayout } from "types/common";

const Search: NextPageWithLayout = () => {
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      Router.push(`/search/result?query=${inputRef.current?.value}`);
    }
  };
  return (
    <>
      <div className={styles.wrap}>
        <p className={styles.search_title}>검색어로 찾기</p>
        <div className={styles.search_container}>
          <div>
            <Image src={ICONS.SEARCH} width={12} height={12} />
          </div>
          <input
            ref={inputRef}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            className={`${styles.input} ${isFocus && styles.input_focused}`}
            placeholder="검색어 입력 후 엔터를 누르세요."
          />
        </div>
        <div className="border-gray" />
        <p className={styles.category_title}>카테고리로 찾기</p>
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
              <div className={`${styles.cate} ${styles.cate_etc}`}>
                <div>
                  <Image width={150} height={90} src={IMAGES.ETC} />
                </div>
                <span className={styles.cate_name}>기타</span>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};
Search.header = { title: "검색 및 카테고리" };

export default Search;

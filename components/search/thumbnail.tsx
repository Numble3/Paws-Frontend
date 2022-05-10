import styles from "styles/search/thumbnail.module.css";
import Image from "next/image";
import { useState } from "react";
import { DotIcon } from "components/icons";
import { HeartIcon } from "components/icons";

interface Props {
  noDot?: boolean;
  noInfo?: boolean;
  onEdit?: () => void;
}

export default function Thumbnail({
  noDot = true,
  noInfo = false,
  onEdit,
}: Props) {
  const [isClick, setIsClick] = useState<boolean>(false);
  return (
    <li className={styles.thumbnail_li}>
      <div className={styles.image_container}>
        <Image
          className={styles.image}
          src="/images/temp.png"
          layout="fill"
          objectFit="cover"
        />
      </div>
      {!noDot && (
        <div onClick={onEdit} className={styles.icon_test}>
          <DotIcon />
        </div>
      )}
      {!noInfo && (
        <div className={styles.text_container}>
          <div className={styles.title_row}>
            <p>발로 꼬리 밟아서 화난 고양이 장수</p>
            <div>
              <Image src="/images/temp.png" width={10} height={10} />
              <span>다희네 우당탕탕 3묘</span>
              <span className={styles.space}>•</span>
              <span>4년 전</span>
              <span className={styles.space}>•</span>
              <span>조회수 1345만 회 </span>
            </div>
          </div>
          <div className={styles.icon_row}>
            <HeartIcon isLike={true} />
            <span>38만</span>
          </div>
        </div>
      )}
    </li>
  );
}

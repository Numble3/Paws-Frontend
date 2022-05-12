import OrangeHeart from "components/icons/orange-heart";
import Image from "next/image";
import { memo } from "react";
import styles from "styles/video.module.css";

interface Props {
  iconPath?: string;
  text: string;
  isHeartActive?: boolean;
  onClickHeart?: () => void;
}

/** 조회수, 시간, 좋아요 표시 버튼 */
const VideoInfoButton = ({
  iconPath,
  text,
  isHeartActive = false,
  onClickHeart,
}: Props) => {
  return (
    <div
      className={`${styles["info-button"]} ${
        isHeartActive ? styles["active-heart"] : ""
      }`}
      onClick={onClickHeart}
    >
      {iconPath ? (
        <Image src={iconPath} width={13} height={13} />
      ) : (
        <OrangeHeart isWhiteFill={isHeartActive} />
      )}
      <span>{text}</span>
    </div>
  );
};

export default memo(VideoInfoButton);

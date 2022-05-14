import {
  VideoCommentsList,
  VideoDescription,
  VideoMyComment,
} from "components/video";
import { useRouter } from "next/router";
import styles from "styles/video.module.css";
import { NextPageWithLayout } from "types/common";

const VideoPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <>
      <div className={styles.container}>
        <div style={{ height: "211px", background: "green" }}></div>
        <VideoDescription />
        <VideoCommentsList videoId={parseInt(pid as string)} />
      </div>
      <VideoMyComment />
    </>
  );
};

VideoPage.noNav = true;
VideoPage.back = { color: "white" };
export default VideoPage;

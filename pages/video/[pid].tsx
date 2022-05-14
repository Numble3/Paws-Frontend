import { getVideoDetail } from "apis/get-video";
import { Loading } from "components/custom";
import EmbedPlayer from "components/custom/embed-player";
import {
  VideoCommentsList,
  VideoDescription,
  VideoMyComment,
} from "components/video";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import styles from "styles/video.module.css";
import { NextPageWithLayout } from "types/common";

const VideoPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { pid } = router.query;

  const { isLoading, data } = useQuery(["videoDetail", pid], () =>
    getVideoDetail(pid as string)
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {data ? (
        <>
          <div className={styles.container}>
            {data.type === "EMBEDDED" ? (
              <EmbedPlayer height={"211"} videoSrc={data.videoUrl} />
            ) : (
              <div style={{ height: "211px", background: "green" }}></div>
            )}
            <VideoDescription {...data} />
            <VideoCommentsList videoId={parseInt(pid as string)} />
          </div>
          <VideoMyComment videoId={pid as string} />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

VideoPage.noNav = true;
VideoPage.back = { color: "white" };
export default VideoPage;

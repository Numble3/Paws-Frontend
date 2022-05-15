import { getVideoDetail } from "apis/get-video";
import { Loading } from "components/custom";
import EmbedPlayer from "components/custom/embed-player";
import HlsPlayer from "components/custom/hls-player";
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
            {data.type === "임베딩 영상" ? (
              <EmbedPlayer videoSrc={data.videoUrl} />
            ) : (
              <div style={{ height: "211px", background: "green" }}>
                <HlsPlayer videoSrc={data.videoUrl} />
              </div>
            )}
            <VideoDescription {...data} />
            <VideoCommentsList
              videoId={pid as string}
              category={data.category}
            />
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

import { getVideoDetail } from "apis/get-video";
import { Loading } from "components/custom";
import EmbedPlayer from "components/custom/embed-player";
import HlsPlayer from "components/custom/hls-player";
import {
  VideoCommentsList,
  VideoDescription,
  VideoMyComment,
} from "components/video";
import { GetServerSideProps } from "next";
import { useQuery } from "react-query";
import styles from "styles/video.module.css";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { pid } = query;
  return {
    props: {
      pid,
    },
  };
};

const VideoPage = ({ pid }: { pid: string }) => {
  const { isLoading, data } = useQuery(["videoDetail", pid], () =>
    getVideoDetail(pid as string)
  );
  if (isLoading) {
    return <Loading />;
  }
  console.log(data);
  return (
    <>
      {data ? (
        <>
          <div className={styles.container}>
            {data.type === "임베딩 영상" ? (
              <EmbedPlayer videoSrc={data.videoUrl} />
            ) : (
              <HlsPlayer videoSrc={data.videoUrl} />
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

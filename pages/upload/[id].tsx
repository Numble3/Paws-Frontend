import { useRouter } from "next/router";
import { getVideoDetail } from "apis/get-video";
import { Loading } from "components/custom";
import { useQuery } from "react-query";
import Direct from "./direct";
import Embed from "./embed";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { id } = query;
  return {
    props: {
      id,
    },
  };
};

const Upload = ({ id }: { id: string }) => {
  const router = useRouter();
  const { isLoading, data } = useQuery(["videoDetail", id], () =>
    getVideoDetail(id as string).catch(() => {
      router.replace("/");
    })
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {data && data.type === "직접 업로드" ? (
        <Direct data={data} videoId={data.id} />
      ) : (
        <Embed data={data} videoId={data.id} />
      )}
    </>
  );
};

Upload.header = { title: "영상 수정" };
Upload.back = { color: "gray" };
export default Upload;

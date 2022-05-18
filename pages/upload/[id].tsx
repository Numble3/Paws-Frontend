import { useRouter } from "next/router";
import { getVideoDetail } from "apis/get-video";
import { Loading } from "components/custom";
import { useQuery } from "react-query";
import Direct from "./direct";
import Embed from "./embed";
import { NextPageWithLayout } from "types/common";

const Upload: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, data } = useQuery(["videoDetail", id], () =>
    getVideoDetail(id as string).catch(() => {
      router.replace("/");
    })
  );
  if (isLoading) {
    return <Loading />;
  }
  console.log(data);
  return (
    <>
      {data && data.type === "직접 업로드" ? <Direct data={data} /> : <Embed />}
    </>
  );
};

Upload.header = { title: "영상 수정" };
Upload.back = { color: "gray" };
export default Upload;

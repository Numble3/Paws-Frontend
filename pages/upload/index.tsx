import Header from "components/layout/header";
import { useRouter } from "next/router";
import Embed from "./embed";
import Direct from "./direct";

const Upload = () => {
  // const router = useRouter();
  // const { method } = router.query;
  const method = "embed";
  let title;
  if (method === "embed") {
    title = "임베드";
  } else {
    title = "직접";
  }
  return (
    <>
      <Header title={`${title} 영상 업로드`} />
      {method === "embed" ? <Embed /> : <Direct />}
    </>
  );
};

export default Upload;

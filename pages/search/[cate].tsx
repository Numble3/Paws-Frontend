import { useRouter } from "next/router";

export default function VideoPlay() {
  const router = useRouter();
  const { cate } = router.query;
  return <p>Video: {cate}</p>;
}

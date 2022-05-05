import { useRouter } from "next/router";

export default function VideoPlay() {
  const router = useRouter();
  const { id } = router.query;
  return <p>Video: {id}</p>;
}

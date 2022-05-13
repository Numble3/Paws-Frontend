import axios from "axios";

export async function getVideos(
  page: number,
  size: number,
  sort: string,
  cate: string
) {
  let category = cate.toUpperCase();

  if (category === "ETC") category = "OTHERS";
  let sortCondition;
  if (sort === "최신순") sortCondition = "LATEST";
  else {
    sortCondition = "POPULARITY";
  }
  try {
    const res = await axios.get("/videos");
    if (res.data) {
      return true;
    }
  } catch (e) {
    return false;
  }
}

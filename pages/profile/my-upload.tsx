import SelectBox from "components/custom/select-box";
import { NextPageWithLayout } from "types/common";
import style from "styles/my-upload.module.css";
import useModal from "hooks/use-modal";
import VideoEditBox from "components/custom/video-edit-box";
import { Loading, VideoList } from "components/custom";
import { useCallback, useEffect, useState } from "react";
import CustomMessage from "components/custom/message";
import useMessage from "hooks/use-message";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import { deleteVideoAPI, getUserVideosAPI } from "apis/accounts";
import { AxiosError } from "axios";
import { useCheck } from "hooks/use-check";
import { VideoListType } from "types/video";
import Video from "components/custom/video";
import { useInView } from "react-intersection-observer";

const MyUploadPage: NextPageWithLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState("LATEST");
  const [target, setTarget] = useState("");
  const [ref, inView] = useInView();

  const { checkModal } = useCheck();
  const queryClient = useQueryClient();

  const onEditHandler = useCallback((e: any) => {
    e.stopPropagation();
    setTarget(e.target.id);
    setIsOpen(true);
  }, []);
  
  const [isOpen, onClose, setIsOpen] = useModal("edit");

  const { getMessage, error } = useMessage();

  const { isLoading, data, fetchNextPage } = useInfiniteQuery<VideoListType[]>(
    ["my-upload"],
    ({ pageParam = 0 }) => getUserVideosAPI(pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (!!lastPage?.[lastPage.length - 1])
          return lastPage?.[lastPage.length - 1];
        return undefined;
      },
    }
  );

  const deleteMutation = useMutation<void, AxiosError, { id: number }>(
    deleteVideoAPI,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("user");
      },
    }
  );

  const onDelete = useCallback(() => {
    deleteMutation.mutate({ id: parseInt(target) });
    onClose();
  }, [deleteMutation]);

  useEffect(() => {
    checkModal();
  }, []);

  useEffect(() => {
    if (inView) {
      console.log("inView가 true");
      fetchNextPage();
    }
  }, [inView]);

  const videoList = data?.pages
    .flat()
    .filter((v) => v && typeof v !== "number");
  const isLastData = data && data.pages[data.pages.length - 1]?.length <= 5;
  const readToLoad = !isLastData && !isLoading;
  console.log("isLastData", isLastData);
  console.log("reaToLoad : ", readToLoad);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={style.wrapper}>
      <div className={style["select-container"]}>
        <SelectBox setSelectedCategory={setSelectedCategory} />
      </div>
      <section style={{ display: "grid", gap: 20 }}>
        {videoList?.map((v: VideoListType, i: number) => (
          <Video key={i} data={v} />
        ))}
        <div
          ref={readToLoad ? ref : undefined}
          style={{ height: 10, backgroundColor: "transparent" }}
        />
      </section>
      {isOpen && <VideoEditBox onClose={onClose} onDelete={onDelete} />}
      {getMessage && <CustomMessage isError={error} />}
    </div>
  );
};
MyUploadPage.header = { title: "업로드 비디오" };

export default MyUploadPage;

import SelectBox from "components/custom/select-box";
import { NextPageWithLayout } from "types/common";
import style from "styles/my-upload.module.css";
import useModal from "hooks/use-modal";
import VideoEditBox from "components/custom/video-edit-box";
import { Loading, VideoList } from "components/custom";
import { useCallback, useEffect, useState } from "react";
import CustomMessage from "components/custom/message";
import useMessage from "hooks/use-message";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { QUERY_KEY } from "lib/query-key";
import { deleteVideoAPI } from "apis/accounts";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import modalSlice from "reducers/modal";
import Router from "next/router";
import { useCheck } from "hooks/use-check";

const MyUploadPage: NextPageWithLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState("LATEST");
  const [target, setTarget] = useState("");

  const { checkModal } = useCheck();
  const queryClient = useQueryClient();

  const onEditHandler = useCallback((e: any) => {
    e.stopPropagation();
    setTarget(e.target.id);
    setIsOpen(true);
  }, []);
  const dispatch = useDispatch();
  const [isOpen, onClose, setIsOpen] = useModal("edit");

  const { getMessage, error } = useMessage();

  const { isLoading, data } = useQuery(
    QUERY_KEY.videos.key,
    QUERY_KEY.videos.api
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
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={style.wrapper}>
      <div className={style["select-container"]}>
        <SelectBox setSelectedCategory={setSelectedCategory} />
      </div>
      <VideoList datas={data.videos} noDot={false} onEdit={onEditHandler} />
      {isOpen && <VideoEditBox onClose={onClose} onDelete={onDelete} />}
      {getMessage && <CustomMessage isError={error} />}
    </div>
  );
};
MyUploadPage.header = { title: "업로드 비디오" };

export default MyUploadPage;

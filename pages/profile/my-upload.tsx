import SelectBox from "components/custom/select-box";
import { NextPageWithLayout } from "types/common";
import style from "styles/my-upload.module.css";
import useModal from "hooks/use-modal";
import VideoEditBox from "components/custom/video-edit-box";
import { Loading, VideoList } from "components/custom";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "reducers";
import CustomMessage from "components/custom/message";
import useMessage from "hooks/use-message";
import { useQuery } from "react-query";
import { QUERY_KEY } from "lib/query-key";

const MyUploadPage: NextPageWithLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState("LATEST");

  const onEditHandler = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  }, []);
  const [isOpen, onClose, setIsOpen] = useModal("edit");

  const { getMessage, error } = useMessage();

  const { isLoading,data } = useQuery("videos", getUserVideosAPI);
  
  if(isLoading) {
    return <Loading />
  }
  console.log(data);
  return (
    <div className={style.wrapper}>
      <div className={style["select-container"]}>
        <SelectBox setSelectedCategory={setSelectedCategory} />
      </div>
      <VideoList datas={data.videos} noDot={false} onEdit={onEditHandler} />
      {isOpen && <VideoEditBox onClose={onClose} />}
      {getMessage && <CustomMessage isError={error} />}
    </div>
  );
};
MyUploadPage.header = { title: "업로드 비디오" };

export default MyUploadPage;

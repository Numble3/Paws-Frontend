import SelectBox from "components/custom/select-box";
import { NextPageWithLayout } from "types/common";
import style from "styles/my-upload.module.css";
import Thumbnail from "components/search/thumbnail";
import useModal from "hooks/use-modal";
import VideoEditBox from 'components/custom/video-edit-box';

const MyUploadPage: NextPageWithLayout = () => {
  const [isOpen, onClose, setIsOpen] = useModal("edit");
  return (
    <div>
      <div className={style["select-container"]}>
        <SelectBox />
      </div>
      <button onClick={() => setIsOpen(true)}>test</button>
      <ul className={style["video-list"]}>
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
      </ul>
      {isOpen && <VideoEditBox onClose={onClose} />}
    </div>
  );
};

MyUploadPage.header = { title: "업로드 비디오" };

export default MyUploadPage;

import SelectBox from "components/custom/select-box";
import { NextPageWithLayout } from "types/common";
import style from "styles/my-upload.module.css";
import Thumbnail from "components/search/thumbnail";
import useModal from "hooks/use-modal";
import VideoEditBox from 'components/custom/video-edit-box';

const MyUploadPage: NextPageWithLayout = () => {
  const [isOpen, onClose, setIsOpen] = useModal("edit");
  return (
    <div className={style.wrapper}>
      <div className={style["select-container"]}>
        <SelectBox />
      </div>
      <ul className={style["video-list"]}>
        <Thumbnail noDot={false} onEdit={() => setIsOpen(true)} />
        <Thumbnail noDot={false} onEdit={() => setIsOpen(true)} />
        <Thumbnail noDot={false} onEdit={() => setIsOpen(true)} />
        <Thumbnail noDot={false} onEdit={() => setIsOpen(true)} />
        <Thumbnail noDot={false} onEdit={() => setIsOpen(true)} />
        <Thumbnail noDot={false} onEdit={() => setIsOpen(true)} />
      </ul>
      {isOpen && <VideoEditBox onClose={onClose} />}
    </div>
  );
};

MyUploadPage.header = { title: "업로드 비디오" };

export default MyUploadPage;

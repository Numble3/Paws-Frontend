import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import styles from "styles/video.module.css";

interface Props {
  videoSrc: string;
}

//TODO: timeline
const HlsPlayer = ({ videoSrc }: Props) => {
  const [play, setPlay] = useState(true);
  const video = useRef<HTMLVideoElement>(null);

  const videoPlay = () => {
    const hls = new Hls();

    //TODO: check buffer error
    if (video && video.current) {
      video.current.src = videoSrc;

      hls.loadSource(videoSrc);
      hls.attachMedia(video.current);
      hls.on(Hls.Events.MANIFEST_PARSED, async () => {
        await video?.current?.play();
      });
    }
  };

  const handleVideo = () => setPlay((p) => !p);

  useEffect(() => {
    videoPlay();
    // console.log("videoSrc", videoSrc);
  }, [videoSrc]);

  // useEffect(() => {
  //   play ? video?.current?.play() : video?.current?.pause();
  // }, [play]);

  return (
    <div className={styles["hls-player"]} onClick={handleVideo}>
      <video ref={video} width={"100%"} height={"100%"} />
      {play && <button className={styles.pause} />}
    </div>
  );
};

export default HlsPlayer;

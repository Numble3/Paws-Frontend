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

      // hls.loadSource("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");
      hls.loadSource(videoSrc);
      hls.attachMedia(video.current);
      // console.log("video", video);
      // video?.current?.play();
      hls.on(Hls.Events.MANIFEST_PARSED, async () => {
        await video?.current?.play();
      });
    }
  };

  const handleVideo = () => setPlay((p) => !p);

  useEffect(() => {
    videoPlay();
  }, [videoSrc]);

  useEffect(() => {
    play ? video?.current?.play() : video?.current?.pause();
  }, [play]);

  return (
    <div className={styles["hls-player"]} onClick={handleVideo}>
      <video ref={video} width={"100%"} height={"100%"} muted={true} autoPlay />
      {!play && <button className={styles.pause} />}
    </div>
  );
};

export default HlsPlayer;

import { useRef } from "react";
import React from "react";
import dynamic from "next/dynamic";

const ReactHlsPlayer = dynamic(() => import("react-hls-player"), {
  ssr: false,
});

interface PlayerProps {
  width?: string;
  height?: string;
  controls?: boolean;
  videoSrc: string;
}
const HlsPlayer = ({
  width = "100%",
  height = "auto",
  controls = true,
  videoSrc,
}: PlayerProps) => {
  const playerRef = useRef<HTMLVideoElement>(null);
  return (
    <ReactHlsPlayer
      src={videoSrc}
      autoPlay={false}
      controls={controls}
      width={width}
      height={height}
      playerRef={playerRef}
    />
  );
};

export default HlsPlayer;

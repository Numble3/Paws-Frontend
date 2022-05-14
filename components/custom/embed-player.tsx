import React from "react";
import ReactPlayer from "react-player";

interface PlayerProps {
  videoSrc: string;
}
const EmbedPlayer = ({ videoSrc }: PlayerProps) => {
  return <ReactPlayer url={videoSrc} width={"100%"} height={211} />;
};

export default EmbedPlayer;

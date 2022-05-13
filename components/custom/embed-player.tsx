import React from "react";

interface PlayerProps {
  width?: string;
  height?: string;
  videoSrc: string;
}
const EmbedPlayer = ({
  width = "100%",
  height = "auto",
  videoSrc,
}: PlayerProps) => {
  const videoId = videoSrc.replace("https://youtu.be/", "");
  const URL = "https://www.youtube.com/embed/" + videoId;
  return (
    <iframe
      width={width}
      height={height}
      src={URL}
      title="YouTube video player"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  );
};

export default EmbedPlayer;

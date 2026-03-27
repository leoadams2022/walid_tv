// VideoPlayer.jsx
import React from "react";
import { useChannels } from "../contexts/ChannelContext";

export default function VideoPlayer({ showControls }) {
  const { currentChannel } = useChannels();

  return (
    <iframe
      className={`w-full absolute left-0 border-none ${showControls ? "h-[calc(100%-48px)] top-12" : "h-full top-0"} transition-all duration-300`}
      src={currentChannel?.url}
      title={currentChannel?.name}
      onError={() => console.error("there was an error loading the iframe")}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}

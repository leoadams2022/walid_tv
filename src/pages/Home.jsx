// HomeTow.jsx
import React from "react";
import VideoPlayer from "../components/VideoPlayer";
import ControlsBar from "../components/ControlsBar";
import ChannelListModal from "../components/ChannelListModal";
import SettingsModal from "../components/SettingsModal";

export default function Home() {
  const [showControls, setShowControls] = React.useState(false);
  const [showChannelList, setShowChannelList] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <div className="w-screen h-svh bg text">
      <div className="size-full relative">
        <VideoPlayer showControls={showControls} />
        <ControlsBar
          showControls={showControls}
          setShowControls={setShowControls}
          setShowChannelList={setShowChannelList}
          setShowSettings={setShowSettings}
        />
      </div>

      <ChannelListModal
        showChannelList={showChannelList}
        setShowChannelList={setShowChannelList}
      />

      <SettingsModal
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
    </div>
  );
}

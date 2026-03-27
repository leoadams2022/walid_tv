// ControlsBar.jsx
import React from "react";
import CenterControls from "./CenterControls";
import RightControls from "./RightControls";
import ToggleButton from "./ToggleButton";

export default function ControlsBar({
  showControls,
  setShowControls,
  setShowChannelList,
  setShowSettings,
}) {
  return (
    <div
      className={`w-full h-12 absolute ${showControls ? "top-0" : "-top-12"} left-0 bg transition-all duration-300 opacity-70`}
    >
      <div className="overflow-x-auto scrollbar-hide">
        <div className="h-12 flex items-center justify-between gap-2 sm:gap-3 md:gap-4 min-w-max px-1">
          <div className="flex items-center gap-2 md:gap-6" />{" "}
          {/* Left controls placeholder */}
          <CenterControls setShowChannelList={setShowChannelList} />
          <RightControls setShowSettings={setShowSettings} />
        </div>
      </div>

      <ToggleButton
        showControls={showControls}
        setShowControls={setShowControls}
      />
    </div>
  );
}

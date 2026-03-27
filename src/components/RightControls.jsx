// RightControls.jsx
import React from "react";
import { Badge } from "flowbite-react";
import { IoSettingsSharp } from "react-icons/io5";
import ControlButton from "./ControlButton";
import { useChannels } from "../contexts/ChannelContext";
import ThemeToggleButton from "./ThemeToggleButton";
import HistoryDropdown from "./HistoryDropdown";
import SleepTimerDropdown from "./SleepTimerDropdown";
import ChannelInfoDropdown from "./ChannelInfoDropdown";

export default function RightControls({ setShowSettings }) {
  const { currentChannel, history, selectChannel } = useChannels();
  const lastCh = currentChannel?.name
    ? history[1]?.name
      ? history[1]
      : null
    : history[0]?.name
      ? history[0]
      : null;

  return (
    <div className="flex items-center gap-2 md:gap-6">
      {currentChannel?.name && (
        <Badge color="success">{currentChannel?.name}</Badge>
      )}
      {lastCh !== null && (
        <Badge
          color="gray"
          className="cursor-pointer"
          onClick={() => selectChannel(lastCh)}
        >
          {lastCh?.name}
        </Badge>
      )}
      <HistoryDropdown />
      <SleepTimerDropdown />
      <ThemeToggleButton />
      <ChannelInfoDropdown currentChannel={currentChannel} />

      <ControlButton
        Icon={() => <IoSettingsSharp className="size-6" />}
        className="flex gap-1"
        onClick={() => setShowSettings(true)}
      />
    </div>
  );
}

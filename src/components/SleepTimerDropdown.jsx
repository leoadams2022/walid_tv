// SleepTimerDropdown.jsx
import React from "react";
import { Dropdown, DropdownItem } from "flowbite-react";
import { GiNightSleep } from "react-icons/gi";
import ControlButton from "./ControlButton";
import { useChannels } from "../contexts/ChannelContext";
import { SLEEP_TIMER_PRESETS } from "../utils/constants";

export default function SleepTimerDropdown() {
  const { setTimer, formatRemainingTime } = useChannels();
  // {timer ? `${timer} min` : "Off"}

  return (
    <Dropdown
      label=""
      renderTrigger={() => (
        <ControlButton
          Icon={() => <GiNightSleep className="size-6" />}
          className="flex gap-1"
        >
          {formatRemainingTime()}
        </ControlButton>
      )}
      className="max-h-72 overflow-auto"
    >
      {SLEEP_TIMER_PRESETS.map((preset) => (
        <DropdownItem
          key={preset.label}
          onClick={() => setTimer(preset.minutes)}
        >
          {preset.label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}

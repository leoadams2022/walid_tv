// HistoryDropdown.jsx
import React from "react";
import { Dropdown, DropdownItem } from "flowbite-react";
import { MdHistory } from "react-icons/md";
import ControlButton from "./ControlButton";
import { useChannels } from "../contexts/ChannelContext";

export default function HistoryDropdown() {
  const { history, selectChannel } = useChannels();

  return (
    <Dropdown
      label=""
      renderTrigger={() => (
        <ControlButton
          Icon={() => <MdHistory className="size-6" />}
          className="flex gap-1"
        >
          History
        </ControlButton>
      )}
      className="max-h-72 overflow-auto"
    >
      {history.slice(1, 11).map((channel, i) => (
        <DropdownItem
          key={channel.id}
          onClick={() => selectChannel(channel)}
          className={`${i > 0 && i <= 9 ? "border-t" : ""}`}
        >
          {channel.name}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}

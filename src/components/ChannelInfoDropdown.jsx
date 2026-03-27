// ChannelInfoDropdown.jsx
import React from "react";
import { Dropdown, DropdownItem } from "flowbite-react";
import { FaInfo } from "react-icons/fa";
import ControlButton from "./ControlButton";
import { copyToClipboard } from "../utils/helpers";

export default function ChannelInfoDropdown({ currentChannel }) {
  if (!currentChannel) return null;

  return (
    <Dropdown
      label=""
      renderTrigger={() => (
        <ControlButton
          Icon={() => <FaInfo className="size-6" />}
          className="flex gap-1"
        ></ControlButton>
      )}
      className="max-h-72 overflow-auto"
    >
      {Object.keys(currentChannel).map((key) => (
        <DropdownItem
          key={key}
          onClick={() => copyToClipboard(currentChannel[key])}
        >
          {key}: {currentChannel[key]}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}

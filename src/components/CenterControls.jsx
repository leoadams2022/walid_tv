// CenterControls.jsx
import React from "react";
import { GiPreviousButton } from "react-icons/gi";
import { GrChannel } from "react-icons/gr";
import ControlButton from "./ControlButton";
import { useChannels } from "../contexts/ChannelContext";

export default function CenterControls({ setShowChannelList }) {
  const { prevChannel, nextChannel } = useChannels();

  return (
    <div className="flex items-center gap-4 md:gap-6">
      <ControlButton
        Icon={() => <GiPreviousButton className="size-6" />}
        tooltipContent="Previous"
        onClick={prevChannel}
      />
      <ControlButton
        Icon={() => <GrChannel className="size-6" />}
        onClick={() => setShowChannelList(true)}
        tooltipContent="Channels"
      />
      <ControlButton
        Icon={() => <GiPreviousButton className="size-6 rotate-180" />}
        tooltipContent="Next"
        onClick={nextChannel}
      />
    </div>
  );
}

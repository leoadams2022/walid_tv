import React from "react";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { GiPreviousButton } from "react-icons/gi";
import ControlButton from "../components/ControlButton";
import { GrChannel } from "react-icons/gr";
import { GiNightSleep } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { FaInfo } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

import { Badge, Dropdown, DropdownItem } from "flowbite-react";
import { SLEEP_TIMER_PRESETS } from "../utils/constants";
import { useChannels } from "../contexts/ChannelContext";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { copyToClipboard } from "../utils/helpers";

export default function HomeTow() {
  const [showControls, setShowControls] = React.useState(false);
  const [showChannelList, setShowChannelList] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const {
    groupNames,
    selectedGroup,
    setSelectedGroup,
    searchQuery,
    setSearchQuery,
    currentChannel,
    timer,
    setTimer,
    nextChannel,
    prevChannel,
    selectChannel,
    history,
  } = useChannels();

  return (
    <div className="w-screen h-svh bg text">
      {/* main player */}
      <div className="size-full relative">
        <VideoPlayer />
        {/* controls */}
        <div
          className={`w-full h-12 absolute ${showControls ? "top-0" : "-top-12"} left-0 bg transition-all duration-300 opacity-70`}
        >
          <div className="overflow-x-auto scrollbar-hide">
            <div className="h-12 flex items-center justify-between gap-2 sm:gap-3 md:gap-4 min-w-max px-1">
              {/* left controls */}
              <div className="flex items-center gap-2 md:gap-6"></div>
              {/* center controls */}
              <div className="flex items-center gap-4 md:gap-6">
                {/* prev button  */}
                <ControlButton
                  Icon={() => <GiPreviousButton className="size-6" />}
                  tooltipContent="Previous"
                  onClick={prevChannel}
                />
                {/* channel list button */}
                <ControlButton
                  Icon={() => <GrChannel className="size-6" />}
                  onClick={() => setShowChannelList(true)}
                />
                {/* next button */}
                <ControlButton
                  Icon={() => (
                    <GiPreviousButton className="size-6 rotate-180" />
                  )}
                  tooltipContent="Next"
                  onClick={nextChannel}
                />
              </div>
              {/* right controls */}
              <div className="flex items-center gap-2 md:gap-6">
                {/* currentChannel  */}
                <Badge color="success">
                  {currentChannel?.name || "Channel"}
                </Badge>
                {/* last channel */}
                <Badge
                  color="gray"
                  className="cursor-pointer"
                  onClick={() => {
                    selectChannel(history[1]);
                  }}
                >
                  {history[1]?.name || "Channel"}
                </Badge>

                {/* history dropdown */}
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
                  {history.slice(0, 10).map((channel, i) => (
                    <DropdownItem
                      key={channel.id}
                      onClick={() => {
                        selectChannel(channel);
                      }}
                      className={`${i > 0 && i <= 9 ? "border-t" : ""}`}
                    >
                      {channel.name}
                    </DropdownItem>
                  ))}
                </Dropdown>

                {/* sleep timer dropdown */}
                <Dropdown
                  label=""
                  renderTrigger={() => (
                    <ControlButton
                      Icon={() => <GiNightSleep className="size-6" />}
                      className="flex gap-1"
                    >
                      {timer ? `${timer} min` : "Off"}
                    </ControlButton>
                  )}
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

                <ThemeToggleButton />

                {/* Channel Info dropdown */}
                {currentChannel && (
                  <Dropdown
                    label=""
                    renderTrigger={() => (
                      <ControlButton
                        Icon={() => <FaInfo className="size-6" />}
                        className="flex gap-1"
                      ></ControlButton>
                    )}
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
                )}

                {/* setttings button  */}
                <ControlButton
                  Icon={() => <IoSettingsSharp className="size-6" />}
                  className="flex gap-1"
                  onClick={() => setShowSettings(true)}
                ></ControlButton>
              </div>
            </div>
          </div>

          {/* //!---------------------------------------------------------------------- */}
          {/* toggle button  */}
          <button
            onClick={() => setShowControls(!showControls)}
            className={`absolute top-full left-1 bg px-2 py-1 rounded-b-xl cursor-pointer opacity-25 hover:opacity-100 transition-all duration-300`}
          >
            <MdOutlineKeyboardDoubleArrowDown
              className={`size-8 ${showControls ? "rotate-180" : ""} transition-all duration-300`}
            />
          </button>
        </div>
      </div>
      {/* channels list */}
      <div
        className={`w-screen h-svh absolute ${showChannelList ? "top-0 opacity-100" : "-top-full opacity-0 pointer-events-none"} left-0 bg-trans flex items-center justify-center transition-all duration-300 `}
        onClick={() => setShowChannelList(false)}
      >
        <div
          className="bg w-[95%] h-[95%] rounded-2xl relative px-2 py-1 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* header  */}
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <input
                type="text"
                className="bg-pop text-pop rounded-sm px-2 order"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="flex items-center gap-2">
                {selectedGroup && (
                  <Badge color="info">{selectedGroup || "General"}</Badge>
                )}
                {currentChannel?.name && (
                  <Badge color="info">
                    {currentChannel?.name || "Channel"}
                  </Badge>
                )}
              </div>
            </div>
            <button
              className="p-2 hover:bg-red-500 cursor-pointer rounded-full"
              onClick={() => setShowChannelList(false)}
            >
              <IoMdClose className="size-4 md:size-8" />
            </button>
          </div>
          {/* main  */}
          <div className="flex-1 overflow-auto">
            <ChannelsList setShowChannelList={setShowChannelList} />
          </div>
          {/* footer  */}
          <div className="flex items-center justify-between border-t pt-2">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 sm:gap-3 md:gap-4 min-w-max px-1">
                {/* All */}
                <Badge
                  onClick={() => setSelectedGroup("all")}
                  color={selectedGroup === "all" ? "info" : "gray"}
                  className="cursor-pointer shrink-0 text-sm font-medium capitalize transition-all duration-300"
                >
                  All
                </Badge>

                {/* Favorites */}
                <Badge
                  onClick={() => setSelectedGroup("favorites")}
                  color={selectedGroup === "favorites" ? "info" : "gray"}
                  className="cursor-pointer shrink-0 text-sm font-medium capitalize transition-all duration-300"
                >
                  Favorites
                </Badge>

                {/* Dynamic Groups */}
                {groupNames.map((groupName) => (
                  <Badge
                    key={groupName}
                    color={selectedGroup === groupName ? "info" : "gray"}
                    onClick={() => setSelectedGroup(groupName)}
                    className="cursor-pointer shrink-0 text-sm font-medium capitalize transition-all duration-300"
                  >
                    {groupName}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* settings  */}
      <div
        className={`w-screen h-svh absolute ${showSettings ? "top-0 opacity-100" : "-top-full opacity-0 pointer-events-none"} left-0 bg-trans flex items-center justify-center transition-all duration-300 `}
        onClick={() => setShowSettings(false)}
      >
        <div
          className="bg w-[95%] h-[95%] rounded-2xl relative px-2 py-1 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* header  */}
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h1 className="text-2xl">Settings</h1>
            </div>
            <button
              className="p-2 hover:bg-red-500 cursor-pointer rounded-full"
              onClick={() => setShowSettings(false)}
            >
              <IoMdClose className="size-4 md:size-8" />
            </button>
          </div>
          {/* main  */}
          <div className="flex-1 overflow-auto"></div>
          {/* footer  */}
          <div className="flex items-center justify-between border-t pt-2"></div>
        </div>
      </div>
    </div>
  );
}
function VideoPlayer() {
  const { currentChannel } = useChannels();
  return (
    <iframe
      className="size-full border-none"
      src={currentChannel?.url}
      title={currentChannel?.name}
      onError={() => console.error("there was an error loading the iframe")}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
}

function ChannelsList({ setShowChannelList }) {
  const {
    filteredChannels,
    selectChannel,
    toggleFavorite,
    favorites,
    selectedGroup,
  } = useChannels();
  const data = selectedGroup === "favorites" ? favorites : filteredChannels;
  if (selectedGroup === "favorites") console.log({ data });

  if (!data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-r-transparent"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading channels...
          </p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">
          No channels available
        </p>
      </div>
    );
  }
  /**
{
    "url": "https://www.elahmad.com/tv/arabic-tv-online.php?id=cima",
    "iconUrl": "https://www.elahmad.com/tv/mobiletv/images/cima.jpg?v=7",
    "name": "Cima TV",
    "id": "0efaf520-9ffd-4d20-9a20-99bf7c7b65fa",
    "groupName": "egypt"
}
 */
  return (
    <div className=" mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">
      <div className="grid  grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 overflow-hidden">
        {data.map((channel) => (
          <div
            key={channel.id}
            className={`grid grid-cols-2 h-26 place-items-stretch gap-2 bg-pop rounded-md hover:scale-105 transition-all duration-300 cursor-pointer`}
            onClick={() => {
              selectChannel(channel);
              setShowChannelList(false);
            }}
          >
            <img
              className="h-26 object-fill rounded-l-md"
              src={channel.iconUrl}
              alt={channel.name}
            />
            <div className="flex sm:flex-col lg:flex-row justify-between py-1 pr-2 overflow-hidden ">
              <div className="flex flex-col justify-between py-4 sm:py-2 md:py-4 ">
                <p className=" line-clamp-1 font-bold text-xl sm:text-sm lg:text-xl">
                  {channel.name}
                </p>
                <p className=" line-clamp-1 font-bold text-sm sm:text-xs lg:text-sm">
                  {channel.groupName}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(channel.id, channel);
                }}
                className={`${channel?.isFavorite ? "text-red-600" : ""} cursor-pointer`}
              >
                <FaHeart className="size-8 sm:size-4 lg:size-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

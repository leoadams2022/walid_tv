// ChannelListModal.jsx
import React from "react";
import { useChannels } from "../contexts/ChannelContext";
import { IoMdClose } from "react-icons/io";
import { Badge } from "flowbite-react";
import { FaHeart } from "react-icons/fa";

export default function ChannelListModal({
  showChannelList,
  setShowChannelList,
}) {
  const { searchQuery, setSearchQuery, selectedGroup, currentChannel } =
    useChannels();

  if (!showChannelList) return null;

  return (
    <div
      className="w-screen h-svh absolute top-0 left-0 bg-trans flex items-center justify-center transition-all duration-300"
      onClick={() => setShowChannelList(false)}
    >
      <div
        className="bg w-[95%] h-[95%] rounded-2xl relative px-2 py-1 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedGroup={selectedGroup}
          currentChannel={currentChannel}
          setShowChannelList={setShowChannelList}
        />

        <div className="flex-1 overflow-auto">
          <ChannelsList setShowChannelList={setShowChannelList} />
        </div>

        <ChannelGroupFilters />
      </div>
    </div>
  );
}

// ModalHeader.jsx
function ModalHeader({
  searchQuery,
  setSearchQuery,
  selectedGroup,
  currentChannel,
  setShowChannelList,
}) {
  return (
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
            <Badge color="info">{currentChannel?.name || "Channel"}</Badge>
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
  );
}

// ChannelGroupFilters.jsx
function ChannelGroupFilters() {
  const { groupNames, selectedGroup, setSelectedGroup } = useChannels();

  return (
    <div className="flex items-center justify-between border-t pt-2">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 sm:gap-3 md:gap-4 min-w-max px-1">
          <Badge
            onClick={() => setSelectedGroup("all")}
            color={selectedGroup === "all" ? "info" : "gray"}
            className="cursor-pointer shrink-0 text-sm font-medium capitalize transition-all duration-300"
          >
            All
          </Badge>

          <Badge
            onClick={() => setSelectedGroup("favorites")}
            color={selectedGroup === "favorites" ? "info" : "gray"}
            className="cursor-pointer shrink-0 text-sm font-medium capitalize transition-all duration-300"
          >
            Favorites
          </Badge>

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
  );
}

// ChannelsList.jsx
function ChannelsList({ setShowChannelList }) {
  const {
    filteredChannels,
    favorites,
    selectedGroup,
    selectChannel,
    toggleFavorite,
  } = useChannels();
  const data = selectedGroup === "favorites" ? favorites : filteredChannels;

  if (!data) {
    return <LoadingSpinner />;
  }

  if (data.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 overflow-hidden">
        {data.map((channel) => (
          <ChannelCard
            key={channel.id}
            channel={channel}
            onSelect={() => {
              selectChannel(channel);
              setShowChannelList(false);
            }}
            onToggleFavorite={() => toggleFavorite(channel)}
          />
        ))}
      </div>
    </div>
  );
}

// LoadingSpinner.jsx
function LoadingSpinner() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <div className="mb-4 inline-block h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-r-transparent"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading channels...</p>
      </div>
    </div>
  );
}

// EmptyState.jsx
function EmptyState() {
  const { selectedGroup } = useChannels();
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <p className="text-gray-600 dark:text-gray-400">
        {selectedGroup === "favorites"
          ? "No Favorite Channels Available"
          : "No Channels Available"}
      </p>
    </div>
  );
}

// ChannelCard.jsx
function ChannelCard({ channel, onSelect, onToggleFavorite }) {
  return (
    <div
      className="grid grid-cols-2 h-26 place-items-stretch gap-2 bg-pop rounded-md hover:scale-105 cursor-pointer transition-all duration-300"
      onClick={onSelect}
    >
      <img
        className="h-26 object-fill rounded-l-md "
        src={channel.iconUrl}
        alt={channel.name}
      />
      <div className="flex sm:flex-col lg:flex-row justify-between py-1 pr-2 overflow-hidden">
        <div className="flex flex-col justify-between py-4 sm:py-2 md:py-4">
          <p className="line-clamp-1 font-bold text-xl sm:text-sm lg:text-xl">
            {channel.name}
          </p>
          <p className="line-clamp-1 font-bold text-sm sm:text-xs lg:text-sm">
            {channel.groupName}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`${channel?.isFavorite ? "text-red-600" : ""} cursor-pointer`}
        >
          <FaHeart className="size-8 sm:size-4 lg:size-6" />
        </button>
      </div>
    </div>
  );
}

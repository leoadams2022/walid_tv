import { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../utils/constants";

const ChannelContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useChannels = () => {
  const context = useContext(ChannelContext);
  if (!context) {
    throw new Error("useChannels must be used within ChannelProvider");
  }
  return context;
};

export const ChannelProvider = ({ children }) => {
  const [channels, setChannels] = useLocalStorage(STORAGE_KEYS.CHANNELS, []);
  const groupNamesHolder = [];
  channels.forEach((channel) => {
    if (!groupNamesHolder.includes(channel.groupName)) {
      groupNamesHolder.push(channel.groupName);
    }
  });
  // console.log(groupNamesHolder);
  const [groupNames, setGroupNames] = useState(groupNamesHolder);
  const [favorites, setFavorites] = useLocalStorage(STORAGE_KEYS.FAVORITES, []);
  console.log(favorites);
  const [lastChannel, setLastChannel] = useLocalStorage(
    STORAGE_KEYS.LAST_CHANNEL,
    null,
  );
  const [history, setHistory] = useLocalStorage(STORAGE_KEYS.HISTORY, []);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [timer, setTimer] = useLocalStorage(STORAGE_KEYS.SLEEP_TIMER, null); // in minutes or null for off;
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  // Get unique groups from channels
  const groups = [
    "all",
    ...new Set(channels.map((c) => c.groupName).filter(Boolean)),
  ];

  // Filter channels based on search and group
  const filteredChannels = channels.filter((channel) => {
    const matchesSearch = channel.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    let matchesGroup;
    if (selectedGroup === "favorites") {
      matchesGroup = channel.isFavorite;
    } else
      matchesGroup =
        selectedGroup === "all" || channel.groupName === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  // Toggle favorite
  const toggleFavorite = (channelId, channel = null) => {
    setChannels((prev) =>
      prev.map((c) =>
        c.id === channelId ? { ...c, isFavorite: !c.isFavorite } : c,
      ),
    );
    if (channel !== null) {
      setFavorites((prev) => {
        const fav = prev.filter((ch) => ch.id === channel.id).length > 0;
        return fav
          ? prev.filter((ch) => ch.id !== channel.id)
          : [...prev, { ...channel, isFavorite: true }];
      });
      return;
    }
    setFavorites((prev) =>
      prev.includes(channelId)
        ? prev.filter((id) => id !== channelId)
        : [...prev, channelId],
    );
  };

  // Add to history
  const addToHistory = (channel) => {
    setHistory((prev) => {
      const filtered = prev.filter((c) => c.id !== channel.id);
      return [channel, ...filtered].slice(0, 50); // Keep last 50
    });
  };

  // Select channel
  const selectChannel = (channel) => {
    setCurrentChannel(channel);
    setLastChannel(channel);
    addToHistory(channel);
  };

  // Navigation
  const nextChannel = () => {
    const currentIndex = filteredChannels.findIndex(
      (c) => c.id === currentChannel?.id,
    );
    if (currentIndex < filteredChannels.length - 1) {
      selectChannel(filteredChannels[currentIndex + 1]);
    }
  };

  const prevChannel = () => {
    const currentIndex = filteredChannels.findIndex(
      (c) => c.id === currentChannel?.id,
    );
    if (currentIndex > 0) {
      selectChannel(filteredChannels[currentIndex - 1]);
    }
  };

  // Load last channel on mount
  useEffect(() => {
    if (lastChannel && !currentChannel) {
      setCurrentChannel(lastChannel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastChannel]);

  // load none on timeout
  useEffect(() => {
    if (timer) {
      const timeout = setTimeout(
        () => {
          setCurrentChannel(null);
          setTimer(null);
        },
        timer * 60 * 1000,
      );
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  return (
    <ChannelContext.Provider
      value={{
        channels,
        setChannels,
        groupNames,
        setGroupNames,
        favorites,
        toggleFavorite,
        currentChannel,
        selectChannel,
        nextChannel,
        prevChannel,
        searchQuery,
        setSearchQuery,
        selectedGroup,
        setSelectedGroup,
        timer,
        setTimer,
        viewMode,
        setViewMode,
        groups,
        filteredChannels,
        history,
        lastChannel,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

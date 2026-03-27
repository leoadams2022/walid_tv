export const STORAGE_KEYS = {
  CHANNELS: "iframe_links_v1",
  FAVORITES: "channel_favorites_v1",
  LAST_CHANNEL: "last_watched_channel_v1",
  HISTORY: "channel_history_v1",
  THEME: "theme_preference_v1",
  SLEEP_TIMER: "sleep_timer_v1",
};

export const SLEEP_TIMER_PRESETS = [
  { label: "1 min", minutes: 1 },
  { label: "15 min", minutes: 15 },
  { label: "30 min", minutes: 30 },
  { label: "1 hour", minutes: 60 },
  { label: "Never", minutes: null },
];

export const KEYBOARD_SHORTCUTS = {
  NEXT: ["ArrowRight", "ArrowDown"],
  PREV: ["ArrowLeft", "ArrowUp"],
  FULLSCREEN: "f",
  THEME: "t",
  SEARCH: "/",
  ESC: "Escape",
};

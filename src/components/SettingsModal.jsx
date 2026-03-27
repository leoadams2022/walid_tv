// SettingsModal.jsx
import React from "react";
import { IoMdClose } from "react-icons/io";

export default function SettingsModal({ showSettings, setShowSettings }) {
  if (!showSettings) return null;

  return (
    <div
      className="w-screen h-svh absolute top-0 left-0 bg-trans flex items-center justify-center transition-all duration-300"
      onClick={() => setShowSettings(false)}
    >
      <div
        className="bg w-[95%] h-[95%] rounded-2xl relative px-2 py-1 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
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

        <div className="flex-1 overflow-auto">
          {/* Settings content goes here */}
        </div>

        <div className="flex items-center justify-between border-t pt-2" />
      </div>
    </div>
  );
}

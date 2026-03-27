// ToggleButton.jsx
import React from "react";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

export default function ToggleButton({ showControls, setShowControls }) {
  return (
    <button
      onClick={() => setShowControls(!showControls)}
      className="absolute top-full left-1 bg px-2 py-1 rounded-b-xl cursor-pointer opacity-25 hover:opacity-100 transition-all duration-300"
    >
      <MdOutlineKeyboardDoubleArrowDown
        className={`size-8 ${showControls ? "rotate-180" : ""} transition-all duration-300`}
      />
    </button>
  );
}

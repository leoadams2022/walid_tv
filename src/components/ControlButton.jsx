import { Tooltip } from "flowbite-react";
import React from "react";

export default function ControlButton({
  className = "",
  tooltipContent = "",
  Icon,
  children,
  ...props
}) {
  return tooltipContent ? (
    <Tooltip content={tooltipContent}>
      <button {...props} className={` cursor-pointer ${className}`}>
        {Icon && <Icon />}
        {children}
      </button>
    </Tooltip>
  ) : (
    <button {...props} className={` cursor-pointer ${className}`}>
      {Icon && <Icon />}
      {children}
    </button>
  );
}

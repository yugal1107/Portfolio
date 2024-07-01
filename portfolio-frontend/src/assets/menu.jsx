import React from "react";

function Menu({onClick , height = "25px", width = "25px", fill = "red"}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 -960 960 960"
      onClick={onClick}
      width={width}
      fill={fill}
    >
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
    </svg>
  );
}

export default Menu;

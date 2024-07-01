import React from "react";

function Close({onClick, height = "25px", width = "25px", fill = "red" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      fill={fill}
    >
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );
}

export default Close;

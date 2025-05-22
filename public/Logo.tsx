import React from "react";

export default function Logo() {
  return (
    <svg
      width="830.7"
      height="230.4"
      viewBox="0 0 830.7 230.4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="830.7" height="230.4" fill="#ffffff" />

      <rect
        x="25"
        y="25"
        width="150"
        height="150"
        rx="13.33"
        ry="13.33"
        fill="#6f4b9b"
      />

      <text
        x="100"
        y="120"
        text-anchor="middle"
        font-family="sans-serif"
        font-size="80"
        font-weight="bold"
        fill="#ffc857"
      >
        GA
      </text>

      <text
        x="200"
        y="125"
        font-family="sans-serif"
        font-size="64"
        font-weight="bold"
      >
        <tspan fill="#6f4b9b">Gallery </tspan>
        <tspan fill="#ffc857">App</tspan>
      </text>
    </svg>
  );
}

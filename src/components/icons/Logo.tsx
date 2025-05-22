import React from "react";

export default function Logo() {
  return (
    <svg
      viewBox="0 0 830.7323 230.4"
      preserveAspectRatio="xMidYMid meet"
      width="187.425"
      height="52.92"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="830.7323" height="230.4" fill="#ffffff" />

      <rect
        x="50"
        y="40"
        width="150"
        height="150"
        rx="13.33"
        ry="13.33"
        fill="#6f4b9b"
      />

      <text
        x="125"
        y="140"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontSize="80"
        fontWeight="bold"
        fill="#ffc857"
      >
        GA
      </text>

      <text
        x="240"
        y="160"
        fontFamily="serif"
        fontSize="120"
        letterSpacing={-3}
        wordSpacing={-5}
      >
        <tspan fill="#6f4b9b">Gallery </tspan>
        <tspan fill="#ffc857">App</tspan>
      </text>
    </svg>
  );
}

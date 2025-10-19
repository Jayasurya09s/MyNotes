// src/Components/MulticolorTitle.jsx
import React, { useEffect, useState } from "react";

// Rainbow colors array
const COLORS = [
  "#FF0000", // red
  "#FF7F00", // orange
  "#FFFF00", // yellow
  "#00FF00", // green
  "#0000FF", // blue
  "#4B0082", // indigo
  "#8F00FF", // violet
];

export default function MulticolorTitle({ text, className }) {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % COLORS.length);
    }, 3000); // change color every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <h1
      className={`font-extrabold mb-4 ${className}`}
      style={{ color: COLORS[colorIndex] }}
    >
      {text}
    </h1>
  );
}

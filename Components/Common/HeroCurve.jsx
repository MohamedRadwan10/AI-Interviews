"use client";
import React, { useState, useEffect } from "react";
import { map } from "lodash-es";
import Xarrow, { Xwrapper } from "react-xarrows";

import { useDarkMode } from "@/Context/DarkModeContext";

const HeroCurve = ({ pathIcons, anchorHeight = "50%", strokeWidth = 2.5 }) => {
  const { isDarkMode } = useDarkMode();
  const pathColor = isDarkMode ? "#3B82F6" : "#0F172A"; // isDarkMode ? brand.accent : dark.primary.1
  
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Xwrapper>
      <div id="hero-start-anchor" className="absolute left-0 w-1 h-1 opacity-0 pointer-events-none" style={{ top: anchorHeight }} />
      <div id="hero-end-anchor" className="absolute right-0 w-1 h-1 opacity-0 pointer-events-none" style={{ top: anchorHeight }} />

      <div className="absolute top-[80%] left-0 w-full h-[200px] sm:h-[300px] md:h-[400px] -translate-y-1/2 z-0 pointer-events-none">
        {map(pathIcons, (item, index) => (
          <div
            key={index}
            id={item.id}
            className={`absolute w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-light-secondary dark:bg-brand-primary flex items-center justify-center shadow-2xl border-4 border-white dark:border-dark-primary-1 z-20 ${item.className}`}
            style={{ transform: "translate(-50%, -50%)" }}
          >
            {item.icon}
          </div>
        ))}
      </div>

      <Xarrow start="hero-start-anchor" end="hero-icon-1" color={pathColor} strokeWidth={strokeWidth} path="smooth" curveness={0.2} showHead={false} animateDrawing={false} />
      <Xarrow start="hero-icon-1" end="hero-icon-2" color={pathColor} strokeWidth={strokeWidth} path="smooth" curveness={0.3} showHead={false} animateDrawing={false} />
      <Xarrow start="hero-icon-2" end="hero-icon-3" color={pathColor} strokeWidth={strokeWidth} path="smooth" curveness={0.3} showHead={false} animateDrawing={false} />
      <Xarrow start="hero-icon-3" end="hero-end-anchor" color={pathColor} strokeWidth={strokeWidth} path="smooth" curveness={0.2} showHead={false} animateDrawing={false} />
    </Xwrapper>
  );
};

export default HeroCurve;

"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

export const Slider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate position as percentage
  const updatePosition = useCallback((clientX: number, rect: DOMRect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  // Mouse move outside the container
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const container = document.getElementById("slider-container");
      if (!container) return;
      updatePosition(e.clientX, container.getBoundingClientRect());
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const container = document.getElementById("slider-container");
      if (!container) return;
      updatePosition(e.touches[0].clientX, container.getBoundingClientRect());
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, updatePosition]);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition((p) => Math.max(0, p - 2));
    } else if (e.key === "ArrowRight") {
      setSliderPosition((p) => Math.min(100, p + 2));
    }
  };

  return (
    <div className="w-full h-full relative select-none ">
      <div
        id="slider-container"
        className="relative w-full h-full max-w-[700px] h-[400px] m-auto overflow-hidden rounded-2xl"
        onMouseDown={handleMouseDown}
        onTouchStart={() => setIsDragging(true)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
      >
        {/* After image */}
        <Image
          alt=""
          fill
          draggable={false}
          priority
          src="/demo_after.png"
          className="object-cover"
        />

        {/* Before image */}
        <div
          className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            alt=""
            fill
            draggable={false}
            priority
            src="/demo_before.jpg"
            className="object-cover"
          />
        </div>

        {/* Divider + Knob */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-md cursor-ew-resize transition-colors duration-150"
          style={{ left: `calc(${sliderPosition}% - 0.5px)` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -left-3 h-6 w-6 rounded-full bg-white border border-gray-300 shadow-lg flex items-center justify-center">
            <div className="h-2 w-2 bg-gray-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

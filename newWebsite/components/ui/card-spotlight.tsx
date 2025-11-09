"use client";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "motion/react";

type CardSpotlightProps = {
  children: React.ReactNode;
  radius?: number;
  color?: string;
  className?: string;
};

export const CardSpotlight: React.FC<CardSpotlightProps> = ({
  children,
  radius = 350,
  color = "#262626",
  className,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-neutral-100 p-8 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, ${color}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

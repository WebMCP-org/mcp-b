"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

export function GlowingEffect({
  blur = 0,
  inactiveZone = 0.7,
  proximity = 0,
  spread = 20,
  variant = "default",
  glow = false,
  className,
  disabled = true,
  movementDuration = 2,
  borderWidth = 1,
}: GlowingEffectProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!divRef.current) return;

      const rect = divRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate distance from center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const distanceFromCenter = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );
      const maxDistance = Math.sqrt(
        Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2)
      );

      // Check if within inactive zone
      if (distanceFromCenter < maxDistance * inactiveZone) {
        setIsHovered(false);
        return;
      }

      // Check if within proximity
      const extendedProximity = proximity;
      const isWithinProximity =
        x >= -extendedProximity &&
        x <= rect.width + extendedProximity &&
        y >= -extendedProximity &&
        y <= rect.height + extendedProximity;

      if (isWithinProximity) {
        setMousePosition({ x, y });
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const element = divRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [disabled, inactiveZone, proximity]);

  const showGlow = glow || (!disabled && isHovered);

  const gradientColors =
    variant === "white"
      ? "rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0.2)"
      : "rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5)";

  return (
    <div
      ref={divRef}
      className={cn("pointer-events-none absolute inset-0 z-10", className)}
      style={{
        maskImage: showGlow
          ? `radial-gradient(${spread}% ${spread}% at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`
          : undefined,
        WebkitMaskImage: showGlow
          ? `radial-gradient(${spread}% ${spread}% at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`
          : undefined,
        opacity: showGlow ? 1 : 0,
        transition: `opacity ${movementDuration}s ease`,
      }}
    >
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `linear-gradient(135deg, ${gradientColors})`,
          filter: blur > 0 ? `blur(${blur}px)` : undefined,
          padding: `${borderWidth}px`,
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />
    </div>
  );
}

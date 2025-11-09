"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { cn } from "@/lib/utils";

type ContactHoverButtonProps = {
  className?: string;
  variant?: "dark" | "light";
  fullWidth?: boolean;
  onClick?: () => void;
};

const CONTACT_URL = "https://zcal.co/alexnahas";

export const ContactHoverButton = ({
  className,
  variant = "dark",
  fullWidth,
  onClick,
}: ContactHoverButtonProps) => {
  const [hovered, setHovered] = useState(false);
  const rainbowGradient =
    "conic-gradient(from 0deg, #ff6b6b, #f8c266, #5cf4b5, #5cb8ff, #b07bff, #ff6b6b)";

  const containerStyles =
    variant === "light"
      ? "bg-white/50"
      : "bg-gradient-to-r from-brand/30 via-slate-500/20 to-fuchsia-400/30 dark:from-white/20 dark:to-white/10";

  const innerStyles =
    variant === "light"
      ? "bg-white text-neutral-900"
      : "bg-neutral-950 text-white dark:bg-white dark:text-neutral-900";

  const baseBackground = variant === "light" ? "#ffffff" : "#030712";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative inline-flex transition-transform duration-200",
        fullWidth && "w-full justify-center",
        className,
      )}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-[4px] -z-10 rounded-full opacity-0 transition-opacity duration-200"
        animate={{ rotate: hovered ? 360 : 0, opacity: hovered ? 1 : 0 }}
        transition={{
          rotate: { duration: 6, repeat: hovered ? Infinity : 0, ease: "linear" },
          opacity: { duration: 0.2 },
        }}
        style={{
          border: "2px solid transparent",
          backgroundImage: `${rainbowGradient}, linear-gradient(${baseBackground}, ${baseBackground})`,
          backgroundOrigin: "border-box",
          backgroundClip: "border-box, padding-box",
        }}
      />
      <Link
        href={CONTACT_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Book time on Alex Nahas’ calendar"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn("inline-flex", fullWidth && "w-full justify-center")}
      >
        <HoverBorderGradient
          as="div"
          duration={1.2}
          containerClassName={cn(
            "shadow-aceternity h-fit rounded-full border-transparent",
            containerStyles,
          )}
          className={cn(
            "flex items-center gap-3 rounded-full px-6 py-2 text-sm font-semibold tracking-tight",
            innerStyles,
          )}
        >
          <span className="tracking-tight">Contact Me</span>
          <ArrowUpRight className="size-4" />
        </HoverBorderGradient>
      </Link>
    </motion.div>
  );
};

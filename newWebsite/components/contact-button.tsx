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
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative inline-flex transition-transform duration-200",
        fullWidth && "w-full justify-center",
        className,
      )}
    >
      <Link
        href={CONTACT_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Book time on Alex Nahas’ calendar"
        onClick={onClick}
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
            "relative flex items-center gap-3 overflow-hidden rounded-full px-6 py-2 text-sm font-semibold tracking-tight",
            innerStyles,
          )}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 w-1/3 min-w-[80px] rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-neutral-200/50"
            animate={{
              x: hovered ? ["-120%", "120%"] : "-130%",
              opacity: hovered ? 1 : 0,
            }}
            transition={{
              duration: hovered ? 1.4 : 0.2,
              ease: "easeInOut",
              repeat: hovered ? Infinity : 0,
            }}
          />
          <span className="tracking-tight">Contact Me</span>
          <ArrowUpRight className="size-4" />
        </HoverBorderGradient>
      </Link>
    </motion.div>
  );
};

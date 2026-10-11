"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Spring physics for the smooth trailing delay
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleLinkHover = () => setIsHovering(true);
    const handleLinkLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Target all interactive elements
    const links = document.querySelectorAll(
      "a, button, input, textarea, .cursor-hover",
    );
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHover);
      link.addEventListener("mouseleave", handleLinkLeave);
    });

    // Re-attach listeners when DOM updates (for dynamic content like chat)
    const observer = new MutationObserver(() => {
      const newLinks = document.querySelectorAll(
        "a, button, input, textarea, .cursor-hover",
      );
      newLinks.forEach((link) => {
        link.addEventListener("mouseenter", handleLinkHover);
        link.addEventListener("mouseleave", handleLinkLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices (mobile/tablet)
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  return (
    <>
      {/* 1. Main Dot (follows instantly) */}
      <motion.div
        className="pointer-events-none fixed z-9999 rounded-full bg-aqua-400 border-2 border-white/50 shadow-lg"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          width: isHovering ? 6 : 8,
          height: isHovering ? 6 : 8,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      />

      {/* 2. Trailing Ring + Name (follows with spring delay) */}
      <motion.div
        className="pointer-events-none fixed z-9998 flex items-center justify-center rounded-full border border-aqua-400/40 bg-aqua-400/5 backdrop-blur-[2px]"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          width: isHovering ? 72 : 48,
          height: isHovering ? 72 : 48,
          borderColor: isHovering
            ? "rgba(34, 211, 238, 0.8)"
            : "rgba(34, 211, 238, 0.4)",
          backgroundColor: isHovering
            ? "rgba(34, 211, 238, 0.15)"
            : "rgba(34, 211, 238, 0.05)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 150, mass: 0.5 }}
      >
        <motion.span
          className="font-mono text-[9px] font-bold tracking-[0.2em] text-aqua-300 uppercase whitespace-nowrap"
          animate={{
            opacity: isHovering ? 0 : 1,
            scale: isHovering ? 0.8 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          Shubham
        </motion.span>
      </motion.div>
    </>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";

export default function NeonCursor() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement[]>([]);
  const [color, setColor] = useState("#00ffff");
  const trailCount = 8;

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "0";
    container.style.top = "0";
    container.style.pointerEvents = "none";
    container.style.zIndex = "9999";
    document.body.appendChild(container);
    rootRef.current = container;

    for (let i = 0; i < trailCount; i++) {
      const d = document.createElement("div");
      d.style.position = "absolute";
      d.style.width = `${12 - i}px`;
      d.style.height = `${12 - i}px`;
      d.style.borderRadius = "50%";
      d.style.background = color;
      d.style.boxShadow = `0 0 ${8 + i * 3}px ${color}`;
      d.style.transform = "translate3d(0,0,0)";
      container.appendChild(d);
      trailRef.current.push(d);
    }

    return () => {
      document.body.removeChild(container);
      trailRef.current = [];
    };
  }, [color]);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      trailRef.current.forEach((el) => {
        el.style.left = `${x - parseInt(el.style.width) / 2}px`;
        el.style.top = `${y - parseInt(el.style.height) / 2}px`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    const onScroll = () => {
      const h = window.innerHeight;
      const y = window.scrollY;
      let newColor = "#00ffff";

      if (y < h * 0.9) newColor = "#00ffff";
      else if (y < h * 1.9) newColor = "#ff00ff";
      else newColor = "#a020ff";

      setColor(newColor);

      trailRef.current.forEach((el) => {
        el.style.background = newColor;
        el.style.boxShadow = `0 0 12px ${newColor}`;
      });
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []); // ✅ removed [color] dependency

  return null;
}

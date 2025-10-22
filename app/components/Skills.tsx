"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  FaJs,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaPython,
} from "react-icons/fa";
import {
  SiMongodb,
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
} from "react-icons/si";

export default function AboutSection() {
  const orbitRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(150);
  const [screenWidth, setScreenWidth] = useState(0);

  // Starry red background
  useEffect(() => {
    const canvas = document.getElementById(
      "about-star-canvas"
    ) as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let stars: unknown[] = [];
    let width = 0,
      height = 0;
    let rafId: number;

    function setupCanvas() {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: 150 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.5,
        alpha: Math.random(),
        twinkle: Math.random() * 0.02 + 0.01,
      }));
    }

    function drawStars() {
      if (!ctx) return;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
      for (const s of stars) {
        s.alpha += s.twinkle * (Math.random() > 0.5 ? 1 : -1);
        s.alpha = Math.max(0.2, Math.min(s.alpha, 1));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,0,0,${s.alpha})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(drawStars);
    }

    setupCanvas();
    drawStars();
    window.addEventListener("resize", setupCanvas);
    return () => {
      window.removeEventListener("resize", setupCanvas);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Adjust orbit radius for smaller screens
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth < 640) setRadius(100); // mobile
      else if (window.innerWidth < 1024) setRadius(120); // tablet
      else setRadius(150); // desktop
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const icons = [
    { Icon: FaReact, color: "text-blue-400" },
    { Icon: FaNodeJs, color: "text-green-400" },
    { Icon: SiMongodb, color: "text-green-600" },
    { Icon: FaJs, color: "text-yellow-400" },
    { Icon: SiTypescript, color: "text-blue-500" },
    { Icon: SiTailwindcss, color: "text-cyan-400" },
    { Icon: FaHtml5, color: "text-orange-500" },
    { Icon: FaCss3Alt, color: "text-blue-600" },
    { Icon: FaGitAlt, color: "text-red-500" },
    { Icon: FaGithub, color: "text-gray-300" },
    { Icon: FaPython, color: "text-yellow-500" },
    { Icon: SiNextdotjs, color: "text-gray-400" },
    { Icon: SiExpress, color: "text-gray-500" },
  ];

  const getIconStyle = (index: number) => {
    const angle = (index / icons.length) * 2 * Math.PI;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return {
      position: "absolute",
      top: `calc(50% + ${y}px)`,
      left: `calc(50% + ${x}px)`,
      transform: "translate(-50%, -50%)",
    };
  };

  return (
    <section className="relative min-h-screen px-6 overflow-hidden flex items-center justify-center">
      <canvas
        id="about-star-canvas"
        className="absolute inset-0 -z-10 w-full h-full"
      />

      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center z-10">
        {/* Left - Orbit */}
        <div
          className={`flex justify-center md:justify-start ${
            screenWidth < 640
              ? "mb-28" // larger gap for mobile (~7rem)
              : screenWidth < 1024
              ? "mb-32" // larger gap for tablet (~8rem)
              : "mb-0" // desktop stays tight
          }`}
        >
          <div
            ref={orbitRef}
            className={`relative ${
              screenWidth < 640
                ? "w-48 h-48"
                : screenWidth < 1024
                ? "w-64 h-64"
                : "w-[400px] h-[400px]"
            } flex items-center justify-center`}
          >
            <h2
              className={`absolute text-4xl md:text-5xl font-bold text-cyan-400 z-10`}
            >
              Skills
            </h2>

            {/* Orbiting icons */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {icons.map(({ Icon, color }, i) => (
                <div
                  key={i}
                  style={getIconStyle(i)}
                  className={`${
                    screenWidth < 640
                      ? "text-xl"
                      : screenWidth < 1024
                      ? "text-2xl"
                      : "text-3xl md:text-4xl"
                  }`}
                >
                  <Icon className={`${color}`} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right - Floating image */}
        <motion.div
          initial={{ opacity: 0, x: screenWidth < 768 ? 0 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          animate={{
            y: screenWidth < 1024 ? [0, -8, 0] : [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 4,
            ease: "easeInOut",
          }}
          className="flex justify-center items-center"
        >
          <div
            className={`relative rounded-2xl shadow-2xl overflow-hidden ${
              screenWidth < 640
                ? "w-64 h-40"
                : screenWidth < 1024
                ? "w-80 h-48"
                : "w-[500px] h-[350px]"
            } hover:scale-105 transition-transform duration-500`}
          >
            <Image
              src="/mp.jpg"
              alt="Developer"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      title: "LockQuest",
      description:
        "A challenge-based password game that tests logic, pattern recognition, and creativity. Each keystroke reveals a new rule—complete all to win!",
      tags: ["CSS", "JavaScript"],
      image: "/LockQuest.png",
      link: "https://github.com/Prjhage/LockQuest",
    },
    {
      title: "Travlio",
      description:
        "Travlio is a modern travel planning app that helps you explore cities, view real-time weather, and organize trip itineraries.",
      tags: ["React", "Next.js", "Tailwind CSS", "Node.js"],
      image: "/Travlio.png",
      link: "https://github.com/Prjhage/Travlio",
    },
    {
      title: "VibeCanvas",
      description: "Mood-Based Quote & Art Generator built with React",
      tags: ["CSS", "JavaScript", "React"],
      image: "/vibecanvas.png",
      link: "https://github.com/Prjhage/VibeCanvas",
    },
    {
      title: "QuizCraft",
      description:
        "QuizCraft is a responsive, theme-toggleable (light/dark mode) quiz application built with React. Test skills in programming languages and CS topics.",
      tags: ["React", "CSS", "JSON"],
      image: "/quizcraft.png",
      link: "https://github.com/Prjhage/QuizCraft-",
    },
    {
      title: "Salary Ai",
      description:
        "Salary AI is a FastAPI-based machine learning app that predicts employee salaries, classifies salary ranges, and identifies career growth clusters.",
      tags: ["Python", "CSS", "React", "FastAPI"],
      image: "/salaryai.png",
      link: "https://github.com/Prjhage/salary-ai",
    },
  ];

  return (
    <section id="projects" className="min-h-screen py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-8 sm:mb-12 text-gradient">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, idx) => (
            <TiltCard key={idx} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ project }) {
  const [hovered, setHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setIsTouchDevice(
      typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    );
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // mobile & tablet
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [15, -15]);
  const rotateY = useTransform(x, [-50, 50], [-15, 15]);
  const textTranslateX = useTransform(x, [-50, 50], [-15, 15]);
  const textTranslateY = useTransform(y, [-50, 50], [-15, 15]);

  const handleMouseMove = (e) => {
    if (isTouchDevice || isSmallScreen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const posX = e.clientX - rect.left - rect.width / 2;
    const posY = e.clientY - rect.top - rect.height / 2;
    x.set(posX);
    y.set(posY);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice || isSmallScreen) return;
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <a href={project.link} target="_blank" rel="noopener noreferrer">
      <motion.div
        className="relative cursor-pointer w-full rounded-2xl overflow-hidden shadow-neon group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          !isTouchDevice && !isSmallScreen
            ? { rotateX, rotateY, perspective: 1000, height: "auto" }
            : {}
        }
       
        whileHover={!isTouchDevice && !isSmallScreen ? { scale: 1.05 } : {}}
        whileTap={isTouchDevice || isSmallScreen ? { scale: 0.97 } : {}}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      >
        {/* Project Image */}
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-2xl"
          animate={
            !isTouchDevice && !isSmallScreen
              ? { opacity: hovered ? 0.6 : 1 }
              : {}
          }
          transition={{ duration: 0.3 }}
        />
        {/* Neon Border */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-cyan-400/70 pointer-events-none z-10"
          animate={{
            opacity: hovered || isTouchDevice || isSmallScreen ? 1 : 0.5,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Overlay text for desktop */}
        {!isTouchDevice && !isSmallScreen && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-6 text-white pointer-events-none z-20"
            style={{ translateX: textTranslateX, translateY: textTranslateY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-shadow-lg">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm mb-3 line-clamp-2 md:line-clamp-3 max-w-xs">
              {project.description}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="px-2 ">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Text below image for mobile & tablet */}
        {(isTouchDevice || isSmallScreen) && (
          <motion.div
            className="mt-3 px-2 sm:px-4 pb-2 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg sm:text-xl font-bold">{project.title}</h3>
            <p className="text-xs sm:text-sm mt-1 line-clamp-3">
              {project.description}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 sm:px-3 sm:py-1 bg-white/20 rounded-full text-xs sm:text-sm backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </a>
  );
}

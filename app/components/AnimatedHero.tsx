"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function AnimatedHero() {
  useEffect(() => {
    const canvas = document.getElementById(
      "about-star-canvas"
    ) as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number | null = null;
    let stars: unknown[] = [];
    let shootingStars: unknown[] = [];
    let width = 0;
    let height = 0;
    const STAR_COUNT_BASE = 150;

    function setupCanvas() {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const areaFactor = (width * height) / (1920 * 1080);
      const count = Math.round(
        STAR_COUNT_BASE * Math.max(0.6, areaFactor) * dpr
      );
      stars = Array.from({ length: count }, createStar);
    }

    function createStar() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        baseRadius: Math.random() * 1.3 + 0.4,
        twinkleSpeed:
          (Math.random() * 0.025 + 0.008) * (Math.random() > 0.5 ? 1 : -1),
        phase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.9 + 0.2,
      };
    }

    function createShootingStar() {
      const sx = Math.random() * width * 0.8;
      const sy = Math.random() * height * 0.4;
      const len = Math.random() * 200 + 150;
      const angle = Math.PI * (0.12 + Math.random() * 0.15);
      const vx = Math.cos(angle) * (10 + Math.random() * 8);
      const vy = Math.sin(angle) * (10 + Math.random() * 8);
      shootingStars.push({
        x: sx,
        y: sy,
        vx,
        vy,
        len,
        life: 0,
        maxLife: Math.random() * 50 + 80,
      });
    }

    function drawShootingStars() {
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        const opacity = 1 - s.life / s.maxLife;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * s.len * 0.1, s.y - s.vy * s.len * 0.1);
        ctx.lineWidth = 2;
        ctx.strokeStyle = `rgba(0,200,255,${opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(0,200,255,1)";
        ctx.stroke();
        ctx.shadowBlur = 0;

        if (s.life > s.maxLife) shootingStars.splice(i, 1);
      }
    }

    function animate() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(function tick() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);

        stars.forEach((s) => {
          s.phase += s.twinkleSpeed;
          const glow = (Math.sin(s.phase) + 1) / 2;
          const r = s.baseRadius + glow * 0.8;
          const a = Math.min(1, s.alpha + glow * 0.4);

          ctx.beginPath();
          ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,150,255,${a})`;
          ctx.fill();

          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 4);
          grad.addColorStop(0, `rgba(0,150,255,${a * 0.25})`);
          grad.addColorStop(1, "rgba(0,150,255,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(s.x, s.y, r * 4, 0, Math.PI * 2);
          ctx.fill();
        });

        if (Math.random() < 0.01) createShootingStar();
        drawShootingStars();

        rafId = requestAnimationFrame(tick);
      });
    }

    function onResize() {
      setupCanvas();
    }

    window.addEventListener("resize", onResize, { passive: true });
    setupCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen relative px-5 py-16 flex items-center justify-center overflow-hidden"
    >
      <canvas
        id="about-star-canvas"
        className="absolute inset-0 -z-20 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        {/* 👇 Profile Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center items-center order-1 md:order-2"
        >
          <motion.img
            src="/my pic2.jpg"
            alt="Prajwal Hage"
            className="h-[240px] sm:h-[280px] md:h-[320px] w-auto rounded-full border-4 border-neonBlue shadow-neonGlow object-cover"
            style={{ borderRadius: "50% / 80%" }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* 👇 Typewriter Text + About Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-black/80 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl shadow-neonGlow order-2 md:order-1 text-center md:text-left"
        >
          {/* 🔹 Typewriter Heading */}
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gradient">
            <Typewriter
              words={["Web Developer", "DSA Enthusiast"]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={60}
              delaySpeed={1500}
            />
          </h2>

          <p className="text-gray-300 mb-4">
            I am <strong>Prajwal Hage</strong>, a passionate{" "}
            <strong>Web Developer</strong> and <strong>DSA enthusiast</strong>.
          </p>
          <p className="text-gray-300 mb-4">
            Currently studying at <strong>PCCOE College, Pune</strong> (3rd
            year, CSE branch).
          </p>
          <p className="text-gray-300">
            I love building immersive web experiences and solving algorithmic
            problems.
          </p>

          <a
            href="/MY resume.pdf"
            download
            className="mt-6 inline-block px-6 py-3 bg-neonBlue text-black font-semibold rounded-xl shadow-neonGlow hover:scale-105 transition-transform duration-300"
          >
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["home", "skills", "projects", "contact"];
      const offset = window.innerHeight * 0.35;
      let current = "home";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (window.scrollY + offset >= el.offsetTop) current = id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sections = ["home", "skills", "projects", "contact"];

  return (
    <nav
      className={`fixed w-full z-50 transition-all ${
        scrolled ? "bg-black/60 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-orbitron text-gradient">Prajwal</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8">
          {sections.map((s) => (
            <li key={s}>
              <a
                href={`#${s}`}
                className={`${
                  active === s
                    ? "text-neonPink scale-105"
                    : "text-white hover:text-neonBlue"
                } transition-all`}
              >
                {s[0].toUpperCase() + s.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="focus:outline-none relative w-8 h-8 flex flex-col justify-between items-center"
          >
            <span
              className={`block h-1 w-full bg-white rounded transform transition duration-300 ${
                mobileOpen ? "rotate-45 translate-y-3" : ""
              }`}
            />
            <span
              className={`block h-1 w-full bg-white rounded transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-1 w-full bg-white rounded transform transition duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-3" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/80 backdrop-blur-md absolute w-full left-0 top-full flex flex-col gap-6 py-6 px-6 z-40"
          >
            {sections.map((s) => (
              <li key={s}>
                <a
                  href={`#${s}`}
                  onClick={() => setMobileOpen(false)}
                  className={`${
                    active === s
                      ? "text-neonPink scale-105"
                      : "text-white hover:text-neonBlue"
                  } text-lg transition-all block`}
                >
                  {s[0].toUpperCase() + s.slice(1)}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}

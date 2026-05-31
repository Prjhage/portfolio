// Smooth reveal animation on scroll for specific elements
const revealElements = document.querySelectorAll(
  ".section-title, .about-card, .project-card, .education-item, .contact-card, .skill-pill"
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => {
  el.classList.add("hidden-reveal");
  revealObserver.observe(el);
});

/* ===== TYPING ANIMATION ===== */
const roles = ["MERN Stack Developer", "DSA Enthusiast"];

let roleIndex = 0;
let charIndex = 0;
const typingElement = document.getElementById("typing");

function typeEffect() {
  if (charIndex < roles[roleIndex].length) {
    typingElement.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(eraseEffect, 2000);
  }
}

function eraseEffect() {
  if (charIndex > 0) {
    typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 60);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, 500);
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);

/* ===== CURSOR ANIMATION ===== */
const cursor = document.querySelector(".cursor");
const cursorBlur = document.querySelector(".cursor-blur");

const mouseCoord = { x: 0, y: 0 };
const cursorPosition = { x: 0, y: 0 };
const blurPosition = { x: 0, y: 0 };
let hasCursorMoved = false;
let isHovered = false;

document.addEventListener("mousemove", (e) => {
  mouseCoord.x = e.clientX;
  mouseCoord.y = e.clientY;
  if (!hasCursorMoved) {
    cursorPosition.x = blurPosition.x = mouseCoord.x;
    cursorPosition.y = blurPosition.y = mouseCoord.y;
    hasCursorMoved = true;
    if (cursor) cursor.style.opacity = "1";
    if (cursorBlur) cursorBlur.style.opacity = "0.15";
  }
});

function updateCursorLoop() {
  requestAnimationFrame(updateCursorLoop);
  if (!hasCursorMoved) return;

  // Lerp cursor (faster, e.g. 0.18 ease for responsiveness)
  cursorPosition.x += (mouseCoord.x - cursorPosition.x) * 0.18;
  cursorPosition.y += (mouseCoord.y - cursorPosition.y) * 0.18;

  // Lerp blur (slower, e.g. 0.05 ease for buttery organic feel)
  blurPosition.x += (mouseCoord.x - blurPosition.x) * 0.05;
  blurPosition.y += (mouseCoord.y - blurPosition.y) * 0.05;

  const scale = isHovered ? 2.2 : 1;
  if (cursor) {
    cursor.style.transform = `translate3d(${cursorPosition.x}px, ${cursorPosition.y}px, 0) translate(-50%, -50%) scale(${scale})`;
  }
  if (cursorBlur) {
    cursorBlur.style.transform = `translate3d(${blurPosition.x}px, ${blurPosition.y}px, 0) translate(-50%, -50%)`;
  }
}
requestAnimationFrame(updateCursorLoop);

/* Grow cursor on interactive elements */
const hoverElements = document.querySelectorAll(
  "a, button, .skill-pill, .project-card, .theme-toggle"
);

hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    isHovered = true;
  });

  el.addEventListener("mouseleave", () => {
    isHovered = false;
  });
});

/* ===== MAGNETIC BUTTON EFFECT ===== */
const magneticBtns = document.querySelectorAll(".project-links a");

magneticBtns.forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)";
  });
});

/* ===== SCROLL INDICATOR ===== */
const scrollIndicator = document.querySelector(".scroll-indicator");

window.addEventListener("scroll", () => {
  if (!scrollIndicator) return;
  if (window.scrollY > 50) {
    scrollIndicator.style.opacity = "0";
    scrollIndicator.style.pointerEvents = "none";
  } else {
    scrollIndicator.style.opacity = "0.6";
    scrollIndicator.style.pointerEvents = "auto";
  }
});

const toggle = document.getElementById("themeToggle");
const line = document.getElementById("pendulumLine");
const orb = document.getElementById("pendulumOrb");
const body = document.body;

let isDragging = false;
let startY = 0;
const pullThreshold = 70; // Distance needed to trigger switch

// Initialize theme
if (localStorage.getItem("theme") === "dark") body.classList.add("dark");

const startDrag = (e) => {
  if (window.innerWidth <= 768) return;
  isDragging = true;
  startY = e.pageY || e.touches[0].pageY;
  toggle.classList.remove("animating");
};

const onDrag = (e) => {
  if (!isDragging) return;

  const currentY = e.pageY || e.touches[0].pageY;
  const distance = Math.max(0, currentY - startY); // Only allow pulling down
  const stretch = distance * 0.5; // Friction effect

  // Apply the stretch visually
  line.style.transform = `scaleY(${1 + stretch / 100})`;
  orb.style.transform = `translateY(${stretch}px)`;

  // Visual feedback when threshold is reached
  if (distance > pullThreshold) {
    orb.style.boxShadow = "0 0 30px var(--accent), 0 0 50px var(--accent)";
  } else {
    orb.style.boxShadow = "0 0 15px var(--accent)";
  }
};

const endDrag = (e) => {
  if (!isDragging) return;

  const currentY = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;
  const distance = currentY - startY;

  // Trigger theme change if pulled far enough
  if (distance > pullThreshold) {
    body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      body.classList.contains("dark") ? "dark" : "light"
    );
  }

  // Snap back animation
  isDragging = false;
  toggle.classList.add("animating");
  line.style.transform = `scaleY(1)`;
  orb.style.transform = `translateY(0)`;
};

// Mouse Events
toggle.addEventListener("mousedown", startDrag);
window.addEventListener("mousemove", onDrag);
window.addEventListener("mouseup", endDrag);

// Touch Events (for mobile)
toggle.addEventListener("touchstart", startDrag);
window.addEventListener("touchmove", onDrag);
window.addEventListener("touchend", endDrag);

toggle.addEventListener("click", () => {
  if (window.innerWidth <= 768) {
    body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      body.classList.contains("dark") ? "dark" : "light"
    );
  }
});

const mobileToggle = document.getElementById("mobileNavToggle");
const navLinks = document.getElementById("navLinks");

mobileToggle.addEventListener("click", () => {
  mobileToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close when clicking link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileToggle.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

if (typeof emailjs !== "undefined") {
  emailjs.init("y8dkHQoBul4k7fSxh");
} else {
  console.warn("EmailJS SDK failed to load. Contact form submissions will be disabled.");
}

const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (typeof emailjs === "undefined") {
      statusText.textContent = " Contact service is unavailable.";
      statusText.style.color = "#ef4444";
      return;
    }

    statusText.textContent = "Sending...";
    statusText.style.color = "#999";

    const params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    emailjs
      .send("service_vipecs1", "template_ujzmybf", params)
      .then(() => {
        statusText.textContent = " Message sent successfully!";
        statusText.style.color = "#22c55e";
        form.reset();

        setTimeout(() => {
          statusText.textContent = "";
        }, 3000);
      })
      .catch((err) => {
        statusText.textContent = " Failed to send message";
        statusText.style.color = "#ef4444";
        console.error(err);

        setTimeout(() => {
          statusText.textContent = "";
        }, 3000);
      });
  });
}

/* ============================================================
   HERO CANVAS — Interactive 2D Particle Network
   Creates a convincing illusion of 3D depth using:
     • 3 parallax depth layers (near / mid / far)
     • Mouse-reactive repulsion with lerp easing
     • Depth-of-field simulation via size + opacity scaling
     • Faint connection lines (desktop only, skipped on mobile)
     • Automatic dark / light mode colour switching
   Wrapped in IIFE so no variable leaks into global scope —
   safe alongside existing cursor, magnetic, and scroll-reveal logic.
   ============================================================ */
(function () {
  'use strict';

  /* ── CONFIG ──────────────────────────────────────────────────
     All tunable values live here so you can tweak easily.     */
  const CFG = {
    PARTICLE_COUNT: 100,      // Total particles rendered (80–120 range)
    CONNECT_DIST: 130,      // Max px gap between particles to draw a line
    MOUSE_RADIUS: 150,      // Radius of mouse influence in px
    REPEL_STRENGTH: 0.9,      // Force multiplier (positive = repel, negative = attract)
    LERP_EASE: 0.07,     // Mouse smoothing: 0.01 = buttery, 0.2 = snappy
    DRIFT_SPEED: 0.25,     // Idle drift speed (px per 60fps frame)

    /* Depth layers — ordered FAR → NEAR
       share    : fraction of PARTICLE_COUNT assigned to this layer
       rMin/rMax: particle radius range (px)
       alpha    : particle opacity  — simulates depth-of-field
       parallax : layer shift per px of mouse offset from canvas centre */
    LAYERS: [
      { share: 0.35, rMin: 1.0, rMax: 1.5, alpha: 0.30, parallax: 0.012 }, // FAR
      { share: 0.40, rMin: 2.0, rMax: 2.0, alpha: 0.55, parallax: 0.028 }, // MID
      { share: 0.25, rMin: 3.0, rMax: 3.0, alpha: 0.85, parallax: 0.048 }, // NEAR
    ],

    LINE_ALPHA_DARK: 0.18,     // Connection line base opacity — dark mode
    LINE_ALPHA_LIGHT: 0.13,     // Connection line base opacity — light mode

    /* Particle colour as [R, G, B] — alpha is applied per-particle */
    COLOR_DARK: [45, 212, 191], // Teal   (#2dd4bf) matches dark  mode accent
    COLOR_LIGHT: [255, 77, 0], // Orange (#ff4d00) matches light mode accent
  };

  /* ── CANVAS SETUP ─────────────────────────────────────────── */
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return; // Guard: silently bail if element not found

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;            // Canvas pixel dimensions, set in resize()
  let particles = [];

  /* Mouse state — raw position and lerped (smooth) position */
  const mouse = { x: 0, y: 0 };
  const smoothMouse = { x: 0, y: 0 };
  let mouseOnPage = false;   // Stays false until first mousemove

  let lastTs = 0;            // Timestamp of last frame (for delta-time)
  let resizeId = null;         // Debounce timer ID for window resize

  /* Cache of the canvas's absolute position on the page */
  const canvasRect = { left: 0, top: 0 };

  function updateCanvasRect() {
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      canvasRect.left = rect.left + window.scrollX;
      canvasRect.top = rect.top + window.scrollY;
    }
  }

  /* ── HELPERS ──────────────────────────────────────────────── */
  const rand = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const isDark = () => document.body.classList.contains('dark');

  /* ── RESIZE (debounced) ───────────────────────────────────── */
  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    updateCanvasRect();
    /* Before the user moves the mouse, lock parallax to neutral (centre) */
    if (!mouseOnPage) {
      mouse.x = smoothMouse.x = W / 2;
      mouse.y = smoothMouse.y = H / 2;
    }
  }

  window.addEventListener('resize', () => {
    clearTimeout(resizeId);
    /* 200 ms debounce: reinitialise particles after resize settles */
    resizeId = setTimeout(() => { resize(); initParticles(); }, 200);
  });

  /* ── PARTICLE FACTORY ─────────────────────────────────────── */
  function makeParticle(layer) {
    const r = rand(layer.rMin, layer.rMax);
    const x = rand(0, W);
    const y = rand(0, H);
    return {
      bx: x,                    // base X — drifts over time
      by: y,                    // base Y — drifts over time
      x,                        // rendered X = bx + parallax + repulsion
      y,                        // rendered Y = by + parallax + repulsion
      vx: (Math.random() - 0.5) * CFG.DRIFT_SPEED, // idle drift velocity X
      vy: (Math.random() - 0.5) * CFG.DRIFT_SPEED, // idle drift velocity Y
      r,                        // radius (fixed — depth-of-field effect)
      alpha: layer.alpha,   // opacity (fixed — depth-of-field effect)
      parallax: layer.parallax // parallax strength for this depth layer
    };
  }

  function initParticles() {
    particles = [];
    CFG.LAYERS.forEach(layer => {
      const count = Math.round(CFG.PARTICLE_COUNT * layer.share);
      for (let i = 0; i < count; i++) {
        particles.push(makeParticle(layer));
      }
    });
  }

  /* ── MOUSE / LEAVE EVENTS ─────────────────────────────────── */
  /* Track cursor position relative to the canvas bounding box */
  document.addEventListener('mousemove', e => {
    mouse.x = e.pageX - canvasRect.left;
    mouse.y = e.pageY - canvasRect.top;
    mouseOnPage = true;
  });

  /* When cursor leaves the window, glide parallax back to neutral */
  document.addEventListener('mouseleave', () => {
    mouseOnPage = false;
    mouse.x = W / 2;
    mouse.y = H / 2;
  });

  /* ── MAIN RENDER LOOP ─────────────────────────────────────── */
  function loop(ts) {
    requestAnimationFrame(loop);

    if (!lastTs) lastTs = ts;
    /* Delta-time: normalise to 60fps baseline, cap at 3× to avoid
       huge jumps after tab visibility is restored.                 */
    const delta = clamp((ts - lastTs) / 16.667, 0.1, 3);
    lastTs = ts;

    ctx.clearRect(0, 0, W, H);

    /* Cache per-frame values */
    const dark = isDark();
    const mobile = window.innerWidth < 768;
    const [pr, pg, pb] = dark ? CFG.COLOR_DARK : CFG.COLOR_LIGHT;
    const lineAlpha = dark ? CFG.LINE_ALPHA_DARK : CFG.LINE_ALPHA_LIGHT;

    /* ── STEP 1: Lerp smooth mouse toward raw mouse position ────
       Multiplying by delta keeps the easing frame-rate independent */
    smoothMouse.x += (mouse.x - smoothMouse.x) * CFG.LERP_EASE * delta;
    smoothMouse.y += (mouse.y - smoothMouse.y) * CFG.LERP_EASE * delta;

    /* Parallax offset = displacement of smooth mouse from canvas centre */
    const pmx = smoothMouse.x - W / 2;
    const pmy = smoothMouse.y - H / 2;

    /* ── STEP 2: Update and draw each particle ───────────────── */
    for (const p of particles) {

      /* 2a. Idle drift — moves the base position every frame */
      p.bx += p.vx * delta;
      p.by += p.vy * delta;

      /* Seamless wrap-around at canvas edges */
      if (p.bx < -6) p.bx = W + 6;
      if (p.bx > W + 6) p.bx = -6;
      if (p.by < -6) p.by = H + 6;
      if (p.by > H + 6) p.by = -6;

      /* 2b. Parallax shift — each depth layer offsets at its own speed,
              giving the illusion that near particles move more than far ones */
      const px = p.bx + pmx * p.parallax;
      const py = p.by + pmy * p.parallax;

      /* 2c. Mouse repulsion — quadratic falloff makes the motion feel
              organic: strong at the cursor tip, easing to zero at the radius edge */
      let rx = 0, ry = 0;
      const dx = px - smoothMouse.x;
      const dy = py - smoothMouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CFG.MOUSE_RADIUS && dist > 0.5) {
        const t = 1 - dist / CFG.MOUSE_RADIUS; // 1 at cursor, 0 at edge
        const force = t * t * CFG.REPEL_STRENGTH * 18; // quadratic falloff
        rx = (dx / dist) * force;
        ry = (dy / dist) * force;
      }

      /* Final rendered position */
      p.x = px + rx;
      p.y = py + ry;

      /* 2d. Draw the particle circle */
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${pr},${pg},${pb},${p.alpha})`;
      ctx.fill();
    }

    /* ── STEP 3: Connection lines (desktop only) ─────────────────
       Uses squared-distance (dsq) to skip the expensive sqrt for every
       pair — only pairs that pass the fast check pay for the sqrt.    */
    if (!mobile) {
      const distSq = CFG.CONNECT_DIST * CFG.CONNECT_DIST;

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const ddx = a.x - b.x;
          const ddy = a.y - b.y;
          const dsq = ddx * ddx + ddy * ddy;

          if (dsq < distSq) {
            /* Fade line as distance grows — no extra sqrt required */
            const fade = 1 - dsq / distSq; // 1 = close together, 0 = at limit
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${pr},${pg},${pb},${lineAlpha * fade})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    }
  }

  /* ── INIT ─────────────────────────────────────────────────── */
  resize();
  initParticles();
  requestAnimationFrame(loop);

})(); /* END: Hero Canvas Particle Network IIFE */

/* ============================================================
   FULL-PAGE AURORA BACKGROUND CANVAS
   Effect: 5 large, slow-drifting radial-gradient "orbs" that
   float on independent sine-wave paths across the whole page —
   a completely different visual language from the hero particle
   network (connected dots vs. glowing aurora blobs).

   Architecture:
   • bgCanvas is position:fixed so it tiles behind ALL sections
   • Each frame it first paints the solid --bg base colour, then
     layers the orbs on top — body:transparent lets it show through
   • Dark mode  → teal + purple palette
   • Light mode → orange + amber palette
   • Delta-time normalised to 60fps; resize debounced at 200ms
   ============================================================ */
(function () {
  'use strict';

  /* ── CONFIG ──────────────────────────────────────────────────
     Adjust orb positions, sizes, drift speed, and opacity here. */
  const CFG = {
    /* Solid background colour rendered first each frame
       (must match the CSS --bg variables so cards/shadows look right) */
    BG_DARK: '#111111',
    BG_LIGHT: '#e5e5e8',

    /* Peak opacity at each orb's centre — keep low (0.08–0.18)
       so content remains fully readable at every scroll depth   */
    OPACITY: 0.13,

    /* Drift amplitude as a fraction of canvas W or H (0.15 = 15%)
       Higher values = wider wandering paths                       */
    DRIFT_AMP: 0.14,

    /* Each orb definition:
         cx / cy   — anchor point as a fraction of canvas W / H (0–1)
         size      — radius as a fraction of min(W, H)
         xFreq     — horizontal sine frequency (rad/s); lower = slower
         yFreq     — vertical   cosine frequency (rad/s)
         xPhase    — initial phase offset (radians) — creates variety
         yPhase    — initial phase offset (radians)              */
    ORBS_DARK: [
      { cx: 0.12, cy: 0.18, size: 0.58, xFreq: 0.11, yFreq: 0.08, xPhase: 0.00, yPhase: 1.20, color: [45, 212, 191] }, // teal
      { cx: 0.82, cy: 0.72, size: 0.62, xFreq: 0.08, yFreq: 0.13, xPhase: 2.10, yPhase: 0.50, color: [139, 92, 246] }, // purple
      { cx: 0.48, cy: 0.92, size: 0.52, xFreq: 0.14, yFreq: 0.10, xPhase: 3.70, yPhase: 2.80, color: [59, 130, 246] }, // blue
      { cx: 0.88, cy: 0.08, size: 0.46, xFreq: 0.10, yFreq: 0.12, xPhase: 5.20, yPhase: 4.10, color: [168, 85, 247] }, // violet
      { cx: 0.28, cy: 0.52, size: 0.50, xFreq: 0.12, yFreq: 0.09, xPhase: 1.50, yPhase: 3.30, color: [45, 212, 191] }, // teal
    ],
    ORBS_LIGHT: [
      { cx: 0.12, cy: 0.18, size: 0.58, xFreq: 0.11, yFreq: 0.08, xPhase: 0.00, yPhase: 1.20, color: [255, 77, 0] }, // orange
      { cx: 0.82, cy: 0.72, size: 0.62, xFreq: 0.08, yFreq: 0.13, xPhase: 2.10, yPhase: 0.50, color: [251, 146, 60] }, // amber
      { cx: 0.48, cy: 0.92, size: 0.52, xFreq: 0.14, yFreq: 0.10, xPhase: 3.70, yPhase: 2.80, color: [252, 200, 60] }, // yellow
      { cx: 0.88, cy: 0.08, size: 0.46, xFreq: 0.10, yFreq: 0.12, xPhase: 5.20, yPhase: 4.10, color: [234, 88, 12] }, // deep orange
      { cx: 0.28, cy: 0.52, size: 0.50, xFreq: 0.12, yFreq: 0.09, xPhase: 1.50, yPhase: 3.30, color: [255, 120, 50] }, // coral
    ],
  };

  /* ── SETUP ──────────────────────────────────────────────── */
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return; // Guard: silently bail if element missing

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;
  let lastTs = 0;
  let resizeId = null;

  const isDark = () => document.body.classList.contains('dark');
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  /* ── RESIZE (debounced 200ms) ───────────────────────────── */
  function resize() {
    /* Use innerWidth/Height since canvas is viewport-fixed */
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', () => {
    clearTimeout(resizeId);
    resizeId = setTimeout(resize, 200);
  });

  /* ── MAIN LOOP ──────────────────────────────────────────── */
  function loop(ts) {
    requestAnimationFrame(loop);

    if (!lastTs) lastTs = ts;
    /* Delta-time normalised to 60fps; capped at 3× to prevent
       large jumps when the tab regains focus after being hidden */
    const delta = clamp((ts - lastTs) / 16.667, 0.1, 3); // eslint-disable-line no-unused-vars
    lastTs = ts;

    /* Time in seconds — drives the sine-wave positions */
    const t = ts / 1000;
    const dark = isDark();
    const orbs = dark ? CFG.ORBS_DARK : CFG.ORBS_LIGHT;

    /* ── STEP 1: Paint solid base colour ────────────────────
       This replaces the body background — canvas IS the bg.  */
    ctx.fillStyle = dark ? CFG.BG_DARK : CFG.BG_LIGHT;
    ctx.fillRect(0, 0, W, H);

    /* ── STEP 2: Draw each aurora orb ───────────────────────
       Each orb is a radial gradient that fades from its peak
       opacity at the centre to fully transparent at the edge. */
    const minDim = Math.min(W, H);

    orbs.forEach(orb => {
      const [r, g, b] = orb.color;

      /* Sine/cosine drift — each axis is independent so paths
         are Lissajous-like curves rather than straight lines   */
      const cx = (orb.cx + Math.sin(t * orb.xFreq + orb.xPhase) * CFG.DRIFT_AMP) * W;
      const cy = (orb.cy + Math.cos(t * orb.yFreq + orb.yPhase) * CFG.DRIFT_AMP) * H;

      /* Orb radius scales with the smaller viewport dimension
         so it looks proportional on any screen size            */
      const radius = orb.size * minDim;

      /* Radial gradient: bright core → transparent edge */
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0.00, `rgba(${r},${g},${b},${CFG.OPACITY})`);       // full at centre
      grad.addColorStop(0.45, `rgba(${r},${g},${b},${CFG.OPACITY * 0.45})`);// mid fade
      grad.addColorStop(1.00, `rgba(${r},${g},${b},0)`);                    // transparent edge

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });
  }

  /* ── INIT ───────────────────────────────────────────────── */
  resize();
  requestAnimationFrame(loop);

})(); /* END: Full-Page Aurora Background IIFE */

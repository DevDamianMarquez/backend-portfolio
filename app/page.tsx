"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────

const SKILLS = [
  { name: "FastAPI", level: 95 },
  { name: "PostgreSQL", level: 88 },
  { name: "Docker", level: 90 },
  { name: "Stripe", level: 85 },
  { name: "JWT / Auth", level: 92 },
  { name: "Redis", level: 80 },
  { name: "Pytest", level: 87 },
  { name: "LLMs", level: 82 },
];

const PROJECTS = [
  {
    id: "examgen",
    name: "ExamGen AI",
    tagline: "SaaS that generates exams with AI",
    tags: ["FastAPI", "PostgreSQL", "Docker", "Stripe", "GPT-4o", "Pytest"],
    bullets: [
      "Production API handling 2k+ req/day with JWT + RBAC auth",
      "Stripe webhooks for subscription billing — $8k in test transactions",
      "Dockerized. 1-command deploy. 85% Pytest coverage.",
    ],
    metrics: [
      { label: "Avg response", value: "<180ms" },
      { label: "Daily reqs", value: "2k+" },
      { label: "Test vol", value: "$8k" },
      { label: "Coverage", value: "85%" },
    ],
    links: [
      { icon: "🟢", label: "Live API Docs", href: "https://examgen-ai.onrender.com/docs#/" },
      //{ icon: "🎥", label: "60s Demo", href: "#" },
      { icon: "💻", label: "GitHub", href: "https://github.com/DevDamianMarquez/examgen_ai" },
    ],
    status: "live",
    color: "#00d4ff",
  },
  {
    id: "gymflow",
    name: "GymFlow",
    tagline: "Multi-tenant SaaS for gym management",
    tags: ["FastAPI", "PostgreSQL", "Docker", "JWT", "Redis", "Railway"],
    bullets: [
      "Multi-tenant architecture with isolated data per gym org",
      "Full billing system + role-based access (admin, trainer, member)",
      "Background jobs with async workers, Redis queue",
    ],
    metrics: [
      { label: "Tenants", value: "Multi" },
      { label: "Auth", value: "RBAC" },
      { label: "Queue", value: "Redis" },
      { label: "Deploy", value: "Railway" },
    ],
    links: [
      //{ icon: "🟢", label: "Live API Docs", href: "#" },
      //{ icon: "🎥", label: "Demo", href: "#" },
      { icon: "💻", label: "GitHub", href: "https://github.com/DevDamianMarquez/GymFlow" },
    ],
    status: "Offline",
    color: "#00ff9d",
  },
];

const STACK_ICONS: Record<string, string> = {
  FastAPI: "⚡",
  PostgreSQL: "🐘",
  Docker: "🐳",
  Stripe: "💳",
  JWT: "🔐",
  Redis: "🔴",
  Pytest: "🧪",
  Railway: "🚂",
  "Ai Integrations": "🧠",
};

// ─── COMPONENTS ────────────────────────────────────────────────────────────

function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "16px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: scrolled
          ? "rgba(8,11,16,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(30,42,56,0.8)" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--accent)", letterSpacing: "0.1em" }}>
        DM<span style={{ color: "var(--text-muted)" }}>.dev</span>
      </div>
      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {["Projects", "Stack", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "var(--text-muted)",
              textDecoration: "none",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            {item}
          </a>
        ))}
        <a
          href="mailto:damianmarquezfreelancer@gmail.com"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "var(--bg)",
            background: "var(--accent)",
            padding: "7px 18px",
            borderRadius: "2px",
            textDecoration: "none",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 700,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; }}
        >
          Hire Me
        </a>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  const [typed, setTyped] = useState("");
  const full = "Python Backend Developer";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= full.length) {
        setTyped(full.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 55);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 clamp(24px, 8vw, 120px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(30,42,56,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(30,42,56,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Corner decorators */}
      <div style={{ position: "absolute", top: "80px", left: "40px", width: "30px", height: "30px", borderTop: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)", opacity: 0.6 }} />
      <div style={{ position: "absolute", bottom: "80px", right: "40px", width: "30px", height: "30px", borderBottom: "1px solid var(--accent)", borderRight: "1px solid var(--accent)", opacity: 0.6 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px" }}>
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}
        >
          <div className="status-dot" />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--green)", letterSpacing: "0.12em" }}>
            AVAILABLE — NOW
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", marginLeft: "8px" }}>
            · GMT-3 · Montevideo
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{
            fontSize: "clamp(52px, 10vw, 100px)",
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            marginBottom: "12px",
          }}
        >
          Damian
          <br />
          <span style={{ color: "var(--accent)", textShadow: "0 0 60px rgba(0,212,255,0.3)" }}>
            Marquez
          </span>
        </motion.h1>

        {/* Typed title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(14px, 2.2vw, 20px)",
            color: "var(--text-secondary)",
            marginBottom: "8px",
            letterSpacing: "0.04em",
          }}
        >
          <span style={{ color: "var(--text-muted)" }}>$ </span>
          {typed}
          <span className="cursor" />
        </motion.div>

        {/* Stack line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            letterSpacing: "0.06em",
            marginBottom: "24px",
          }}
        >
          FastAPI · Docker · Stripe · PostgreSQL · JWT · Redis · LLMs
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          style={{
            fontSize: "clamp(16px, 2vw, 22px)",
            color: "var(--text-secondary)",
            maxWidth: "560px",
            lineHeight: 1.6,
            marginBottom: "44px",
            fontWeight: 400,
          }}
        >
          I ship production APIs that handle{" "}
          <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>auth, payments, and scale</span>.
          {" "}Async-first.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.6 }}
          style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
        >
          <a href="#projects" className="btn-primary">
            ↓ View Live Demos
          </a>
          <a
            href="https://github.com/DevDamianMarquez"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            ⌥ GitHub
          </a>
          <a href="mailto:damianmarquezfreelancer@gmail.com" className="btn-ghost">
            ✉ Email Me
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.15em" }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--accent), transparent)" }}
        />
      </motion.div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      viewport={{ once: true, margin: "-60px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: "var(--surface)",
        border: `1px solid ${hovered ? project.color + "66" : "var(--border)"}`,
        borderRadius: "4px",
        padding: "32px",
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${project.color}18`
          : "none",
        cursor: "default",
      }}
    >
      {/* Glow corner */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: hovered
            ? `linear-gradient(90deg, transparent, ${project.color}, transparent)`
            : "transparent",
          transition: "all 0.35s ease",
        }}
      />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: project.color,
                boxShadow: `0 0 10px ${project.color}`,
                animation: "pulse-dot 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: project.color,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {project.status}
            </span>
          </div>
          <h3 style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "4px" }}>
            {project.name}
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 400 }}>
            {project.tagline}
          </p>
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "2rem",
            opacity: 0.15,
            color: project.color,
            fontWeight: 700,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              padding: "3px 10px",
              border: "1px solid var(--border-bright)",
              borderRadius: "2px",
              color: "var(--text-secondary)",
              background: "var(--surface-2)",
              letterSpacing: "0.04em",
            }}
          >
            {STACK_ICONS[tag] || ""} {tag}
          </span>
        ))}
      </div>

      {/* Bullets */}
      <ul style={{ listStyle: "none", marginBottom: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {project.bullets.map((b, i) => (
          <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <span style={{ color: project.color, fontSize: "0.7rem", marginTop: "4px", flexShrink: 0 }}>▸</span>
            <span style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>{b}</span>
          </li>
        ))}
      </ul>

      {/* Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          background: "var(--border)",
          border: "1px solid var(--border)",
          borderRadius: "3px",
          overflow: "hidden",
          marginBottom: "24px",
        }}
      >
        {project.metrics.map((m) => (
          <div key={m.label} style={{ background: "var(--surface-2)", padding: "12px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 700, color: project.color }}>
              {m.value}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--text-muted)", letterSpacing: "0.08em", marginTop: "2px" }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              padding: "8px 14px",
              border: `1px solid ${hovered ? project.color + "44" : "var(--border-bright)"}`,
              borderRadius: "2px",
              color: hovered ? project.color : "var(--text-secondary)",
              textDecoration: "none",
              letterSpacing: "0.04em",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "var(--surface-2)",
            }}
          >
            <span>{link.icon}</span> {link.label}
          </a>
        ))}
      </div>
    </motion.div>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" style={{ padding: "120px clamp(24px, 8vw, 120px)", position: "relative" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        style={{ marginBottom: "60px" }}
      >
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "12px" }}>
          // 01 — Live Demos
        </div>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "12px" }}>
          Production Systems
        </h2>
        <p style={{ fontSize: "1rem", color: "var(--text-secondary)", maxWidth: "480px", lineHeight: 1.6 }}>
          Real APIs running in production. Not toy projects. Click through to live docs.
        </p>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))", gap: "24px" }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function StackSection() {
  return (
    <section id="stack" style={{ padding: "80px clamp(24px, 8vw, 120px)", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, transparent, rgba(0,212,255,0.02) 50%, transparent)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        style={{ marginBottom: "48px" }}
      >
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "12px" }}>
          // 02 — Stack
        </div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
          Technical Stack
        </h2>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "16px" }}>
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            viewport={{ once: true }}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "3px",
              padding: "18px 22px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "1.1rem" }}>{STACK_ICONS[skill.name] || "◆"}</span>
                <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>{skill.name}</span>
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent)" }}>
                {skill.level}%
              </span>
            </div>
            <div style={{ height: "2px", background: "var(--border)", borderRadius: "1px", overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ delay: i * 0.07 + 0.3, duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, var(--accent), var(--green))",
                  borderRadius: "1px",
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional stack pills */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
        style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "8px" }}
      >
        {["REST APIs", "Webhooks", "CI/CD", "Railway", "Vercel", "Pydantic", "SQLAlchemy", "Alembic", "async/await", "CORS", "Rate Limiting"].map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              padding: "4px 12px",
              border: "1px solid var(--border)",
              borderRadius: "2px",
              color: "var(--text-muted)",
              background: "var(--surface)",
              letterSpacing: "0.04em",
            }}
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" style={{ padding: "80px clamp(24px, 8vw, 120px)" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        style={{ marginBottom: "40px" }}
      >
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "12px" }}>
          // 03 — About
        </div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
          Who I Am
        </h2>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "20px" }}>
            Python backend developer from{" "}
            <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>Montevideo, Uruguay</span> building
            production-grade APIs for SaaS products. I focus on what matters: auth, payments,
            performance, and clean architecture.
          </p>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "20px" }}>
            My work goes from zero to Dockerized, tested, and deployed. I communicate clearly,
            work async, and ship without hand-holding.
          </p>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.75 }}>
            Looking for a{" "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>remote backend role ($3.5k–$4k/mo)</span>{" "}
            with a team that ships fast and trusts the process.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          style={{ display: "flex", flexDirection: "column", gap: "2px" }}
        >
          {[
            { label: "Location", value: "Montevideo, Uruguay" },
            { label: "Timezone", value: "GMT-3" },
            { label: "Availability", value: "Now" },
            { label: "Work style", value: "Async-first, remote" },
            { label: "Engagement", value: "Full-time / Contract" },
            { label: "Languages", value: "Spanish (native), English (B1)" },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "14px 18px",
                background: "var(--surface)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.06em" }}>
                {row.label}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-primary)", textAlign: "right" }}>
                {row.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" style={{ padding: "80px clamp(24px, 8vw, 120px) 120px" }}>
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "4px",
          padding: "clamp(40px, 6vw, 80px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "400px",
            height: "2px",
            background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{ textAlign: "center" }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "16px" }}>
            // 04 — Contact
          </div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: "16px" }}>
            Let's Build Something
          </h2>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", maxWidth: "480px", margin: "0 auto 40px", lineHeight: 1.65 }}>
            I&apos;m open to senior backend roles starting now.
            If you need APIs built right — auth, payments, scale — let&apos;s talk.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }}>
            <a href="mailto:damianmarquezfreelancer@gmail.com" className="btn-primary">
              ✉ damianmarquezfreelancer@gmail.com
            </a>
            <a
              href="https://github.com/DevDamianMarquez"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              ⌥ GitHub
            </a>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap" }}>
            {[
              { label: "Response time", value: "< 24h" },
              { label: "Timezone", value: "GMT-3" },
              { label: "Start date", value: "Now" },
              { label: "Rate", value: "$3.5–4k/mo" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--accent)", fontWeight: 700 }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-muted)", letterSpacing: "0.1em", marginTop: "2px" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "24px clamp(24px, 8vw, 120px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-muted)" }}>
        © 2025 Damian Marquez · Built with Next.js + Framer Motion
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-muted)" }}>
        Montevideo, Uruguay · GMT-3
      </span>
    </footer>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, var(--border), transparent)" }} />
        <ProjectsSection />
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, var(--border), transparent)" }} />
        <StackSection />
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, var(--border), transparent)" }} />
        <AboutSection />
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, var(--border), transparent)" }} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

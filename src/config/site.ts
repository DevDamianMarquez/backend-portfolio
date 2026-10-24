// Everything personal lives here. Edit this file, not the components.
// Links that are empty strings are hidden on the site, so nothing fake ever ships.

export const site = {
  name: "Damian Marquez",
  shortName: "DM",
  role: "Junior Backend Engineer",
  title: "Junior Backend Engineer | Python & FastAPI | AI/LLM Integrations",
  url: "https://damian-backend-portfolio.vercel.app",
  location: "Montevideo, Uruguay",
  timezone: "GMT-3",
  email: "marquezdamianjob@gmail.com",
  phone: "+598 97 161 522",
  whatsapp: "https://wa.me/59897161522",
  github: "https://github.com/DevDamianMarquez",
  linkedin: "https://www.linkedin.com/in/damian-marquez/",
  photo: "/me.jpg", // optional: add public/me.jpg to show a photo in About
  cv: "/cv.pdf", // shown only if public/cv.pdf exists

  intro: "I build backend systems, design APIs, and integrate AI into practical software applications.",
  lookingFor: "Looking for junior backend roles, remote, in Latin America or with international teams.",

  about: [
    "I'm a junior backend developer focused on Python, FastAPI and AI-powered applications. I completed a 10-month full-stack development program at BIOS in 2024 and keep learning by building complete projects end to end.",
    "I enjoy designing APIs, working with relational databases and integrating LLMs into software that solves practical problems.",
    "My work includes Repuesthogar, a catalog platform I built and deployed for a real client, and ExamGen AI, a personal project that generates exams with an LLM.",
    "I'm looking to join a backend team where I can contribute, keep learning from code review, and build reliable, maintainable software.",
  ],

  // Grouped by what I actually use. Backend first; frontend is secondary.
  skills: [
    { group: "Primary backend", items: ["Python", "FastAPI", "REST APIs", "Pydantic", "SQLAlchemy"] },
    { group: "Databases", items: ["PostgreSQL", "SQL", "Database modeling", "Alembic", "Neon"] },
    { group: "Security", items: ["JWT", "Password hashing (bcrypt)", "Authentication & authorization", "Input validation"] },
    { group: "AI engineering", items: ["OpenAI API", "OpenAI-compatible APIs (Groq)", "LLM integrations", "Structured JSON outputs", "Embeddings"] },
    { group: "Infrastructure & tools", items: ["Docker", "Docker Compose", "Nginx", "Git", "GitHub", "Linux", "Render", "Cloudflare", "Cloudinary"] },
  ],
  secondarySkills: { group: "Frontend (secondary)", items: ["React", "TypeScript", "Vite", "Next.js", "Tailwind CSS"] },

  experience: [
    {
      role: "Freelance Developer",
      org: "Independent, clients in Uruguay",
      period: "2026 – Present",
      points: [
        "Built and deployed Repuesthogar (Sep–Oct 2026), a product catalog with an admin panel for a retail store: FastAPI and PostgreSQL API, JWT-protected admin, Cloudinary image uploads, React frontend.",
        "Building a website for a second local business (in progress), iterating with the owner as the scope is defined.",
        "Owned each project end to end: requirements with non-technical owners, data modeling, APIs, deployment, DNS and handover.",
      ],
    },
  ],

  education: [{ name: "Full-Stack Development Program", detail: "BIOS EDU · 10 months · Completed December 2024" }],

  languages: [
    { name: "Spanish", level: "Native" },
    { name: "English", level: "Reading & writing: intermediate · Listening & speaking: basic" },
  ],
} as const;

export type Site = typeof site;

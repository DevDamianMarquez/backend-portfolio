// Project data, separate from the UI.
// Rule for this file: only write what the code, the live site or Damián has confirmed.
// Anything not yet verified goes in `toConfirm` (shown nowhere on the site) instead of the copy.

export type Fact = { value: string; label: string };
export type Section = { title: string; body: string[] };
export type Endpoint = { method: "GET" | "POST" | "DELETE"; path: string; purpose: string; auth: string };
export type Shot = { src: string; alt: string; caption?: string; width: number; height: number };

export type Project = {
  slug: string;
  name: string;
  title: string; // full title used on the case study
  kind: "Client project" | "Personal project";
  period?: string; // shown next to the kind, e.g. "Sep 2026 – Oct 2026"
  summary: string; // one or two sentences, shown on the home card
  links: { label: string; href: string }[];
  role: string;
  layers: { layer: string; items: string[] }[]; // who does what: frontend, API, data, images, hosting
  facts: Fact[];
  highlights: string[]; // three short engineering points for the home card
  sections: Section[];
  api?: Endpoint[];
  pipeline?: { step: string; detail: string }[]; // a real, ordered request flow
  snippet?: { file: string; why: string; code: string };
  decisions: { title: string; body: string }[];
  nextSteps?: string[];
  images: Shot[];
  toConfirm?: string[]; // internal notes, not rendered
};

export const projects: Project[] = [
  {
    slug: "repuesthogar",
    name: "Repuesthogar",
    title: "Repuesthogar — Product Catalog Platform",
    kind: "Client project",
    period: "Sep 2026 – Oct 2026",
    summary:
      "A product catalog with its own admin panel for an appliance and spare-parts store in Pando, Uruguay. 758 products online; customers ask about any item on WhatsApp.",
    links: [{ label: "Live site", href: "https://repuesthogar.com" }],
    role: "Sole developer. Requirements with the owner, data modeling, API, admin panel, public site, deployment and DNS.",
    layers: [
      { layer: "Frontend", items: ["React", "Vite", "TypeScript", "Tailwind CSS", "Cloudflare Pages"] },
      { layer: "Backend API", items: ["Python", "FastAPI", "JWT auth", "Render"] },
      { layer: "Database", items: ["PostgreSQL on Neon", "Alembic migrations"] },
      { layer: "Images", items: ["Cloudinary (upload, storage, delivery)"] },
      { layer: "DNS", items: ["Cloudflare (repuesthogar.com and www)"] },
    ],
    facts: [
      { value: "758", label: "products online" },
      { value: "12", label: "categories" },
      { value: "1", label: "admin user: the owner" },
      { value: "0", label: "carts or payments, by design" },
    ],
    highlights: [
      "FastAPI + PostgreSQL API with JWT-protected admin CRUD",
      "Images uploaded from the admin panel to Cloudinary",
      "Static frontend, API and database hosted separately",
    ],
    sections: [
      {
        title: "The business problem",
        body: [
          "The store sells appliance spare parts (original and compatible), tools and household goods. Its range lived in supplier price lists, so customers could not see what was available without calling or visiting.",
          "Prices change often and many sales start with a question (is this the right part for my model?). The owner wanted a catalog people could browse, with the conversation moving to WhatsApp. Not an online shop.",
        ],
      },
      {
        title: "What I was responsible for",
        body: [
          "Everything technical: turning supplier lists into one consistent product dataset, designing the schema, writing the API, building the public catalog and the admin panel, and deploying all of it on the client's domain.",
        ],
      },
      {
        title: "Backend and API",
        body: [
          "A FastAPI service exposes the catalog to the public site (products and categories, read-only) and protected endpoints for the admin panel to create, update and delete products and upload images.",
          "The schema is defined with SQLAlchemy models and changed only through Alembic migrations, so the database can be recreated or moved without hand-written SQL.",
        ],
      },
      {
        title: "Data and images",
        body: [
          "PostgreSQL runs on Neon. Product records hold name, code, category, description and the image URL.",
          "Photos are uploaded from the admin panel to Cloudinary, which stores them and serves them from its CDN. The API keeps only the URL, so the API server never stores or serves image files.",
        ],
      },
      {
        title: "Admin access and security",
        body: [
          "The admin panel lives on its own route, separate from the public catalog, and requires login. Authentication uses JWT with a hashed password; the owner can change the password from the panel.",
          "Email-based password recovery was left out on purpose: there is one known admin and fewer moving parts to secure.",
        ],
      },
      {
        title: "Deployment",
        body: [
          "The React build is served as static files from Cloudflare Pages. The API runs on Render and connects to Neon. The domain's nameservers moved from the registrar to Cloudflare, and both repuesthogar.com and www point to the same deploy.",
        ],
      },
    ],
    pipeline: [
      { step: "Browser", detail: "Customer opens repuesthogar.com, served by Cloudflare Pages." },
      { step: "Catalog request", detail: "The React app calls the FastAPI API on Render for products and categories." },
      { step: "Database", detail: "The API queries PostgreSQL on Neon and returns JSON." },
      { step: "Images", detail: "Product photos load directly from Cloudinary's CDN." },
      { step: "Inquiry", detail: "The WhatsApp button opens a chat with the product name pre-filled. No backend call." },
    ],
    decisions: [
      {
        title: "A catalog, not a shop",
        body: "No cart, prices or payments. The store already sells through conversations, so the site's job is to start them. Less to build and nothing to keep in sync with a changing price list.",
      },
      {
        title: "Each layer on the service that fits it",
        body: "Static hosting for the frontend, a small API host, managed Postgres and an image CDN. Every piece runs on a free or low-cost tier, which matters for a small business.",
      },
      {
        title: "Images off the API server",
        body: "Cloudinary handles image storage and delivery, so the API stays small and the owner can upload photos straight from the panel.",
      },
      {
        title: "Simple auth for a single admin",
        body: "JWT login, hashed password, change-password screen. Recovery flows were skipped because they add attack surface without value for one known user.",
      },
    ],
    images: [
      {
        src: "/projects/repuesthogar/home.webp",
        alt: "Repuesthogar home page with hero, WhatsApp button and product categories",
        caption: "Public catalog, home page",
        width: 1905,
        height: 990,
      },
    ],
    toConfirm: [
      "Repository is private and was not inspected for this site. Architecture comes from Damián's own description of the project. Confirm endpoint names before adding an API table.",
      "Confirm whether the public catalog has search before mentioning it.",
    ],
  },
  {
    slug: "examgen-ai",
    name: "ExamGen AI",
    title: "ExamGen AI — AI-Powered Exam Generation",
    kind: "Personal project",
    summary:
      "A FastAPI backend that turns a teacher's syllabus into a complete exam with an LLM: questions, answer key and grading rubric, exported as student and teacher PDFs.",
    links: [{ label: "Source on GitHub", href: "https://github.com/DevDamianMarquez/examgen_ai" }],
    role: "Solo project. API design, data model, LLM integration, PDF generation, Docker setup and a React client.",
    layers: [
      { layer: "API", items: ["Python", "FastAPI", "Pydantic", "JWT (python-jose)", "bcrypt (passlib)"] },
      { layer: "Database", items: ["PostgreSQL", "SQLAlchemy 2.0"] },
      { layer: "AI", items: ["OpenAI Python SDK against an OpenAI-compatible endpoint (Groq)", "JSON mode"] },
      { layer: "Documents", items: ["ReportLab"] },
      { layer: "Infrastructure", items: ["Docker", "Docker Compose", "Nginx config"] },
      { layer: "Client", items: ["React", "Vite", "Zustand", "Axios"] },
    ],
    facts: [
      { value: "15", label: "REST endpoints" },
      { value: "6", label: "database tables" },
      { value: "3", label: "question types" },
      { value: "2", label: "PDF versions per exam" },
    ],
    highlights: [
      "LLM output forced to JSON and stored as structured exam data",
      "Every query scoped to the authenticated user",
      "Student and teacher PDFs rendered on demand with ReportLab",
    ],
    sections: [
      {
        title: "Problem and solution",
        body: [
          "Writing exams takes teachers hours, and reusing them invites copying. ExamGen lets a teacher create a subject, paste a syllabus and request an exam by difficulty, number of questions and question types.",
          "The API asks an LLM for the whole exam as JSON, stores it, and renders two PDFs: one for students and one for the teacher with answers and rubric. It can also generate an alternative version of an exam to discourage copying.",
        ],
      },
      {
        title: "Backend architecture",
        body: [
          "The code is split by responsibility: core (settings, database session, security), models (SQLAlchemy), schemas (Pydantic), routers (HTTP layer) and services (exam orchestration, LLM calls, PDF rendering). Routers stay thin; the generation flow lives in exam_service.",
          "Settings are loaded from environment variables with pydantic-settings, so secrets and the model name never live in code.",
        ],
      },
      {
        title: "Authentication and authorization",
        body: [
          "Registration and login return a JWT. Passwords are hashed with bcrypt after a SHA-256 pre-hash, which avoids bcrypt's 72-byte input limit.",
          "Authorization is enforced in the queries themselves: subjects, syllabuses and exams are always filtered by the current user's id, so one user can never read or delete another user's data. Exam generation additionally requires an active subscription, checked by a dedicated dependency.",
        ],
      },
      {
        title: "Data model",
        body: [
          "Six tables: users, subjects, syllabuses, exams, questions and subscriptions. Deleting a subject cascades to its syllabuses and exams.",
          "Each exam keeps the complete LLM response as JSON next to normalized question rows. The JSON is what the PDF renderer reads; the rows make questions individually queryable for the anti-repetition logic.",
        ],
      },
      {
        title: "LLM integration and structured output",
        body: [
          "The prompt carries the subject, level, difficulty, question types, the syllabus text and the exact JSON shape expected. The call uses JSON mode (response_format json_object) so the response parses directly.",
          "The client is the official OpenAI SDK with a configurable base URL and model, currently pointed at Groq. Switching providers is a configuration change, not a code change.",
        ],
      },
      {
        title: "Avoiding repeated questions",
        body: [
          "Before generating, the service collects questions from the latest exams on the same syllabus and adds them to the prompt as topics to avoid.",
          "Embedding storage and a cosine-similarity check (threshold 0.88) are implemented as building blocks for a semantic duplicate filter; they are not yet wired into the generation flow.",
        ],
      },
      {
        title: "PDF generation",
        body: [
          "ReportLab builds the PDF from the stored exam JSON: header with student fields, instructions, questions with options, and, in the teacher version, the answer key, rubric and grading scale. The endpoint streams the file with a proper Content-Disposition filename.",
        ],
      },
      {
        title: "Validation and errors",
        body: [
          "Request bodies are validated with Pydantic: difficulty must be one of three values and question count is limited to 3–50. The API returns 201 on creation, 204 on deletion, 400 for a duplicate email, 401 for bad credentials, 403 without a subscription and 404 for missing or foreign resources.",
        ],
      },
      {
        title: "Running it",
        body: [
          "docker-compose starts PostgreSQL 16 with a health check, the FastAPI backend with live reload and the Vite dev server. An Nginx config is included for serving the built React app and proxying /api to the backend.",
        ],
      },
    ],
    api: [
      { method: "POST", path: "/api/auth/register", purpose: "Create account, returns JWT", auth: "Public" },
      { method: "POST", path: "/api/auth/login", purpose: "Log in, returns JWT", auth: "Public" },
      { method: "GET", path: "/api/auth/me", purpose: "Current user", auth: "JWT" },
      { method: "POST", path: "/api/subjects/", purpose: "Create subject", auth: "JWT" },
      { method: "GET", path: "/api/subjects/", purpose: "List my subjects", auth: "JWT" },
      { method: "POST", path: "/api/subjects/{id}/syllabuses", purpose: "Add syllabus to a subject", auth: "JWT" },
      { method: "POST", path: "/api/exams/generate", purpose: "Generate an exam with the LLM", auth: "JWT + subscription" },
      { method: "GET", path: "/api/exams/{id}", purpose: "Exam with questions", auth: "JWT" },
      { method: "GET", path: "/api/exams/{id}/pdf", purpose: "PDF; ?include_answers=true for teacher version", auth: "JWT" },
      { method: "DELETE", path: "/api/exams/{id}", purpose: "Delete exam", auth: "JWT" },
    ],
    pipeline: [
      { step: "Validate", detail: "Pydantic checks the request; the JWT identifies the user; a dependency confirms an active subscription." },
      { step: "Authorize", detail: "The syllabus must belong to one of the user's subjects, otherwise 403." },
      { step: "Context", detail: "Questions from recent exams on the same syllabus are gathered to steer the model away from them." },
      { step: "Generate", detail: "One chat completion in JSON mode returns questions, answers, rubric and answer key." },
      { step: "Persist", detail: "The full JSON is stored on the exam and each question is saved as its own row, in one transaction." },
      { step: "Render", detail: "PDFs are produced on request from the stored JSON, with or without answers." },
    ],
    snippet: {
      file: "backend/app/core/security.py",
      why: "bcrypt only reads the first 72 bytes of input. Pre-hashing with SHA-256 gives every password a fixed 64-character input, so long passphrases are not silently truncated.",
      code: `def get_password_hash(password: str) -> str:
    safe_password = hashlib.sha256(password.encode()).hexdigest()
    return pwd_context.hash(safe_password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    safe_password = hashlib.sha256(plain_password.encode()).hexdigest()
    return pwd_context.verify(safe_password, hashed_password)`,
    },
    decisions: [
      {
        title: "Store the raw LLM JSON and normalized rows",
        body: "The raw JSON keeps everything the model produced (rubric, answer key) for rendering. Question rows support querying and comparing questions. Some duplication, in exchange for simpler reads on both paths.",
      },
      {
        title: "Provider-agnostic LLM client",
        body: "Using the OpenAI SDK with a configurable base URL means the same code talks to OpenAI or any compatible provider. Cost and speed can change without touching the service.",
      },
      {
        title: "Authorization in the query, not after it",
        body: "Filtering by user_id inside every query means a request for someone else's resource gets a 404 instead of their data.",
      },
      {
        title: "PDFs on demand",
        body: "PDFs are rendered when requested instead of stored. No file storage to manage, and a fix to the template applies to every past exam.",
      },
    ],
    nextSteps: [
      "Validate the LLM response against a Pydantic schema before saving, and retry on malformed output",
      "Wire the embedding similarity check into generation and move vectors to pgvector",
      "Replace create_all with the Alembic migrations already in requirements",
      "Add pytest coverage for auth, ownership checks and the generation service (with the LLM mocked)",
      "Verify webhook signatures for subscription events",
    ],
    images: [],
    toConfirm: [
      "No screenshots yet. Add the dashboard or exam view to public/projects/examgen-ai/ and list them in images.",
      "Not deployed publicly as far as the repo shows; the old portfolio linked a Render docs URL that could not be verified.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

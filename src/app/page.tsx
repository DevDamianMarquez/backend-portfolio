import { Fragment } from "react";
import Link from "next/link";
import { site } from "@/config/site";
import { projects } from "@/data/projects";
import { Avatar } from "@/components/Avatar";
import { CopyEmail } from "@/components/CopyEmail";
import { EndpointTable } from "@/components/ProjectParts";
import { Reveal } from "@/components/Reveal";
import { BrowserShot } from "@/components/Screens";
import { TechChip } from "@/components/TechIcon";
import { publicFileExists } from "@/lib/publicFile";

function SectionTitle({ id, children, lead }: { id: string; children: React.ReactNode; lead?: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <h2 id={id} className="scroll-mt-24 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {children}
      </h2>
      {lead && <p className="mt-3 text-muted">{lead}</p>}
    </div>
  );
}

const btnPrimary =
  "rounded-md bg-accent px-5 py-3 font-semibold text-accent-ink no-underline transition hover:brightness-110";
const btnGhost = "rounded-md border border-line px-5 py-3 font-medium no-underline transition hover:border-muted";
const btnSmall = "rounded-md border border-line px-3.5 py-2 text-sm no-underline transition hover:border-muted";

export default function Home() {
  const hasCv = publicFileExists(site.cv);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:pt-24">
        <div className="min-w-0">
          <h1
            className="rise font-display text-[clamp(2.75rem,7.5vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]"
            style={{ "--i": 0 } as React.CSSProperties}
          >
            {site.name}
          </h1>
          <p className="rise mt-5 text-lg font-medium text-ink/90 sm:text-xl" style={{ "--i": 1 } as React.CSSProperties}>
            {site.title.split(" | ").map((t, i, all) => (
              <Fragment key={t}>
                <span className="whitespace-nowrap">
                  {t}
                  {i < all.length - 1 && (
                    <span aria-hidden className="ml-2.5 text-accent">
                      /
                    </span>
                  )}
                </span>
                {i < all.length - 1 && " "}
              </Fragment>
            ))}
          </p>
          <p className="rise mt-6 max-w-[54ch] text-lg text-muted" style={{ "--i": 2 } as React.CSSProperties}>
            {site.intro}
          </p>
          <p className="rise mt-3 text-sm text-muted" style={{ "--i": 2 } as React.CSSProperties}>
            {site.location} ({site.timezone}). {site.lookingFor}
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--i": 3 } as React.CSSProperties}>
            <a href="#projects" className={btnPrimary}>
              View projects
            </a>
            <a href={site.github} target="_blank" rel="noreferrer" className={btnGhost}>
              GitHub
            </a>
            <a href="#contact" className={btnGhost}>
              Contact
            </a>
            {hasCv && (
              <a href={site.cv} download className={btnGhost}>
                Download CV
              </a>
            )}
          </div>
        </div>

        {/* Index of real work: the fastest way for a recruiter to see what's here */}
        <nav aria-label="Projects" className="rise min-w-0" style={{ "--i": 3 } as React.CSSProperties}>
          <ul className="divide-y divide-line rounded-xl border border-line bg-panel">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="group block px-5 py-4 no-underline">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-lg font-semibold group-hover:text-accent">{p.name}</span>
                    <span className="shrink-0 text-xs text-muted">{p.kind}</span>
                  </span>
                  <span className="mt-1 block text-sm text-muted">{p.highlights[0]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        {/* ---------- Projects ---------- */}
        <section aria-labelledby="projects" className="border-t border-line pt-20">
          <SectionTitle id="projects" lead="One system built for a paying client, one built to go deep on LLM integration.">
            Featured projects
          </SectionTitle>
          <ul className="grid gap-8">
            {projects.map((p, i) => (
              <Reveal as="li" key={p.slug} index={i}>
                <article className="lift grid gap-8 rounded-2xl border border-line bg-panel p-6 sm:p-8 lg:grid-cols-[1fr_1.15fr]">
                  <div className="min-w-0">
                    <p className="text-sm text-muted">
                      {p.kind}
                      {p.period && <> · {p.period}</>}
                    </p>
                    <h3 className="mt-1 font-display text-3xl font-bold tracking-tight">{p.name}</h3>
                    <p className="mt-4 max-w-[58ch] text-ink/85">{p.summary}</p>
                    <ul className="mt-5 space-y-2">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-sm text-ink/85">
                          <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-sm text-muted">{p.layers.flatMap((l) => l.items).slice(0, 9).join(", ")}</p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink no-underline transition hover:brightness-110"
                      >
                        Read the case study
                      </Link>
                      {p.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={btnSmall + " py-2.5"}>
                          {l.label}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="grid min-w-0 content-start gap-5">
                    {p.images[0] ? (
                      <a href={p.links[0]?.href} target="_blank" rel="noreferrer" className="block no-underline">
                        <BrowserShot shot={p.images[0]} url={p.links[0]?.href ?? ""} />
                      </a>
                    ) : p.api ? (
                      <EndpointTable
                        endpoints={p.api.filter((e) => e.path.startsWith("/api/exams") || e.path.endsWith("/login"))}
                        compact
                      />
                    ) : null}
                    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
                      {p.facts.map((f) => (
                        <div key={f.label} className="flex flex-col-reverse bg-panel-2 p-3 sm:p-4">
                          <dt className="mt-1 text-xs leading-snug text-muted">{f.label}</dt>
                          <dd className="font-display text-2xl font-bold tracking-tight text-accent sm:text-3xl">{f.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* ---------- Skills ---------- */}
        <section aria-labelledby="skills" className="pt-24">
          <SectionTitle id="skills" lead="Grouped by what I use in the projects above. Backend first.">
            Technical skills
          </SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {site.skills.map((g, i) => (
              <Reveal key={g.group} index={i} className="rounded-xl border border-line bg-panel p-5">
                <h3 className="font-display text-lg font-semibold">{g.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <li key={t}>
                      <TechChip name={t} />
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
            <Reveal index={site.skills.length} className="rounded-xl border border-dashed border-line p-5">
              <h3 className="font-display text-lg font-semibold text-muted">{site.secondarySkills.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {site.secondarySkills.items.map((t) => (
                  <li key={t}>
                    <TechChip name={t} />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ---------- Experience ---------- */}
        <section aria-labelledby="experience" className="pt-24">
          <SectionTitle id="experience">Experience</SectionTitle>
          <ol className="relative border-l border-line pl-8">
            {site.experience.map((e, i) => (
              <Reveal as="li" key={e.role} index={i} className="relative pb-10 last:pb-0">
                <span aria-hidden className="absolute -left-[39px] top-1.5 size-3.5 rounded-full border-2 border-accent bg-bg" />
                <p className="font-mono text-sm text-accent">{e.period}</p>
                <h3 className="mt-1 font-display text-xl font-semibold">{e.role}</h3>
                <p className="text-muted">{e.org}</p>
                <ul className="mt-4 max-w-[70ch] space-y-2">
                  {e.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-ink/85">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ---------- About ---------- */}
        <section aria-labelledby="about" className="grid gap-10 pt-24 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <SectionTitle id="about">About</SectionTitle>
            <div className="space-y-4">
              {site.about.map((para) => (
                <p key={para} className="max-w-[62ch] text-ink/85">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal index={1} className="grid content-end gap-6">
            <Avatar size={160} />
            <div className="rounded-xl border border-line bg-panel p-6">
              <h3 className="font-display text-lg font-semibold">Education</h3>
              <dl className="mt-4 space-y-1">
                {site.education.map((ed) => (
                  <div key={ed.name}>
                    <dt>{ed.name}</dt>
                    <dd className="text-sm text-muted">{ed.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-xl border border-line bg-panel p-6">
              <h3 className="font-display text-lg font-semibold">Languages</h3>
              <dl className="mt-4 space-y-3">
                {site.languages.map((l) => (
                  <div key={l.name} className="flex items-baseline justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
                    <dt>{l.name}</dt>
                    <dd className="text-right text-sm text-muted">{l.level}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </section>

        {/* ---------- Contact ---------- */}
        <section aria-labelledby="contact" className="pt-24">
          <Reveal className="rounded-2xl border border-line bg-panel p-8 sm:p-12">
            <h2 id="contact" className="scroll-mt-24 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Contact
            </h2>
            <p className="mt-3 max-w-[55ch] text-muted">
              Hiring for a junior backend role? Email is the fastest way to reach me. I usually reply within a day.
            </p>
            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-muted">Email</dt>
                <dd className="select-all break-all font-display text-xl font-semibold sm:text-2xl">{site.email}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Phone / WhatsApp</dt>
                <dd className="select-all font-display text-xl font-semibold sm:text-2xl">{site.phone}</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={`mailto:${site.email}`} className={btnPrimary}>
                Email me
              </a>
              <CopyEmail email={site.email} />
              <a href={site.whatsapp} target="_blank" rel="noreferrer" className={btnSmall}>
                WhatsApp
              </a>
              <a href={site.github} target="_blank" rel="noreferrer" className={btnSmall}>
                GitHub
              </a>
              {site.linkedin && (
                <a href={site.linkedin} target="_blank" rel="noreferrer" className={btnSmall}>
                  LinkedIn
                </a>
              )}
              {hasCv && (
                <a href={site.cv} download className={btnSmall}>
                  Download CV
                </a>
              )}
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}

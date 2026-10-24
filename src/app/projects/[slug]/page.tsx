import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/data/projects";
import { site } from "@/config/site";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { EndpointTable, Layers, Pipeline } from "@/components/ProjectParts";
import { Screens } from "@/components/Screens";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.title, description: project.summary, url: `/projects/${project.slug}` },
  };
}

// A drawn diagram where one exists; otherwise the ordered pipeline.
const diagrams: Record<string, React.ComponentType> = {
  repuesthogar: ArchitectureDiagram,
};

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl font-bold tracking-tight sm:text-[1.75rem]">{children}</h2>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const Diagram = diagrams[project.slug];
  const others = projects.filter((p) => p.slug !== project.slug);

  return (
    <article className="mx-auto max-w-6xl px-4 sm:px-8">
      <p className="pt-10 text-[0.95rem]">
        <Link href="/#projects" className="text-muted underline decoration-line hover:text-ink">
          Back to projects
        </Link>
      </p>

      {/* Title */}
      <header className="grid gap-10 pb-12 pt-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="min-w-0">
          <p className="text-sm text-muted">{project.kind}</p>
          <h1 className="mt-2 font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg">{project.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink no-underline transition hover:brightness-110"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div className="min-w-0 self-end">
          <h2 className="text-sm font-medium text-muted">My role</h2>
          <p className="mt-1">{project.role}</p>
        </div>
      </header>

      <Screens project={project} />

      {/* Facts */}
      <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
        {project.facts.map((f) => (
          <div key={f.label} className="flex flex-col-reverse bg-panel p-5">
            <dt className="mt-1 text-sm text-muted">{f.label}</dt>
            <dd className="font-display text-4xl font-bold tracking-tight text-accent">{f.value}</dd>
          </div>
        ))}
      </dl>

      {/* Who does what */}
      <section className="grid gap-6 pt-16 lg:grid-cols-[1fr_1.6fr]">
        <H2>Responsibilities by layer</H2>
        <Layers layers={project.layers} />
      </section>

      {/* Flow */}
      <section className="pt-16">
        <div className="mb-6">
          <H2>{Diagram ? "How it fits together" : "How an exam is generated"}</H2>
        </div>
        {Diagram ? <Diagram /> : project.pipeline && <Pipeline steps={project.pipeline} />}
      </section>

      {/* Narrative */}
      {project.sections.map((s) => (
        <section key={s.title} className="mt-12 grid gap-4 border-t border-line pt-10 lg:grid-cols-[1fr_1.6fr] lg:gap-6">
          <H2>{s.title}</H2>
          <div className="space-y-4">
            {s.body.map((para) => (
              <p key={para} className="max-w-[66ch] text-ink/85">
                {para}
              </p>
            ))}
          </div>
        </section>
      ))}

      {/* API */}
      {project.api && (
        <section className="pt-16">
          <div className="mb-6">
            <H2>REST API (selected endpoints)</H2>
          </div>
          <EndpointTable endpoints={project.api} />
        </section>
      )}

      {/* Code that shows a decision */}
      {project.snippet && (
        <section className="grid gap-6 pt-16 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <H2>A small decision in code</H2>
            <p className="mt-3 max-w-[48ch] text-muted">{project.snippet.why}</p>
          </div>
          <figure className="m-0 min-w-0 overflow-hidden rounded-xl border border-line bg-panel">
            <figcaption className="border-b border-line bg-panel-2 px-4 py-2 font-mono text-xs text-muted">
              {project.snippet.file}
            </figcaption>
            <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-ink">
              <code>{project.snippet.code}</code>
            </pre>
          </figure>
        </section>
      )}

      {/* Decisions */}
      <section className="pt-16">
        <H2>Decisions and trade-offs</H2>
        <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {project.decisions.map((d) => (
            <div key={d.title} className="border-t border-line pt-4">
              <h3 className="text-lg font-semibold">{d.title}</h3>
              <p className="mt-2 max-w-[56ch] text-muted">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Honest status */}
      {project.nextSteps && (
        <section className="pt-16">
          <H2>What I would improve next</H2>
          <p className="mt-3 max-w-[62ch] text-muted">
            This is a personal project, not a deployed product. Before running it for real users, I would close these gaps:
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {project.nextSteps.map((n) => (
              <li key={n} className="flex gap-3 rounded-lg border border-line bg-panel p-4 text-sm text-ink/85">
                <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                {n}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Next */}
      <nav aria-label="More" className="mt-20 grid gap-6 rounded-2xl border border-line bg-panel p-6 sm:grid-cols-2 sm:p-8">
        {others.map((o) => (
          <Link key={o.slug} href={`/projects/${o.slug}`} className="group no-underline">
            <span className="text-sm text-muted">Next case study</span>
            <span className="mt-1 block font-display text-xl font-semibold group-hover:text-accent">{o.title}</span>
          </Link>
        ))}
        <div className="min-w-0 sm:text-right">
          <span className="text-sm text-muted">Hiring?</span>
          <a href={`mailto:${site.email}`} className="mt-1 block break-all font-display text-xl font-semibold text-accent underline">
            {site.email}
          </a>
        </div>
      </nav>
    </article>
  );
}

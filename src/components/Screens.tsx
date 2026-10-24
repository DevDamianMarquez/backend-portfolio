import Image from "next/image";
import type { Project } from "@/data/projects";

type Shot = Project["images"][number];

// A screenshot inside a minimal browser frame.
export function BrowserShot({ shot, url, priority = false }: { shot: Shot; url: string; priority?: boolean }) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-xl border border-line bg-panel-2 shadow-[0_30px_70px_-35px_rgba(0,0,0,0.9)]">
        <div className="flex items-center gap-2 border-b border-line px-3.5 py-2">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 truncate rounded bg-panel px-3 py-0.5 font-mono text-xs text-muted">
            {url.replace("https://", "")}
          </span>
        </div>
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes="(min-width: 1024px) 1100px, 100vw"
          priority={priority}
          className="block h-auto w-full"
        />
      </div>
      {shot.caption && <figcaption className="mt-2 text-sm text-muted">{shot.caption}</figcaption>}
    </figure>
  );
}

// Screenshots for a case study. Nothing is rendered when there are none: no fake placeholders.
export function Screens({ project }: { project: Project }) {
  if (project.images.length === 0) return null;
  const href = project.links[0]?.href ?? "";

  return (
    <div className="grid gap-8">
      {project.images.map((img, i) => (
        <a key={img.src} href={href} target="_blank" rel="noreferrer" className="block no-underline">
          <BrowserShot shot={img} url={href} priority={i === 0} />
        </a>
      ))}
    </div>
  );
}

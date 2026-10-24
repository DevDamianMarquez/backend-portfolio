import Link from "next/link";
import { site } from "@/config/site";
import { publicFileExists } from "@/lib/publicFile";

const nav = [
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const hasCv = publicFileExists(site.cv);
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-8">
        <Link href="/" className="font-display text-[0.95rem] font-bold tracking-tight no-underline">
          {site.name}
        </Link>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-7 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-line px-3.5 py-2 text-sm no-underline transition hover:border-muted"
          >
            GitHub
          </a>
          {hasCv && (
            <a
              href={site.cv}
              download
              className="rounded-md bg-accent px-3.5 py-2 text-sm font-semibold text-accent-ink no-underline transition hover:brightness-110"
            >
              Download CV
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

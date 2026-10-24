import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-10 pt-20 text-sm text-muted sm:px-8">
      <div className="flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. {site.location}.
        </p>
        <p>Built with Next.js, TypeScript and Tailwind CSS.</p>
      </div>
    </footer>
  );
}
